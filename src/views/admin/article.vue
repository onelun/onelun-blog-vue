<template>
  <div class="articleEdit animated fadeIn">
    <!--column title -->
    <h3 class="title">
      <i class="fa fa-fw fa-lg fa-list"></i>文章编辑 / <span class="blue">ARTICLE-EDIT</span>
    </h3>
    <section class="mainSection">
      <div class="editSection">
        <div class="inputBox">
          <div class="inputBox-input">
            <div class="form-inline">
              <div class="form-group titleBox" :class="{true:'has-error',false:''}[!article.title]">
                <label for="artTitle">文章标题</label>
                <input type="text" name="title" v-model="article.title" class="form-control" id="artTitle" placeholder="请输入文章标题" required>
              </div>
            </div>
            <div class="form-inline">
              <div class="form-group publishTime" :class="{true:'has-error',false:''}[!publishTime]">
                <label for="publishTime">发布时间</label>
                <div class="input-group date dropdown" id="datetimepicker">
                  <input id="publishTime" type="text" class="form-control" v-model="publishTime">
                  <div class="input-group-addon" data-toggle="dropdown" data-target="#datetimepicker">
                    <span class="fa fa-fw fa-calendar"></span>
                  </div>
                </div>
              </div>
              <div class="form-group imgUploadBox">
                <label for="artTitle">上传图片</label>
                <div class="input-group">
                  <div class="input-group-addon">
                    <form action="" class="imgUploadForm" method="post" enctype="multipart/form-data">
                      <input id="imgUpload" type="file">
                    </form>
                    <span class="fa fa-fw"
                          :class="{true:'fa-spinner fa-spin',false:'fa-cloud-upload'}[isImgLoading]"></span>
                  </div>
                  <input id="uploadImgUrl" type="text" class="form-control" placeholder="图片引用路径" v-model="uploadImgUrl">
                  <div class="input-group-addon" id='copyImgUrl2Clipboard' data-clipboard-target="#uploadImgUrl">
                    <span class="fa fa-fw fa-clipboard"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-inline other_form_2">
              <div class="form-group tagsBox">
                <label>添加标签</label>
                <multiselect class="form-control multiselect other_form&#45;&#45;input small" id="tags"
                      v-model="selected" tag-placeholder="Add this as new tag" placeholder="请选择" label="name"
                      track-by="objectId" :max="3" :options="options" :multiple="true" :taggable="true" :limit="3"
                      :searchable="true" :close-on-select="false" @input="updateValueAction"
                      deselect-label="点击移除" select-label="点击选择" selected-label="当前选择">
                  <template slot="maxElements" scope="props">
                    <div>最多选择3项, 如果选择其他请先移除。</div>
                  </template>
                </multiselect>
              </div>
              <div class="btn-group" role="group">
                <button class="btn btn-info" @click="publishBtn()" v-bind:disabled="!article.title || !contentRaw || isPublishing">
                  <i class="fa fa-fw" :class="{true:'fa-spinner fa-spin',false:'fa-rocket'}[isPublishing]"></i> 发布
                </button>
                <button class="btn btn-default" @click="draftBtn()" v-bind:disabled="!article.title || !contentRaw || isPublishing">
                  <i class="fa fa-fw" :class="{true:'fa-spinner fa-spin',false:'fa-save'}[isDrafting]"></i> 草稿
                </button>
                <button @click="previewBtn()" class="btn btn-default showPreview">
                  <i class="fa fa-fw"
                     :class="{true:'fa-angle-double-left',false:'fa-angle-double-right'}[isShowBigAdmin]"></i> 预览
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="articleEdit">
          <label for="textarea">文章详情(MarkDown编辑)</label>
          <div class="textaresBox textaresBox_input">
            <textarea id="textarea" v-model="contentRaw" class="form-control textarea"></textarea>
          </div>
        </div>
      </div>
      <div class="previewSection" v-if="isShowBigAdmin">
          <div class="block">
          <label>Markdown语法说明:</label>
          <p class="markdown-info">
            <span>段落:</span><span># 标题1</span><span>## 标题2</span><span>### 标题3</span>
          </p>
          <p class="markdown-info">
            <span>标记:</span>
            <span>*<i>斜体</i>*</span> <span>_<i>斜体</i>_</span> <span>**<strong>加强</strong>**</span>
            <span>__<strong>加强</strong>__</span>
          </p>
          <p class="markdown-info">
            <span>插入:</span>
            <span>![图片ALT](/path/image.jpg "图片标题")</span><span>An [链接名称](http://url.com/ "链接名称")</span>
          </p>
        </div>
        <div class="previewTextarea">
          <label for="textarea">文章预览(实时)</label>
          <div class="textaresBox textaresBox_preview">
            <div class="textarea markdown-body" id="textareaPreview" v-html="contentMarked"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped lang="scss">
  @import "../../assets/css/theme.scss";
  .articleEdit {
    .title {
      width: 100%;
      color: #fff;
      margin-bottom: 30px;
    }
    .mainSection {
      @include display-flex;
      @include justify-content(space-between);
      @include align-items(flex-start);
      .editSection {
        width: 720px;
        .inputBox {
          @include display-flex;
          @include justify-content(space-between);
          @include align-items(center);
          box-sizing: border-box;
          .inputBox-input {
            width: 100%;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            .form-inline {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .form-group {
                vertical-align: middle;
                margin-bottom: 10px;
                label {
                  color: #fff;
                  margin-right: 5px;
                  margin-bottom: 0;
                }
              }
              .titleBox {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                input {
                  flex: 1;
                }
              }
              .publishTime {
                width: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                .input-group.date {
                  display: flex;
                  flex: 1;
                  justify-content: center;
                  margin-right: 10px;
                  .input-group-addon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                }
              }
              .imgUploadBox {
                width: 50%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                position: relative;
                .input-group {
                  display: flex;
                  flex: 1;
                  justify-content: center;
                  .input-group-addon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    /*cursor: pointer;*/
                  }
                }
                .imgUploadForm {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  left: 0;
                  top: 0;
                  opacity: 0;
                  #imgUpload {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    opacity: 0;
                    &::before {
                      content: '';
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      left: 0;
                      top: 0;
                      opacity: 0;
                      cursor: pointer;
                    }
                  }
                }
              }
              .tagsBox {
                display: flex;
                justify-content: center;
                align-items: center;
                .multiselect {
                  position: relative;
                  border: none;
                  outline: none;
                  background: #fff;
                  z-index: 999;
                  width: 410px;
                  min-height: 34px;
                  padding: 0;
                  margin: 0;
                  .selected-tag {
                    color: #333;
                    background-color: $base-background-color !important;
                  }
                  .multiselect__tags {
                    min-height: 34px !important;
                  }
                }
              }
              .input-group-addon {
                cursor: pointer;
                position: relative;
              }
              .btn-group {
                margin-bottom: 10px;
              }
            }
          }
          .inputBox__btn {
            width: 23%;
            padding-left: 10px;
            height: 88px;
            //width: 100%;
            @include display-flex;
            @include justify-content(center);
            @include align-items(center);
            box-sizing: border-box;
            .inputBox__btn--submit {
              flex: 1;
              height: 88px;
              box-sizing: border-box;
              padding: 0 0 10px 0;
              button {
                //height: 100%;
                flex: 1;
                height: 100%;
              }
            }
            .inputBox__btn--other {
              flex: 1;
              height: 88px;
              padding: 0 0 10px 0;
              @include display-flex;
              @include justify-content(space-between);
              @include align-items(center);
              @include flex-direction(column);
              button {
                width: 95px;
              }
            }
          }
        }
      }
      .previewSection {
        width: 720px;
        .block {
          height: 132px;
          width: 100%;
          color: #fff;
          .markdown-info {
            color: #fff;
            margin: 0;
            span {
              padding: 0 10px 0 0;
            }
          }
        }
        .previewTextarea {
          margin-top: 5px;
        }
      }
    }
  }
  .articleEdit {
    margin-top: 5px;
    label {
     color: #fff;
    }
  }
  .textaresBox {
    margin-bottom: 30px;
    background-color: #fff;
    border-radius: 4px;
    position: relative;
    &:before {
      content: 'PREVIEW';
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 80px;
      height: 90px;
      line-height: 90px;
      padding-right: 15px;
      color: rgba(146, 146, 146, 0.3);
      font-weight: bolder;
      z-index: 0;
    }
    &:after {
      content: '预览区';
      position: absolute;
      bottom: 90px;
      right: 0;
      font-size: 40px;
      height: 50px;
      line-height: 50px;
      padding-right: 15px;
      color: rgba(56, 183, 234, 0.3);
      font-weight: bolder;
      z-index: 0;
    }
    &.textaresBox_input {
      &:before {
        content: 'EDITING';
      }
      &:after {
        content: '编辑区';
      }
    }
    &.textaresBox_preview {
      &:before {
        content: 'PREVIEW';
      }
      &:after {
        content: '预览区';
      }
    }
    textarea {
      width: 100%;
      height: 100%;
      resize: none;
      overflow: hidden;
      font-size: 16px;
      line-height: 1.6;
    }
    .textarea {
      font-size: 16px;
      line-height: 1.6;
      z-index: 1;
      display: block;
      width: 100%;
      padding: 6px 12px;
      color: #555;
      background-color: transparent;
      background-image: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
      transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
      min-height: 650px;
      position: relative;
      overflow: hidden;
      &:focus {
        border-color: #337ab7;
        //border-width: 1px;
        outline: none;
        box-shadow: 0 0 10px #337ab7;
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import lodash from 'lodash';
  import marked from 'marked';
  import hljs from 'highlight.js';
  import moment from 'moment';
  import Multiselect from 'vue-multiselect';
  import Clipboard from 'clipboard';
  import copyright from 'components/copyright';

  import {GetTagListByCache} from 'api/tag';
  import {EditArticle, GetArticleById} from 'api/article';
  // import {ImageUpload} from 'api/upload';
  import {autoTextarea} from 'utils/autoTextarea';
  import {mapState, mapActions} from 'vuex';
  import {Message} from 'element-ui';

  import 'assets/css/codeHighLight.css';
  import 'assets/css/markdown.scss';
  import 'bootstrap-datetimepicker/src/sass/bootstrap-datetimepicker-build.scss';
  import 'bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js';
  import 'bootstrap/scss/bootstrap/_button-groups.scss';
  import 'bootstrap/scss/bootstrap/_input-groups.scss';
  import 'bootstrap/scss/bootstrap/_dropdowns.scss';
  import 'bootstrap/js/dropdown.js';

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
  export default {
    data() {
      return {
        article: {},
        publishTime: '',
        selected: [],
        options: [],
        contentRaw: '',
        contentMarked: '',
        uploadImgUrl: '',
        isPublishing: false,
        isDrafting: false,
        isImgLoading: false
      };
    },
    computed: {
      ...mapState({
        isShowBigAdmin: 'isShowBigAdmin'
      })
    },
    methods: {
      // 标签多选更新
      updateValueAction(value) {
        this.selected = value;
      },
      // 获取文章
      getArticle(id) {
        const _this = this;
        let $textArea = document.getElementById('textarea');
        GetArticleById(id).then((result) => {
          let data = result.data;
          _this.article = data;
          _this.contentRaw = data.content;
          _this.contentMarked = marked(_this.contentRaw);
          _this.publishTime = moment(new Date(_this.article.publishTime)).format('YYYY/MM/DD HH:mm:ss');
          _this.selected = data.tags;
          setTimeout(function () {
            autoTextarea($textArea, 10);
          }, 0);
        }, (error) => {
          console.error(error);
        });
      },
      // 获取书写的文章信息
      collectEditedArtInfo() {
        const _this = this;
        let tagsArr = [];
        for (let tag of _this.selected) {
          let artTag = {name: tag.name, objectId: tag.objectId};
          tagsArr.push(artTag);
        }
        let params = {
          'objectId': _this.article.objectId,
          'title': _this.article.title,
          'publishTime': new Date(_this.publishTime),
          'state': _this.article.state,
          'content': _this.contentRaw,
          'tags': tagsArr
        };
        return params;
      },
      // 点击发布按钮
      publishBtn() {
        const _this = this;
        _this.article.state = true;
        _this.isPublishing = true;
        _this._save().then(function () {
          setTimeout(function () {
            history.back();
            _this.setShowBigAdminStatus(false);
            _this.isPublishing = false;
          }, 500);
        });
      },
      // 点击草稿
      draftBtn() {
        const _this = this;
        _this.article.state = false;
        _this.isDrafting = true;
        _this._save().then(function (data) {
          setTimeout(function () {
            _this.isDrafting = false;
            Message({
              message: '保存成功！',
              showClose: true,
              type: 'success'
            });
          }, 500);
        });
      },
      // 预览
      previewBtn() {
        const _this = this;
        _this.setShowBigAdminStatus(!_this.isShowBigAdmin);
      },
      _save() {
        const _this = this;
        let params = _this.collectEditedArtInfo();
        return EditArticle(params).then(function (result) {
          let data = result.data;
          // 针对新建的情况
          if (!params.objectId) {
            let _id = data.objectId;
            _this.article.objectId = _id;
            // 跳转
            _this.$router.replace({
              name: 'admin-article',
              params: {articleId: _id}
            });
          }
        });
      },
      _autoSave() {
        const _this = this;
        if (!_this.article.title) {
          return false;
        }
        if (!_this.contentRaw) {
          return false;
        }
        if (_this.article.state) {
          _this.isPublishing = true;
        } else {
          _this.isDrafting = true;
        }
        _this._save().then(function () {
          setTimeout(function () {
            if (_this.article.state) {
              _this.isPublishing = false;
            } else {
              _this.isDrafting = false;
            }
            Message({
              message: '保存成功！',
              showClose: true,
              type: 'success'
            });
          }, 500);
        });
      },
      ...mapActions({
        setShowBigAdminStatus: 'setShowBigAdminStatus'
      }),
      watchContentRawFn: lodash.debounce(function () {
        const _this = this;
        let $textArea = document.getElementById('textarea');
        if ($textArea) {
          autoTextarea($textArea, 10);
          _this.contentMarked = marked(_this.contentRaw);
          _this._autoSave();
        }
      }, 5000)

    },
    watch: {
      'contentRaw': function () {
        const _this = this;
        _this.watchContentRawFn();
      }
    },
    created() {
      // 获取标签列表
      const _this = this;
      GetTagListByCache().then((result) => {
        _this.options = result.datas;
      });
    },
    mounted() {
      const _this = this;
      /**
       * 初始化时间选择器
       * */
      $('#datetimepicker').datetimepicker({
        format: 'YYYY/MM/DD HH:mm:ss'
      });

      /**
       * 获取文章信息,如果有id的话
       * */
      let articleId = this.$route.params.articleId.toString();
      if (articleId !== '0') {
        _this.getArticle(articleId);
      } else {
        _this.article = {
          'objectId': null,
          'title': '',
          'publishTime': new Date(),
          'tags': [],
          'state': false,
          'content': ''
        };
        // 时间
        _this.publishTime = moment(new Date()).format('YYYY/MM/DD HH:mm:ss');
      }

      /**
       * 点击复制到剪贴板按钮的操作
       * */
      let clipboard = new Clipboard('#copyImgUrl2Clipboard');
      clipboard.on('success', function (e) {
        alert('复制成功！');
      });

      /**
       * 1. 选择图片,获得filer信息
       * */
      /* $('#imgUpload').change(function (e) {
        // 文件句柄
        var file = e.target.files[0];
        // 只处理图片
        if (!file.type.match('image.*')) {
          return null;
        }
        _this.isImgLoading = true;
        ImageUpload(file).then(function (imageName) {
          _this.uploadImgUrl = addImgPrefix(imageName);
        }, function () {
          alert('upload error');
        }).then(function () {
          _this.isImgLoading = false;
        });
      }); */
    },
    components: {
      copyright,
      Multiselect
    },
    destroyed() {
      this.setShowBigAdminStatus(false);
    }
  };
</script>
