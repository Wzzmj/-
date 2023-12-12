//导入mongoose
const mongoose=require('mongoose');
// 创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let AccountSchema=new mongoose.Schema({
   matter:{
    type:String,
    required:true
   },
   date:Date,
   type:{
    type:String,
    default:'支出'
   },
   money:{
    type:Number,
    required:true
   },
   remark:{
    type:String
   }


});    
   
// 创建模型对象 对文档操作的封装对象
let AccountModel=mongoose.model('accounts',AccountSchema);

//暴露模型对象
module.exports=AccountModel;