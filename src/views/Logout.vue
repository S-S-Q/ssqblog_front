<template>

</template>

<script>
import {Message} from "element-ui";
import router from "@/router";

export default {
  name: "Logout",
  methods:{
    logout(){
      this.$axios.post("/user/logout").then(result=>{
        if(result.data.code===200)
        {
          Message.success("退出登录成功")
          this.$router.push('/')
          this.$store.commit('REMOVE_INFO')
        }
        else
        {
          Message.success("退出登录失败")
          this.$router.push('/')
        }
      })
    }
  },
  created() {
    this.logout()
  }
}
</script>

<style scoped>

</style>