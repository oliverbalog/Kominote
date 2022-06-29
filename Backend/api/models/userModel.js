"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
  firstName: {
    type: String,
    required: "First name field cannot be empty!",
  },
  lastName: {
    type: String,
    required: "Last name field cannot be empty!",
  },
  mobileNumber: {
    type: String,
    default: "",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  authLevel: {
    type: Number,
    default: 1, //0: Guest, 1: User, 2: Superuser, 3: Admin
  },
  email: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    required: "Username field cannot be empty!",
  },
  password: {
    type: String,
    required: "Password field cannot be empty!",
  },
  image: {
    type: String, //URL
    default:
      "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
  },
});

module.exports = mongoose.model("User", User);
