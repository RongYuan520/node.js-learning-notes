var fs = require("fs");

function getPort(){
	var data = fs.readFileSync(__dirname + '/../conf/net.properties','utf-8');
	var port = JSON.parse(data).port;
	return port;
}

exports.getPort = getPort;


