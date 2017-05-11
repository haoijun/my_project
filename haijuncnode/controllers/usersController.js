var userModel=require("../model/userModel");
// var multer=require("multer");
var getIp=require("../config/getIp");
// console.log(userModel);
var md5 = require("../config/crypto");
var maileSet=require("../config/email_config");
var timeStamp=require("time-stamp");
var uploadFile = require('../config/uploadFile_config');

var usersController={};

// 业务逻辑写在这
usersController.reg=function(req, res) {
 	 res.render('home/reg');
};
usersController.doreg=function(req, res) {
 	 // res.render('home/reg');
 	 // console.log();
 	 // var str="::ffff:127.0.0.1";
 	 // console.log(getIp(str))

 	 var con={
 	 	username:req.body.username
 	 }
 	 userModel.findOne(con,function(err,data){
 	 
 	 	if(data){
 	 		req.flash("errMsg","账户名已经存在");
 	 		res.redirect("/users/reg");
 	 		return;
 	 	}else{
 		 	 var con={
 				email:req.body.email
			 }
 	 		 userModel.findOne(con,function(err,data){
 	 		 	if(data){
	 	 			req.flash("errMsg","邮箱名已经存在");
					res.redirect("/users/reg");
					return;
				}else{
					var upwd = md5(md5(req.body.userpwd)).substr(3,6)+md5(req.body.userpwd);
					var userData={
 	 					username:req.body.username,
 	 					userpwd:upwd,
 	 					email:req.body.email,
 	 					regip:getIp(req.ip)
					}
					userModel.create(userData,function(err,msg){
						// console.log(msg);
						if(err){
							req.flash("errMsg","操作异常请刷新页面");
							res.redirect("/users/reg");
							return;
						}else{
							// maileSet(userData.username,userData.email,msg._id);
							// console.log(1);
							// res.send("ok");
							res.render("home/emailDsc");
						}
					})
				}
 	 		 })
 	 	}
	
 	 })
};
// 用户通过邮箱验证路由捕捉
usersController.active=function(req, res) {
	var con={
		_id:req.query._id
	};

	userModel.update(con,{active:1},function(err,msg){
		if(err){

		}else{
			res.render("home/activeok");
		}
	})
	
 	 // res.render('home/reg');
 };
usersController.login=function(req, res) {
	// res.send("ok");
	res.render("home/login");
 };
 usersController.dologin=function(req, res) {
	var upwd = md5(md5(req.body.userpwd)).substr(3,6)+md5(req.body.userpwd);
	var con={
		username:req.body.username,
		userpwd:upwd,
	};
	// res.send(con);
	userModel.findOne(con,function(err,data){
		if(!data){
			req.flash("errMsg","账户或者密码错误");
			res.redirect('/users/login');
		};
		if(data.active==0){
			req.flash("errMsg","请到注册页面注册验证邮箱");
			res.redirect('/users/reg');
		}
		var logintime=data.logintime;
		var logintimeStr=timeStamp("YYYY",logintime)+timeStamp("MM",logintime)+timeStamp("DD",logintime);
		// console.log(logintimeStr);  20170504
		var now=new Date();
		var nowStr=timeStamp("YYYY",now)+timeStamp("MM",now)+timeStamp("DD",now);

		// 获取金币
		var gold=data.gold;

		if((nowStr-logintimeStr)>=1){
			gold+=10;
			console.log("加金币了");
		}
		var newData={
			logintime:new Date(),
			gold:gold
		}
		// 查询条件
		var con={
			_id:data._id
		}
		userModel.update(con,newData,function(err,msg){
			// create可以返回加入的那条数据
			if(!err){
				req.session.user=data;
				res.redirect("/");
			}
		})


	})
 };
 
  usersController.loginout=function(req, res) {
  		req.session.user=null;
  		res.redirect("/");
  }
  // 用户信息编辑模块
usersController.setings=function(req, res) {
  		res.render("home/setings");
}
usersController.dosetings=function(req, res) {
  		// res.render("home/setings");
  		// uploadFile("up_file","../public/img",1024*50);
  		
  		var con={
  			_id:req.session.user._id  //当前用户ID
  		}
  		var fid={
  			mark:req.body.mark,
  			userpic:req.body.up_file
  		}
  	
  		userModel.update(con,fid,function(err,msg){
  			// console.log(err);
  			// console.log(data);
  			res.redirect("/");
  		})
  		
}
usersController.domima=function(req, res) {
	var upwd = md5(md5(req.body.old_pass)).substr(3,6)+md5(req.body.old_pass);
	var fs={
		_id:req.session.user._id,
		userpwd:upwd
	}
	userModel.findOne(fs,function(err,msg){
  		if(!msg){
  			req.flash("errMsg","当前密码错误");
			res.redirect('/users/setings');
			return;
  		}else{
  			var upwd = md5(md5(req.body.new_pass)).substr(3,6)+md5(req.body.new_pass);
  			var con={
				_id:req.session.user._id,
			}
  			var fid={
				userpwd:upwd
			}
  			userModel.update(fs,fid,function(err,msg){
  				res.redirect('/');
  			})
  		}
  	})
}
module.exports=usersController;