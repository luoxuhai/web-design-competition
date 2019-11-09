<template>
  <div class="course">
    <section id="course-scroll" @click="handleToCourseClick">
      <ul class="course__wrapper">
        <li class="course__item" v-for="(item, index) of courses" :key="index" :data-id="index">
          <p class="course__learning-count">{{item.learning_count}}人学习中</p>
          <section>
            <h2 class="course__title">
              <router-link :to="{path: '/course/114'}">{{item.title}}</router-link>
            </h2>
            <hr class="divider" />
            <div class="course__author">
              <avatar
                class="course__author-avatar"
                :username="item.author.name"
                :size="30"
                initials
              />
              <p class="course__author-name">{{item.author.name}}</p>
            </div>
          </section>
        </li>
      </ul>
    </section>
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
      courses: [...new Array(5)].map((item, index) => ({
        title: "马克思列宁主义",
        learning_count: index * 100,
        author: {
          name: "马克思"
        }
      }))
    };
  },

  methods: {
    handleToCourseClick(e) {
      if(e.target.tagName === 'LI') {
        this.$router.push({
          path: `/course/${e.target.dataset.id}`
        })
      }
      
    }
  },

  mounted() {
    this.courseScroll = new BScroll("#course-scroll", {
      scrollX: true,
      click: true,
      bounceTime: 500,
      scrollbar: {
        fade: true,
        interactive: true
      },
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
.course {
  flex: 1;
  background-color: var(--color-primary);
  overflow: hidden;
  padding-top: 140px;

  &__wrapper {
    display: inline-flex;
  }

  &__title {
    font-size: 29px;
    font-weight: bold;
    line-height: 38px;
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
    height: 380px;
    margin-right: 50px;
    padding: 20px 15px;
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer;

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
