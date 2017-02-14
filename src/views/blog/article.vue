<template>
  <div class="article animated fadeIn container">
    <div class="row" v-if="!isLoading">
      <div id="article" class="col-lg-8">
        <div class="article-detail">
          <!--文章-->
          <div class="paper">
            <section class="paper-header">
              <ol class="breadcrumb  hidden-xs">
                <li>
                  <router-link :to="{ name: 'index'}" tag="a">首页</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'blog'}" tag="a">博客</router-link>
                </li>
                <li class="active">文章</li>
              </ol>
              <h1>{{article.title}}</h1>
            </section>
            <section class="paper-info">
              <div class="paper-info-span">
                <i class="fa fa-calendar"></i>
                <span>{{article.publishTime  | moment("from","now")}}</span>
              </div>
              <div class="paper-info-span">
                <i class="fa fa-book"></i>
                阅读数
                <span>{{article.readNum}}</span>
              </div>
              <!--hidden-xs-->
              <div class="paper-info-span hidden-xs" v-for="tag of article.tags">
                <i class="fa fa-tag"></i> <span>{{tag.name}}</span>
              </div>
            </section>
            <section class="paper-content">
              <div class="paper-content-inner markdown-body hljs" v-html="contentMarked">
              </div>
              <!--page-->
            </section>
            <!--the end-->
          </div>
          <!--评论-->
          <section id="comment" class="commentbox">

          </section>
        </div>
        <copyright></copyright>
      </div>
      <div class="col-lg-4 visible-lg clearfix">
        <aside class="article-aside">
          <div class="menu">
            <div class="menu-title">
              <h3 class="menu-title-h3">文章目录</h3>
            </div>
            <div class="menu-wrap" id="menu-wrap"></div>
          </div>
        </aside>
      </div>
    </div>
    <!--返回最上层-->
    <div id="toTop" class="backToTop">
      <i class="fa fa-arrow-up"></i>
    </div>
  </div>

</template>
<style scoped lang="scss">
  @import "../../assets/css/theme.scss";
  .article {
    padding-top: 35px;
    position: relative;
    .article-detail {
    }
    .article-aside {
      position: fixed;
      width: 370px;
      box-sizing: border-box;
      color: #333;
      .menu {
        width: 100%;
        margin-bottom: 15px;
        box-sizing: border-box;
        .menu-title {
          padding: 18px 0 8px;
          background: rgba(0, 0, 0, 0.5);
          .menu-title-h3 {
            border-left: 5px solid $base-theme-color;
            padding: 0 0 0 10px;
            margin: 0;
            color: #fff;
            margin-left: 10px;
            @include display-flex;
            @include justify-content(flex-start);
            @include align-items(center);
            transition: all ease 200ms;
            small {
              color: $base-theme-color;
              margin-left: 7px;
            }
          }
        }
        .menu-wrap {
          padding: 8px 20px;
          background: #fff;
          list-style-type: none;
          position: relative;
          min-height: 150px;
          margin: 0;
        }
      }
    }}

  .article-detail {
    min-width: 740px;
    max-width: 980px;
    margin: 0 auto;
    color: $base-word-color;
    box-sizing: border-box;
    position: relative;
    z-index: 999;
    .paper {
      background-color: transparent;
      overflow: hidden;
      margin-bottom: 30px;
      &.loading {
        .paper-header {
          h1 {
            background: #eee;
          }
        }
        .paper-info {
          .paper-info-span {
            opacity: 0.3;
            background: #fff;
            min-width: 70px;
            text-decoration: none;
          }
        }
        .paper-content {
          .paper-content-inner {
            background-repeat: no-repeat;
            background-size: 100% auto;
            background-position: center top;
            min-height: 834px;
            width: 100%;
          }
        }

      }
      .paper-header {
        border: 1px solid transparent;
        padding: 35px 35px 0;
        background: #fff;
        text-align: right;
        a {
          text-decoration: none;
        }
        h1 {
          min-height: 52px;
          width: 100%;
          box-sizing: border-box;
          font-size: 36px;
          font-weight: 500;
          line-height: 1.2;
          margin: 20px 0 10px;
        }
      }
      .paper-info {
        @include display-flex;
        @include justify-content(flex-end);
        @include align-items(center);
        background: $base-background-color;
        padding: 10px 35px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.8) inset;
        transition: all ease 200ms;
        .paper-info-span {
          color: #eee;
          margin-left: 20px;
          font-size: 14px;
          white-space: nowrap;
          text-decoration: none;
        }
        a:hover {
          color: $base-theme-color;
        }
      }
      .paper-content {
        padding: 35px;
        background: #fff;
        .paper-content-inner {
          padding: 5px 0 0;
        }
      }
    }
    .commentbox {
      background-color: $base-background-color;
      padding: 0;
      border-radius: 3px;
      border-bottom: 3px solid $base-theme-color;
      position: relative;
      overflow: hidden;
      margin-bottom: 30px;
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        border-top: 4px solid $base-theme-color;
        border-top-right-radius: 3px;
        width: 40%;
        height: 0;
      }
    }
  }

  .backToTop {
    position: fixed;
    left: 700px;
    width: 60px;
    height: 60px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 100%;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all ease 200ms;
    z-index: 999;
    margin-left: 40px;
    bottom: 20px;
    opacity: 0;
    &:hover {
      background: $base-theme-color;
    }
  }

  @include media("<=desktop") {
    .backToTop {
      margin-left: 0;
    }
  }

  @include media("<=desktop_small") {
    .article {
      padding-top: 60px;
    }
  }

  @include media("<=tablet") {
    .article-detail {
      max-width: 780px;
      min-width: inherit;
      width: auto;
    }
  }

  @include media("<=phone") {
    .article {
      padding-left: 6px;
      padding-right: 6px;
      padding-top: 51px;
      .row {
        margin: 0;
        #article {
          padding: 0;
        }
      }
      .article-detail {
        .paper {
          margin-bottom: 10px;
          .paper-header {
            padding: 30px 10px 10px;
            h1 {
              font-size: 28px;
              font-weight: 500;
              line-height: 120%;
              margin: 0;
              min-height: inherit;
            }
          }
          .paper-info {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 8px 0px;
            background: rgba(0, 0, 0, 0.5);
            .paper-info-span {
              margin: 0 10px;
              font-size: 12px;
            }
          }
          .paper-content {
            padding: 20px 10px 20px;
            .paper-content-inner {
              font-size: 14px !important;
            }
          }
        }
        .commentbox {
          margin-bottom: 10px;
        }
      }
    }
  }

