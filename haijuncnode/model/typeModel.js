var mongoose=require("../config/db_config");

var typeSchema=new mongoose.Schema({
	typename:{
		type:String,
		unique:true
	},
	ordernum:{
		type:Number,
		default:0
	}
});

var typeModel=mongoose.model("cnode_type",typeSchema);

// 生成数据库数据
var newData=[
	{
		typename:"分享",
		ordernum:1
	},
	{
		typename:"问答",
		ordernum:2
	},
		{
		typename:"招聘",
		ordernum:3
	}
];
// for(var i=0;i<newData.length;i++){
// 	typeModel.create(newData[i],function(err,msg){
// 		if(!err){console.log(err)}
// 	})
// }

module.exports=typeModel;


