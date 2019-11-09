<template>
  <div class="chat-room">
    <div id="chat-scroll">
      <ul class="chat-room__list">
        <li class="chat-room__item" v-for="(item, index) of messages" :key="index">
          <avatar class="avatar" :username="item.user" :size="40" initials />
          <div class="chat-room__item-container">
            <header class="chat-room__item-header">
              <h3 class="username">{{item.user}}</h3>
              <time class="date">{{item.createdAt}}</time>
            </header>
            <p class="chat-room__item-content">{{item.content}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="chat-room__input-container">
      <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="请输入内容"></el-input>
      <el-button class="chat-room__input-submit" type="primary">发布</el-button>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import mouseWheel from "@better-scroll/mouse-wheel";
import ScrollBar from "@better-scroll/scroll-bar";

BScroll.use(mouseWheel).use(ScrollBar);
export default {
  data() {
    return {
      messages: Array(10).fill({
        user: "多巴没有胺",
        content: "多巴没有胺多巴没有胺多巴没有胺",
        createdAt: "2019.11.2"
      })
    };
  },

  mounted() {
    this.courseScroll = new BScroll("#chat-scroll", {
      click: true,
      bounceTime: 300,
      mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300
      }
    });
  }
};
</script>

<style lang='scss' scoped>
.chat-room {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  max-width: 700px;
  height: 70vh;
  margin-left: 40px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;

  #chat-scroll {
    overflow: hidden;
  }
  &__list {
  }

  &__item {
    display: flex;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 5px;

    .avatar {
      margin-right: 10px;
    }

    &-container {
      display: flex;
      flex-direction: column;
    }

    &-header {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .username {
        margin-right: 10px;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 6px;
        color: #211615;
      }

      .date {
        color: #8e8787;
        font-size: 14px;
      }
    }
  }

  &__input-container {
    display: flex;
    align-items: flex-end;
  }

  &__input-submit {
    margin-left: 10px;
  }
}
</style>
