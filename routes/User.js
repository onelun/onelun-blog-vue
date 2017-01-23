/**
 * Created by onelun on 2017/1/5.
 */

var express = require('express');
var router = express.Router();
var AV = require('leanengine');
var result = require('./BaseResult');
var baseResult = result.BASE_RESULT;
var successResult = result.SUCCESS_RESULT;
var errorResult = result.ERROR_RESULT;
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
    baseResult.data = registerUser;
    baseResult.messages = '注册成功';
    res.json(baseResult);
  }, function (error) {
    result = result.ERROR_RESULT;
    result.messages = '注册失败';
    res.json(result);
  });
});
router.get('/login', function(req, res, next) {
  AV.User.logIn(req.query.username, req.query.password).then(function (loginedUser) {
    successResult.data = loginedUser;
    successResult.messages = '登录成功';
    res.json(successResult);
  }, function (error) {
    console.error(error);
    errorResult.messages = '登录失败,失败原因:'+error.message;
    res.json(errorResult);
  });
});
module.exports = router;
