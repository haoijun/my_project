function getIp(ip){
	// var str="::ffff:127.0.0.1";
	var index=ip.lastIndexOf(":");
	var ip=ip.slice(index+1);
	// console.log(ip);
	return ip;
}	
module.exports=getIp;