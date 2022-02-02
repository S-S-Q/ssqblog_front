<template>
  <div style="height: 100%;">
  <el-card class="wrapper">
    <div class="content">
      <div class="article-title">
        <span>{{ title }}</span>
      </div>

      <div class="article-header">
        <el-avatar size="large" :src="circleUrl" class="avatar"></el-avatar>
        <div class="info">
          <div class="author">

            <span style="color: #50505c">SSQ</span>
          </div>
          <div class="meta-info">
            <span style="margin-right: 10px;">
              <i class="el-icon-edit"></i>
                <span style="margin-left: 5px; font-size: 0.8rem;">{{createTime}}</span>
            </span>
<!--            el-icon-collection-tag-->
            <span>
              <i class="el-icon-collection-tag"></i>
                <span style="margin-left: 5px; font-size: 0.8rem; margin-right: 5px;" v-for="tag in tags">{{tag}}</span>
            </span>
          </div>
        </div>

      </div>
      <div  v-highlight v-html="msg" class="markdown-body" :key="key"></div>
    </div>
  </el-card>
    <transition name="el-fade-in-linear">
  <el-card class="list" v-if="listVisible">
    <div style="margin:0 auto;font-size:18px;font-weight:bold;">目录</div>
    <el-tree :data="navList" :props="defaultProps" ref="my-tree"
             @node-click="handleClick" :default-expand-all="true" node-key="name"
             :current-node-key="activeName"
             :highlight-current="true">
      <span class="span-ellipsis" slot-scope="{ node, data }">
	   	<span :title="node.label">{{ node.label }}</span>
	    </span>
    </el-tree>
  </el-card>
    </transition>
    <el-button class='list-buttons' size="medium"  icon="el-icon-s-tools"  @click="listButtonClick" circle ></el-button>
    <el-backtop>
      <i class="el-icon-arrow-up"></i>
    </el-backtop>
  </div>
</template>

<script>

import 'highlight.js/styles/pojoaque.css'
import 'highlightjs-line-numbers.js'
import 'github-markdown-css'

export default {
  name: "BlogDetail",
  data(){
    return{
      msg:'',
      key:'',
      title:'',
      circleUrl: this.$axios.defaults.baseURL+"/image/avatar.svg",
      createTime:"",
      tags: [],
      navList:[],
      positionList:[],
      scroll: '',
      activeName:'',
      tabPosition:'left',
      defaultProps: {
        children: 'selfChildren',
        label: 'name'
      },
      listVisible: true
    }
  },
  methods:{
    //获取md文件并解析为html
    async getMd(){
      // 通过id获取md文件的str
      //this.$route.params.id是指$route传过来的id，即后台数据库id
      this.$axios.get("/blog/getBlogDetail/"+this.$route.params.blogId).then(res=>{
        console.log(res)
        this.msg=  res.data.data.html;
        this.title=res.data.data.title;
        this.createTime=res.data.data.created;
        this.tags=res.data.data.tagsName

        this.key+=1
      })
    },
    //这一部分是生成目录的
    handleClick(data){
      this.activeName = data.name;
      this.jump(data.index)
    },
    dataScroll: function () {
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
    },
    jump(index) {
      let jump = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
      // 获取需要滚动的距离
      let total = jump[index].offsetTop - 80;
      // Chrome
      document.body.scrollTop = total;
      // Firefox
      document.documentElement.scrollTop = total;
      // $('html, body').animate({
      // 'scrollTop': total
      // }, 400);
    },
    loadScroll: function () {
      let self = this;
      let navs = document.querySelectorAll('.el-tabs__item');
      // var sections = document.getElementsByClassName('section');
      for (let i = self.positionList.length - 1; i >= 0; i--) {
        if (self.scroll >= self.positionList[i].offsetTop - 120) {
          self.activeName = self.positionList[i].name
          self.$refs["my-tree"].setCurrentKey(self.positionList[i].name);
          break;
        }
      }
    },
    selectAllTitle(){
      let title = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
      this.navList = Array.from(title);
      const pattern = /<\/a>/;
      let i =0
      this.navList.forEach(item=>{

        item.name = item.innerHTML.split(pattern)[1]
        let index =item.localName.indexOf('h')
        item.lev =item.localName.substring(index+1,item.localName.length)
        item.selfChildren=[]
        item.index=i
        ++i
      })
      this.positionList=this.navList
      return this.navList
    },
    handleNavTree() {
      const navs = this.selectAllTitle()
      navs.forEach((item) => {
        const parentIndex = this.getParentIndex(navs, item.index)
        item.parent = parentIndex
      })
      this.navList=this.filterArray(navs)
      console.log(this.navList)
    },
    filterArray(data, parent) {
      const self = this
      const tree = []
      let temp
      for (let i = 0; i < data.length; i++) {
        if (data[i].parent === parent) {
          const obj = data[i];
          temp = self.filterArray(data, data[i].index)
          if (temp.length > 0) {
            obj.selfChildren = temp
          }
          tree.push(obj)
        }
      }
      return tree
    },
    getParentIndex(nav, endIndex) {
      for (let i = endIndex - 1; i >= 0; i--) {
        if (nav[endIndex].lev > nav[i].lev) {
          return nav[i].index;
        }
      }
    },
    //这上面一部分是生成目录的
    listButtonClick(){
      this.listVisible=!this.listVisible
    }
  },
  watch: {
    scroll: function () {
      this.loadScroll()

    }
  },
  mounted(){
    this.getMd();
    window.addEventListener('scroll', this.dataScroll);
    this.$nextTick(() => {
      setTimeout(() => {
        this.handleNavTree()
      },1000);
    })
  }
}
</script>

<style scoped >
.wrapper{
  max-width: 888px;
  margin: 0 auto;

}

.wrapper .content{
  padding: 20px;
  margin: 0 auto;
}

/*标题样式*/
.wrapper .content .article-title {
  color: #4c4c57;
  font-weight: 600;
  font-size: 1.6rem;
}

/*头像那一行样式*/
.wrapper .content .article-header {
  position: relative;
  padding-left: 46px;
  margin-top: 16px;
  width: 100%;
  height: 46px;
  box-sizing: border-box;
}

/*头像*/
.wrapper .content .article-header .avatar {
  position: absolute;
  top: 0;
  left: 0;
  width: 46px;
  height: 46px;
  border: 1000px #2C8DF4;
}

/*头像右边的信息*/
.wrapper .content .article-header .info {
  padding: 2px 0;
  margin-left: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.wrapper .content .article-header .info .author {
  font-weight: 600;
  font-size: 1.18rem;
  display: flex;
  align-items: center;
}

/*头像右边的下边的信息*/
.wrapper .content .article-header .info .meta-info{
  font-size: 0.8rem;
  color: #808091;
}



.list{
  position: fixed;
  top: 100px;
  right: 5px;
  width: 300px;
  height: auto;
}

.span-ellipsis {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}

.list-buttons {
  position: fixed;
  bottom: 50px;
  left: 50px;
}

.el-button:active {
  background: #126c9e !important;
  font-weight: bold;
}
/*按钮悬浮*/
.el-button:hover {
  background: #01a8f9 !important;
  color: white !important;
  font-weight: bold;
  border-color: #01a8f9 !important;
}


</style>
