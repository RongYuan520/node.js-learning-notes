var Db = require("mongodb");
var Connection = require("mongodb").Connection;
var Server = require("mongodb").Server;

var host = "localhost";
var port = 27017;

//创建并链接数据库
var db = new Db("PhotoAlbums",
		new Server(host,port,{
					auto_reconnect:true,
					poolSize:20
							
					}),
		{w:1});

db.open(function(err,data){
	if(err){
		console.log("打开失败");
		return;
	}
	console.log("connect success");
});

//创建集合（数据库表）
db.collection("albums",function(err,albums){
	if(err){
		console.log("创建失败");
		return;
	}
	console.log("创建成功");
});

//向集合中插入文档（插入数据）
var album = {
	_id:"italy2012",
	name:"italy2012",
	date:"2017/12/28",
}
var albums = db.albums;
albums.insert(album,{safe:true},function(err,inserted_doc){
	if(err && err.name == 'MongoError' && err.code == 11000){
		console.log("这条文档已经存在");
		return;
	}else if(err){
		console.log("something bad happened");
		return;
	}
	console.log("插入文档成功");
});
