var mongoose=require("mongoose");

var dbUrl="127.0.0.1",
dbPort="27017",
dbName="cnode",

// var url="mongodb://localhost:27017/h522";
url="mongodb://"+dbUrl+":"+dbPort+"/"+dbName;


mongoose.connect(url,function(err){
	if(err){
		console.log("数据库连接失败");
		return;
	}
})
// console.log(mongoose);
module.exports=mongoose;