const mongoose = require('mongoose');
const { Schema } = mongoose;

const priceRangeSchema = new Schema({
  minValue: {
    type: Number,
    required: true,
  },
  maxValue: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const virtual = priceRangeSchema.virtual('id');
virtual.get(function () {
  return this._id;
});

priceRangeSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const PriceRange = mongoose.model('PriceRange', priceRangeSchema);

module.exports = PriceRange;
