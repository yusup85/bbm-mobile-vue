<template>
  <div>
    <!-- Header -->
    <header
      class="p-4 flex items-center gap-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-10"
    >
      <button @click="goBack" class="text-gray-700 dark:text-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-xl font-bold text-gray-900 dark:text-white">Detail Permintaan</h1>
    </header>

    <!-- Konten Detail -->
    <div class="p-4">
      <div v-if="loading" class="text-center py-10"><p>Loading...</p></div>
      <div v-else-if="error" class="text-center text-red-500 py-10">
        <p>Gagal memuat detail permintaan.</p>
        <p class="text-sm">{{ error }}</p>
      </div>
      <div v-else-if="request" class="space-y-6">
        <!-- Bagian Aksi yang Tersedia -->
        <section v-if="availableAction" class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 class="text-lg font-semibold mb-3">Aksi yang Tersedia</h2>
          <button
            @click="openActionModal(availableAction.type)"
            :class="availableAction.buttonClass"
            class="w-full text-white py-2.5 px-4 rounded-md font-semibold"
          >
            {{ availableAction.label }}
          </button>
        </section>

        <!-- Info Utama & Kendaraan -->
        <section class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 class="text-lg font-semibold mb-3 border-b pb-2 dark:border-gray-700">
            Informasi Permintaan
          </h2>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500 dark:text-gray-400">No. Form</span
              ><span class="font-medium text-right">{{ request.no_form }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500 dark:text-gray-400">Tanggal</span
              ><span class="font-medium">{{ formattedDate }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-500 dark:text-gray-400">Status</span
              ><span class="text-xs font-semibold px-2 py-1 rounded-full" :class="statusColor">{{
                request.status
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500 dark:text-gray-400">Jenis Kendaraan</span
              ><span class="font-medium text-right">{{ jenisKendaraanNama }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500 dark:text-gray-400">No. Polisi</span
              ><span class="font-medium">{{ request.no_polisi }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500 dark:text-gray-400">Jenis BBM</span
              ><span class="font-medium">{{ bbmNama }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500 dark:text-gray-400">Volume Diajukan</span
              ><span class="font-medium">{{ request.volume }} Liter</span>
            </div>
            <div v-if="request.volume_disetujui" class="flex justify-between">
              <span class="text-gray-500 dark:text-gray-400">Volume Disetujui</span
              ><span class="font-medium text-green-600">{{ request.volume_disetujui }} Liter</span>
            </div>
          </div>
        </section>

        <!-- Bagian Foto Bukti Pengeluaran -->
        <section
          v-if="request.evidence_photo_path"
          class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
        >
          <h2 class="text-lg font-semibold mb-3 border-b pb-2 dark:border-gray-700">
            Foto Bukti Pengeluaran
          </h2>
          <img
            :src="request.evidence_photo_path"
            alt="Foto Bukti"
            class="w-full rounded-lg cursor-pointer"
            @click="showFullImage = true"
          />
        </section>

        <!-- Alur Persetujuan -->
        <section class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 class="text-lg font-semibold mb-3 border-b pb-2 dark:border-gray-700">
            Alur Persetujuan
          </h2>
          <div class="grid grid-cols-2 gap-4">
            <ApprovalSignature
              title="Pemohon"
              :user="request.pemohon"
              :signature="request.tanda_tangan_pemohon"
            />
            <ApprovalSignature
              title="Disetujui oleh"
              :user="request.penyetuju"
              :signature="request.tanda_tangan_penyetuju"
            />
            <ApprovalSignature
              title="Dikeluarkan oleh"
              :user="request.dikeluarkan_oleh"
              :signature="request.tanda_tangan_dikeluarkan"
            />
            <ApprovalSignature
              title="Diperiksa oleh"
              :user="request.pemeriksa"
              :signature="request.tanda_tangan_pemeriksa"
            />
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
      class="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
    >
      <img :src="request.evidence_photo_path" class="max-w-full max-h-full rounded-lg" />
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
    diajukan: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    disetujui_atasan: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    // [FIX] Menambahkan status 'dikeluarkan_operator' untuk pewarnaan yang benar
    dikeluarkan_operator: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    diperiksa: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    selesai: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    ditolak: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
})

onMounted(() => {
  fetchRequestDetails()
})
</script>
