const Post = require("../model/post");

// Creates a Post and saves it directly to our mongodb cluster instance
const createPost = (req, res) => {
    const post = new Post(req.body);
    console.log("Creating post: ", req.body);
    post.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            post: result
        });
    })
}

// Gets all the posts. We select everything except _v because we don't need _v
const getPosts = (req, res) => {
    const posts = Post.find()
        .select("_id title body")
        .then((posts) => {
            return res.json({posts});
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            });
        })
}

module.exports = {
    getPosts,
    createPost
};