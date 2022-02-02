<template>
<el-card class="wrapper">
<div class="tag-name">
  <i class="el-icon-collection-tag"></i>
  {{ this.$route.params.tagName }}
</div>

  <div  v-for="blog in blogs" class="tagline">
    <router-link :to="{ name:'BlogDetail',params: {blogId: blog.id} }">
      {{ blog.title }}
    </router-link>
    <span class="tagnum">{{blog.created}}</span>
  </div>
</el-card>
</template>

<script>
export default {
  name: "BlogTagDetail",
  data(){
    return{
      blogs:[],
      tag: this.$route.params.tagName
    }
  },
  methods:{
    getBlogByTag() {
      const _this=this
      this.$axios.get("/blog/getBlogsByTag/"+this.tag).then(result=>{
        if(result.status===200)
        {
          _this._data.blogs=result.data.data
        }
      })
    }
  },
  created() {
    this.getBlogByTag()
  }
}
</script>

<style scoped>
.wrapper{
  max-width: 888px;
  margin: 0 auto;
}


.wrapper .tag-name {
  color: #50505c;
  font-size: 1.6rem;
  font-weight: 600;
  padding-bottom: 20px;
  margin-bottom: 38px;
  border-bottom: 1px solid #b3b3b3;
}

.wrapper .tagline{
  margin-top: 16px;
}

.wrapper .tagline .tagnum{
  font-size: 1rem;
  float: right;
}


.router-link-active {
  font-size: 1rem;
  text-decoration: none;
  color: #50505c;
}
a {
  font-size: 1rem;
  text-decoration: none;
  color: #50505c;
}
</style>