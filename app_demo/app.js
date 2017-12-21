var express = require("express");
var bodyParser = require("body-parser");
var conf = require("./util/readConf.js");
var app = express();

//app.get('/',function(req,res) {
	//当浏览器访问根路径，执行回调函数
//	res.send('hello');
	
//});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static(__dirname + '/public'));//静态文件目录

app.use('/user',require('./routes/router.js'));

var port = conf.getPort();
app.listen(port);//服务启动



