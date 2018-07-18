module.exports = function(req,res,next){
  String.prototype.capitalize = function(){
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
  next();
}