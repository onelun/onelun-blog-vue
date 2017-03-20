<template>
  <div class="blog-content">
    <myinfo></myinfo>
    <div class="recommended animated fadeIn">
      <div class="page-title">
        <ul class="recommened-nav navigation clearfix">
          <li data-name="trending_notes">
            <router-link :to="{ name: 'artList',query: { listType: 'latest' }}" activeClass="active" tag="a">最新列表
            </router-link>
          </li>
        </ul>
      </div>
      <transition name="fade">
        <div class="blog-content-inner">
          <transition name="blogTrans">
            <keep-alive>
            <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </transition>
    </div>
  </div>
</template>
<style lang="scss">
  @import "../../assets/css/theme.scss";
  .blog-content {
    position: fixed;
    width: 100%;
    height: 100%;
    background: white;
    .recommended {
      overflow-y:scroll;
      position: absolute;
      width: 58%;
      height: 100%;
      border-width: 2px;
      box-sizing: border-box;
      z-index: 1;
      .page-title {
        padding-left: 20px;
        border-bottom: 2px solid #d9d9d9;
        font-size: 12px;
        .search {
          float: right;
          margin-top: 10px;
        }
        .navigation {
          margin: 0;
          border-bottom: none;
          list-style: none;
          text-align: center;
        }
        >ul{
          .active{
            margin-bottom: -2px;
            border-bottom: 2px solid #555555;
          }
        }
        li{
          float: left;
          line-height: 20px;
          &:hover{
            background-color: #eeeeee;
            color: #555555;
          }

          a{
            padding: 15px;
            display: inline-block;
            transition: all 0.3s;
            color: #999999;
            text-decoration: none;
          }
        }
      }
    }
  }
  @include media("<=desktop_small") {
    .blog-content .recommended {
      width: 86%;
      left: 7%;
      padding-top: 56px;
    }
  }
  @include media(">desktop_small") {
    .recommended {
      width: 58%;
      left: 28%;
    }
  }
</style>
<script type="text/ecmascript-6">
  import myInfo from 'views/blog/myinfo';
  export default{
    data() {
      return {
        type: 'hot'
      };
    },
    computed: {

    },
    components: {
      'myinfo': myInfo
    }
  };
</script>
