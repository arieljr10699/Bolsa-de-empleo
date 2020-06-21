const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();



const jobs = require("./routes/api/jobs");
const users = require("./routes/api/users");

app.use(express.json());

app.set(express.static("public"));

app.set("view engine", "jade");

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/login", function (req, res) {
    res.render("login");
  });


const mongoURI = "mongodb+srv://admin:admin@project-oab1m.mongodb.net/Project?retryWrites=true&w=majority";

//Conectar a DB Mongo
mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Usa rutas
app.use("/api/jobs", jobs);
app.use("/api/users", users);

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});

