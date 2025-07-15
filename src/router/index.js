import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import HistoryView from '../views/HistoryView.vue'
import ApprovalsView from '../views/ApprovalsView.vue'
import DetailView from '../views/DetailView.vue'
import RequestFormView from '../views/RequestFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView,
      meta: { requiresAuth: true },
    },
    {
      path: '/approvals',
      name: 'approvals',
      component: ApprovalsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/request/new',
      name: 'request-new',
      component: RequestFormView,
      meta: { requiresAuth: true },
    },
    {
      path: '/request/:id',
      name: 'request-detail',
      component: DetailView,
      meta: { requiresAuth: true },
    },
  ],
})

// [FIX] Navigation Guard yang diperbarui
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Jika auth store belum diinisialisasi, jalankan tryAutoLogin dan tunggu
  if (!authStore.isInitialized) {
    await authStore.tryAutoLogin()
  }

  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !authStore.isAuthenticated) {
    // Jika rute butuh login dan pengguna tidak terotentikasi, redirect ke login
    next({ name: 'login' })
  } else if (to.name === 'login' && authStore.isAuthenticated) {
    // Jika pengguna sudah login dan mencoba akses halaman login, redirect ke dashboard
    next({ name: 'dashboard' })
  } else {
    // Lanjutkan navigasi
    next()
  }
})

export default router
