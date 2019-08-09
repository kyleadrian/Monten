const passport = require("passport");
const User = require("../models/users");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// Authentication before Logging in or Signing Up
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // check the database to confirm username and password is correct and return the user

  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(err, false);
      }

      return done(null, user);
    });
  });
});

// Authentication when already Logged in or Signed Up
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }

    if (user) {
      return done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(localLogin);
passport.use(jwtLogin);
