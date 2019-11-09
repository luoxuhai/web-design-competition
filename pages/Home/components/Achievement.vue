<template>
  <div class="achievement">
    <ul class="achievement__list">
      <li class="achievement__list-item achievement__list-header">
        <h2 class="header__title">厉害了，我的国！</h2>
        <hr class="divider" />
        <small class="header__sub">党的十八大以来中国的发展和成就，以及十九大报告中习近平总书记提出的中国特色社会主义进入新时代这一重大论述。</small>
      </li>
      <li class="achievement__list-item hvr-bob" v-for="item of articles" :key="item._id">
        <router-link class="achievement__list-content" :to="{path: `/article/${item._id}`}">
          <h2 class="achievement__item-title">{{item.title}}</h2>
          <div>
            <small class="achievement__item-sub">{{item.desc}}</small>
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
  }
};
</script>

<style lang='scss' scoped>
.achievement {
  display: flex;
  justify-content: center;
  margin-top: 350px;

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1200px;
    padding: 0 10px;

    &-header {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .header__title {
        font-size: 46px;
        line-height: 56px;
        font-weight: 500;
        color: var(--color-primary);
      }

      .divider {
        width: 260px;
        height: 1px;
        margin: 20px 0;
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

    &-item {
      width: 360px;
      height: 230px;
      margin-bottom: 40px;
      background: rgba(103, 213, 181, 1);
      transition: all 0.2s;

      &:not(:first-child):hover {
        box-shadow: 0 4px 12px 0 rgba(103, 213, 181, 1);
        // transform: scale(1.1)
      }

      &:first-child {
        background: #fff;
      }
    }

    &-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: inherit;
      height: inherit;
      padding: 18px;
      box-sizing: border-box;
    }

    &::after {
      content: "";
      width: 360px;
    }
  }
}
</style>
