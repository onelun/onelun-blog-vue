// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history', // 启用HTML5 history模式
  base: __dirname, // 应用的基路径
  routes: require('./router')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
});
