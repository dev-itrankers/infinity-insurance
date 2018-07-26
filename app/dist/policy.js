/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/policy/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/addonService.js":
/*!****************************!*\
  !*** ./js/addonService.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajax */ \"./js/ajax.js\");\n/* harmony import */ var _ajax__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ajax__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction getData(){\n  var http = Object(_ajax__WEBPACK_IMPORTED_MODULE_0__[\"getXml\"])();\n  var url = \"/addon\";\n  http.open(\"GET\",url,true);\n  var promise = new Promise((res,rej)=>{\n    http.onreadystatechange = function(){\n      if(http.readyState==4 && http.status==200){\n        res(JSON.parse(http.response));\n      }\n      else if(http.readyState==4){\n        rej(\"Some error Occured\");\n      }\n    }\n  });\n  http.send();\n  return promise;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ getData });\n\n//# sourceURL=webpack:///./js/addonService.js?");

/***/ }),

/***/ "./js/ajax.js":
/*!********************!*\
  !*** ./js/ajax.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function getXml(){\n  let http;\n  if (window.XMLHttpRequest) {\n    http = new XMLHttpRequest();\n  }\n  else {\n    http = new ActiveXObject(\"Microsoft.XMLHTTP\");\n  }\n  return http;\n}\n\nmodule.exports = {getXml};\n\n//# sourceURL=webpack:///./js/ajax.js?");

/***/ }),

