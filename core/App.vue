<template>
  <div id="app">
    <transition
      :name="pageTransitionEffect"
      @before-enter="handleBeforeEnter"
      @after-enter="handleAfterEnter"
      @before-leave="handleBeforeLeave"
    >
      <keep-alive :include="[...keepAlivePages]">
        <router-view
          :key="routerViewKey"
          :class="['app-view', pageTransitionClass]"
          :data-page-id="$route.fullPath"
        ></router-view>
      </keep-alive>
    </transition>
    <footer class="flex-container">
      <div class="flex-item">
        <p>友情链接</p>
        <a href="http://theory.people.com.cn/GB/179412/">马克思主义学习网</a>
        <a href="http://www.gov.cn/">中国政府网</a>
        <a href="http://cpc.people.com.cn/">中国共产党新闻网</a>
      </div>

      <div class="flex-item">
        <p>更多</p>
        <p>建议反馈</p>
      </div>

      <div class="flex-item">
        <p>联系我们</p>
        <img src="../static/img/icons/weixin.png" alt="微信图标" />
        <img src="../static/img/icons/QQ.png" alt="QQ图标" />
        <img src="../static/img/icons/QQkongjian.png" alt="QQ空间图标" />
        <img src="../static/img/icons/weibo.png" alt="微博图标" />
        <img src="../static/img/icons/linkedin.png" alt="领英图标" />
      </div>
    </footer>
    <div class="footer">
      <p>
        Copyright © 2019 - present
        <mark>HBF</mark> All Rights Reserved
      </p>
    </div>
    <update-toast></update-toast>
    <el-backtop style="width: 50px; height: 50px;">
      <i style="font-size: 30px" class="el-icon-caret-top" />
    </el-backtop>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import UpdateToast from '@/components/UpdateToast';
import { Loading } from 'element-ui';
import { keepAlivePages } from '@/.lavas/router';
import { login, update } from '@/api/user';

const ENABLE_SCROLL_CLASS = 'app-view-scroll-enabled';

export default {
  name: 'app',
  components: {
    UpdateToast
  },
  computed: {
    ...mapState('pageTransition', {
      pageTransitionType: state => state.type,
      pageTransitionEffect: state => state.effect
    }),

    ...mapState('scrollBehavior', {
      scrollPostionMap: state => state.scrollPostionMap
    }),

    pageTransitionClass() {
      return `transition-${this.pageTransitionType}`;
    },

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
    ...mapActions('scrollBehavior', ['savePageScrollPosition']),

    ...mapMutations('user', ['login']),

    /**
     * make current page container scrollable,
     * and restore its scroll position.
     */
    restoreContainerScrollPosition(containerEl, scrollTop) {
      containerEl.classList.add(ENABLE_SCROLL_CLASS);
      containerEl.scrollTop = scrollTop;
    },

    /**
     * make body scrollable,
     * and restore its scroll position.
     */
    restoreBodyScrollPosition(containerEl, scrollTop) {
      containerEl.classList.remove(ENABLE_SCROLL_CLASS);
      document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
    },

    handleBeforeEnter(el) {
      let pageId = el.dataset.pageId;
      let { y: scrollTop = 0 } = this.scrollPostionMap[pageId] || {};
      Vue.nextTick(() => {
        this.restoreContainerScrollPosition(el, scrollTop);
      });
    },

    handleAfterEnter(el) {
      let pageId = el.dataset.pageId;
      let { y: scrollTop = 0 } = this.scrollPostionMap[pageId] || {};
      this.restoreBodyScrollPosition(el, scrollTop);
    },

    handleBeforeLeave(el) {
      let pageId = el.dataset.pageId;
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      this.restoreContainerScrollPosition(el, scrollTop);
      // save current scroll position in a map
      this.savePageScrollPosition({
        pageId,
        scrollPosition: { y: scrollTop }
      });
    },

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
          window.loadingInstance.close();
        });
      }
    }
  },
  mounted() {
    if (location.protocol !== 'https:' && process.env.NODE_ENV !== 'development')
      window.open('https://open.furuzix.top', '_self');
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
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent)) {
          this.handleLogin();
        } else {
          window.open('', '_self');
          window.close();
          window.close();
        }
      });
    }
    this.handleLogin();
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

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    margin-top: auto;
    background-color: rgb(59, 58, 58);
    color: rgb(153, 153, 153);
  }
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
.flex-container {
  justify-content: space-around;
  color: white;
  display: flex;
  background-color: rgb(59, 58, 58);
}
.flex-item a {
  text-decoration: none;
  color: white;
  display: block;
  margin-bottom: 15px;
}
.flex-item p {
  margin: 25px 0 25px 0;
}
.flex-item img {
  width: 25px;
  height: 25px;
}
</style>
