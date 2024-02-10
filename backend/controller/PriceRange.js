const PriceRange = require("../model/PriceRange"); // Corrected import path

// Create a new price range
exports.createPriceRange = async (req, res) => {
  try {
    const priceRange = new PriceRange(req.body);
    const doc = await priceRange.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all price ranges
exports.fetchAllPriceRanges = async (req, res) => {
  try {
    const priceRanges = await PriceRange.find({}).exec();
    res.status(200).json(priceRanges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
