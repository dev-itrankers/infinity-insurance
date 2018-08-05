var router    = require("express").Router();
var response  = require("../method/response");
var customer  = require("../model/customer");
var car       = require("../model/car");
var model     = require("../model/model");
var variant   = require("../model/variant");
var premium   = require("../model/premium");
var usercar   = require("../model/usercar");
var addons    = require("../model/addons");
var docx      = require("../docxwriter");
var mongoose  = require("mongoose");
router.get("/",function(req,res){

});

router.get("/document/:id",function(req,res){
  premium.findById(req.params.id)
  .populate("customer")
  .populate({path:"user_car",populate:[{path:"make"},{path:"model"},{path:"variant"}]})
  .populate("user_car.variant")
  .populate("addons")
  .exec(function(err,prem){
    if(err) return response.send(res,500,"Internal Server Error");
    if(!prem) return response.send(res,500,"No such entry found")
    var policynum = prem._id.getTimestamp();
    var policyno = policynum.getFullYear()+"";
    var mobno = prem._doc.customer.mobno+"";
    policyno+= (policynum.getMonth()+1)<10 ? "0"+(policynum.getMonth()+1):(policynum.getMonth()+1);
    policyno+= policynum.getDate();
    policyno+= policynum.getHours();
    policyno+= policynum.getMinutes();
    policyno+= policynum.getSeconds();
    policyno+= mobno.substring(mobno.length-4);
    prem._doc.policyno = policyno;
    prem._doc.pdate = ((prem.pre_date.getDate())<10 ? "0"+(prem.pre_date.getDate()):(prem.pre_date.getDate()))+"/"+((prem.pre_date.getMonth()+1)<10 ? "0"+(prem.pre_date.getMonth()+1):(prem.pre_date.getMonth()+1))+"/"+prem.pre_date.getFullYear();
    prem._doc.ptime = prem.pre_date.getHours() + ":" + prem.pre_date.getMinutes();
    prem._doc.myid = prem._doc._id ? prem._doc._id : prem._id;
    var p_end_ts = prem.pre_date.getTime();
    p_end_ts = p_end_ts + (364*24*3600*1000);
    var p_end_date = new Date(p_end_ts);
    prem._doc.penddate = ((p_end_date.getDate())<10 ? "0"+(p_end_date.getDate()):(p_end_date.getDate()))+"/"+((p_end_date.getMonth()+1)<10 ? "0"+(p_end_date.getMonth()+1):(p_end_date.getMonth()+1))+"/"+p_end_date.getFullYear();
    docx.createWord(prem._doc,res);
  });
});

router.post("/",function(req,res){
  let fname=req.body.fname,lname=req.body.lname,pdate=new Date(req.body.pdt),sdate=pdate.getFullYear(),edate;
  pdate = pdate.getTime();
  pdate = pdate + (364*24*3600*1000);
  pdate = new Date(pdate);
  edate = pdate.getFullYear();
  let filename = fname+" "+lname+"-"+sdate+":"+edate;
  var custData = {
    _id         : mongoose.Types.ObjectId(),
    fname       : fname,
    lname       : lname,
    mobno       : req.body.mbno,
    email       : req.body.email,
    profession  : req.body.prof,
    ra          : req.body.rega,
    lease       : req.body.lease,
    nom         : req.body.nom,
    rel         : req.body.rel,
    address     : req.body.addrs,
    city        : req.body.city,
    state       : req.body.state,
    country     : req.body.country
  }
  var cust = new customer(custData);

  cust.save(function(err,cust_data){
    if(err){
      err.err_val = "Policy";
      return response.send(res,500,"Internal server error",err)
    }
    car.findOne({make:req.body.make},function(err,car_data){
      if(err) return response.send(res,500,"Internal Server error",err);
      var makeId = car_data._id;
      model.findOne({name:req.body.model},function(err,data){
        if(err) return response.send(res,500,"Internal Server error",err);
        var modelId = data._id;
        variant.findOne({name:req.body.variant},function(err,data){
          if(err) return response.send(res,500,"Internal Server error",err);
          var variantId = data._id;
          var usercarData = {
            _id           : mongoose.Types.ObjectId(),
            make          : new mongoose.Types.ObjectId(makeId),
            model         : new mongoose.Types.ObjectId(modelId),
            variant       : new mongoose.Types.ObjectId(variantId),
            mfgyear       : req.body.myear,
            regno         : req.body.regno,
            engno         : req.body.engno,
            chasis        : req.body.chasisno,
            cc            : req.body.ccno,
            bodytype      : req.body.bodytype,
            seating       : req.body.seatcap,
            poa           : req.body.poa,
            traileridv    : req.body.tridv,
            biofuel       : req.body.biofuel,
            electrical    : req.body.elect,
            nonelectrical : req.body.nonelect,
            cover_driver  : req.body.cov_t_dr,
            cover_pass    : req.body.cov_t_pass
          }
          var user_car = new usercar(usercarData)
          user_car.save(function(err,usercar_data){
            if(err){
              err.err_val = "Policy";
              return response.send(res,500,"Internal server error",err)
            }
            var addons = [];
            if(req.body.addon)
            req.body.addon.forEach(addon => addons.push(new mongoose.Types.ObjectId(addon._id)));
            var prem_data = {
              _id         : mongoose.Types.ObjectId(),
              idv         : req.body.idv,
              pre_date    : new Date(req.body.pdt),
              perod       : req.body.perod,
              od          : req.body.od,
              pertd       : req.body.pertd,
              td          : req.body.td,
              netod       : req.body.nod,
              perncb      : req.body.perncb,
              ncb         : req.body.ncb,
              todp        : req.body.tod,
              un_pass     : req.body.unpa,
              third_party : req.body.trdprty,
              legal       : req.body.legal,
              cpa         : req.body.cpa,
              np          : req.body.netp,
              gst         : req.body.gst,
              tcp         : req.body.tcp,
              addonper    : req.body.addonper,
              rsa         : req.body.rsa,
              zerodep     : req.body.zerodep,
              addons      : addons,
              customer    : new mongoose.Types.ObjectId(cust_data._id),
              user_car    : new mongoose.Types.ObjectId(usercar_data._id)
            }

            var prem = new premium(prem_data);
            prem.save(function(err,prem){
              if(err){
                err.err_val = "Policy";
                return response.send(res,500,"Internal server error",err)
              }
              res.status(201).json({msg:"Successfully Added Policy....Please check Downloads for document!",id:prem._id,filename});
            });
          });
        });
      });
    });
  });

  
});

module.exports = router;