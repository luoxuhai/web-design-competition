<template>
  <div class="course">
    <app-bar class="appbar">推动中国发展的优秀思想理论集</app-bar>
    <div class="course__wrapper">
      <div id="player" />
      <chat-room />
    </div>
  </div>
</template>

<script>
import XgPlayer from "xgplayer";
import ChatRoom from "./components/ChatRoom";

export default {
  components: {
    ChatRoom
  },
  data() {
    return {};
  },

  mounted() {
    const player = new XgPlayer({
      id: "player",
      url:
        "//s1.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4",
      playsinline: true,
      whitelist: [""],
      playbackRate: [0.5, 1, 1.5, 2],
      danmu: {
        comments: [
          {
            duration: 15000,
            id: "2",
            start: 3000,
            txt: "长弹幕长弹幕长弹幕",
            mode: "top"
          },
          {
            duration: 15000,
            id: "3",
            start: 4000,
            txt: "长弹幕长弹幕长弹幕",
            mode: "bottom"
          },
          {
            duration: 15000,
            id: "4",
            start: 5000,
            txt: "长弹幕长弹幕长弹幕",
            mode: "scroll"
          }
        ],
        area: {
          start: 0,
          end: 1
        },
        closeDefaultBtn: false,
        defaultOff: false,
        panel: false
      },
      screenShot: true,
      download: true,
      pip: true
    });
  }
};
</script>

<style lang='scss' scoped>
.course {
  height: 100vmax;
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
    margin-top: 100px;
    padding: 0 5px;

    #player {
      flex: 1;
      min-width: 400px;
      margin-bottom: 20px;
    }
  }
}
</style>
