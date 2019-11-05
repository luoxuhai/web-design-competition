<template>
  <div>
    <app-bar class="appbar" />
    <div class="home__wrapper">
      <home-intro />
      <home-course />
    </div>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar";
import HomeIntro from "./components/HomeIntro";
import HomeCourse from "./components/HomeCourse";
export default {
  components: {
    AppBar,
    HomeIntro,
    HomeCourse
  },
  data() {
    return {};
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
  height: 120vh;
}
</style>
