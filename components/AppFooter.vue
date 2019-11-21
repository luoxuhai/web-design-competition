<template>
  <footer class="footer">
    <el-dialog
      width="350px"
      title="打开微信扫一扫"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :destroy-on-close="true"
      :before-close="() => dialogVisible = !dialogVisible"
    >
      <img style="width: 300px;" src="../static/img/icons/web.png" />
    </el-dialog>
    <div class="flex-container">
      <div class="flex-item">
        <p>友情链接</p>
        <a href="http://theory.people.com.cn/GB/179412/" target="_blank" title="马克思主义学习网">马克思主义学习网</a>
        <a href="http://www.gov.cn/" target="_blank" title="中国政府网">中国政府网</a>
        <a href="http://cpc.people.com.cn/" target="_blank" title="中国共产党新闻网">中国共产党新闻网</a>
      </div>
      <div class="flex-item">
        <p>更多</p>
        <a href="mailto:xxxx@163.com" title="邮件反馈">建议反馈</a>
        <a slot="reference" href="javascript:void(0)" @click="dialogVisible = !dialogVisible">微信扫一扫</a>
      </div>
      <div class="flex-item">
        <p>联系我们</p>
        <div>
          <el-popover placement="top-start" width="150" trigger="hover">
            <img style="width: 150px; height: 150px" src="../static/img/icons/12weixinqun.jpg" />
            <img slot="reference" src="../static/img/icons/weixin.png" alt="微信图标" />
          </el-popover>

          <el-popover placement="top-start" width="150" trigger="hover">
            <img style="width: 150px; height: 150px" src="../static/img/icons/HBFworkGroup.png" />
            <img slot="reference" src="../static/img/icons/QQ.png" alt="QQ图标" />
          </el-popover>
          <a
            class="weiboLink"
            href="https://weibo.com/6383622181/profile?topnav=1&wvr=6&is_all=1 "
            target="_blank"
            title="微博"
          >
            <img src="../static/img/icons/weibo.png" alt="微博图标" />
          </a>
          <img src="../static/img/icons/QQkongjian.png" alt="QQ空间图标" />
          <img src="../static/img/icons/linkedin.png" alt="领英图标" />
        </div>
      </div>
    </div>
    <div class="footer-line"></div>
    <div class="footer-copyright">
      <p>
        Copyright © 2019 - present
        <mark>HBF</mark> All Rights Reserved
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',

  data() {
    return {
      dialogVisible: false
    };
  }
};
</script>

<style lang='scss' scoped>
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  background-color: #f4f4f4;
  color: #8c8c8c;

  .footer-copyright {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 50px;
    p {
      text-align: center;
    }
  }
  .flex-container {
    justify-content: space-around;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background-color: #f4f4f4;
  }
  .flex-item:last-child {
    div {
      display: flex;
    }
  }
  .flex-item a {
    text-decoration: none;
    color: #8c8c8c;
    display: block;
    margin-bottom: 15px;
  }
  .flex-item p {
    font-size: 18px;
    color: #595959;
    margin: 25px 0 25px 0;
  }
  .flex-item a:hover {
    text-decoration: none;
    color: var(--color-primary);
    display: block;
    margin-bottom: 15px;
  }
  .flex-item img {
    margin: 0 8px;
    width: 25px;
    height: 25px;
  }
  .footer-line {
    width: 60%;
    height: 1px;
    margin: 0 auto;
    background-color: #e8e8e8;
  }
}
</style>
