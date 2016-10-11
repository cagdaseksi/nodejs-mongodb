var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/', (req, res) => {

  User
  .find()
  .then((users) => {
    res.render('users/index', {
      users: users
    });
  })
});

router.get('/new', (req, res) => {
  res.render('users/new');
});

router.get('/edit/:id', (req, res) => {
  User
    .findOne({ _id: req.params.id })
    .then((user) => {
      res.render('users/edit', {
        user: user
      });
    })
    .catch((err) => {
      res.render('error', {
        message: err.message
      })
    })
});

router.post('/edit/:id', (req, res) => {

  User
    .findOne({ _id: req.params.id })
    .then((user) => {

      user['name'] = req.body['name'];
      user['surname'] = req.body['surname'];
      user['username'] = req.body['username'];
      user['email'] = req.body['email'];
      user['password'] = req.body['password'];
      user['age'] = req.body['age'];
      user['admin'] = req.body['admin'];

      user
        .save()
        .then((newUser) => {
          res.redirect('/users/edit/' + user._id);
        });

      res.render('users/edit', {
        user: user
      });
    })
    .catch((err) => {
      res.render('error', {
        message: err.message
      })
    })
});

router.post('/', (req, res) => {
  console.log(req.body);

  // Creating Post
  var newUser = new User({
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    admin: req.body.admin,
  });

  newUser
    .save()
    .then((posts) => {
      res.redirect('/users');
    })
    .catch((err) => {
      console.log(err);
      res.render('error', {
        message: err.message
      });
    });
});

module.exports = router;
