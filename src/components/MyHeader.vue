<template>

  <div class="wrapper">
    <!-- 页面头部部分 -->
    <div class="header">
      <div class="logo">
        <a class="title" >SSQBlog</a>
      </div>
<!--       水平一级菜单-->
      <div class="menu">
        <el-menu :default-active="toIndex()" mode="horizontal" @select="handleSelect">
          <template v-for="item in items">
            <el-menu-item :index="item.index" :key="item.index">
              <template slot="title">
                <span slot="title">{{ item.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "MyHeader",
  data() {
    return {
      items: [    // 水平一级菜单栏的菜单
        { index: '', title: 'HOME' },
        { index: 'search', title: 'SEARCH' },
        { index: 'tags', title: 'TAGS' },
        { index: 'manage', title: 'MANAGE' },
        { index: 'login', title: 'LOGIN' }
      ],
      login_state:false
    }
  },
  methods:{
    // 根据路径绑定到对应的一级菜单，防止页面刷新重新跳回第一个
    toIndex() {
      return this.$route.path.split('/')[1];
    },
    // 切换菜单栏
    handleSelect(index) {
      this.$router.push('/' + index);
    }
  },
  watch: {
    "$store.state.login": {
      handler: function (newVal, oldVal) {
        this.login_state = newVal
        if (this.login_state === true) {
          this.items[4].title = 'LOGOUT'
          this.items[4].index = 'logout'
        } else {
          this.items[4].title = 'LOGIN'
          this.items[4].index = 'login'
        }
      }
    }
  },
  created() {
    this.login_state=this.$store.state.login
    if(this.login_state===true)
    {
      this.items[4].title='LOGOUT'
      this.items[4].index='logout'
    }
    else
    {
      this.items[4].title='LOGIN'
      this.items[4].index='login'
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  background: #ffffff;
  box-shadow: 0px 7px 7px -7px rgba(0,0,0,0.2);
}
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  max-width: 960px;
  margin: 0 auto;
  min-width: 960px;
}
.header .logo {
  float: left;
  margin-left: 40px;
  margin-top: 18px;
  height: 29px;
  width: 200px;
  vertical-align: middle;
}
.header .logo .title{
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
  line-height: 1;
  color: #484853;
}

/* --------------- 水平一级菜单栏的样式--------------------- */
.menu{
  float: left;
  margin-left: 40px;
}

.el-menu >>>.el-menu--horizontal {
  border-bottom: 0px !important;
  float: left;
  margin-left: 20px;
}
.el-menu--horizontal >>> .el-menu-item.is-active {
  border-bottom: 2px solid #409eff;
  color: #3989fa;
  font-weight: 700;
}
.el-menu--horizontal >>> .el-menu-item {
  font-size: 16px;
  margin: 0 15px;
  color: black;
}

</style>