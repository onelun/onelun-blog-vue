/**
 * Created by onelun on 2016/12/21.
 */
// 线上配置
let CONFIG;
if (process.env.NODE_ENV === 'production') {
  CONFIG = {
    url: 'http://www.onelun.com/api',
    MY_INFO_ID: '578251be1cd6c37a04a4d50b',
    MY: '我',
    EMAIL: '76480877@163.com'
  };
} else {
  CONFIG = {
    url: '/api',
    // 我的信息_id
    MY_INFO_ID: '57ef5987e1bb0b0b7cbd17e8',
    // 我对对评论进行回复的信息
    MY: '我',
    EMAIL: '76480877@163.com'
  };
}

// 接口API根地址
const url = CONFIG.url;
// 我的信息_id
const MY_INFO_ID = CONFIG.MY_INFO_ID;
// 我对对评论进行回复的信息
const MY = CONFIG.MY;
const EMAIL = CONFIG.EMAIL;

module.exports = {
  /**
   * 通用状态码
   * */

  SYS_ERR: 'SYS_ERR', // api请求系统错误

  /**
   * 用户、登录相关
   * */
  MY_INFO_ID: MY_INFO_ID,
  MY: MY,
  EMAIL: EMAIL,
  // 登录
  login: `${url}/api/login`,
  doLogin: `${url}/api/do_login`,

  /**
   * 文章相关
   * */
  // 获取最新的十条文章
  ArticleFrom: '0',
  ArticleNum: '10',
  // 获取文章列表
  getArticleList: `${url}/article/latestList`,
  register: `${url}/user/register`
};
