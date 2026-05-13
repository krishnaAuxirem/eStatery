import type { Agent } from "@/types";
import agent1 from "@/assets/agent-1.jpg";
import agent2 from "@/assets/agent-2.jpg";
import agent3 from "@/assets/agent-3.jpg";

export const AGENTS: Agent[] = [
  {
    id: "agent-001",
    name: "Priya Sharma",
    email: "priya.sharma@estatery.com",
    phone: "+91 98765 43210",
    avatar: agent1,
    location: "Mumbai, Maharashtra",
    experience: 12,
    specialization: ["Luxury Apartments", "Penthouses", "Sea-facing Properties"],
    totalSales: 248,
    totalRentals: 183,
    rating: 4.9,
    reviews: 312,
    verified: true,
    bio: "Priya has 12+ years of premium real estate experience in Mumbai's luxury segment. She specializes in high-end waterfront properties and has closed deals worth over ₹500 Crore.",
    languages: ["English", "Hindi", "Marathi"]
  },
  {
    id: "agent-002",
    name: "Rajan Mehta",
    email: "rajan.mehta@estatery.com",
    phone: "+91 87654 32109",
    avatar: agent2,
    location: "Bangalore, Karnataka",
    experience: 9,
    specialization: ["Tech Corridor", "Residential Villas", "Commercial Spaces"],
    totalSales: 189,
    totalRentals: 267,
    rating: 4.8,
    reviews: 231,
    verified: true,
    bio: "Rajan is a top-performing agent in Bangalore's competitive real estate market. With deep knowledge of the IT corridor and tech hubs, he helps professionals find their perfect home or investment.",
    languages: ["English", "Hindi", "Kannada", "Gujarati"]
  },
  {
    id: "agent-003",
    name: "Ananya Kapoor",
    email: "ananya.kapoor@estatery.com",
    phone: "+91 76543 21098",
    avatar: agent3,
    location: "Gurgaon, Haryana",
    experience: 7,
    specialization: ["Premium Apartments", "NRI Investments", "Gated Communities"],
    totalSales: 134,
    totalRentals: 198,
    rating: 4.7,
    reviews: 187,
    verified: true,
    bio: "Ananya specializes in premium residential properties in Gurgaon and NCR region. She has a strong track record with NRI clients and helps them navigate India's real estate landscape seamlessly.",
    languages: ["English", "Hindi", "Punjabi"]
  }
];
