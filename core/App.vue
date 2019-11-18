<template>
  <div id="app">
    <keep-alive :include="[...keepAlivePages]">
      <router-view :key="routerViewKey" :data-page-id="$route.fullPath" />
    </keep-alive>
    <app-footer v-show="$route.name" />
    <update-toast />
    <el-backtop style="width: 50px; height: 50px;">
      <i style="font-size: 30px" class="el-icon-caret-top" />
    </el-backtop>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import UpdateToast from '@/components/UpdateToast';
import AppFooter from '@/components/AppFooter';
import { Loading } from 'element-ui';
import { keepAlivePages } from '@/.lavas/router';
import { login, update } from '@/api/user';

const ENABLE_SCROLL_CLASS = 'app-view-scroll-enabled';

export default {
  name: 'app',
  components: {
    UpdateToast,
    AppFooter
  },
  computed: {
    // https://github.com/lavas-project/lavas/issues/119
    routerViewKey() {
      let { name, params } = this.$route;
      let paramKeys = Object.keys(params);
      if (paramKeys.length) {
        return name + paramKeys.reduce((prev, cur) => prev + params[cur], '');
      }
      return null;
    }
  },
  data() {
    return {
      // https://github.com/lavas-project/lavas/issues/112
      keepAlivePages
    };
  },
  methods: {
    ...mapMutations('user', ['login']),

    handleLogin() {
      if (localStorage.getItem('openid') && localStorage.getItem('access_token')) {
        login({
          access_token: localStorage.getItem('access_token'),
          openId: localStorage.getItem('openid')
        }).then(({ data: { user, token } }) => {
          localStorage.clear();
          this.login({
            user,
            token
          });
        });
      }
    }
  },

  mounted() {
    if (QC.Login.check()) {
      QC.Login.getMe(openId => {
        window.localStorage.setItem(
          'access_token',
          location.hash
            .split('=')[1]
            .split('&')
            .shift()
        );
        window.localStorage.setItem('openid', openId);
        // 移动端登录
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent)) {
          this.handleLogin();
        }
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.scroll-bar {
  height: 100vh;
}

.gm-scrollbar.-vertical {
  width: 8px;
  .thumb {
    border-radius: 4px;
    background-color: lighten(#f9320c, 30);
    &:hover {
      background-color: lighten(#f9320c, 10);
    }
  }
}
</style>
