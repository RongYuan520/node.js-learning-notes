var http = require("http");
var fs = require("fs");
var url = require("url");

var router = require("./routes/router.js");

//主处理程序，根据不同的url进行不同的处理
function handle_incoming_request(req,res) {

        console.log("incoming request:" + req.method + " " + req.url);
	
	req.parsed_url = url.parse(req.url,true);
	var core_url = req.parsed_url.pathname;
	
	//引用router.js方法
	router.router(core_url,req,res);
}

var s = http.createServer(handle_incoming_request).listen(8080);
