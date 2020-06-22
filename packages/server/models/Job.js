const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    company: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Job = mongoose.model("job",JobSchema);