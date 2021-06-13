//Modulos principais
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");

//const path = require("path");
//const multer = require("multer");
//const upload = multer();

var urlParser = bodyParser.urlencoded({ extended: false });

const userController = require("./Controllers/Usercontroller");
const { response } = require("express");
// const smsController = require("./controllers/smsController");
// const statusController = require("./controllers/statusController");
// const emailController = require("./controllers/emailController");

//Middleware
// const auth = require("./middleware/auth");

//CORS
const allowlist = ["http://localhost:8080"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

//Atribuições
var app = express();
app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(urlParser);

var server = http.Server(app);

//Routes
app.get("/", (req, res) => {
  console.log("hello");
  res.json({ hello: "welcome" });
});

app.post("/", (req, res) => {
  req.body.data.forEach((element) => {
    console.log(element);
  });
  console.log(req.body);
  res.json({ hello: "welcome" });
});

app.get("/users", (req, res) => {
  userController.teste(function (dados) {
    res.json(dados);
  });
});

app.post("/users", (req, res) => {
  userController.create_user(req.body, function (dados) {
    if (dados.success) {
      res.json(dados);
    } else {
      res.status(400).json(dados);
    }
  });
});

// START SERVER
server.listen(8081, function () {
  console.log("Server started, port: 8081");
});
