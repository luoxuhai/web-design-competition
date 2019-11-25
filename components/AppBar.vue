<template>
  <header class="appbar">
    <nav class="appbar__wrapper">
      <ul class="appbar__wrapper-list">
        <el-tooltip effect="dark" content="大国之窗">
          <li class="logo">
            <a href="/">
              <img
                class="logo__image"
                src="../static/img/icons/android-chrome-512x512.png"
                alt="大国之窗logo"
              />
              <h1 class="logo__title">大国之窗</h1>
            </a>
          </li>
        </el-tooltip>
        <li class="title">
          <slot />
        </li>
        <li class="night-mode">
          <el-tooltip effect="dark" :content="nightMode ? '日光模式' : '夜间模式'">
            <el-button
              class="night-mode-button"
              :style="{backgroundColor: !nightMode ? '#303133e8' : '', color: nightMode ? '#303133e8' : ''}"
              @click="toggleNightMode(!nightMode)"
              type="warning"
              :icon="nightMode ? 'el-icon-sunny' : 'el-icon-moon'"
              circle
            />
          </el-tooltip>
        </li>
        <li class="user">
          <el-dropdown
            v-if="token"
            @command="handleShowDialogClick"
            :trigger="isMobile ? 'click' : 'hover'"
          >
            <el-avatar class="user__avatar" @error="() => true" :size="40" :src="user.avatar">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a2568361 7711png.png" />
            </el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) of dropdown"
                :key="item"
                :command="index"
              >{{ item }}</el-dropdown-item>
              <el-dropdown-item :command="3">
                <el-button type="danger" size="mini">退出登录</el-button>
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

    ...mapMutations('app', ['toggleNightMode']),

    ...mapActions('user', ['saveLogin']),

    handleBack() {
      this.$router.replace({ name: 'home' });
      location.reload();
      return;
      if (this.$route.name === 'home') location.reload();
      else this.$router.back();
    },

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
          break;
        case 3:
          this.logout();
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
        }, 10);
      }

      window.loginWin = QC.Login.showPopup({
        appId: '101816819',
        redirectURI: location.origin + '/home'
      });
    }
  },

  computed: {
    ...mapState('user', ['token', 'user']),

    ...mapState('app', ['isMobile', 'nightMode'])
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

      .night-mode {
        margin-right: 20px;

        .night-mode-button {
          padding: 6px;
          background-color: #f5f5f5;
          font-size: 20px;
          border: none;
        }
      }

      .logo {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        a {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

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
        flex: 1;
        margin: 0 10px;
        @include ellipsis;
        font-weight: 500;
        font-size: 22px;
        text-align: center;
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

  .night-mode {
    margin-right: 5px !important;
  }
}

@media only screen and (max-width: 797px) {
  .user__name {
    color: var(--color-title) !important;
  }
}
</style>
