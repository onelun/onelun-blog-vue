/**
 * Created by onelun on 2016/12/21.
 */
'use strict';
import API from '../config.js';
import Vue from 'vue';
/* import { doError } from './doError'; */

// 获取文章列表-for 最近更新
export const getArticleLastList = function (url) {
  return new Promise( (resolve, reject) => {
    Vue.http.get(url, {params: { status: 1, errMsg: '获取最新文章失败' }}).then((response) => {
      // success callback
      let result = response.data;
      if (parseInt(result.status) === 1) {
        resolve(result);
        // Vue.$sessionStorage.$set(url, result.data);
      } else {
        reject(result);
      }
    }, (error) => {
      console.error(error);
      reject(API.SYS_ERR);
    });
  });
};
