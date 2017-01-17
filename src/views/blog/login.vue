<template>
  <div class="login-content">
    <div class="form-horizontal" v-on:keydown.enter="loginBtn()">
      <div class="form-group">
        <div class="col-sm-12">
          <input autofocus v-on:keydown="errText=''" class="form-control" id="username"
                 type="text" name="username" v-model="username" placeholder="手机或邮箱">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-12">
          <input v-on:keydown="errText=''" class="form-control" id="password"
                 type="password" name="password" v-model="password" placeholder="密码">
        </div>
      </div>
      <div class="btnGroup">
        <span class="errText">{{errText}}</span>
        <button @click="loginBtn()" class="btn btn-x-songtao">登录</button>
      </div>
    </div>
    <div class="login-token">
      <div class="login-sns">
        <ul class="sns">
          <li><a title="GitHub" target="_blank" href="https://github.com/onelun">
              <i class="fa fa-github"></i>
            </a>
          </li>
          <li><a title="QQ" target="_blank" href="#"><i class="fa fa-qq"></i></a></li>
          <li><a title="微信" target="_blank" href="#"><i class="fa fa-weixin"></i></a></li>
          <li><a title="新浪微博" target="_blank" href="#"><i class="fa fa-weibo"></i></a></li>
          <li><a title="腾讯微博" target="_blank" href="#"><i class="fa fa-tencent-weibo"></i></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import "../../assets/css/theme.scss";
  .login-content {
    .btnGroup {
      .errText {
        color: $base-red-color;
        margin-right: 10px;

      }
      .btn-x-songtao {
        width: 100px;
        background-color: $base-theme-color;
        color: #fff;
        &:hover {
          color: #fff;
          background-color: #49c8fb;
        }
      }
    }
    .login-token {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .login-sns {
        width: 265px;
        margin-top:10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
            a {
              color: white;
              &:hover {
                 color: #49c8fb;
              }
            }

          }
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
    import Vue from 'vue';
    import {mapState, mapActions} from 'vuex';
    import { login } from 'api/user';
    import { Toast } from 'mint-ui';
    export default {
      data() {
        return {
          username: '',
          password: '',
          errText: ''
        };
      },
      computed: {
        ...mapState({
          isLogin: 'isLogin'
        })
      },
      methods: {
        ...mapActions({
          setLoginState: 'setLoginState'
        }),
        loginBtn: function () {
          const _this = this;
          if (!_this.username) {
            _this.errText = '请输入用户名！';
            return;
          }
          if (!_this.password) {
            _this.errText = '请输入密码';
            return;
          }
          let params = {'username': _this.username, 'password': _this.password};
          login(params).then((result) => {
            // 设置登录状态信息
            _this.$localStorage.$set('authorization', {
              token: result.data.objectId,
              time: new Date().getTime()
            });
            // 设置请求的token
            Vue.http.headers.common['authorization'] = 'token ' + result.data.objectId;
            _this.setLoginState(true); // 设置全局登录状态
            _this.$router.replace({ // 跳转
              name: 'index'
            });
          }, (error) => {
            Toast({
              message: error.message,
              position: 'bottom'
            });
          });
        }
      }
    };
</script>
