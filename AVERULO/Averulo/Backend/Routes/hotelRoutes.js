const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getHotels, createHotel } = require('./controllers/hotelController');

const upload = multer({ dest: 'uploads/' });

router.get('/', getHotels);
router.post('/add', upload.single('image'), createHotel);

module.exports = router;