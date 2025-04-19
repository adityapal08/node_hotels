const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const person = require("./models/person");

passport.use(new LocalStrategy(async (USERNAME, password, done)=> {
    try{
        console.log("Received Credentials:", USERNAME, password);
        const user = await person.findOne({username: USERNAME});
        if(!user) 
            return done(null, false, {message: "invalid username"});

        const isPasswordMatch = user.comparePassword(password);
        if(isPasswordMatch) {
            return done(null, user);

        }else {
            return done(null, false, {message: "invalid password"});
        }
    }catch(err) {
        return done(err);

    }
}));

module.exports = passport;