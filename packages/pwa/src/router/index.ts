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
    name: 'home',
    component: () => import('@/views/HomeScreen.vue'),
  },
  {
    path: '/buildings',
    name: 'buildings',
    component: () => import('@/views/buildings/IndexView.vue'),
    meta: { shouldBeAuthenticated: true },
  },
  {
    path: '/buildings/:slug',
    name: 'building-details',
    component: () => import('@/views/buildings/_slug.vue'),
    meta: { shouldBeAuthenticated: true },
  },
  {
    path: '/myaccount',
    name: 'myaccount',
    component: () => import('@/views/MyAccountView.vue'),
    meta: { shouldBeAuthenticated: true },
  },

  // AUTHENTICATION ROUTES
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginScreen.vue'),
    //meta: { preventLoggedIn: true },
  },
  {
    path: '/register',
    name: 'register',
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
    next({ name: 'login' })
  }
  if (to.meta.preventLoggedIn && firebaseUser.value) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
