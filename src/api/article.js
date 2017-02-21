/**
 * Created by onelun on 2016/12/21.
 */
'use strict';
import API from '../config.js';
import Vue from 'vue';
import {doError} from './doError';
import {GetTagListByCache} from './tag';
// 获取文章列表-for 最近更新
export const getArticleLastList = function (params) {
  return new Promise((resolve, reject) => {
    let tmp = Vue.$sessionStorage[API.getArticleLatestList];
    if (!!tmp) {
      console.log('文章列表数据缓存');
      resolve(tmp);
      return;
    }
    let result = {};
    Vue.http.get(API.getArticleLatestList, { params: params }).then((response) => {
      // success callback
      result = response.data;
      if (parseInt(result.code) === 1) {
        resolve(result);
        Vue.$sessionStorage.$set(API.getArticleLatestList, result);
      } else {
        reject(result);
      }
    }, (error) => {
      console.error(error);
      reject(API.SYS_ERR);
    }).then((count) => {
      result.total = count;
      resolve(result);
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

export const EditArticle = function (params) {
  return new Promise(function (resolve, reject) {
    Vue.http.post(API.editArticle, params).then((response) => {
      let result = response.data;
      if (parseInt(result.code) === 1) {
        resolve(result);
      } else {
        reject(doError(result));
      }
    }, (error) => {
      reject(doError(error));
    });
  });
};

export const GetArticleById = function (id) {
  return new Promise(function (resolve, reject) {
    let tmp = Vue.$sessionStorage[API.getArticleById + '_' + id];
    if (!!tmp) {
      console.log('文章数据缓存');
      resolve(tmp);
      return;
    }
    console.log('文章获取网络数据');
    Vue.http.get(API.getArticleById, {params: {objectId: id}}).then((response) => {
      let result = response.data;
      if (parseInt(result.code) === 1) {
        resolve(result);
        Vue.$sessionStorage.$set(API.getArticleById + '_' + id, result);
      } else {
        reject(doError(result));
      }
    }, (error) => {
      reject(doError(error));
    });
  });
};
