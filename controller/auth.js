const axios = require("axios");

exports.sessionCheck = (req, res) => {
    console.log(">>>>Session ID:", req.sessionID);
    console.log(">>>>Session Data:", req.session);
    console.log(">>>>Authenticated", req.isAuthenticated())
    const {id, email, nick, avatar} = req.user.dataValues
    const userData = {user_id: id, email: email, nick: nick, avatar: avatar}
    if (req.isAuthenticated()) {
        res.json({isLoggedIn: true, user: userData})
    } else {
        res.json({isLoggedIn: false, user: null});
    }
}

exports.googleLogout = async (req, res, next) => {  // 비동기 함수로 변경
    try {
        // Passport 로그아웃 및 세션 삭제
        await new Promise((resolve, reject) => {
            req.logout((err) => {
                if (err) return reject(err);
                req.session.destroy((err) => {
                    if (err) return reject(err);
                    res.clearCookie('connect.sid', {
                        // domain: 'localhost',  // 로컬 환경에서는 일반적으로 설정하지 않아도 됨
                        secure: process.env.NODE_ENV === 'production',  // secure 옵션 일치
                        httpOnly: true,  // httpOnly 옵션 일치
                        expires: new Date(0)  // 과거 날짜로 설정하여 즉시 삭제되도록 설정
                    });  // 세션 쿠키 삭제
                    resolve();
                });
            });
        });
        res.send('로그아웃 성공');
    } catch (err) {
        console.error('로그아웃 처리 중 오류 발생:', err);
        return next(err);  // 오류를 Express 에러 핸들러로 전달
    }
};

exports.kakaoLogout = async (req, res, next) => {
    try {
        // 1. 카카오 로그아웃 요청
        const adminKey = process.env.KAKAO_ADMIN_KEY;  // Admin Key를 환경 변수에서 가져옴
        console.log("user test", req.user.dataValues.snsId)
        const userId = req.user ? req.user.dataValues.snsId : null;  // 로그아웃할 사용자 ID

        if (!adminKey) {
            return res.status(500).json({message: '관리 키가 설정되지 않았습니다.'});
        }

        if (!userId) {
            return res.status(400).json({message: '로그아웃할 사용자 ID가 필요합니다.'});
        }

        // 카카오 로그아웃 요청
        try {
            const kakaoResponse = await axios.post(
                'https://kapi.kakao.com/v1/user/logout',
                {target_id_type: 'user_id', target_id: userId},  // 사용자 ID를 지정하여 로그아웃
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `KakaoAK ${adminKey}`  // Admin Key를 사용한 Authorization 헤더
                    }
                })

            // 카카오 로그아웃이 성공했는지 확인
            if (kakaoResponse.data.id) {
                console.log("카카오 로그아웃 성공:", kakaoResponse.data);
            } else {
                return res.status(500).json({message: '카카오 로그아웃 실패'});
            }

            } catch (err) {
            console.error("카카오 로그아웃 실패이유",err)
        }

        // Passport 로그아웃 및 세션 삭제
        await new Promise((resolve, reject) => {
            req.logout((err) => {
                if (err) return reject(err);
                req.session.destroy((err) => {
                    if (err) return reject(err);
                    res.clearCookie('connect.sid', {
                        // domain: 'localhost',  // 로컬 환경에서는 일반적으로 설정하지 않아도 됨
                        secure: process.env.NODE_ENV === 'production',  // secure 옵션 일치
                        httpOnly: true,  // httpOnly 옵션 일치
                        expires: new Date(0)  // 과거 날짜로 설정하여 즉시 삭제되도록 설정
                    });  // 세션 쿠키 삭제
                    resolve();
                });
            });
        });
        res.send('로그아웃 성공');
    } catch (err) {
        console.error('로그아웃 처리 중 오류 발생:', err);
        return next(err);  // 오류를 Express 에러 핸들러로 전달
    }
};



