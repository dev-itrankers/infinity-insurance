function validatePolicy(data){
  var keys = ["idv","odp","od","tdp","td","nop","ncbp",
  "ncb","top","tp","ll","cpa","uppa","np","gst","tcp"]
  const validate = {};

  keys.forEach(function(x){
    if(data[x]==undefined){
      var temp = validate.err ? validate.err : [];
      temp.push(x);
    }
  });
  return validate;
}

function checkPolicy(data){
  var temp;
  const validate={};
  if(data["od"]!=parseInt(data["odp"]*data["idv"])){
    temp = validate.err = [];
    temp.push("od");
  }
  if(data["td"]!=parseInt(data["od"]*data["tdp"])){
    if(!temp) temp=validate.err = [];
    temp.push("td");
  }
  if(data["nop"]!= data["od"]-data["td"]){
    
  }
}

function checkZeroDep(data){
  var keys = ["idv"]
}


module.exports = {validatePolicy,checkPolicy,checkZeroDep};