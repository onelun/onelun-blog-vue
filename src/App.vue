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
  import store from './vuex/store';
  import blogNav from 'views/blog/nav.vue';
  export default {
    store,
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
  /*内容区*/
  .app-content {
    width: 100%;
  }
</style>
