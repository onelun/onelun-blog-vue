/**
 * Created by onelun on 2017/1/20.
 */
'use strict';
import API from '../config.js';
import Vue from 'vue';
import {doError} from './doError';
export const AddTag = function (params) {
  return new Promise(function (resolve, reject) {
    Vue.http.post(API.addTag, params).then((response) => {
      let result = response.data;
      if (parseInt(result.code) === 1) {
        resolve(result.data);
      } else {
        reject(doError(result));
      }
    }, (error) => {
      console.error(error.message);
      reject(doError(error));
    });
  });
};

/**
 * 获取tag标签列表
 * @param params
 * @returns {Promise}
 * @constructor
 */
export const GetTagList = function (params) {
  return new Promise(function (resolve, reject) {
    Vue.http.get(API.getTagList, params).then((response) => {
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

/**
 * 编辑Tag标签
 * @param params
 * @returns {Promise}
 * @constructor
 */
export const EditTag = function (params) {
  return new Promise(function (resolve, reject) {
    Vue.http.post(API.editTag, params).then((response) => {
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
/**
 * 删除Tag标签
 * @param params
 * @returns {Promise}
 * @constructor
 */
export const DeleteTag = function (params) {
  return new Promise(function (resolve, reject) {
    Vue.http.post(API.deleteTag, params).then((response) => {
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
