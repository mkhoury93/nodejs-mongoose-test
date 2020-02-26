// Third party imports
const express = require('express')

// Internal imports
const postController = require('../controllers/post-controller')

const router = express.Router();

// Root route gets all the posts from the post controller
router.get('/', postController.getPosts);
router.post('/post', postController.createPost)

// We export the router that we previously initialized in order to use it in the app.get() from the main page
module.exports = router;