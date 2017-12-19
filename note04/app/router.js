var fs = require('fs');

//路由函数
//处理不同的url请求
//并返回相应内容
//

function route(handle,pathname,res,req) {
	console.log('about to  route a request for' + pathname);
	
	//判断url是否存在特定处理函数
	//存在，调用handle
	//不存在返回404
	

	if(typeof handle[pathname] === 'function'){
		handle[pathname](res,req);
	}else{
		console.log('no request handler found for' + pathname);	
		//读取404页面
		//所有页面都存放在view文件夹下
		var content = fs.readFileSync('./views/404.html');
		res.write(content);
		res.end();
	}
}
//导出route方法
exports.route = route;
