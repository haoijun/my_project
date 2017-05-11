var crypto=require("crypto");
function md5(upwd){
	var md5=crypto.createHash("md5");
	var testStr=upwd.toString();
	var pwd=md5.update(testStr).digest("base64");
	return pwd;
}
module.exports = md5;