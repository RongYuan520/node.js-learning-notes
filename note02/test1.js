var http=require("http");
var server=http.createServer();
//为request事件绑定事件处理函数
//也可以使用server.addListener
server.on('request',function(rec,res){
	//为request事件添加一个匿名的listner函数
	res.writeHead(200,{'Content-type':'text/plain'});//写入http响应头
	res.write("shiyanlou");//写入http响应体
	console.log('shiyanlou');
	res.end();//结束，返回响应内容
});
server.listen(1337,'127.0.0.1');//在127.0.0.1（本地回环）1337端口监听http请求
console.log('server running at http://127.0.0.1:1337/');
