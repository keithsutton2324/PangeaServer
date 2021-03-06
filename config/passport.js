
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/username and password
passport.use("local", new LocalStrategy(
  // Our user will sign in using an username, rather than a "username"
  function(username, password, done) {
    // When a user tries to sign in this code runs
    console.log("KJS---->", username, password)
    db.User.findOne({
      username: username
    }).then(function(dbUser) {
      // If there's no user with the given username
      console.log("KJS---->", dbUser)
      if (!dbUser) {
        console.log("KJS---->", "Incorrect username")
        return done(null, false, {
          message: "Incorrect username."
        });
      }
      // If there is a user with the given username, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        console.log("KJS---->", "Incorrect password")
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      console.log("KJS---->", "Correct password", dbUser)
      return done(null, dbUser);
    })
    .catch(err=> console.log(err))

  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
