<template>
  <div class="modal fade" id="clearCache" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title"><i class="fa fa-sign-out"></i> 清除提示</h4>
        </div>
        <div class="modal-body">
          <h3 class="text-center deleteConfirmText">是否清除系统缓存?</h3>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          <button type="button" data-dismiss="modal" @click="confirmClearCache()" class="btn btn-danger">清除</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

</style>
<script type="text/javascript">
  import Vue from 'vue';
  export default{
    data() {
      return {};
    },
    methods: {
      confirmClearCache: function () {
        // 清除session缓存，登录信息不清除
        Vue.$sessionStorage.$reset({'authorization': Vue.$sessionStorage.authorization});
      }
    }
  };

</script>
