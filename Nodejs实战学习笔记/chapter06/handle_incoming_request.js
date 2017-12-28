function handle_incoming_request(req,res){
	console.log(req.url.substring(0,9));
	if(req.method.toLowerCase() == "get" && req.url.substring(0,9) == "/content/"){
		serve_static_file(req.url.substring(9),res);
	}else{
		res.writeHead(404,{"Content-Type":"application/json"});

		var out = {error:"not_found",message:"'" + req.url + "' not found"};
		res.end(JSON.stringify(out) + '\n');
	}
}

function serve_static_file(file,res){
	var rs = fs.createReadStream(file);
	var ct = content_type_path(file);
	res.writeHead(200,{"Content-Type":ct});

	rs.on("readable",function(){
		var d = rs.read();
		if(d){
			if(typeof d == "string"){
                        	res.write(d);
               		 }else if (typeof d == "object" && d instanceof Buffer){
                        	res.write(d.toString('utf-8'));
                	}
		}
		

	});

	rs.on("end",function(){
		res.end();
	});
	rs.on("error",function(e){
		res.writeHead(404,{"Content-Type":"application/json"});

		var out = {error:"not Founed",message:file +"not found"};
		res.end(JSON.stringify(out));
		return;
	});
}


function content_type_path(file){
	var ext = path.extname(file);
	switch (ext.toLowerCase()){
		case '.html' : return "text/html";
		case '.js'   : return "text/javascropt";
		case '.css'  : return "text/css";
		case '.jpg':case '.jpeg': return "image/jpeg";
		default: return "text/plain";
	}
}




var fs = require("fs");
var http = require("http");
var path = require("path");
var s = http.createServer(handle_incoming_request).listen(80);
