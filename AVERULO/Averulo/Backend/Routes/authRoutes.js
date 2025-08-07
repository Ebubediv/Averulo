const express = require('express');
const router = express.Router();
const multer = require('multer');
const { signup, verifyOtp, uploadID } = require('./controllers/authController');

const upload = multer({ dest: 'uploads/' });

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/upload-id', upload.single('idImage'), uploadID);

module.exports = router;