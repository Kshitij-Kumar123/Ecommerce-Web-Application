const express = require('express');
const mongoose = require('mongoose'); 
// const Joi = require('joi');
const app = express(); 
const cors = require('cors');
// const User = require('./userSchema');
const bcrypt = require('bcrypt');
const passport = require("passport"); 
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passportLocal = require("passport-local").Strategy;
const bodyParser = require('body-parser');

require('dotenv/config'); 

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
})); 

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(process.env.MODULE, 
    { useNewUrlParser: true, useUnifiedTopology: true },  () => {
        console.log("Connected to MongoDB successfully");
    }
)

const itemRouter = require("./routes/itemRouter");
const userRouter = require('./routes/userRouter');

app.use('/items', itemRouter); 
app.use('/users', userRouter);


const port = process.env.PORT || 4000; 

app.listen(port, () => {
    console.log("Server running successfully on port:", port);
})