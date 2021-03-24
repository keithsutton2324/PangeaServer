const express = require("express");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose")
const passport = require("./config/passport");
const ApiRoutes = require("./routes/apiRoutes.js");

/*
passport.serializeUser(function(id, cb){
  cb(null, user.id)
});

passport.deserializeUser(function(id, cb){
  db.users.findById(id, function(err, user) {
    if(err) {
      return cb(err)
    }
    cb(null, user)
  })
});
*/
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb2", { useNewUrlParser: true });

app.use(
  cors({
    origin: "*",
    credentials: true
  }
  )
)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(ApiRoutes);

app.use(express.static("public"));

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
