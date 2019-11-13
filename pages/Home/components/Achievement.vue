<template>
  <div class="achievement">
    <ul class="achievement__list">
      <li class="achievement__item achievement__list-header">
        <h2 class="header__title">厉害了，我的国！</h2>
        <hr class="divider" />
        <small class="header__sub">党的十八大以来中国的发展和成就，以及十九大报告中习近平总书记提出的中国特色社会主义进入新时代这一重大论述。</small>
      </li>
      <li class="achievement__item" v-for="item of articles" :key="item._id">
        <router-link
          class="achievement__item-content hvr-bob hvr-underline-from-center"
          :to="{path: `/article/${item._id}`, query: {title: item.title}}"
        >
          <div class="achievement__item-cover">
            <img :src="item.cover" :alt="item.title" />
          </div>
          <div class="achievement__item-body">
            <h2 class="achievement__item-title">{{item.title}}</h2>
            <footer class="achievement__item-footer">
              <span>
                <i class="icon iconheart" />
                {{item.like_count}}
              </span>
              <span>
                <i class="icon iconeye" />
                {{item.views_count}}
              </span>
            </footer>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    articles: Array
  },

  updated() {
    this.$nextTick(() => this.$scrollReveal.reveal('.achievement__item'));
  },

  destroyed() {
    this.$scrollReveal.destroy();
  }
};
</script>

<style lang='scss' scoped>
@import '@/assets/scss/_mixins.scss';

@media screen and (max-width: 600px) {
  .header__title {
    font-size: 40px !important;
  }

  .achievement__item {
    padding: 5px !important;

    &:first-child {
      min-height: auto !important;
    }

    &-body {
      padding: 5px !important;
    }
  }
}

@media screen and (max-width: 800px) {
  .achievement {
    margin-top: 150px !important;
  }

  .achievement__item {
    width: 50% !important;
    margin-bottom: 20px !important;

    &:first-child {
      width: 100% !important;
    }

    &-title {
      font-size: 14px !important;
    }
  }
}

.achievement {
  display: flex;
  justify-content: center;
  margin-top: 350px;

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    max-width: 1200px;
    padding: 0 10px;

    &-header {
      display: flex;
      flex-direction: column;
      .header__title {
        font-size: 46px;
        line-height: 56px;
        font-weight: 500;
        color: var(--color-primary);
      }

      .divider {
        width: 220px;
        height: 1px;
        margin: 40px 0;
        border: none;
        background-color: #707070;
      }

      .header__sub {
        display: inline-block;
        font-size: 15px;
        line-height: 20px;
        color: #241c1c;
      }
    }
  }

  &__item {
    width: calc(100% / 3);
    max-height: 340px;
    height: auto;
    margin-bottom: 40px;
    padding: 20px;
    box-sizing: border-box;

    &:first-child {
      background: #fff;
      min-height: 300px;
    }

    &-cover {
      height: auto;
      background-color: #eee;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
        transition: all 0.6s;
      }
    }

    &-title {
      @include ellipsis(2);
      min-height: 30px;
      margin-bottom: 15px;
      color: rgba(0, 0, 0, 0.65);
      font-weight: bold;
      font-size: 20px;
      line-height: 1.3;
      transition: color 0.4s;
    }

    &-body {
      margin-top: 10px;
      padding: 10px;
      padding-bottom: 15px;
    }

    &-footer {
      display: flex;
      justify-content: flex-end;
      color: #b9b9b9;

      .icon {
        font-size: 18px;
      }

      span:first-child {
        margin-right: 10px;
      }
    }

    &-content {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      min-height: inherit;
      transition: all 0.2s;
      border-radius: 4px;
      border: transparent solid 1px;
      background-color: #fff;
      overflow: hidden;
      color: inherit;
      text-decoration: none;

      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        border-color: rgba(0, 0, 0, 0.09);
        img {
          transform: scale(1.1);
        }

        .achievement__item-title {
          color: #241c1c;
        }
      }
    }
  }
}
</style>
