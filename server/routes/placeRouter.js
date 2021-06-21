var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

let Places = require('../models/places');

/* GET all places. */
router.get('/', function (req, res, next) {
  Places.find({})
    .then(
      (places) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(places);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

/* GET all favorite places. */
router.get('/favorites', function (req, res, next) {
  Places.find({ favorite: true })
    .then(
      (places) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(places);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

/* Add new place. */
router.route('/add').post(function (req, res, next) {
  Places.create(req.body)
    .then(
      (place) => {
        console.log('Place Created ', place);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(place);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

/* Get a place. */
router
  .route('/place/:placeId')
  .get(function (req, res, next) {
    Places.findById(req.params.placeId)
      .then(
        (place) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(place);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  //   Toggle Favorite Place
  .put(function (req, res, next) {
    Places.findByIdAndUpdate(
      req.params.placeId,
      { favorite: req.body.favorite },
      { new: true }
    )
      .then(
        (place) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(place);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = router;
