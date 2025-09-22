<template>
  <nav
    class="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center shadow-lg"
  >
    <router-link to="/" class="nav-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
      <span class="text-xs font-medium">Home</span>
    </router-link>
    <router-link to="/history" class="nav-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span class="text-xs font-medium">BBM</span>
    </router-link>
    <router-link to="/transportation" class="nav-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10h10m-3 0h3V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v10z"
        />
      </svg>
      <span class="text-xs font-medium">Transportasi</span>
    </router-link>
    <router-link to="/booking" class="nav-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 14v6a2 2 0 002 2h4a2 2 0 002-2v-6a2 2 0 00-2-2h-4a2 2 0 00-2 2z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.5 14.5A5.5 5.5 0 0015 9h-4a5.5 5.5 0 00-5.5 5.5v.5h16v-.5z"
        />
      </svg>
      <span class="text-xs font-medium">Akomodasi</span>
    </router-link>
    <button @click="handleLogout" class="nav-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      <span class="text-xs font-medium">Logout</span>
    </button>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()

const handleLogout = () => {
  if (confirm('Apakah Anda yakin ingin logout?')) {
    authStore.logout()
  }
}
</script>

<style scoped>
.nav-btn {
  @apply flex flex-col items-center justify-center text-gray-500 dark:text-gray-400;
}
.router-link-exact-active {
  @apply text-indigo-600 dark:text-indigo-400;
}
</style>
