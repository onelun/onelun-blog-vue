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
    component: require('./views/blog/blog.vue')
  },
  {
    path: '/music',
    name: 'music',
    component: require('./views/blog/music.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: { template: '<div>This is login</div>' }
  }
];
module.exports = routes;
