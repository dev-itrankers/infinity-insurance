const router        = require("express").Router();
const authenticate  = require("./authenticate");
const policy        = require("./policy");
const car           = require("./car");
const addon         = require("./addon")
const views         = require("./views");
router.get("/",function(req,res){
  res.redirect("/dashboard");
});
router.use("/car",car);
router.use("/addon",addon);
router.use("/policy",policy);
router.use("/authenticate",authenticate);
router.use("/",views);
module.exports = router;