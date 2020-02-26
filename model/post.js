// Third party imports
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required man",
        minlength: 4,
        maxlength: 150
    },
    body: {
        type: String,
        required: "Body is requried",
        minlength: 4,
        maxlength: 2000
    }
});

module.exports = mongoose.model("Post", postSchema);