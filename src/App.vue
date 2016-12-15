<template>
  <div>
    <div class="app-content">
      <!--导航条-->
      <blog-nav></blog-nav>
      <!--路由外链-->
      <router-view class="view"></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import blogNav from 'components/blog/nav.vue';
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

<style>

</style>
