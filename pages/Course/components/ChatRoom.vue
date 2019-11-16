<template>
  <div
    class="chat-room"
    v-loading="!connected"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(255, 255, 255, 0.5)"
  >
    <div id="chat-scroll">
      <ul class="chat-room__list">
        <li
          class="chat-room__item"
          :class="[item.user.openId === user.openId && 'chat-room__item-right']"
          v-for="(item, index) of messages"
          :key="index"
        >
          <el-avatar class="avatar" @error="() => true" :size="40" :src="item.user.avatar">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
          <div class="chat-room__item-container">
            <header class="chat-room__item-header">
              <h3 class="username">{{item.user.nickname}}</h3>
              <time class="date">{{item.payload.createdAt | formatDate}}</time>
            </header>
            <p class="chat-room__item-content">{{item.payload.content}}</p>
          </div>
        </li>
        <li class="chat-room__item-empty" v-if="connected && !messages.length">暂无消息</li>
      </ul>
    </div>
    <div class="chat-room__input-container">
      <el-input
        type="textarea"
        v-model="message"
        :autosize="{ minRows: 1, maxRows: 4}"
        placeholder="请输入消息"
      ></el-input>
      <el-button
        class="chat-room__input-submit"
        @click="handleSendMessageClick"
        icon="el-icon-s-promotion"
        circle
        type="primary"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Message } from 'element-ui';
import BScroll from '@better-scroll/core';
import mouseWheel from '@better-scroll/mouse-wheel';
import ScrollBar from '@better-scroll/scroll-bar';
import Dayjs from 'dayjs';
import io from 'socket.io-client';

let socket = null;
let maxScrollY = 0;

BScroll.use(mouseWheel).use(ScrollBar);

export default {
  props: {
    courseId: String
  },

  filters: {
    formatDate(date) {
      return Dayjs(date).format('MM-DD hh:mm');
    }
  },

  data() {
    return {
      message: '',
      messages: [],
      connected: false
    };
  },
  methods: {
    validateInputValue(content) {
      if (content.replace(/(^\s*)|(\s*$)/g, '').length === 0) {
        Message.error({ message: '内容不能为空!' });
        return false;
      } else return true;
    },

    sendMessage(content) {
      if (!socket.connected) throw Error('socket未连接');
      const { nickname, openId, avatar } = this.user;
      const message = {
        user: {
          openId,
          nickname,
          avatar
        },
        payload: {
          content,
          courseId: this.courseId,
          createdAt: Date.now()
        }
      };
      socket.emit('broadcast', message);
      this.messages.push(message);
      this.message = '';
    },

    handleSendMessageClick() {
      const { validateInputValue, sendMessage, message } = this;
      if (validateInputValue(message)) sendMessage(message);
    }
  },

  computed: {
    ...mapState('user', ['user'])
  },

  mounted() {
    socket = io(
      process.env.NODE_ENV === 'development'
        ? 'http://127.0.0.1:8099/chat_room'
        : 'https://open.furuzix.top/chat_room',
      { path: '/api/web/socket.io' }
    );

    socket.connect();

    socket.on('connect', e => {
      console.log('connect');
      // FIXME: 初始化连接
      if (socket.connected) {
        setTimeout(() => {
          socket.emit('broadcast', {
            isConnect: true,
            payload: {
              courseId: this.courseId
            }
          });
        }, 500);
      }
    });

    // 接收广播信息
    socket.on('broadcast', msg => {
      this.messages.push(msg);
    });

    // 接送消息列表
    socket.on('messages', msgs => {
      this.messages = msgs;
      this.connected = true;
      this.$nextTick(() => {
        this.courseScroll.scrollTo(0, this.courseScroll.maxScrollY, 0);
      });
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });
    this.courseScroll = new BScroll('#chat-scroll', {
      click: true,
      bounceTime: 300,
      mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300
      }
    });
  },

  updated() {
    this.$nextTick(() => {
      this.courseScroll && this.courseScroll.refresh();
      this.courseScroll.scrollTo(0, this.courseScroll.maxScrollY, 0);
    });
  },

  beforeDestroy() {
    socket && socket.close();
    socket = null;
  }
};
</script>

<style lang='scss' scoped>
.chat-room {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: 70vh;
  padding: 10px;
  background-color: #5b81a6;
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
    border-radius: 5px;
    color: #dcddde;

    &-empty {
      color: #dcddde;
      text-align: center;
      line-height: 4;
    }

    &-right {
      flex-direction: row-reverse;

      .chat-room__item-header {
        justify-content: flex-end;
      }

      .chat-room__item-container {
        align-items: flex-end;
      }
    }

    .avatar {
      flex-shrink: 0;
      margin: 0 10px;
    }

    &-container {
      display: flex;
      flex-direction: column;
    }

    &-content {
      display: inline-block;
      line-height: 1.4;
      font-size: 14px;
    }

    &-header {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .username {
        margin-right: 10px;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 6px;
        color: rgb(79, 192, 141);
      }

      .date {
        font-size: 13px;
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
