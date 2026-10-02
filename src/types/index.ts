export type Role = 'customer' | 'provider' | 'admin';

export type Language = 'en' | 'ta';

export type PageRoute =
  | 'landing'
  | 'discovery'
  | 'customer-dashboard'
  | 'provider-dashboard'
  | 'admin-dashboard';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  visitCharge: number;
  priceUnit: 'fixed' | 'hourly';
  durationMinutes: number;
  warrantyDays?: number;
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

export type VerificationStatus = 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED';

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
  visitCharge: number;
  priceUnit: 'fixed' | 'hourly';
  distanceKm: number;
  etaMinutes: number;
  nextAvailable: string;
  location: string;
  serviceAreas: string[];
  serviceRadiusKm: number;
  isVerified: boolean;
  verificationStatus: VerificationStatus;
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
  isAvailable: boolean;
  skills: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  nameTa: string;
  iconName: string;
  count: number;
  description: string;
  popularServices: string[];
  color: string;
  isEmergency?: boolean;
}

// Full booking status state machine
export type BookingStatus =
  | 'PENDING'
  | 'TECHNICIAN_ASSIGNED'
  | 'TECHNICIAN_ACCEPTED'
  | 'ON_THE_WAY'
  | 'ARRIVED'
  | 'SERVICE_STARTED'
  | 'SERVICE_COMPLETED'
  | 'PAYMENT_PENDING'
  | 'COMPLETED'
  | 'CANCELLED';

export interface PricingBreakdown {
  visitCharge: number;
  serviceCharge: number;
  partsCharge: number;
  gst: number;
  discount: number;
  total: number;
}

export interface AdditionalCharge {
  id: string;
  bookingId: string;
  description: string;
  partsCharge: number;
  labourCharge: number;
  total: number;
  reason: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  respondedAt?: string;
}

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
  visitCharge: number;
  serviceFee: number;
  partsCharge: number;
  gst: number;
  discount: number;
  totalPrice: number;
  status: BookingStatus;
  scheduledDate: string;
  scheduledTime: string;
  serviceLocation: string;
  serviceArea: string;
  problemDescription: string;
  isEmergency: boolean;
  notes?: string;
  createdAt: string;
  hasBeenReviewed?: boolean;
  paymentMethod?: 'upi' | 'card' | 'cash' | 'wallet';
  paymentStatus?: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  warrantyDays?: number;
  warrantyExpiresAt?: string;
  additionalCharges?: AdditionalCharge[];
  statusHistory?: BookingStatusEntry[];
}

export interface BookingStatusEntry {
  status: BookingStatus;
  timestamp: string;
  note?: string;
}

export interface Warranty {
  id: string;
  bookingId: string;
  bookingNumber: string;
  customerId: string;
  technicianId: string;
  technicianName: string;
  serviceName: string;
  serviceDate: string;
  warrantyDays: number;
  expiresAt: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CLAIMED';
  claimReason?: string;
  claimedAt?: string;
}

export type ComplaintCategory =
  | 'SERVICE_QUALITY'
  | 'TECHNICIAN_BEHAVIOR'
  | 'PRICING_DISPUTE'
  | 'DELAY'
  | 'DAMAGE'
  | 'OTHER';

export type ComplaintStatus = 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'REJECTED';

export interface Complaint {
  id: string;
  bookingId: string;
  bookingNumber: string;
  customerId: string;
  customerName: string;
  technicianId: string;
  technicianName: string;
  category: ComplaintCategory;
  description: string;
  status: ComplaintStatus;
  adminNote?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface Invoice {
  id: string;
  bookingId: string;
  bookingNumber: string;
  customerName: string;
  customerPhone: string;
  technicianName: string;
  technicianPhone: string;
  serviceName: string;
  serviceDate: string;
  visitCharge: number;
  serviceCharge: number;
  partsCharge: number;
  gst: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  warrantyDays?: number;
  generatedAt: string;
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
  type: 'booking' | 'message' | 'system' | 'review' | 'warranty' | 'complaint' | 'payment';
  linkBookingId?: string;
}

export interface FilterState {
  searchQuery: string;
  location: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  availability: string;
  minRating: number;
  maxDistance: number;
  verifiedOnly: boolean;
  emergencyOnly: boolean;
  sortBy: 'relevance' | 'rating' | 'price' | 'distance' | 'eta';
}

export interface CartItem {
  id: string;
  serviceId: string;
  serviceName: string;
  providerId: string;
  providerName: string;
  providerCategory: string;
  price: number;
  visitCharge: number;
  durationMinutes: number;
  quantity: number;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discountPercent?: number;
  discountAmount?: number;
  code: string;
  validUntil: string;
  category?: string;
  bgColor: string;
  textColor: string;
}

export interface ChennaiArea {
  name: string;
  pincode: string;
  lat: number;
  lng: number;
}
