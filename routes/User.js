/**
 * Created by onelun on 2017/1/5.
 */

var express = require('express');
var router = express.Router();
var AV = require('leanengine');
router.get('/register', function(req, res, next) {
  var status = 0;
  var errMsg = null;
  if (req.query) {
    status = req.query.status || 0;
    errMsg = req.query.errMsg;
  }
  // 新建 AVUser 对象实例
  var user = new AV.User();
  // 设置用户名
  user.setUsername(req.query.username);
  // 设置密码
  user.setPassword(req.query.password);
  // 设置邮箱
  user.setMobilePhoneNumber(req.query.phone);
  console.log(user);
  user.signUp().then(function (loginedUser) {
    console.log(loginedUser);
    res.json({
      title: '注册成功',
      user: loginedUser,
      status: status,
      errMsg: ''
    });
  }, function (error) {
  });
});

module.exports = router;
