import {
  createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
} from 'vue-router'

// ROUTES
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('../views/auth/LoginScreen.vue'),
  },
  {
    path: '/register',
    component: () => import('../views/auth/RegisterScreen.vue'),
  },
]

// THE ROUTER ITSELF
const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
