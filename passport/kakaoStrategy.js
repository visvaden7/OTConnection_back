const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const { User } = require("../models");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: process.env.NODE_ENV === 'production' ? process.env.KAKAO_CALLBACK_PROD_URL : process.env.KAKAO_CALLBACK_DEV_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log("kakao profile", profile);
        console.log(">>>>>>profile_test",profile)
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });
          if (exUser) {
            // console.log("exUser_KAKAO>>", exUser);

            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json?.kakao_account.email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
              avatar: profile._json?.properties.profile_image
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
