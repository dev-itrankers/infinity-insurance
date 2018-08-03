var mongoose = require("mongoose");

var stringSchema = {
  type      : String,
  require   : true,
  lowercase : true,
}

var numberSchema = {
  type      : Number
}
const schema = new mongoose.Schema({
  _id         : mongoose.Schema.Types.ObjectId, 
  fname       : stringSchema,
  lname       : stringSchema,
  mobno       : numberSchema,
  email       : {type:String,lowercase:true},
  profession  : {type:String,lowercase:true},
  ra          : stringSchema,
  lease       : stringSchema,
  nom         : {type:String,lowercase:true},
  rel         : {type:String,lowercase:true},
  address     : stringSchema,
  city        : stringSchema,
  state       : stringSchema,
  country     : stringSchema
},{
  versionKey : false
});

module.exports = mongoose.model("customer",schema);