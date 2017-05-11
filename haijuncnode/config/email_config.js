var  nodemailer=require("nodemailer");


// 拿qq邮箱最发送服务器   
//1.进入 qq邮箱 >设置>账户
//2.开启一下两个服务
// POP3/SMTP服务   开启 
// IMAP/SMTP服务   开启 
// 3.生成授权码

// 4.定义传输协议

function sendMail(uname,email,_id){
	var transpoter =nodemailer.createTransport({
	// 定义服务器
		host:"smtp.qq.com",  //固定写法
		// 授权验证
		auth:{
			// 
			user:"348192549@qq.com",   //固定写法 输入生成口令那个相对应的那个邮箱
			pass:"gcgqdsgfwjnfbhaf"     // 授权码
		}
	});
// 定义要发送的内容
	var mailOption={
		from:"Xdl_cnode<348192549@qq.com>",  //发件人<相对应的那个邮箱>
		to:email,  //用户注册的那个邮箱
		subject:"Xdl_cnode邮件激活",
		html:'<h3>欢迎,Vip用户 '+uname+' ,您好</h3><p>注册XDLNode官网，请点击下面的链接激活账户 <a href="http://127.0.0.1/users/active?_id='+_id+'" target="_blank">账户激活链接</a></p>'
	}
	transpoter.sendMail(mailOption,function(err,info){
		// 调试信息
		console.log(err);
		console.log(info);
	})
};

module.exports=sendMail;
