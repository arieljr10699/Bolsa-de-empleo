const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World!");
});


const mongoURI = "mongodb+srv://Admin:admin@project-oab1m.mongodb.net/Admin?retryWrites=true&w=majority";


mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});

