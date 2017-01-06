<template>
    <div class="main">
      <div class="articleList" v-infinite-scroll="loadMore"
           infinite-scroll-disabled="infiniteDisabled" infinite-scroll-distance="10">
        <div v-for="article of articleList" class="article">
        <div class="article-header">
          <h2 class="article-header-title">{{article.title}}</h2>
          <div class="article-header-content">{{article.abstract}}</div>
        </div>
        <div class="article-infobox">
          <div class="article-info">
            <div class="article-info-item">
              <i class="fa fa-calendar"></i>
              <span>{{article.createdAt | moment("from","now")}}</span>
            </div>
            <div class="article-info-item">
              <i class="fa fa-book"></i>阅读数
              <span class="article-readnum">{{article.readNum}}</span>
            </div>
            <div class="article-info-item">
              <i class="fa fa-comments"></i>评论数
              <span class="article-comment">{{article.commentNum}}</span>
            </div>
            <div class="article-info-item hidden-xs" v-for="tag of article.tags">
              <i class="fa fa-tag"></i>
              <span>{{tag.name}}</span>
            </div>
          </div>
          <div class="arrticle-readmore hidden-xs">
            <span>阅读更多</span>
          </div>
        </div>
        </div>
        <no-data v-if="!hasData && !isLoading"></no-data>
        <loading v-if="isLoading" class="loading" :number="9"></loading>
      </div>
      <section class="copyright animated fadeIn" v-if="articleList.length!==0">
        <copyright></copyright>
      </section>
    </div>
</template>
<script>
  import { InfiniteScroll } from 'mint-ui';
  import copyright from 'components/copyright';
  import noData from 'components/nodata';
  import loading from 'components/loading';
  import {getArticleLastList} from 'api/article';
  import Vue from 'vue';
  import API from '../../config.js';
  Vue.use(InfiniteScroll);
  export default{
    data() {
      return {
        isLoading: true, // 加载提示
        articleList: [],
        hasData: true, // 是否有数据提示
        pageNow: 0,
        infiniteDisabled: false // 是否禁用无限加载
      };
    },
    methods: {
      loadMore() {
        this.isLoading = true;
        console.log('loading');
        this.getArticleList();
      },
      getArticleList: function () {
        let _this = this;
        getArticleLastList(API.getArticleList).then(function (results) {
          let articles = results.articles;
          _this.articleList = _this.articleList.concat(articles);
          console.log(_this.articleList);
          _this.pageNow += parseInt(API.ArticleNum);
          if (articles.length === API.ArticleNum) {
            _this.infiniteDisabled = false;
          } else {
            _this.infiniteDisabled = true;
            _this.isLoading = false;
          }
        }, function () {
          _this.hasData = false;
        }).then(function () {
          _this.articleList.length === 0 ? (_this.hasData = false, _this.isLoading = false) : ('');
        });
      }
    },
    components: {
      noData, copyright, loading
    }
  };
</script>
<style lang="scss">
  @import "../../assets/css/theme.scss";
  .loading{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%!important;
    height: 50px;
    margin:0 auto;
  }
  .articleList {
    padding-left: 4%;
    width: 100%;
    .article {
      user-select: none;
      -webkit-user-select: none;
      box-sizing: border-box;
      margin-bottom: 30px;
      cursor: pointer;
      overflow: hidden;
      &:hover .article-header .article-header-title {
        color: $base-theme-color;
        &:after {
          border-top: 3px solid $base-theme-color;
        }
      }
      &:hover .article-infobox .arrticle-readmore span {
        background-color: $base-theme-color;
      }
      .article-header {
        padding: 35px;
        color: $base-word-color;
        font-size: 20px;
        line-height: 28px;
        background: #fff;
        position: relative;
        .article-header-title {
          text-align: right;
          transition: color ease 200ms;
          position: relative;
          padding-bottom: 20px;
          margin: 0;
          font-size: 30px;
          font-weight: 500;
          line-height: 1.2;
          &:after {
            transition: color ease 200ms;
            content: '';
            position: absolute;
            bottom: 10px;
            right: 0;
            height: 0;
            border-top: 3px solid $base-theme-color;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
            width: 10%;
          }
        }
        .article-header-content {
          line-height: 24px;
          font-size: 16px;
          overflow: hidden;
          p {
            margin: 0;
          }
        }
      }
      .article-infobox {
        @include display-flex;
        @include justify-content(space-between);
        @include align-items(center);
        background: $base-background-color;
        padding: 14px 35px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.8) inset;
        transition: all ease 200ms;
        .article-info {
          @include display-flex;
          @include justify-content(flex-start);
          @include align-items(center);
          .article__info--each {
            color: #eee;
            margin-right: 20px;
            font-size: 14px;
            white-space: nowrap;
          }
        }
        .arrticle-readmore {
          span {
            border: 1px solid $base-theme-color;
            transition: all ease 200ms;
            border-radius: 34px;
            color: #eee;
            padding: 4px 22px;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
