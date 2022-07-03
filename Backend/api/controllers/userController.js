"use strict";

var mongoose = require("mongoose"),
  Users = mongoose.model("User");

exports.list_all_user = function (req, res) {
  Users.find({}, function (err, users) {
    if (err) res.send(err);
    res.json(
      users.map((x) => {
        return {
          firstName: x.firstName,
          lastName: x.lastName,
          email: x.email,
          mobileNumber: x.mobileNumber,
          image: x.image,
        };
      })
    );
  });
};

exports.create_a_user = async function (req, res) {
  try {
    var new_user = new Users(req.body);
    new_user.save(function (err, user) {
      if (err) {
        if (err.keyPattern.mobileNumber) {
          res.send({ error: "The mobile number is already in use!" });
        }
        if (err.keyPattern.email) {
          res.send({ error: "The email is already in use!" });
        }
        if (err.keyPattern.username) {
          res.send({ error: "The username is already in use!" });
        }
      }
      res.json(user);
    });
  } catch (ex) {
    console.log(ex);
  }
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
          {}
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

exports.check_token = (req, res) => {
  const jwtToken = require("jsonwebtoken").verify(
    req.cookies.token,
    process.env.JWT_SECRET,
    {}
  );
  res.json({
    username: jwtToken.userInfo.username,
    firstName: jwtToken.userInfo.firstName,
    lastName: jwtToken.userInfo.lastName,
    image: jwtToken.userInfo.image,
    emai: jwtToken.userInfo.email,
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
