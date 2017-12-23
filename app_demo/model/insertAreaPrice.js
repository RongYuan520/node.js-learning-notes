var DBHelper = require("../jdbc/DBHelper.js"); 
function insertAreaPrice (area,price){
	 //1，进行数据处理(本次不需要处理)
	 //......
	 //2.把处理厚的结果保存到数据库
         DBHelper.insertAreaPrice(area,price);
}
exports.insertAreaPrice = insertAreaPrice;
