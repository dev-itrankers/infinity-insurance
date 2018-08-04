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
  if(mongoose.connection.readyState==2){
    return res.status(503).json({"message":"Service currently unavailable, The page will refresh in 5 seconds"});
  }
  else if((mongoose.connection.readyState==0) || (mongoose.connection.readyState==3)){
    return res.status(504).json({"message":"Service terminated, Restart server or contact system administrator"});
  }
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
      response.send(res,201,"Make \""+req.body.name+"\" added")
    })
});

router.get("/model/:id",function(req,res){
  
});

router.post("/model",function(req,resp){
  var result = method.validateModelVariant(req.body.name,req.body.carmake);
  if(result.error) return resp.status(400).json({"message":"Model name is required"});
  var model = new modelModel({
    _id   : mongoose.Types.ObjectId(),
    name  : req.body.name
  })
  const filter = {make:req.body.carmake};
  var car;
  carModel.findOne(filter,function(err,data){
    if(err) return resp.status(500).json({"message":"Internal Server error"},err);
    if(!data || Object.keys(data).length == 0 )return response.send(resp,422,"\""+req.body.carmake+"\" make not found\nPlease reload page");
    car = data;
  });
  model.save(function(err,model){
    if(err){
      err.err_val = req.body.name;
      return response.send(resp,500,"Internal server error",err)
    }
    car.model.push(new mongoose.Types.ObjectId(model._id));
    car.save(function(err,car){
      if(err) return response.send(resp,500,"Internal Server error",err)
      response.send(resp,201,"Model "+req.body.name+" added",null)
    });
  });
});

router.get("/variant/:id",function(req,res){

});

router.post("/variant",function(req,res){
  var result = method.validateModelVariant(req.body.name,req.body.carmodel);
  if(result.error) return  response.send(res,400,"Inavlid Data");
  const filter = {name:req.body.carmodel};
  var model;
  modelModel.findOne(filter,function(err,data){
    if(err) return resp.status(500).json({"message":"Internal Server error"},err);
    if(!data || Object.keys(data).length == 0 )return response.send(res,422,"\""+req.body.carmodel+"\" model not found\nPlease reload page");
    model = data;
  });
  var variant = new variantModel({
    _id   : mongoose.Types.ObjectId(),
    name  : req.body.name
  })
    variant.save(function(err,data){
      if(err){
        err.err_val = req.body.name;
        return response.send(res,500,"Internal server error",err)
      }
      model.variant.push(new mongoose.Types.ObjectId(data._id));
      model.save(function(err,data){
        if(err) return response.send(res,500,"Internal Server error",err);
        response.send(res,201,"Variant "+req.body.name+" added")
      })
    })
});

module.exports = router;