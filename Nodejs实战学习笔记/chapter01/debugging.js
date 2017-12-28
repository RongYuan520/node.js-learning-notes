var http = require("http");
var body,content_length;
function process_request(req,res) {
	body = "thanks";
	content_length = body.lenggth;

	res.writeHead(200,{

		'Content_length':content_length,
		'Content-Type':'text/plain'
	});
	res.end(body);
	
}

var s = http.createServer(process_request);
s.listen(8080);
