var net = require('net');

//创建tcp 服务器
var server = net.createServer(function(socket){
	console.log('client connect(三次握手结束)');

	//监听客户端数据
	socket.on('data',function(data){
		console.log("客户端数据为" , data.toString());
	});
	//监听客户端断开链接事件
	socket.on('end',function(data) {
		console.log('coonet closed');
	});
	//发送数据给客户端
	socket.write('hello\r\n');
	
});
//启动服务
server.listen(8080,function() {
	console.log('server bound');
});
