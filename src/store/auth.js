import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const token = ref(localStorage.getItem('token') || null)
  // [FIX] State baru untuk melacak apakah data user sudah selesai dimuat
  const isInitialized = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)

  // Actions
  const router = useRouter()

  async function login(credentials) {
    try {
      const response = await api.post('/api/login', credentials)

      const responseToken = response.data.token
      const responseUser = response.data.user

      token.value = responseToken
      user.value = responseUser

      localStorage.setItem('token', responseToken)
      localStorage.setItem('user', JSON.stringify(responseUser))

      api.defaults.headers.common['Authorization'] = `Bearer ${responseToken}`

      router.push({ name: 'dashboard' })
    } catch (error) {
      console.error('Login failed:', error)
      token.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      throw error
    }
  }

  async function fetchUser() {
    try {
      const response = await api.get('/api/user')
      user.value = response.data
      localStorage.setItem('user', JSON.stringify(response.data))
    } catch (error) {
      console.error('Failed to fetch user:', error)
      await logout()
    }
  }

  async function logout() {
    try {
      if (token.value) {
        await api.post('/api/logout')
      }
    } catch (error) {
      console.error('Server logout failed, logging out client-side.', error)
    } finally {
      user.value = null
      token.value = null
      isInitialized.value = false // Reset status saat logout
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      delete api.defaults.headers.common['Authorization']
      router.push({ name: 'login' })
    }
  }

  async function tryAutoLogin() {
    if (token.value) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      await fetchUser()
    }
    // [FIX] Tandai bahwa proses inisialisasi selesai
    isInitialized.value = true
  }

  return {
    user,
    token,
    isInitialized, // [FIX] Expose state baru
    isAuthenticated,
    currentUser,
    login,
    logout,
    tryAutoLogin,
  }
})
