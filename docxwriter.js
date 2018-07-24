var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');

var fs = require('fs');
var path = require('path');

//Load the docx file as a binary
function createWord(policy_data,res){
  var content = fs
    .readFileSync(path.resolve(__dirname, 'input.docx'), 'binary');

var zip = new JSZip(content);

var doc = new Docxtemplater();
doc.loadZip(zip);

//set the templateVariables
policy_data.rupee = "₹";
console.log(policy_data);
var make = policy_data["user_car"].make.make;
var model = policy_data["user_car"].model.name;
var variant = policy_data["user_car"].variant.name;
policy_data.addon_names = [];
policy_data.addon_price = [];
policy_data.addons.forEach(function(addon){
  policy_data.addon_names.push(addon.name);
  policy_data.addon_price.push(addon.price);
});
// sendData = Object.assign(sendData,custData);
var custData={},usercarData={};
for(key in policy_data["customer"]){
  custData[key] = policy_data["customer"][key];
}
for(key in policy_data["user_car"]){
  usercarData[key] = policy_data["user_car"][key];
}

doc.setData({...policy_data,...custData,...usercarData,make,model,variant});

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
  console.log(JSON.stringify({error: e}));
  res.status(500).json({message:"Internal Server Error"});
  // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
  throw error;
}

var buf = doc.getZip()
           .generate({type: 'nodebuffer'});

// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
console.log(__dirname);
fs.writeFileSync(path.resolve(__dirname,"docs" ,policy_data.policyno+".docx"), buf);
res.redirect("../../docs/"+policy_data.policyno+".docx");
}

module.exports = {createWord};