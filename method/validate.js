const joi = require("joi");



function checkString(val,min=0,max=9999){
  const schema = joi.object().keys({
    val : joi.string().required().min(min).max(max)
  });
  return joi.validate({val},schema);
}

function checkNumber(val){
  const schema = joi.object().keys({
    val : joi.number().required()
  });
  return joi.validate({val},schema);
}

module.exports = {checkNumber,checkString}