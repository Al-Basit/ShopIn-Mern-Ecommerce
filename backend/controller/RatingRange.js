const RatingRange = require("../model/RatingRange");

exports.createRatingRange = async (req, res) => {
  try {
    const ratingRange = new RatingRange(req.body);
    const doc = await ratingRange.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.fetchAllRatingRanges = async (req, res) => {
  try {
    const ratingRanges = await RatingRange.find({}).exec();
    res.status(200).json(ratingRanges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
