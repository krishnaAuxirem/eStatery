import type { User } from "@/types";

export const DEMO_USERS: User[] = [
  {
    id: "user-buyer-001",
    name: "Arjun Verma",
    email: "buyer@estatery.com",
    role: "buyer",
    phone: "+91 99887 76655",
    location: "Mumbai, Maharashtra",
    bio: "Looking for premium properties in Mumbai and Bangalore",
    verified: true,
    createdAt: "2024-08-15",
    savedProperties: ["prop-001", "prop-002"]
  },
  {
    id: "user-seller-001",
    name: "Vikram Malhotra",
    email: "seller@estatery.com",
    role: "seller",
    phone: "+91 88776 65544",
    location: "Mumbai, Maharashtra",
    bio: "Premium property developer with 20+ years of experience",
    verified: true,
    createdAt: "2024-06-10",
    savedProperties: []
  },
  {
    id: "user-agent-001",
    name: "Rajan Mehta",
    email: "agent@estatery.com",
    role: "agent",
    phone: "+91 77665 54433",
    location: "Bangalore, Karnataka",
    bio: "Senior real estate agent specializing in luxury properties",
    verified: true,
    createdAt: "2024-05-20",
    savedProperties: []
  },
  {
    id: "user-tenant-001",
    name: "Kavya Nair",
    email: "tenant@estatery.com",
    role: "tenant",
    phone: "+91 66554 43322",
    location: "Gurgaon, Haryana",
    bio: "IT professional looking for quality rental options",
    verified: true,
    createdAt: "2024-09-01",
    savedProperties: ["prop-003"]
  },
  {
    id: "user-admin-001",
    name: "Admin User",
    email: "admin@estatery.com",
    role: "admin",
    phone: "+91 55443 32211",
    location: "Delhi, India",
    bio: "eStatery Platform Administrator",
    verified: true,
    createdAt: "2024-01-01",
    savedProperties: []
  }
];

export const DEMO_CREDENTIALS = [
  { role: "Buyer", email: "buyer@estatery.com", password: "123456" },
  { role: "Seller", email: "seller@estatery.com", password: "seller123" },
  { role: "Agent", email: "agent@estatery.com", password: "agent123" },
  { role: "Tenant", email: "tenant@estatery.com", password: "tenant123" },
  { role: "Admin", email: "admin@estatery.com", password: "admin123" }
];

export const PASSWORDS: Record<string, string> = {
  "buyer@estatery.com": "123456",
  "seller@estatery.com": "seller123",
  "agent@estatery.com": "agent123",
  "tenant@estatery.com": "tenant123",
  "admin@estatery.com": "admin123"
};
