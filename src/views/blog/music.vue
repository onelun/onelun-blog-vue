<template>
  <div class="g-btmbar">
    <div class="m-playbar m-playbar-lock">
      <div class="updn">
        <div class="left f-fl">
          <a href="javascript:;" class="btn" hidefocus="true" data-action="lock"></a>
        </div>
        <div class="right f-fl"></div>
      </div>
      <div class="bg"></div>
      <div class="hand" title="展开播放条"></div>
      <div class="wrap" id="g_player">
        <div class="btns">
          <a href="javascript:;" hidefocus="true" data-action="prev" class="prv" title="上一首(ctrl+←)">上一首</a>
          <a href="javascript:;" hidefocus="true" data-action="play" class="ply j-flag" title="播放/暂停(p)">播放/暂停</a>
          <a href="javascript:;" hidefocus="true" data-action="next" class="nxt" title="下一首(ctrl+→)">下一首</a>
        </div>
        <div class="head j-flag hidden-sm hidden-xs">
          <img src="../../assets/images/default_album.jpg">
          <a href="javascript:;" hidefocus="true" class="mask"></a>
        </div>
        <div class="play">
          <div class="j-flag words">
            <span class="f-thide name fc1 f-fl">告白气球</span>
            <span class="by f-thide f-fl">周杰伦</span>
          </div>
          <div class="m-pbar hidden-sm hidden-xs">
            <Slider v-model="value"></Slider>
            <span class="j-flag time">
              <em>{{progressTime}}</em>/{{allTime}}
            </span>
          </div>

        </div>
        <div class="oper f-fl"></div>
        <div class="ctrl f-fl f-pr j-flag"></div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  @import "../../assets/css/theme.scss";
  @include media("<=desktop_small") {
    .g-btmbar .m-playbar .wrap{
      margin-left: -180px !important;
    }
    .g-btmbar .m-playbar .wrap .play .words{
        margin-top: 10px;
    }
  }
  .g-btmbar {
    position: fixed;
    zoom: 1;
    bottom: 0;
    left: 0px;
    right: 0;
    height: 0;
    width: 100%;
    font-size: 12px;
    z-index: 1002;
    .m-playbar {
      position: absolute;
      zoom: 1;
      top: -53px;
      left: 0;
      width: 100%;
      height: 53px;
      margin: 0 auto;
      .updn {
        position: relative;
        z-index: 11;
        .left {
          position: absolute;
          top: -14px;
          right: 15px;
          width: 52px;
          height: 67px;
          background-position: 0 -380px;
          a.btn {
            background-position: -100px -380px;
            display: block;
            width: 18px;
            height: 18px;
            margin: 6px 0 0 17px;
          }
        }
        .right {
          position: absolute;
          top: -1px;
          right: 0;
          width: 15px;
          height: 54px;
          background-position: -52px -393px;
          pointer-events: none;
        }
      }
      .bg {
        height: 53px;
        zoom: 1;
        margin-right: 67px;
        background-position: 0 0;
        background-repeat: repeat-x;
      }
      .hand {
        position: absolute;
        top: -10px;
        width: 100%;
        height: 20px;
        cursor: pointer;
      }
      .wrap {
        position: absolute;
        left: 58%;
        top: 6px;
        z-index: 15;
        height: 47px;
        margin: 0 auto;
        margin-left: -490px;
        .btns {
          width: 137px;
          padding: 6px 0 0 0;
          float: left;
          a {
            display: block;
            float: left;
            width: 28px;
            height: 28px;
            margin-right: 8px;
            margin-top: 5px;
            text-indent: -9999px;
          }
          .prv {
            background-position: 0 -130px;
          }
          .ply {
            width: 36px;
            height: 36px;
            margin-top: 0;
            background-position: 0 -204px;
          }
          .nxt {
            background-position: -80px -130px;
          }
        }
        .play {
          position: relative;
          float: left;
          .words {
            height: 28px;
            overflow: hidden;
            color: #e8e8e8;
            text-shadow: 0 1px 0 #171717;
            line-height: 28px;
            .name {
              max-width: 300px;
            }
            .fc1 {
              color: #e8e8e8;
            }
            .by {
              max-width: 220px;
              margin-left: 15px;
              color: #9b9b9b;
            }
          }
          .m-pbar {
            height: 9px;
            width: 493px;
            position: relative;
            .time {
              position: absolute;
              top: -3px;
              right: -84px;
              color: #797979;
              text-shadow: 0 1px 0 #121212;
              em {
                color: #a1a1a1;
                font-style: normal;
              }
            }
          }
        }
      }
      .head {
        position: relative;
        margin: 6px 15px 0 0;
        width: 34px;
        height: 34px;
        float: left;
        img {
          width: 34px;
          height: 34px;
        }
        .mask {
          position: absolute;
          top: 0px;
          left: 0px;
          display: block;
          width: 34px;
          height: 35px;
          background-position: 0 -80px;
        }
      }
    }
  }
  .m-playbar .updn .left, .m-playbar .updn .right,
  .m-playbar .updn .btn, .m-playbar .bg, .m-playbar .btns a,
  .m-playbar .head .mask, .m-playbar .icn, .m-playbar .ctrl,
  .m-playbar .tip, .m-vol .curr, .m-playbar .words .mv,
  .m-vol .barbg, .m-playbar .words .src {
    background: url('../../assets/images/playbar.png') no-repeat 0 9999px;
  }
  .m-pbar .barbg, .m-pbar .cur, .m-pbar .rdy, .m-pbar .left {
    background: url('../../assets/images/statbar.png') no-repeat 0 9999px;
  }
  .f-thide {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }
  .f-fl {
    float: left;
  }

</style>
<script>
  import {Slider} from 'element-ui';
  export default{
    data() {
      return {
        value: 20,
        progressTime: '00:00',
        allTime: '03:40'
      };
    },
    components: {
      Slider
    }
  };
</script>
