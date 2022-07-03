"use strict";
module.exports = function (app) {
  var users = require("../controllers/userController");

  // Routes
  app.route("/users").get(users.list_all_user).post(users.create_a_user);
  app.route("/user").post(users.login_user);
  app.route("/getauthlevel").post(users.authorize_level);
  app.route("/check-token").post(users.check_token);

  /*   app
    .route("/users/:userId")
    .get(users.read_a_task)
    .put(users.update_a_task)
    .delete(users.delete_a_task); */
};
