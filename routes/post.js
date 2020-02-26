// Third party imports
const express = require('express');
// Internal imports
const { getPosts, createPost } = require('../controllers/post-controller')
const { createPostValidator } = require('../validator/validator');
const router = express.Router();
const expressValidator = require('express-validator');
router.use(expressValidator);

// Root route gets all the posts from the post controller
router.get('/', getPosts);
router.post('/post', createPostValidator, createPost)

// We export the router that we previously initialized in order to use it in the app.get() from the main page
module.exports = router;