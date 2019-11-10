<template>
  <header class="header">
    <h2 class="title">
      <slot />
    </h2>
  </header>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
.header {
  height: 20px;
  margin: 40px 0;
  border-left: 4px solid #ec7259;
  font-size: 18px;
  font-weight: 500;
  line-height: 20px;

  .title {
    margin-left: 10px;
  }
}
</style>
