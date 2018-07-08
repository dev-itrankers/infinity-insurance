const router = require("express").Router();
const authenticate = require("./authenticate");

router.get("/",function(req,res){
  res.render("index");
});

router.use("/authenticate",authenticate);
module.exports = router;