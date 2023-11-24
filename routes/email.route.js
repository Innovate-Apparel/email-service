// External Dependencies
const express = require('express');
// Internal Tools/Utils
const emailController = require('../controllers/email.controller');

const router = express.Router();

router.post('/send-verification-code', emailController.sendVerificationCode);

module.exports = router;
