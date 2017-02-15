<template>
  <div class="g-btmbar">
    <div class="m-playbar m-playbar-lock">
      <div class="updn">
        <div class="left f-fl">
          <a href="javascript:;" class="btn" hidefocus="true" data-action="lock"></a>
        </div>
        <div class="right f-fl"></div>
      </div>
      <div class="bg"></div>
      <div class="hand" title="展开播放条"></div>
      <div class="wrap" id="g_player">aaa</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .g-btmbar {
    position: fixed;
    zoom: 1;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0;
    width: 100%;
    z-index: 1002;
  }
</style>
<script>
  export default{
    data() {
      return {};
    }
  };
</script>
