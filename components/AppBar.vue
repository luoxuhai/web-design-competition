<template>
  <header class="appbar">
    <nav class="appbar__wrapper">
      <ul class="appbar__wrapper-list">
        <li class="logo">
          <a href>
            <img
              class="logo__image"
              src="https://www.webpackjs.com/6bc5d8cf78d442a984e70195db059b69.svg"
              alt
            />
          </a>
          <h1 class="logo__title">芙蓉失新颜</h1>
        </li>
        <li class="title">
          <slot />
        </li>
        <li class="user">
          <el-dropdown>
            <avatar class="user__avatar" username="登录" :size="40" initials />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的收藏</el-dropdown-item>
              <el-dropdown-item>我的评论</el-dropdown-item>
              <el-dropdown-item>正在学习</el-dropdown-item>
              <el-dropdown-item>
                <el-button type="danger" size="mini">退出登录</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <h3 class="user__name">莲花落故妆</h3>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/scss/_mixins.scss";

.appbar {
  height: 60px;

  &__wrapper {
    min-width: 360px;
    max-width: 1400px;
    height: inherit;
    margin: 0 auto;
    padding: 0 10px;

    &-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: inherit;

      .logo {
        display: flex;
        align-items: center;

        &__image {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          @extend .user__avatar;
        }

        &__title {
          color: var(--color-primary);
          font-weight: bold;
          font-size: 16px;
        }
      }

      .title {
        max-width: 640px;
        @include ellipsis;
        font-weight: 500;
        font-size: 24px;
        color: #292525;
      }

      .user {
        @extend .logo;

        &__avatar {
          margin-right: 0.5em;
          cursor: pointer;
        }

        &__name {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
