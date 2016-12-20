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
              <li><a title="新浪微博" target="_blank" href="#"><i class="fa fa-weibo"></i></a></li>
              <li><a title="腾讯微博" target="_blank" href="#"><i class="fa fa-tencent-weibo"></i></a>
              </li>
            </ul>
          </section>
        </section>
      </section>
      <section class="mywords  visuallyhidden">
        <p class="text-shadow">人生，少年，中年，老年，就如喝茶的三个阶段。头遍苦涩，正如初入社会磕绊坎坷。二遍舌底生津，在拼搏后收获财富，稳重和信心。
          第三遍茶已逐渐淡去，犹如年纪渐大，耳顺易平心静，经过时光的洗练，心中一片清澈，诚如茶之味淡，茶水愈加透明。</p>
      </section>
      <div class="background">
        <img src="../../assets/images/myinfo.jpg" width="100%" height="100%">
      </div>
    </div>
</template>
<style lang="scss">
  @import "../../assets/css/theme.scss";
  $animationTime_1: 500ms;
  $animationTime_2: 200ms;
  .showMyWords-active {
  @include media(">desktop") {
    width: 100% !important;
    .mywords {
      width: 720px !important;
      opacity: 1 !important;
      overflow: inherit !important;
      transition: width $animationTime_1 ease, opacity $animationTime_2 ease $animationTime_1 !important;
    }
  }
  @include media("<=desktop") {
    width: 100% !important;
    height: 100% !important;
    position: fixed !important;
    .mywords {
      height: 230px !important;
      width: 100% !important;
      overflow: inherit !important;
      opacity: 1 !important;
      transition: all $animationTime_1 ease !important;
    }
  }
  @include media("<=desktop_small") {
    padding-right: 0 !important;
    .detail {
      padding-top: 45px !important;
    }
  }
  @include media("<=phone") {
    .background {
      filter: blur(10px);
    }
    .detail {
      height: 109px !important;
      padding-top: 0 !important;
    }
  }
  }

  .myinfo {
    z-index: 99;
    width: 28%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    position: fixed;
    padding-left: 45px;
    color: #fff;
    .text-shadow {
      text-shadow: -1px 0 0 rgba(0,0,0,0.75);
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    .detail {
      box-sizing: content-box;
      .detail-1 {
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
        .detail-sns {
          .github {
            background: #38b7ea;
            color: #fff;
            text-decoration: none;
            width: 160px;
            background: #38b7ea;
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
      align-items: center;
      transform: translate3d(0, 0, 0);
      display: flex;
      justify-content: center;
      overflow: visible;
      text-align: left;
      font-size: 24px;
      line-height: 33px;
      max-width: 720px;
      color: #fff;
      user-select: none;
      -webkit-user-select: none;
      position: relative;
      box-sizing: border-box;
    }
  }

  @include media(">desktop") {
    .myinfo {
      width: 28%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      position: fixed;
      transition: width ease $animationTime_1;
      padding-left: 45px;
      .detail {
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
            width: 100%;
          }
          .detail-info {
            width: 100%;
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
              margin: 0 auto 15px;
            }
            .sns {
              padding: 0;
            }
          }
        }
      }
      .mywords {
        width: 0;
        justify-content: flex-start;
        align-items: center;
        opacity: 0;
        transition: width $animationTime_1 ease, opacity $animationTime_2 ease;
      }
    }
  }

  @include media("<=desktop") {
    .myinfo {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: absolute;
      transition: height ease $animationTime_1;
      .detail {
        width: 720px;
        min-height: 270px;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        .detail-1 {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          .detail-img-box {
            width: 225px;
          }
          .detail-info {
            width: 265px;
          }
        }
        .detail-2 {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin: 20px 0 0;
          .detail-sns {
            display: flex;
            flex-direction: row;
            width: 265px;
            justify-content: center;
            align-items: center;
            .github {
              margin: 0;
              display: none;
            }
            .sns {
              padding: 0;
            }
          }
        }
      }
      .mywords {
        align-items: flex-start;
        justify-content: flex-start;
        height: 0;
        overflow: hidden;
        width: 720px;
        opacity: 0;
        transition: height $animationTime_1 ease, opacity $animationTime_2 ease;
      }
    }
  }
  @include media(">desktop_small", "<=desktop") {
    .myinfo {
      height: 270px;
    }
  }
  @include media("<=desktop_small") {
    .myinfo {
      height: 315px;
      .detail {
        padding: 45px 0 0 0;
        transition: all ease 500ms;
      }
      .mywords {
        padding: 0px 40px !important;
      }
    }
  }

  @include media("<=phone") {
    .myinfo {
      justify-content: center;
      height: 190px;
      .detail {
        height: 145px;
        width:100%;
        min-height: inherit;
        transition: all ease 500ms;
        .detail-1 {
          margin: 5px 0;
          flex-direction: row;
          .detail-img-box {
            margin: 0 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            .img-box {
              width: 70px;
              height: 70px;
              &:hover {
                &:after {
                   opacity: 0;
                }
              }
            }
            width: 80px;
            height: 80px;
          }
          .detail-info {
            margin: 0 5px;
            width: auto;
            .name {
              margin: 10px 0;
              font-size: 24px;
            }
            .job {
              margin: 10px 0;
              font-size: 12px;
            }
          }
        }
        .detail-2 {
          margin: 5px 0;
        }
      }
      .mywords {
        width: 100%;
        font-size: 16px;
        padding: 0 20px !important;
        text-align: center;
        p {
          margin: 0 !important;
        }
        article {
          margin: 10px 0;
        }
      }
    }
  }



</style>
<script>
    export default {
      data() {
          return {
            myinfo: {}
          };
      },
      props: ['showMyWords'],
      methods: {
        setMyWordStatus: function () {
          this.showMyWords = !this.showMyWords;
        }
      }
    };
</script>
