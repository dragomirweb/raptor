
const routes = [
  {
    path: '/',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('pages/Dashboard.vue') }
    ]
  },
  {
    path: '/profile',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('pages/Profile.vue') }
    ]
  },
  {
    path: '/integration',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('pages/Integration.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
