const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const jobs = require("./routes/api/jobs");

app.use(bodyParser.json());

app.set("view engine", "jade");



app.get("/", function (req, res) {
  res.render("index");
});


const mongoURI = "mongodb+srv://admin:admin@project-oab1m.mongodb.net/Project?retryWrites=true&w=majority";

//Conectar a DB Mongo
mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Usa rutas
app.use("/api/jobs", jobs);

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});

