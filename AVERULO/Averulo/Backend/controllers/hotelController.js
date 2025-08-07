const Hotel = require('../models/Hotel');

exports.getHotels = async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
};

exports.createHotel = async (req, res) => {
  const { name, location, pricePerNight, description } = req.body;
  const imageUrl = req.file.path;

  const hotel = new Hotel({ name, location, pricePerNight, description, imageUrl });
  await hotel.save();
  res.json({ message: 'Hotel added successfully' });
};