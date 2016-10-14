var express = require('express');
var slug = require('slug');
var router = express.Router();
const League = require('../models/League');

/* GET leagues listing. */
router.get('/', (req, res) => {

  League
  .find()
  .then((leagues) => {
    res.render('leagues/index', {
      leagues: leagues
    });
  })
});

router.get('/new', (req, res) => {
  res.render('leagues/new');
});

router.post('/new', (req, res) => {
  // Creating Post
  console.log(slug(req.body.title, [{ lower: true }]));
  var newLeague = new League({
    title: req.body.title,
    slug: slug(req.body.title, { lower: true })
  });

  newLeague
    .save()
    .then((posts) => {
      res.redirect('/leagues');
    })
    .catch((err) => {
      console.log(err.code);
      if (err.code == 11000) {
        res.render('error', {message: 'Duplicated Title!'})
      }

      res.render('error', {
        message: err.message
      });
    });
});

router.get('/edit/:id', (req, res) => {
  League
    .findOne({ _id: req.params.id })
    .then((league) => {
      res.render('leagues/edit', {
        league: league
      });
    })
    .catch((err) => {
      res.render('error', {
        message: err.message
      })
    })
});

router.post('/edit/:id', (req, res) => {

  League
    .findOne({ _id: req.params.id })
    .then((league) => {

      league['title'] = req.body['title'];
      league['slug'] = slug(req.body['title']);

      league
        .save()
        .then((newLeague) => {
          //res.redirect('/leagues/edit/' + league._id);
          res.redirect('/leagues');
        });

      res.render('leagues/edit', {
        league: league
      });

    })
    .catch((err) => {

      res.render('error', {
        message: err.message
      })
    })
});



module.exports = router;
