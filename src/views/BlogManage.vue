<template>
<el-card class="wrapper">
  <el-collapse>
    <el-collapse-item name="1" class="deploy-setting">
      <template slot="title">
        <span class="my-collapse">博客管理</span>
      </template>
<!--      这里是折叠面板中的内容-->
      <el-card class="blog-wrapper">
        <el-row :gutter="10" class="topRow">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="addBlogOuterVisible=true" >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate" >修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete" >删除</el-button>
          </el-col>
        </el-row>
        <el-table  ref="multipleTable"
                   :data="blogTableData"
                   tooltip-effect="dark"
                   style="width: 100%"
                   @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"/>

          <el-table-column label="标题"  prop="title" width="175"/>
          <el-table-column label="创建时间"  prop="created" width="120"/>
          <el-table-column label="摘要" prop="description" width="200"/>
          <el-table-column label="是否公开" prop="status" show-overflow-tooltip>
            <template scope="scope">
              <el-switch
                  on-text ="是"
                  off-text = "否"
                  on-color="#5B7BFA"
                  off-color="#dadde5"
                  v-model="scope.row.status"
                  @change=change(scope.$index,scope.row)
              >
              </el-switch>
            </template>
          </el-table-column>

<!--          <el-table-column label="标签" show-overflow-tooltip/>-->
        </el-table>
      </el-card>
    </el-collapse-item>

<!--    用户资料管理折叠界面-->
    <el-collapse-item name="2" class="deploy-setting">
      <template slot="title">
        <span class="my-collapse">用户资料管理</span>
      </template>
      <el-card class="blog-wrapper">
        <el-upload
            class="upload-demo"
            ref="avatarUpload"
            action="str"
            :auto-upload="false"
            :limit="1"
            :http-request="avatarFileHttpRequest"
            :before-upload="avatarFileBeforeExcelUpload"
            list-type="picture">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">提交修改</el-button>
          <div slot="tip" class="el-upload__tip">这里是头像上传处，只能上传名称为avatar.svg的文件</div>
        </el-upload>

        <div class="max_max">
          <el-form  label-position="top" label-width="80px"  :model="userInfo">
            <el-form-item label="用户名">
              <el-input v-model="userInfo.username" size="small" style="width:80%;"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="userInfo.password" size="small" style="width:80%;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即修改</el-button>
            </el-form-item>
          </el-form>
        </div>


      </el-card>
    </el-collapse-item>
  </el-collapse>

<!--  弹出框 加入文件上传-->
  <el-dialog title="上传Blog" :visible.sync="addBlogOuterVisible">
    <div slot="footer" class="dialog-footer">
      <el-upload
          class="my-upload"
          drag
          ref="MyUpload"
          action="string"
          accept=".md"
          :limit="1"
          :http-request="mdFileHttpRequest"
          :before-upload="mdFileBeforeExcelUpload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-button @click="addBlogOuterVisible = false">取消</el-button>

    </div>
  </el-dialog>

</el-card >
</template>

<script>
import fs from 'fs';
import yaml from "js-yaml";
import {Message} from "element-ui";

