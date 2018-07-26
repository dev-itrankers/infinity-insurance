import service from "../service";
var promiseHelper = require("../promise");

document.querySelector("#addon-save").addEventListener("click",function(){
  let addon_name  = document.querySelector("#addon-name").value;
  let addon_price = document.querySelector("#addon-price").value;
  addon_price = parseInt(addon_price);
  if(!addon_name || addon_name=="" || isNaN(addon_price) || typeof addon_name != "string") return showError("error","Invalid Data","error");
  var data = {name:addon_name,price:addon_price}
  data = JSON.stringify(data);
  service.sendJsonData("/addon","post",data).then(function(data){
    promiseHelper.then(data,"Data added successfully");
  }).catch(function(err){
    promiseHelper.error(err);
  });
});

document.querySelector("#make-save").addEventListener("click",function(){
  let make_name = document.querySelector("#make-name").value;
  if(!make_name || make_name=="") return showError("error","Make name is mandatory","error");
  var data = {name:make_name}
  data = JSON.stringify(data);
  service.sendJsonData("/car","post",data).then(function(data){
    promiseHelper.then(data,"Data added successfully");
  }).catch(function(err){
    promiseHelper.error(err);
  })
});

document.querySelector("#model-save").addEventListener("click",function(){
  saveModelVariant("#model-name","#make-drop","Model name is mandatory","Please select make","carmake","/car/model");
});

document.querySelector("#var-save").addEventListener("click",function(){
  saveModelVariant("#var-name","#model-drop","Variant name is mandatory","Please select model","carmodel","/car/variant");
});
function saveModelVariant(value,parent_drop,value_err,drop_err,param,url){
  let parent = document.querySelector(parent_drop);
  let name = document.querySelector(value).value;
  if(!name || name=="") return showError("error",value_err,"error");
  if(parent.value == 0) return showError("error",drop_err,"error");
  var data = {name:name};
  data[param] = parent.value;
  data = JSON.stringify(data);
  service.sendJsonData(url,"post",data).then(function(data){
    promiseHelper.then(data,"Data added successfully");
  }).catch(function(err){
    promiseHelper.error(err);
  })
}

function showError(img,msg,type){
  window.swal(img,msg,type)
}
