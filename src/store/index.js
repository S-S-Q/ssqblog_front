import Vue from 'vue'
import Vuex from 'vuex'
import login from "@/views/Login";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //数据存放的位置
    token:localStorage.getItem("token"),
    userInfo:JSON.parse(sessionStorage.getItem("userInfo")),
    login: Boolean(localStorage.getItem('login')),
  },
  mutations: {
    //类似于set方法 state是指上面那个,token是自己传进来的值。
    SET_TOKEN: (state,token)=>{
      state.token=token
      //存储进本地
      localStorage.setItem("token",token)
      state.login=true
      localStorage.setItem("login",state.login===true?"true":"");
    },
    SET_USERINFO: (state,userInfo)=>{
      state.userInfo=userInfo
      sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state)=>{
      state.token=''
      state.userInfo={}
      state.login=false
      localStorage.setItem("token",'')
      localStorage.setItem("login","")
      sessionStorage.setItem("userInfo",JSON.stringify(''))
    }
  },
  getters: {
    //类似于get方法
    getUserInfo:state=>{
      return state.userInfo
    }
  },
  actions: {

  },
  modules: {

  }
})
