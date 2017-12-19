var http=require("http");
var server=http.createServer();
function callback(req,res){
	res.write("hello");
	console.log("log");
	res.end();
}
server.on('request',callback);
server.removeListener('request',callback);//移除监听器
server.on('request',callback);

server.listen(80,'127.0.0.1');//在127.0.0.1（本地回环）80端口监听http请求
console.log('server running at http://127.0.0.1:80/');

