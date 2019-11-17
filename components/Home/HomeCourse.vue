<template>
  <div class="course">
    <section id="course-scroll" :style="{width: scrollWidth}" @click="handleToCourseClick">
      <ul class="course__wrapper">
        <li
          class="course__item hvr-bob hvr-ripple-out"
          :class="[index === 0 && isStartLearn && 'hvr-bob-ripple-hover']"
          :style="{ backgroundImage: `url('https://ito.oss-cn-beijing.aliyuncs.com/web-design-competition/images/course-${index}.svg')`}"
          v-for="(item, index) of courses"
          :key="index"
          :data-id="item._id"
          :data-title="item.title"
        >
          <course-learner :learner="item.learner" :learner_count="item.learner_count" />
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
    <div class="course__bg"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BScroll from '@better-scroll/core';
import mouseWheel from '@better-scroll/mouse-wheel';
import ObserveDom from '@better-scroll/observe-dom';
import CourseLearner from '@/components/CourseLearner';

BScroll.use(mouseWheel).use(ObserveDom);

let maxScrollX = 0;
let courses = [];

export default {
  components: {
    CourseLearner
  },

  props: {
    courses: {
      type: Array,
      default: courses
    }
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
        document.getElementById('course-scroll').getBoundingClientRect().left +
        'px';
    },

    changeResize() {
      this.setScrollWidth();
      this.courseScroll.refresh();
    },

    handleToCourseClick(e) {
      if (e.target.tagName === 'LI') {
        this.$router.push({
          path: `/course/${e.target.dataset.id}`,
          query: { title: e.target.dataset.title }
        });
      }
    },

    handleIndicatorClick(e) {
      const className = e.target.classList[1];
      if (className === 'iconleft') this.courseScroll.scrollTo(0, 0, 300);
      else if (className === 'iconright') this.courseScroll.scrollTo(maxScrollX, 0, 300);
      else return false;
    }
  },

  watch: {
    courses(val) {
      courses = val;
      this.$nextTick(() => this.changeResize());
    },

    isStartLearn(val) {
      if (val) this.courseScroll.scrollTo(0, 0, 300);
    }
  },

  computed: {
    ...mapState('app', ['isStartLearn'])
  },

  mounted() {
    window.addEventListener('resize', this.changeResize);
    this.setScrollWidth();
    this.courseScroll = new BScroll('#course-scroll', {
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
      this.courseScroll.on('scroll', e => {
        if (e.x <= this.courseScroll.maxScrollX / 2) this.next = false;
        else this.next = true;
      });
      this.courseScroll.on('refresh', () => {
        maxScrollX = this.courseScroll.maxScrollX;
      });
    });
  },

  destroyed() {
    window.removeEventListener('resize', this.changeResize);
  }
};
</script>

<style lang='scss' scoped>
.hvr-ripple-out:before {
  content: '';
  border: #ffffff solid 6px;
  border-radius: 15px;
}

.hvr-bob-ripple-hover {
  -webkit-animation-name: hvr-bob-float, hvr-bob;
  animation-name: hvr-bob-float, hvr-bob;
  -webkit-animation-duration: 0.3s, 1.5s;
  animation-duration: 0.3s, 1.5s;
  -webkit-animation-delay: 0s, 0.3s;
  animation-delay: 0s, 0.3s;
  -webkit-animation-timing-function: ease-out, ease-in-out;
  animation-timing-function: ease-out, ease-in-out;
  -webkit-animation-iteration-count: 1, infinite;
  animation-iteration-count: 1, infinite;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-direction: normal, alternate;
  animation-direction: normal, alternate;

  &.hvr-ripple-out:before {
    -webkit-animation-name: hvr-ripple-out;
    animation-name: hvr-ripple-out;
  }
}

.course {
  flex: 1;
  min-width: 470px;
  background-image: linear-gradient(135deg, var(--color-primary), lighten(#f9320c, 20%) 100%);
  overflow: hidden;
  padding-top: 120px;

  &__bg {
    position: absolute;
    top: 100px;
    right: 500px;
    width: 200px;
    height: 200px;
    // background-image: url("../../../static/img/undraw_video_influencer_9oyy (1).svg");
    background-repeat: no-repeat;
    background-size: contain;
    opacity: 0.5;
  }

  &__indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 280px;
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

@media screen and (max-width: 1200px) {
  .course {
    #course-scroll {
      left: 200px;
    }
  }

  .course__indicator {
    width: 180px !important;
  }
}

@media screen and (max-width: 797px) {
  .course {
    padding-top: 50px !important;
    padding-bottom: 30px;
  }

  .course {
    #course-scroll {
      left: 0;
      top: 0;
    }
  }

  .course__indicator {
    width: auto !important;
    margin-top: 20px !important;

    .icon:first-child {
      margin-right: 60px !important;
    }
  }
}

@media screen and (max-width: 600px) {
  .course {
    min-width: 300px !important;
  }
}
</style>
