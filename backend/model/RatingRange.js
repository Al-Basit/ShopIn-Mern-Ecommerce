const mongoose = require('mongoose');
const { Schema } = mongoose;

const ratingRangeSchema = new Schema({
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

const virtual = ratingRangeSchema.virtual('id');
virtual.get(function () {
  return this._id;
});

ratingRangeSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const RatingRange = mongoose.model('RatingRange', ratingRangeSchema);

module.exports = RatingRange;
