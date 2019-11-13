<template>
  <div class="course">
    <app-bar
      :style="{backgroundColor, boxShadow: opacity === 1 ? '0 2px 6px 0 rgba(0, 0, 0, 0.12)' : ''}"
      class="appbar"
      :isDark="true"
    >{{course.title}}</app-bar>
    <div class="course__wrapper">
      <div class="course__wrapper-video">
        <section-title>视频课程</section-title>
        <div id="player" />
        <div class="course__barrage-container">
          <el-input
            type="textarea"
            v-model="barrage"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入弹幕"
          ></el-input>
          <el-button
            class="course__barrage-submit"
            @click="handleSendBarrageClick"
            type="primary"
            round
            icon="el-icon-s-promotion"
          >发送</el-button>
        </div>
      </div>
      <div class="course__wrapper-chat">
        <section-title>课程讨论</section-title>
        <chat-room />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import XgPlayer from 'xgplayer';
import uuidv4 from 'uuid/v4';
import { Message } from 'element-ui';
import SectionTitle from '@/components/SectionTitle';
import ChatRoom from './components/ChatRoom';
import { checkToken } from '@/utils/utils';
import { queryCourse, addLearner, addBarrage, queryBarrage } from '@/api/course';

let barrageInterval = null;

export default {
  components: {
    ChatRoom,
    SectionTitle
  },

  data() {
    return {
      id: '',
      opacity: 0,
      course: {},
      barrage: ''
    };
  },

  methods: {
    changeFadeAppbar() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop < 150) this.opacity = scrollTop / 150;
      else this.opacity = 1;
    },

    validateInputValue(content) {
      if (content.replace(/(^\s*)|(\s*$)/g, '').length === 0) {
        Message.error({ message: '内容不能为空!' });
        return false;
      } else return true;
    },

    handleSendBarrageClick() {
      if (!checkToken(this.token)) return;

      const { validateInputValue, player, id } = this;
      if (validateInputValue(this.barrage)) {
        const barrage = {
          duration: 15000,
          id: uuidv4(),
          start: player.currentTime * 1000 + 500,
          txt: this.barrage
        };
        player.danmu.sendComment({
          ...barrage,
          style: {
            color: '#ff9500',
            fontSize: '24px'
          }
        });

        addBarrage({ courseId: id, barrage });
      } else this.barrage = '';
    }
  },

  computed: {
    ...mapState('user', ['token']),

    backgroundColor() {
      return `rgba(255, 255, 255, ${this.opacity})`;
    }
  },

  mounted() {
    this.id = window.location.pathname.split('/')[2];
    window.addEventListener('scroll', this.changeFadeAppbar);

    this.player = new XgPlayer({
      id: 'player',
      poster: 'https://element.eleme.cn/static/theme-index-red.c8e136e.png',
      playsinline: true,
      whitelist: [''],
      playbackRate: [0.5, 1, 1.5, 2],
      defaultPlaybackRate: 1,
      rotate: {
        innerRotate: true,
        clockwise: false
      },
      danmu: {
        panel: true,
        comments: [],
        area: {
          start: 0,
          end: 1
        },
        closeDefaultBtn: false,
        defaultOff: false
      },
      download: true,
      pip: true
    });

    queryCourse(this.id).then(({ data }) => {
      this.course = data;
      this.player.start(data.content);
    });

    this.player.once('play', () => {
      if (this.token)
        // 延时5秒加入课程
        setTimeout(() => addLearner(this.id), 5000);

      barrageInterval = setInterval(() => {
        // 获取弹幕
        queryBarrage(this.id).then(({ data }) => {
          this.player.danmu.bulletBtn.main.data = data.map(e => ({
            ...e,
            style: {
              color: '#ff9500',
              fontSize: '24px'
            }
          }));
        });
      }, 2000);
    });
  },

  destroyed() {
    window.removeEventListener('scroll', this.changeFadeAppbar);
    clearInterval(barrageInterval);
  }
};
</script>

<style lang='scss' scoped>
.course {
  padding-bottom: 200px;
  background-color: #f4f4f4;
  .appbar {
    position: sticky;
    top: 0;
    z-index: 999;
    width: 100%;
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1400px;
    margin: 0 auto;
    margin-top: 40px;
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;

    &-video {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 340px;
      max-width: 600px;
      margin-bottom: 20px;
    }

    &-chat {
      flex: 1;
      margin-left: 40px;
      min-width: 400px;
    }

    #player {
      width: 100% !important;
    }
  }

  &__barrage-container {
    display: flex;
    align-items: flex-end;
    margin-top: 40px;
  }

  &__barrage-submit {
    margin-left: 10px;
  }
}

@media only screen and (max-width: 1200px) {
  .course__wrapper-chat {
    margin-left: 20px;
  }
}
@media only screen and (max-width: 845px) {
  .course__wrapper-chat {
    margin-left: 0;
    min-width: 100%;
  }

  .course__wrapper {
    margin-top: 0;
  }
}
</style>
