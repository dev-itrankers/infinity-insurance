document.addEventListener('DOMContentLoaded', ()=>{
var service = require("./service");
var events = require("./events");

const make = [];
let makeSelect    = document.querySelector("#make_drop");
let modelSelect = document.querySelector("#model_drop");
service.default.getData().then(function(data){
  data.forEach(car => {
    var temp = {name:car.make};
    make.push(temp);
    temp.model = [];
    car.model.forEach(model => temp.model.push(model.name));
  });
  fillMake();
  fillModel();
}).catch(function(err){
  window.swal("warning","Something went wrong\nPlease reload page!!","warning")
});

function fillMake(){
  let options = "";
  make.forEach(data => {
    options+= `<option value="${data.name.toLowerCase()}">${data.name.toUpperCase()}</option>`;
  });
  makeSelect.innerHTML += options;
}

function fillModel(){
  let options = "";
  make.forEach(data => {
    options += `<optgroup label="${data.name.toUpperCase()}">`
    data.model.forEach(mod => {
      options += `<option value="${mod.toLowerCase()}">${mod.toUpperCase()}</option>`;
    });
    options += `</optgroup>`
  });
  modelSelect.innerHTML += options;
}
}, false);