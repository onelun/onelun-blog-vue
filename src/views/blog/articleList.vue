<template>
    <div class="main">
      <div class="articleList">
        <router-link class="article" v-for="article of articleList" :key="article.objectId"
                     :to="{ name: 'article',params: { articleId: article.objectId }}" activeClass="active" tag="article">
          <div class="article-content">
            <div class="article-header">
              <h2 class="article-header-title">{{article.title}}</h2>
              <div class="article-header-content">{{article.abstract}}</div>
            </div>
            <div class="article-img hidden-xs">
              <img src="../../assets/images/img-box.png">
            </div>
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
          </div>
        </router-link>
        <no-data v-if="!hasData"></no-data>
        <Pagination class="pagination" v-if="hasData"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          layout="prev, pager, next"
          :total="total">
        </Pagination>
      </div>
      <section class="copyright animated fadeIn" v-if="articleList.length!==0">
        <copyright></copyright>
      </section>
    </div>
</template>
<script>
  import copyright from 'components/copyright';
  import noData from 'components/nodata';
  import {getArticleLastList} from 'api/article';
  import Vue from 'vue';
  import API from '../../config.js';
  import {Pagination} from 'element-ui';
  import {mapState, mapActions} from 'vuex';
  export default{
    data() {
      return {
        articleList: [],
        hasData: true, // 是否有数据提示
        pageIndex: 1,
        total: 0
      };
    },
    mounted() {
      this.getArticleList();
    },
    computed: {
      ...mapState({
        isLoading: 'isLoading'
      })
    },
    methods: {
      ...mapActions({
        setLoadingStatus: 'setLoadingStatus'
      }),
      handleCurrentChange(val) {
        this.pageIndex = val;
        console.log(`当前页: ${val}`);
        this.getArticleList();
      },
      getArticleList: function () {
        let _this = this;
        _this.setLoadingStatus(true);
        getArticleLastList({pageIndex: _this.pageIndex, pageSize: API.pageSize}).then(function (results) {
          let articles = results.datas;
          _this.articleList = articles;
          _this.total = results.total;
          if (articles.length === 0) {
            _this.hasData = false;
          }
          _this.setLoadingStatus(false);
        }, function () {
          _this.hasData = false;
          _this.setLoadingStatus(false);
        }).then(function () {
          _this.setLoadingStatus(false);
          _this.articleList.length === 0 ? (_this.hasData = false) : ('');
        });
      }
    },
    components: {
      noData, copyright, Pagination
    }
  };
</script>
<style lang="scss">
  @import "../../assets/css/theme.scss";
  @include media("<=tablet") {
    .article-header {
      width:100% !important;
    }
  }
  .articleList {
    padding-left: 4%;
    width: 100%;
    .pagination {
      text-align: center;
      margin: 8px 0 8px 0;
    }
    .article {
      cursor: pointer;
      overflow: hidden;
      border-bottom: 1px solid #f0f0f0;
      .article-content {
        &:hover .article-header .article-header-title {
          color: $base-theme-color;
          &:after {
             border-top: 3px solid $base-theme-color;
          }
        }
        @include display-flex;
        .article-header {
          width: 70%;
          padding: 18px 18px 0px 18px;
          color: $base-word-color;
          font-size: 20px;
          line-height: 28px;
          .article-header-title {
            color: #000;
            text-align: left;
            transition: color ease 200ms;
            position: relative;
            padding-bottom: 20px;
            margin: 0;
            font-size: 20px;
            font-weight: 500;
            line-height: 1.2;
            &:after {
               transition: color ease 200ms;
               content: '';
               position: absolute;
               bottom: 10px;
               left: 0;
               height: 0;
               border-top: 3px solid $base-theme-color;
               border-top-right-radius: 3px;
               border-bottom-right-radius: 3px;
               width: 10%;
             }
          }
          .article-header-content {
            line-height: 20px;
            font-size: 12px;
            overflow: hidden;
            p {
              margin: 0;
            }
          }
        }
        .article-img {
          margin: 18px 18px 0px 0px;
          width: 150px;
          height: 120px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 4px;
            border: 1px solid #f0f0f0;
            vertical-align: middle;
          }
        }
      }
      .article-infobox {
        padding-right: 0!important;
        font-size: 12px;
        font-weight: 400;
        line-height: 24px;
        @include display-flex;
        @include justify-content(space-between);
        @include align-items(center);
        padding: 8px 16px;
        .article-info {
          @include display-flex;
          @include justify-content(flex-start);
          @include align-items(center);
          .article-info-item {
            color: #969696;
            margin-right: 20px;
            font-size: 12px;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
