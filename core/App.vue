<template>
  <div id="app">
    <keep-alive :include="[...keepAlivePages]">
      <router-view :key="routerViewKey" :data-page-id="$route.fullPath"></router-view>
    </keep-alive>

    <footer class="footer">
      <div class="flex-container">
        <div class="flex-item">
          <p>友情链接</p>
          <a href="http://theory.people.com.cn/GB/179412/" target="_blank">马克思主义学习网</a>
          <a href="http://www.gov.cn/" target="_blank">中国政府网</a>
          <a href="http://cpc.people.com.cn/" target="_blank">中国共产党新闻网</a>
        </div>

        <div class="flex-item">
          <p>更多</p>
          <a href="mailto:xxxx@163.com">建议反馈</a>
        </div>

        <div class="flex-item">
          <p>联系我们</p>
          <div>
            <el-popover placement="top-start" width="150" trigger="hover">
              <img class="popPicture" src="../static/img/icons/12weixinqun.jpg" />
              <img slot="reference" src="../static/img/icons/weixin.png" alt="微信图标" />
            </el-popover>

            <el-popover placement="top-start" width="150" trigger="hover">
              <img class="popPicture" src="../static/img/icons/HBFworkGroup.png" />
              <img slot="reference" src="../static/img/icons/QQ.png" alt="QQ图标" />
            </el-popover>

            <a
              class="weiboLink"
              href="https://weibo.com/6383622181/profile?topnav=1&wvr=6&is_all=1 "
              target="_blank"
            >
              <img src="../static/img/icons/weibo.png" alt="微博图标" />
            </a>

            <img src="../static/img/icons/QQkongjian.png" alt="QQ空间图标" />
            <img src="../static/img/icons/linkedin.png" alt="领英图标" />
          </div>
        </div>
      </div>

      <div class="footer-line"></div>

      <div class="footer-copyright">
        <p>
          Copyright © 2019 - present
          <mark>HBF</mark> All Rights Reserved
        </p>
      </div>
    </footer>

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
      pageTransitionType: state => state.type
    }),

    ...mapState('scrollBehavior', {
      scrollPostionMap: state => state.scrollPostionMap
    }),

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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    background-color: #f4f4f4;
    color: #8c8c8c;

    .footer-copyright {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 50px;
    }
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
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background-color: #f4f4f4;
}
.flex-item:last-child {
  div {
    display: flex;
  }
}
.flex-item a {
  text-decoration: none;
  color: #8c8c8c;
  display: block;
  margin-bottom: 15px;
}
.flex-item p {
  font-size: 18px;
  color: #595959;
  margin: 25px 0 25px 0;
}
.flex-item a:hover {
  text-decoration: none;
  color: var(--color-primary);
  display: block;
  margin-bottom: 15px;
}
.flex-item img {
  margin: 0 8px;
  width: 25px;
  height: 25px;
}
.footer-line {
  width: 60%;
  height: 1px;
  margin: 0 auto;
  background-color: #e8e8e8;
}
.popPicture {
  width: 150px;
  height: 150px;
}
</style>
