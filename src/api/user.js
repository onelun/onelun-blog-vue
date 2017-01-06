/**
 * Created by onelun on 2017/1/6.
 */
'use strict';
import API from '../config.js';
import Vue from 'vue';
/* import { doError } from './doError'; */

// 获取文章列表-for 最近更新
export const register = function (url, params) {
  return new Promise(function (resolve, reject) {
    /* var tmp = window.sessionStorage.articleLastList;
     console.log(tmp);
     if (tmp) {
     console.log('文章列表数据使用缓存!');
     resolve(tmp);
     return;
     } */
    params['status'] = 1;
    params['errMsg'] = '注册失败';
    Vue.http.get(url, {params: params}).then((response) => {
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
