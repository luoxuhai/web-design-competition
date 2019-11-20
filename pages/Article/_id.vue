<template>
  <transition name="slide">
    <div v-show="isShow" class="article">
      <app-bar
        class="appbar"
        :style="{backgroundColor, boxShadow: opacity === 1 ? '0 2px 6px 0 rgba(0, 0, 0, 0.12)' : ''}"
        :isDark="true"
      >
        <transition name="el-zoom-in-top">
          <div v-show="opacity === 1" class="transition-box">{{article.title}}</div>
        </transition>
      </app-bar>
      <div class="article__wrapper">
        <article id="article" class="main">
          <img
            class="main__cover"
            :src="article.cover && article.cover + '?x-oss-process=style/fade'"
            :alt="article.title"
            :title="article.title"
          />
          <h1 class="main__title">{{article.title}}</h1>
          <section class="main__info">
            <time class="main__info-date">
              <i class="icon iconshijian" />
              {{article.createdAt | formatDate}}
            </time>
            <span class="main__info-words">字数 {{words}}</span>
            <span class="main__info-views">阅读 {{article.views_count}}</span>
            <span class="main__info-likes">点赞 {{article.like_count}}</span>
          </section>
          <div class="main__content" v-loading="!article.content" v-html="article.content" />
        </article>
        <transition name="el-zoom-in-top">
          <aside v-show="asideVisible" class="aside">
            <div class="aside__item like">
              <el-tooltip effect="dark" content="点赞" placement="right-start">
                <i
                  class="icon"
                  :class="isLike ? 'iconheart-fill' : 'iconheart'"
                  @click="handleLikeClick"
                />
              </el-tooltip>
            </div>
            <span class="like-count">{{article.like_count || 0}}</span>
            <a style="text-decoration: none; color: inherit" href="#comment">
              <el-tooltip effect="dark" content="评论" placement="right-start">
                <i class="icon iconcomment" />
              </el-tooltip>
            </a>
            <span class="comment-count">{{comments ? comments.length : 0}}</span>
            <el-tooltip effect="dark" content="收藏" placement="right-start">
              <i
                class="icon"
                :class="isStar ? 'iconstar-fill' : 'iconstar'"
                @click="handleStarClick"
              />
            </el-tooltip>
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
        </transition>
      </div>
      <comment id="comment" class="comment" :articleId="article._id" :comments="comments" />
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import AppBar from '@/components/AppBar';
import Comment from '@/components/Comment';
import Dayjs from 'dayjs';
import { Message } from 'element-ui';
import jrQrcode from 'jr-qrcode';
import { queryArticle, queryArticleComment, queryArticleContent, like, star } from '@/api/article';
import { checkToken } from '@/utils/utils';

export default {
  components: {
    AppBar,
    Comment
  },

  filters: {
    formatDate(date) {
      return Dayjs(date).format('YYYY-MM-DD hh:mm');
    }
  },

  data() {
    return {
      opacity: 0,
      article: {},
      comments: [],
      qrcode: '',
      words: '0000',
      isLike: false,
      isStar: false,
      asideVisible: true,
      isShow: false
    };
  },

  methods: {
    ...mapMutations('app', ['saveArticles']),

    changeFadeAppbar() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop < 150) this.opacity = scrollTop - 320;
      else this.opacity = 1;

      if (
        document.getElementById('comment').getBoundingClientRect().top <=
        window.innerHeight / 1.2
      )
        this.asideVisible = false;
      else this.asideVisible = true;
    },

    handleLikeClick() {
      if (!checkToken()) return;

      let inc = 1;
      const { isLike, article } = this;
      const { _id, like_count } = article;
      if (!_id) return;

      if (isLike) inc = -1;
      this.isLike = !isLike;

      like(_id, inc)
        .then(res => {
          this.saveArticles(
            this.articles.map(e => {
              if (e._id === _id) e.like_count = e.like_count + inc;
              return e;
            })
          );
          Message.success({ message: inc === 1 ? '已点赞!' : '已取消点赞!' });
        })
        .catch(() => {
          Message.error({ message: '操作失败!' });
        });
    },

    handleStarClick() {
      if (!checkToken()) return;

      let method = 'add';
      const {
        isStar,
        article: { _id }
      } = this;
      if (!_id) return;

      if (isStar) method = 'remove';
      this.isStar = !isStar;

      star(_id, method)
        .then(res => {
          Message.success({
            message: method === 'add' ? '已收藏!' : '已取消收藏!'
          });
        })
        .catch(() => {
          Message.error({ message: '操作失败!' });
        });
    },

    getQrcodeMouseenter() {
      this.qrcode = jrQrcode.getQrBase64(window.location.href, {
        correctLevel: 3
      });
    },

    countWords() {
      const richMediaContent = document.querySelector('.main__content');
      this.words = richMediaContent ? richMediaContent.textContent.length : 0;
    }
  },

  computed: {
    ...mapState('app', ['articles']),

    backgroundColor() {
      return `rgba(255, 255, 255, ${this.opacity})`;
    }
  },

  mounted() {
    const id = window.location.pathname.split('/')[2];
    this.article = this.articles.filter(e => e._id === id)[0] || [];
    this.$nextTick(() => {
      this.isShow = true;
    });
    window.addEventListener('scroll', this.changeFadeAppbar);

    queryArticle(id).then(({ data }) => {
      this.isLike = data.isLike;
      this.isStar = data.isStar;
      this.article = data;
      queryArticleContent(data.content_url).then(({ data }) => {
        this.$set(this.article, 'content', data);
        this.$nextTick(() => {
          this.countWords();
          queryArticleComment(id).then(({ data }) => {
            this.comments = data;
          });
        });
      });
    });
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.changeFadeAppbar);
    window.removeEventListener('resize', this.changeWindowSize);
  }
};
</script>

<style lang='scss' scoped>
@import '@/assets/scss/_mixins.scss';

.appbar {
  position: sticky;
  z-index: 999;
  top: 0;
}
.article {
  padding-bottom: 200px;
  background-color: #f4f4f4;

  &__wrapper {
    display: flex;
    justify-content: center;
    margin-top: 240px;
    padding: 0 10px;
    background-color: #fff;
  }

  .main {
    order: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 664px;
    min-width: 330px;

    &__cover {
      width: 700px;
      min-height: 350px;
      max-height: 350px;
      margin: -240px 10px 0 10px;
      border: none;
      background-color: #eee;
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
      width: 100%;
      min-height: 150px;
      margin: 50px 0;
    }
  }

  .aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 320px;
    left: 150px;
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

@media only screen and (max-width: 1200px) {
  .article .aside {
    left: 20px;
  }
}

@media only screen and (max-width: 850px) {
  .article .aside {
    display: none;
  }

  .article__wrapper {
    margin-top: 200px;
  }

  .article {
    .main {
      &__cover {
        width: 100%;
        min-height: auto;
        margin-top: -150px;
      }
    }
  }
}

@media only screen and (max-width: 411px) {
  .main__content {
    user-select: text;
  }
}
</style>
