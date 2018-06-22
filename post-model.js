'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const postSchema = mongoose.Schema({
    email: String,
    title: String, 
    content: String, 
    category: String
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;