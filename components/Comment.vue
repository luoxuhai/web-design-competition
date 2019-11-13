<template>
  <div class="comment">
    <div class="comment__input-wrapper">
      <el-avatar class="avatar" @error="() => true" :size="40" :src="user.avatar">
        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
      </el-avatar>
      <div class="comment__input-content">
        <el-input
          v-model="content"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 4}"
          placeholder="请输入评论"
        ></el-input>
        <el-button class="comment__input-submit" @click="handleSubmitComment" type="primary">发布</el-button>
      </div>
    </div>
    <section-title>全部评论 {{comments ? newComments.length : 0}}</section-title>
    <ul class="comment__list">
      <li class="comment__item" v-for="(item, index) of newComments" :key="item._id">
        <header class="comment__item-header">
          <el-avatar class="avatar" @error="() => true" :size="40" :src="item.user.avatar">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
          <div class="comment__item-info">
            <h3 class="comment__item-name">{{item.user.nickname}}</h3>
            <time class="comment__item-date">{{item.createdAt | formatDate}}</time>
          </div>
        </header>
        <div class="comment__item-content">
          <p>{{item.content}}</p>
          <footer class="comment__item-footer">
            <span>
              <i class="icon iconheart" /> 0
            </span>
            <el-button
              v-if="item.user.openId === user.openId"
              @click="handleDeleteCommentClick(item._id, index)"
              type="danger"
              size="small"
              icon="el-icon-delete"
              circle
            ></el-button>
          </footer>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Dayjs from 'dayjs';
import { Message, MessageBox } from 'element-ui';
import SectionTitle from '@/components/SectionTitle';
import { comment, removeArticleComment } from '@/api/article';
import { checkToken } from '@/utils/utils';
export default {
  components: {
    SectionTitle
  },

  props: {
    comments: Array,
    articleId: String
  },

  filters: {
    formatDate(date) {
      return Dayjs(date).format('YYYY-MM-DD hh:mm');
    }
  },

  data() {
    return {
      content: ''
    };
  },

  methods: {
    validateInputValue(next) {
      if (this.content.replace(/(^\s*)|(\s*$)/g, '').length === 0) {
        Message.error({ message: '内容不能为空!' });
        this.content = '';
        return;
      } else next();
    },

    handleSubmitComment() {
      if (!checkToken(this.token)) return;

      this.validateInputValue(this.submitComment);
    },

    submitComment() {
      const { articleId, content } = this;
      comment({
        articleId,
        content: content.trim()
      })
        .then(res => {
          this.newComments.unshift({
            user: this.user,
            content: content.trim()
          });
          Message.success({ message: '评论成功!' });
        })
        .catch(() => Message.error({ message: '评论失败!' }));
    },

    handleDeleteCommentClick(commentId, index) {
      MessageBox.confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeArticleComment(this.articleId, commentId)
          .then(res => {
            this.newComments.splice(index, 1);
            Message.success({ message: '已删除!' });
          })
          .catch(() => Message.error({ message: '删除失败!' }));
      });
    }
  },

  computed: {
    ...mapState('user', ['user', 'token']),

    newComments() {
      return this.comments;
    }
  },

  updated() {
    this.$nextTick(() => {
      this.$scrollReveal.reveal('.comment__item');
      this.$scrollReveal.reveal('.comment__input-wrapper');
    });
  },

  destroyed() {
    this.$scrollReveal.destroy();
  }
};
</script>

<style lang='scss' scoped>
@import '@/assets/scss/_mixins.scss';

.comment {
  max-width: 700px;
  margin: 0 auto;

  .avatar {
    margin-right: 10px;
  }

  &__input {
    &-wrapper {
      display: flex;
      margin-top: 40px;
      padding: 20px;
      background-color: #fff;
      border-radius: 5px;
    }

    &-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    &-submit {
      right: 0;
      margin-top: 15px;
    }
  }

  &__list {
  }

  &__item {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;

    &-header {
      display: flex;
      align-items: center;
    }

    &-info {
      display: flex;
      flex-direction: column;
    }

    &-name {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 6px;
      color: #211615;
    }

    &-date {
      color: #8e8787;
      font-size: 14px;
    }

    &-content {
      margin-left: 50px;
      p {
        margin: 15px 0;
        line-height: 1.4;
        font-size: 16px;
        color: #4c4e4d;
      }
    }

    &-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
  }
}
</style>
