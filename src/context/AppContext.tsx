import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Role, PageRoute, Provider, Booking, Message, AppNotification,
  FilterState, BookingStatus, ProviderReview, CartItem, ServiceItem,
  Warranty, Complaint, ComplaintCategory, Language
} from '../types';
import {
  mockProviders, initialBookings, initialMessages, initialNotifications,
  initialWarranties, initialComplaints
} from '../data/mockData';
import {
  authApi, bookingApi, setToken, getToken, toUiRole, AUTH_EXPIRED_EVENT, AuthResponse
} from '../services/api';

interface LoggedInUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  area?: string;
}

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  page: PageRoute;
  setPage: (page: PageRoute) => void;
  language: Language;
  setLanguage: (lang: Language) => void;

  // Auth State
  isLoggedIn: boolean;
  loggedInUser: LoggedInUser | null;
  /** Called with the server's AuthResponse after a successful login/register. */
  login: (auth: AuthResponse) => void;
  logout: () => void;
  /** True while the stored token is being revalidated on boot. */
  isRestoringSession: boolean;

  // Search & Filter State
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  // Providers & Bookmarks
  providers: Provider[];
  updateProviderVerification: (providerId: string, status: import('../types').VerificationStatus) => void;
  removeProvider: (providerId: string) => void;
  favorites: string[];
  toggleFavorite: (providerId: string) => void;

  // Modals & Active Selections
  activeProviderProfile: Provider | null;
  setActiveProviderProfile: (provider: Provider | null) => void;

  bookingProvider: Provider | null;
  setBookingProvider: (provider: Provider | null) => void;

  activeBookingForChat: Booking | null;
  setActiveBookingForChat: (booking: Booking | null) => void;

  reviewBooking: Booking | null;
  setReviewBooking: (booking: Booking | null) => void;

  reviewProvider: Provider | null;
  setReviewProvider: (provider: Provider | null) => void;

  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
  authRoleLock: 'customer' | 'provider' | null;
  setAuthRoleLock: (role: 'customer' | 'provider' | null) => void;
  openAuthModal: (mode?: 'login' | 'signup', targetRole?: 'customer' | 'provider' | null) => void;

  // Cart State & Actions
  cart: CartItem[];
  addToCart: (provider: Provider, service: ServiceItem) => void;
  removeFromCart: (serviceId: string) => void;
  updateCartQuantity: (serviceId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;

  // Location Selector
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;

  // Bookings State & Actions
  bookings: Booking[];
  createBooking: (newBookingData: Omit<Booking, 'id' | 'bookingNumber' | 'createdAt' | 'status' | 'statusHistory'>)
    => Promise<{ booking: Booking; persisted: boolean; error?: string }>;
  updateBookingStatus: (bookingId: string, newStatus: BookingStatus, note?: string) => void;

  // Messages State & Actions
  messages: Message[];
  sendMessage: (bookingId: string, text: string, senderRole: Role) => void;

  // Reviews State & Actions
  addReview: (providerId: string, reviewData: Omit<ProviderReview, 'id' | 'date'>, bookingId?: string) => void;

  // Notifications State & Actions
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Warranty State
  warranties: Warranty[];
  addWarranty: (warranty: Omit<Warranty, 'id'>) => void;
  claimWarranty: (warrantyId: string, reason: string) => void;

  // Complaints State
  complaints: Complaint[];
  addComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'status'>) => void;
  updateComplaintStatus: (complaintId: string, status: Complaint['status'], adminNote?: string) => void;

  // Additional Charges (approval flow)
  approveAdditionalCharge: (bookingId: string, chargeId: string) => void;
  rejectAdditionalCharge: (bookingId: string, chargeId: string) => void;
  addAdditionalCharge: (bookingId: string, chargeData: { description: string; partsCharge: number; labourCharge: number; reason: string }) => void;

  // Global Navigation Helper
  openDiscoveryWithCategory: (categoryName: string) => void;

  // Admin active tab
  adminTab: string;
  setAdminTab: (tab: string) => void;
}

