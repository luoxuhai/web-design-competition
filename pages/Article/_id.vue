<template>
  <div class="article">
    <app-bar
      class="appbar"
      :style="{backgroundColor, boxShadow: opacity === 1 ? '0 2px 6px 0 rgba(0, 0, 0, 0.12)' : ''}"
    >
      <transition name="el-zoom-in-top">
        <div v-show="opacity === 1" class="transition-box">MariaDB CEO 痛斥云厂商对开源的无尽掠夺，从不回馈社区</div>
      </transition>
    </app-bar>
    <div class="article__wrapper">
      <article class="main">
        <img
          class="main__cover"
          src="https://cdn.sspai.com/2019/10/27/ae7a61f61f246c8efb5d5aa84cd5016e.jpeg?imageMogr2/quality/95/thumbnail/!1420x708r/gravity/Center/crop/1420x708/interlace/1"
          alt
        />
        <h1 class="main__title">MariaDB CEO 痛斥云厂商对开源的无尽掠夺，从不回馈社区</h1>
        <section class="main__info">
          <time class="main__info-date">
            <i class="icon iconshijian" /> 2019.03.01
          </time>
          <span class="main__info-words">字数 1525</span>
          <span class="main__info-views">阅读 15</span>
          <span class="main__info-likes">点赞 2</span>
        </section>
        <div class="main__content">
          在以往的文章中少数派向大家介绍过 Magisk 的 安装方法、如何 隐藏 root 无痛玩机、这款神器以及在 Magisk 下实现 OTA 更新等等技巧，也推荐过不少实用的 Magisk 模块。
          关联阅读：
          装完 Magisk 不知道用什么？这是我的 Magisk 模块推荐 (1)、(2)
          一部手机体验多种 OEM 定制功能，这些模块助你打破厂商壁垒
          但俗话说「常在河边走，哪有不湿鞋」：最爱的模块并没有适配刚刚更新的系统、刚刚发现的新模块并不兼容自己手里的 Android 机……因为 Magisk 模块的兼容性问题导致手机无法正常开机的情况并不少见，如果你不幸遭遇这种情况，又该如何进行「救急」呢？
          很多人在使用 Magisk 遇到问题时的第一反应往往是通过 Magisk Uninstaller 直接卸载 Magisk 框架而非 Magisk 模块。殊不知这样并不能从根本上解决由不兼容模块带来的问题——虽然手机因为 Magisk 模块无法加载能够正常开机，但卸载 Magisk 后也就丢失了 root 权限，我们不仅无法在开机状态下清除问题模块，在不清除数据重刷的情况下，重装 Magisk 框架后手机依然会在开机时读取先前的有兼容性问题的 Magisk 模块。
          正确的处理方式是怎样的呢？
          需要明确的是，我们在 Magisk 的介绍中已经多次强调
        </div>
      </article>
      <aside class="aside">
        <div class="aside__item like">
          <i class="icon iconheart" />
        </div>
        <span class="like-count">8548</span>
        <i class="icon iconcomment" />
        <span class="comment-count">825</span>
        <i class="icon iconstar" />
        <i class="icon iconshare" />
      </aside>
    </div>
    <Comment />
    <el-backtop target=".article" :visibility-height="5" />
  </div>
</template>

<script>
import AppBar from "@/components/AppBar";
import Comment from "@/components/Comment";
import md from "markdown-it";

export default {
  components: {
    AppBar,
    Comment
  },

  data() {
    return {
      opacity: 0
    };
  },

  methods: {
    changeFadeAppbar({ target: { scrollTop } }) {
      if (scrollTop < 150) this.opacity = scrollTop / 150;
      else this.opacity = 1;
    }
  },

  computed: {
    backgroundColor() {
      return `rgba(255, 255, 255, ${this.opacity})`;
    }
  },

  mounted() {
    var result = md().render("# markdown-it rulezz!");
    document.addEventListener("scroll", this.changeFadeAppbar, true);
  },

  destroyed() {
    document.removeEventListener("scroll", this.changeFadeAppbar, true);
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/scss/_mixins.scss";

.appbar {
  position: sticky;
  z-index: 999;
  top: 0;
}
.article {
  background-color: #f4f4f4;

  &__wrapper {
    display: flex;
    justify-content: center;
    margin-top: 250px;
    background-color: #fff;
  }

  .main {
    order: 1;
    max-width: 664px;

    &__cover {
      width: 700px;
      height: 350px;
      margin-top: -240px;
      overflow: hidden;
    }

    &__title {
      margin: 40px auto 30px;
      font-weight: 500;
      font-size: 28px;
      line-height: 42px;
      color: #292525;
    }

    &__info {
      color: #969696;
      font-size: 14px;
      > * {
        margin-right: 10px;
      }
    }

    &__content {
      margin: 50px 0;
    }
  }

  .aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 200px;
    font-size: 14px;
    color: #8e8787;

    .icon {
      font-size: 28px;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: var(--color-primary);
      }
    }

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .like {
      @include center;
      width: 48px;
      height: 48px;
      margin-bottom: 10px;
      border-radius: 50%;
      background-color: #f5f5f5;
    }

    .iconcomment {
      @include center;
      width: 28px;
      height: 28px;
      margin-bottom: 10px;
      margin-top: 20px;
    }

    .comment,
    .iconshare,
    .iconstar {
      margin-top: 20px;
    }
  }
}
</style>
