const User = require('../model/user')

// Sign up method. Check if user exists first by awaiting one, then create an account
// if not found!
const signup = async (req, res) => {
    const userExists = await User.findOne({email: req.body.email});
    if (userExists) return res.status(403).json({
        error: "Email is taken"
    });
    
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({
        message: "Successfully created the user!"
    });
}

module.exports = {
    signup
}