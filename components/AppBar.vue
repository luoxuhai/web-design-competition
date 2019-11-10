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
          <el-dropdown v-if="token">
            <el-avatar class="user__avatar" @error="() => true" :size="40" :src="user.avatar">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
            </el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的收藏</el-dropdown-item>
              <el-dropdown-item>我的评论</el-dropdown-item>
              <el-dropdown-item>正在学习</el-dropdown-item>
              <el-dropdown-item>
                <el-button @click="handleLogoutClick" type="danger" size="mini">退出登录</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <h3
            v-if="token"
            :style="{color: isDark ? '#333' : '#f5f5f5'}"
            class="user__name"
          >{{user.nickname}}</h3>
          <el-button v-else @click="handleLoginClick" size="medium" type="primary" round>登录</el-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { MessageBox } from "element-ui";
export default {
  props: {
    isDark: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {};
  },

  methods: {
    ...mapMutations("user", ["logout"]),

    handleLoginClick() {
      QC.Login.showPopup({
        appId: "101816819",
        redirectURI: "http://127.0.0.1:3000/home"
      });
    },

    handleLogoutClick() {
      MessageBox.confirm("确认退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.logout();
      });
    }
  },

  computed: {
    ...mapState("user", ["token", "user"])
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
          font-weight: 500;
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
          @include ellipsis;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
