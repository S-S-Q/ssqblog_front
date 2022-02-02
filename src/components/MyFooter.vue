<template>
  <div class="page-main-content-bottom">
    <footer class="footer">
      <div class="info-container">
        <div class="theme-info info-item">
          Powered by <a target="_blank" href="https://hexo.io">SSQ</a>&nbsp;|&nbsp;Gitee&nbsp;<a class="theme-version" target="_blank" href="https://github.com/XPoet/hexo-theme-keep">MyGitee</a>
        </div>
        <div class="theme-info info-item">
          <a target="_blank" href="https://hexo.io">备案网址</a>|<a class="theme-version" target="_blank" href="https://github.com/XPoet/hexo-theme-keep">备案号</a>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
export default {
  name: "MyFooter"
}
</script>

<style scoped>

.page-main-content-bottom {
  width: 100%;
}

.footer {
  font-size: 1rem;
  color: #808091;
}

.footer .info-container {
  padding-bottom: 10px;
  text-align: center;
}

/*修改route-link格式*/
.router-link-active {
  text-decoration: none;
  color: #fff;
}
a {
  text-decoration: none;
  color: #808091;
}

</style>