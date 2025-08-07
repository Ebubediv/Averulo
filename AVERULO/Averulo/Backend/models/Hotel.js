const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  pricePerNight: Number,
  imageUrl: String,
  description: String,
});

module.exports = mongoose.model('Hotel', hotelSchema);