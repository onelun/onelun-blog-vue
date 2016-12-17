// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import 'assets/css/util.scss';
import 'bootstrap/scss/bootstrap.slim.scss';
import 'bootstrap/js/tooltip.js';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/transition.js';
import ua from './plugin/parseUA';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history', // 启用HTML5 history模式
  base: __dirname, // 应用的基路径
  routes: require('./router')
});
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
