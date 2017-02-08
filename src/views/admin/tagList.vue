<template>
  <div>
    <div class="animated fadeIn tags">
      <!-- 标题 -->
      <h3 class="title">
        <i class="fa fa-fw fa-lg fa-tag"></i> 标签管理 / TAGS
      </h3>
      <!-- 新增 -->
      <div class="btnBox text-right">
        <button data-toggle="modal" data-target="#addTag" @click="addTagBtn()" class="btn btn-success"><i
          class="fa fa-plus"></i></button>
      </div>
      <!-- 列表 -->
      <div class="table-scroll-box">
        <div class="table-body">
          <table class="table table-condensed" id="table">
            <thead>
            <tr class="text-center">
              <th>#</th>
              <th @click="order('name')">
                标签名称/Name
                <span v-if="predicate == 'name'">
                        <i v-if="reverse==='asc'" class="fa fa-caret-up"></i>
                        <i v-if="reverse==='desc'" class="fa fa-caret-down"></i>
                    </span>
              </th>
              <th @click="order('catalogueName')">
                分类名称/Cat.
                <span v-if="predicate == 'catalogueName'">
                        <i v-if="reverse==='asc'" class="fa fa-caret-up"></i>
                        <i v-if="reverse==='desc'" class="fa fa-caret-down"></i>
                    </span>
              </th>
              <th @click="order('usedNum')">引用数/Quote
                <span v-if="predicate == 'usedNum'">
                        <i v-if="reverse==='asc'" class="fa fa-caret-up"></i>
                        <i v-if="reverse==='desc'" class="fa fa-caret-down"></i>
                    </span></th>
              <th @click="order('create_time')">创建时间/C.T.
                <span v-if="predicate == 'create_time'">
                        <i v-if="reverse==='asc'" class="fa fa-caret-up"></i>
                        <i v-if="reverse==='desc'" class="fa fa-caret-down"></i>
                    </span>
              </th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(tag,index) in orderedTagList">
              <!--<tr v-for="tag in tagList | orderBy predicate reverse">-->
              <td>{{index+1}}</td>
              <td>{{tag.name}}</td>
              <td>{{tag.catalogueName}}</td>
              <td>{{tag.usedNum}}</td>
              <td>{{tag.createdAt | moment("YYYY/MM/DD")}}</td>
              <td>
                <button data-toggle="modal" data-target="#editTag" @click="editTagBtn(tag)"
                        class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                <button data-toggle="modal" data-target="#delTag" @click="delTagBtn(tag.objectId)"
                        class="btn btn-danger btn-sm"><i class="fa fa-bitbucket"></i></button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!--弹出层-增加-->
    <div class="modal fade" id="addTag" tabindex="-1" role="dialog"
         v-on:keyup.enter="!!newTag.name&&!!newTag.catalogueName&&confirmSaveNewTagBtn()">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h4 class="modal-title"><i class="fa fa-plus-square"></i> 增加标签/ADDTAGS</h4>
          </div>
          <div class="modal-body">
            <form name="addTags">
              <div class="form-group" :class="{true:'has-error',false:''}[!newTag.name]">
                <label class="control-label">标签名/Name</label>
                <input type="text" class="form-control" name="tagname" v-model="newTag.name" placeholder="请输入标签名称"
                       required>
              </div>
              <div class="form-group" :class="{true:'has-error',false:''}[!newTag.catalogueName]">
                <label class="control-label">分类名/Cat.</label>
                <input type="text" class="form-control" name="catname" v-model="newTag.catalogueName"
                       placeholder="请输入分类名称" required>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <span class="submitText">{{submitText}}</span>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button v-bind:disabled="!newTag.name||!newTag.catalogueName" @click="confirmSaveNewTagBtn()"
                    type="button" class="btn btn-success">保存
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--弹出层-修改-->
    <div class="modal fade" id="editTag" tabindex="-1" role="dialog"
         v-on:keyup.enter="!!editTag.name&&!!editTag.catalogueName&&confirmEditTagBtn()">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h4 class="modal-title"><i class="fa fa-pencil"></i> 修改标签/EDITTAGS</h4>
          </div>
          <div class="modal-body">
            <form name="editTags">
              <div class="form-group" :class="{true:'has-error',false:''}[!editTag.name]">
                <label class="control-label">标签名/TagName:</label>
                <input type="text" class="form-control" name="tagname" v-model="editTag.name" required>
              </div>
              <div class="form-group" :class="{true:'has-error',false:''}[!editTag.catalogueName]">
                <label class="control-label">分类名/Cat.Name:</label>
                <input type="text" class="form-control" name="catname" v-model="editTag.catalogueName" required>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <span class="submitText">{{submitText}}</span>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button v-bind:disabled="!editTag.name||!editTag.catalogueName" @click="confirmEditTagBtn()" type="button"
                    class="btn btn-success">修改
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--弹出层-删除-->
    <div class="modal fade" id="delTag" tabindex="-1" role="dialog" v-on:keyup.enter="confirmDelTagBtn()">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h4 class="modal-title"><i class="fa fa-bitbucket"></i> 删除标签/DELTAGS</h4>
          </div>
          <div class="modal-body">
            <h3 class="text-center deleteConfirmText">确认删除此标签?</h3>
          </div>
          <div class="modal-footer">
            <span class="submitText">{{submitText}}</span>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" @click="confirmDelTagBtn()" class="btn btn-danger">删除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  @import "../../assets/css/theme.scss";
  .tags {
    height: 100%;
    .title {
      width: 100%;
      color: #fff;
      margin-bottom: 10px;
      text-align: left;
    }
    table {
      color: #fff;
      th {
        text-align: center;
        color: #00b2e2;
        cursor: pointer;
        position: relative;
        span {
          position: absolute;
          margin-left: 5px;
          top: inherit;
          left: inherit;
        }
      }
      td {
        vertical-align: middle !important;
        font-size: 14px;
        text-align: center;
        border-top-color:transparent;
        border-bottom:1px solid $border-bottom-dark;
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import lodash from 'lodash';
  import { AddTag, GetTagList, EditTag, DeleteTag } from 'api/tag';
  export default{
    data() {
      return {
        reverse: 'desc',
        predicate: 'usedNum',
        tagList: [],
        newTag: {
          name: '',
          catelogue_name: ''
        },
        editTag: {
          objectId: '',
          name: '',
          catalogueName: ''
        },
        submitText: '',
        delTag: {
          objectId: ''
        }
      };
    },
    computed: {
      orderedTagList: function () {
        let hasTagList = !!this.tagList;
        if (hasTagList) {
          return lodash.orderBy(this.tagList, [this.predicate], [this.reverse]);
        } else {
          return [];
        }
      }
    },
    methods: {
      // 获取tag列表
      getList: function () {
        const scope = this;
        GetTagList().then((result) => {
          scope.tagList = result.datas;
        });
      },
      // 排序
      order: function (name) {
        this.predicate = name;
        if (this.reverse === 'asc') {
          this.reverse = 'desc';
        } else {
          this.reverse = 'asc';
        }
      },
      // 新增弹出框
      addTagBtn: function () {
        const scope = this;
        scope.submitText = '';
        // init
        scope.newTag = {
          name: null,
          catalogueName: null
        };
      },
      // 新增提交
      confirmSaveNewTagBtn: function () {
        const scope = this;
        let params = {
          name: scope.newTag.name,
          catalogueName: scope.newTag.catalogueName
        };
        AddTag(params).then(function (result) {
          console.log(result);
          // 刷新列表
          scope.getList();
          // 隐藏弹出框
          $('#addTag').modal('hide');
        }, (error) => {
          scope.submitText = error.message;
          setTimeout(function () {
            scope.submitText = null;
          }, 2000);
        });
      },
      // 修改弹出框
      editTagBtn: function (tagInfo) {
        const scope = this;
        scope.submitText = '';
        scope.editTag = {
          objectId: tagInfo.objectId,
          name: tagInfo.name,
          catalogueName: tagInfo.catalogueName
        };
      },
      // 修改提交
      confirmEditTagBtn: function () {
        const scope = this;
        scope.submitText = '正在提交...';
        console.log(scope.editTag);
        EditTag(scope.editTag).then(() => {
          // 刷新列表
          scope.getList();
          // 操作提示
          $('#editTag').modal('hide');
        }, (error) => {
          scope.submitText = error.message;
          setTimeout(function () {
            scope.submitText = null;
          }, 2000);
        });
      },
      // 删除弹出框
      delTagBtn: function (id) {
        const scope = this;
        scope.submitText = '';
        scope.delTag = {
          objectId: id
        };
      },
      // 删除提交
      confirmDelTagBtn: function () {
        const scope = this;
        scope.submitText = '正在删除...';
        DeleteTag({objectId: scope.delTag.objectId}).then(() => {
          // 刷新列表
          scope.getList();
          // 操作提示
          $('#delTag').modal('hide');
        }, (error) => {
          scope.submitText = error.message;
          setTimeout(function () {
            scope.submitText = null;
          }, 2000);
        });
      }
    },
    mounted: function () {
      // 获取tag列表
      this.getList();
    }
  };
</script>
