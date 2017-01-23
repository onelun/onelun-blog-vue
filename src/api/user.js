/**
 * Created by onelun on 2017/1/6.
 */
'use strict';
import API from '../config.js';
import Vue from 'vue';
/* import { doError } from './doError'; */

// 注册
export const register = function (params) {
  return new Promise(function (resolve, reject) {
    Vue.http.get(API.register, {params: params}).then((response) => {
      // success callback
      let result = response.data;
      if (parseInt(result.code) === 1) {
        resolve(result);
        // Vue.$sessionStorage.$set(url, result.data);
      } else {
        reject(parseInt(result.code));
      }
    }, (error) => {
      console.error(error);
      reject(API.SYS_ERR);
    });
  });
};
// 登录
export const login = function (params) {
  return new Promise(function (resolve, reject) {
    Vue.http.get(API.login, {params: params}).then((response) => {
      // success callback
      let result = response.data;
      console.log(result);
      if (parseInt(result.code) === 1) {
        resolve(result);
      } else {
        reject(result);
      }
    }, (error) => {
      console.error(error);
      reject(API.SYS_ERR);
    });
  });
};
