var dgram = require('dgram');

var server = dgram.createSocket('udp4');

server.on('message',function(msg,rinfo) {
	console.log('服务器获取的信息:' + msg +'来自' + rinfo.address + ':' +rinfo.port);
});

server.on('listening',function() {
	var address = server.address();
	console.log('服务器正在监听：' + address.address + ':' + address.port);
});

server.bind(8080);
