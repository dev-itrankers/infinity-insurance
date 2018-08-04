const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');
const qr = require("qr-image");
const ImageModule = require("docxtemplater-image-module");
const qrlib = require("./qrlib");
var tempfile = require("tempfile");
//Load the docx file as a binary
function createWord(policy_data,res){
  console.log(policy_data);
  var qrpath = parseInt(Math.random()*1000)+".png";
  let qrdata = 'policyno-'+policy_data.policyno+
              ";startdate-"+policy_data.pdate+";enddate-"+policy_data.penddate+";chasisno-"+policy_data.user_car.chasis
              +";engineno-"+policy_data.user_car.engno+";registrationno-"+policy_data.user_car.regno+";insured name-"+policy_data.customer.fname+" "+policy_data.customer.lname;
  var qr_svg = qr.image(qrdata, { type: 'png' });
  qr_svg.pipe(require('fs').createWriteStream(qrpath));

  var content = fs
    .readFileSync(path.resolve(__dirname, 'input.docx'), 'binary');

var zip = new JSZip(content);

var doc = new Docxtemplater();

doc.loadZip(zip);
policy_data.rs = "₹ ";
var make = (policy_data["user_car"].make.make).toUpperCase();
var model = (policy_data["user_car"].model.name).toUpperCase();
var variant = (policy_data["user_car"].variant.name).toUpperCase();
policy_data.addon_names = [];
policy_data.addon_price = [];
policy_data.addons.forEach(function(addon){
  policy_data.addon_names.push(addon.name);
  policy_data.addon_price.push(addon.price);
});
// sendData = Object.assign(sendData,custData);
var custData={},usercarData={};
var final = {};
for(key in policy_data["customer"]){
  var type = typeof policy_data["customer"][key];
  if(type == "number")
  final[key] = policy_data["customer"][key];
  else if(type=="string")
  final[key] = (policy_data["customer"][key]).toUpperCase();
}
for(key in policy_data["user_car"]){
  var type = typeof policy_data["user_car"][key];
  if(type=="string")
  final[key] = (policy_data["user_car"][key]).toUpperCase();
  else if(type=="number")
  final[key] = policy_data["user_car"][key];
}
for(key in policy_data){
  var type = typeof policy_data[key];
  if(type == "number")
  final[key] = policy_data[key];
  else if(type=="string")
  final[key] = (policy_data[key]).toUpperCase();
}
var alpha = ["d","e","f","g","h","i"];
var index = 0;
for(addon of policy_data["addons"]){
  var ind = index++;
  final[alpha[ind] +"addon"] = (addon.name).toUpperCase();
  final[alpha[ind] + "addonprice"] = policy_data.rs+""+addon.price;
}
while(index < alpha.length){
  final[alpha[index] +"addon"] = "";
  final[alpha[index] + "addonprice"] = "";
  index++;
}
final["cov_driver"] = final["cover_driver"]
final["cov_pass"] = final["cover_pass"]
final["liab_prem"] = parseInt(final["third_party"])+parseInt(final["cov_driver"])+parseInt(final["cov_pass"])+parseInt(final["legal"])
doc.setData({...final,make,model,variant,image:"{%image}"});

try {
  doc.render()
}
catch (error) {
  var e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties,
  }
  res.status(500).json({message:"Internal Server Error"});
  // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
  throw error;
}

var buf = doc.getZip()
           .generate({type: 'nodebuffer'});

// buf is a nodejs buffer, you can either write it to a file or do anything else with it.

// res.json({...final,make,model,variant});

fs.writeFileSync(path.resolve(__dirname,"docs" ,policy_data.policyno+".docx"), buf);

setTimeout(function(){
  qrlib.pushqr(policy_data.policyno,qrpath,res);
},1000);

// var content = fs.readFileSync(path.join(__dirname, 'docs',policy_data.policyno+".docx"), 'binary');



// setTimeout(function(){
//   fs.unlink(path.join(__dirname,"docs",policy_data.policyno+".docx"));
// },1000);
}

module.exports = {createWord};