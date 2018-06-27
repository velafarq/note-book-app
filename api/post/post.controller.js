const { Post } = require('./post.model');

const getPosts = (req, res) => {
  const { user } = req.user;
    Post
    .find( { author: user._id })
    .then(posts => {
      console.log(user);
      res.json(posts);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went wrong'});
    });
  };
  
const getPostById = (req, res) => {
  const { user } = req.user;
    Post
    .findOne({ _id: req.params.id, author: user._id})
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went wrong'});
    });
  }
  
const createPost = (req, res) => {
    const requiredFields = ['title', 'content', 'category'];
    const { user } = req.user;
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
      }
    }
    
    Post
    .create({
      author: user._id,
      title: req.body.title,
      content: req.body.content,
      category: req.body.category
    })
    .then(post => res.sendStatus(201))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
    };
  
const updatePost = (req, res) => {
  const { user } = req.user;

      if (!(req.params.id && req.body._id && req.params.id === req.body._id)) {
        res.status(400).json({
          error: 'Request path id and request body id values must match'
        });
      }
  
      const updated = {};
      const updateableFields = ['title', 'content', 'category'];
      updateableFields.forEach(field => {
        if (field in req.body) {
          updated[field] = req.body[field];
        }
      });
      Post
      .findOneAndUpdate({ _id: req.params.id, author: user._id }, {$set: updated}, {new: true})
      .then(updatedPost => res.status(204).end())
      .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
      });
    }
  
  const deletePost = (req, res) => {
    const { user } = req.user;
    Post
    .findOneAndRemove({ _id: req.params.id, author: user._id })
    .then(() => {
      res.status(204).json({message: 'Post successfully deleted'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went wrong'});
    });
  };

  module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };