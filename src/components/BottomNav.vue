<template>
  <nav
    class="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-18 bg-white/90 backdrop-blur-lg border-t border-gray-100 flex justify-around items-center shadow-2xl rounded-t-3xl"
  >
    <router-link to="/" class="nav-btn group">
      <div class="nav-icon-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
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
      </div>
      <span class="nav-label">Home</span>
    </router-link>
    <router-link to="/history" class="nav-btn group">
      <div class="nav-icon-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
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
      </div>
      <span class="nav-label">BBM</span>
    </router-link>
    <router-link to="/transportation" class="nav-btn group">
      <div class="nav-icon-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
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
      </div>
      <span class="nav-label">Transport</span>
    </router-link>
    <router-link to="/booking" class="nav-btn group">
      <div class="nav-icon-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      </div>
      <span class="nav-label">Akomodasi</span>
    </router-link>
    <button @click="handleLogout" class="nav-btn group">
      <div class="nav-icon-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
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
      </div>
      <span class="nav-label">Logout</span>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  color: #6b7280;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border-radius: 16px;
  position: relative;
  background: transparent;
  border: none;
  min-width: 50px;
}

.nav-btn:hover {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  transform: translateY(-2px);
}

.nav-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 12px;
  background: rgba(239, 246, 255, 0.6);
  margin-bottom: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-btn:hover .nav-icon-container {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.nav-label {
  font-size: 10px;
  font-weight: 600;
  margin-top: 2px;
  transition: all 0.3s ease;
}

.nav-btn:hover .nav-label {
  color: #3b82f6;
  transform: scale(1.05);
}

/* Active state styles */
.router-link-exact-active {
  color: #3b82f6;
}

.router-link-exact-active .nav-icon-container {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}

.router-link-exact-active .nav-label {
  color: #3b82f6;
  font-weight: 700;
}

/* Special styling for active home button */
.router-link-exact-active[href='/'] .nav-icon-container {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.router-link-exact-active[href='/'] .nav-label {
  color: #ef4444;
}

/* Animation for icon container */
@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translateY(0) scale(1);
  }
  40%,
  43% {
    transform: translateY(-4px) scale(1.05);
  }
  70% {
    transform: translateY(-2px) scale(1.02);
  }
}

.nav-btn:active .nav-icon-container {
  animation: bounce 0.6s ease;
}

/* Backdrop blur support check */
@supports (backdrop-filter: blur(20px)) {
  nav {
    backdrop-filter: blur(20px);
  }
}
</style>
