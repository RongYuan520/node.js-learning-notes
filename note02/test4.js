var http=require("http");
var server =http.createServer();
server.on('myEvent',function(q){console.log(q)});
server.emit('myEvent','hello');
//server.listen(1337,'127.0.0.1');
console.log("shiyanlou");
