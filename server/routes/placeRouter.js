var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

let Places = require('../models/places');

/* GET all places without pagination */
router.get('/all', function (req, res, next) {
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

router.get('/', async (req, res, next) => {
  // destructure page and limit and set default values
  const { page = 1, limit = 10 } = req.query;
  try {
    // execute query with page and limit values
    const places = await Places.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Places collection
    const count = await Places.countDocuments();

    // return response with places, total pages, and current page
    res.json({
      places,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

/* GET all favorite places with pagination */
router.get('/favorites', async (req, res, next) => {
  // destructure page and limit and set default values
  const { page = 1, limit = 10 } = req.query;
  try {
    // execute query with page and limit values
    const places = await Places.find({ favorite: true })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Places collection
    const count = await Places.find({ favorite: true }).countDocuments();

    // return response with places, total pages, and current page
    res.json({
      places,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

/* GET all favorite places. */
router.get('/allfavs', function (req, res, next) {
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
