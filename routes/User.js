/**
 * Created by onelun on 2017/1/5.
 */

var express = require('express');
var router = express.Router();
var AV = require('leanengine');
var result = require('./BaseResult');
router.get('/register', function(req, res, next) {
  // 新建 AVUser 对象实例
  var user = new AV.User();
  // 设置用户名
  user.setUsername(req.query.username);
  // 设置密码
  user.setPassword(req.query.password);
  // 设置邮箱
  user.setMobilePhoneNumber(req.query.phone);
  console.log(user);
  user.signUp().then((registerUser) => {
    console.log(registerUser);
    result = result.SUCCESS_RESULT;
    result.data = registerUser;
    result.messages = '注册成功';
    res.json(result);
  }, function (error) {
    result = result.ERROR_RESULT;
    result.messages = '注册失败';
    res.json(result);
  });
});
router.get('/login', function(req, res, next) {
  // 新建 AVUser 对象实例
  var user = new AV.User();
  // 设置用户名
  user.setUsername(req.query.username);
  // 设置密码
  user.setPassword(req.query.password);
  // 设置邮箱
  user.setMobilePhoneNumber(req.query.phone);
  console.log(user);
  user.signUp().then((registerUser) => {
    console.log(registerUser);
    result = result.SUCCESS_RESULT;
    result.data = registerUser;
    result.messages = '注册成功';
    res.json(result);
  }, function (error) {
    result = result.ERROR_RESULT;
    result.messages = '注册失败';
    res.json(result);
  });
});
module.exports = router;
