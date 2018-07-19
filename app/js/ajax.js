function getXml(){
  let http;
  if (window.XMLHttpRequest) {
    http = new XMLHttpRequest();
  }
  else {
    http = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return http;
}

module.exports = {getXml};