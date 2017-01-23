<template>
  <div>
    <div class="app-content">
      <!--导航条-->
      <blog-nav></blog-nav>
      <!--路由外链-->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <!--退出弹层-->
      <do-logout></do-logout>
    </div>
    <div class="background">
      <img src="./assets/images/myinfo.jpg" width="100%" height="100%">
    </div>
  </div>
</template>
<style lang="scss">
  @import "assets/css/theme.scss";
  /*内容区*/
  .app-content {
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
</style>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import blogNav from 'views/blog/nav.vue';
  import doLogout from 'components/doLogout.vue';
  import vueMoment from 'vue-moment';
  import moment from 'moment';
  import store from './vuex/store';
  import vStorage from './utils/vStorage';
  /**
   * 设置本地存储
   * */
  Vue.use(vStorage, {
    storageKeyPrefix: 'xst-'
  });

  /**
   * 时间格式化插件-过滤器
   */
  moment.locale('zh-cn');
  Vue.use(vueMoment);

  export default {
    store,
    data() {
      return {};
    },
    methods: {

    },
    components: {
      blogNav,
      doLogout
    }
  };

</script>