/***/ "./js/policy/entry.js":
/*!****************************!*\
  !*** ./js/policy/entry.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var service = __webpack_require__(/*! ../service */ \"./js/service.js\");\nvar addonService = __webpack_require__(/*! ../addonService */ \"./js/addonService.js\");\nvar dataStruct = __webpack_require__(/*! ./policy-struct */ \"./js/policy/policy-struct.js\");\nvar normal = document.querySelector(\"#addon_list\");\ndocument.addEventListener('DOMContentLoaded', ()=>{\n\nconst make = [];\nlet makeSelect    = document.querySelector(\"#make-drop\");\nlet modelSelect   = document.querySelector(\"#model-drop\");\nlet disabled_elem = document.querySelectorAll(\".disabled-val\");\nlet variantSelect = document.querySelector(\"#variant-drop\");\nmodelSelect.disabled = true;\nvariantSelect.disabled = true;\n// for selected make,model and variant;\nvar make_sel,model_sel,variant_sel;\nvar addons;\naddonService.default.getData().then(function(data){\n  var list=\"\";\n  addons=data;\n  data.forEach(function(x,ind){\n      list += `<li>\n                <input type=\"checkbox\" disabled class=\"check\" id=\"check${ind}\" value=\"${x.name}\" disabled data-checkbox=\"icheckbox_square-red\">\n                <label for=\"check${ind}\">${x.name}</label>\n              </li>`;\n  });\n  document.querySelector(\"#addon_list\").innerHTML += list;\n});\n\nservice.default.getData().then(function(data){\n  data.forEach(car => {\n    var temp = {name:car.make};\n    make.push(temp);\n    temp.model = [];\n    car.model.forEach(model => {\n      var model_temp = {name : model.name};\n      model_temp.variant = [];\n      model.variant.forEach(variant => model_temp.variant.push(variant.name));\n      temp.model.push(model_temp);\n    });\n  });\n  fillMake(make);\n}).catch(function(err){\n  window.swal(\"warning\",\"Something went wrong\\nPlease reload page!!\",\"warning\")\n});\n\n  function disableElems(event){\n    let key = event.which ? event.which : event.keyCode;\n    var validAscii = [9,37,38,39,40];\n    if(!validAscii.find(x => x==key)) event.preventDefault();\n  }\n\n  disabled_elem.forEach(function(elem){\n    elem.addEventListener(\"keypress\",disableElems);\n    elem.addEventListener(\"keyup\",disableElems);\n    elem.addEventListener(\"keydown\",disableElems);\n  });\n\n  makeSelect.addEventListener(\"change\",function(e){\n    if(this.value!=\"0\"){\n      modelSelect.disabled = false;\n      make_sel = make.find(x => x.name==this.value);\n      fillModel(make_sel);\n    }\n    else{\n      modelSelect.disabled = true;\n      make_sel=undefined;\n      variantSelect.disabled = true;\n      model_sel=undefined;\n      variant_sel=undefined;\n    }\n  });\n\n  modelSelect.addEventListener(\"change\",function(e){\n    if(this.value!=\"0\"){\n      if(make_sel) variantSelect.disabled = false;\n      else {\n        variantSelect.disabled=true;\n        return model_sel=undefined;\n      }\n      model_sel = make_sel.model.find(x => x.name==this.value);\n      fillVariant(model_sel);\n    }else{\n      variantSelect.disabled=true;\n    }\n  });\n\n  variantSelect.addEventListener(\"change\",function(e){\n    if(this.value!=\"0\"){\n      variant_sel = model_sel.variant.find(x => x==this.value);\n    }\n    else{\n      variant_sel = undefined;\n    }\n  });\n  \n  normal.addEventListener(\"change\",function(e){\n    var checked = this.querySelector(\"#depprem\").checked;\n    if(checked){\n      document.querySelectorAll(\"#addon_list li input\").forEach(function(elem,index){\n        if(index){\n          elem.disabled = false;\n        }\n      });\n      document.querySelectorAll(\".calcAddon\").forEach(elem => {\n        elem.disabled = false;\n      })\n    }else{\n      document.querySelectorAll(\"#addon_list li input\").forEach(function(elem,index){\n        if(index){\n          elem.disabled = true;\n          elem.checked  = false;\n        }\n      })\n      document.querySelectorAll(\".calcAddon\").forEach(elem => {\n        elem.disabled=true;\n        elem.value=\"\";\n      });\n\n    }\n  });\n  document.querySelector(\"#idv\").addEventListener(\"focusout\",function(e){\n    calcOd();\n  });\n  document.querySelector(\"#perod\").addEventListener(\"change\",function(e){\n    calcOd();\n  });\n  document.querySelector(\"#pertd\").addEventListener(\"change\",function(e){\n    calcTd();\n  });\n\n  document.querySelector(\"#perncb\").addEventListener(\"change\",function(e){\n    calcNcb();\n  });\n\n  document.querySelector(\"#unpa\").addEventListener(\"focusout\",function(e){\n    calcOd();\n  });\n\n  document.querySelector(\"#trdprty\").addEventListener(\"focusout\",function(e){\n    calcOd();\n  });\n\n  document.querySelectorAll(\".calcnp\").forEach(elem => {\n    elem.addEventListener(\"focusout\",function(){\n      calcNp();\n    });    \n  })\n\n  document.querySelectorAll(\".calcAddon\").forEach(elem => {\n    elem.addEventListener(\"focusout\",function(){\n      getAddons();\n    });    \n  })\n\n  Array.from(document.querySelectorAll(\".required_elem\")).forEach(function(elem){\n    elem.addEventListener(\"focusout\",function(){\n      if(elem.value==\"\"){\n        if(elem.classList.contains(\"calcAddon\") && !normal.querySelector(\"#depprem\").checked){\n          return false;\n        }\n        elem.parentNode.classList.add(\"has-error\");\n        elem.parentNode.classList.add(\"has-danger\");\n        elem.parentNode.classList.remove(\"has-success\");\n        elem.classList.remove(\"form-control-success\");\n        return elem;\n      }\n      else if(elem.tagName == \"select\" && elem.value==0){\n        elem.parentNode.classList.add(\"has-error\");\n        elem.parentNode.classList.add(\"has-danger\");\n        elem.parentNode.classList.remove(\"has-success\");\n        elem.classList.remove(\"form-control-success\");\n        return elem;\n      }\n      else{\n        elem.parentNode.classList.remove(\"has-error\");\n        elem.parentNode.classList.remove(\"has-danger\");\n        elem.parentNode.classList.add(\"has-success\");\n        elem.classList.add(\"form-control-success\");\n      }\n    })\n  })\n\n  document.querySelector(\"#policy-save\").addEventListener(\"click\",function(e){\n    var error = Array.from(document.querySelectorAll(\".required_elem\")).find(elem => {\n      if(elem.value==\"\") {\n        if(elem.classList.contains(\"calcAddon\") && !normal.querySelector(\"#depprem\").checked){\n          return false;\n        }\n        if(elem.scrollIntoView) elem.scrollIntoView({behavior:\"smooth\",block:\"center\"});\n        setTimeout(_ => elem.focus(),1000);\n        elem.parentNode.classList.add(\"has-error\");\n        elem.parentNode.classList.add(\"has-danger\");\n        elem.parentNode.classList.remove(\"has-success\");\n        elem.classList.remove(\"form-control-success\");\n        return elem;\n      }else if(elem.tagName == \"SELECT\" && (elem.value==\"0\" ||  elem.value==\"\")){\n        if(elem.scrollIntoView) elem.scrollIntoView({behavior:\"smooth\",block:\"center\"});\n        elem.parentNode.classList.add(\"has-error\");\n        elem.parentNode.classList.add(\"has-danger\");\n        elem.parentNode.classList.remove(\"has-success\");\n        elem.classList.remove(\"form-control-success\");\n        return elem;\n      }\n      elem.parentNode.classList.remove(\"has-error\");\n      elem.parentNode.classList.remove(\"has-danger\");\n      elem.parentNode.classList.add(\"has-success\");\n      elem.classList.add(\"form-control-success\");\n      \n      if(!(make_sel && model_sel && variant_sel)){\n        return swal(\"cancelled\",\"Please select make, model and variant\",\"error\");\n      }\n      return false;\n    });\n    if(error) return 0;\n    var data = dataStruct.getPolicyStruct();\n    data.make     = make_sel.name;\n    data.model    = model_sel.name;\n    data.variant  = variant_sel;\n    data.addon    = addon_sel;\n    data          = JSON.stringify(data);\n    console.log(data);\n    service.default.sendJsonData(\"/policy\",\"post\",data).then(function(data){\n      swal(\"Success\",\"Policy Successfully Added\", \"success\");\n      var win = window.open(\"http://localhost:4000/policy/document/\"+(data.id), '_blank');\n      win.focus();\n    }).catch(function(err){\n      swal(\"Cancelled\", \"Something Went wrong...Please try again\", \"error\");\n    });\n  });\n\n\n  function fillMake(make){\n    let options = \"<option value=\\\"0\\\">Select Make</option>\";\n    make.forEach(data => {\n      options+= `<option value=\"${data.name.toLowerCase()}\">${data.name.toUpperCase()}</option>`;\n    });\n    makeSelect.innerHTML = options;\n  }\n\n  function fillModel(data){\n    let options = \"<option value=\\\"0\\\">Select Model</option>\";\n    // make.forEach(data => {\n      options += `<optgroup label=\"${data.name.toUpperCase()}\">`\n      data.model.forEach(mod => {\n        options += `<option value=\"${mod.name.toLowerCase()}\">${mod.name.toUpperCase()}</option>`;\n      });\n      options += `</optgroup>`\n    // });\n    modelSelect.innerHTML = options;\n  }\n\n  function fillVariant(data){\n    let options = \"<option value=\\\"0\\\">Select Variant</option>\";\n    options += `<optgroup label=\"${data.name.toUpperCase()}\">`\n    data.variant.forEach(mod => {\n      options += `<option value=\"${mod.toLowerCase()}\">${mod.toUpperCase()}</option>`;\n    });\n    options += `</optgroup>`\n    variantSelect.innerHTML = options;\n  }\n\n  var od,td,nod,ncb,tod,np,gst,tcp,zdp;\n\n  function calcOd(){\n    var idv = parseInt(document.querySelector(\"#idv\").value);\n    var perod  = parseFloat(document.querySelector(\"#perod\").value)/100;\n    od = idv*perod;\n    if(isNaN(idv) || perod==undefined || perod==\"\" || isNaN(perod) || isNaN(od)){\n      document.querySelector(\"#od\").value = \"\";\n      od=undefined;\n      calcTd();\n      return;\n    }\n    od = parseInt(Math.ceil(od));\n    document.querySelector(\"#od\").value = od;\n    calcTd()\n  }\n\n  function calcTd(){\n    var pertd = parseFloat(document.querySelector(\"#pertd\").value)/100;\n    td  = pertd*od;\n    if(pertd==0 || isNaN(td)) {\n      document.querySelector(\"#nod\").value = \"\";\n      document.querySelector(\"#td\").value = \"\";\n      td  = undefined;\n      nod = undefined;\n      calcNcb();\n      return;\n    }\n    // return swal(\"Please select percentage tariff discount\");\n    td = parseInt(Math.ceil(td));\n    document.querySelector(\"#td\").value = td;\n    calcNod();\n  }\n\n  function calcNod(){\n    nod = od-td;\n    document.querySelector(\"#nod\").value = nod;\n    calcNcb();\n  }\n\n  function calcNcb(){\n    var perncb = parseFloat(document.querySelector(\"#perncb\").value)/100;\n    ncb = nod*perncb;\n    if(perncb==0 || isNaN(ncb)){\n      document.querySelector(\"#ncb\").value = \"\";\n      ncb = undefined;  \n      document.querySelector(\"#tod\").value = \"\";\n      tod = undefined;\n      calcNp();\n      return \n    }\n    // swal(\"Please select percentage NCB\");\n    ncb = parseInt(Math.ceil(ncb));\n    document.querySelector(\"#ncb\").value =ncb;\n    calcTod();\n  }\n\n  function calcTod(){\n    tod = nod-ncb;\n    document.querySelector(\"#tod\").value = tod;\n  }\n\n  function calcNp(){\n    var trdprty = parseInt(document.querySelector(\"#trdprty\").value);\n    var legal   = parseInt(document.querySelector(\"#legal\").value);\n    var cpa     = parseInt(document.querySelector(\"#cpa\").value);\n    var unpa    = parseInt(document.querySelector(\"#unpa\").value);\n    np = tod+trdprty+legal+cpa+unpa;\n    if(isNaN(np) || isNaN(trdprty) || isNaN(legal) || isNaN(cpa) || isNaN(unpa)){\n      document.querySelector(\"#netp\").value = \"\";\n      np = undefined;\n      document.querySelector(\"#gst\").value = \"\";gst = undefined;\n      document.querySelector(\"#tcp\").value = \"\";tcp = undefined;\n      return \n      // swal(\"Please enter all values\");\n    }\n    document.querySelector(\"#netp\").value=np;\n    calcGst();\n  }\n\n  function calcGst(){\n    gst = 0.18*np;\n    getAddons();\n    document.querySelector(\"#gst\").value = parseInt(Math.ceil(gst));\n    tcp = parseInt(Math.ceil(gst)) + np;\n    document.querySelector(\"#tcp\").value = tcp;\n  }\n\n  var rsa,addon_sel;\n  function getAddons(){\n    var value = parseFloat(document.querySelector(\"#addonper\").value);\n    rsa = parseInt(document.querySelector(\"#rsa\").value);\n    if(isNaN(rsa) || isNaN(value)) {\n      zdp=undefined;\n      return 0;\n    }\n    if(!normal.querySelector(\"#depprem\").checked) {\n      zdp=undefined;\n      return 0;\n    }\n    var total = (value/100)*parseInt(document.querySelector(\"#idv\").value);\n    var chkbox = normal.querySelectorAll(\"#addon_list li .check:checked\");\n    chkbox = Array.from(chkbox);\n    addon_sel = [];\n    chkbox.forEach(function(elem,index){\n      var prc = addons.find(x => elem.value==x.name)\n      addon_sel.push(prc);\n      total += parseInt(prc.price);  \n    });\n    var temp_gst = (total+rsa) * (0.18);\n    \n    zdp = document.querySelector(\"#zerodep\").value = temp_gst+total+rsa;\n    return zdp;\n  }\n}, false);\n\n//# sourceURL=webpack:///./js/policy/entry.js?");