export default {
  name: "BlogManage",
  data() {
    return {
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      //用于展现博客表的
      blogTableData:[],
      //这个管理添加博客 内部对话框的弹出的
      addBlogOuterVisible: false,
      fileAttribute:{},
      selectionId: {
        list:[]
      },
      userInfo: {
        username: '',
        password: '',
      }
    }
  },
  methods:{
    mdFileBeforeExcelUpload(file) {
      // 打印file，帮助我们了解我们需要的参数
      const isExcel = file.name.split(".")[1] === "md";
      const isSize = file.size / 1024 / 1024 < 10;
      if (!isExcel) {
        this.$message({
          message: "只能上传xls或xlsx文件!",
          type: "error"
        });
      }
      if (!isSize) {
        this.$message({
          message: "上传文件大小不能超过 10MB!",
          type: "error"
        });
      }
      return isExcel && isSize;
    },
    mdFileHttpRequest(params) {
      let fd = new FormData();
      fd.append("file", params.file);
      const _this=this
      this.$axios.post("/blog/add",fd).then(resp=>{
        if(resp.status===200)
        {
          Message.success(resp.data.message)
        }
        this.$refs.MyUpload.clearFiles()
        _this._data.addBlogOuterVisible=false
        this.getBlogList()
      })
    },
    avatarFileBeforeExcelUpload(file){
      const isExcel = file.name.split(".")[1] === "svg";
      const isSize = file.size / 1024 / 1024 < 10;
      if (!isExcel) {
        this.$message({
          message: "只能上传svg类型文件!",
          type: "error"
        });
      }
      if (!isSize) {
        this.$message({
          message: "上传文件大小不能超过 10MB!",
          type: "error"
        });
      }
      return isExcel && isSize;
    },
    avatarFileHttpRequest(params){
      console.log("调用了")
      let fd = new FormData();
      fd.append("file", params.file);
      const _this=this
      this.$axios.post("/user/updateUserAvatar",fd).then(result=>{
        if(result.status===200)
        {
          Message.success(result.data.message)
        }
      })
    },
    //获取博客列表
    getBlogList(){
      const _this=this
      this.$axios.get("/blog/getAllBlogList").then(resp=>{
        if(resp.status===200)
        {
          console.log(resp.data.message)
          _this._data.blogTableData=resp.data.data
        }
      })
    },
    handleSelectionChange(selection) {
      this.selectionId.list=[]
      selection.forEach(item=>{
        this.selectionId.list.push(item.id)
      })
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    //删除按钮绑定函数
    handleDelete(){
      this.$axios.post('/blog/deleteBlogById',this.selectionId).then(result=>{
        if(result.status===200)
        {
          Message.success("修改成功")
        }
        this.getBlogList()
      })
    },
    //启用按钮绑定函数
    change:function(index,row){
      let fd = new FormData();
      fd.append('id',row.id)
      fd.append('status',row.status)
      const _this=this
      this.$axios.post("/blog/updateBlogStatusById",fd)
          .then(result=>{
        if(result.status===200)
        {
          Message.success('修改成功')
        }
      })
    },
    //用于修改用户头像的按钮
    submitUpload(){
      this.$refs.avatarUpload.submit()
    },
    //用于修改用户资料的按钮
    onSubmit() {
      let fd = new FormData();
      fd.append("oldUsername", this.$store.state.userInfo.username);
      fd.append("newUsername",this.userInfo.username);
      fd.append("password",this.userInfo.password)
      const _this=this
      this.$axios.post("/user/updateUserInfo",fd).then(result=>{
        if(result.status===200&&result.data.code===200)
        {
          this.$message({
            message: '修改成功 请重新登录',
            type: 'success'
          });
          _this.$store.commit('REMOVE_INFO')
          _this.$router.replace("/login")
        }
      })
    }
  },
  created() {
    this.getBlogList()
  }
}
</script>



<style scoped>
.wrapper {
  width: 888px;
  margin: 0 auto;
}

/*折叠面板样式*/
>>> .el-collapse-item__arrow{
  float : left;
  margin-left:5px;
  margin-right:15px;
}

>>> .el-collapse {
  border: 0;
}

.deploy-setting >>> .el-collapse-item__header {
  border-bottom: 1px solid #2C8DF4;
}

.deploy-setting >>> .el-collapse-item__wrap{
  border-bottom:0px;
}

.my-collapse{
  float:left;
  font-weight:bold;
  font-size:20px;
  color:#2C8DF4;
}

/*博客管理页面样式*/

.blog-wrapper
{
  width: 95%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}

.blog-wrapper .topRow {
  margin-bottom: 10px;
  float: left;
}

.my-upload{
  margin-right: 200px;
}

.max_max{
  width: 800px;
}
</style>