var express = require("express");
var router = express.Router();
var db = require("../model/db.js");
//router.get  /post  /all处理对应方式提交的请求
//get
router.all('/list',function(req,res) {
	console.log(req.method);
	console.log(req.bathUrl);
	console.log(req.headers['Content-Type']);

	console.log(req.query);
	console.log(req.query.name);

//	res.send("get success");
	res.contentType('text/html');
	res.sendFile('/form.html',{root:__dirname + '/../public'});
});


//post
router.all('/form',function(req,res) {
	console.log(req.method);

	console.log(req.body);
	console.log(req.body.name);

	res.send("post success");
});

router.all('/db',function(req,res) {
	var a = db.select();
	res.send(a);
});
module.exports = router;
