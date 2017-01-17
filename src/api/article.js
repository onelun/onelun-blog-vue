/**
 * Created by onelun on 2016/12/21.
 */
'use strict';
import API from '../config.js';
import Vue from 'vue';
/* import { doError } from './doError'; */

// 获取文章列表-for 最近更新
export const getArticleLastList = function (params) {
  return new Promise((resolve, reject) => {
    console.log(API.getArticleList);
    Vue.http.get(API.getArticleList, { params: params }).then((response) => {
      // success callback
      let result = response.data;
      console.log(response.data);
      if (parseInt(result.code) === 1) {
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
