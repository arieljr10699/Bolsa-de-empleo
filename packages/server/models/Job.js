const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tipos = ["Full Time", "Part Time", "Freelance"];

const emailMatch =  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'];


const JobSchema = new Schema({
    company: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    type: {
        type: String,
        enum: tipos,
        required: true
    },
    url: {
        type: String,
    },
    position: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    compemail: {
        type: String,
        match: emailMatch
    },
    description: {
        type: String
    },
    logo: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Job = mongoose.model("job",JobSchema);