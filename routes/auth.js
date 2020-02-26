// Third party imports
const express = require('express');
// Internal imports
const { signup } = require('../controllers/auth-controller');
const { userSignupValidator } = require('../validator/validator');

const router = express.Router();
const expressValidator = require('express-validator');
router.use(expressValidator);

router.post('/signup', userSignupValidator, signup);


module.exports = router;