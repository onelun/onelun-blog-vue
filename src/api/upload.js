/**
 * Created by onelun on 2017/2/17.
 */
import API from '../config.js';
import Vue from 'vue';
// 图片压缩+方向矫正处理
import imageResize from '../plugin/imageResize';
import {doError} from './doError';
// 图片上传
export const ImageUpload = function (_file) {
  // 1. 传入filer参数
  return new Promise(function (resolve, reject) {
    // 2. 将img值进行方向矫正,裁剪压缩
    imageResize(_file, function (_form) {
      console.log(_form);
      // 3. 文件上传
      Vue.http.post(API.imgUpload, _form).then(function (response) {
        let result = response.data;
        if (parseInt(result.code) === 1) {
          resolve(result);
        } else {
          reject(doError(result));
        }
      }, function (error) {
        reject(doError(error));
      });
    });
  });
};
