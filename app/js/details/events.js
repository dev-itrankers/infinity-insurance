import {getXml} from "../ajax";

document.querySelector("#addon-save").addEventListener("click",function(){
  let addon_name  = document.querySelector("#addon-name").value;
  let addon_price = document.querySelector("#addon-price").value;
  var http = getXml();
  var url = "/addon";
  http.open("post",url,true);
  var promise = new Promise((res,rej)=>{
    http.onreadystatechange = function(){
      if(http.readyState==4 && http.status==201){
        res(http.response);
      }
      else{
        rej(http.response);
      }
    }
  });
});