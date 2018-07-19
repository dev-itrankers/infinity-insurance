function then(data,fallback_msg){
  if(message=JSON.parse(data.trim()).message) window.swal("success",message,"success");
  else if(fallback_msg) window.swal(fallback_msg,"success");
  else window.swal("Job done successfully","success");
}

function error(err,fallback_msg){
  if(message=JSON.parse(err.trim()).message) window.swal("cancelled",message,"error");
  else if(fallback_msg) window.swal(fallback_msg,"error")
  else window.swal("cancelled","Something went wrong. Please Try Again","error");
}

module.exports = {then,error};