<template>
  <div class="login-content">
    <div class="form-horizontal" v-on:keydown.enter="loginBtn()">
      <div class="form-group">
        <div class="col-sm-12">
          <input autofocus v-on:keydown="errText=''" class="form-control" id="username"
                 type="text" name="username" v-model="username" placeholder="姓名">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-12">
          <input autofocus v-on:keydown="errText=''" class="form-control" id="phone"
                 type="text" name="phone" v-model="phone" placeholder="手机号（仅支持中国大陆）">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-12">
          <input v-on:keydown="errText=''" class="form-control" id="password"
                 type="password" name="password" v-model="password" placeholder="密码（不少于6位）">
        </div>
      </div>
      <div class="btnGroup">
        <span class="errText">{{errText}}</span>
        <button @click="registerBtn()" class="btn btn-register">注册</button>
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
      .btn-register {
        width: 100px;
        background-color: $base-theme-color;
        color: #fff;
        &:hover {
          color: #fff;
          background-color: #49c8fb;
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
    import {mapState, mapActions} from 'vuex';
    import {register} from 'api/user';
    export default {
      data() {
        return {
          username: '',
          password: '',
          phone: '',
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
          setLoginState: 'setLoginState',
          setCommentInfoStatus: 'setCommentInfoStatus'
        }),
        registerBtn: function () {
          const _this = this;
          if (!_this.username) {
            _this.errText = '请输入用户名！';
            return;
          }
          if (!_this.password) {
            _this.errText = '请输入密码';
            return;
          }
          if (!_this.phone) {
            _this.phone = '请输入手机号';
            return;
          }
          let params = {'username': _this.username, 'password': _this.password, 'phone': _this.phone};
          register(params).then(function (result) {
            console.log(result);
          }, function (error) {
            console.log(error);
          });
        }
      }
    };
</script>
