<!--内容区-->
<template>
  <div>
    <div class="articleList animated fadeIn">
      <h3 class="title">
        <i class="fa fa-fw fa-lg fa-list"></i> 文章列表 / <span class="blue">ARTICLE</span>
      </h3>
      <div class="text-right">
        <router-link :to="{ name: 'admin-article', params: { articleId: 0 }}" activeClass="active" tag="button"
                     class="btn btn-success">
          <i class="fa fa-plus"></i>
        </router-link>
      </div>
      <!--修改,启用禁用,查看-->
      <table class="table" id="table">
        <thead>
        <tr class="text-center">
          <th>#</th>
          <th @click="order('title')">文章题目/Title
            <span v-if="predicate == 'title'">
                    <i v-if="reverse==='asc'" class="fa fa-caret-up"></i>
                    <i v-if="reverse==='desc'" class="fa fa-caret-down"></i>
                </span>
          </th>
          <th @click="order('publishTime')">发布时间/Time
            <span v-if="predicate == 'publishTime'">
                    <i v-if="reverse==='asc'" class="fa fa-caret-up"></i>
                    <i v-if="reverse==='desc'" class="fa fa-caret-down"></i>
                </span>
          </th>
          <th @click="order('readNum')">阅读数/Co.
            <span v-if="predicate == 'readNum'">
                    <i v-if="reverse==='asc'" class="fa fa-caret-up"></i>
                    <i v-if="reverse==='desc'" class="fa fa-caret-down"></i>
                </span>
          </th>
          <th @click="order('state')">状态/State
            <span v-if="predicate == 'state'">
                    <i v-if="reverse==='asc'" class="fa fa-caret-up"></i>
                    <i v-if="reverse==='desc'" class="fa fa-caret-down"></i>
                </span>
          </th>
          <th>操作</th>
        </tr>
        </thead>
        <!--<tbody>-->
        <tbody>
        <tr  v-for="(article,index) in orderedArticleList" :key="article.objectId">
          <td>{{index+1}}</td>
          <td>{{article.title}}</td>
          <td>{{article.publishTime | moment('YYYY/MM/DD')}}</td>
          <td>{{article.readNum}}</td>
          <td>
            <span v-if="article.state">已发表</span>
            <span v-else>草稿</span>
          </td>
          <td>
            <router-link :to="{ name: 'admin-article',params: { articleId: article.objectId }}" tag="button"
                         activeClass="active"
                         class="btn btn-default btn-sm">
              <i class="fa fa-pencil"></i>
            </router-link>
            <button data-toggle="modal" data-target="#delArticle" @click="delArtBtn(article)"
                    class="btn btn-danger btn-sm"><i class="fa fa-bitbucket"></i></button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--弹出层-删除-->
    <div class="modal fade" id="delArticle" tabindex="-1" role="dialog" @keyup.enter="confirmDelArtBtn()">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h4 class="modal-title"><i class="fa fa-bitbucket"></i> 删除文章/DELART</h4>
          </div>
          <div class="modal-body">
            <h3 class="text-center deleteConfirmText">确定删除这篇文章?</h3>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" @click="confirmDelArtBtn()" class="btn btn-danger">
              删除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  @import "../../assets/css/theme.scss";
  .articleList {
    .title {
      width: 100%;
      color: #fff;
      margin-bottom: 10px;
    }
    table {
      text-align: center;
      color: #fff;
      th {
        text-align: center;
        color: #00b2e2;
        position: relative;
        cursor: pointer;
        span {
          position: absolute;
          margin-left: 5px;
          top: inherit;
          left: inherit;
        }
      }
      td {
        vertical-align: middle !important;
        max-width: 190px;
        border-top-color:transparent;
        border-bottom:1px solid $border-bottom-dark;
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import lodash from 'lodash';
  import {
    GetArticleList,
    DeleteArticle
  } from 'api/article';
  import copyright from 'components/copyright';
  export default{
    data() {
      return {
        reverse: 'desc',
        predicate: 'publishTime',
        articleList: [],
        deleteArticle: {}
      };
    },
    computed: {
      orderedArticleList: function () {
        let hasArticleList = !!this.articleList;
        if (hasArticleList) {
          return lodash.orderBy(this.articleList, [this.predicate], [this.reverse]);
        } else {
          return [];
        }
      }
    },
    methods: {
      order: function (name) {
        this.predicate = name;
        if (this.reverse === 'asc') {
          this.reverse = 'desc';
        } else {
          this.reverse = 'asc';
        }
      },
      delArtBtn(article) {
        this.deleteArticle = article;
      },
      confirmDelArtBtn() {
        DeleteArticle({'objectId': this.deleteArticle.objectId}).then(() => {
          // 刷新文章列表
          this.articleList.splice(this.articleList.indexOf(this.deleteArticle), 1);
          $('#delArticle').modal('hide');
        });
      }
    },
    created() {
      const _this = this;
      // 获取文章列表
      GetArticleList().then((result) => {
        _this.articleList = result.datas;
      });
    },
    components: {
      copyright
    }
  };
</script>
