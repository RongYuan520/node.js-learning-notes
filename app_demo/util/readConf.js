var fs = require("fs");

function getPort(){
	var data = fs.readFileSync(__dirname + '/../conf/net.properties','utf-8');
	var port = JSON.parse(data).port;
	return port;
}

function getConf(){
	 var data = fs.readFileSync(__dirname + '/../conf/net.properties','utf-8');
         var conf = JSON.parse(data);
         return conf;

}

var conf = getConf();

exports.conf = conf;
exports.getPort = getPort;


