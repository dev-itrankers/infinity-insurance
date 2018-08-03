const path = require('path');
const folder = "policy";
const entry = "entry";
const op = "policy.js";
module.exports = {
  "mode"  : "development",
  "entry" : path.join(__dirname,"js",folder,entry),
  watch   : true,
  output  : {
              path      : path.resolve(__dirname,"dist"),
              filename  : op
          }
}