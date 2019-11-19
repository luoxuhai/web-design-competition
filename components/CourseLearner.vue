<template>
  <div class="learning">
    <ul class="learning-list">
      <li class="learning-item" v-for="item of learner" :key="item._id">
        <el-avatar class="intro__toplearn-avatar" :src="item.avatar" @error="() => true" :size="30">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
        </el-avatar>
      </li>
    </ul>
    {{ learner_count }} 人学习中
  </div>
</template>

<script>
export default {
  props: {
    learner: Array,
    learner_count: Number
  },

  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
.learning {
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
</style>
