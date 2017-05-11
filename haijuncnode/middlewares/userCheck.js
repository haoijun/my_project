function userCheck(req,res,next){
	if(!req.session.user){
		res.redirect("/users/login");
		return;
	}else{
		next();
	}

}
module.exports=userCheck;