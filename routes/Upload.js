/**
 * Created by onelun on 2017/1/5.
 */
let express = require('express');
let router = express.Router();
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
let fs = require('fs');

let result = require('./BaseResult');
let baseResult = result.BASE_RESULT;
let successResult = result.SUCCESS_RESULT;
let errorResult = result.ERROR_RESULT;
/**
 * Upload img
 * */
// 之后还需要uuid找图片,图片压缩,裁剪的功能
router.post('/imgupload', multipartMiddleware, function (req, res, next) {
  console.log('req.files')
  // console.log(req)
  if (req.files) {
    const UploadFilePath = './static/uploads/';
    let imgInfo = req.files.uploadImg;
    fs.readFile(imgInfo.path, function (err, data) {
      if (err) {
        console.log(err);
        errorResult.message = '图片读取失败';
        res.json(errorResult);
        return;
      }
      let arr = imgInfo.type.split('/');
      let suffix = arr[arr.length - 1];
      // 新建文件名
      let fileName = `${Date.parse(new Date())}.${suffix}`;
      let uploadPath = `${UploadFilePath}${fileName}`;
      console.log('上传图片的存放位置:' + uploadPath);
      fs.writeFile(uploadPath, data, function (err) {
        if (err) {
          console.log(err);
          errorResult.message = '图片保存失败';
          res.json(errorResult);
          return;
        }
        successResult.message = '图片保存成功';
        successResult.data = fileName;
        res.json(successResult);
      });
    });
  } else {
    errorResult.message = '图片不存在';
    res.json(errorResult);
  }
});

module.exports = router;
