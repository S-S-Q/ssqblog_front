<template>
<el-card class="wrapper">
    <el-input v-model="input" placeholder="请输入内容" @keyup.enter.native="search">
      <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
    </el-input>
  <el-empty description="无搜索结果" v-show="searchAns.length===0"></el-empty>
  <el-card v-for="ans in searchAns" class="search-ans">
    <h4>
      <router-link :to="{ name:'BlogDetail',params: {blogId: ans.id} }">
        {{ ans.title }}
      </router-link>
    </h4>
    <p>{{ans.description}}</p>
  </el-card>
</el-card>

</template>

<script>
import {Message} from "element-ui";

export default {
  name: "BlogSearch",
  data(){
    return {
      input:"",
      searchAns:[]
    }
  },
  methods:{
    search(){
      console.log("点击")
      let fd = new FormData();
      fd.append("key", this.input);
      const _this=this
      this.$axios.post("/blog/searchBlogs",fd).then(result=> {
        console.log(result)
        if (result.status === 200)
        {
          _this.searchAns=result.data.data
        }
      })
    }
  },
  created() {
    // Message.warning("还没做出来")
    // this.$router.push("/blogs")
  }
}
</script>

<style scoped>
.wrapper{
  max-width: 888px;
  margin: 0 auto;
}

.search-ans{
  margin-top: 40px;
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