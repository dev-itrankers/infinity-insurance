var joi = require("joi");

function validateCar(name){
  return joi.validate(name,joi.string().min(2).required());
}

function validateModelVariant(name,id){
  var schema = joi.object().keys({
    name : joi.string().min(2).required(),
    id   : joi.string().min(2).required()
  })
  return joi.validate({name,id},schema);
}

module.exports = {validateCar,validateModelVariant}