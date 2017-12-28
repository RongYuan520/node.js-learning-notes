var amgr = require("../lib/albums.js");

amgr.albums("./",function (err,albums){
	if(err){
		console.log("unexpected error:" + JSON.stringify(err));return;
	}
	(function iterator(index){
		if(index == albums.length){
			console.log("Done");return;
		}
		albums[index].photos(function(err,photos){
			if(err){
				console.log("Err loading album:" + JSON.stringify(err));return;
			}
			console.log(albums[index].name);
			console.log(photos);
			console.log("");
			iterator(index+1);
		});
	})(0);
});
