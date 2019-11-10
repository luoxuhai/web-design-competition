<template>
  <div class="course">
    <section id="course-scroll" :style="{width: scrollWidth}" @click="handleToCourseClick">
      <ul class="course__wrapper">
        <li
          class="course__item hvr-bob hvr-ripple-out"
          :style="{ backgroundImage: `url('https://ito.oss-cn-beijing.aliyuncs.com/web-design-competition/images/course-${index}.svg')`}"
          v-for="(item, index) of courses"
          :key="index"
          :data-id="item._id"
          :data-title="item.title"
        >
          <div class="course__learning">
            <ul class="course__learning-list">
              <li class="course__learning-item" v-for="_item of item.learner" :key="_item._id">
                <el-tooltip effect="dark" :content="_item.nickname" placement="top">
                  <el-avatar
                    class="intro__toplearn-avatar"
                    :src="_item.avatar"
                    @error="() => true"
                    :size="30"
                  >
                    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                  </el-avatar>
                </el-tooltip>
              </li>
            </ul>
            {{item.learner.length}} 人学习中
          </div>
          <section>
            <h2 class="course__title">
              <router-link :to="{path: '/course/114', query: {title: item.title}}">{{item.title}}</router-link>
            </h2>
            <hr class="divider" />
            <div class="course__author">
              <avatar
                class="course__author-avatar"
                :username="item.author.name + item.title"
                :size="30"
                initials
              />
              <p class="course__author-name">{{item.author.name}}</p>
            </div>
          </section>
        </li>
      </ul>
    </section>
    <div class="course__indicator" @click="handleIndicatorClick">
      <i class="icon iconleft" :class="!next && 'active'" />
      <i class="icon iconright" :class="next && 'active'" />
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import mouseWheel from "@better-scroll/mouse-wheel";
import ObserveDom from "@better-scroll/observe-dom";

BScroll.use(mouseWheel).use(ObserveDom);

let maxScrollX = 0;

export default {
  props: {
    courses: Array
  },

  data() {
    return {
      scrollWidth: 0,
      next: true
    };
  },

  methods: {
    setScrollWidth() {
      this.scrollWidth =
        document.body.clientWidth -
        document.getElementById("course-scroll").getBoundingClientRect().left +
        "px";
    },

    changeResize() {
      this.setScrollWidth();
      this.courseScroll.refresh();
    },

    handleToCourseClick(e) {
      if (e.target.tagName === "LI") {
        this.$router.push({
          path: `/course/${e.target.dataset.id}`,
          query: { title: e.target.dataset.title }
        });
      }
    },

    handleIndicatorClick(e) {
      const className = e.target.classList[1];
      if (className === "iconleft") this.courseScroll.scrollTo(0, 0, 300);
      else if (className === "iconright")
        this.courseScroll.scrollTo(maxScrollX, 0, 300);
      else return false;
    }
  },

  watch: {
    courses() {
      this.$nextTick(() => this.changeResize());
    }
  },

  mounted() {
    window.addEventListener("resize", this.changeResize);
    this.setScrollWidth();
    this.courseScroll = new BScroll("#course-scroll", {
      scrollX: true,
      click: true,
      bounceTime: 500,
      observeDom: true,
      probeType: 3,
      preventDefaultException: {
        tagName: /^(SPAN|IMG)$/
      },
      mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300
      }
    });
    this.$nextTick(() => {
      this.courseScroll.refresh();
      this.courseScroll.on("scroll", e => {
        if (e.x <= this.courseScroll.maxScrollX / 2) this.next = false;
        else this.next = true;
      });
      this.courseScroll.on("refresh", () => {
        maxScrollX = this.courseScroll.maxScrollX;
      });
    });
  },

  destroyed() {
    window.removeEventListener("resize", this.changeResize);
  }
};
</script>

<style lang='scss' scoped>
.hvr-ripple-out:before {
  content: "";
  border: #ffffff solid 6px;
  border-radius: 12px;
}
.course {
  flex: 1;
  // background-color: var(--color-primary);
  background-image: linear-gradient(
    135deg,
    var(--color-primary),
    lighten(#f9320c, 20%) 100%
  );
  overflow: hidden;
  padding-top: 120px;

  &__indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    margin-top: 50px;
    color: rgba(255, 255, 255, 0.5);

    .icon {
      transition: all 0.3s;
      border-radius: 50%;
      padding: 3px;
      cursor: pointer;

      &:hover {
        transform: scale(1.2);
        color: #f5f5f5;
        font-weight: bold;
        background-color: rgba(255, 255, 255, 0.15);
      }

      &.active {
        transform: scale(2);
        color: #f5f5f5;
        background-color: rgba(255, 255, 255, 0.2);
      }

      &:first-child {
        margin-right: 30px;
      }
    }
  }

  &__wrapper {
    display: inline-flex;
    align-items: center;
    height: 440px;
  }

  &__learning {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);

    &-list {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }

    &-item {
      &:not(:first-child) {
        margin-left: -8px;
      }
    }
  }

  &__title {
    font-size: 29px;
    font-weight: bold;

    a {
      text-decoration: none;
      color: inherit;
      font-size: 22px;
    }
  }

  &__author {
    display: flex;
    align-items: center;

    &-avatar {
      margin-right: 10px;
    }
  }

  #course-scroll {
    position: relative;
    left: 340px;
    right: 0;
    top: 100px;
    overflow: hidden;
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-shrink: 0;
    width: 200px;
    height: 360px;
    margin-right: 40px;
    padding: 20px 15px;
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer;
    background-size: contain;
    background-repeat: no-repeat;
    background-position-y: 35%;

    &:first-child {
      margin-left: 10px;
    }

    .divider {
      width: 70px;
      height: 1px;
      margin: 20px 0;
      border: none;
      background-color: #707070;
    }
  }
}
</style>
