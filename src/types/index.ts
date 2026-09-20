export type Role = 'customer' | 'provider';

export type PageRoute = 'landing' | 'discovery' | 'customer-dashboard' | 'provider-dashboard';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: 'fixed' | 'hourly';
  durationMinutes: number;
}

export interface ProviderReview {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  subRatings?: {
    quality: number;
    professionalism: number;
    punctuality: number;
  };
  date: string;
  comment: string;
  tags?: string[];
  serviceUsed: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

export interface Provider {
  id: string;
  name: string;
  businessName?: string;
  avatar: string;
  coverImage?: string;
  category: string;
  subCategories: string[];
  rating: number;
  reviewCount: number;
  completedJobs: number;
  startingPrice: number;
  priceUnit: 'fixed' | 'hourly';
  distanceMiles: number;
  nextAvailable: string;
  location: string;
  serviceRadiusMiles: number;
  isVerified: boolean;
  yearsExperience: number;
  responseTime: string;
  bio: string;
  about: string;
  offeredServices: ServiceItem[];
  availabilitySlots: {
    day: string;
    slots: string[];
  }[];
  portfolio: PortfolioItem[];
  reviews: ProviderReview[];
  phone: string;
  email: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  iconName: string;
  count: number;
  description: string;
  popularServices: string[];
}

export type BookingStatus = 
  | 'Requested' 
  | 'Accepted' 
  | 'Scheduled' 
  | 'In Progress' 
  | 'Completed' 
  | 'Cancelled';

export interface Booking {
  id: string;
  bookingNumber: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerCategory: string;
  providerPhone: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  serviceFee: number;
  totalPrice: number;
  status: BookingStatus;
  scheduledDate: string;
  scheduledTime: string;
  serviceLocation: string;
  problemDescription: string;
  isEmergency: boolean;
  notes?: string;
  createdAt: string;
  hasBeenReviewed?: boolean;
}

export interface Message {
  id: string;
  bookingId: string;
  senderId: string;
  senderName: string;
  senderRole: Role;
  receiverId: string;
  text: string;
  timestamp: string;
  attachmentUrl?: string;
  isRead: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'booking' | 'message' | 'system' | 'review';
  linkBookingId?: string;
}

export interface FilterState {
  searchQuery: string;
  location: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  availability: string; // 'all' | 'today' | 'tomorrow' | 'this-week'
  minRating: number;
  maxDistance: number;
  verifiedOnly: boolean;
  sortBy: 'relevance' | 'rating' | 'price' | 'distance';
}

export interface CartItem {
  id: string; // unique item id (e.g. providerId_serviceId)
  serviceId: string;
  serviceName: string;
  providerId: string;
  providerName: string;
  providerCategory: string;
  price: number;
  durationMinutes: number;
  quantity: number;
}

