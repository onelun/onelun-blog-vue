// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'babel-polyfill';
import router from './router.js';
import App from './App.vue';
import 'assets/css/util.scss';
import 'bootstrap/scss/bootstrap.slim.scss';
import 'bootstrap/js/tooltip.js';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/transition.js';
import 'element-ui/lib/theme-default/index.css';
import ua from './plugin/parseUA';
import VueResource from 'vue-resource';
/**
 * vue-resource 配置
 */
Vue.use(VueResource);
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
Vue.http.headers.common['Content-Type'] = 'application/json; charset=utf-8';

/**
 * $router全局化，便于外部js调用
 * @type {VueRouter}
 */
window.$router = router;

/**
 * 浏览环境判断，保存为全局
 */
window.ua = ua;

/**
 * 发布模式禁用console.log()
 */
if (process.env.NODE_ENV === 'production') {
  console.log = function () {
  };
  console.warn = function () {
  };
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
});
