const express = require('express');
const morgan = require('morgan');
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { userSignupValidator, createPostValidator } = require('./validator/validator');
const app = express();

// the dotenv package is designed to connect directly to the .env file. After configuration, 
// we can easily connect to the port #
dotenv.config();
const port = process.env.PORT || 8080;
const connexionString = process.env.MONGO_URI;

// Mongoose is an asynchronous package that works with MongoDB in an Async envrionment. For example,
// the following function connects to the cnxtion string provided by our MongoDB cluster, THEN() 
// console logs if a db connected message if successful. If not, it catches the error!

const removeDeprecationWarning = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(connexionString, removeDeprecationWarning)
    .then(() => {
        console.log("db connected!");
    }).catch(err => {
        console.log(err.message);
    });

mongoose.connection.on('error', err => {
    console.log(`DB Connection error: ${err.message}`);
})

/**
 * Here are all the middle-ware we can use for our express application. 
 * -> morgan('dev') 
 */
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/", createPostValidator, postRoutes);
app.use("/", userSignupValidator, authRoutes);
app.listen(port, () => { console.log(`Node js listening on: ${port}`)});

// Listen to any unhandled rejections in the app for better debugging
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled rejection: ', p, 'reason:', reason);
  });