const User = require("./userSchema"); 
const bcrypt = require("bcrypt");
// const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    console.log("hoa");
    passport.use(
        new LocalStrategy((email, password, done) => {
            User.findOne({ email: email }), (err, user) => {
                console.log("running");
                if (err) throw err; 
                if (!user) {
                    res.send("why this not working")
                    return done(null, false)
                };

                bcrypt.compare(password, user.password, (err, user) => {
                    if (err) throw err; 
                    if (result) {
                        return done(null, user)
                    } else {
                        return done(null, false);
                    }
                })
            }
        })
    )
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    
    passport.deserializeUser((id, cb) => {
        User.findOne({_id: id}, (err, user) => {
            cb(err, { email: user.email });
        })
    })

    // passport.serializeUser((user, done) => {
    //     done(null, user._id)
    // }); 

    // passport.deserializeUser((id, done) => {
    //     User.findById(id, (err, user) => { 
    //         done(err, user)
    //     })
    // })

}