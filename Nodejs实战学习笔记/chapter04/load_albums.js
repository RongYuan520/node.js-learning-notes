var http = require("http");
var fs = require("fs");
var url = require("url");

function load_albums_list(callback) {
	fs.readdir(
		'albums/',
		function (err,files){
			if(err) {
				callback(err);
				return;
			}
			//callback(null,files);
			var only_dirs = [];
			//for(var i = 0;i <files.length; i++){
			//	fs.stat(
			//		"albums/"+files[i],
			//		function(err,stats) {
			//			if(stats.isDirectory()){
			//				only_dirs.push(files[i]);
			//			}
			//		}
			//	);
			//}
			//callback(null,only_dirs)
			//
			(function iterator(index){
				
				if(index ==files.length){
					callback(null,only_dirs);
					return;
				}
				fs.stat(
					"albums/"+files[index],
					function (err,stat){
						if(err) {
							callback(err);
							return;
						}
						if(stat.isDirectory()){
							only_dirs.push(files[index]);
						}
						iterator(index+1);
					}
				);


			})(0);
			
		});
}

function load_album(album_name,page,page_size,callback) {
	 fs.readdir(
                'albums/' + album_name,
                function (err,files){
                        if(err) {
				if(err.code == 'ENOENT'){
					callback(no_such_album());
				}else{
					callback(make_error("file_error",JSON.srtingify(err)));
				}
                                
                                return;
                        }
			var only_files = [];
			var path = 'albums/' + album_name + "/";

			(function iterator(index) {

				if(index == files.length) {

					var ps;
					ps = only_files.splice(page*page_size,page_size);
					var obj = {short_name:album_name,
							
						  photos:ps};
					callback(null,obj);
					return;
				}

				fs.stat(path + files[index],
					function (err,stats){
						if(err){
							callback(make_error("file_error",JSON.stringify(err)));			
						        return;
						}
						if(stats.isFile()){
							var obj = {file_name:files[index],
						               	desc:files[index]};
							only_files.push(obj);
						}
						iterator(index+1);		
					}
				);
			})(0);
	
	
		}
	);
}

function handle_incoming_request1(req,res) {
	
	console.log("incoming request:" + req.method + " " + req.url);
	load_albums_list(function (err,albums) {
		if(err) {
			res.writeHead(503, {"Content-Type":"application/json"});
			res.end(JSON.stringify(err) + "\n");
			return;
		}
		
		var out = {
			error:null,
			data: {
				albums:albums
			}
		};
		res.writeHead(200,{"Content-Type":"application/json"});
		res.end(JSON.stringify(out) + "\n");
	});
}


//主处理程序，根据不同的url进行不同的处理
function handle_incoming_request(req,res) {

        console.log("incoming request:" + req.method + " " + req.url);
	
	req.parsed_url = url.parse(req.url,true);
	var core_url = req.parsed_url.pathname;

	if(core_url == '/albums.json'&&req.method.toLowerCase() == "get"){
		handle_list_albums(req,res);
	}else if(core_url.sunstr(core_url.length - 12) == "/rename.json" && req.method.toLowerCase() == "post"){
		handle_rename_album(req,res);

	}else if (core_url.substr(core_url.length -5) == '.json'&& core_url.substr(0,7) == '/albums'){
		handle_get_album(req,res);
	}else{
		send_failure(res,404,invalid_resource());
	}
}

//第一种情况的处理
function handle_list_albums(req,res){
	load_albums_list(function (err,albums){
		if(err){
			send_failure(res,500,err);
			return;
		}
		send_success(res,{albums:albums});
	});
	
}

//第二种情况的处理
function handle_get_album(req,res) {

	var getp = req.parsed_url.query;
	var page_num = getp.page ? getp.page : 0;
	var page_size = getp.page_size ? getp.page_size : 1000;

	if(isNAN(parseInt(page_num))) page_num = 0;
	if(isNAN(parseInt(page_size))) page_size = 1000;

	//format of request is /albums/slbum_name.json
	var core_url = req.parsed_url.pathname;

	var album_name = core_url.substr(7,req.url.length-12);
	load_album(
		album_name,
		page_num,
		page_size,

		function (err,album_contents){
			if(err && err.error == 'no_such_album'){
				send_failure(res,404,err);
			}else if(err){
				send_failure(res,500,err);
			}else{
				send_success(res,{album_data:album_contents });
			}
		}
	);
}

function handle_rename_album(req,res) {
//1.get the album name form url

	var core_url = req.parsed_url.pathname;
	var parts = core_url.split("/");
	if(parts.length != 4){
		send_failure(res,404,invalid_resource(core_url));
		return;
	}
	var album_name = parts[2];
//2.get the post data for the request,this will have the JSON for the new name of the album.
	var json_body = '';
	req.on("reqdable",
		function () {
			var d = req.read();
			if(d){
				if(typeof d == 'string'){
					json_body += d;
				}else if(typeof d == 'object' && d instanceof Buffer){
					json_body += d.toStrig("utf-8");
				}
			}
		});
//3.when we have all the post data,make sure we have valid data and then try to do the rename;
 	req.on("end",
		function (){
			//did we have a body?
			if(json_body){
				try{
					var album_data	= JSON.parse(json_body);
					if(!album_data.album_name) {
						send_failure(res,403,missing_data("album_name"));
						return;
					 }
				}catch(e){
					//got a body ,but not a valid json
					send_failure(res,403,bad_json());
					return;
				}

				//4.perform rename
				do_rename(
					album_name,
					album_data.album_name,

					function(err,results) {
						if(err && err.code == 'ENOENT'){
							send_failure(res,403,no_such_album());return;
						}else if(err){
							send_failure(res,500,file_error(err));return;
						}
						send_success(res,null);
					}
				);
				
			}else {
				//did not get a body
				send_failure(res,403,bad_json());
				res.end();
			}



	});	
}

function make_error(err,msg) {
	var e = new Error(msg);
	e.code = err;
	return e;
}

function send_success(res,data){
	res.writeHead(200,{"Content-Type":"application/json"});
	var output = {error:null,data:data };
	res.end(JSON.stringify(output) + "\n");
	
}

function send_failure(res,code,err){
	
	
	res.writeHead(code,{"Content-Type":"application/json"});
	res.end(JSON.stringify({error:code,message:err.message}) + "\n");
}

function invalid_resource(){
	return make_error("invalid_source","the request resource does not exit");
}

function no_such_album(){
	return make_error("no_such_album","the specified album does not exit");
}
var s = http.createServer(handle_incoming_request).listen(8080);
