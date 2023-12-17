const passport = require("passport");
const LocalStrategy = require("passport-local");
const FacebookStrategy = require("passport-facebook").Strategy;
const bcrypt = require("bcrypt");
const { LoginData } = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "name",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      return LoginData.findOne({ where: { name: username }, raw: true })
        .then((user) => {
          if (!user)
            return done(null, false, req.flash("error", "帳號或密碼錯誤!"));
          bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) {
              return done(null, false, req.flash("error", "帳號或密碼錯誤!"));
            }

            return done(null, user);
          });
        })
        .catch((err) => done(err));
    }
  )
);

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
  done(null, user.id);
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
