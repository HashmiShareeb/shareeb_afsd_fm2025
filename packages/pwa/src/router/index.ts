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
    path: '/user',
    name: 'userhome',
    component: () => import('@/views/user/HomeScreen.vue'),
    meta: { shouldBeAuthenticated: true, role: Role.USER },
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
    props: true,
  },
  {
    path: '/rounds',
    name: 'rounds',
    component: () => import('@/views/rounds/indexView.vue'),
    meta: { shouldBeAuthenticated: true },
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('@/views/user/reports/reportScreen.vue'),
    meta: { shouldBeAuthenticated: true, role: Role.USER },
  },
  {
    path: '/myaccount',
    name: 'myaccount',
    component: () => import('@/views/MyAccountView.vue'),
    meta: { shouldBeAuthenticated: true },
  },
  //CONCIERGES
  {
    path: '/concierge/home',
    name: 'concierge-home',
    component: () => import('@/views/concierge/HomeScreen.vue'),
    meta: { shouldBeAuthenticated: true, role: Role.MANAGER },
  },
  {
    path: '/concierge/energy_reading',
    name: 'concierge-energy-reading',
    component: () => import('@/views/concierge/energy/energyReadings.vue'),
    meta: { shouldBeAuthenticated: true, role: Role.MANAGER },
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
  {
    path: '/admin/rounds',
    name: 'admin-rounds',
    component: () => import('@/views/admin/rounds/IndexView.vue'),
    meta: { shouldBeAuthenticated: true, role: Role.ADMIN },
  },
  {
    path: '/admin/energy_reading',
    name: 'admin-energy-reading',
    component: () => import('@/views/admin/energy/energyReadings.vue'),
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
      if (!role) {
        // No role found, redirect to home --> fallback route
        return next({ name: 'home' })
      }
      // Redirect to the correct route based on role if not matching
      if (role !== to.meta.role) {
        switch (role) {
          case Role.ADMIN:
            return next({ name: 'admin' })
          case Role.MANAGER:
            return next({ name: 'concierge-home' })
          case Role.USER:
            return next({ name: 'userhome' })
          default:
            return next({ name: 'home' })
        }
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
