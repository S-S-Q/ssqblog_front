import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios_cofig'
import ElementUI, {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import highlight from 'highlight.js';
import * as echarts from 'echarts'



router.beforeEach((to,from,next)=>{
  if(to.matched.some(record=>record.meta.requireAuth)){
    if(store.state.login===true)
    {
      next()
    }
    else
    {
      Message.warning("需要登录才能访问")
      next({
        path:'/login'
      })
    }
  }
  else
  {
    next()
  }
})


//将代码高亮封装成一个指令
Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    highlight.highlightBlock(block)
  })
})


Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
