const express = require('express');
const { fetchAllRatingRanges, createRatingRange } = require('../controller/RatingRange');

const router = express.Router();
//  /categories is already added in base path
router.get('/', fetchAllRatingRanges).post('/',createRatingRange)

exports.router = router;
