import api from './api'

export const bookingService = {
  // Mendapatkan semua booking user
  async getBookings() {
    try {
      const response = await api.get('/api/bookings')
      return response.data
    } catch (error) {
      console.error('Error fetching bookings:', error)
      throw error
    }
  },

  // Mendapatkan detail booking
  async getBooking(id) {
    try {
      const response = await api.get(`/api/bookings/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching booking:', error)
      throw error
    }
  },

  // Membuat booking baru
  async createBooking(bookingData) {
    try {
      const response = await api.post('/api/bookings', bookingData)
      return response.data
    } catch (error) {
      console.error('Error creating booking:', error)
      throw error
    }
  },

  // Update booking
  async updateBooking(id, bookingData) {
    try {
      const response = await api.put(`/api/bookings/${id}`, bookingData)
      return response.data
    } catch (error) {
      console.error('Error updating booking:', error)
      throw error
    }
  },

  // Hapus booking
  async deleteBooking(id) {
    try {
      await api.delete(`/api/bookings/${id}`)
      return true
    } catch (error) {
      console.error('Error deleting booking:', error)
      throw error
    }
  },

  // Kalkulasi harga booking
  async calculatePrice(data) {
    try {
      const response = await api.post('/api/bookings/calculate-price', data)
      return response.data
    } catch (error) {
      console.error('Error calculating price:', error)
      throw error
    }
  },

  // Mendapatkan semua rooms
  async getRooms() {
    try {
      const response = await api.get('/api/rooms')
      return response.data
    } catch (error) {
      console.error('Error fetching rooms:', error)
      throw error
    }
  },

  // Mendapatkan available rooms
  async getAvailableRooms(checkInDate, checkOutDate) {
    try {
      const response = await api.get('/api/rooms/available', {
        params: {
          check_in_date: checkInDate,
          check_out_date: checkOutDate
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching available rooms:', error)
      throw error
    }
  },

  // Mendapatkan extra services
  async getExtraServices() {
    try {
      const response = await api.get('/api/extra-services')
      return response.data
    } catch (error) {
      console.error('Error fetching extra services:', error)
      throw error
    }
  },

  // Kirim notifikasi WhatsApp
  async sendWhatsAppNotification(bookingId) {
    try {
      const response = await api.post(`/api/bookings/${bookingId}/send-whatsapp`)
      return response.data
    } catch (error) {
      console.error('Error sending WhatsApp notification:', error)
      throw error
    }
  }
}
