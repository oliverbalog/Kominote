var express = require("express"),
  app = express(),
  port = 3030,
  mongoose = require("mongoose"),
  User = require("./api/models/userModel"), //created model loading here
  bodyParser = require("body-parser"),
  session = require("express-session"),
  cors = require("cors"),
  jwt = require("jsonwebtoken"),
  cookieParser = require("cookie-parser");

require("dotenv").config();

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/nodeapi");

app.use(
  cors({
    optionsSuccessStatus: 200,
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("trust proxy", 1);
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: parseInt(process.env.SESSION_MAX_AGE),
      secure: false,
      sameSite: true,
    },
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Content-Type", "application/json");
  next();
});
app.options("/*", (_, res) => {
  res.sendStatus(404);
});

var routes = require("./api/routes/userRoutes"); //importing route
routes(app); //register the route

app.listen(port);

console.log("node RESTful API server started on: " + port);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});
