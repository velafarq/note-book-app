'use strict';

const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    author: mongoose.Schema.ObjectId,
    title: String, 
    content: String, 
    category: String,
    created: { type: Date, default: Date.now }
});


const Post = mongoose.model('Post', postSchema);

module.exports = { Post, postSchema };