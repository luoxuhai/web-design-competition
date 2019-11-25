<template>
  <div id="app">
    <keep-alive :include="[...keepAlivePages]">
      <router-view :key="routerViewKey" :data-page-id="$route.fullPath" />
    </keep-alive>
    <app-footer v-show="$route.name" />
    <update-toast />
    <el-tooltip effect="dark" content="返回" placement="top-start">
      <el-button
        v-show="!/(\/|home)/.test($route.name)"
        class="back-button"
        @click="handleBack"
        type="primary"
        icon="el-icon-d-arrow-left"
        circle
      />
    </el-tooltip>
    <div v-show="nightMode" class="darken" />
    <el-backtop style="width: 50px; height: 50px;">
      <el-tooltip effect="dark" content="回到顶部" placement="top-end">
        <i style="font-size: 30px" class="el-icon-caret-top" />
      </el-tooltip>
    </el-backtop>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
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
    ...mapState('app', ['isMobile', 'nightMode']),
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

    ...mapMutations('app', ['toggleNightMode']),

    ...mapActions('user', ['saveLogin']),

    handleBack() {
      if (location.hash) this.$router.back();
      this.$router.back();
    }
  },

  mounted() {
    console.log(this.nightMode);
    this.toggleNightMode(this.nightMode);

    if (QC.Login.check()) {
      QC.Login.getMe(openId => {
        window.loadingInstance = Loading.service({
          lock: true,
          text: '登录中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        window.localStorage.setItem(
          'access_token',
          location.hash
            .split('=')[1]
            .split('&')
            .shift()
        );
        location.hash = '';
        window.localStorage.setItem('openid', openId);

        // 移动端登录
        if (this.isMobile) this.saveLogin();
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
  color: var(--color-default);
}

.darken {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  // TODO: 混合模式
  mix-blend-mode: darken;
  background-color: rgba(0, 0, 0, 0.2);
  pointer-events: none;
}

.back-button {
  position: fixed;
  right: 40px;
  bottom: 110px;
  z-index: 2000;
  width: 50px;
  height: 50px;
  font-size: 20px;
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
