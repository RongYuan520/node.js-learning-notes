//处理url请求

var fs = require('fs');

//home.html主页
function home(res) {
	console.log('request handler "home" has called');
	//读取home.html 文件
	var content = fs.readFileSync('./views/home.html');
	res.write(content);
	res.end();
}

//about,html页面
function about(res) {
	console.log('request handler "about" was called');
	//读取about.html文件
	var content = fs.readFileSync('./views/about.html');
	res.write(content);
	res.end();
}

//导出页面处理函数
exports.home = home;
exports.about = about;
