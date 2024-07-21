
require("dotenv").config();

var User = require("../models/user");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var passport = require("passport");

exports.connectPassport = () => {
    passport.use( new GoogleStrategy({
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        callbackURL: process.env.CALLBACKURL,
        },
        async function(accessToken,refreshToken,profile,done){
            console.log("trying to access google account");
            const user = await User.findOne({
                googleId: profile.id,
            });
            if(!user){
                const newUser = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    photo: profile.photos[0].value,
                    email: profile.emails[0].value,
                });

                return done(null,newUser);
            }
            else{
                return done(null,user);
            }
        }
    ));

    passport.serializeUser((user,done) =>{
        done(null,user.id);
    });

    passport.deserializeUser( async (id,done) => {
        const user = await User.findById(id);
        done(null,user);
    })
};


