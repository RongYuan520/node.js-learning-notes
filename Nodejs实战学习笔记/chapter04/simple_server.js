//第一个json服务器

var http = require("http");

function handel_incoming_request(req,res) {
	console.log("incoming request:" + req.method + "" +req.url);
	res.writeHead(200,{"Content-Type":"application/json"});
	res.end(JSON.stringify({error:null})+"\n");
	
}

var s = http.createServer(handel_incoming_request).listen(8080);
