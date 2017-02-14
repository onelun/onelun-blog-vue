<template>
  <div class="user container-fulid">
    <div class="user-content">
      <h1>one<span class="blue">Lun</span></h1>
      <h4>与世界分享你的知识、经验和见解</h4>
      <div class="user-content-inner">
        <ul class="navigation clearfix">
          <li data-name="login_page">
            <router-link :to="{ name: 'login', query: { userType: 'login' }}" activeClass="active" tag="a">登录
            </router-link>
          </li>
          <li data-name="register_page">
            <router-link :to="{ name: 'register'}" activeClass="active" tag="a">注册</router-link>
          </li>
        </ul>
        <keep-alive>
        <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <section class="index-copyright">
      <copyright></copyright>
    </section>
  </div>
</template>
<style lang="scss">
  @import "../../assets/css/theme.scss";
  .user {
    position: absolute;
    height: 100%;
    width: 100%;
    background: transparent radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
    .user-content {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      height: 100%;
      left: 0;
      top: 0;
      width: 100%;
      .blue {
        color: $base-theme-color;
      }
      .user-content-inner {
        width: 300px;
        text-align: right;
        box-sizing: content-box;
        padding: 30px;

        background: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        h1, h4 {
          color: #fff;
        }
        >ul{
          .active{
            margin-bottom: -2px;
            border-bottom: 3px solid #49c8fb;
            color: #49c8fb;
          }
        }
        li{
          float: right;
          margin: 0px auto 15px;
          line-height: 20px;
          a{
            color: #fff;
            padding: 15px;
            display: inline-block;
            transition: all 0.3s;
            text-decoration: none;
            &:hover{
              color: #49c8fb;
            }
          }
        }
      }
    }
    .index-copyright {
      position: absolute;
      bottom: 1%;
      text-align: center;
      width: 100%;
      left: 0;
    }
  }
</style>
<script type="text/ecmascript-6">
  import copyright from 'components/copyright';
  export default {
    data() {
      return {
      };
    },
    components: {
      copyright
    }
  };
</script>
