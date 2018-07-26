var mongoose = require("mongoose");

var stringSchema = {
  type      : String,
  require   : true,
  lowercase : true,
}

var numberSchema = {
  type      : Number
}
var objType = {type : mongoose.Schema.Types.ObjectId};
const schema = new mongoose.Schema({
  _id           : mongoose.Schema.Types.ObjectId,
  make          : {...objType,ref:"car"},
  model         : {...objType,ref:"model"},
  variant       : {...objType,ref:"variant"},
  mfgyear       : stringSchema,
  regno         : stringSchema,
  engno         : stringSchema,
  chasis        : stringSchema,
  cc            : numberSchema,
  bodytype      : stringSchema,
  seating       : {...numberSchema,require:true},
  poa            :{...numberSchema,require:true},
  traileridv    : {...numberSchema,require:true},
  biofuel       : {...numberSchema,require:true},
  electrical    : {...numberSchema,require:true},
  nonelectrical : {...numberSchema,require:true},
  cover_driver  : {...numberSchema,require:true},
  cover_pass    : {...numberSchema,require:true}
});

module.exports = mongoose.model("usercar",schema);