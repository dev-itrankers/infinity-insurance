const router = require("express").Router();

router.get("/dashboard",function(req,res){
  res.render("starter-page.ejs");
});

router.get("/add-details",function(req,res){
  res.render("add-details");
});

router.get("/create-policy",function(req,res){
  res.render("create-policy");
});

router.get("/all-policies",function(req,res){
  res.render("list-policies");
});

router.get("/policy-slip",function(req,res){
  res.render("policy-slip");
});

router.get("/login",function(req,res){
  res.render("login");
});

router.get("/register",function(req,res){
  res.render("register");
});

router.get("/recoverpw",function(req,res){
  res.render("recoverpw");
})
module.exports = router;