//导入express
var express = require('express');
// 导入moment
const moment=require('moment');
const AccountModel=require('../../modles/AccountModel');
//导入中间件检索登录
let checkLoginMiddleware=require('../../middleware/checkLoginMiddleware')
//创建路由对象
var router = express.Router();

// 添加首页路由规则
router.get('/',(req,res)=>{
  //重定向 /account
  res.redirect('/account')
})

//记账本的列表
router.get('/account',checkLoginMiddleware,function(req,res,next){
//获取所有的账单信息
AccountModel.find().sort({time:-1}).exec((err,data)=>{
  if(err){
    res.status(500).send('读取失败~~~');
    return;
  }
  //响应成功提示
res.render('list',{accounts:data,moment:moment});

})
});

//添加记录
router.get('/account/create',checkLoginMiddleware,function(req,res,next){
  res.render('create');
})

//新增记录
router.post('/account',checkLoginMiddleware,(req,res)=>{
  //插入数据库
 AccountModel.create({
  ...req.body,
  //修改time属性的值
  time:moment(req.body.time).toDate()
 },(err,data)=>{
  if(err){
    res.status(500).send('插入失败~');
    return;
  }  //成功提醒
  res.render('success',{msg:'数据添加成功~',url:'/account'});
 })
});

//删除记录
router.get('/account/:id',checkLoginMiddleware,(req,res)=>{
  //获取params的id参数
  let id=req.params.id;
  //删除
AccountModel.deleteOne({_id:id},(err,data)=>{
  if(err){
    res.status(500).send('删除失败~');
    return;
  }
    //提醒
    res.render('success',{msg:'数据删除成功~',url:'/account'});
})

});

module.exports = router;
