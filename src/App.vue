<template>
  <div>
    <div class="app-content">
      <!--导航条-->
      <blog-nav></blog-nav>
      <!--路由外链-->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import blogNav from 'views/blog/nav.vue';
  import vueMoment from 'vue-moment';
  import moment from 'moment';
  /**
   * 时间格式化插件-过滤器
   */
  moment.locale('zh-cn');
  Vue.use(vueMoment);

  export default {
    data() {
      return {};
    },
    methods: {

    },
    components: {
      blogNav
    }
  };

</script>

<style lang="scss">
  @import "assets/css/theme.scss";

  @-ms-viewport {
    width: device-width;
  }
  /*内容区*/
  .app-content {
    width: 100%;
  }
</style>
