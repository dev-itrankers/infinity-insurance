var router        = require("express").Router();
var method        = require("../method/car");
var carModel      = require("../model/car");
var modelModel    = require("../model/model");
var variantModel  = require("../model/variant");
var mongoose      = require("mongoose");
const response    = require("../method/response");
router.get("/",function(req,res){
  var filter=req.query.name ? {make:req.query.name}:{}; 
  // var limit   = req.query.limit ? req.query.limit : 10;
  // var offset  = req.query.offset ? req.query.offset : 0;
  carModel.find(filter).populate({"path":"model",populate:{path:"variant"}}).exec(function(err,cars){
    return res.status(200).json(cars)
  });
});

router.post("/",function(req,res){
    var result = method.validateCar(req.body.name);
    if(result.error) return res.status(400).json({"message":"Invalid Data"});
    var car = new carModel({
      _id   : mongoose.Types.ObjectId(),
      make  : req.body.name
    })
    car.save(function(err,car){
      if(err){
        err.err_val = req.body.name;
        return response.send(res,500,"Internal server error",err)
      }
      response.send(res,201,"Car "+req.body.name+" added")
    })
});

router.get("/model/:id",function(req,res){
  
});

router.post("/model",function(req,res){
  var result = method.validateModelVariant(req.body.name,req.body.carId);
  if(result.error) return res.status(400).json({"message":"Invalid Data"});
  var car = new modelModel({
    _id   : mongoose.Types.ObjectId(),
    name  : req.body.name
  })
  var promise = new Promise((res,rej)=>{
    car.save().then(car => res(car)).catch(err => rej(err))
  });
  promise
  .then(_ => {
    const filter = {_id:new mongoose.Types.ObjectId(req.body.carId)};
    carModel.findOne(filter,function(err,car){
      if(err) return res.status(500).json({"message":"Internal Server error"})
      console.log(car)
      car.model.push(new mongoose.Types.ObjectId(_._id));
      car.save().then((car)=>{
        res.status(201).json({"message":"Model "+req.body.name+" added",car});
      }).catch((err)=>{
        return res.status(500).json({"message":"Internal Server error"});
      });
    })
  })
  .catch(_ => res.status(500).json({"message":"Internal Server Error"}))
});

router.get("/variant/:id",function(req,res){

});

router.post("/variant",function(req,res){
  var result = method.validateModelVariant(req.body.name,req.body.modelId);
  if(result.error) return res.status(400).json({"message":"Invalid Data"});
  var variant = new variantModel({
    _id   : mongoose.Types.ObjectId(),
    name  : req.body.name
  })
  var promise = new Promise((res,rej)=>{
    variant.save().then(variant => res(variant)).catch(err => rej(err))
  });
  promise
  .then(_ => {
    const filter = {_id:new mongoose.Types.ObjectId(req.body.modelId)};
    modelModel.findOne(filter,function(err,model){
      if(err) return res.status(500).json({"message":"Internal Server error"})
      console.log(model)
      model.variant.push(new mongoose.Types.ObjectId(_._id));
      model.save().then((model)=>{
        res.status(201).json({"message":"Variant "+req.body.name+" added",model});
      }).catch((err)=>{
        return res.status(500).json({"message":"Internal Server error"});
      });
    })
  })
  .catch(_ => res.status(500).json({"message":"Internal Server Error"}))
});

module.exports = router;