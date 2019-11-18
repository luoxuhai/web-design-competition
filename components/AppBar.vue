<template>
  <header class="appbar">
    <nav class="appbar__wrapper">
      <ul class="appbar__wrapper-list">
        <li class="logo">
          <el-tooltip effect="dark" content="大国之窗">
            <router-link :to="{ name: 'home' }">
              <img
                class="logo__image"
                src="../static/img/icons/android-chrome-512x512.png"
                alt="大国之窗logo"
              />
            </router-link>
          </el-tooltip>
          <h1 class="logo__title">大国之窗</h1>
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
                <el-button @click="logout" type="danger" size="mini">退出登录</el-button>
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
import { mapState, mapMutations, mapActions } from 'vuex';
import { MessageBox, Message, Loading } from 'element-ui';
import UserDialog from './UserDialog';
import { login, update } from '@/api/user';

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
    ...mapMutations('user', ['logout', 'login']),

    ...mapActions('user', ['saveLogin']),

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
      let loginInterval = null;

      // pc端关闭登录窗口
      if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent)) {
        window.loadingInstance = Loading.service({
          lock: true,
          text: '登录中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        window.addEventListener('beforeunload', () => {
          window.loginWin.close();
        });

        loginInterval = setInterval(() => {
          if (localStorage.getItem('openid') && localStorage.getItem('access_token')) {
            clearInterval(loginInterval);
            window.loginWin.close();
            this.saveLogin();
          }
        }, 16);
      }

      window.loginWin = QC.Login.showPopup({
        appId: '101816819',
        redirectURI:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:3000/home'
            : 'https://open.furuzix.top/home'
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
        flex-shrink: 0;

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
        margin: 0 10px;
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

@media only screen and (max-width: 797px) {
  .user__name {
    color: '#333' !important;
  }
}
</style>
