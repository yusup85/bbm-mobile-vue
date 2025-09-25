<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-3"
  >
    <!-- Background Decorative Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 animate-pulse"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-10"
      ></div>
    </div>

    <!-- Login Card -->
    <div class="relative w-full max-w-md">
      <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-5">
        <!-- Header Section -->
        <div class="text-center mb-8">
          <div class="w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <img
              src="data:image/png;base64,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"
              alt="Logo"
              class="w-16 h-16 mb-4"
            />
          </div>
          <h1
            class="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2"
          >
            Business Support Area Lumut Balai
          </h1>
          <p class="text-gray-600 font-medium">Selamat datang! Silakan login untuk melanjutkan</p>
        </div>
        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Field -->
          <div class="space-y-2">
            <label for="email" class="flex items-center text-sm font-semibold text-gray-700">
              <div
                class="w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md flex items-center justify-center mr-2"
              >
                <svg
                  class="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  ></path>
                </svg>
              </div>
              Email Address
            </label>
            <input
              v-model="credentials.email"
              type="email"
              id="email"
              required
              class="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 backdrop-blur-sm"
              placeholder="Masukkan email Anda"
            />
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <label for="password" class="flex items-center text-sm font-semibold text-gray-700">
              <div
                class="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-md flex items-center justify-center mr-2"
              >
                <svg
                  class="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
              </div>
              Password
            </label>
            <input
              v-model="credentials.password"
              type="password"
              id="password"
              required
              class="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-200 backdrop-blur-sm"
              placeholder="Masukkan password Anda"
            />
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <div class="flex items-center justify-center">
              <svg
                v-if="!loading"
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                ></path>
              </svg>
              <svg v-else class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ loading ? 'Sedang Masuk...' : 'Masuk' }}
            </div>
          </button>

          <!-- Error Message -->
          <div
            v-if="error"
            class="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-4"
          >
            <div class="flex items-center">
              <div
                class="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mr-3"
              >
                <svg
                  class="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <p class="text-red-700 font-semibold text-sm">{{ error }}</p>
            </div>
          </div>
        </form>

        <!-- Footer -->
        <div class="text-center mt-8 pt-6 border-t border-gray-100">
          <p class="text-xs text-gray-500">
            © 2025 Business Support Area Lumut Balai. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()
const credentials = ref({
  email: '',
  password: '',
})
const loading = ref(false)
const error = ref(null)

const handleLogin = async () => {
  loading.value = true
  error.value = null
  try {
    await authStore.login(credentials.value)
  } catch (err) {
    error.value = 'Email atau password salah.'
  } finally {
    loading.value = false
  }
}
</script>
