const express = require("express");
const router = express.Router();
const passport = require("passport");
const {googleLogout, sessionCheck} = require("../controller/auth");


router.post('/googleLogout', googleLogout)

router.get('/session-check', sessionCheck);

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ['openid', 'profile', 'email'],
        failureRedirect: "/?loginError=구글로그인 실패",
    }),
    (req, res) => {
        res.redirect(`${process.env.FRONT_SERVER_URL}`)
    }
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/?loginError=구글로그인 실패",
    }),
    (req, res) => {
        // 로그인 성공 시, accessToken과 profile 정보를 프론트엔드로 전달
        console.log("connect.sid", req.cookies['connect.sid'])
        console.log("AccessToken", req.cookies['accessToken'])
        res.redirect(process.env.FRONT_SERVER_URL)

    }
);

module.exports = router;