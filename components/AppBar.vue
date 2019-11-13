<template>
  <header class="appbar">
    <nav class="appbar__wrapper">
      <ul class="appbar__wrapper-list">
        <li class="logo">
          <router-link :to="{ name: 'home' }">
            <img
              class="logo__image"
              src="https://www.webpackjs.com/6bc5d8cf78d442a984e70195db059b69.svg"
              alt
            />
          </router-link>
          <h1 class="logo__title">网页设计大赛</h1>
        </li>
        <li class="title">
          <slot />
        </li>
        <li class="user">
          <el-dropdown v-if="token" @command="handleShowDialogClick">
            <el-avatar class="user__avatar" @error="() => true" :size="40" :src="user.avatar">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a2568361 7711png.png" />
            </el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) of dropdown"
                :key="item"
                :command="index"
              >{{ item }}</el-dropdown-item>
              <el-dropdown-item>
                <el-button @click="handleLogoutClick" type="danger" size="mini">退出登录</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <h3
            v-if="token"
            :style="{ color: isDark ? '#333' : '#f5f5f5' }"
            class="user__name"
          >{{ user.nickname }}</h3>
          <el-tooltip v-else effect="dark" content="QQ登录" placement="left-start">
            <el-button
              :style="{ backgroundColor: isDark ? '' : '#7200da' }"
              class="login-button"
              @click="handleLoginClick"
              size="medium"
              type="primary"
              round
            >登 录</el-button>
          </el-tooltip>
        </li>
      </ul>
    </nav>
    <user-dialog ref="userDialog" />
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { MessageBox, Message, Loading } from 'element-ui';
import UserDialog from './UserDialog';

export default {
  components: {
    UserDialog
  },

  props: {
    isDark: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dropdown: ['我的收藏', '我的评论', '正在学习']
    };
  },

  methods: {
    ...mapMutations('user', ['logout']),

    handleShowDialogClick(e) {
      switch (e) {
        case 0:
          this.$refs.userDialog.handleShowDialog('star');
          break;
        case 1:
          Message.info({ message: '开发中' });
          break;
        case 2:
          this.$refs.userDialog.handleShowDialog('course');
      }
    },

    handleLoginClick() {
      localStorage.setItem('isLogin', '1');
      const loadingInstance = Loading.service({
        lock: true,
        text: '登录中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      window.addEventListener('beforeunload', () => {
        loadingInstance.close();
        localStorage.setItem('isLogin', '0');
      });

      setInterval(() => {
        if (localStorage.getItem('isLogin') === '0') {
          location.reload();
        }
      }, 100);
      QC.Login.showPopup({
        appId: '101816819',
        redirectURI: 'http://127.0.0.1:3000/home'
      });
    },

    handleLogoutClick() {
      MessageBox.confirm('确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout();
      });
    }
  },

  computed: {
    ...mapState('user', ['token', 'user'])
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_mixins.scss';

.appbar {
  height: 60px;

  &__wrapper {
    min-width: 300px;
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
        font-size: 22px;
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

        .login-button {
          border: none;
        }
      }
    }
  }
}

@media only screen and (max-width: 560px) {
  .user__name {
    display: none !important;
  }
}
</style>
