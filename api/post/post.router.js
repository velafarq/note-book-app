const { getPosts, getPostById, createPost, updatePost, deletePost } = require('./post.controller');

module.exports = app => {
app.get('/posts', getPosts); 
app.get('/posts/:id', getPostById);
app.post('/posts', createPost); 
app.put('/posts/:id', updatePost);
app.delete('/posts/:id', deletePost);
};