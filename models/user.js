const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  preferredlang: { type: String, required: true },
  country: { type: String, required: true },
  date: { type: Date, default: Date.now }
});
var newPassword = 0;
userSchema.pre(
  'save',
  async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    newPassword = hash;
    console.log("KJS---->user.js.pre password, user.password: ", this.password, user.password);
    next();
  }
);

userSchema.methods.validPassword = async function(password) {
  const user = this;
  console.log("KJS---->user.js.validPassword password, user.password: ", newPassword, user.password);
  const compare = await bcrypt.compare(password, user.password);

  loggedin = compare;
  console.log("KJS---->user.js.validPassword loggedin: ", loggedin);
  
  return compare;
}
 
const User = mongoose.model("User", userSchema);

module.exports = User;
