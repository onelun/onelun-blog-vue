/**
 * Created by onelun on 2016/12/22.
 */
var express = require('express');
var router = express.Router();
var AV = require('leanengine');
var Article = AV.Object.extend('Article');
var result = require('./BaseResult');
var queryResult = result.QUERY_RESULT;
var errorResult = result.ERROR_RESULT;
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

module.exports = router;
