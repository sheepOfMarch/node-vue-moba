import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import UserList from '../views/UserList.vue'
import UserCreate from '../views/UserCreate.vue'

import AdminUserCreate from '../views/AdminUserCreate'
import AdminUserList from '../views/AdminUserList'

Vue.use(VueRouter)

const routes = [
  {path: '/login', name: 'login', component: Login, meta: { isPublic: true }},
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {path: '/users/list', component: UserList},
      {path: '/users/create', component: UserCreate},

      {path: '/adminUsers/create', component: AdminUserCreate},
      {path: '/adminUsers/list', component: AdminUserList},
    ]
  },
  
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    next('/login')
  }
  next()
})

export default router
