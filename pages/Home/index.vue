<template>
  <div>
    <app-bar class="appbar" />
    <div class="home__wrapper">
      <home-intro />
      <home-course />
    </div>
    <achievement :articles="articles" />
  </div>
</template>

<script>
import AppBar from "@/components/AppBar";
import HomeIntro from "./components/HomeIntro";
import HomeCourse from "./components/HomeCourse";
import Achievement from "./components/Achievement";
import { queryArticles } from "@/api/article";
export default {
  components: {
    AppBar,
    HomeIntro,
    HomeCourse,
    Achievement
  },
  data() {
    return {
      articles: []
    };
  },

  mounted() {
    queryArticles().then(({ data }) => {
      this.articles = data;
    });
  }
};
</script>

<style lang='scss' scoped>
.appbar {
  position: absolute;
  left: 0;
  right: 0;
}
.home__wrapper {
  display: flex;
  flex-wrap: wrap;
  height: 800px;
}
</style>
