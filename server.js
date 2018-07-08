const path         = require("path");
const express      = require("express");
const app          = express();
const bodyParser   = require("body-parser");
const session      = require("express-session");
const mongoose     = require("mongoose");
const defaultRoute = require("./routes/default");
const passport     = require("passport");

app.use(express.static(path.join(__dirname,"src")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
  secret:process.env.SECRET,
  saveUninitialized:false,
  resave:true
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.serializeUser(function(user,done){
//   done(null,user);
// }))
// app.use(passport.deserializeUser(function(user,done){
//   done(null,user);
// }));
app.use(defaultRoute);

mongoose.connect(process.env.DB_CONN);

app.listen(process.env.PORT,function(){
  console.log("Server started at port -> ",process.env.PORT);
});