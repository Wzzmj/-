
/**
 * 
 * @param {*} success 数据库连接成功的回调
 * @param {*} error 数据库连接的回调
 */ 
module.exports=function(success,error){
    //判断error 为其设置默认值
    if(typeof error!=='function'){
        error=()=>{
            console.log('连接失败');
        }
    }
// 1.安装Mongoose
// 2.导入Mongoose
const mongoose=require('mongoose');
//导入配置文件
const {DBHOST,DBPORT,DBNAME} =require('../config/config.js');

//设置strictQuery 为true
mongoose.set('strictQuery',true);

// 3.链接mongodb服务                           数据库的名称
mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

// 4.设置回调
// 设置连接成功的回调  推荐使用once 而不是on  事件回调函数只执行一次
mongoose.connection.once('open',()=>{
    success();
});

// 设置连接错误的回调
mongoose.connection.on('error',()=>{
    error();
});

// 设置连接关闭的回调
mongoose.connection.on('close',()=>{
    console.log('连接关闭');
});

}