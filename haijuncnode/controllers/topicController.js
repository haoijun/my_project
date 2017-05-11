var userModel=require("../model/userModel");
var typeModel=require("../model/typeModel");
var topicModel=require("../model/topicModel");
var replyModel=require("../model/replyModel");

// 加载 eventproxy,解决函数深度回调,异步的问题
// 实例化对象
var Eventproxy=require("eventproxy");
var ep=new Eventproxy();


var topicController={};
topicController.create=function(req,res){
	typeModel.find(function(err,typeData){
		// console.log(typeData)
		res.render("home/topicCreate",{typeData:typeData});
	}).sort({ordernum:1});
}
topicController.docreate=function(req,res){
	var newData={
		topicname:req.body.title,
		content:req.body.content,
		tid:req.body.tid,    //话题一定要选,objID不能存空字符串
		uid:req.session.user._id	
	};
	topicModel.create(newData,function(err,info){
		// console.log(info);//返回的是数据库存储完整的数据
		// console.log(info._id);
		// res.send("OK");
		if(err){console.log(err);return};
		var con={
			_id:req.session.user._id	
		};
		// 查询user模块当前用户,
		userModel.update(con,{$push:{topic:info._id}},function(err,data){
				if(err){console.log(err);return}
				console.log(info._id);
				res.redirect("/topic/show/"+info._id);
		})
	})
}


// ----------新纪元  要ID
//详情页
topicController.showDetail=function(req,res){
	var con={	
		_id:req.params.id  
	};
// 你从哪个ID进去,就给那个ID代表的话题
//关联查询   ref:集合

//修改浏览量
/*
发起查询(拿不到最新的值,异步的问题)
	topicModel.update(con,{$inc:{viewnum:1}},function(err){
		if(err){console.log(err);return}
		
	})
	topicModel.findOne(con).populate("uid").populate("tid").exec(function(err,data){
			if(err){console.log(err);return}
					res.send("OK");
				console.log(data);
		});
*/

// 函数监听
ep.all("viewnum","topicData","replyData",function(viewnum,topicData,replyData){
	// 注意监听 时候的位置
	// viewnum 1参数  在76行传入数字1,在all 函数 viewnum形参上可以去到1
	// topicData 2参数;


	 		res.render("home/showDetail",{data:topicData,replyData:replyData});
	

	
});

	topicModel.update(con,{$inc:{viewnum:1}},function(err){
		if(err){console.log(err);return}
		ep.emit("viewnum",1);  //调用
	});
	topicModel.findOne(con).populate("uid",{username:1,userpic:1,gold:1,mark:1}).populate("tid").exec(function(err,data){
		if(err){console.log(err);return}
		ep.emit("topicData",data);  //调用
	});
	var tid = {
		tid : req.params.id
	};
	replyModel.find(tid).populate("uid",{username:1,userpic:1}).exec(function(err,replyData){
		console.log(tid);
		console.log(replyData);
		// console.log("---------------------------------------------------");
		ep.emit("replyData",replyData);  
	});


}
topicController.reply=function(req,res){
	// console.log(req.body);
	// { tid: '591029040424c60b203f999a',
 //  content: '<p>SADSADSADSADSADSA<br/></p>',
 // }
 var con={
 	_id:req.body.tid   //当前话题在topicModel数据库里面的ID
 };



 topicModel.findOne(con,{reply:1},function(err,info){
 	// reply:1 只要reply字段
 	// res.send("OK");
	var newData={
		content:req.body.content,//回复的内容
		tid:req.body.tid,       //话题的ID
		uid:req.session.user._id,  //谁登陆谁回复
		floor:info.reply.length+1   //楼层

	}
	replyModel.create(newData,function(err,data){


			if(!err&&info){
				// 肯定成功了
				// 向topicModel中更新reply
				topicModel.update(con,{$push:{reply:data._id}},function(err,data){
					res.redirect('back');
				})
			}else{
				res.redirect('back');	
			}
	
	
		// 在那来回哪里去
	})
 })
	


}
module.exports=topicController;