const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    blogImage: {
        type: String
    } 
},{timestamps: true});

module.exports = mongoose.model("Blogs", blogSchema);