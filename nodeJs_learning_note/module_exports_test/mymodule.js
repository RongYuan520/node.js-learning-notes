function hello(){
	this.a=function(){
		console.log('a')
	}
	this.b=function(){
		console.log('b')
	}
}
module.exports=hello;
