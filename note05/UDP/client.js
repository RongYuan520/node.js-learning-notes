var dgram = require('dgram');

var client = dgram.createSocket('udp4');

var message = new Buffer('我是客户端的信息');
client.send(message,0,message.length,8080,'127.0.0.1',function(err,bytes) {
	if(err){
		throw err;
	}else{

		console.log('客户端发送完成，准备关闭客户端');
		client.close();
		console.log('成功关闭客户端');
	}	
});
