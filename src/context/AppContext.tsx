import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Role, PageRoute, Provider, Booking, Message, AppNotification, 
  FilterState, BookingStatus, ProviderReview, CartItem, ServiceItem 
} from '../types';
import { mockProviders, initialBookings, initialMessages, initialNotifications } from '../data/mockData';

interface LoggedInUser {
  name: string;
  email: string;
  role: Role;
}

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  page: PageRoute;
  setPage: (page: PageRoute) => void;

  // Auth State
  isLoggedIn: boolean;
  loggedInUser: LoggedInUser | null;
  login: (name: string, email: string, role: Role) => void;
  logout: () => void;
  
  // Search & Filter State
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // Providers & Bookmarks
  providers: Provider[];
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

  // Urban Company Cart State & Actions
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
  createBooking: (newBookingData: Omit<Booking, 'id' | 'bookingNumber' | 'createdAt' | 'status'>) => Booking;
  updateBookingStatus: (bookingId: string, newStatus: BookingStatus) => void;
  
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
  
  // Global Navigation Helper
  openDiscoveryWithCategory: (categoryName: string) => void;
}

const defaultFilters: FilterState = {
  searchQuery: '',
  location: 'All Locations',
  category: 'All Categories',
  minPrice: 0,
  maxPrice: 500,
  availability: 'all',
  minRating: 0,
  maxDistance: 50,
  verifiedOnly: false,
  sortBy: 'relevance'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('customer');
  const [page, setPage] = useState<PageRoute>('landing');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  const [favorites, setFavorites] = useState<string[]>(['p1', 'p2']);

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
  
  // Modals state
  const [activeProviderProfile, setActiveProviderProfile] = useState<Provider | null>(null);
  const [bookingProvider, setBookingProvider] = useState<Provider | null>(null);
  const [activeBookingForChat, setActiveBookingForChat] = useState<Booking | null>(null);
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [reviewProvider, setReviewProvider] = useState<Provider | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Urban Company Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('localfix_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Location Selector State (Chennai areas)
  const [selectedArea, setSelectedAreaState] = useState<string>('Anna Nagar, Chennai');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);

  const setSelectedArea = (area: string) => {
    setSelectedAreaState(area);
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
  
  // Bookings & Messages & Notifications
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

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('localfix_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('localfix_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('localfix_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('localfix_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const resetFilters = () => setFilters(defaultFilters);

  const login = (name: string, email: string, userRole: Role) => {
    setIsLoggedIn(true);
    setLoggedInUser({ name, email, role: userRole });
    setRole(userRole);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setRole('customer');
    setPage('landing');
    setActiveProviderProfile(null);
    setBookingProvider(null);
    setActiveBookingForChat(null);
  };

  const toggleFavorite = (providerId: string) => {
    setFavorites(prev => 
      prev.includes(providerId) ? prev.filter(id => id !== providerId) : [...prev, providerId]
    );
  };

  const createBooking = (newBookingData: Omit<Booking, 'id' | 'bookingNumber' | 'createdAt' | 'status'>): Booking => {
    const id = 'b_' + Math.random().toString(36).substring(2, 9);
    const bookingNumber = 'BK-' + Math.floor(1000 + Math.random() * 9000);
    const createdAt = new Date().toISOString();
    
    const newBooking: Booking = {
      ...newBookingData,
      id,
      bookingNumber,
      createdAt,
      status: 'Requested'
    };
    
    setBookings(prev => [newBooking, ...prev]);
    
    // Auto-create notification
    const newNotif: AppNotification = {
      id: 'n_' + Math.random().toString(36).substring(2, 9),
      title: 'Booking Request Sent',
      message: `Your booking request #${bookingNumber} for ${newBooking.serviceName} has been sent to ${newBooking.providerName}.`,
      timestamp: 'Just now',
      isRead: false,
      type: 'booking',
      linkBookingId: id
    };
    setNotifications(prev => [newNotif, ...prev]);
    
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, newStatus: BookingStatus) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: newStatus };
      }
      return b;
    }));

    const targetBooking = bookings.find(b => b.id === bookingId);
    if (targetBooking) {
      const newNotif: AppNotification = {
        id: 'n_' + Math.random().toString(36).substring(2, 9),
        title: `Booking ${newStatus}`,
        message: `Booking #${targetBooking.bookingNumber} with ${targetBooking.providerName} is now ${newStatus.toLowerCase()}.`,
        timestamp: 'Just now',
        isRead: false,
        type: 'booking',
        linkBookingId: bookingId
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  const sendMessage = (bookingId: string, text: string, senderRole: Role) => {
    const targetBooking = bookings.find(b => b.id === bookingId);
    const pId = targetBooking ? targetBooking.providerId : 'p1';
    const pName = targetBooking ? targetBooking.providerName : 'Aarav Sharma';
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
        
        return {
          ...p,
          reviews: updatedReviews,
          reviewCount: newCount,
          rating: newRating
        };
      }
      return p;
    }));

    if (bookingId) {
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, hasBeenReviewed: true } : b));
    }
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
        isLoggedIn, loggedInUser, login, logout,
        filters, setFilters, resetFilters,
        providers, favorites, toggleFavorite,
        activeProviderProfile, setActiveProviderProfile,
        bookingProvider, setBookingProvider,
        activeBookingForChat, setActiveBookingForChat,
        reviewBooking, setReviewBooking,
        reviewProvider, setReviewProvider,
        isAuthModalOpen, setIsAuthModalOpen,
        authMode, setAuthMode,
        cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
        isCartOpen, setIsCartOpen, cartTotal, cartCount,
        selectedArea, setSelectedArea, isLocationModalOpen, setIsLocationModalOpen,
        bookings, createBooking, updateBookingStatus,
        messages, sendMessage,
        addReview,
        notifications, unreadNotificationCount, markNotificationRead, markAllNotificationsRead,
        openDiscoveryWithCategory
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
