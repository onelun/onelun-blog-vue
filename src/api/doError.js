/**
 * Created by xiangsongtao on 16/8/8.
 * Description:统一的错误处理
 * 统一的错误处理方法: 8-数据库查找错误；9-非admin用户；10-token错误或超时（（Token 2h内有效）
 * 其余由api自己处理: 2~5-失败；
 */
import API from '../config.js';
import {Message} from 'element-ui';
export const doError = function (result) {
  let code = parseInt(result.code);
  switch (code) {
    case -1:
      Message({
        message: result.message || API.SYS_ERR.message,
        showClose: true,
        type: 'error'
      });
      break;
    case -3:
      Message({
        message: 'Token超时,请再登陆!',
        showClose: true,
        type: 'warning'
      });
      window.$router.replace({
        name: 'user'
      });
      break;
    default:
      Message({
        message: API.SYS_ERR.message,
        showClose: true,
        type: 'error'
      });
      break;
  }
  return result;
};
