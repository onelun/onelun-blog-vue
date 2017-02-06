/**
 * Created by onelun on 2016/12/21.
 */
'use strict';
import API from '../config.js';
import Vue from 'vue';
import { doError } from './doError';

// 获取文章列表-for 最近更新
export const getArticleLastList = function (params) {
  return new Promise((resolve, reject) => {
    Vue.http.get(API.getArticleLatestList, { params: params }).then((response) => {
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

/**
 * 获取文章列表（无分页）
 * @param params
 * @returns {Promise}
 * @constructor
 */
export const GetArticleList = function (params) {
  return new Promise(function (resolve, reject) {
    Vue.http.get(API.getArticleList, params).then((response) => {
      let result = response.data;
      if (parseInt(result.code) === 1) {
        resolve(result);
      } else {
        reject(doError(result));
      }
    }, (error) => {
      console.error(error.message);
      reject(doError(error));
    });
  });
};

export const DeleteArticle = function (params) {
  return new Promise(function (resolve, reject) {
    Vue.http.post(API.deleteArticle, params).then((response) => {
      let result = response.data;
      if (parseInt(result.code) === 1) {
        resolve(result);
      } else {
        reject(doError(result));
      }
    }, (error) => {
      console.error(error.message);
      reject(doError(error));
    });
  });
};

