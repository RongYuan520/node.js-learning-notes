var mysql = require('mysql');

var connection = mysql.createConnection({

	host:"localhost",
	user:"root",
	password:"root",
	database:"momo"
	
});

connection.connect();

connection.query('select * from person',function(err,rows,fields) {
	if(err){
		throw err;
	}

	console.log("id:",rows[0].id);
});

connection.end();
