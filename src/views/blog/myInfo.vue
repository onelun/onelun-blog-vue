<template>
    <div class="myinfo" :class="{'showMyWords-active': showMyWords }">
      <section class="detail text-center">
        <section class="detail-1">
          <section class="detail-img-box" @click="setMyWordStatus">
            <div class="img-box">
              <img class="img-circle">
            </div>
          </section>
          <section class="detail-info">
            <p class="name text-shadow">{{myinfo.name || 'oneLun'}}</p>
            <p class="job text-shadow">{{myinfo.position || 'java工程师'}}</p>
            <p class="address text-shadow hidden-xs">
              <span class="fa fa-map-marker"></span>
              <span>{{myinfo.address || '北京'}}</span>
            </p>
            <p class="motto text-shadow hidden-xs">
              <i class="fa fa-coffee"></i>
              <span>{{myinfo.motto || '今天想写点什么'}}</span>
            </p>
          </section>
        </section>
        <section class="detail-2">
          <section class="detail-sns hidden-xs">
            <a target="_blank" class="github text-shadow" href="https://github.com/onelun">
              Follow
            </a>
            <ul class="sns">
              <li class="hidden-lg">
                <a title="GitHub" target="_blank" href="https://github.com/onelun">
                  <i class="fa fa-github"></i>
                </a>
              </li>
              <li data-toggle="modal" data-target="#socialContact"><i class="fa fa-qq"></i></li>
              <li data-toggle="modal" data-target="#socialContact"><i class="fa fa-weixin"></i></li>
              <li><a title="新浪微博" target="_blank"><i class="fa fa-weibo"></i></a></li>
              <li><a title="腾讯微博" target="_blank"><i class="fa fa-tencent-weibo"></i></a>
              </li>
            </ul>
          </section>
        </section>
      </section>
      <section class="mywords visuallyhidden text-shadow">
        <article>
          <p>Hello 我是<code>oneLun</code>，欢迎访问我的博客！</p>
          <p>这个博客是vue2.0、node、和leanCloud实现的全栈技术，也是我第一个全栈开发项目。
            项目的样式模版来自网络，主要是为了学习vue和node相关技术，同时可以记录生活趣事和分享技术经验。
            项目基本上耗尽了我下班时间和周末时间，不过收获还是挺多的。</p>
          <p>另外，博客内容也会在GitHub上同步更新，欢迎Star！</p>
        </article>
      </section>
      <div class="myinfo-background" :class="{'blur': showMyWords}">
        <img src="../../assets/images/myinfo.jpg" width="100%" height="100%">
      </div>
    </div>
</template>
<style lang="scss">
  @import "../../assets/css/theme.scss";
  $animationTime_1: 500ms;
  $animationTime_2: 200ms;
  .myinfo {
    z-index: 99;
    width: 28%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    position: fixed;
    transition: width ease $animationTime_1;
    padding-left: 45px;
    color: #fff;
    .text-shadow {
      text-shadow: -1px 0 0 rgba(0,0,0,0.75);
    }
    .myinfo-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    .detail {
      box-sizing: content-box;
      width: 350px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .detail-1 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom:15px;
        .detail-img-box {
          width: 160px;
          height: 160px;
          margin: 0 auto;
          cursor: pointer;
          .img-box {
            position: relative;
            width: 160px;
            height: 160px;
            margin: 0 auto;
            cursor: pointer;
            border-radius: 100%;
            background: url("../../assets/images/img-box.png") no-repeat center center/cover;
            img {
              width: 100%;
              height: 100%;
              max-width: 160px;
              max-height: 160px;
              box-shadow: 0 3px 12px #000;
            }
            &:after {
              content: "\f007";
              font-family: FontAwesome;
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              background-color: rgba(0, 0, 0, 0.5);
              border-radius: 100%;
              font-size: 30px;
              line-height: 100%;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
              z-index: 999;
              transition: all ease 200ms;
            }
            &:hover {
              &:after {
                opacity: 1;
              }
            }
          }
        }
        .detail-info {
          overflow: hidden;
          .name {
            color: #fff;
            margin: 20px 0;
            width: 100%;
            font-size: 30px;
            line-height: 100%;
            font-weight: bold;
          }
          .job {
            color: #fff;
            width: 100%;
            font-size: 18px;
            line-height: 100%;
            margin: 20px 0;
          }
          .address {
            color: #fff;
            width: 100%;
            font-size: 14px;
            line-height: 100%;
            margin: 10px 0;
          }
          .motto {
            font-size: 14px;
            color: #fff;
            width: 100%;
            line-height: 230%;
            margin: 0 0;
          }
        }
      }
      .detail-2 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .detail-sns {
          width: 265px;
          margin-top:10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .github {
            background: #38b7ea;
            color: #fff;
            text-decoration: none;
            width: 160px;
            color: #fff;
            border-radius: 20px;
            text-decoration: none;
            height: 40px;
            font-size: 16px;
            line-height: 40px;
            transition: .2s ease;
            display: block;
            cursor: pointer;
            text-align: center;
            margin: 0 auto 15px;
            a {
              color: inherit;
            }
            &:hover {
               text-decoration: none;
               background: #49c8fb !important;
               color: #fff;
            }
          }
          .sns {
            margin: 0;
            list-style: none;
            display: flex;
            font-size: 20px;
            width: 100%;
            justify-content: center;
            align-items: center;
            padding: 0;
            & > li {
              margin: 0 8px;
              cursor: pointer;
              transition: .2s ease;
              a {
                color: inherit;
              }
              &:hover {
                 color: #38b7ea;
              }
            }
          }
        }
      }
    }
    .mywords {
      width: 0;
      align-items: center;
      transform: translate3d(0, 0, 0);
      display: flex;
      justify-content: flex-start;
      overflow: visible;
      text-align: left;
      font-size: 18px;
      line-height: 30px;
      max-width: 720px;
      color: #fff;
      user-select: none;
      -webkit-user-select: none;
      position: relative;
      box-sizing: border-box;
      opacity: 0;
      transition: width $animationTime_1 ease, opacity $animationTime_2 ease;
    }
  }
  .showMyWords-active {
    width: 100% !important;
    .mywords {
      width: 720px !important;
      opacity: 1 !important;
      overflow: inherit !important;
      transition: width $animationTime_1 ease, opacity $animationTime_2 ease $animationTime_1 !important;
    }
  }
  @include media("<=desktop_small") {
    .myinfo {
      display: none;
    }
  }
</style>
<script>
    export default {
      data() {
          return {
            myinfo: {},
            showMyWords: false
          };
      },
      methods: {
        setMyWordStatus: function () {
          this.showMyWords = !this.showMyWords;
        }
      }
    };
</script>
