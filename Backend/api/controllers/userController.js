"use strict";

var mongoose = require("mongoose"),
  Users = mongoose.model("User");

exports.list_all_user = function (req, res) {
  Users.find({}, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.create_a_user = function (req, res) {
  var new_user = new Users(req.body);
  new_user.save(function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.login_user = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  Users.findOne({ username, password })
    .then((user) => {
      if (user) {
        const success = {
          userInfo: {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            image: user.image,
            email: user.email,
          },
        };

        req.session.user = user;

        const jwtToken = require("jsonwebtoken").sign(
          success,
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.cookie("token", jwtToken);
        res.json({
          isSucceeded: "true",
          username: success.userInfo.username,
          firstName: success.userInfo.firstName,
          lastName: success.userInfo.lastName,
          image: success.userInfo.image,
        });
      } else {
        res.json({ isSucceeded: "false" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({
        error: true,
      });
    });
};

exports.authorize_level = (req, res) => {
  Users.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      res.json({ authLevel: user.authLevel });
    } else {
      res.json({ authLevel: 0 });
    }
  });
};

/*
exports.read_a_task = function (req, res) {
  Task.findById(req.params.taskId, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.update_a_task = function (req, res) {
  Task.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true },
    function (err, task) {
      if (err) res.send(err);
      res.json(task);
    }
  );
};

exports.delete_a_task = function (req, res) {
  Task.remove(
    {
      _id: req.params.taskId,
    },
    function (err, task) {
      if (err) res.send(err);
      res.json({ message: "Task successfully deleted" });
    }
  );
}; */
