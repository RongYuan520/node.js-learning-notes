var http = require("http");
var fs = require("fs");
var url = require("url");
function handle(){
this.make_error = function(err,msg) {
        var e = new Error(msg);
        e.code = err;
        return e;
}

this.send_success = function(res,data){
        res.writeHead(200,{"Content-Type":"application/json"});
        var output = {error:null,data:data };
        res.end(JSON.stringify(output) + "\n");

}

send_failure = function(res,code,err){


        res.writeHead(code,{"Content-Type":"application/json"});
        res.end(JSON.stringify({error:code,message:err.message}) + "\n");
}

this.invalid_resource = function(){
        return make_error("invalid_source","the request resource does not exit");
}

this.no_such_album = function(){
        return make_error("no_such_album","the specified album does not exit");
}
this.handle_get_album = function(req,res) {

        var getp = req.parsed_url.query;
        var page_num = getp.page ? getp.page : 0;
        var page_size = getp.page_size ? getp.page_size : 1000;

        if(isNAN(parseInt(page_num))) page_num = 0;
        if(isNAN(parseInt(page_size))) page_size = 1000;


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


this.load_album = function(album_name,page,page_size,callback) {
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

this.load_albums_list = function(callback) {
        fs.readdir(
                'albums/',
                function (err,files){
                        if(err) {
                                callback(err);
                                return;
                        }
			 var only_dirs = [];
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

this.handle_list_albums = function(req,res){
        this.load_albums_list(function (err,albums){
                if(err){
                       send_failure(res,500,err);
                        return;
                }
               this.send_success(res,{albums:albums});
        });

}

}
//module.exports = handle;

exports.create_handle = function () {
	return new handle();
}
