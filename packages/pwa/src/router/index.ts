import useFirebase from '@/composables/useFirebase'
import {
  createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
} from 'vue-router'

// ROUTES
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/HomeScreen.vue'),
  },
  {
    path: '/buildings',
    component: () => import('@/views/buildings/IndexView.vue'),
    meta: { shouldBeAuthenticated: true },
  },

  // AUTHENTICATION ROUTES
  {
    path: '/login',
    component: () => import('@/views/auth/LoginScreen.vue'),
    //meta: { preventLoggedIn: true },
  },
  {
    path: '/register',
    component: () => import('@/views/auth/RegisterScreen.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue'),
  },
]

// THE ROUTER ITSELF
const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const { firebaseUser } = useFirebase()

  if (to.meta.shouldBeAuthenticated && !firebaseUser.value) {
    next({ path: '/login' })
  }
  if (to.meta.preventLoggedIn && firebaseUser.value) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
