<!--导航条-->
<template>
    <div class="blogNav">
        <nav class="nav-top">
            <router-link class="nav-item" data-toggle="tooltip" activeClass="active" :to="{name: 'index'}"
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
            <router-link v-show="!isLogin" class="nav-item hidden-xs" activeClass="active" :to="{ name: 'login'}"
                         data-toggle="tooltip" data-placement="right" title="登录">
                <i class="fa fa-sign-in fa-lg"></i>
            </router-link>
        </nav>
    </div>
</template>
<style lang="scss">
    @import "../../common/css/theme.scss";
    .blackBG{
        background:#000;
    }

  .blogNav{
    display: flex;
    flex-direction: column;
  }
</style>
<script type="text/ecmascript-6">
    export default{
        data() {
            return {
                isLogin: true
            };
        }
    };
</script>
