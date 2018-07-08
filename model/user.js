const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
	uname : {
		type 		  : String,
		require 	: true,
		unique		: true,
		lowercase : true
	},
	upass : {
		type 		  : String,
		require		: true
  },
  type  : {
    type      : String,
    require   : true
  }
},{
  versionKey:false
});

schema.pre("save",function(next){
  var user = this;
  if(! (user.isNew || user.isModified("upass")) ) next(null);
  bcrypt.genSalt(10, function(err, salt) {
    if(err) return next(err);
    bcrypt.hash(user.upass, salt, function(err, hash) {
      if(err) return next(err);
      user.upass = hash;
      next(null);
    });
  });
});

schema.methods.comparePassword=function(pass,cb){
  var user = this;
  bcrypt.compare(pass,this.pass,function(err,isMatch){
    if(err) return cb(err);
    if(!isMatch) return cb(null,false,{error:"Invalid Credentials. Please try again"});
    cb(null,user);
  });
}

module.exports = mongoose.model("users",schema);