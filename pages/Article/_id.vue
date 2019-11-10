<template>
  <div class="article">
    <app-bar
      class="appbar"
      :style="{backgroundColor, boxShadow: opacity === 1 ? '0 2px 6px 0 rgba(0, 0, 0, 0.12)' : ''}"
      :isDark="true"
    >
      <transition name="el-zoom-in-top">
        <div v-show="opacity === 1" class="transition-box">MariaDB CEO 痛斥云厂商对开源的无尽掠夺，从不回馈社区</div>
      </transition>
    </app-bar>
    <div class="article__wrapper">
      <article id="article" class="main">
        <img class="main__cover" :src="article.cover" :alt="article.title" :title="article.title" />
        <h1 class="main__title">{{article.title}}</h1>
        <section class="main__info">
          <time class="main__info-date">
            <i class="icon iconshijian" />
            {{article.createdAt | formatDate}}
          </time>
          <span class="main__info-words">字数 1525</span>
          <span class="main__info-views">阅读 {{article.views_count}}</span>
          <span class="main__info-likes">点赞 {{article.like_count}}</span>
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
      <aside v-if="isShowAside" class="aside" :style="{left: asideLeft + 'px'}">
        <div class="aside__item like">
          <i
            class="icon"
            :class="isLike ? 'iconheart-fill' : 'iconheart'"
            @click="handleLikeClick"
          />
        </div>
        <span class="like-count">{{article.like_count || 0}}</span>
        <a style="text-decoration: none; color: inherit" href="#comment">
          <i class="icon iconcomment" />
        </a>
        <span class="comment-count">{{comments ? comments.length : 0}}</span>
        <i class="icon" :class="isStar ? 'iconstar-fill' : 'iconstar'" @click="handleStarClick" />
        <el-popover
          style="margin-top: 20px"
          placement="top-start"
          title="扫码分享"
          width="150"
          trigger="hover"
        >
          <img style="width: 100%" :src="qrcode" alt="二维码" />
          <i class="icon iconshare" @mouseenter="getQrcodeMouseenter" slot="reference" />
        </el-popover>
      </aside>
    </div>
    <Comment id="comment" class="comment" :articleId="article._id" :comments="comments" />
  </div>
</template>

<script>
import AppBar from "@/components/AppBar";
import Comment from "@/components/Comment";
import md from "markdown-it";
import Dayjs from "dayjs";
import { Message } from "element-ui";
import jrQrcode from "jr-qrcode";
import { queryArticle, queryArticleComment, like, star } from "@/api/article";

export default {
  components: {
    AppBar,
    Comment
  },

  filters: {
    formatDate(date) {
      return Dayjs(date).format("YYYY-MM-DD hh:mm");
    }
  },

  data() {
    return {
      opacity: 0,
      article: {},
      comments: [],
      qrcode: "",
      isLike: false,
      isStar: false,
      asideLeft: 0,
      isShowAside: true
    };
  },

  methods: {
    changeFadeAppbar() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop < 150) this.opacity = scrollTop / 150;
      else this.opacity = 1;
    },

    handleLikeClick() {
      let inc = 1;
      const {
        isLike,
        article: { _id, like_count }
      } = this;
      if (!_id) return;

      if (isLike) inc = -1;
      this.isLike = !isLike;
      this.$set(this.article, "like_count", like_count + inc);

      like(_id, inc)
        .then(res => {
          console.log(res);
          Message.success({ message: inc === 1 ? "已点赞!" : "已取消点赞!" });
        })
        .catch(() => {
          Message.error({ message: "操作失败!" });
        });
    },

    handleStarClick() {
      let method = "add";
      const {
        isStar,
        article: { _id }
      } = this;
      if (!_id) return;

      if (isStar) method = "remove";
      this.isStar = !isStar;

      star(_id, method)
        .then(res => {
          Message.success({
            message: method === "add" ? "已收藏!" : "已取消收藏!"
          });
        })
        .catch(() => {
          Message.error({ message: "操作失败!" });
        });
    },

    getQrcodeMouseenter() {
      this.qrcode = jrQrcode.getQrBase64(window.location.href, {
        correctLevel: 3
      });
    },

    changeWindowSize() {
      if (this.asideLeft < 20 && this.asideLeft > 0) {
        // this.isShowAside = false;
        this.asideLeft = 20;
      } else {
        this.isShowAside = true;
        this.asideLeft =
          document.getElementById("article").getBoundingClientRect().left - 200;
      }
    }
  },

  computed: {
    backgroundColor() {
      return `rgba(255, 255, 255, ${this.opacity})`;
    }
  },

  mounted() {
    const id = window.location.pathname.split("/")[2];
    window.addEventListener("scroll", this.changeFadeAppbar);
    window.addEventListener("resize", this.changeWindowSize);
    this.changeWindowSize();

    queryArticle(id).then(({ data }) => {
      this.article = data;
      this.isLike = data.isLike;
      this.isStar = data.isStar;
    });

    queryArticleComment(id).then(({ data }) => {
      this.comments = data;
    });

    this.$nextTick(() => {
      var result = md().render("# markdown-it rulezz!");
    });
  },

  destroyed() {
    window.removeEventListener("scroll", this.changeFadeAppbar);
    window.removeEventListener("resize", this.changeWindowSize);
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
    padding: 0 10px;
    background-color: #fff;
  }

  .main {
    order: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 664px;
    min-width: 360px;

    &__cover {
      max-width: 700px;
      min-width: 360px;
      height: 350px;
      margin: -240px 10px 0 10px;
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
    font-size: 14px;
    color: #8e8787;

    .icon {
      font-size: 28px;
      cursor: pointer;
      transition: color 0.2s;

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

    @keyframes active {
      75% {
        transform: scale(1.3);
      }
      100% {
        transform: scale(0.9);
      }
    }

    .comment,
    .iconshare,
    .iconstar-fill,
    .iconstar {
      margin-top: 20px;
    }
    .iconheart-fill,
    .iconstar-fill {
      animation: active 0.2s;
      color: var(--color-primary);
    }
  }

  .comment {
    padding: 0 10px;
  }
}
</style>
