<template>
  <div class="page-error">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  name: "error",
  computed: {
    message() {
      return this.$route.params.error || "您访问的页面不存在!";
    }
  },
  created() {
    let query = this.$route.query;
    if (Object.keys(query).length !== 0) {
      this.$router.replace({
        name: "error",
        params: query
      });
    }
  }
};
</script>

<style lang="scss">
  .page-error {
    h1 {
      text-align: center;
      font-size: 28px;
      line-height: 2;
      font-weight: bold;
    }
  }
</style>
