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
      }
    ]
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: function (resolve) {
      require(['./views/blog/article.vue'], resolve);
    }
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
  },
  {
    path: '/admin',
    name: 'admin',
    component: function (resolve) {
      require(['./views/admin/index.vue'], resolve);
    },
    meta: {requiresAuth: true},
    children: [
      {
        path: 'admin-tag',
        name: 'admin-tag',
        component: function (resolve) {
          require(['./views/admin/tagList.vue'], resolve);
        },
        meta: {requiresAuth: true}
      },
      {
        path: 'admin-articleManager',
        name: 'admin-articleManager',
        redirect: {
          name: 'admin-articleList'
        },
        component: {
          template: '<router-view></router-view>'
        },
        meta: {requiresAuth: true},
        children: [
          {
            path: 'admin-articleList',
            name: 'admin-articleList',
            component: function (resolve) {
              require(['./views/admin/articleList.vue'], resolve);
            },
            meta: {requiresAuth: true}
          },
          {
            path: 'admin-article/:articleId',
            name: 'admin-article',
            component: function (resolve) {
              require(['./views/admin/article.vue'], resolve);
            },
            meta: {requiresAuth: true}
          }
        ]
      }
    ]
  },
  { path: '*', component: require('./components/nodata.vue') }
];
const router = new VueRouter({
  mode: 'history',
  base: '/', // 应用的基路径
  routes: routes
});
/**
 * 登录状态检查
 * */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 未登录状态
    if (!store.state.isLogin) {
      // 存在authorization信息，则验证下。
      let authorization = !!Vue.$sessionStorage.authorization;
      if (authorization) {
        _checkAuth().then(function () {
          next();
        }, function () {
          next({
            name: 'user'
          });
        });
      } else {
        next({
          name: 'user'
        });
      }
    } else {
      _checkAuth().then(function () {
        next();
      }, function () {
        next({
          name: 'user'
        });
      });
    }
  } else {
    _checkAuth().then(function () {
      next();
    }, function () {
      next();
    });
  }
});

/**
 * Token验证，只是对时间验证过期否
 * */
function _checkAuth() {
  return new Promise(function (resolve, reject) {
    let authorization = Vue.$sessionStorage.authorization || {};
    let time = parseInt(authorization.time);
    if ((new Date().getTime() - time) < 1000 * 60 * 60 * 2) {
      // token有效,能进入
      store.dispatch('setLoginState', true);
      // 设置请求的token
      Vue.http.headers.common['authorization'] = 'token ' + authorization.token;
      resolve();
    } else {
      Vue.$sessionStorage.$delete('authorization');
      store.dispatch('setLoginState', false);
      reject();
    }
  });
}
module.exports = router;
