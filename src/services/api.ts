/**
 * NammaServe API client.
 *
 * Every call resolves to an ApiResult. The previous version returned `null` for
 * every failure path — a 401, a 404, a validation error and a dropped connection
 * were indistinguishable, so the UI could never tell a user *why* something
 * failed. Callers now get a message they can show.
 */

const API_BASE_URL =
  (import.meta.env?.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:8080/api';

export const TOKEN_STORAGE_KEY = 'localfix_jwt_token';

export type ApiResult<T> =
  | { ok: true; data: T; message?: string }
  | { ok: false; status: number; error: string };

/** Fired when the server rejects our token, so the app can drop the session. */
export const AUTH_EXPIRED_EVENT = 'nammaserve:auth-expired';

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string | null): void {
  try {
    if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
    else localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    /* storage unavailable (private mode) — the session just won't persist */
  }
}

type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

async function request<T>(method: Method, endpoint: string, body?: unknown): Promise<ApiResult<T>> {
  const token = getToken();

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: body !== undefined ? JSON.stringify(body) : undefined
    });
  } catch {
    // fetch only rejects for network-level failures, never for 4xx/5xx.
    return {
      ok: false,
      status: 0,
      error: 'Could not reach the server. Check your connection and try again.'
    };
  }

  // 204 and friends have no body to parse.
  let payload: any = null;
  if (res.status !== 204) {
    try {
      const text = await res.text();
      payload = text ? JSON.parse(text) : null;
    } catch {
      payload = null;
    }
  }

  if (!res.ok) {
    if (res.status === 401) {
      // The token is missing, expired or revoked. Clear it once, here, rather
      // than letting every screen rediscover a dead session independently.
      setToken(null);
      window.dispatchEvent(new CustomEvent(AUTH_EXPIRED_EVENT));
    }
    return {
      ok: false,
      status: res.status,
      error: payload?.message || defaultMessageFor(res.status)
    };
  }

  return { ok: true, data: payload?.data as T, message: payload?.message };
}

function defaultMessageFor(status: number): string {
  switch (status) {
    case 400: return 'Some of those details were not accepted. Please check and try again.';
    case 401: return 'Your session has ended. Please sign in again.';
    case 403: return 'You do not have permission for this action.';
    case 404: return 'We could not find what you were looking for.';
    case 409: return 'That conflicts with something that already exists.';
    case 429: return 'Too many attempts. Please wait a moment and try again.';
    default:  return 'Something went wrong. Please try again.';
  }
}

export const api = {
  get: <T,>(endpoint: string) => request<T>('GET', endpoint),
  post: <T,>(endpoint: string, body?: unknown) => request<T>('POST', endpoint, body ?? {}),
  patch: <T,>(endpoint: string, body?: unknown) => request<T>('PATCH', endpoint, body ?? {})
};

// ---------------------------------------------------------------- auth

export type ServerRole = 'ROLE_CUSTOMER' | 'ROLE_TECHNICIAN' | 'ROLE_ADMIN';

export interface AuthResponse {
  token: string;
  tokenType: string;
  id: number;
  name: string;
  email: string;
  phone: string;
  role: ServerRole;
  area: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'customer' | 'provider';
  area?: string;
  category?: string;
  businessName?: string;
}

export const authApi = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password }),
  register: (data: RegisterPayload) =>
    api.post<AuthResponse>('/auth/register', data),
  me: () => api.get<{ id: number; email: string; name: string; authorities: { authority: ServerRole }[] }>('/auth/me')
};

// ------------------------------------------------------------ catalogue

export const serviceApi = {
  getCategories: () => api.get<any[]>('/services/categories'),
  getEmergencyCategories: () => api.get<any[]>('/services/categories/emergency'),
  getAll: (categoryId?: string) =>
    api.get<any[]>(`/services${categoryId ? `?categoryId=${encodeURIComponent(categoryId)}` : ''}`),
  getById: (id: string) => api.get<any>(`/services/${encodeURIComponent(id)}`)
};

export const technicianApi = {
  getAll: (category?: string, verifiedOnly?: boolean) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (verifiedOnly) params.append('verifiedOnly', 'true');
    const qs = params.toString();
    return api.get<any[]>(`/technicians${qs ? `?${qs}` : ''}`);
  },
  getById: (id: number | string) => api.get<any>(`/technicians/${id}`),
  match: (category?: string, area?: string, emergency?: boolean) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (area) params.append('area', area);
    if (emergency) params.append('emergency', 'true');
    const qs = params.toString();
    return api.get<any[]>(`/technicians/hyperlocal-match${qs ? `?${qs}` : ''}`);
  },
  toggleAvailability: (id: number | string) =>
    api.patch<any>(`/technicians/${id}/toggle-availability`)
};

// -------------------------------------------------------------- bookings

export const bookingApi = {
  create: (bookingData: any) => api.post<any>('/bookings', bookingData),
  getById: (id: number | string) => api.get<any>(`/bookings/${id}`),
  getMyBookings: () => api.get<any[]>('/bookings/my-bookings'),
  /** Jobs assigned to the signed-in professional. */
  getMyJobs: () => api.get<any[]>('/bookings/my-jobs'),
  getAll: () => api.get<any[]>('/bookings'),
  /** Completion code — only the booking's customer can read this. */
  getCompletionOtp: (id: number | string) => api.get<{ otp: string }>(`/bookings/${id}/otp`),
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
  /** The amount must equal the booking total; the server rejects anything else. */
  process: (bookingId: number | string, amount: number, paymentMethod: string) =>
    api.post<any>('/payments/process', { bookingId, amount, paymentMethod }),
  getInvoice: (bookingId: number | string) => api.get<any>(`/payments/invoice/${bookingId}`)
};

export const reviewApi = {
  submit: (review: any) => api.post<any>('/reviews', review),
  getTechnicianReviews: (technicianId: number | string) =>
    api.get<any[]>(`/reviews/technician/${technicianId}`)
};

export const complaintApi = {
  submit: (complaint: any) => api.post<any>('/complaints', complaint),
  getMyComplaints: () => api.get<any[]>('/complaints/my-complaints'),
  getAll: () => api.get<any[]>('/complaints'),
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

/** Maps the backend's role enum onto the roles the UI uses. */
export function toUiRole(serverRole: ServerRole | string | undefined): 'customer' | 'provider' | 'admin' {
  switch (serverRole) {
    case 'ROLE_ADMIN': return 'admin';
    case 'ROLE_TECHNICIAN': return 'provider';
    default: return 'customer';
  }
}
