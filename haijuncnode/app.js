var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// 传递消息一次性消息
var session=require("express-session");
var flash=require("connect-flash");

var indexRouter = require('./routes/indexRouter');
var usersRouter = require('./routes/usersRouter');
var topicRouter = require('./routes/topicRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine(".html",require("ejs").__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 注意falsh模块要依赖session模块

app.use(session({
  secret:'suibianxie',
  resave:true,
  rolling:true,
  cookie:{
    // 用户活跃的保存时间
    maxAge:1000*60*60*24*7,
    path:'/'
  }
}));


app.use(flash());
// 我要把数据绑定在全局对象上面
app.use(function(req,res,next){
	// res.locals 对象
  res.locals.errMsg=req.flash("errMsg");
  // 设置全局的当前登录用户信息
	res.locals.user=req.session.user;
	 next();
})

app.use('/', indexRouter);
app.use('/users',usersRouter);
app.use('/topic',topicRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
