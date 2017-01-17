<!--导航条-->
<template>
  <div class="blogNav">
    <nav class="nav-top">
      <a v-if="isMobile && this.$route.name=='article'" @click="navBack" class="nav-item" title="后退">
        <i class="fa fa-arrow-left  fa-fw fa-lg blackBG"></i>
      </a>
      <a v-else class="nav-item" data-toggle="tooltip" data-placement="right" title="oneLun">
        <span class="siteLogo">仑</span>
      </a>
      <router-link class="nav-item" data-toggle="tooltip" exact activeClass="active" :to="{name: 'index'}"
                   data-placement="right" title="首页">
        <i class="fa fa-home fa-fw fa-lg"></i>
      </router-link>
      <router-link class="nav-item" data-toggle="tooltip" activeClass="active" :to="{name: 'blog'}"
                   data-placement="right" title="博客">
        <i class="fa fa-map-signs fa-fw fa-lg"></i>
      </router-link>
      <router-link class="nav-item" data-toggle="tooltip" activeClass="active" :to="{name: 'music'}"
                   data-placement="right" title="音乐">
        <i class="fa fa-music fa-fw fa-lg"></i>
      </router-link>
    </nav>
    <nav class="nav-bottom">
      <a v-show="isLogin" class="nav-item animated fadeIn hidden-xs" data-toggle="tooltip"
         data-placement="right" title="退出" @click="doLoginout()">
        <i class="fa fa-sign-out fa-lg"></i>
      </a>
      <router-link v-show="!isLogin" class="nav-item hidden-xs" activeClass="active" :to="{ name: 'user'}"
                   data-toggle="tooltip" data-placement="right" title="登录">
        <i class="fa fa-sign-in fa-lg"></i>
      </router-link>
    </nav>
  </div>
</template>
<style scoped lang="scss">
  @import "../../assets/css/theme.scss";
  .blackBG{
    background:#e78170;
    color: $eyeshield-color;
  }

  .blogNav{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1040;
    background-color: rgba(0, 0, 0, .8);
    transition: background-color ease 400ms;
    a {
      color: #797979;
      cursor: pointer;
      display: inline-block;
      text-decoration: none;
    }
    .nav-item {
      text-align: center;
      display: flex;
      justify-content: flex-start;
      align-items: center;;
      width: 100%;
      height: 45px;
      line-height: 45px;
      float: left;
      cursor: pointer;
      position: relative;
      .siteLogo {
        display: inline-block;
        height: 45px;
        width: 45px;
        line-height: 45px;
        font-size: 18px;
        text-align: center;
        color: $eyeshield-color;
        background: #e78170;
      }

      & > i {
        font-size: 18px;
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      & > span {
        display: none;
        width: 55px;
        text-align: left;
        font-size: 16px;
      }
      &.active {
         color: $base-theme-color !important;
      }
      &:hover {
         color: $base-theme-color;
      }
    }
  }
  /*响应式*/
  @include media("<=desktop_small") {
    .blogNav {
      width: 100%;
      height: 45px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .nav-item {
        width: 45px;
      }
    }
  }

  @include media(">desktop_small") {
    .blogNav {
      width: 45px;
      height: 100%;
      .nav-top {
        width: 100%;
      }
      .nav-bottom {
        width: 100%;
      }
    }
  }

  @include media(">desktop_large") {
    .blogNav {
      height: 100%;
    }
  }
</style>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex';
  export default{
    data() {
      return {
        isMobile: true
      };
    },
    computed: {
      ...mapState({
        isLogin: 'isLogin'
      })
    },
    methods: {
      navBack: function () {
        this.$router.back();
      },
      doLoginout: function () {

      }
    }
  };
</script>
