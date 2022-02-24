import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Allposts from '../views/Allposts.vue'

import Createpost from '../views/Createpost.vue'
import Modifypost from '../views/Modifypost.vue'
import Post from '../views/Post.vue'
import Adminposts from '../views/Adminposts.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/allposts',
    name: 'Allposts',
    component: Allposts
  },
  
  {
    path: '/post/',
    name: 'Post',
    component: Post
  },
 
  {
    path: '/createPost',
    name: 'CreatePost',
    component: Createpost
  },
  {
    path: '/modifypost/:id',
    name: 'ModifyPost',
    component: Modifypost
  },
  {
    path: '/admin/posts',
    name: 'AdminPosts',
    component: Adminposts
  },
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
