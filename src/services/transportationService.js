import api from './api'

export const transportationService = {
  // Mendapatkan semua data transportasi user
  async getAll() {
    try {
      const response = await api.get('/api/transportations')
      return response.data
    } catch (error) {
      console.error('Error fetching transportations:', error)
      throw error
    }
  },

  // Mendapatkan detail transportasi berdasarkan ID
  async getById(id) {
    try {
      const response = await api.get(`/api/transportations/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching transportation detail:', error)
      throw error
    }
  },

  // Membuat transportasi baru
  async create(data) {
    try {
      const response = await api.post('/api/transportations', data)
      return response.data
    } catch (error) {
      console.error('Error creating transportation:', error)
      throw error
    }
  },

  // Update transportasi (jika diperlukan di masa depan)
  async update(id, data) {
    const response = await api.put(`/api/transportations/${id}`, data)
    return response.data
  },

  // Hapus transportasi (jika diperlukan di masa depan)
  async delete(id) {
    const response = await api.delete(`/api/transportations/${id}`)
    return response.data
  }
}

export default transportationService