/***/ }),

/***/ "./js/policy/policy-struct.js":
/*!************************************!*\
  !*** ./js/policy/policy-struct.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function getPolicyStruct(){\n  var data = {\n    fname       : document.querySelector(\"#fn-input\").value,\n    lname       : document.querySelector(\"#ln-input\").value,\n    mbno        : document.querySelector(\"#mb-input\").value,\n    email       : document.querySelector(\"#email\").value,\n    prof        : document.querySelector(\"#prof\").value,\n    rega        : document.querySelector(\"#rega\").value,\n    lease       : document.querySelector(\"#lease\").value,\n    addrs       : document.querySelector(\"#addr\").value,\n    city        : document.querySelector(\"#city\").value,\n    state       : document.querySelector(\"#state\").value,\n    country     : document.querySelector(\"#country\").value,\n    myear       : document.querySelector(\"#myear\").value,\n    regno       : document.querySelector(\"#regno\").value,\n    engno       : document.querySelector(\"#engno\").value,\n    chasisno    : document.querySelector(\"#chasisno\").value,\n    ccno        : document.querySelector(\"#ccno\").value,\n    bodytype    : document.querySelector(\"#bodytype\").value,\n    seatcap     : document.querySelector(\"#seatcap\").value,\n    poa         : document.querySelector(\"#poa\").value,\n    tridv       : document.querySelector(\"#tridv\").value,\n    biofuel     : document.querySelector(\"#biofuel\").value,\n    elect       : document.querySelector(\"#elect\").value,\n    nonelect    : document.querySelector(\"#nonelect\").value,\n    cov_t_dr    : document.querySelector(\"#cov_t_dr\").value,\n    cov_t_pass  : document.querySelector(\"#cov_t_pass\").value,\n    pdt         : document.querySelector(\"#pdt\").value,\n    idv         : document.querySelector(\"#idv\").value,\n    perod       : document.querySelector(\"#perod\").value,\n    od          : document.querySelector(\"#od\").value,\n    pertd       : document.querySelector(\"#pertd\").value,\n    td          : document.querySelector(\"#td\").value,\n    nod         : document.querySelector(\"#nod\").value,\n    perncb      : document.querySelector(\"#perncb\").value,\n    ncb         : document.querySelector(\"#ncb\").value,\n    tod         : document.querySelector(\"#tod\").value,\n    unpa        : document.querySelector(\"#unpa\").value,\n    trdprty     : document.querySelector(\"#trdprty\").value,\n    legal       : document.querySelector(\"#legal\").value,\n    cpa         : document.querySelector(\"#cpa\").value,\n    netp        : document.querySelector(\"#netp\").value,\n    gst         : document.querySelector(\"#gst\").value,\n    tcp         : document.querySelector(\"#tcp\").value,\n    addonper    : document.querySelector(\"#addonper\").value,\n    rsa         : document.querySelector(\"#rsa\").value,\n    zerodep     : document.querySelector(\"#zerodep\").value\n  }\n  return data;\n}\n\n\nmodule.exports = {getPolicyStruct};\n\n//# sourceURL=webpack:///./js/policy/policy-struct.js?");

/***/ }),

