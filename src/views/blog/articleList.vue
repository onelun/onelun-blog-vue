<template>
    <div class="main">
      <div class="articleList" v-infinite-scroll="loadMore"
           infinite-scroll-disabled="infiniteDisabled" infinite-scroll-distance="10">
        <div v-for="article of articleList">
        <div class="article-header">
          <h2 class="article-header-title">{{article.title}}</h2>
          <div class="article-header-content">{{article.abstract}}</div>
        </div>
        <div class="article-infobox">
          <div class="article-info">
            <div class="article-info-item">
              <i class="fa fa-calendar"></i>
              <span>{{article.publish_time | moment("from","now")}}</span>
            </div>
            <div class="article-info-item">
              <i class="fa fa-book"></i>阅读数
              <span class="article-readnum">{{article.read-num}}</span>
            </div>
            <div class="article-info-item">
              <i class="fa fa-comments"></i>评论数
              <span class="article-comment">{{article.comment_num}}</span>
            </div>
            <div class="article-info-item hidden-xs" v-for="tag of article.tags">
              <i class="fa fa-tag"></i>
              <span>{{tag.name}}</span>
            </div>
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
<style>
</style>
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
        console.log('get article list');
        getArticleLastList(API.getArticleList).then(function (results) {
          console.log(results);
        });
      }
    },
    components: {
      noData, copyright, loading
    }
  };
</script>
