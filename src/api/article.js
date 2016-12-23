/**
 * Created by onelun on 2016/12/21.
 */
'use strict';
import API from '../config.js';
import Vue from 'vue';
/* import { doError } from './doError'; */

// 获取文章列表-for 最近更新
export const getArticleLastList = function (url) {
  return new Promise(function (resolve, reject) {
    /* var tmp = window.sessionStorage.articleLastList;
    console.log(tmp);
    if (tmp) {
      console.log('文章列表数据使用缓存!');
      resolve(tmp);
      return;
    } */
    Vue.http.get(url, {params: { status: 1, errMsg: '获取最新文章失败' }}).then((response) => {
      // success callback
      let result = response.data;
      if (parseInt(result.status) === 1) {
        resolve(result);
        // Vue.$sessionStorage.$set(url, result.data);
      } else {
        reject(parseInt(result.status));
      }
    }, () => {
      reject(API.SYS_ERR);
    });
  });
};
