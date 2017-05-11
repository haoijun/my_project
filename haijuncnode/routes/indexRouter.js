var express = require('express');
var router = express.Router();
var indexCtrl=require("../controllers/indexController.js");
console.log(indexCtrl);
// 路由文件只负责中转
/* GET home page. */
router.get('/',indexCtrl.index);

module.exports = router;
