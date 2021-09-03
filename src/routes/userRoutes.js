const express = require('express');
const router = express.Router();
const { postUser } = require('../controllers/userControllers');

router.post('/', postUser);

module.exports = router;
