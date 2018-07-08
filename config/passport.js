const passport      = require("passport");
const localStrategy = require("passport-local");
const users          = require("../model/user");
passport.use(new localStrategy({
  usernameField : "uname",
  passwordField : "upass"
},function(username,password,done){
  users.findOne({uname:username},function(err,user){
    if(err) return done(err);
    if(!user) return done(null,false,{error:"Invalid Credentials. Please try again"});
    user.comparePassword(password,done);
  });
}))