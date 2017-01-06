/**
 * Created by onelun on 2016/12/15.
 */
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
module.exports = routes;
