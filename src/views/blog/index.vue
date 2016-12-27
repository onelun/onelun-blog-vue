<template>
    <div id="indexBox" class="index-box animated fadeIn">
      <div class="index-content">
        <div class="head-wrap">
          <h3 class="text-center services">java开发工程师！</h3>
          <div class="headlines">
            <h1 :class="{'current': now==1}" class="text-center textItem">Hello <span class="blue">Vue2.0</span></h1>
            <h1 :class="{'current': now==2}" class="text-center textItem">我是<span class="blue">oneLun</span></h1>
            <h1 :class="{'current': now==3}" class="text-center textItem">不忘<span class="blue">初心</span> 方得<span
              class="blue">始终</span></h1>
            <h1 :class="{'current': now==4}" class="text-center textItem"><span class="blue">坚持</span>才是捷径!</h1>
            <h1 :class="{'current': now==5}" class="text-center textItem">
              coding <span class="blue">happy</span>,coding <span class="blue">life</span>
            </h1>
            <h1 :class="{'current': now==6}" class="text-center textItem">
              要做到<span class="blue">不可代替</span>
              ，就要<span class="blue">与众不同</span>
            </h1>
          </div>
          <div class="text-center cat">一个记录时光的博客</div>
        </div>
        <section class="index-btnBox">
          <router-link class="index-btnBox-each text-center" :to="{ name: 'blog'}" activeClass="active" tag="div">我的博客
          </router-link>
          <router-link class="index-btnBox-each text-center" :to="{ name: 'music'}" activeClass="active" tag="div">我的音乐
          </router-link>
        </section>
        <section class="index-copyright">
          <copyright></copyright>
        </section>
      </div>
      <div class="background blur">
        <img src="../../assets/images/myinfo.jpg" width="100%" height="100%">
      </div>
    </div>
</template>
<style lang="scss">
  @import "../../assets/css/theme.scss";
  .index-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .index-content {
      width: 100%;
      height: 100%;
      user-select: none;
      -webkit-user-select: none;
      display: block;
      left: 0;
      color: #fff;
      overflow: hidden;
      background: transparent radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
      box-sizing: border-box;
      .head-wrap {
        width: 100%;
        display: block;
        position: relative;
        top: 50%;
        transform: translate3d(0, -140%, 0);
        h3 {
          max-width: 320px;
          color: #ffffff;
          font-weight: 700;
          font-size: 14px;
          line-height: 35px;
          margin: 0 auto;
        }
        .services {
          border-bottom: 3px solid rgba(255, 255, 255, .5);
          text-transform: uppercase;
        }
        .headlines {
          margin: 0;
          height: 69px;
          border: 1px solid transparent;
          position: relative;
          h1 {
            color: #fff;
          }
          .current {
            display: block;
            opacity: 1 !important;
          }
          .textItem {
            position: absolute;
            width: 100%;
            text-align: center;
            opacity: 0;
            transition: all ease 800ms;
            text-transform: uppercase;
            margin: 10px 0 !important;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            box-sizing: border-box;
            padding: 0 10px;
            .blue {
              color: $base-theme-color;
            }
          }
        }
        .cat {
          font-size: 14px;
          color: #fff;
          font-weight: bold;
        }
      }
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10px);
    }

    .index-btnBox {
      user-select: none;
      -webkit-user-select: none;
      width: 224px;
      position: absolute;
      left: 50%;
      bottom: 10%;
      transform: translate3d(-50%, 0, 0);
      display: flex;
      align-items: center;
      justify-content: space-around;
      z-index: 999;
      @include display-flex;
      @include justify-content(space-around);
      @include align-items(center);
      .index-btnBox-each {
        min-width: 62px;
        color: #fff;
        border: 1px solid $base-theme-color;
        border-radius: 15px;
        line-height: 30px;
        box-sizing: content-box;
        padding: 0 15px;
        cursor: pointer;
        font-size: 14px;
        transition: all ease 300ms;
        &:hover {
           background: #49c8fb;
        }
      }
    }
    .index-copyright {
      position: absolute;
      bottom: 1%;
      text-align: center;
      width: 100%;
      left: 0;
    }
  }

  @include media("<=phone") {
    .index-box {
      .index-content {
        padding-top: 45px;
        .head-wrap {
          h3 {
            max-width: 260px;
          }
        }
      }
    }
  }
</style>
<script>
  import copyright from 'components/copyright.vue';
  export default{
    data() {
        return {
          now: 1,
          clearInterval: ''
        };
    },
    mounted: function () {
      let self = this;
      self.clearInterval = setInterval(function () {
        self.now >= 6 ? self.now = 1 : self.now++;
      }, 4000);
    },
    destroyed: function () {
      clearInterval(this.clearInterval);
    },
    components: {
      copyright
    }
  };
</script>
