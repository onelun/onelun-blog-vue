/**
 * Created by onelun on 2016/12/22.
 */
var express = require('express');
var router = express.Router();
var AV = require('leanengine');

var Article = AV.Object.extend('Article');

/**
 * 文章最新列表
 */
router.get('/latestList', function(req, res, next) {
  var status = 0;
  var errMsg = null;
  if (req.query) {
    status = req.query.status || 0;
    errMsg = req.query.errMsg;
  }
  var query = new AV.Query(Article);
  query.descending('updatedAt');
  query.limit(50);
  query.find({sessionToken: req.sessionToken}).then(function(results) {
    res.json({
      title: 'ARTICLE 列表',
      user: req.currentUser,
      articles: results,
      status: status,
      errMsg: errMsg
    });
  }, function(err) {
    if (err.code === 101) {
      res.json({
        title: 'ARTICLE 列表',
        user: req.currentUser,
        articles: [],
        status: status,
        errMsg: errMsg
      });
    } else {
      throw err;
    }
  }).catch(next);
});

module.exports = router;
