var express = require('express');
var router = express.Router();
var topicCtrl=require("../controllers/topicController");
var userCheck=require("../middlewares/userCheck");


router.get("/create",userCheck,topicCtrl.create);
router.post("/docreate",userCheck,topicCtrl.docreate);

router.get("/show/:id",userCheck,topicCtrl.showDetail);
router.post("/reply",userCheck,topicCtrl.reply);

module.exports = router;
