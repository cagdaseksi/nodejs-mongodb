var express = require('express');
var router = express.Router();
const Post = require('../models/Post');

/* GET users listing. */
router.get('/', (req, res) => {

  Post
  .find()
  .then((posts) => {
    res.render('posts/index', {
      posts: posts
    });
  })
});

router.get('/new', (req, res) => {
  res.render('posts/new');
});

router.post('/', (req, res) => {
  console.log(req.body);

  // Creating Post
  var newPost = new Post({
    title: req.body.title,
    shortdescription: req.body.shortdescription,
    description: req.body.description
  });

  newPost
    .save()
    .then((posts) => {
      res.redirect('/posts');
    })
    .catch((err) => {
      console.log(err);
      res.render('error', {
        message: err.message
      });
    });
});

// edit
router.get('/edit/:id', (req, res) => {
  Post
    .findOne({ _id: req.params.id })
    .then((post) => {
      res.render('posts/edit', {
        post: post
      });
    })
    .catch((err) => {
      res.render('error', {
        message: err.message
      })
    })
});

router.post('/edit/:id', (req, res) => {

  Post
    .findOne({ _id: req.params.id })
    .then((post) => {

      post['title'] = req.body['title'];
      post['shortdescription'] = req.body['shortdescription'];
      post['description'] = req.body['description'];

      post
        .save()
        .then((newPost) => {
          //res.redirect('/posts/edit/' + post._id);
          res.redirect('/posts');
        });

      res.render('posts/edit', {
        post: post
      });
    })
    .catch((err) => {
      res.render('error', {
        message: err.message
      })
    })
});

module.exports = router;
