<template>
  <div class="max-w-md mx-auto h-screen flex flex-col font-sans bg-gray-100 dark:bg-gray-900">
    <main class="flex-grow overflow-y-auto pb-16">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Navigasi Bawah hanya muncul jika sudah login -->
    <BottomNav v-if="authStore.isAuthenticated" />

    <!-- Komponen untuk notifikasi (jika Anda membuatnya nanti) -->
    <!-- <ToastNotification /> -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import BottomNav from './components/BottomNav.vue'
import { useAuthStore } from './store/auth'

const authStore = useAuthStore()

// Saat aplikasi pertama kali dimuat, coba login otomatis jika ada token
onMounted(() => {
  authStore.tryAutoLogin()
})
</script>

<style>
/* Impor font global */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

/* Animasi transisi antar halaman */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
