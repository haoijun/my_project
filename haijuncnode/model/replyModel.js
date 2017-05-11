var mongoose=require("../config/db_config");

var replySchema=new mongoose.Schema({
	content:String,
	tid:{
		type:"ObjectId",
		ref:"cnode_topic"
	},
	uid:{
		type:"ObjectId",
		ref:"cnode_user"
	},
	posttime:{
		type:Date,
		default:new Date()
	},
	floor:{
		type:Number
	},
	link:[{
		type:"ObjectId",
		ref:"cnode_user"
	}]
});

var replyModel=mongoose.model("cnode_reply",replySchema);


module.exports=replyModel;


