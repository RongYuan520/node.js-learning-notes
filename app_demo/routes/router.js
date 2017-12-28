var express = require("express");
var router = express.Router();
var handel_person = require("../model/handel_person.js");
var insertAreaPrice = require("../model/insertAreaPrice.js");
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
router.all('/form',function(req,res) {
        console.log(req.method);

        console.log(req.body);
        console.log(req.body.name);

        res.send("post success");
});

//------------问卷调查页面------------
router.all('/insert',function (req,res){
	res.contentType('text/html');
        res.sendFile('/insertHousePrice.html',{root:__dirname + '/../public'});

	
	
});


router.all("/insertAreaPrice",function (req,res){
	//拿页面请求的参数，传递给
	        var area = req.query.area;
                var price = req.query.price;
	        insertAreaPrice.insertAreaPrice(area,price);
		res.send('thank!');

});


//-----------------------------最后的test-----------------------------------
router.all("/last",function(req,res) {
	res.contentType("text/html");
	res.sendFile("/insertPerson.html",{root:__dirname + '/../public'});
});

router.all("/searchName",function(req,res) {
	console.log("----------------------------------------");
	//操作数据库，将数据插入数据库表
	var id = req.query.id;
	

	var mysql = require("mysql");
	var connection = mysql.createConnection({
		host:"localhost",
		user:"root",
		
		password:"root",
		database:"momo"
		
		
	});
	connection.connect(function(err,data) {
		if(err) {
			console.log('connection error');
		}
	});
	console.log('select * from person where id=' + id);
	connection.query('select * from person where id=' + id + ";",function(err,rows,fields) {
		if(err){
			throw err;
		}
		var name = rows[0].name;
		res.end("hello  " + name);
		connection.end();
	});

	
});

//--------------------------------------------




module.exports = router;
