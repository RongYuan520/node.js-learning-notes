var path = require("path");
var fs = require("fs");



function Album (album_path) {
	this.name = path.basename(album_path);
	this.path = album_path;
}

Album.prototype.name = null;
Album.prototype.path = null;
Album.prototype._photos = null;

Album.prototype.photos = function (callback) {
	if(this._photos != null){
		callback(null,this._photos);
		return;
	}
	var self = this;

         fs.readdir(
                self.path,
                function (err,files){
                        if(err) {
                                if(err.code == 'ENOENT'){
                                        callback(no_such_album());
                                }else{
                                        callback({error:"file_error",message:JSON.srtingify(err)});
                                }

                                return;
                        }
                        var only_files = [];

                        (function iterator(index) {

                                if(index == files.length) {
					self._photos = only_files;
					callback(null,self._photos);
                                        return;
                                }

                                fs.stat(self.path +"/" + files[index],
                                 function (err,stats){
                                                if(err){
                                                         callback({error:"file_error",message:JSON.srtingify(err)});
							 return;
                                                }
                                                if(stats.isFile()){
                                                        only_files.push(files[index]);
                                                }
                                                iterator(index+1);
                                        }
                                );
                        })(0);


                }
        );


}

function no_such_album(){
	return {
		error:"no_such_album",
		message:"the specialfied album does not exit"
	};
}

exports.create_album = function(path) {
	return new Album(path);
} 


