var service = require("../service");
var addonService = require("../addonService");
var dataStruct = require("./policy-struct");
var normal = document.querySelector("#addon_list");
document.addEventListener('DOMContentLoaded', ()=>{

const make = [];
let makeSelect    = document.querySelector("#make-drop");
let modelSelect   = document.querySelector("#model-drop");
let disabled_elem = document.querySelectorAll(".disabled-val");
let variantSelect = document.querySelector("#variant-drop");
modelSelect.disabled = true;
variantSelect.disabled = true;
// for selected make,model and variant;
var make_sel,model_sel,variant_sel;
var addons;
addonService.default.getData().then(function(data){
  var list="";
  addons=data;
  data.forEach(function(x,ind){
      list += `<li>
                <input type="checkbox" disabled class="check" id="check${ind}" value="${x.name}" disabled data-checkbox="icheckbox_square-red">
                <label for="check${ind}">${x.name}</label>
              </li>`;
  });
  document.querySelector("#addon_list").innerHTML += list;
});

service.default.getData().then(function(data){
  data.forEach(car => {
    var temp = {name:car.make};
    make.push(temp);
    temp.model = [];
    car.model.forEach(model => {
      var model_temp = {name : model.name};
      model_temp.variant = [];
      model.variant.forEach(variant => model_temp.variant.push(variant.name));
      temp.model.push(model_temp);
    });
  });
  fillMake(make);
}).catch(function(err){
  window.swal("warning","Something went wrong\nPlease reload page!!","warning")
});

  function disableElems(event){
    let key = event.which ? event.which : event.keyCode;
    var validAscii = [9,37,38,39,40];
    if(!validAscii.find(x => x==key)) event.preventDefault();
  }

  disabled_elem.forEach(function(elem){
    elem.addEventListener("keypress",disableElems);
    elem.addEventListener("keyup",disableElems);
    elem.addEventListener("keydown",disableElems);
  });

  makeSelect.addEventListener("change",function(e){
    if(this.value!="0"){
      modelSelect.disabled = false;
      make_sel = make.find(x => x.name==this.value);
      fillModel(make_sel);
    }
    else{
      modelSelect.disabled = true;
      make_sel=undefined;
      variantSelect.disabled = true;
      model_sel=undefined;
      variant_sel=undefined;
    }
  });

  modelSelect.addEventListener("change",function(e){
    if(this.value!="0"){
      if(make_sel) variantSelect.disabled = false;
      else {
        variantSelect.disabled=true;
        return model_sel=undefined;
      }
      model_sel = make_sel.model.find(x => x.name==this.value);
      fillVariant(model_sel);
    }else{
      variantSelect.disabled=true;
    }
  });

  variantSelect.addEventListener("change",function(e){
    if(this.value!="0"){
      variant_sel = model_sel.variant.find(x => x==this.value);
    }
    else{
      variant_sel = undefined;
    }
  });
  
  normal.addEventListener("change",function(e){
    var checked = this.querySelector("#depprem").checked;
    if(checked){
      document.querySelectorAll("#addon_list li input").forEach(function(elem,index){
        if(index){
          elem.disabled = false;
        }
      });
      document.querySelectorAll(".calcAddon").forEach(elem => {
        elem.disabled = false;
      })
    }else{
      document.querySelectorAll("#addon_list li input").forEach(function(elem,index){
        if(index){
          elem.disabled = true;
          elem.checked  = false;
        }
      })
      document.querySelectorAll(".calcAddon").forEach(elem => {
        elem.disabled=true;
        elem.value="";
      });

    }
  });
  document.querySelector("#idv").addEventListener("focusout",function(e){
    calcOd();
  });
  document.querySelector("#perod").addEventListener("change",function(e){
    calcOd();
  });
  document.querySelector("#pertd").addEventListener("change",function(e){
    calcTd();
  });

  document.querySelector("#perncb").addEventListener("change",function(e){
    calcNcb();
  });

  document.querySelector("#unpa").addEventListener("focusout",function(e){
    calcOd();
  });

  document.querySelector("#trdprty").addEventListener("focusout",function(e){
    calcOd();
  });

  document.querySelectorAll(".calcnp").forEach(elem => {
    elem.addEventListener("focusout",function(){
      calcNp();
    });    
  })

  document.querySelectorAll(".calcAddon").forEach(elem => {
    elem.addEventListener("focusout",function(){
      getAddons();
    });    
  })

  Array.from(document.querySelectorAll(".required_elem")).forEach(function(elem){
    elem.addEventListener("focusout",function(){
      if(elem.value==""){
        if(elem.classList.contains("calcAddon") && !normal.querySelector("#depprem").checked){
          return false;
        }
        elem.parentNode.classList.add("has-error");
        elem.parentNode.classList.add("has-danger");
        elem.parentNode.classList.remove("has-success");
        elem.classList.remove("form-control-success");
        return elem;
      }
      else if(elem.tagName == "select" && elem.value==0){
        elem.parentNode.classList.add("has-error");
        elem.parentNode.classList.add("has-danger");
        elem.parentNode.classList.remove("has-success");
        elem.classList.remove("form-control-success");
        return elem;
      }
      else{
        elem.parentNode.classList.remove("has-error");
        elem.parentNode.classList.remove("has-danger");
        elem.parentNode.classList.add("has-success");
        elem.classList.add("form-control-success");
      }
    })
  })

  document.querySelector("#policy-save").addEventListener("click",function(e){
    var error = Array.from(document.querySelectorAll(".required_elem")).find(elem => {
      if(elem.value=="") {
        if(elem.classList.contains("calcAddon") && !normal.querySelector("#depprem").checked){
          return false;
        }
        if(elem.scrollIntoView) elem.scrollIntoView({behavior:"smooth",block:"center"});
        setTimeout(_ => elem.focus(),1000);
        elem.parentNode.classList.add("has-error");
        elem.parentNode.classList.add("has-danger");
        elem.parentNode.classList.remove("has-success");
        elem.classList.remove("form-control-success");
        return elem;
      }else if(elem.tagName == "SELECT" && (elem.value=="0" ||  elem.value=="")){
        if(elem.scrollIntoView) elem.scrollIntoView({behavior:"smooth",block:"center"});
        elem.parentNode.classList.add("has-error");
        elem.parentNode.classList.add("has-danger");
        elem.parentNode.classList.remove("has-success");
        elem.classList.remove("form-control-success");
        return elem;
      }
      elem.parentNode.classList.remove("has-error");
      elem.parentNode.classList.remove("has-danger");
      elem.parentNode.classList.add("has-success");
      elem.classList.add("form-control-success");
      
      if(!(make_sel && model_sel && variant_sel)){
        return swal("cancelled","Please select make, model and variant","error");
      }
      return false;
    });
    if(error) return 0;
    var data = dataStruct.getPolicyStruct();
    data.make     = make_sel.name;
    data.model    = model_sel.name;
    data.variant  = variant_sel;
    data.addon    = addon_sel;
    data          = JSON.stringify(data);
    console.log(data);
    service.default.sendJsonData("/policy","post",data).then(function(data){
      swal("Success","Policy Successfully Added", "success");
      var win = window.open("http://localhost:4000/policy/document/"+(data.id), '_blank');
      win.focus();
    }).catch(function(err){
      swal("Cancelled", "Something Went wrong...Please try again", "error");
    });
  });


  function fillMake(make){
    let options = "<option value=\"0\">Select Make</option>";
    make.forEach(data => {
      options+= `<option value="${data.name.toLowerCase()}">${data.name.toUpperCase()}</option>`;
    });
    makeSelect.innerHTML = options;
  }

  function fillModel(data){
    let options = "<option value=\"0\">Select Model</option>";
    // make.forEach(data => {
      options += `<optgroup label="${data.name.toUpperCase()}">`
      data.model.forEach(mod => {
        options += `<option value="${mod.name.toLowerCase()}">${mod.name.toUpperCase()}</option>`;
      });
      options += `</optgroup>`
    // });
    modelSelect.innerHTML = options;
  }

  function fillVariant(data){
    let options = "<option value=\"0\">Select Variant</option>";
    options += `<optgroup label="${data.name.toUpperCase()}">`
    data.variant.forEach(mod => {
      options += `<option value="${mod.toLowerCase()}">${mod.toUpperCase()}</option>`;
    });
    options += `</optgroup>`
    variantSelect.innerHTML = options;
  }

  var od,td,nod,ncb,tod,np,gst,tcp,zdp;

  function calcOd(){
    var idv = parseInt(document.querySelector("#idv").value);
    var perod  = parseFloat(document.querySelector("#perod").value)/100;
    od = idv*perod;
    if(isNaN(idv) || perod==undefined || perod=="" || isNaN(perod) || isNaN(od)){
      document.querySelector("#od").value = "";
      od=undefined;
      calcTd();
      return;
    }
    od = parseInt(Math.ceil(od));
    document.querySelector("#od").value = od;
    calcTd()
  }

  function calcTd(){
    var pertd = parseFloat(document.querySelector("#pertd").value)/100;
    td  = pertd*od;
    if(pertd==0 || isNaN(td)) {
      document.querySelector("#nod").value = "";
      document.querySelector("#td").value = "";
      td  = undefined;
      nod = undefined;
      calcNcb();
      return;
    }
    // return swal("Please select percentage tariff discount");
    td = parseInt(Math.ceil(td));
    document.querySelector("#td").value = td;
    calcNod();
  }

  function calcNod(){
    nod = od-td;
    document.querySelector("#nod").value = nod;
    calcNcb();
  }

  function calcNcb(){
    var perncb = parseFloat(document.querySelector("#perncb").value)/100;
    ncb = nod*perncb;
    if(perncb==0 || isNaN(ncb)){
      document.querySelector("#ncb").value = "";
      ncb = undefined;  
      document.querySelector("#tod").value = "";
      tod = undefined;
      calcNp();
      return 
    }
    // swal("Please select percentage NCB");
    ncb = parseInt(Math.ceil(ncb));
    document.querySelector("#ncb").value =ncb;
    calcTod();
  }

  function calcTod(){
    tod = nod-ncb;
    document.querySelector("#tod").value = tod;
  }

  function calcNp(){
    var trdprty = parseInt(document.querySelector("#trdprty").value);
    var legal   = parseInt(document.querySelector("#legal").value);
    var cpa     = parseInt(document.querySelector("#cpa").value);
    var unpa    = parseInt(document.querySelector("#unpa").value);
    np = tod+trdprty+legal+cpa+unpa;
    if(isNaN(np) || isNaN(trdprty) || isNaN(legal) || isNaN(cpa) || isNaN(unpa)){
      document.querySelector("#netp").value = "";
      np = undefined;
      document.querySelector("#gst").value = "";gst = undefined;
      document.querySelector("#tcp").value = "";tcp = undefined;
      return 
      // swal("Please enter all values");
    }
    document.querySelector("#netp").value=np;
    calcGst();
  }

  function calcGst(){
    gst = 0.18*np;
    getAddons();
    document.querySelector("#gst").value = parseInt(Math.ceil(gst));
    tcp = parseInt(Math.ceil(gst)) + np;
    document.querySelector("#tcp").value = tcp;
  }

  var rsa,addon_sel;
  function getAddons(){
    var value = parseFloat(document.querySelector("#addonper").value);
    rsa = parseInt(document.querySelector("#rsa").value);
    if(isNaN(rsa) || isNaN(value)) {
      zdp=undefined;
      return 0;
    }
    if(!normal.querySelector("#depprem").checked) {
      zdp=undefined;
      return 0;
    }
    var total = (value/100)*parseInt(document.querySelector("#idv").value);
    var chkbox = normal.querySelectorAll("#addon_list li .check:checked");
    chkbox = Array.from(chkbox);
    addon_sel = [];
    chkbox.forEach(function(elem,index){
      var prc = addons.find(x => elem.value==x.name)
      addon_sel.push(prc);
      total += parseInt(prc.price);  
    });
    var temp_gst = (total+rsa) * (0.18);
    
    zdp = document.querySelector("#zerodep").value = temp_gst+total+rsa;
    return zdp;
  }
}, false);