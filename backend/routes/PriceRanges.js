const express = require('express');
const { fetchAllPriceRanges, createPriceRange } = require('../controller/PriceRange');

const router = express.Router();
//  /categories is already added in base path
router.get('/', fetchAllPriceRanges).post('/',createPriceRange)

exports.router = router;
