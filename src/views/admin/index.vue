<template>
  <div class="adminBox">
    <div class="adminBox-content" :class="{'preview':isShowBigAdmin}" id="adminBox-content">
      <div class="adminBox-content-header">
        <h1 class="text-right textItem">
          one<span class="blue">Lun</span>
          <small class="blue">后台管理</small>
        </h1>
      </div>
      <!--修改信息的内部-->
      <div class="adminBox-content-innerBox">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <section>
      <copyright></copyright>
    </section>
  </div>
</template>
<style scoped lang="scss">
  @import "../../assets/css/theme.scss";
  .adminBox {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    height: 100%;
    .adminBox-content {
      width: 780px;
      padding: 0 30px;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.5);
      position: relative;
      border-radius: 3px;
      border-bottom: 2px solid #00b2e2;
      margin-top: 50px;
      margin-left: auto;
      margin-bottom: 15px;
      margin-right: auto;
      user-select: none;
      min-height:90vh;
      .adminBox-content-header h1 {
        display: inline-block;
        float: right;
        padding: 20px 30px 10px 0;
        margin: 0;
        border-top: 2px solid #00b2e2;
        position: absolute;
        top: 0;
        right: 0;
        border-top-right-radius: 3px;
      }
      .adminBox-content-innerBox {
        width: 100%;
        padding-top: 50px;
        height: 100%;
      }
    }
  }
  .blue {
    color: $base-theme-color;
  }
  .textItem {
    color: #fff;
  }
  .adminBox-content {
    &.preview {
       width: 1530px;
    }
  }

  @include media("<=tablet") {
    .adminBox {
      padding-top: 10px;
      .adminBox-content {
        max-width: 780px;
        min-width: inherit;
        width: auto;
        margin-left: 15px;
        margin-right: 15px;
      }
    }
  }
</style>
<script type="text/javascript">
  import copyright from 'components/copyright.vue';
  import {mapState} from 'vuex';
  export default{
    data() {
      return {};
    },
    method: {

    },
    computed: {
      ...mapState({
        isShowBigAdmin: 'isShowBigAdmin'
      })
    },
    components: {
      copyright
    }
  };
</script>
