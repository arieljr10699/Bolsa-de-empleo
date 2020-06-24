const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConfigSchema = new Schema({
    amount: {
        type: Number
    }
});

module.exports = Config = mongoose.model("config",ConfigSchema);