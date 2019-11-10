<template>
  <div class="intro">
    <section class="intro__wrapper">
      <h2 class="intro__title">推动中国发展的优秀思想理论集</h2>
      <hr class="divider" />
      <small class="intro__sub">结合今年70周年国庆盛况，思考有哪些伟大的思想理论带领人民造就了当今的盛世中国），推动从严治团</small>
      <el-button class="intro__button hvr-ripple-out">
        开始学习
        <i class="icon iconarrowright" />
      </el-button>
      <section class="intro__toplearn">
        <h3 class="intro__toplearn-title">最近学习</h3>
        <ul class="intro__toplearn-list">
          <li class="intro__toplearn-item" v-for="item of learner" :key="item._id">
            <el-avatar
              class="intro__toplearn-avatar"
              :src="item.avatar"
              @error="() => true"
              :size="30"
            >
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
            </el-avatar>
            <p class="intro__toplearn-username">{{item.nickname}}</p>
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    learner: Array
  },

  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/scss/_mixins.scss";

.hvr-ripple-out:before {
  content: "";
  border: #7200da solid 6px;
  border-radius: 40px;
}
.intro {
  width: 32%;
  padding-top: 120px;

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
    font-size: 15px;
    line-height: 20px;
    color: #241c1c;
  }

  &__button {
    position: relative;
    left: 100px;
    width: 320px;
    height: 60px;
    margin: 40px 0;
    font-size: 20px;
    border-radius: 30px;
    border: none;
    background-color: #7200da;
    letter-spacing: 0.2em;
    color: white;
    box-shadow: 0 2px 6px 6px rgba(0, 0, 0, 0.12);

    .iconarrowright {
      margin-left: 0.5em;
      font-size: inherit;
    }
  }

  &__toplearn {
    max-width: 280px;
    &-title {
      font-size: 20px;
      font-weight: bold;
    }

    &-list {
      padding-top: 20px;
    }

    &-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    &-avatar {
      margin-right: 15px;
    }

    &-username {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      @include ellipsis;
    }
  }
}
</style>
