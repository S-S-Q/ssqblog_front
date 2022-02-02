<template>
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
</template>

<script>

import 'highlight.js/styles/pojoaque.css'
import  'highlightjs-line-numbers.js'
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
      tags: []
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

  },
  mounted(){
    this.getMd();
  }
}
</script>

<style scoped>
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


</style>