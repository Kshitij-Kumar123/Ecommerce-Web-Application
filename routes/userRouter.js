const express = require('express');
const mongoose = require('mongoose'); 
const Joi = require('joi');
const app = express(); 
const cors = require('cors');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const passport = require("passport"); 
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passportLocal = require("passport-local").Strategy;
const bodyParser = require('body-parser');
const router = express.Router();

// app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true,
// })); 

// app.use(cookieParser(process.env.SESSION_SECRET));
// app.use(passport.initialize());
// app.use(passport.session());

require('dotenv/config');

const initializePassport = require("../passport-config");
initializePassport(passport);

const CheckIfLoggedOut = (req, res, next) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        return res.send("Logged in already! Cant register");
    } else {
        return next();
    }
}

const CheckIfLoggedIn= (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.send("Already Logged in");
    } else {
        return next();
    }
}

router.post('/register', CheckIfLoggedOut, async (req, res) => {
// router.post('/register', async (req, res) => {

    if (req.body.password2 !== req.body.password) {
        return res.send("Passwords do not match. Try Again");
    }

    const { error } = checkLoginInfoValid(req.body);

    if (error) return res.send(error.details[0].message);

    const usernameExists = await User.findOne({ username: req.body.username });

    if (usernameExists) return res.send("Username already assigned to a user");

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User ({
        // name: req.body.name, 
        username: req.body.username, 
        password: hashPassword
    })

    try {
        const savedUser = await newUser.save(); 
        res.send(true);
    } catch(err) {
        res.status(400).send("Error. Unable to register user");
    }
})

router.post('/login', CheckIfLoggedIn, (req, res, next) => {
// router.post('/login', (req, res, next) => {

    let userAuthenticated = true;

    const { error } = checkUserInfoValid(req.body);
    // console.log(req.body);

    if (error) return res.send(error.details[0].message);
    // console.log("error", error);

    passport.authenticate('local', (err, user, info) => {
        if (err) throw err; 
        if (!user) res.send("Incorrect username"); 
        else {
            req.logIn(user, err => {
                if (err) throw err; 
                // console.log("User authenticated!"); 
                res.send(userAuthenticated);
            })
        }
    })(req, res, next);
})

router.get('/logout', async (req, res) => {
    console.log(req.isAuthenticated());
    req.logout();
    // res.redirect('/');
})

// check logout function
// router.get('/checkSession', (req, res) => {
//     res.send(req.isAuthenticated());
// })

/*********************************************************************************************/

const checkUserInfoValid = (userInfo) => {
    const criteria = Joi.object({
        // name: Joi.string().required(), 
        username: Joi.string().required(),
        password: Joi.string().min(6)
    });

    return criteria.validate(userInfo);
}

const checkLoginInfoValid = (loginInfo) => {
    const criteria = Joi.object({
        // name: Joi.string().required(), 
        username: Joi.string().required(), 
        password: Joi.string().min(6), 
        password2: Joi.string().min(6)
    });

    return criteria.validate(loginInfo);
}

module.exports = router;