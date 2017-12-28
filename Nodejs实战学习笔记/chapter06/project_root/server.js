function handle_incoming_request(req,res) {
	req.parsed_url = url.parse(req.url,true);
	var core_url = req.parsed_url.pathname;

	if(core_url.substring(0,9) == "/content/"){
		serve_static_file("content/" + core_url.substring(9),res);
	}else if(core_url.substring(0,7) == '/albums' && core_url.sunstr(core_url.length - 5) == '.json'){
		handle_list_album(req,res);
	}else{
		send_failure(res,404,invalid_resource());
	}	
}
