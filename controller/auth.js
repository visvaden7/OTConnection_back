
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

exports.logout = async (req, res, next) => {
    try {
        // Passport 로그아웃 및 세션 삭제
        await new Promise((resolve, reject) => {
            req.logout((err) => {
                if (err) return reject(err);
                req.session.destroy((err) => {
                    if (err) return reject(err);
                    console.log("test logout")
                    res.clearCookie('connect.sid', {
                        httpOnly: true,  // httpOnly 옵션 일치
                        secure: false, //process.env.NODE_ENV === 'production',  // secure 옵션 일치
                        expires: new Date(0)  // 과거 날짜로 설정하여 즉시 삭제되도록 설정
                    });
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



