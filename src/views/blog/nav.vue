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
      <router-link v-show="isLogin" class="nav-item animated fadeIn hidden-xs"
                   :to="{ name: 'admin-tag'}" activeClass="active"
                   data-toggle="tooltip" data-placement="right" title="标签管理">
        <i class="fa fa-tag fa-lg"></i>
      </router-link>
      <router-link v-show="isLogin" class="nav-item animated fadeIn hidden-xs"
                   :to="{ name: 'admin-articleManager'}" activeClass="active" data-toggle="tooltip"
                   data-placement="right"
                   title="文章管理">
        <i class="fa fa-list fa-lg"></i>
      </router-link>
      <a class="nav-item fa-stack fa-lg hidden-xs" data-toggle="tooltip" data-placement="right" title="切换背景"
         @click="changeBG()">
        <i class="fa fa-photo fa-fw fa-lg"></i>
        <section class="rightBottomStatus">
          <i class="fa fa-lg fa-refresh" :class="{true:'',false:'fa-spin'}[!isChangeBG]"></i>
        </section>
      </a>
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
  import API from '../../config.js';
  export default{
    data() {
      return {
        isMobile: true,
        isChangeBG: false
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
        $('#logout').modal();
      },
      _loadImg(url, cb) {
        if (/.png$|.jpg$|.gif$/.test(url)) {
          let _TagObjs = new Image();
          _TagObjs.src = url;
          _TagObjs.onload = function () {
            !!cb && cb();
          };
        }
      },
      _randomImage() {
        const _this = this;
        let imageList = API.imageList;// 图片列表
        let imageCount = imageList.length;
        // 返回 v_from 和 v_to 之间的随机整数
        function _selectFrom(from, to) {
          let range = to - from + 1;
          let selected = Math.floor(Math.random() * range + from);
          if (selected === parseInt(_this.bgIndexNow)) {
            // console.log('和上一个相同,再去随机取值')
            return _selectFrom(from, to);
          } else {
            // console.log("当前取值为:" + (selected+1))
            _this.bgIndexNow = selected;
            return selected;
          }
        }

        return imageList[_selectFrom(0, imageCount - 1)];
      },
      changeBG(imgUrl) {
        const _this = this;
        if (_this.isChangeBG) {
          return false;
        }
        if (!imgUrl) {
          imgUrl = _this._randomImage();
        }
        _this.isChangeBG = true;

        // 检查是否有用户自己保存过背景图片,如果保存过,则自动切换
        _this._loadImg(imgUrl, function () {
          var css = function (t, s) {
            s = document.createElement('style');
            s.innerText = t;
            document.body.appendChild(s);
          };

          let cssRules = '.background:before{' +
            'content:"";' +
            'position: fixed;' +
            'z-index: -1;' +
            'top: 0;' +
            'right: 0;' +
            'bottom: 0;' +
            'left: 0;' +
            'background-repeat: no-repeat;' +
            'background-size: cover;' +
            'background-attachment: fixed;' +
            'background-position: center center;' +
            'background-image: ' + `url(${imgUrl});` +
            '}';

          // 保存用户切换的壁纸信息,下次直接自动切换
          _this.$localStorage.$set('userBackground', imgUrl);
          css(cssRules);
          // 动画是500ms
          setTimeout(function () {
            _this.isChangeBG = false;
          }, 1000);
        });
      }
    },
    created() {
      const _this = this;
      /**
       * 背景初始化
       * */
      if (!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
        if (!!_this.$localStorage.userBackground) {
          setTimeout(function () {
            _this.changeBG(_this.$localStorage.userBackground);
          }, 3000);
        }
      }
    }
  };
</script>
