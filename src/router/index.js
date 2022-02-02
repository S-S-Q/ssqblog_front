import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Logout from "@/views/Logout";
import Blogs from '../views/BlogList.vue'
import BlogDetail from '../views/BlogDetail.vue'
import BlogEdit from '../views/BlogEdit.vue'
import BlogManage from '../views/BlogManage.vue'
import BlogTags from "../views/BlogTags.vue";
import BlogTagDetail from "../views/BlogTagDetail.vue"
import BlogSearch from "@/views/BlogSearch";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Blogs',
    component: ()=> import('../views/BlogList')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/manage',
    name: 'BlogManage',
    component: BlogManage,
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/search',
    name: 'BlogSearch',
    component: BlogSearch
  },
  {
    path: '/blog/add',
    name: 'BlogEdit',
    component: BlogEdit
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: BlogEdit
  },
  {
    path: '/tags',
    name: 'BlogTags',
    component: BlogTags
  }
  ,
  {
    path: '/tags/:tagName',
    name: 'BlogTagDetail',
    component: BlogTagDetail
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
