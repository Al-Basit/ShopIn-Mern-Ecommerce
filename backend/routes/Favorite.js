const express = require('express');
const { addToFavorite, fetchFavoriteByUser, deleteFromFavorite, updateFavorite } = require('../controller/Favorite');

const router = express.Router();
//  /products is already added in base path
router.post('/', addToFavorite)
      .get('/', fetchFavoriteByUser)
      .delete('/:id', deleteFromFavorite)
      .patch('/:id', updateFavorite)


exports.router = router;
