/**
 * Created by onelun on 2017/1/20.
 */
var express = require('express');
var router = express.Router();
var AV = require('leanengine');
var result = require('./BaseResult');
var successResult = result.SUCCESS_RESULT;
var errorResult = result.ERROR_RESULT;
var queryResult = result.QUERY_RESULT;

router.post('/addTag', function(req, res, next) {
  let cql = 'select count(*) from Tag where name = ?';
  let pvalues = [req.body.name];
  AV.Query.doCloudQuery(cql, pvalues).then(function (data) {
    let count = data.count;
    if (count>0){
      errorResult.message = '新增失败, 标签名称已存在!';
      res.json(errorResult);
    } else {
      // 声明Tag对象
      let Tag = AV.Object.extend('Tag');
      // 新建对象
      let tag = new Tag();
      // 设置属性
      tag.set('name', req.body.name);
      tag.set('catalogueName', req.body.catalogueName);
      tag.save().then(function (tag) {
        successResult.data = tag;
        res.json(successResult);
      }, (error) => {
        console.error(error);
        errorResult.message = '标签新增失败';
        res.json(errorResult);
      });
    }
  }, function (error) {
    console.error(error);
  });
});

router.get('/getTagList', function(req, res, next) {
  var tag = new AV.Query('Tag');
  tag.find().then(function (results) {
    queryResult.datas = results;
    res.json(queryResult);
  }, function (error) {
    console.error(error);
    errorResult.messages = '查询失败,失败原因：'+err.message;
    res.json(result);
  });
});

router.post('/editTag', function(req, res, next) {
  let cql = 'select count(*) from Tag where name = ?';
  let pvalues = [req.body.name];
  AV.Query.doCloudQuery(cql, pvalues).then(function (data) {
    let count = data.count;
    if (count > 0) {
      errorResult.message = '修改失败, 标签名称已存在!';
      res.json(errorResult);
    } else {
      let objectId = req.body.objectId;
      let tag = AV.Object.createWithoutData('Tag', objectId);
      // 修改属性
      tag.set('name', req.body.name);
      tag.set('catalogueName', req.body.catalogueName);
      // 保存到云端
      tag.save().then((tag) => {
        successResult.data = tag;
        res.json(successResult);
      }, (error) => {
        console.error(error);
        errorResult.message = '标签修改失败';
        res.json(errorResult);
      });
    }
  }, function (error) {
    console.error(error);
  });
});

router.post('/deleteTag', function(req, res, next) {
  let objectId = req.body.objectId;
  let tag = AV.Object.createWithoutData('Tag', objectId);
  // 保存到云端
  tag.destroy().then((success) => {
    console.log(success);
    res.json(successResult);
  }, (error) => {
    console.error(error);
    errorResult.message = '标签删除失败';
    res.json(errorResult);
  });
});
module.exports = router;
