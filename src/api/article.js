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
    console.log(url);
    var tmp = Vue.$sessionStorage[url];
    console.log(tmp);
    if (tmp) {
      console.log('文章列表数据使用缓存!');
      resolve(tmp);
      return;
    }
    Vue.http.get(url).then((response) => {
      // success callback
      console.log(response);
      let result = response.data;
      if (parseInt(result.code) === 1) {
        resolve(result.data);
        Vue.$sessionStorage.$set(url, result.data);
      } else {
        reject(parseInt(result.code));
      }
    }, () => {
      reject(API.SYS_ERR);
    });
  });
};
