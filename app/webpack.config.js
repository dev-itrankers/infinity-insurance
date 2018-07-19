const path = require('path');
const folder = "details";
const entry = "entry";
const op = "details.js";
module.exports = {
  "mode" : "development",
  "entry" :path.join(__dirname,"js",folder,entry),
  output : {
    path      : path.resolve(__dirname,"dist"),
    filename  : op
  }
}