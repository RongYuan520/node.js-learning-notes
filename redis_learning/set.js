var client = require('./client.js');


client.client.set('hello','this is avalue');

client.client.get('hello',function(err,data) {
	if(err){
		throw err;
	}
	console.log(data);
});
