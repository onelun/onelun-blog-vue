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
          <!--多说评论框-->
          <section id="comment" class="commentbox">
            <div id="commentBox"></div>
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
      padding: 0 30px 0 30px;
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
  import hljs from 'highlight.js';
  import {GetArticleById, GetArticleTop, IncrementReadNum} from 'api/article';
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
    data: function () {
      return {
        article: {},
        articleId: this.$route.params.articleId,
        title: this.$route.params.title,
        dataUrl: 'https://onelun.leanapp.cn/article/',
        contentMarked: ''
      };
    },
    computed: {
      ...mapState({
        isLoading: 'isLoading'
      })
    },
    mounted() {
      let _this = this;
      let articleId = this.$route.params.articleId;
      _this.incrementReadNum(articleId);
      setTimeout(function () {
        _this.toggleDuoshuoComments('#commentBox');
      }, 500);
    },
    methods: {
      ...mapActions({
        setLoadingStatus: 'setLoadingStatus'
      }),
      incrementReadNum(articleId) {
        let _this = this;
        IncrementReadNum(articleId);
      },
      toggleDuoshuoComments(container) {
        var el = document.createElement('div'); // 该div不需要设置class="ds-thread"
        el.setAttribute('data-thread-key', this.articleId); // 必选参数
        el.setAttribute('data-url', this.dataUrl); // 必选参数
        el.setAttribute('data-author-key', this.articleId); // 可选参数
        DUOSHUO.EmbedThread(el);
        $(container).append(el);
      },
      /**
       * 获取数据
       * @param articleId 文章id
       * */
      getArticleById: function (articleId) {
        let _this = this;
        this.dataUrl = 'https://onelun.leanapp.cn/article/' + articleId;
        _this.setLoadingStatus(true);
         GetArticleById(articleId).then(function (result) {
          _this.article = result.data;
          _this.contentMarked = marked(_this.article.content);
          _this.setLoadingStatus(false);
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
          _this.setLoadingStatus(false);
          console.log(error);
        });
      }
    },
    created: function () {
      const _this = this;
      let articleId = _this.$route.params.articleId;
      // 获取文章
      _this.getArticleById(articleId);
    },
    components: {
      copyright
    }
  };
</script>
