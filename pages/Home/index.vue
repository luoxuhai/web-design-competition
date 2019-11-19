<template>
  <div class="home">
    <app-bar
      :style="{
                backgroundColor,
                boxShadow: opacity === 1 ? '0 2px 6px 0 rgba(0, 0, 0, 0.12)' : ''
            }"
      class="appbar"
      :isDark="opacity === 1"
    />
    <div class="home__wrapper">
      <home-intro :learner="learner" />
      <home-course :courses="courses" />
    </div>
    <achievement :articles="articles" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import AppBar from '@/components/AppBar';
import HomeIntro from '@/components/Home/HomeIntro';
import HomeCourse from '@/components/Home/HomeCourse';
import Achievement from '@/components/Home/Achievement';
import { queryArticles } from '@/api/article';
import { queryCourses } from '@/api/course';
export default {
  name: 'home',
  components: {
    AppBar,
    HomeIntro,
    HomeCourse,
    Achievement
  },
  data() {
    return {
      opacity: 0
    };
  },

  methods: {
    ...mapMutations('app', ['saveArticles', 'saveCourses', 'saveLearner']),

    changeFadeAppbar() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop < 150) this.opacity = scrollTop / 150;
      else this.opacity = 1;
    }
  },

  computed: {
    ...mapState('app', ['articles', 'courses', 'learner']),

    backgroundColor() {
      return `rgba(255, 255, 255, ${this.opacity})`;
    }
  },

  mounted() {
    queryCourses().then(({ data: { courses, learner } }) => {
      this.saveCourses(courses);
      this.saveLearner(learner);
    });

    queryArticles().then(({ data }) => {
      this.saveArticles(data);
    });
  },

  activated() {
    this.changeFadeAppbar();
    window.addEventListener('scroll', this.changeFadeAppbar);
  },

  deactivated() {
    window.removeEventListener('scroll', this.changeFadeAppbar);
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding-bottom: 200px;

  .appbar {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 999;
  }
  .home__wrapper {
    display: flex;
    flex-wrap: wrap;
    min-height: 800px;
  }
}
</style>
