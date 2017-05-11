var express = require('express');
var router = express.Router();
var usersCtrl=require("../controllers/usersController");
var userCheck=require("../middlewares/userCheck");
// var upload=require("../controllers/headimg");
// console.log(upload.single("up_file"));
router.get('/reg',usersCtrl.reg);
router.post('/doreg',usersCtrl.doreg);
router.get('/active',usersCtrl.active);
router.get('/login',usersCtrl.login);
router.post('/dologin',usersCtrl.dologin);
router.get('/loginout',usersCtrl.loginout);

router.get('/setings',userCheck,usersCtrl.setings);
router.post('/dosetings',userCheck,usersCtrl.dosetings);
router.post('/domima',userCheck,usersCtrl.domima);
module.exports = router;
