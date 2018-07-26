function send(res,status,message,err){
  var data={};
  if(err && err.code == 11000){
    data.message = "'"+err.err_val.capitalize()+"' is already present";
    data.err     = "Cannot process data because \"Duplicate values are not allowed\""
    status = 422;
  }
  else if(err) data = {message,err};
  else data = {message}
  res.status(status).json(data);
}

module.exports = {send};