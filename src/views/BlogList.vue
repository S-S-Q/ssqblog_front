<template>
  <div class="wrapper">
    <el-timeline>
      <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs">
        <el-card>
<!--          插值写法-->
          <h4>
            <router-link :to="{ name:'BlogDetail',params: {blogId: blog.id} }">
              {{ blog.title }}
            </router-link>
          </h4>
          <p>{{blog.description}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <el-pagination
        class="mpage"
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change=page
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "BlogList",
  data() {
    return{
      blogs:{},
      currentPage:1,
      total:0,
      pageSize:5
    }
  },
  methods:{
    page(currentPage){
      const _this=this
      this.$axios.get("/blog/getBlogList?currentPage="+currentPage).then(res=>{
        console.log(res)
        _this.blogs=res.data.data.records
        _this.currentPage=res.data.data.current
        _this.total=res.data.data.total
        _this.size=res.data.data.size
      })
    }
  },
  created(){
    this.page(1)
  }
}
</script>

<style scoped>
.wrapper{
  max-width: 960px;
  margin: 0 auto;
}

.wrapper .mpage{
  margin: 0 auto;
  text-align: center;
}
/*修改route-link格式*/
.router-link-active {
  text-decoration: none;
  color: #fff;
}
a {
  text-decoration: none;
  color: black;
}


</style>