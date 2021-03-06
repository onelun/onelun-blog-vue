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
  query.count().then((count) => {
    queryResult.total = count;
    query.descending('updatedAt');
    query.equalTo('state', true);
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

router.post('/editArticle', function(req, res, next) {
  let objectId = req.body.objectId;
  let Article = AV.Object.createWithoutData('Article', objectId);
  // 修改属性
  Article.set('title', req.body.title);
  Article.set('publishTime', req.body.publishTime);
  Article.set('tags', req.body.tags);
  Article.set('state', req.body.state);
  Article.set('content', req.body.content);
  Article.set('source', req.body.source);
  Article.set('link', req.body.link);
  Article.set('abstract', req.body.content.substring(0, 120) + '...');
  // 保存到云端
  Article.save().then((Article) => {
    // 返回保存结果
    successResult.data = Article;
    res.json(successResult);
  }, (error) => {
    console.error(error);
    errorResult.message = '文章编辑失败';
    res.json(errorResult);
  });
});

router.get('/getArticleById', function(req, res, next) {
  let query = new AV.Query(Article);
  let objectId = req.query.objectId;
  query.get(objectId).then(function (article) {
    successResult.data = article;
    res.json(successResult);
  }, function(err) {
    console.error(err);
    errorResult.messages = '查询失败,失败原因：'+err.message;
    res.json(result);
  }).catch(next);
});

router.post('/incrementReadNum', function(req, res, next) {
  let objectId = req.body.objectId;
  let Article = AV.Object.createWithoutData('Article', objectId);
  Article.increment('readNum', 1);
  Article.save(null, {fetchWhenSave: true}).catch((error) => {
    console.error(error);
  });
  res.json(successResult);
});

module.exports = router;