</style>
<script type="text/javascript">
  import API from '../../config.js';
  import marked from 'marked';
  import {GetArticleById, GetArticleTop} from 'api/article';
  import loading from 'components/loading';
  import 'assets/css/codeHighLight.css';
  import 'assets/css/markdown.scss';
  import 'bootstrap/scss/bootstrap/_breadcrumbs.scss';
  import copyright from 'components/copyright.vue';
  import {mapState, mapActions} from 'vuex';
  import 'plugin/jquery.scrollNav.min.js';
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
  module.exports = {
    replace: true,
    data: function () {
      return {
        article: {},
        contentMarked: '',
        articleTop: {},
        toggle: true,
        selectId: '',
        hasNickName: false,
        topNum: 5 // top 榜单
      };
    },
    computed: {
      ...mapState({
        isLoading: 'isLoading'
      })
    },
    methods: {
      ...mapActions({
        setLoadingStatuS: 'setLoadingStatuS'
      }),
      replyBtn: function (id) {
        if (this.selectId === id) {
          this.toggle = !this.toggle;
        } else {
          this.toggle = true;
          this.selectId = id;
        }
      },
      scrollTop: () => {
        $(window).scrollTop(0);// 滚到顶部
      },
      /**
       * 获取数据
       * @param articleId 文章id
       * */
      getArticleById: function (articleId) {
        const _this = this;
        _this.setLoadingStatuS(true);
         GetArticleById(articleId).then(function (result) {
          _this.article = result.data;
          _this.contentMarked = marked(_this.article.content);
          _this.setLoadingStatuS(false);
           setTimeout(() => {
             $('.markdown-body').scrollNav({
               sections: 'h2',  // 一级目录的元素
               subSections: 'h3',  // 二级目录的元素
               showHeadline: false,
               showTopLink: false,
               scrollOffset: 70,
               arrowKeys: true,
               insertTarget: '#menu-wrap',
               insertLocation: 'prependTo'
             });
           }, 500);
        }, function (error) {
          _this.setLoadingStatuS(false);
          console.log(error);
        });
      },

      /**
       * 返回顶部的事件handler
       * */
      backToTopHandler: function () {
        let _width = $(document).width();
        if (_width >= 1200) {
          if ($(this).scrollTop() > 0) {
            $('#toTop').css({
              'opacity': 1,
              'left': $('#article').offset().left + $('#article').width()
            });
          } else {
            $('#toTop').css({
              'opacity': 0
            });
          }
        } else if (_width < 1200) {
          if ($(this).scrollTop() > 0) {
            $('#toTop').css({
              'opacity': 1,
              'left': $('#article').offset().left + $('#article').width() - $('#toTop').width()
            });
          } else {
            $('#toTop').css({
              'opacity': 0
            });
          }
        }
      }
    },
    created: function () {
      const _this = this;
      let articleId = _this.$route.params.articleId;
      $(window).scrollTop(0);// 滚到顶部
      // To Top
      $(document)
      .on('scroll', _this.backToTopHandler)
      .on('click', '#toTop', function () {
        $(window).scrollTop(0);
      });

      // 获取文章
      _this.getArticleById(articleId);
    },
    destroyed: function () {
      // $(document).off('scroll');
    },
    components: {
      copyright,
      loading
    }
  };
</script>
