import axios from 'axios';

const API_BASE_URL = 'https://flight-booking-system-1-gbwt.onrender.com/api' || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth Services
export const authService = {
  signup: (data) => apiClient.post('/auth/signup', data),
  login: (data) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  getCurrentUser: () => apiClient.get('/auth/me'),
  updateProfile: (data) => apiClient.put('/auth/profile', data),
};

// Flight Services
export const flightService = {
  getAllFlights: (params) => apiClient.get('/flights', { params }),
  getFlightById: (id) => apiClient.get(`/flights/${id}`),
  getCities: () => apiClient.get('/flights/cities'),
  createFlight: (data) => apiClient.post('/flights', data),
  updateFlight: (id, data) => apiClient.put(`/flights/${id}`, data),
  deleteFlight: (id) => apiClient.delete(`/flights/${id}`),
};

// Booking Services
export const bookingService = {
  createBooking: (data) => apiClient.post('/bookings', data),
  getUserBookings: () => apiClient.get('/bookings/user/bookings'),
  getBookingById: (id) => apiClient.get(`/bookings/${id}`),
  cancelBooking: (id) => apiClient.put(`/bookings/${id}/cancel`),
  getAllBookings: () => apiClient.get('/bookings'),
};

// Offer Services
export const offerService = {
  getOffers: () => apiClient.get('/offers'),
  getOfferById: (id) => apiClient.get(`/offers/${id}`),
  createOffer: (data) => apiClient.post('/offers', data),
  updateOffer: (id, data) => apiClient.put(`/offers/${id}`, data),
  deleteOffer: (id) => apiClient.delete(`/offers/${id}`),
  getAllOffers: () => apiClient.get('/offers/admin/all'),
};

export default apiClient;
