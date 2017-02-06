/**
 * Created by onelun on 2016/12/22.
 */
var express = require('express');
var router = express.Router();
var AV = require('leanengine');
const Article = AV.Object.extend('Article');
const result = require('./BaseResult');
const queryResult = result.QUERY_RESULT;
const errorResult = result.ERROR_RESULT;
const successResult = result.SUCCESS_RESULT;
/**
 * 文章最新列表(分页)
 */
router.get('/latestList', function(req, res, next) {
  let pageIndex = req.query.pageIndex || 1;
  let pageSize = req.query.pageSize || 10;
  let query = new AV.Query(Article);
  query.descending('updatedAt');
  query.limit(pageSize);
  query.skip((pageIndex-1)*pageSize);
  query.find().then(function(results) {
    queryResult.datas = results;
    res.json(queryResult);
  }, function(err) {
    console.error(err);
    errorResult.messages = '查询失败,失败原因：'+err.message;
    res.json(result);
  }).catch(next);
});

router.get('/getArticleList', function(req, res, next) {
  let query = new AV.Query(Article);
  query.descending('updatedAt');
  query.find().then(function(results) {
    queryResult.datas = results;
    res.json(queryResult);
  }, function(err) {
    console.error(err);
    errorResult.messages = '查询失败,失败原因：'+err.message;
    res.json(result);
  }).catch(next);
});

router.post('/deleteArticle', function(req, res, next) {
  let objectId = req.body.objectId;
  let tag = AV.Object.createWithoutData('Article', objectId);
  // 删除文章
  tag.destroy().then((success) => {
    console.log(success);
    res.json(successResult);
  }, (error) => {
    console.error(error);
    errorResult.message = '文章删除失败';
    res.json(errorResult);
  });
});

module.exports = router;
