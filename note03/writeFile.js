var fs=require("fs");


fs.writeFile('./text.txt','tt12121212121',{'flag':'a'},function(err,data){
	if(err){
		throw err;
		console.log('error');
	}
	console.log('success');
	console.log(data);
});


fs.readFile('./text.txt','utf-8',function(err,data){
	if(err) {
		throw err;
	}
	console.log(data);
});
