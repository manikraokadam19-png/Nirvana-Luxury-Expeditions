export type UserRole = 'customer' | 'travel_agent' | 'manager' | 'admin';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string; // Indian mobile +91
  role: UserRole;
  isVerified: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export interface IndianAddress {
  houseFlat: string;
  street: string;
  area: string;
  landmark?: string;
  city: string;
  district: string;
  state: string;
  pinCode: string; // 6 digits
  country: string;
}

export interface TravelerInfo {
  isPrimary: boolean;
  fullName: string;
  email?: string;
  phone?: string;
  gender: 'male' | 'female' | 'other';
  dob?: string;
  age?: number;
  passportNumber?: string;
  address?: IndianAddress;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
}

export interface PackageItineraryDay {
  day: number;
  title: string;
  subtitle: string;
  description: string;
  meals: string;
  stay: string;
  highlights: string[];
}

export interface TravelPackage {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  destinationId: string;
  destinationName: string;
  region: 'india' | 'international';
  durationDays: number;
  durationNights: number;
  startingPriceINR: number;
  originalPriceINR?: number;
  luxuryLevel: 'Bespoke Classic' | 'Ultra Luxury' | 'Royal Heritage' | 'Private Expedition';
  rating: number;
  reviewCount: number;
  bannerImage: string;
  galleryImages: string[];
  overview: string;
  bestSeason: string;
  itinerary: PackageItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  activities: string[];
  moods: string[];
  featured: boolean;
  active: boolean;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  stateOrCountry: string;
  region: 'india' | 'international';
  tagline: string;
  description: string;
  bestTimeToVisit: string;
  recommendedDuration: string;
  estimatedBudgetINR: number;
  temperatureCelsius: number;
  weatherCondition: string;
  coverImage: string;
  galleryImages: string[];
  popularExperiences: string[];
  featured: boolean;
  moods: string[];
}

export type BookingStatus =
  | 'Pending'
  | 'Payment Pending'
  | 'Confirmed'
  | 'Upcoming'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled'
  | 'Refund Pending'
  | 'Refunded';

export interface BookingAddOn {
  id: string;
  name: string;
  description: string;
  priceINR: number;
  selected: boolean;
}

export interface Booking {
  id: string; // TRV-2026-XXXXXX
  userId: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  packageId: string;
  packageTitle: string;
  destinationName: string;
  packageBannerImage: string;
  travelStartDate: string;
  travelEndDate: string;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfInfants: number;
  travelers: TravelerInfo[];
  addOns: BookingAddOn[];
  pricing: {
    basePricePerPersonINR: number;
    travelersSubtotalINR: number;
    addOnsTotalINR: number;
    gstINR: number; // 5% GST
    totalINR: number;
  };
  paymentStatus: 'paid' | 'pending' | 'refunded';
  bookingStatus: BookingStatus;
  paymentDetails?: {
    method: 'upi' | 'card' | 'netbanking';
    transactionId: string;
    paidAt: string;
  };
  createdAt: string;
  updatedAt: string;
  specialRequests?: string;
  assignedAgentName?: string;
}

export interface WhatsAppMessageLog {
  id: string;
  bookingId: string;
  customerName: string;
  phone: string;
  type: 'booking_confirmation' | 'payment_confirmation' | 'pickup_reminder' | 'itinerary_update' | 'cancellation';
  message: string;
  timestamp: string;
  status: 'delivered' | 'sent';
}

export interface TravelStory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  content: string[];
  destinationSlug: string;
}

export interface Review {
  id: string;
  customerName: string;
  customerCity: string;
  destinationName: string;
  packageTitle: string;
  rating: number;
  reviewText: string;
  travelDate: string;
  verifiedBooking: boolean;
}

export interface CustomJourneyRequest {
  destination: string;
  travelDates: { start: string; end: string };
  adults: number;
  children: number;
  budgetPerPersonINR: number;
  travelStyle: string;
  hotelCategory: string;
  preferredActivities: string[];
  specialCelebration?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}
