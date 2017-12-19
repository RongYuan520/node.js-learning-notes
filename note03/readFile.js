var fs=require('fs');//引入fs模块
fs.readFile('./text.txt','utf-8',function(err,data){
	if(err){
		throw err;
		console.log('read error!');
	}
	console.log(data);
});