/***/ "./js/service.js":
/*!***********************!*\
  !*** ./js/service.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajax */ \"./js/ajax.js\");\n/* harmony import */ var _ajax__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ajax__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction getData(){\n  var http = Object(_ajax__WEBPACK_IMPORTED_MODULE_0__[\"getXml\"])();\n  var url = \"/car\";\n  http.open(\"GET\",url,true);\n  var promise = new Promise((res,rej)=>{\n    http.onreadystatechange = function(){\n      if(http.readyState==4 && http.status==200){\n        res(JSON.parse(http.response));\n      }\n      else if(http.readyState==4){\n        rej(\"Some error Occured\");\n      }\n    }\n  });\n  http.send();\n  return promise;\n}\n\nfunction sendJsonData(url,type,data){\n  var http = Object(_ajax__WEBPACK_IMPORTED_MODULE_0__[\"getXml\"])();\n  http.open(type,url,true);\n  http.setRequestHeader(\"Content-Type\", \"application/json\");\n  var promise = new Promise((res,rej)=>{\n    http.onreadystatechange = function(){\n      if(http.readyState==4 && (http.status==201 || http.status==200)){\n        res(http.response);\n      }\n      else if(http.readyState==4){\n        rej(http.response);\n      }\n    }\n  });\n  http.send(data);\n  return promise;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ getData,sendJsonData });\n\n//# sourceURL=webpack:///./js/service.js?");

/***/ })

/******/ });