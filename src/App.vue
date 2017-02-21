<template>
  <div>
    <div class="app-content">
      <!--导航条-->
      <blog-nav></blog-nav>
      <!--路由外链-->
      <router-view></router-view>
      <!--播放器导航条-->
      <music></music>
      <!--退出弹层-->
      <do-clear-cache></do-clear-cache>
      <do-logout></do-logout>
      <loading v-if="isLoading"></loading>
    </div>
  </div>
</template>
<style lang="scss">
  @import "assets/css/theme.scss";
  /*解决ie下右侧出现滚动条的情况,因为如果使用modal时,会出现抖动*/
  @-ms-viewport {
    width: device-width;
  }
  /*内容区*/
  .app-content {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import blogNav from 'views/blog/nav.vue';
  import doLogout from 'components/doLogout.vue';
  import doClearCache from 'components/doClearCache.vue';
  import music from 'views/blog/music';
  import vueMoment from 'vue-moment';
  import moment from 'moment';
  import store from './vuex/store';
  import vStorage from './utils/vStorage';
  import loading from 'components/loading';
  import {mapState} from 'vuex';
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
    computed: {
      ...mapState({
        isLoading: 'isLoading'
      })
    },
    components: {
      blogNav,
      doLogout,
      doClearCache,
      loading,
      music
    }
  };

</script>
