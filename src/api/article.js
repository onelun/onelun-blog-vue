/**
 * Created by onelun on 2016/12/21.
 */
'use strict';
import AV from 'leanengine';
const article = AV.Object.extend('Article');

// 获取文章列表-for 最近更新
export const getArticleListForFrontEnd = function () {
  return new Promise(function (resolve, reject) {
    var query = new AV.QUERY(article);
    query.descendants('createdAt');
    query.find().then(function (results) {
      console.log(results);
      resolve(results);
    }, function (error) {
      console.error(error.message);
      reject('SYS_ERR');
    });
  });
};
