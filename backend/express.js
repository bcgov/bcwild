const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express(),
  bodyParser = require("body-parser"),
  fs = require("fs"),
  port = 4000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const customCss = fs.readFileSync(process.cwd() + "/swagger.css", "utf8");

app.use(bodyParser.json({ limit: 1024 * 1024 * 1024 }));
app.use(bodyParser.raw({ limit: 1024 * 1024 * 1024 }));
app.use(bodyParser.text({ limit: 1024 * 1024 * 1024 }));
app.use(bodyParser.urlencoded({ limit: 1024 * 1024 * 1024, extended: true }));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCss }),
  cookieParser()
);

app.use(cors());

// our custom api
// app.use(require("./routes/api"));

app.use(require("./src/routes"));

process.on("SIGINT", () => {
  process.exit();
});

//Express-session options
const oneDay = 1000 * 60 * 60 * 24;   //creating 24 hours from milliseconds
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

//serving public file
app.use(express.static(__dirname));

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  res.status(err.status).json({
    type: "error",
    message: "the url you are trying to reach is not hosted on our server",
  });
  next(err);
});

module.exports = app;