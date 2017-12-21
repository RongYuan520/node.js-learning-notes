var client = require("./client").client;

client.rpush('testLists','a');
client.rpush('testLists','b');
client.rpush('testLists','c');
client.rpush('testLists',1);

client.lrange('testLists',0,-1,function(err,data) {
	if(err){
		throw err
	}
	console.log("The data is" ,data);
});



