# node.js-learning-note
这个项目是初学Nodejs的每日笔记

note01 主要学习了exports导出，以及module.exports导出，以及require引用模块。

note02 学习了Events事件，以及响应事件的监听器函数.包括添加，移除监听器函数
	1.以建立一个简单的http服务器为例，当服务器启动后，当有用户访问服务器时，触发request事件，并为该事件添加一个监听函数，该监听函数返回结果给客户端
	test1.js :
	var http=require("http");
	var server=http.createServer();

	//为request事件绑定事件处理函数
	//也可以使用server.addListener

	server.on('request',function(rec,res){
		//为request事件添加一个匿名的listner函数
		res.writeHead(200,{'Content-type':'text/plain'});//写入http响应头
		res.write("shiyanlou");//写入http响应体
		console.log('shiyanlou');
		res.end();//结束，返回响应内容
	});

	server.listen(1337,'127.0.0.1');//在127.0.0.1（本地回环）1337端口监听http请求
	console.log('server running at http://127.0.0.1:1337/');

	2.server.on(event,listener),监听函数listner可以一直响应，只要触发事件event，就会执行对应方法。---------------------test2.js
	  server.once(event,listner),监听函数只能响应一次，第一次触发事件可以响应，其余都不响应。

	3.移除监听器------------------------------------------------------------test3.js
		server.on('request',callback);
		server.removeListener('request',callback);//移除监听器

	4.除了引入封装好的模块，触发模块的一些事件，还可以自定义事件，并触发。emit(eventName,arguments)---------------------------test4.js
		var http=require("http");
		var server =http.createServer();
		server.on('myEvent',function(q){console.log(q)});
		server.emit('myEvent','hello');

note03  学习了fs 模块，读取文件。

note04 一个小app demo

note05 Tcp  Udp  http学习

note06 进程的了解

-----------------------------------------------------------------------------------------------------------------------------------------------------

Nodejs实战学习笔记

chapter01  nodejs访问服务器的两种方式，一种是浏览器方式，另一种是命令行curl

chapter04 js内部接口的定义
       funciton load_file(fileName,callback) {
                fs.read(
                        fileName,
                        callback(req,res)
                 )
        }

	调用：
	load_file("/usr/xx.txt",function(req,res) {

	})



chapter04_module  对chapter04的项目进行模块化。
	
	-model
	-views
	-routes
	-main.js
	-package.json

chapter05  album_mgr相册管理系统。


chapter6,7,8 未完

------------------------------------------------------------------------------------------------------------------------------------------------------
