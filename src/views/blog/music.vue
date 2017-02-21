<template>
  <div class="g-btmbar">
    <div class="m-playbar m-playbar-lock" :class="{true:'',false:'m-playbar-unlock'}[isLockMusic]">
      <div class="updn">
        <div class="left f-fl">
          <a href="javascript:;" class="lockBtn" hidefocus="true" data-action="lock" @click="lockMusic()"></a>
        </div>
        <div class="right f-fl"></div>
      </div>
      <div class="bg"></div>
      <div class="hand" title="展开播放条"></div>
      <div class="wrap" id="g_player">
        <div class="btns">
          <a href="javascript:;" @click="preCtrl()" class="prv" title="上一首(ctrl+←)">上一首</a>
          <a href="javascript:;" @click="playCtrl()" class="ply j-flag" :class="{true: '', false: 'pas'}[!isPlaying]" title="播放/暂停(p)">播放/暂停</a>
          <a href="javascript:;" @click="nextCtrl()" class="nxt" title="下一首(ctrl+→)">下一首</a>
        </div>
        <div class="head j-flag hidden-sm hidden-xs">
          <img src="../../assets/images/default_album.jpg">
          <a href="javascript:;" hidefocus="true" class="mask"></a>
        </div>
        <div class="play">
          <div class="j-flag words">
            <span class="f-thide name fc1 f-fl">{{currentMusicInfo.name}}</span>
            <span class="by f-thide f-fl">{{currentMusicInfo.player}}</span>
          </div>
          <div class="m-pbar hidden-sm hidden-xs">
            <Slider v-model="rightPercent"></Slider>
            <span class="j-flag time">
              <span v-show="isLoading&&isPlaying">
                 <i class="fa fa-spin fa-spinner"></i>
              </span>
              <em>{{rightNow | secondsConvert}}</em>/{{duration | secondsConvert}}
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
  .m-playbar-lock .updn .lockBtn {
    background-position: -100px -380px !important;
    &:hover {
      background-position: -100px -400px !important;
    }
  }

  .m-playbar-unlock {
    transition:All 0.2s ease-in-out 0.3s;
    -webkit-transition:All 0.2s ease-in-out 0.3s;
    -moz-transition:All 0.2s ease-in-out 0.3s;
    -o-transition:All 0.2s ease-in-out 0.3s;
    top: -7px !important;
    .updn .lockBtn {
      background-position: -80px -380px !important;
      &:hover {
         background-position: -80px -400px !important;
      }
    }
    &:hover {
       transform:translate(0,-46px);
       -webkit-transform:translate(0,-46px);
       -moz-transform:translate(0,-46px);
       -o-transform:translate(0,-46px);
       -ms-transform:translate(0,-46px);
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
          background-position: 0 -380px;
          top: -14px;
          right: 15px;
          width: 52px;
          height: 67px;
          a.lockBtn {
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
            &:hover {
               background-position:-30px -130px;
            }
          }
          .pas {
            background-position: 0 -165px !important;
            &:hover {
              background-position: -40px -165px !important;
            }
          }
          .ply {
            width: 36px;
            height: 36px;
            margin-top: 0;
            background-position: 0 -204px;
            &:hover {
               background-position: -40px -204px;
            }
          }
          .nxt {
            background-position: -80px -130px;
            &:hover {
               background-position: -110px -130px;
            }
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
  .m-playbar .updn .lockBtn, .m-playbar .bg, .m-playbar .btns a,
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
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import {Slider} from 'element-ui';
  import {mapState, mapActions} from 'vuex';
  import {secondsConvert} from 'utils/filters.js';
  import API from '../../config';
  Vue.filter('secondsConvert', secondsConvert);
  export default{
    data() {
      return {
        musicList: API.musicList,
        currentMusicInfo: {},
        musicHandle: {},
        clear: '',
        isPlaying: false, // 是否播放
        isLoading: true,
        currentPercent: 0, // 当前音乐播放百分比
        volume: 1, // 当前音量
        duration: 0, // 当前音乐持续时间
        rightNow: 0, // 当前音乐进行时
        rightPercent: 0 // 当前音乐进行时百分比
      };
    },
    created() {
      this._init();
    },
    computed: {
      ...mapState({
        isLockMusic: 'isLockMusic'
      })
    },

    methods: {
      ...mapActions({
        setLockMusicStatus: 'setLockMusicStatus'
      }),
      updateTime() {
        console.log(parseInt(document.getElementById('music').currentTime));
        console.log(document.getElementById('music').duration);
      },
      lockMusic() {
        let _this = this;
        _this.setLockMusicStatus(!_this.isLockMusic);
      },
      _init() {
        let _this = this;
        _this._setCurrentMusic(0);
        _this._beforeStart();
      },
      playCtrl() {
        let _this = this;
        if (!_this.musicHandle) {
          console.log('musicHandle=null');
          return;
        }
        _this.isPlaying = !_this.isPlaying;
        if (!_this.isPlaying) {
          _this.musicHandle.pause();
          clearInterval(_this.clear);
        } else {
          _this._start();
        }
      },
      preCtrl() {
        let _this = this;
        let currentId = _this.musicList.indexOf(_this.currentMusicInfo);
        let index;
        if (currentId !== 0) {
          index = currentId - 1;
        } else {
          index = _this.musicList.length - 1;
        }
        _this._indexCtrl(index);
        _this.isPlaying = true;
      },
      nextCtrl() {
        let _this = this;
        let currentId = _this.musicList.indexOf(_this.currentMusicInfo);
        let index;
        if (currentId !== (_this.musicList.length - 1)) {
          index = currentId + 1;
        } else {
          index = 0;
        }
        _this._indexCtrl(index);
        _this.isPlaying = true;
      },
      _indexCtrl(index) {
        let _this = this;
        _this._ended();
        _this._setCurrentMusic(index);
        _this._beforeStart();
        _this._start();
      },
      _setCurrentMusic(index) {
        let _this = this;
        _this.currentMusicInfo = _this.musicList[index];
        _this.musicHandle = new Audio(_this.currentMusicInfo.musicUrl);
        _this.musicHandle.preload = 'none';
      },
      // start之前的准备工作,比如清除上一个的播放数据
      _beforeStart() {
        let _this = this;
        // 监听播放完毕
        _this.musicHandle.addEventListener('ended', () => {
          console.log('ended');
          _this._ended();
          _this.nextCtrl();
        });
        // 监听加载状态
        _this.musicHandle.addEventListener('canplay', function () {
          console.log('music-canplay');
          _this.isLoading = false;
          _this.duration = _this.musicHandle.duration;
        });
        // 开始请求数据
        _this.musicHandle.addEventListener('loadstart', function () {
          console.log('music-loadstart');
          _this.isLoading = true;
        });
        // 开始请求数据
        _this.musicHandle.addEventListener('canplaythrough', function () {
          console.log('music-canplaythrough');
          _this.isLoading = false;
        });
      },
      _start() {
        let _this = this;
        _this.musicHandle.play();
        // 播放时间设置
        _this.clear = setInterval(function () {
          _this._setMusicRightNow(_this.musicHandle.currentTime);
        }, 500);
      },
      _ended() {
        let _this = this;
        _this.musicHandle.pause();
        clearInterval(_this.clear);
        _this.isPlaying = false;
        _this._setMusicRightNow(0);
      },
      _setMusicRightNow(time) {
        let _this = this;
        _this.rightNow = time;
        _this.rightPercent = _this.rightNow * 100 / _this.duration;
      }
    },
    components: {
      Slider
    }
  };
</script>
