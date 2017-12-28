var mysql = require("mysql");

var redis = require("redis");



var conf = require(__dirname + '/../util/readConf.js');

var redis_port = conf.conf.redis_port;
var redis_host = conf.conf.redis_host;

var connection = mysql.createConnection({
	host:conf.conf.host,
	user:conf.conf.user,
	password:conf.conf.password,
	database:conf.conf.database
});


function query(id){


	connection.connect();
	connection.query('select * from person where id=' + id,function(err,rows,fields) {
		if(err){
			throw err;
		}
		name = rows[0].name;
		console.log('other',name);
		
		var client = redis.createClient(redis_port,redis_host);

		client.publish("person_information",name);
		connection.end();
	});
	//接受广播
	var client = redis.createClient(redis_port,redis_host);

	client.subscribe("person_information");

	client.on('message',function(channel,msg){
	//	console.log('receive', msg,' from',channel);
		return msg;
		process.exit(code = 0);
	});

	
}


//单模块测试
//console.log(query(251110));
//

function insert(area,price) {
	var connection = mysql.createConnection({
        host:conf.conf.host,
        user:conf.conf.user,
        password:conf.conf.password,
        database:conf.conf.database
       });
	connection.connect();
	
	var sql = 'insert into housePrice values (' + area +',' +price +')';
	connection.query(sql,function (err,result){
		if(err){
			throw err;
		}
		console.log("insert success");
	} );

	connection.end();
}

//insert(12,24);
exports.queryNameById = query;

exports.insertAreaPrice = insert;
