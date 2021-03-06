const createPostValidator = (req, res, next) => {
    // Title
    req.check("title", "Write a title").notEmpty();
    req.check("title", "Title must be between 4 to 150 characters!").isLength({
        min: 4,
        max: 150
    });
    // Body
    req.check("body", "Write a body").notEmpty();
    req.check("body", "Body must be between 4 to 2000 characters!").isLength({
        min: 4,
        max: 2000
    });
    // Error check
    const errors = req.validationErrors();
    // if error
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
}

const userSignupValidator = (req, res, next) => {
    // name is not null and between 4-10 characters
    req.check("name", "Name is reqired").notEmpty();
    req.check("name", "Name must be between 2 to 100 characters!").isLength({
        min: 2,
        max: 100
    });
    // emails is not null, is a valid email and is normalized.
    req.check("email", "Email must be between 3 to 32 characters!")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 2000
        })
    req.check("password", "Password is required").notEmpty();
    req.check("password")
        .isLength({min: 6})
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number!")
    // check for errors

    const errors = req.validationErrors();
    // if errors is true
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError })
    }
    next();
}

module.exports = {
    createPostValidator,
    userSignupValidator
}