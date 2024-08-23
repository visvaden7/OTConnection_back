const axios = require("axios");

exports.sessionCheck = (req, res) => {
    console.log(">>>>Session ID:", req.sessionID);
    console.log(">>>>Session Data:", req.session);
    console.log(">>>>Authenticated", req.isAuthenticated())
    const {email, nick, avatar} = req.user.dataValues
    const userData = {email: email, nick: nick, avatar: avatar}
    if (req.isAuthenticated()) {
        res.json({isLoggedIn: true, user: userData})
    } else {
        res.json({isLoggedIn: false, user: null});
    }
}

exports.googleLogout = async (req, res, next) => {  // 비동기 함수로 변경
    try {
        // Google 로그아웃 요청
        const response = await axios.post('https://accounts.google.com/logout');

        // Passport 로그아웃 및 세션 삭제
        await new Promise((resolve, reject) => {
            req.logout((err) => {
                if (err) return rej(err);
                req.session.destroy((err) => {
                    if (err) return rej(err);
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
