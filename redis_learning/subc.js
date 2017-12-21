var client = require('./client').client;

client.subscribe("broadcast_name");

client.on('message',function(channel,msg){
	console.log('receive', msg,' from',channel);
});
