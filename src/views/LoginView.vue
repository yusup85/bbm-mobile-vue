<template>
  <div class="flex flex-col items-center justify-center h-full p-6 bg-white">
    <div class="text-center mb-8">
      <svg
        class="mx-auto h-12 w-auto text-indigo-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h.008M12 3.375l-.94-2.495A2.25 2.25 0 0 0 8.816.03L3 2.625m9 1.125-2.25 6m2.25-6-2.25-3M12 3.375l2.25-3m-2.25 3-2.25 6m13.5 9.75-2.06-5.487a2.25 2.25 0 0 0-4.228-1.026L12 12.75l-2.484-2.11a2.25 2.25 0 0 0-2.792.439L3 13.125m18 6.375v-2.25m0 2.25-3-3.375"
        />
      </svg>
      <h1 class="text-2xl font-bold mt-4 text-gray-900">Sistem BBM Mobile</h1>
      <p class="text-gray-600">Silakan login untuk melanjutkan</p>
    </div>
    <form @submit.prevent="handleLogin" class="w-full">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="credentials.email"
          type="email"
          id="email"
          required
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          v-model="credentials.password"
          type="password"
          id="password"
          required
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-semibold disabled:bg-indigo-400"
      >
        {{ loading ? 'Loading...' : 'Login' }}
      </button>
      <p v-if="error" class="text-red-500 text-sm mt-2 text-center">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()
const credentials = ref({
  email: 'admin@admin.com',
  password: 'password',
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
