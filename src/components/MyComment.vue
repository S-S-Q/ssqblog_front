<template>
  <el-card class="comment-wrapper">

    <div class="input-wrapper">
      <el-input
          type="text"
          placeholder="输入昵称"
          v-model="newComment.name"
          maxlength="10"
          show-word-limit>
      </el-input>
      <div style="margin: 20px 0;"></div>
      <el-input
          v-model="newComment.content"
          type="textarea"
          :rows="3"
          autofocus
          placeholder="写下你的评论">
      </el-input>
      <div class="btn-control">
        <span class="cancel" @click="cancel">清空</span>
        <el-button class="btn" round @click="commitComment">确定</el-button>
      </div>
    </div>

    <div style="margin:0 auto;font-size:18px;font-weight:bold;">评论</div>
    <div class="comment" v-for="item in comments">
      <div class="info">
        <img class="avatar"  width="40" height="40" src="../head.png"/>
        <div class="right">

          <div class="name">{{item.name}}</div>
          <div class="date">{{item.created}}</div>
        </div>
      </div>
      <div class="content">{{item.content}}</div>
    </div>

  </el-card>
</template>

<script>
import {Message} from "element-ui";

export default {
  data(){
    return{
      comments:[],
      newComment:{name:"",content:"",created:"",blogId:"",tel:""}
    }
  },
  props:["blogId"],
  name: "MyComment",
  methods:{
  commitComment(){
    let fd = new FormData();
    fd.append("blog_Id", this.blogId);
    fd.append("name",this.newComment.name);
    fd.append("content",this.newComment.content)
    this.$axios.post("/comment/addComment",fd).then(result=>{
      if(result.status===200)
      {
        if(result.data.code===200)
        Message.success(result.data.message)
        else
          Message.error(result.data.message)
      }
    })
  },
    cancel(){
    this.newComment.content=''
      this.newComment.name=''
    },
    getComment(){
      let fd = new FormData();
      fd.append("blogId", this.blogId);
      let _this=this
      this.$axios.post("/comment/getComment",fd).then(result=>{
        console.log(result)
        if(result.data.code===200)
          this.comments=result.data.data
      })
    }
  },
  created() {
    this.getComment()
  }
}
</script>

<style scoped>
/*------- 评论模块样式-------*/
.comment-wrapper{
  max-width: 888px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
}



.btn-control {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
}

.btn-control .cancel {
  font-size: 16px;
  color: #606266;
  margin-right: 20px;
  cursor: pointer;
}

.comment {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-bottom: 1px solid #F2F6FC;
}

.comment .info {
  display: flex;
  align-items: center;
}

.comment .info .avatar {
  border-radius: 55%;
}

.comment .info .right{
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.comment .info .right .name{
  font-size: 16px;
  color:  #303133;
  margin-bottom: 5px;
  font-weight: 500;
}

.comment .info .right .date{
  font-size: 12px;
  color: #909399;
}

.comment .content{
  font-size: 16px;
  color: #303133;
  line-height: 20px;
  padding: 10px 0;
}
</style>