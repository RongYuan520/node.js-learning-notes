var http = require("http");
var handle = require("../modle/handel_album.js");

function router(core_url,req,res){
	console.log(handle.create_handle);

        if(core_url == '/albums.json'&&req.method.toLowerCase() == "get"){
               handle.create_handle().handle_list_albums(req,res);
        }else if(core_url.substr(core_url.length - 12) == "/rename.json" && req.method.toLowerCase() == "post"){
               handle.handle.handle_rename_album(req,res);

        }else if (core_url.substr(core_url.length -5) == '.json'&& core_url.substr(0,7) == '/albums'){
                handle.handle.handle_get_album(req,res);
        }else{
                handle.handle.send_failure(res,404,invalid_resource());
        }

}

exports.router = router;
