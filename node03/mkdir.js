var fs=require('fs');
fs.mkdir('./newdir',function(err){
	
	if(err){
		throw err;
	}	
	console.log('success');
});
fs.rmdir('./newdir',function(err){

        if(err){
                throw err;
        }
        console.log('success');
});
