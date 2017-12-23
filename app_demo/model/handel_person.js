var DBHelper = require(__dirname + "/../jdbc/DBHelper.js");

function getNameById(id){
	
	var name = DBHelper.queryNameById(id);	
	console.log(name);
	
}
//console.log(getNameById(251110));



exports.getNameById  = getNameById;
