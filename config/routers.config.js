module.exports = app => {
    require('../api/user/user.router')(app);
    require('../api/post/post.router')(app);
};