<template>
  <div class="comment">
    <div class="comment__input-wrapper">
      <avatar class="avatar" username="登录" :size="40" initials />
      <div class="comment__input-content">
        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入内容"></el-input>
        <el-button class="comment__input-submit" type="primary">发布</el-button>
      </div>
    </div>

    <header class="comment__header">
      <h2 class="title">全部评论 {{comments.length}}</h2>
    </header>
    <ul class="comment__list">
      <li class="comment__item" v-for="(item, index) of comments" :key="index">
        <header class="comment__item-header">
          <avatar class="avatar" username="多巴没有胺" :size="40" initials />
          <div class="comment__item-info">
            <h3 class="comment__item-name">多巴没有胺</h3>
            <time class="comment__item-date">9小时前</time>
          </div>
        </header>
        <div class="comment__item-content">
          <p>{{item.content}}</p>
          <span>
            <i class="icon iconheart" /> 0
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [...new Array(5)].map(() => ({
        content:
          "今天下午刚好因为装了 edxposed 和某些模块冲突 bootloop 了，可惜是用了逻辑分区的 Android 10，没有 twrp。好在可以先用原版 bootimg 进系统，打开 adb 并勾上一直允许连接。刷回带 magisk 的镜像之后在 bootloop 的画面用 adb wait-for- device ...展开"
      }))
    };
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/scss/_mixins.scss";

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

  &__header {
    height: 20px;
    margin: 40px 0;
    border-left: 4px solid #ec7259;
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;

    .title {
      margin-left: 10px;
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
  }
}
</style>
