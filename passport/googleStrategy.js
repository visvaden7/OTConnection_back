const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { User } = require("../models");

module.exports = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_SECRET_KEY,
                callbackURL: process.env.NODE_ENV === 'production' ? process.env.GOOGLE_CALLBACK_PROD_URL : process.env.GOOGLE_CALLBACK_DEV_URL,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const exUser = await User.findOne({
                        where: { snsId: profile.id, provider: "google" },
                    });
                    if (exUser) {
                        done(null, exUser);
                    } else {
                        const newUser = await User.create({
                            email: profile._json?.email,
                            nick: profile.displayName,
                            snsId: profile.id,
                            provider: "google",
                            avatar: profile._json?.picture
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
