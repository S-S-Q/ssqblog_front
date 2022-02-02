<template>

  <el-form ref="form" :model="loginForm" class="loginContainer" :rules="rules" v-loading="loading">
    <h3 class="loginTitle">管理员登录</h3>
    <el-form-item prop="username">
      <el-input  type="text" v-model="loginForm.username" aria-placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input  type="password" v-model="loginForm.password" aria-placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-button type="primary" style="width: 100%" v-on:click="submitLogin">登录</el-button>
  </el-form>
</template>

<script>

export default {
  name: "Login",
  data(){
    return {
      loginForm:{
        username:'',
        password:''
      },
      loading: false,
      rules:{
        username: [{required:true ,message:"请输入用户名", trigger:"blur"}],
        password: [{required:true ,message:"请输入密码", trigger:"blur"}],
      }
    }
  },
  methods:{
    submitLogin(){
      //这个语句的意思为调用ref变量值为form的组件，导出的方法中的validate方法
      this.$refs.form.validate((valid) => {
        if (valid) {
          //存储全局地址
          const _this=this
          // then()用法是当前面的方法执行完后再执行then中的
          this.$axios.post('/user/login',this.loginForm).then(resp=>{
            const jwt=resp.headers['authorization']
            const userInfo=resp.data.data
            //存储用户信息
            _this.$store.commit('SET_TOKEN',jwt)
            _this.$store.commit('SET_USERINFO',userInfo)
            this.$message.success("登录成功")
            //路由跳转
            _this.$router.push("/")
          });
        } else {
          this.$message.error('用户名，或密码不能为空');
          return false;
        }
      });
    }
  }

}
</script>


<style scoped>
  .loginContainer{
  border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 15px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .loginTitle{
    margin:  0px auto 40px auto;
    text-align: center;
  }
</style>