<template>
  <div class="intro">
    <section class="intro__wrapper">
      <transition name="bounceInDown">
        <h2 v-show="isShow" class="intro__title">推动中国发展的优秀思想理论集</h2>
      </transition>
      <div v-if="!isShow" :style="{height: isMobile ? '209px' : '140px'}" />
      <hr class="divider" />
      <small class="intro__sub">中国共产党以马克思列宁主义、毛泽东思想、邓小平理论、“三个代表”重要思想和科学发展观作为自己的行动指南</small>
      <transition name="bounceInLeft">
        <el-button
          v-show="isShow"
          class="intro__button"
          :class="[!isStartLearn && 'hvr-ripple-out']"
          @click="handleStartLearnClick"
          :loading="isStartLearn"
        >
          {{isStartLearn ? '请稍等' : '开始学习'}}
          <i class="icon iconarrowright" />
        </el-button>
      </transition>
      <div v-if="!isShow" style="height: 140px" />
      <section class="intro__toplearn">
        <h3 class="intro__toplearn-title">最近学习</h3>
        <transition name="bounceIn">
          <ul v-show="learner.length" class="intro__toplearn-list">
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
        </transition>
      </section>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  props: {
    learner: Array
  },

  data() {
    return {
      isShow: false
    };
  },

  methods: {
    ...mapMutations('app', ['toggleStartLearn']),

    handleStartLearnClick() {
      this.toggleStartLearn();
      setTimeout(() => {
        this.$router.push({
          name: 'courseId',
          params: {
            id: '5dc4237fc36eacd713113a14'
          },
          query: { title: '马克思列宁主义' }
        });
        this.toggleStartLearn();
      }, 800);
    }
  },

  computed: {
    ...mapState('app', ['isStartLearn', 'isMobile'])
  },

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.isShow = true;
      }, 60);
    });
  }
};
</script>

<style lang='scss' scoped>
@import '@/assets/scss/_mixins.scss';

@media screen and (max-width: 800px) {
  .intro__button {
    left: 0 !important;
  }

  .intro__toplearn {
    display: none;
  }

  .intro__title {
    -webkit-text-fill-color: var(--color-primary) !important;
  }
}
@media screen and (max-width: 560px) {
  .intro__title {
    width: auto !important;
  }
}

.hvr-ripple-out:before {
  content: '';
  border: #7200da solid 6px;
  border-radius: 40px;
}
.intro {
  width: 32%;
  min-width: 300px;
  padding-top: 120px;
  padding-left: 10px;
  background-color: var(--color-background);

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
    color: var(--color-sub);
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

    &:hover {
      background-color: #7200da !important;
      color: white !important;
    }

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
      color: var(--color-title-light);
      @include ellipsis;
    }
  }
}
</style>
