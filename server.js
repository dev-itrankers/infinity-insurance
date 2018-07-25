const path         = require("path");
const express      = require("express");
const app          = express();
const bodyParser   = require("body-parser");
const session      = require("express-session");
const mongoose     = require("mongoose");
const defaultRoute = require("./routes/default");
const passport     = require("passport");
const helper       = require("./method/helper")

app.disable("x-powered-by");
app.use(express.static(path.join(__dirname,"app")));
app.use("/docs",express.static(path.join(__dirname,"docs")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(bodyParser.urlencoded({extended:true}));
app.use((req, res, next) => {
  bodyParser.json()(req, res, (err) => {
      if (err) {
          console.log(err);
          res.sendStatus(400);
          return;
      }
      next();
  });
});

app.use(function(req,res,next){
  var keys = Object.keys(req.body);
  for(key of keys){
    if(typeof req.body[key] == "string")  req.body[key] = (req.body[key]).trim();
  }
  next();
});
// app.use(bodyParser.json());
app.use(session({
  secret:process.env.SECRET,
  saveUninitialized:false,
  resave:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(helper);
// app.use(passport.serializeUser(function(user,done){
//   done(null,user);
// }))
// app.use(passport.deserializeUser(function(user,done){
//   done(null,user);
// }));
app.use(defaultRoute);

var db = mongoose.connect(process.env.DB_CONN);
db.catch(function(err){
  console.log(err);
})
mongoose.set("debug",true);
app.listen(process.env.PORT,function(){
  console.log("Server started at port -> ",process.env.PORT);
});