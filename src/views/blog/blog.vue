<template>
  <div>
    <myinfo :showMyWords="isShowMywords"></myinfo>
    <div class="blog animated fadeIn">
    <transition name="fade">
      <div class="blog-content" v-show="!isShowMywords">
        <ul class="tabs text-shadow" :class="{'active':isShowMywords}">
          <li>
            <router-link :to="{ name: 'artList',query: { listType: 'latest' }}" activeClass="active" tag="a">最新列表
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'historyList'}" activeClass="active" tag="a">时光机</router-link>
          </li>
        </ul>
        <div class="blog-content-inner">
          <transition name="blogTrans">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </transition>
      </div>
  </div>
</template>
<style lang="scss">
  @import "../../assets/css/theme.scss";
  .blog {
    position: relative;
    .blog-content {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      box-sizing: content-box;
      transition: opacity ease 500ms;
      .tabs {
        padding: 0;
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 1;
        height: 26px;
        transition: all ease 500ms;
        &.active {
           opacity: 0;
           height: 0;
           overflow: hidden;
           padding: 0;
        }
        & > li {
          margin: 0 3px;
          width: 68px;
          position: relative;
          cursor: pointer;
          box-sizing: border-box;
          a {
            display: block;
            width: 68px;
            line-height: 100%;
            box-sizing: border-box;
            transition: all .2s ease;
            text-align: center;
            font-size: 14px;
            padding: 5px 0;
            text-decoration: none;
            color: inherit;
            border: 1px solid transparent;
          }
          & > .active {
            border: 1px solid #38b7ea;
            background: transparent;
            color: #38b7ea;
            border-radius: 5px;
          }
        }
        & :hover {
          color: #38b7ea;
        }
      }
      .blog-content-inner {
        max-width: 780px;
        width: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding-top: 15px;
        position: relative;
      }
      .copyright {
        position: fixed;
        bottom: 0;
        width: 100%;
        text-align: center;
        margin-bottom: 15px;
      }
    }
  }

  @include media(">desktop") {
    .blog {
      width: 100%;
      .blog-content {
        z-index: 2;
        width: 63%;
        padding-left: 36%;
        position: relative;
      }
    }
  }

  @include media(">desktop_small", "<=desktop") {
    .blog {
      .blog-content {
        padding-top: 270px;
      }
    }
  }

  @include media("<=desktop_small") {
    .blog {
      .blog-content {
        padding-top: 315px;
      }
    }
  }

  @include media("<=tablet") {
    .blog {
      .blog-content {
        padding-left: 15px;
        padding-right: 15px;
      }
    }
  }

  @include media("<=phone") {
    .blog {
      .blog-content {
        padding-left: 6px;
        padding-right: 6px;
        padding-top: 190px;
        width: 100%;
        box-sizing: border-box;
        .blog-content--inner {
          padding-top: 6px;
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import myInfo from 'views/blog/myinfo';
  export default{
    data() {
      return {
        isShowMywords: false
      };
    },
    computed: {

    },
    components: {
      'myinfo': myInfo
    }
  };
</script>
