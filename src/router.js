/**
 * Created by onelun on 2016/12/15.
 */
import Vue from 'vue';
import store from './vuex/store';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'index',
    component: require('./views/blog/index.vue')
  },
  {
    path: '/blog',
    name: 'blog',
    component: require('./views/blog/blog.vue'),
    redirect: {
      name: 'artList',
      query: {
        listType: 'latest'
      }
    },
    children: [
      {
        path: 'art-list',
        name: 'artList',
        component: require('./views/blog/articleList.vue')
      },
      {
        path: 'his-list',
        name: 'historyList',
        component: require('./views/blog/historyList.vue')
      }
    ]
  },
  {
    path: '/music',
    name: 'music',
    component: require('./views/blog/music.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: require('./views/blog/user.vue'),
    redirect: {
      name: 'login',
      query: {
        userType: 'login'
      }
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: require('./views/blog/login.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: require('./views/blog/register.vue')
      }
    ]
  }
];
const router = new VueRouter({
  mode: 'history', // 启用HTML5 history模式
  base: '/', // 应用的基路径
  routes: routes
});
/**
 * 登录状态检查
 * */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 未登录状态
    console.log(store.state.isLogin);
    if (!store.state.isLogin) {
      // 存在authorization信息，则验证下。
      let authorization = !!Vue.$localStorage.authorization;
      console.log(authorization);
      if (authorization) {
        _checkAuth().then(function () {
          next();
        }, function () {
          next({
            name: 'login'
          });
        });
      } else {
        next({
          name: 'login'
        });
      }
    } else {
      _checkAuth().then(function () {
        next();
      }, function () {
        next({
          name: 'login'
        });
      });
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});

/**
 * Token验证，只是对时间验证过期否
 * */
function _checkAuth() {
  return new Promise(function (resolve, reject) {
    let authorization = Vue.$localStorage.authorization;
    let time = parseInt(authorization.time);
    if ((new Date().getTime() - time) < 1000 * 60 * 60 * 2) {
      // token有效,能进入
      store.dispatch('setLoginState', true);
      // 设置请求的token
      Vue.http.headers.common['authorization'] = 'token ' + authorization.token;
      resolve();
    } else {
      Vue.$localStorage.$delete('authorization');
      Vue.$localStorage.$delete('commentInfo');
      store.dispatch('setLoginState', false);
      reject();
    }
  });
}
module.exports = router;
