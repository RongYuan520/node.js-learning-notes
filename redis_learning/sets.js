var client = require("./client.js").client; 
 
client.sadd('testSets','1');
client.sadd('testSets','a');
client.sadd('testSets','1');

client.smembers('testSets',function(err,data) {
	console.log(data);
});

