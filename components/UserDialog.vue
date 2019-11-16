<template>
  <el-dialog
    width="70%"
    :title="type === 'star' ? '我的收藏' : '正在学习'"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :destroy-on-close="true"
    :fullscreen="isFullscreen"
    :before-close="handleClose"
  >
    <ul v-if="type === 'star'" class="article-list" v-loading="!stars.length">
      <li class="article-item" v-for="item of stars" :key="item._id">
        <el-image
          style="width: 80px; height: 80px"
          :src="item.cover && item.cover + '?x-oss-process=style/xs'"
          fit="cover"
        />
        <h2 class="article-title">{{ item.title }}</h2>
        <footer class="article-footer">
          <span>
            <i class="icon iconheart" />
            {{ item.like_count }}
          </span>
          <span>
            <i class="icon iconeye" />
            {{ item.views_count }}
          </span>
        </footer>
        <el-button class="romove-button" type="danger" size="small" icon="el-icon-delete" circle />
      </li>
      <li v-if="!stars.length">没有内容</li>
    </ul>
    <ul v-else class="course-list" v-loading="!learning.length">
      <li class="course-item" v-for="item of learning" :key="item._id">
        <div class="course-info">
          <h2 class="course-title">{{ item.title }}</h2>
          <p class="course-author">{{ item.author.name }}</p>
        </div>
        <footer class="course-footer">
          <course-learner :learner="item.learner" :learner_count="item.learner_count" />
        </footer>
        <el-button class="romove-button" type="danger" size="small" icon="el-icon-delete" circle />
      </li>
      <li v-if="!learning.length">没有内容</li>
    </ul>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import CourseLearner from '@/components/CourseLearner';
import { queryStars } from '@/api/article';
import { queryLearning } from '@/api/course';

export default {
  components: {
    CourseLearner
  },

  data() {
    return {
      dialogVisible: false,
      isFullscreen: false,
      type: '',
      stars: [],
      learning: []
    };
  },

  methods: {
    handleShowDialog(type) {
      this.type = type;
      this.changeDialogWidth();
      window.addEventListener('resize', this.changeDialogWidth);
      this.dialogVisible = true;
      if (type === 'star')
        queryStars().then(({ data }) => {
          this.stars = data;
        });
      else
        queryLearning().then(({ data }) => {
          this.learning = data;
        });
    },

    handleClose() {
      window.removeEventListener('resize', this.changeDialogWidth);
      this.dialogVisible = false;
    },

    changeDialogWidth() {
      if (window.innerWidth <= 768) this.isFullscreen = true;
      else this.isFullscreen = false;
    }
  }
};
</script>

<style lang='scss' scoped>
.article-list,
.course-list {
  display: flex;
  flex-direction: column;
  max-height: 50vh;
  min-height: 100px;
  overflow: auto;

  .article-item,
  .course-item {
    display: flex;
    align-items: center;
    min-width: 500px;
    padding: 10px;

    &:hover {
      background-color: lighten(#f9320c, 43%);
    }

    .article-title {
      margin-left: 20px;
      font-size: 18px;
    }

    .article-footer {
      display: flex;
      flex-direction: column;
      margin-left: 40px;
      color: #b9b9b9;

      .icon {
        font-size: 18px;
      }

      span:first-child {
        margin-bottom: 10px;
      }
    }

    .romove-button {
      margin-left: auto;
    }
  }
}

.course-list {
  .course-item {
    padding: 30px;
  }
  .course-info {
    display: flex;
    flex-direction: column;

    .course-title {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .course-author {
      color: #b9b9b9;
    }
  }

  .course-footer {
    margin-left: 40px;
  }
}
</style>
