<template>
  <div>
    <myinfo></myinfo>
  </div>
</template>
<style>
</style>
<script>
  import myInfo from 'views/blog/myInfo';
  export default{
    data() {
      return {
        msg: 'hello vue'
      };
    },
    components: {
      'myinfo': myInfo
    }
  };
</script>
