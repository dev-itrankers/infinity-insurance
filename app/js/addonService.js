import {getXml} from "./ajax";

function getData(){
  var http = getXml();
  var url = "/addon";
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

export default { getData };