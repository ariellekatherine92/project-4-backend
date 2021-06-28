require('dotenv').config();
const passport = require('passport');
const{ Strategy, ExtractJwt} = require('passport-jwt');

//model
const {User} = require('../models');

//object made of strategy
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.JWT_SECRET
}

const JWT__STRATEGY = new Strategy(options, async(jwtPayload, done) => {
    //look for a user by the ID
    try {
        const user = await User.findById(jwtPayload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }


    } catch (error) {
        console.log('Error inside of passport config');
        console.log(error);
        
    }
});

//export a function that will use strategy 
module.exports = async (passport) => {
    passport.use(JWT__STRATEGY);
}
