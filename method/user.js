const mongoose = require("mongoose");
const userModel = require("../model/user.js")
function addUser(user){
  var new_user = new userModel({
    _id : mongoose.Types.ObjectId(),
    ...user
  })

  return new Promise((res,rej)=>{
    new_user.save().then(user => {
      return res(user)
    }).catch(err => rej(err))
    
  })
} 

module.exports = {
  addUser
}