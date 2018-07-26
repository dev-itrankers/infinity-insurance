function getPolicyStruct(){
  var data = {
    fname       : document.querySelector("#fn-input").value,
    lname       : document.querySelector("#ln-input").value,
    mbno        : document.querySelector("#mb-input").value,
    email       : document.querySelector("#email").value,
    prof        : document.querySelector("#prof").value,
    rega        : document.querySelector("#rega").value,
    lease       : document.querySelector("#lease").value,
    addrs       : document.querySelector("#addr").value,
    city        : document.querySelector("#city").value,
    state       : document.querySelector("#state").value,
    country     : document.querySelector("#country").value,
    myear       : document.querySelector("#myear").value,
    regno       : document.querySelector("#regno").value,
    engno       : document.querySelector("#engno").value,
    chasisno    : document.querySelector("#chasisno").value,
    ccno        : document.querySelector("#ccno").value,
    bodytype    : document.querySelector("#bodytype").value,
    seatcap     : document.querySelector("#seatcap").value,
    poa         : document.querySelector("#poa").value,
    tridv       : document.querySelector("#tridv").value,
    biofuel     : document.querySelector("#biofuel").value,
    elect       : document.querySelector("#elect").value,
    nonelect    : document.querySelector("#nonelect").value,
    cov_t_dr    : document.querySelector("#cov_t_dr").value,
    cov_t_pass  : document.querySelector("#cov_t_pass").value,
    pdt         : document.querySelector("#pdt").value,
    idv         : document.querySelector("#idv").value,
    perod       : document.querySelector("#perod").value,
    od          : document.querySelector("#od").value,
    pertd       : document.querySelector("#pertd").value,
    td          : document.querySelector("#td").value,
    nod         : document.querySelector("#nod").value,
    perncb      : document.querySelector("#perncb").value,
    ncb         : document.querySelector("#ncb").value,
    tod         : document.querySelector("#tod").value,
    unpa        : document.querySelector("#unpa").value,
    trdprty     : document.querySelector("#trdprty").value,
    legal       : document.querySelector("#legal").value,
    cpa         : document.querySelector("#cpa").value,
    netp        : document.querySelector("#netp").value,
    gst         : document.querySelector("#gst").value,
    tcp         : document.querySelector("#tcp").value,
    addonper    : document.querySelector("#addonper").value,
    rsa         : document.querySelector("#rsa").value,
    zerodep     : document.querySelector("#zerodep").value
  }
  return data;
}


module.exports = {getPolicyStruct};