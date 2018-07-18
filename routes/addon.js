const router      = require("express").Router();
const addons      = require("../model/addons");
const validator   = require("../method/validate");
const response    = require("../method/response");
const mongoose    = require("mongoose");
router.get("/",function(req,res){
  addons.find().then((err,addons)=>{
    res.status(200).json(addons);
  });
});

router.post("/",function(req,res){
  if(validator.checkNumber(req.body.price).error) return response.send(res,400,"Price is required in number");
  if(validator.checkString(req.body.name).error) return response.send(res,400,"Name is required");
  var addon = new addons({
    _id   : mongoose.Types.ObjectId(),
    name  : req.body.name,
    price : req.body.price
  })
  addon.save(function(err,user){
    if(err) {
      console.log(err)
      err.err_val = req.body.name;
      return response.send(res,500,"Internal server added",err)
    }
    response.send(res,201,"addon "+req.body.name+" added")
  });
});

module.exports = router;