<template>
  <el-card class="wrapper">
    <div  v-for="tag in tags" class="tagline">
      <router-link :to="{ name:'BlogTagDetail',params: {tagName: tag.name} }">
        {{ tag.name }}
      </router-link>
      <span class="tagnum">{{tag.number}}</span>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "BlogTags",
  //data 和 data() {return {};}区别 防止数据污染 第一种data是全局可见的 第二种是局部可见
  data(){
    return{
      tags:[]
    }
  },
  methods:{
    getTagList(){
      const _this=this
      this.$axios.get("/tag/getTagList").then(resp=>{
        console.log(resp)
        if(resp.status===200)
        {
          _this._data.tags=resp.data.data
        }
      })
    }
  },
  created() {
    this.getTagList()
  }

}
</script>

<style scoped>
.wrapper{
  max-width: 888px;
  margin: 0 auto;
}

.wrapper .tagline{
  max-width: 780px;
  margin-top: 16px;
}

.wrapper .tagline .tagnum{
  font-size: 1rem;
  float: right;
}

/*修改route-link格式*/
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