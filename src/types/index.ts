export type UserRole = "buyer" | "seller" | "agent" | "tenant" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  location?: string;
  bio?: string;
  verified: boolean;
  createdAt: string;
  savedProperties?: string[];
}

export interface Property {
  id: string;
  title: string;
  type: "apartment" | "villa" | "house" | "commercial" | "studio" | "penthouse";
  listingType: "buy" | "rent";
  price: number;
  priceUnit?: "month" | "year";
  location: {
    city: string;
    area: string;
    address: string;
    lat?: number;
    lng?: number;
  };
  specs: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    parking: number;
    floor?: number;
    totalFloors?: number;
  };
  features: string[];
  images: string[];
  description: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  status: "active" | "pending" | "sold" | "rented";
  verified: boolean;
  featured: boolean;
  rating: number;
  reviews: number;
  virtualTour?: boolean;
  postedDate: string;
  views: number;
  amenities: string[];
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  experience: number;
  specialization: string[];
  totalSales: number;
  totalRentals: number;
  rating: number;
  reviews: number;
  verified: boolean;
  bio: string;
  languages: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  author: string;
  authorAvatar?: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
  published: boolean;
  views: number;
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  userId: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  type: "visit" | "virtual";
  notes?: string;
  createdAt: string;
}

export interface MaintenanceRequest {
  id: string;
  tenantId: string;
  propertyId: string;
  propertyTitle: string;
  issue: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in-progress" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface ReviewItem {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}
