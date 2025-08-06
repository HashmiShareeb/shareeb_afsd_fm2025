import {
  createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
} from 'vue-router'
import { getAuth } from 'firebase/auth'
import useCustomUser from '@/composables/useCustomUser'
import { Role } from '@/interfaces/custom.user.interface'

// Routes
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
    path: '/rounds',
    name: 'rounds',
    component: () => import('@/views/rounds/indexView.vue'),
    meta: { shouldBeAuthenticated: true },
  },
  {
    path: '/myaccount',
    name: 'myaccount',
    component: () => import('@/views/MyAccountView.vue'),
    meta: { shouldBeAuthenticated: true },
  },

  // ADMIN ROUTES
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/adminHomeScreen.vue'),
    meta: { shouldBeAuthenticated: true, role: Role.ADMIN },
  },
  {
    path: '/admin/buildings',
    name: 'admin-buildings',
    component: () => import('@/views/admin/buildings/IndexView.vue'),
    meta: { shouldBeAuthenticated: true, role: Role.ADMIN },
  },
  {
    path: '/admin/buildings/:slug',
    name: 'admin-building-details',
    component: () => import('@/views/admin/buildings/_slug.vue'),
    meta: { shouldBeAuthenticated: true, role: Role.ADMIN },
  },
  // {
  //   path: '/admin/buildings/:slug/add',
  //   name: 'admin-building-edit',
  //   component: () => import('@/views/admin/buildings/editBuildingView.vue'),
  //   meta: { shouldBeAuthenticated: true, role: Role.ADMIN },
  // },
  //AUTHENTICATION ROUTES
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginScreen.vue'),
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

// Router
const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach(async (to, from, next) => {
//   const auth = getAuth()
//   const firebaseUser = auth.currentUser

//   // Check authentication
//   if (to.meta.shouldBeAuthenticated && !firebaseUser) {
//     return next({ name: 'login' })
//   }

//   // Check role-based access
//   if (to.meta.role) {
//     if (!firebaseUser) {
//       return next({ name: 'login' })
//     }

//     const { userRole, restoreCustomUser } = useCustomUser()
//     try {
//       await restoreCustomUser() // Fetch user role
//       const role = userRole.value
//       if (role !== to.meta.role) {
//         console.log(
//           `Access denied: Required role ${to.meta.role}, but user has ${role}`,
//         )
//         return next({ name: 'home' })
//       }
//     } catch (error) {
//       console.error('Error fetching user role:', error)
//       return next({ name: 'home' })
//     }
//   }

//   // Prevent logged-in users from accessing login/register
//   if (to.meta.preventLoggedIn && firebaseUser) {
//     return next({ name: 'home' })
//   }

//   return next()
// })

router.beforeEach(async (to, from, next) => {
  const auth = getAuth()
  const firebaseUser = auth.currentUser

  // Check authentication
  if (to.meta.shouldBeAuthenticated && !firebaseUser) {
    return next({ name: 'login' })
  }

  // Check role-based access
  if (to.meta.role) {
    if (!firebaseUser) {
      return next({ name: 'login' })
    }

    const { userRole, restoreCustomUser } = useCustomUser()
    try {
      await restoreCustomUser() // Fetch user role
      const role = userRole.value
      if (role !== to.meta.role) {
        console.log(
          `Access denied: Required role ${to.meta.role}, but user has ${role}`,
        )
        return next({ name: 'home' })
      }
    } catch (error) {
      console.error('Error fetching user role:', error)
      return next({ name: 'home' })
    }
  }

  // Redirect admin users to admin home if they try to access the regular home
  if (to.name === 'home') {
    const { userRole, restoreCustomUser } = useCustomUser()
    try {
      await restoreCustomUser() // Fetch user role
      const role = userRole.value
      if (role === Role.ADMIN) {
        return next({ name: 'admin' })
      }
    } catch (error) {
      console.error('Error fetching user role:', error)
    }
  }

  // Prevent logged-in users from accessing login/register
  if (to.meta.preventLoggedIn && firebaseUser) {
    return next({ name: 'home' })
  }

  return next()
})
export default router
