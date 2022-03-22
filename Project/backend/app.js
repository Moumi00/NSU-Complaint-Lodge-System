const express = require("express");
const app = express();
const auth = require('./Routes/auth');
const home = require('./Routes/home');
const fileUpload = require("express-fileupload");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = require("./models");
 
app.use(fileUpload());
app.use('/auth', auth);
app.use('/home', home);

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log("Connected to port 8000");
  });
}); 
