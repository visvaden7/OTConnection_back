const passport = require("passport");

const NaverStrategy = require("passport-naver").Strategy;

const { User } = require("../models");

module.exports = () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_ID,
        clientSecret: process.env.NAVER_SECRET_KEY,
        callbackURL: process.env.NODE_ENV === 'production' ? process.env.NAVER_CALLBACK_PROD_URL : process.env.KAKAO_CALLBACK_DEV_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: {
              snsId: profile.id,
              provider: "naver",
            },
          });
          if (exUser) {
            // console.log("exUser_NAVER>>", exUser);
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile.emails[0].value,
              nick: profile.displayName,
              snsId: profile.id,
              provider: "naver",
              avatar: profile._json.profile_image
            });
            done(null, newUser);
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
