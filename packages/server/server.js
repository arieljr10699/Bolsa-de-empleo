require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const jobs = require("./routes/api/jobs");
const users = require("./routes/api/users");
const categories = require("./routes/api/categories");
const configs = require("./routes/api/configs");
const auth = require("./routes/api/auth");

const app = express();

app.use(helmet());

//Leer config stage y port
const environment = process.env.NODE_ENV; // development
const stage = require('./config')[environment];

const mongoURI = process.env.MONGO_URI;

//Usar express body parser
app.use(express.json());

//Archivos staticos para logos
app.set(express.static("public"));



//Routing
app.get("/", function (req, res) {
  res.render("index");
});

app.get("/login", function (req, res) {
    res.render("login");
  });

//Conectar a DB Mongo
mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
      
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Usa rutas
app.use("/api/jobs", jobs);
app.use("/api/users", users);
app.use("/api/categories", categories);
app.use("/api/configs", configs);
app.use("/api", auth);

app.listen(`${stage.port}`, () => {
  console.log(`Example app listening on port ${stage.port} !`);
});

