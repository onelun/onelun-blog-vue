<template>
  <div id="loading">
    <section class="loadingCenter">
      <div class="loading__balls ball-grid-pulse-loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p class="loading__notice">
        Loading
      </p>
    </section>
  </div>
</template>
<style scoped lang="scss">
  #loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 40px;
    z-index: 9999;
    left: 0;
    top: 0;
    transition: all ease 500ms;
    opacity: 1;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .pageLoaded {
    opacity: 0 !important;
    z-index: 0 !important;
  }
  #loading .loadingCenter {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

  }

  #loading .loadingCenter .loading__balls {
    padding: 20px;
    border-radius: 100%;
    box-sizing: border-box;
    width: 100px !important;
    height: 100px !important;
  }

  #loading .loadingCenter .loading__notice {
    font-size: 20px;
    padding: 0;
    margin: 0;
    line-height: 120%;
    box-sizing: border-box;
    font-weight: 800;
  }

  /*动画*/
  @-webkit-keyframes ball-grid-pulse-loading {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    50% {
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      opacity: 0.7;
    }

    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes ball-grid-pulse-loading {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    50% {
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      opacity: 0.7;
    }

    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }

  .ball-grid-pulse-loading {
    width: 57px;
  }

  .ball-grid-pulse-loading > div:nth-child(1) {
    -webkit-animation-delay: -0.06s;
    animation-delay: -0.06s;
    -webkit-animation-duration: 0.72s;
    animation-duration: 0.72s;
  }

  .ball-grid-pulse-loading > div:nth-child(2) {
    -webkit-animation-delay: 0.25s;
    animation-delay: 0.25s;
    -webkit-animation-duration: 1.02s;
    animation-duration: 1.02s;
  }

  .ball-grid-pulse-loading > div:nth-child(3) {
    -webkit-animation-delay: -0.17s;
    animation-delay: -0.17s;
    -webkit-animation-duration: 1.28s;
    animation-duration: 1.28s;
  }

  .ball-grid-pulse-loading > div:nth-child(4) {
    -webkit-animation-delay: 0.48s;
    animation-delay: 0.48s;
    -webkit-animation-duration: 1.42s;
    animation-duration: 1.42s;
  }

  .ball-grid-pulse-loading > div:nth-child(5) {
    -webkit-animation-delay: 0.31s;
    animation-delay: 0.31s;
    -webkit-animation-duration: 1.45s;
    animation-duration: 1.45s;
  }

  .ball-grid-pulse-loading > div:nth-child(6) {
    -webkit-animation-delay: 0.03s;
    animation-delay: 0.03s;
    -webkit-animation-duration: 1.18s;
    animation-duration: 1.18s;
  }

  .ball-grid-pulse-loading > div:nth-child(7) {
    -webkit-animation-delay: 0.46s;
    animation-delay: 0.46s;
    -webkit-animation-duration: 0.87s;
    animation-duration: 0.87s;
  }

  .ball-grid-pulse-loading > div:nth-child(8) {
    -webkit-animation-delay: 0.78s;
    animation-delay: 0.78s;
    -webkit-animation-duration: 1.45s;
    animation-duration: 1.45s;
  }

  .ball-grid-pulse-loading > div:nth-child(9) {
    -webkit-animation-delay: 0.45s;
    animation-delay: 0.45s;
    -webkit-animation-duration: 1.06s;
    animation-duration: 1.06s;
  }

  .ball-grid-pulse-loading > div {
    background-color: #38b7ea;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
    float: left;
    -webkit-animation-name: ball-grid-pulse-loading;
    animation-name: ball-grid-pulse-loading;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-delay: 0;
    animation-delay: 0;
  }
</style>
<script>
  export default{
    data() {
      return {};
    }
  };
</script>
