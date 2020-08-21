const express = require('express');
const mongoose = require('mongoose'); 
const Joi = require('joi');
const app = express(); 
const cors = require('cors');
const User = require('./userSchema');
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

const initializePassport = require("./passport-config");
initializePassport(passport);


mongoose.connect(process.env.MONGO_DB, 
    { useNewUrlParser: true, useUnifiedTopology: true },  
    () => {
        console.log("Connected to MongoDB successfully");
    }
)

app.post('/register', async (req, res) => {

    const { error } = checkUserInfoValid(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const userWithEmailExists = await User.findOne({ email: req.body.email });

    if (userWithEmailExists) return res.status(400).send("Email already assigned to a user");

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User ({
        name: req.body.name, 
        email: req.body.email, 
        password: hashPassword
    })

    try {
        const savedUser = await newUser.save(); 
        res.send("User added with name: "+ savedUser.name);
    } catch(err) {
        res.status(400).send("Error. Unable to register user");
    }
})

app.post('/login', (req, res, next) => {
    const { error } = checkLoginInfoValid(req.body);
    // console.log(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    // console.log("error", error);

    passport.authenticate('local', (err, user, info) => {
        if (err) throw err; 
         console.log(user);
        if (!user) res.send("Incorrect email"); 
        else {
            req.logIn(user, err => {
                if (err) throw err; 
                res.send("User authenticated!");
            })
        }
    }) (req, res, next);
})

app.delete('/logout', async (req, res) => {
    
})

app.get('/login', async (req, res) => {
    
})

/*********************************************************************************************/

const checkUserInfoValid = (userInfo) => {
    const criteria = Joi.object({
        name: Joi.string().required(), 
        email: Joi.string().email().required(),
        password: Joi.string().min(3)
    });

    return criteria.validate(userInfo);
}

const checkLoginInfoValid = (loginInfo) => {
    const criteria = Joi.object({
        // name: Joi.string().required(), 
        email: Joi.string().min(6).required().email(), 
        password: Joi.string().min(6)
    });

    return criteria.validate(loginInfo);
}


const port = process.env.PORT || 4000; 

app.listen(port, () => {
    console.log("Server running on port ", port);
})