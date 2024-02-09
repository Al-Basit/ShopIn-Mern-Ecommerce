const { Favorite } = require('../model/Favorite');

exports.fetchFavoriteByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const favoriteItems = await Favorite.find({ user: id }).populate('product');

    res.status(200).json(favoriteItems);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.addToFavorite = async (req, res) => {
  const {id} = req.user;
  const favorite = new Favorite({...req.body,user:id});
  try {
    const doc = await favorite.save();
    const result = await doc.populate('product');
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteFromFavorite = async (req, res) => {
    const { id } = req.params;
    try {
    const doc = await Favorite.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateFavorite = async (req, res) => {
  const { id } = req.params;
  try {
    const favorite = await Favorite.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const result = await Favorite.populate('product');

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};
