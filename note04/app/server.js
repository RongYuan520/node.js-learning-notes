//
// 创建http server
//

//加载所需模块
var http = require('http');
var url = require('url');
var fs = require('fs');

//设置ip和端口
//实际应用中，可以把这些写到配置文件中
var host = '127.0.0.1';
var port = 8080;

//创建http server
function start(route,handle){
	//参数
	//route 判断url是否存在，存在则调用handle,不存在返回404
	//handle处理不同的url请求
	
	
	//处理request请求
	function onRequest(req,res) {
		//使用url.parse()方法解析url
		//他会把url string 转化为object
		//这样可以方便获取url中的host等值
		//
		//
		//
		var pathname = url.parse(req.url).pathname;
		console.log('Requst for'+pathname+'received');
		

		//判断并处理不同的url请求
		route(handle,pathname,res,req);

		
	}

	//使用http.createServer()方法创建ttp server
	//并传入onRequest()方法
	//然后使用listen()方法监听制定的地址
	http.createServer(onRequest).listen(port,host);
	console.log('server has started and listening on ' + host + ':' + port);
}
//导出start方法
exports.start = start;
