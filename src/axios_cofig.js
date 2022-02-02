import axios from 'axios'
import router from "@/router";
import {Message} from "element-ui";
import store from "@/store";
const instance = axios.create()
//设置前缀
instance.defaults.baseURL='/api'

//拦截发出的请求 发起请求时做的配置 添加请求时的请求头信息等
instance.interceptors.request.use(config=>{
    if(store.state.token!=null)
    config.headers.Authorization = store.state.token
    return config
})

// 响应拦截器 用于每次请求时判断 然后响应
instance.interceptors.response.use(response=>{
        let res=response.data
        if(res.code===200){
            return response
        }//后端接受到数据但是后端觉得异常
        else{
            Message.error(res.message)
            //阻止继续前进
            return Promise.reject(response.data.message)
        }

    },
    error => {
        if(error.response.status===401){
            store.commit('REMOVE_INFO')
            Message.error("没有权限访问,请登录")
            router.push("/login")
        }else{
            Message.error(error.message)
            return Promise.reject(error)
        }
    }
)
export default instance