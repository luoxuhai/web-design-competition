<template>
  <div id="app">
    <gemini-scrollbar class="scroll-bar" :forceGemini="false">
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
      <update-toast></update-toast>
    </gemini-scrollbar>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import UpdateToast from "@/components/UpdateToast";
import { keepAlivePages } from "@/.lavas/router";

const ENABLE_SCROLL_CLASS = "app-view-scroll-enabled";

export default {
  name: "app",
  components: {
    UpdateToast
  },
  computed: {
    ...mapState("pageTransition", {
      pageTransitionType: state => state.type,
      pageTransitionEffect: state => state.effect
    }),

    ...mapState("scrollBehavior", {
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
        return name + paramKeys.reduce((prev, cur) => prev + params[cur], "");
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
    ...mapActions("scrollBehavior", ["savePageScrollPosition"]),

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
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      this.restoreContainerScrollPosition(el, scrollTop);
      // save current scroll position in a map
      this.savePageScrollPosition({
        pageId,
        scrollPosition: { y: scrollTop }
      });
    }
  },
  beforeCreate() {
    function setRootFontSize() {
      const html = document.querySelector(":root");
      const fontSize = innerWidth / 40;
      if (innerWidth <= 375) html.style.fontSize = "10px";
      else html.style.fontSize = (fontSize > 16 ? 16 : fontSize) + "px";
    }

    setRootFontSize();
    window.addEventListener("resize", () => {
      setRootFontSize();
    });
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
