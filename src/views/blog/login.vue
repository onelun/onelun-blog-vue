<template>
    <div class="login container-fulid animated fadeIn">
      <div class="login-content">
        <div class="login-content-inner clearfix">
          <h1>one<span class="blue">Lun</span></h1>
          <h4><span class="blue">后台</span>管理</h4>
          <div class="divider"></div>
          <div class="form-horizontal" v-on:keydown.enter="loginBtn()">
            <div class="form-group">
              <div class="col-sm-12">
                <input autofocus v-on:keydown="errText=''" class="form-control" id="username"
                       type="text" name="username" v-model="username" placeholder="用户名">
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
              <button @click="loginBtn()" class="btn btn-x-songtao">登陆</button>
            </div>
          </div>
        </div>
      </div>
      <section class="index-copyright">
        <copyright></copyright>
      </section>
      <div class="background blur">
        <img src="../../assets/images/myinfo.jpg" width="100%" height="100%">
      </div>
    </div>
</template>
<style lang="scss">
  @import "../../assets/css/theme.scss";
  .login {
    position: absolute;
    height: 100%;
    width: 100%;
    .login-content {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      height: 100%;
      background: transparent radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
      left: 0;
      top: 0;
      width: 100%;
      .blue {
        color: $base-theme-color;
      }
      .login-content-inner {
        width: 300px;
        text-align: right;
        box-sizing: content-box;
        padding: 30px;

        background: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        h1, h4 {
          color: #fff;
        }
        .divider {
          width: 30px;
          height: 3px;
          background-color: #49c8fb;
          float: right;
          margin: 0px auto 15px;
        }
        .btnGroup {
          .errText {
            color: $base-red-color;
            margin-right: 10px;

          }
          //登录按钮
          .btn-x-songtao {
            width: 100px;
            background-color: $base-theme-color;
            transition: all ease 300ms;
            color: #fff;
            &:hover {
              color: #fff;
              background-color: #49c8fb;
            }
          }
        }
      }
      .notice {
        color: $base-theme-color;
        margin-bottom: 100px;
        margin-top: 10px;
      }
    }
    .index-copyright {
      position: absolute;
      bottom: 1%;
      text-align: center;
      width: 100%;
      left: 0;
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  }
</style>
<script type="text/ecmascript-6">
    import copyright from 'components/copyright';
    import {mapState, mapActions} from 'vuex';
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
          setLoginState: 'setLoginState',
          setCommentInfoStatus: 'setCommentInfoStatus'
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
          // TODO 登陆逻辑
        }
      },
      components: {
          copyright
      }
    };
</script>
