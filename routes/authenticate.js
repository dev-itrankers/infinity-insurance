const router = require("express").Router();
const joi = require("joi");
const userMethod = require("../method/user");

router.post("/signin", function (req, res) {
  const body = req.body;
  const pass_err_msg = {
    template : "should contain atleast 1 capital, 1 small letter, 1 number and 1 special case character"
  }
  const signSchema = joi.object().keys({
    username: joi.string().min(6).required(),
    password: joi.string().regex(/^(?=.*\d)(?=.*\W)(?=.*[a-z]+)(?=.*[A-Z]+)/g).min(8).required().error((errors)=> pass_err_msg),
    type: joi.number().required()
  });
  const result = joi.validate({ username: body.uname, password: body.upass, type: body.type }, signSchema);
  if (result.error) return res.status(400).json({ error: result.error.details[0].message });
  userMethod.addUser({uname:body.uname,upass:body.upass,type:body.type})
    .then ( user  => res.status(201).json({ username: user.uname }))
    .catch( error => res.status(500).json({ error }))
});

// router.post("/login")
module.exports = router;