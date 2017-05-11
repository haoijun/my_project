var mongoose=require("../config/db_config");
/*
var topicSchema=new mongoose.Schema({
	topicname:{
		type:String,
		unique:true
	},
	uid:"ObjectId",
	tid:"ObjectId",
	content:String,
	viewnum:{
		type:Number,
		default:0
	},
	posttime:{
		type:Date,
		default:new Date()
	},
	reply:[{type:"ObjectId"}]
});
*/
var topicSchema=new mongoose.Schema({
	topicname:{
		type:String,
		unique:true
	},
	uid:{
		type:"ObjectId",
		ref:"cnode_user"
	},
	tid:{
		type:"ObjectId",
		ref:"cnode_type"
	},
	content:String,
	viewnum:{
		type:Number,
		default:0
	},
	posttime:{
		type:Date,
		default:new Date()
	},
	reply:[
		{
			type:"ObjectId",
			ref:"cnode_user"
		}
	]
});
var topicModel=mongoose.model("cnode_topic",topicSchema);


//mongoose 数据库 他在存集合的时候,会自动给集合加 s

module.exports=topicModel;