const defaultFilters: FilterState = {
  searchQuery: '',
  location: 'All Locations',
  category: 'All Categories',
  minPrice: 0,
  maxPrice: 5000,
  availability: 'all',
  minRating: 0,
  maxDistance: 50,
  verifiedOnly: false,
  emergencyOnly: false,
  sortBy: 'relevance'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('customer');
  const [page, setPage] = useState<PageRoute>('landing');
  const [language, setLanguage] = useState<Language>('en');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  const [favorites, setFavorites] = useState<string[]>(['p1', 'p2']);
  const [adminTab, setAdminTab] = useState<string>('overview');

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
  // A token in localStorage is a claim, not proof. Until /auth/me confirms it we
  // are neither logged in nor logged out.
  const [isRestoringSession, setIsRestoringSession] = useState<boolean>(() => !!getToken());

  // Modals state
  const [activeProviderProfile, setActiveProviderProfile] = useState<Provider | null>(null);
  const [bookingProvider, setBookingProvider] = useState<Provider | null>(null);
  const [activeBookingForChat, setActiveBookingForChat] = useState<Booking | null>(null);
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [reviewProvider, setReviewProvider] = useState<Provider | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authRoleLock, setAuthRoleLock] = useState<'customer' | 'provider' | null>(null);

  const openAuthModal = (mode: 'login' | 'signup' = 'login', targetRole: 'customer' | 'provider' | null = null) => {
    setAuthMode(mode);
    setAuthRoleLock(targetRole);
    setIsAuthModalOpen(true);
  };

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('localfix_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Location Selector State (Chennai areas)
  const [selectedArea, setSelectedAreaState] = useState<string>(() => {
    return localStorage.getItem('localfix_location') || '';
  });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);

  // Prompt new users for location
  useEffect(() => {
    if (!selectedArea) {
      setIsLocationModalOpen(true);
    }
  }, [selectedArea]);

  const setSelectedArea = (area: string) => {
    setSelectedAreaState(area);
    localStorage.setItem('localfix_location', area);
    const keyword = area.split(/[\/,]/)[0].trim();
    setFilters(prev => ({
      ...prev,
      location: keyword
    }));
  };

  const addToCart = (provider: Provider, service: ServiceItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.serviceId === service.id);
      if (existing) {
        return prev.map(item =>
          item.serviceId === service.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `${provider.id}_${service.id}`,
          serviceId: service.id,
          serviceName: service.name,
          providerId: provider.id,
          providerName: provider.name,
          providerCategory: provider.category,
          price: service.price,
          visitCharge: service.visitCharge || 0,
          durationMinutes: service.durationMinutes,
          quantity: 1
        }
      ];
    });
  };

  const removeFromCart = (serviceId: string) => {
    setCart(prev => prev.filter(item => item.serviceId !== serviceId));
  };

  const updateCartQuantity = (serviceId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.serviceId === serviceId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Bookings, Messages, Notifications
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('localfix_bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('localfix_messages');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('localfix_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Warranties
  const [warranties, setWarranties] = useState<Warranty[]>(() => {
    const saved = localStorage.getItem('localfix_warranties');
    return saved ? JSON.parse(saved) : initialWarranties;
  });

  // Complaints
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem('localfix_complaints');
    return saved ? JSON.parse(saved) : initialComplaints;
  });

  /**
   * Pull the signed-in user's bookings from the backend.
   *
   * This used to call GET /api/bookings on mount with no credentials, which
   * returned every booking in the database and rendered them as the current
   * user's own. It now asks for the caller's bookings and only once there is a
   * session to ask with.
   */
  useEffect(() => {
    if (!isLoggedIn || !loggedInUser) return;

    let cancelled = false;
    (async () => {
      const result = loggedInUser.role === 'provider'
        ? await bookingApi.getMyJobs()
        : await bookingApi.getMyBookings();

      if (cancelled) return;
      if (!result.ok) {
        // Nothing to show from the server; the locally cached list stands.
        console.warn('Could not load bookings:', result.error);
        return;
      }
      const rows = Array.isArray(result.data) ? result.data : [];
      if (rows.length > 0) {
          const mappedBookings: Booking[] = rows.map((b: any) => ({
            id: b.id.toString(),
            bookingNumber: b.bookingNumber || `LF-CHN-${b.id}`,
            providerId: b.technician?.id?.toString() || 'p1',
            providerName: b.technician?.user?.name || b.technician?.businessName || 'Ravi Kumar',
            providerAvatar: b.technician?.user?.avatar || '',
            providerCategory: b.technician?.category || 'General Maintenance',
            providerPhone: b.technician?.user?.phone || '+91 98765 00000',
            customerId: b.customer?.id?.toString() || 'c1',
            customerName: b.customer?.name || 'Customer',
            customerPhone: b.customer?.phone || '',
            serviceId: b.serviceId || 's1',
            serviceName: b.serviceName || 'Home Service',
            servicePrice: b.servicePrice || 499,
            visitCharge: b.visitCharge || 199,
            serviceFee: b.servicePrice || 499,
            partsCharge: b.partsCharge || 0,
            gst: b.gst || 0,
            discount: b.discount || 0,
            totalPrice: b.totalPrice || 698,
            status: b.status || 'PENDING',
            scheduledDate: b.scheduledDate || 'Today',
            scheduledTime: b.scheduledTime || '10:00 AM',
            serviceLocation: b.serviceLocation || 'Chennai',
            serviceArea: b.serviceArea || 'Chennai',
            problemDescription: b.problemDescription || '',
            isEmergency: b.isEmergency || false,
            notes: b.notes || '',
            createdAt: b.createdAt || new Date().toISOString(),
            paymentMethod: b.paymentMethod || 'upi',
            paymentStatus: b.paymentStatus || 'PENDING',
            warrantyDays: b.warrantyDays || 30
          }));
          setBookings(mappedBookings);
      }
    })();

    return () => { cancelled = true; };
  }, [isLoggedIn, loggedInUser?.id, loggedInUser?.role]);

  /**
   * Revalidate a stored token on boot. Without this the app forgot who you were
   * on every refresh, and a token that had since expired was treated as valid
   * until the first API call failed.
   */
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsRestoringSession(false);
      return;
    }

    let cancelled = false;
    (async () => {
      const result = await authApi.me();
      if (cancelled) return;

      if (result.ok && result.data) {
        const serverRole = result.data.authorities?.[0]?.authority;
        const userRole = toUiRole(serverRole);
        setIsLoggedIn(true);
        setLoggedInUser({
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
          role: userRole
        });
        setRole(userRole);
      } else {
        // 401 already cleared the token inside the API client; anything else
        // (server down, for instance) should also not leave a half-session.
        clearSession();
      }
      setIsRestoringSession(false);
    })();

    return () => { cancelled = true; };
  }, []);

  /** The API client raises this when any call comes back 401. */
  useEffect(() => {
    const onExpired = () => {
      setIsLoggedIn(prev => {
        if (prev) {
          setLoggedInUser(null);
          setRole('customer');
          setPage('landing');
        }
        return false;
      });
    };
    window.addEventListener(AUTH_EXPIRED_EVENT, onExpired);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, onExpired);
  }, []);

  // Sync to localStorage
  useEffect(() => { localStorage.setItem('localfix_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('localfix_bookings', JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem('localfix_messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { localStorage.setItem('localfix_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('localfix_warranties', JSON.stringify(warranties)); }, [warranties]);
  useEffect(() => { localStorage.setItem('localfix_complaints', JSON.stringify(complaints)); }, [complaints]);

  const updateProviderVerification = (providerId: string, status: import('../types').VerificationStatus) => {
    setProviders(prev => prev.map(p => p.id === providerId ? { ...p, verificationStatus: status, isVerified: status === 'VERIFIED' } : p));
  };

  const removeProvider = (providerId: string) => {
    setProviders(prev => prev.filter(p => p.id !== providerId));
  };

  const resetFilters = () => setFilters(defaultFilters);

  /**
   * The role comes from the server's response, never from what the sign-in form
   * was set to. Previously the client decided its own role, so picking
   * "Provider" in the UI granted the provider portal regardless of the account.
   */
  const login = (auth: AuthResponse) => {
    const userRole = toUiRole(auth.role);
    setToken(auth.token);
    setIsLoggedIn(true);
    setLoggedInUser({
      id: auth.id,
      name: auth.name,
      email: auth.email,
      role: userRole,
      phone: auth.phone,
      area: auth.area
    });
    setRole(userRole);
    if (userRole === 'admin') {
      setPage('admin-dashboard');
    }
  };

  const clearSession = () => {
    setToken(null);
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setRole('customer');
    setActiveProviderProfile(null);
    setBookingProvider(null);
    setActiveBookingForChat(null);
  };

  const logout = () => {
    clearSession();
    setPage('landing');
  };

  const toggleFavorite = (providerId: string) => {
    setFavorites(prev =>
      prev.includes(providerId) ? prev.filter(id => id !== providerId) : [...prev, providerId]
    );
  };

  /**
   * Creates a booking locally, then persists it to the backend.
   *
   * The previous version fired a bare `fetch` with no Authorization header and
   * logged "Booking synchronized to NammaServe Java Database" from inside
   * `.then()` regardless of the status code. Now that /api/bookings requires a
   * token, every booking came back 401 and was silently dropped while the UI
   * still reported success. It now goes through the authenticated client and
   * reports honestly whether the row was written.
   */
  const createBooking = async (newBookingData: Omit<Booking, 'id' | 'bookingNumber' | 'createdAt' | 'status' | 'statusHistory'>): Promise<{ booking: Booking; persisted: boolean; error?: string }> => {
    const id = 'b_' + Math.random().toString(36).substring(2, 9);
    const bookingNumber = 'LF-CHN-' + Math.floor(10000 + Math.random() * 90000);
    const createdAt = new Date().toISOString();

    const newBooking: Booking = {
      ...newBookingData,
      id,
      bookingNumber,
      createdAt,
      status: 'PENDING',
      statusHistory: [
        { status: 'PENDING', timestamp: createdAt, note: 'Booking created' }
      ]
    };

    setBookings(prev => [newBooking, ...prev]);

    // The backend derives GST and the total from the line items, so they are
    // deliberately not sent. providerId here is a front-end string id
    // ("p_extra_2"); only a numeric id can refer to a TechnicianProfile row, so
    // anything else falls back to matching the professional by name.
    const numericTechnicianId = Number(newBookingData.providerId);
    const result = await bookingApi.create({
      ...(Number.isFinite(numericTechnicianId) && numericTechnicianId > 0
        ? { technicianId: numericTechnicianId }
        : {}),
      providerName: newBookingData.providerName,
      serviceId: newBookingData.serviceId,
      serviceName: newBookingData.serviceName,
      servicePrice: newBookingData.servicePrice,
      visitCharge: newBookingData.visitCharge || 199,
      partsCharge: newBookingData.partsCharge || 0,
      discount: newBookingData.discount || 0,
      scheduledDate: newBookingData.scheduledDate,
      scheduledTime: newBookingData.scheduledTime,
      serviceLocation: newBookingData.serviceLocation,
      serviceArea: newBookingData.serviceArea || selectedArea,
      problemDescription: newBookingData.problemDescription || '',
      isEmergency: newBookingData.isEmergency || false,
      notes: newBookingData.notes || '',
      paymentMethod: newBookingData.paymentMethod || 'upi',
      customerName: newBookingData.customerName,
      customerPhone: newBookingData.customerPhone
    });

    let persisted = false;
    let error: string | undefined;

    if (result.ok && result.data) {
      persisted = true;
      // Adopt the server's identity and its authoritative totals, so the
      // reference number the customer is shown is the one in the database.
      const saved = result.data;
      const reconciled: Booking = {
        ...newBooking,
        id: String(saved.id ?? newBooking.id),
        bookingNumber: saved.bookingNumber ?? newBooking.bookingNumber,
        status: saved.status ?? newBooking.status,
        gst: saved.gst ?? newBooking.gst,
        totalPrice: saved.totalPrice ?? newBooking.totalPrice
      };
      setBookings(prev => prev.map(b => (b.id === newBooking.id ? reconciled : b)));
      Object.assign(newBooking, reconciled);
    } else if (!result.ok) {
      error = result.error;
      console.warn('Booking was not saved to the server:', result.status, result.error);
    }

    // Auto-create notification
    const newNotif: AppNotification = {
      id: 'n_' + Math.random().toString(36).substring(2, 9),
      title: 'Booking Request Sent',
      message: `Booking #${bookingNumber} for ${newBooking.serviceName} sent to ${newBooking.providerName}.`,
      timestamp: 'Just now',
      isRead: false,
      type: 'booking',
      linkBookingId: id
    };
    setNotifications(prev => [newNotif, ...prev]);

    return { booking: newBooking, persisted, error };
  };

  const updateBookingStatus = (bookingId: string, newStatus: BookingStatus, note?: string) => {
    const timestamp = new Date().toISOString();
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const newEntry = { status: newStatus, timestamp, note };
        return {
          ...b,
          status: newStatus,
          statusHistory: [...(b.statusHistory || []), newEntry]
        };
      }
      return b;
    }));

    const targetBooking = bookings.find(b => b.id === bookingId);
    if (targetBooking) {
      const statusMessages: Partial<Record<BookingStatus, string>> = {
        TECHNICIAN_ASSIGNED: `A technician has been assigned to your booking #${targetBooking.bookingNumber}.`,
        TECHNICIAN_ACCEPTED: `${targetBooking.providerName} has accepted your booking.`,
        ON_THE_WAY: `${targetBooking.providerName} is on the way to your location.`,
        ARRIVED: `${targetBooking.providerName} has arrived at your location.`,
        SERVICE_STARTED: `Service has started at your location.`,
        SERVICE_COMPLETED: `Service completed! Please proceed with payment.`,
        COMPLETED: `Booking #${targetBooking.bookingNumber} is completed. Thank you!`,
        CANCELLED: `Booking #${targetBooking.bookingNumber} has been cancelled.`,
      };

      const msg = statusMessages[newStatus];
      if (msg) {
        const newNotif: AppNotification = {
          id: 'n_' + Math.random().toString(36).substring(2, 9),
          title: `Booking ${newStatus.replace(/_/g, ' ')}`,
          message: msg,
          timestamp: 'Just now',
          isRead: false,
          type: 'booking',
          linkBookingId: bookingId
        };
        setNotifications(prev => [newNotif, ...prev]);
      }

      // Auto-create warranty if completed
      if (newStatus === 'COMPLETED' && targetBooking.warrantyDays && targetBooking.warrantyDays > 0) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + targetBooking.warrantyDays);
        const newWarranty: Warranty = {
          id: 'w_' + Math.random().toString(36).substring(2, 9),
          bookingId: targetBooking.id,
          bookingNumber: targetBooking.bookingNumber,
          customerId: targetBooking.customerId,
          technicianId: targetBooking.providerId,
          technicianName: targetBooking.providerName,
          serviceName: targetBooking.serviceName,
          serviceDate: new Date().toISOString().split('T')[0],
          warrantyDays: targetBooking.warrantyDays,
          expiresAt: expiresAt.toISOString().split('T')[0],
          status: 'ACTIVE',
        };
        setWarranties(prev => [...prev, newWarranty]);
      }
    }
  };

  const sendMessage = (bookingId: string, text: string, senderRole: Role) => {
    const targetBooking = bookings.find(b => b.id === bookingId);
    const pId = targetBooking ? targetBooking.providerId : 'p1';
    const pName = targetBooking ? targetBooking.providerName : 'Ravi Kumar';
    const cId = targetBooking ? targetBooking.customerId : 'usr_cust_1';
    const cName = targetBooking ? targetBooking.customerName : 'Aakash Malhotra';

    const newMsg: Message = {
      id: 'm_' + Math.random().toString(36).substring(2, 9),
      bookingId,
      senderId: senderRole === 'customer' ? cId : pId,
      senderName: senderRole === 'customer' ? cName : pName,
      senderRole,
      receiverId: senderRole === 'customer' ? pId : cId,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };

    setMessages(prev => [...prev, newMsg]);
  };

  const addReview = (providerId: string, reviewData: Omit<ProviderReview, 'id' | 'date'>, bookingId?: string) => {
    const newReview: ProviderReview = {
      ...reviewData,
      id: 'r_' + Math.random().toString(36).substring(2, 9),
      date: 'Just now'
    };

    setProviders(prev => prev.map(p => {
      if (p.id === providerId) {
        const updatedReviews = [newReview, ...p.reviews];
        const newCount = p.reviewCount + 1;
        const totalRating = p.reviews.reduce((acc, r) => acc + r.rating, 0) + newReview.rating;
        const newRating = parseFloat((totalRating / updatedReviews.length).toFixed(2));
        return { ...p, reviews: updatedReviews, reviewCount: newCount, rating: newRating };
      }
      return p;
    }));

    if (bookingId) {
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, hasBeenReviewed: true } : b));
    }
  };

  // Warranties
  const addWarranty = (warranty: Omit<Warranty, 'id'>) => {
    const newWarranty: Warranty = {
      ...warranty,
      id: 'w_' + Math.random().toString(36).substring(2, 9),
    };
    setWarranties(prev => [...prev, newWarranty]);
  };

  const claimWarranty = (warrantyId: string, reason: string) => {
    setWarranties(prev => prev.map(w =>
      w.id === warrantyId ? { ...w, status: 'CLAIMED', claimReason: reason, claimedAt: new Date().toISOString() } : w
    ));
    const newNotif: AppNotification = {
      id: 'n_' + Math.random().toString(36).substring(2, 9),
      title: 'Warranty Claim Submitted',
      message: 'Your warranty claim has been submitted. A technician will contact you shortly.',
      timestamp: 'Just now',
      isRead: false,
      type: 'warranty',
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Complaints
  const addComplaint = (complaint: Omit<Complaint, 'id' | 'createdAt' | 'status'>) => {
    const newComplaint: Complaint = {
      ...complaint,
      id: 'c_' + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      status: 'OPEN',
    };
    setComplaints(prev => [...prev, newComplaint]);
    const newNotif: AppNotification = {
      id: 'n_' + Math.random().toString(36).substring(2, 9),
      title: 'Complaint Registered',
      message: `Your complaint for booking #${complaint.bookingNumber} has been registered.`,
      timestamp: 'Just now',
      isRead: false,
      type: 'complaint',
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateComplaintStatus = (complaintId: string, status: Complaint['status'], adminNote?: string) => {
    setComplaints(prev => prev.map(c =>
      c.id === complaintId
        ? { ...c, status, adminNote, resolvedAt: status === 'RESOLVED' ? new Date().toISOString() : c.resolvedAt }
        : c
    ));
  };

  // Additional charges
  const addAdditionalCharge = (bookingId: string, chargeData: { description: string; partsCharge: number; labourCharge: number; reason: string }) => {
    const charge = {
      id: 'ac_' + Math.random().toString(36).substring(2, 9),
      bookingId,
      ...chargeData,
      total: chargeData.partsCharge + chargeData.labourCharge,
      status: 'PENDING_APPROVAL' as const,
      createdAt: new Date().toISOString(),
    };
    setBookings(prev => prev.map(b =>
      b.id === bookingId
        ? { ...b, additionalCharges: [...(b.additionalCharges || []), charge] }
        : b
    ));
    const newNotif: AppNotification = {
      id: 'n_' + Math.random().toString(36).substring(2, 9),
      title: 'Additional Work Request',
      message: `Technician has requested additional charges of ₹${charge.total}. Please review and approve.`,
      timestamp: 'Just now',
      isRead: false,
      type: 'booking',
      linkBookingId: bookingId
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const approveAdditionalCharge = (bookingId: string, chargeId: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const updatedCharges = (b.additionalCharges || []).map(c =>
          c.id === chargeId ? { ...c, status: 'APPROVED' as const, respondedAt: new Date().toISOString() } : c
        );
        const approvedTotal = updatedCharges.filter(c => c.status === 'APPROVED').reduce((sum, c) => sum + c.total, 0);
        return { ...b, additionalCharges: updatedCharges, totalPrice: b.totalPrice + approvedTotal };
      }
      return b;
    }));
  };

  const rejectAdditionalCharge = (bookingId: string, chargeId: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const updatedCharges = (b.additionalCharges || []).map(c =>
          c.id === chargeId ? { ...c, status: 'REJECTED' as const, respondedAt: new Date().toISOString() } : c
        );
        return { ...b, additionalCharges: updatedCharges };
      }
      return b;
    }));
  };

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const openDiscoveryWithCategory = (categoryName: string) => {
    setFilters(prev => ({
      ...prev,
      category: categoryName
    }));
    setPage('discovery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        role, setRole,
        page, setPage,
        language, setLanguage,
        isLoggedIn, loggedInUser, login, logout, isRestoringSession,
        filters, setFilters, resetFilters,
        providers, updateProviderVerification, removeProvider, favorites, toggleFavorite,
        activeProviderProfile, setActiveProviderProfile,
        bookingProvider, setBookingProvider,
        activeBookingForChat, setActiveBookingForChat,
        reviewBooking, setReviewBooking,
        reviewProvider, setReviewProvider,
        isAuthModalOpen, setIsAuthModalOpen,
        authMode, setAuthMode,
        authRoleLock, setAuthRoleLock, openAuthModal,
        cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
        isCartOpen, setIsCartOpen, cartTotal, cartCount,
        selectedArea, setSelectedArea, isLocationModalOpen, setIsLocationModalOpen,
        bookings, createBooking, updateBookingStatus,
        messages, sendMessage,
        addReview,
        notifications, unreadNotificationCount, markNotificationRead, markAllNotificationsRead,
        warranties, addWarranty, claimWarranty,
        complaints, addComplaint, updateComplaintStatus,
        approveAdditionalCharge, rejectAdditionalCharge, addAdditionalCharge,
        openDiscoveryWithCategory,
        adminTab, setAdminTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
