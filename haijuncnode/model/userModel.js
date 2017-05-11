var mongoose=require("../config/db_config");
// console.log(mongoose);
var userSchema=new mongoose.Schema({
	username:{  //用户名
		type:String,
		unique:true
	},
	userpwd:{   //密码
		type:String,
	},
	email:{     //邮箱
		type:String,
		unique:true
	},
	userpic:{ //用户头像
		type:String,
		default:""
	},
	gold:{   //积分
		type:Number,
		default:0
	},
	regtime:{  //注册时间
		type:Date,
		default:new Date()
	},
	mark:{
		type:String,
		default:""
	},
	regip:{   // 用户注册IP
		type:String,
	},
	logintime:{
		type:Date,    //最后登录时间
		default:new Date()
	},
	active:{   //邮箱验证权限
		type:Number,
		default:0
	},
	topic:[
			{
				type:"ObjectId",
				ref:"conde_topic"
			}
		]//所有话题的ID
});
var userModel=mongoose.model("cnode_user",userSchema);

module.exports=userModel;