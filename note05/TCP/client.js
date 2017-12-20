var net=require('net');

//链接服务器
var client = net.connect({port:8080},function() {
	console.log('connect to server(三次握手结束)');
	client.write('world!\r\n');
});

//接受服务器的数据
client.on('data',function(data) {
	console.log('client got data from server',data.toString());
	//断开链接
	client.end();
});
//断开链接
client.on('end',function() {
	console.log('disconnect from server');
});
