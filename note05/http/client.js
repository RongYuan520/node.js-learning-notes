var http = require('http');

var options = {
	hostname:'127.0.0.1',
	port:8080,
	method:'GET',
	path:'/'
};

var req = http.request(options,function(res) {
	console.log('status:' + res.statusCode);
	console.log('Headers:' + JSON.stringify(res.headers));
	res.setEncoding('utf-8');
	res.on('data',function(chunk) {
		console.log(chunk);
	});
});

req.end();
