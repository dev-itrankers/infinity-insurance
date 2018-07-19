import service from "./service";
var promiseHelper = require("../promise");

document.querySelector("#addon-save").addEventListener("click",function(){
  let addon_name  = document.querySelector("#addon-name").value;
  let addon_price = document.querySelector("#addon-price").value;
  addon_price = parseInt(addon_price);
  if(!addon_name || addon_name=="" || isNaN(addon_price) || typeof addon_name != "string") return showError("error","Invalid Data","error");
  var data = {name:addon_name,price:addon_price}
  data = JSON.stringify(data);
  var message;
  service.sendAddon(data).then(function(data){
    promiseHelper.then(data,"Data added successfully");
  }).catch(function(err){
    promiseHelper.error(err);
  })
});

document.querySelector("make-save").addEventListener("click",function(){
  let make_name = document.querySelector("make-name").value;
  if(!make_name || make_name=="") return showError("error","Make name is mandatory","error");
  var data = {}
});

function showError(img,msg,type){
  window.swal(img,msg,type)
}
