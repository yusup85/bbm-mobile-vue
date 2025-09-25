<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Modern Header Section -->
    <div class="bg-white shadow-sm p-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div
            class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Detail Permintaan</h1>
            <p class="text-gray-600 text-sm">Informasi lengkap permintaan BBM</p>
          </div>
        </div>
        <button
          @click="goBack"
          class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl font-semibold"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali
        </button>
      </div>
    </div>

    <!-- Konten Detail -->
    <div class="p-3">
      <!-- Loading State -->
      <div v-if="loading" class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 text-center">
          <div
            class="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="animate-spin h-8 w-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
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
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Memuat Detail...</h3>
          <p class="text-gray-600">Sedang mengambil informasi permintaan BBM</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="max-w-4xl mx-auto">
        <div
          class="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-5 text-center shadow-lg"
        >
          <div
            class="w-16 h-16 bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">⚠️ Gagal Memuat Detail</h3>
          <p class="text-red-700 mb-2">Gagal memuat detail permintaan.</p>
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>
      </div>

      <!-- Main Content -->
      <div v-else-if="request" class="max-w-4xl mx-auto space-y-8">
        <!-- Bagian Aksi yang Tersedia -->
        <section
          v-if="availableAction"
          class="bg-white rounded-2xl shadow-lg p-5 border border-gray-100"
        >
          <div class="flex items-center mb-6">
            <div
              class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-900">⚡ Aksi yang Tersedia</h2>
          </div>
          <button
            @click="openActionModal(availableAction.type)"
            :class="availableAction.buttonClass"
            class="w-full text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <svg
              v-if="availableAction.type === 'approve'"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <svg
              v-else-if="availableAction.type === 'issue'"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              ></path>
            </svg>
            <svg
              v-else-if="availableAction.type === 'check'"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              ></path>
            </svg>
            {{ availableAction.label }}
          </button>
        </section>

        <!-- Info Utama & Kendaraan -->
        <section class="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
          <div class="flex items-center mb-6">
            <div
              class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-900">📋 Informasi Permintaan</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-200"
            >
              <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg
                  class="w-5 h-5 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
                Detail Formulir
              </h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center py-2 border-b border-blue-200">
                  <span class="text-sm font-semibold text-gray-600">📄 No. Form</span>
                  <span
                    class="font-bold text-blue-900 bg-blue-100 px-3 py-1 rounded-full text-sm"
                    >{{ request.no_form }}</span
                  >
                </div>
                <div class="flex justify-between items-center py-2 border-b border-blue-200">
                  <span class="text-sm font-semibold text-gray-600">📅 Tanggal</span>
                  <span class="font-medium text-gray-900">{{ formattedDate }}</span>
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="text-sm font-semibold text-gray-600">🏷️ Status</span>
                  <span class="text-sm font-bold px-3 py-1 rounded-full" :class="statusColor">{{
                    request.status
                  }}</span>
                </div>
              </div>
            </div>

            <div
              class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200"
            >
              <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg
                  class="w-5 h-5 mr-2 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
                Data Kendaraan
              </h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center py-2 border-b border-green-200">
                  <span class="text-sm font-semibold text-gray-600">🚗 Jenis Kendaraan</span>
                  <span
                    class="font-medium text-gray-900 bg-green-100 px-3 py-1 rounded-full text-sm"
                    >{{ jenisKendaraanNama }}</span
                  >
                </div>
                <div class="flex justify-between items-center py-2 border-b border-green-200">
                  <span class="text-sm font-semibold text-gray-600">🏷️ No. Polisi</span>
                  <span class="font-bold text-green-900">{{ request.no_polisi }}</span>
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="text-sm font-semibold text-gray-600">⛽ Jenis BBM</span>
                  <span
                    class="font-medium text-gray-900 bg-green-100 px-3 py-1 rounded-full text-sm"
                    >{{ bbmNama }}</span
                  >
                </div>
              </div>
            </div>

            <div
              class="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-3 border border-orange-200 md:col-span-2"
            >
              <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg
                  class="w-5 h-5 mr-2 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  ></path>
                </svg>
                Informasi Volume
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="text-center bg-white rounded-xl p-4 border border-orange-200">
                  <div class="text-3xl font-bold text-orange-600 mb-2">{{ request.volume }}</div>
                  <div class="text-sm font-semibold text-gray-600">📊 Volume Diajukan (Liter)</div>
                </div>
                <div
                  v-if="request.volume_disetujui"
                  class="text-center bg-white rounded-xl p-4 border border-green-200"
                >
                  <div class="text-3xl font-bold text-green-600 mb-2">
                    {{ request.volume_disetujui }}
                  </div>
                  <div class="text-sm font-semibold text-gray-600">✅ Volume Disetujui (Liter)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Bagian Foto Bukti Pengeluaran -->
        <section
          v-if="request.evidence_photo_path"
          class="bg-white rounded-2xl shadow-lg p-5 border border-gray-100"
        >
          <div class="flex items-center mb-6">
            <div
              class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-3"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-900">📸 Foto Bukti Pengeluaran</h2>
          </div>

          <div
            class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-3 border-2 border-purple-200"
          >
            <div class="bg-white rounded-xl p-4 shadow-inner">
              <img
                :src="request.evidence_photo_path"
                alt="Foto Bukti"
                class="w-full rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg"
                @click="showFullImage = true"
              />
            </div>
            <div class="mt-4 text-center">
              <p class="text-sm text-purple-700 font-medium">
                📱 Klik gambar untuk melihat ukuran penuh
              </p>
            </div>
          </div>
        </section>

        <!-- Alur Persetujuan -->
        <section class="bg-white rounded-2xl shadow-lg p-2 border border-gray-100">
          <div class="flex items-center mb-3">
            <div
              class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-3"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-900">✍️ Alur Persetujuan Digital</h2>
          </div>

          <div
            class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-1 border-2 border-indigo-200"
          >
            <div class="grid grid-cols-2 md:grid-cols-2 gap-1">
              <div class="bg-white rounded-xl p-0 shadow-sm border border-indigo-100 py-2">
                <ApprovalSignature
                  title="👤 Pemohon"
                  :user="request.pemohon"
                  :signature="request.tanda_tangan_pemohon"
                />
              </div>
              <div class="bg-white rounded-xl p-0 shadow-sm border border-green-100">
                <ApprovalSignature
                  title="✅ Disetujui oleh"
                  :user="request.penyetuju"
                  :signature="request.tanda_tangan_penyetuju"
                />
              </div>
              <div class="bg-white rounded-xl p-0 shadow-sm border border-orange-100">
                <ApprovalSignature
                  title="📦 Dikeluarkan oleh"
                  :user="request.dikeluarkan_oleh"
                  :signature="request.tanda_tangan_dikeluarkan"
                />
              </div>
              <div class="bg-white rounded-xl p-0 shadow-sm border border-purple-100">
                <ApprovalSignature
                  title="🔍 Diperiksa oleh"
                  :user="request.pemeriksa"
                  :signature="request.tanda_tangan_pemeriksa"
                />
              </div>
            </div>

            <!-- Progress Indicator -->
            <div class="mt-8 pt-6 border-t border-indigo-200">
              <div
                class="flex items-center justify-between text-sm font-medium text-indigo-700 mb-2"
              >
                <span>Progress Persetujuan</span>
                <span>{{ getProgressPercentage() }}%</span>
              </div>
              <div class="w-full bg-indigo-100 rounded-full h-3">
                <div
                  class="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  :style="{ width: getProgressPercentage() + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Modal Aksi -->
    <ActionModal
      v-if="showModal"
      :action-type="currentAction"
      :request="request"
      @close="showModal = false"
      @confirm="handleActionConfirm"
    />

    <!-- Modal untuk melihat foto ukuran penuh -->
    <div
      v-if="showFullImage"
      @click="showFullImage = false"
      class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-3"
    >
      <div class="relative max-w-6xl max-h-full">
        <button
          @click="showFullImage = false"
          class="absolute -top-4 -right-4 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-2 shadow-lg transition-colors duration-200 z-10"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <img
          :src="request.evidence_photo_path"
          class="max-w-full max-h-full rounded-2xl shadow-2xl"
          alt="Foto Bukti Pengeluaran"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'
import { useAuthStore } from '../store/auth'
import ApprovalSignature from '../components/ApprovalSignature.vue'
import ActionModal from '../components/ActionModal.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const request = ref(null)
const loading = ref(true)
const error = ref(null)

const showModal = ref(false)
const currentAction = ref('')
const showFullImage = ref(false)

const fetchRequestDetails = async () => {
  const requestId = route.params.id
  loading.value = true
  error.value = null
  try {
    const response = await api.get(`/api/permintaan-bbm/${requestId}`)
    request.value = response.data.data
  } catch (err) {
    console.error('Failed to fetch request details:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.go(-1)
}

const availableAction = computed(() => {
  if (
    !request.value ||
    !authStore.isAuthenticated ||
    !authStore.currentUser ||
    !authStore.currentUser.roles
  ) {
    return null
  }

  const userRoles = authStore.currentUser.roles.map((r) => r.name)
  const status = request.value.status.toLowerCase()

  if ((userRoles.includes('atasan') || userRoles.includes('admin')) && status === 'diajukan') {
    return {
      type: 'approve',
      label: 'Setujui Permintaan',
      buttonClass: 'bg-green-600 hover:bg-green-700',
    }
  }
  if (
    (userRoles.includes('operator') || userRoles.includes('admin')) &&
    status === 'disetujui_atasan'
  ) {
    return {
      type: 'issue',
      label: 'Keluarkan BBM',
      buttonClass: 'bg-yellow-500 hover:bg-yellow-600',
    }
  }
  // [FIX] Mengubah 'dikeluarkan' menjadi 'dikeluarkan_operator' agar cocok dengan status dari backend
  if (
    (userRoles.includes('pemeriksa') || userRoles.includes('admin')) &&
    status === 'dikeluarkan_operator'
  ) {
    return {
      type: 'check',
      label: 'Periksa Permintaan',
      buttonClass: 'bg-blue-600 hover:bg-blue-700',
    }
  }

  return null
})

const openActionModal = (actionType) => {
  currentAction.value = actionType
  showModal.value = true
}

const handleActionConfirm = async (payload) => {
  const actionMap = {
    approve: 'setujui',
    issue: 'keluarkan',
    check: 'periksa',
  }
  const endpoint = `/api/permintaan-bbm/${request.value.id}/${actionMap[currentAction.value]}`

  try {
    await api.post(endpoint, payload)
    showModal.value = false
    alert('Aksi berhasil dilakukan!')
    await fetchRequestDetails() // Refresh data detail
  } catch (err) {
    console.error(`Failed to ${currentAction.value} request:`, err)
    alert(`Gagal melakukan aksi: ${err.response?.data?.message || err.message}`)
  }
}

const jenisKendaraanNama = computed(() => request.value?.jenis_kendaraan?.nama || 'N/A')
const bbmNama = computed(() => request.value?.jenis_bbm?.nama || 'N/A')

const formattedDate = computed(() => {
  if (!request.value?.tanggal) return 'Invalid Date'
  return new Date(request.value.tanggal).toLocaleString('id-ID', {
    dateStyle: 'long',
    timeStyle: 'short',
  })
})

const statusColor = computed(() => {
  if (!request.value) return ''
  const status = request.value.status.toLowerCase()
  const colors = {
    diajukan: 'bg-blue-100 text-blue-800',
    disetujui_atasan: 'bg-green-100 text-green-800',
    // [FIX] Menambahkan status 'dikeluarkan_operator' untuk pewarnaan yang benar
    dikeluarkan_operator: 'bg-yellow-100 text-yellow-800',
    diperiksa: 'bg-purple-100 text-purple-800',
    selesai: 'bg-gray-100 text-gray-800',
    ditolak: 'bg-red-100 text-red-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
})

const getProgressPercentage = () => {
  if (!request.value) return 0

  const status = request.value.status.toLowerCase()
  const progressMap = {
    diajukan: 25,
    disetujui_atasan: 50,
    dikeluarkan_operator: 75,
    diperiksa: 100,
    selesai: 100,
    ditolak: 0,
  }

  return progressMap[status] || 0
}

onMounted(() => {
  fetchRequestDetails()
})
</script>
