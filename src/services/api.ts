/**
 * NammaServe API Client
 * Centralized HTTP service for connecting the React frontend to the
 * Java Spring Boot REST backend running on http://localhost:8080/api.
 */

const API_BASE_URL = 'http://localhost:8080/api';

class ApiClient {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('localfix_jwt_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  }

  async get<T>(endpoint: string): Promise<T | null> {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      if (!res.ok) return null;
      const json = await res.json();
      return json.data;
    } catch {
      return null;
    }
  }

  async post<T>(endpoint: string, body: any): Promise<T | null> {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body)
      });
      if (!res.ok) return null;
      const json = await res.json();
      return json.data;
    } catch {
      return null;
    }
  }

  async patch<T>(endpoint: string, body: any): Promise<T | null> {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(body)
      });
      if (!res.ok) return null;
      const json = await res.json();
      return json.data;
    } catch {
      return null;
    }
  }
}

export const api = new ApiClient();

// API Helper modules
export const authApi = {
  login: (email: string, password: string) => api.post<any>('/auth/login', { email, password }),
  register: (data: any) => api.post<any>('/auth/register', data),
  me: () => api.get<any>('/auth/me')
};

export const serviceApi = {
  getCategories: () => api.get<any[]>('/services/categories'),
  getEmergencyCategories: () => api.get<any[]>('/services/categories/emergency'),
  getAll: (categoryId?: string) => api.get<any[]>(`/services${categoryId ? `?categoryId=${categoryId}` : ''}`),
  getById: (id: string) => api.get<any>(`/services/${id}`)
};

export const technicianApi = {
  getAll: (category?: string, verifiedOnly?: boolean) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (verifiedOnly) params.append('verifiedOnly', 'true');
    return api.get<any[]>(`/technicians?${params.toString()}`);
  },
  getById: (id: number | string) => api.get<any>(`/technicians/${id}`),
  match: (category?: string, area?: string, emergency?: boolean) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (area) params.append('area', area);
    if (emergency) params.append('emergency', 'true');
    return api.get<any[]>(`/technicians/hyperlocal-match?${params.toString()}`);
  }
};

export const bookingApi = {
  create: (bookingData: any) => api.post<any>('/bookings', bookingData),
  getById: (id: number | string) => api.get<any>(`/bookings/${id}`),
  getMyBookings: () => api.get<any[]>('/bookings/my-bookings'),
  updateStatus: (id: number | string, status: string, note?: string) =>
    api.patch<any>(`/bookings/${id}/status`, { status, note }),
  requestAdditionalCharge: (id: number | string, charge: any) =>
    api.post<any>(`/bookings/${id}/additional-charge`, charge),
  respondAdditionalCharge: (chargeId: number | string, approve: boolean) =>
    api.patch<any>(`/bookings/additional-charge/${chargeId}/respond`, { approve }),
  verifyOtp: (id: number | string, otp: string) =>
    api.post<any>(`/bookings/${id}/verify-otp`, { otp })
};

export const paymentApi = {
  process: (bookingId: number | string, amount: number, paymentMethod: string) =>
    api.post<any>('/payments/process', { bookingId, amount, paymentMethod }),
  getInvoice: (bookingId: number | string) => api.get<any>(`/payments/invoice/${bookingId}`)
};

export const reviewApi = {
  submit: (review: any) => api.post<any>('/reviews', review),
  getTechnicianReviews: (technicianId: number | string) => api.get<any[]>(`/reviews/technician/${technicianId}`)
};

export const complaintApi = {
  submit: (complaint: any) => api.post<any>('/complaints', complaint),
  getMyComplaints: () => api.get<any[]>('/complaints/my-complaints'),
  updateStatus: (id: number | string, status: string, adminNotes?: string) =>
    api.patch<any>(`/complaints/${id}/status`, { status, adminNotes })
};

export const warrantyApi = {
  claim: (bookingId: number | string, reason: string) =>
    api.post<any>('/warranty/claim', { bookingId, reason }),
  getMyWarranties: () => api.get<any[]>('/warranty/my-warranties')
};

export const adminApi = {
  getStats: () => api.get<any>('/admin/stats'),
  verifyTechnician: (id: number | string, approve: boolean) =>
    api.post<any>(`/admin/technicians/${id}/verify`, { approve })
};
