const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const db = require("../models");
const LoginData = db.LoginData;

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      LoginData.findByPk(profile.id, { raw: true })
        .then((user) => {
          if (user) return done(null, user);

          return LoginData.create({
            ID: profile.id,
          }).then((user) => done(null, user));
        })
        .catch((err) => done(err));
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.ID);
});

passport.deserializeUser((id, done) => {
  return LoginData.findByPk(id, {
    raw: true,
  })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

module.exports = passport;
