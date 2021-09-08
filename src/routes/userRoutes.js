const express = require('express');
const router = express.Router();
const { postUser } = require('../controllers/userControllers');
const { validatePostUser } = require('../validations/userValidation');

router.post('/', validatePostUser, postUser);

module.exports = router;
