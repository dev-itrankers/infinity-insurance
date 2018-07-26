import {getXml} from "./ajax";

function getData(){
  var http = getXml();
  var url = "/car";
  http.open("GET",url,true);
  var promise = new Promise((res,rej)=>{
    http.onreadystatechange = function(){
      if(http.readyState==4 && http.status==200){
        res(JSON.parse(http.response));
      }
      else if(http.readyState==4){
        rej("Some error Occured");
      }
    }
  });
  http.send();
  return promise;
}

function sendJsonData(url,type,data){
  var http = getXml();
  http.open(type,url,true);
  http.setRequestHeader("Content-Type", "application/json");
  var promise = new Promise((res,rej)=>{
    http.onreadystatechange = function(){
      if(http.readyState==4 && (http.status==201 || http.status==200)){
        res(http.response);
      }
      else if(http.readyState==4){
        rej(http.response);
      }
    }
  });
  http.send(data);
  return promise;
}

export default { getData,sendJsonData };