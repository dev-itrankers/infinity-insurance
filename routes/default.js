const router        = require("express").Router();
const authenticate  = require("./authenticate");
const policy        = require("./policy");
const car           = require("./car");
const addon         = require("./addon")
router.get("/",function(req,res){
  res.render("index");
});

router.use("/car",car);
router.use("/addon",addon);
router.use("/policy",policy);
router.use("/authenticate",authenticate);
module.exports = router;