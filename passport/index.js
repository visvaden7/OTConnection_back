const passport = require("passport");
const google = require("./googleStrategy")
const kakao = require('./kakaoStrategy')
const naver = require("./naverStrategy")
const {User} = require("../models");

module.exports = () => {
    passport.serializeUser((user, done) => {
        // console.log("user>>", user);
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        // console.log("user>>>>>>", user)
        let id = user.id
        User.findOne({
            where: {id}
        })
            .then((user) => {
                // console.log("user^", user);
                done(null, user);
            })
            .catch((err) => done(err));
    });
    google();
    kakao();
    naver();

};
