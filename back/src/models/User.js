const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    assets: Array
});

// Check if password is correct
userSchema.methods.validPassword = (password) => {
    //bcrypt.compareSync(password, this.password);
    console.log("this.password", this.password);
    console.log("password", password);
}

module.exports = mongoose.model("user", userSchema, "users");