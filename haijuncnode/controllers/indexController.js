var userModel = require("../model/userModel");
var typeModel = require("../model/typeModel");
var topicModel = require("../model/topicModel");
var replyModel = require('../model/replyModel');
var Eventproxy = require('eventproxy');
var ep = new Eventproxy();


var indexController={};

// 业务逻辑写在这
indexController.index=function(req, res, next) {
	topicModel.find({},function(err,data){
		// { _id: 5910793a34b185123cc81f05,
  //   topicname: 'haijun',
  //   content: '<p>闫海军</p>',
  //   tid: 590edc79b190911eb8ba2b42,
  //   uid: 5910791034b185123cc81f04,
  //   __v: 0,
  //   reply: [],
  //   posttime: 2017-05-08T13:45:49.797Z,
  //   viewnum: 13 },
		// console.log(data);
		res.render('index', {data:data});
	})















	

};

module.exports=indexController;