<template>
  <div class="intro">
    <section class="intro__wrapper">
      <h2 class="intro__title">推动中国发展的优秀思想理论集</h2>
      <hr class="divider" />
      <small
        class="intro__sub"
      >结合今年70周年国庆盛况，思考有哪些伟大的思想理论带领人民造就了当今的盛世中国），推动从严治团，团学思想引领教育工作（推动落实“青年大学习”主题</small>
      <el-button class="intro__button hvr-ripple-out">开始学习</el-button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
.intro {
  width: 32%;
  padding-top: 140px;

  &__wrapper {
    width: 300px;
    margin-left: auto;
  }
  &__title {
    position: relative;
    width: 534px;
    font-size: 60px;
    line-height: 70px;
    font-weight: 500;
    background: linear-gradient(
      to right,
      var(--color-primary) 0,
      var(--color-primary) 300px,
      white 301px,
      white 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .divider {
    position: relative;
    width: 110px;
    height: 1px;
    margin: 40px 0;
    border: none;
    background-color: #707070;
  }

  &__sub {
    display: inline-block;
    position: relative;
    width: 280px;
    height: 83px;
    margin-bottom: 60px;
    font-size: 15px;
    line-height: 20px;
    color: #241c1c;
  }

  &__button {
    position: relative;
    top: 20px;
    left: 120px;
    width: 320px;
    height: 60px;
    font-size: 20px;
    border-radius: 30px;
    border: none;
    background-color: #7200da;
    letter-spacing: .1em;
    color: white;
  }
}
</style>
