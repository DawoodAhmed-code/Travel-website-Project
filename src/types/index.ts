export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meal?: string;
  accommodation?: string;
}

export interface DepartureDate {
  date: string;
  seatsTotal: number;
  seatsAvailable: number;
  status: 'Available' | 'Filling Fast' | 'Sold Out';
}

export interface Tour {
  id: string;
  title: string;
  slug: string;
  destination: string;
  region: string;
  description: string;
  shortDescription: string;
  pricePerPerson: number;
  originalPrice?: number;
  durationDays: number;
  durationNights: number;
  coverImage: string;
  images: string[];
  itinerary: ItineraryDay[];
  includedServices: string[];
  excludedServices: string[];
  departureDates: DepartureDate[];
  meetingPoint: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Strenuous';
  rating: number;
  reviewsCount: number;
  published: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export type EnquiryStatus = 'Pending' | 'Contacted' | 'Confirmed' | 'Cancelled';

export interface BookingEnquiry {
  id: string;
  tourId: string;
  tourTitle: string;
  tourSlug: string;
  destination: string;
  userId?: string | null;
  travellerName: string;
  travellerEmail: string;
  travellerPhone: string;
  departureDate: string;
  travellerCount: number;
  quotedPricePerPerson: number;
  quotedTotal: number;
  status: EnquiryStatus;
  specialRequests?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'New' | 'Read' | 'Replied';
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  tourId?: string;
  authorName: string;
  avatar?: string;
  location: string;
  rating: number;
  comment: string;
  tourTitle: string;
  date: string;
}
