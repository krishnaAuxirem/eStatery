import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Phone, MessageCircle, Search, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/features/SectionHeader";
import { AGENTS } from "@/data/agents";

const Agents = () => {
  const [search, setSearch] = useState("");
  const filtered = AGENTS.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Expert Real Estate Agents</h1>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">Verified professionals with proven track records in India's premium property markets.</p>
            <div className="flex items-center gap-3 max-w-md mx-auto bg-white rounded-2xl px-4 py-3 shadow-brand">
              <Search className="w-4 h-4 text-brand-muted" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search agents by name or city..."
                className="flex-1 outline-none text-sm text-brand-text placeholder-brand-muted"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(agent => (
              <div key={agent.id} className="bg-white rounded-2xl border border-brand-border overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-brand-purple/10 to-brand-indigo/10 p-6">
                  <div className="flex items-start gap-4">
                    <img src={agent.avatar} alt={agent.name} className="w-20 h-20 rounded-2xl object-cover shadow-lg" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-brand-text text-lg">{agent.name}</h3>
                        {agent.verified && <CheckCircle className="w-4 h-4 text-brand-emerald" />}
                      </div>
                      <div className="flex items-center gap-1.5 text-brand-muted text-sm mb-2">
                        <MapPin className="w-3.5 h-3.5 text-brand-purple" /> {agent.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-brand-text text-sm">{agent.rating}</span>
                        <span className="text-brand-muted text-xs">({agent.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-brand-muted text-sm leading-relaxed mb-4 line-clamp-2">{agent.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {agent.specialization.slice(0, 2).map(s => (
                      <span key={s} className="px-2.5 py-1 rounded-full bg-purple-50 text-brand-purple text-xs font-medium">{s}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center mb-5 border-t border-brand-border pt-4">
                    <div><div className="font-bold text-brand-text">{agent.totalSales}</div><div className="text-brand-muted text-xs">Sales</div></div>
                    <div><div className="font-bold text-brand-text">{agent.totalRentals}</div><div className="text-brand-muted text-xs">Rentals</div></div>
                    <div><div className="font-bold text-brand-text">{agent.experience}yr</div><div className="text-brand-muted text-xs">Experience</div></div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-brand-border text-brand-text text-sm font-medium hover:border-brand-purple hover:text-brand-purple transition-all">
                      <Phone className="w-4 h-4" /> Call
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-purple text-white text-sm font-medium hover:bg-purple-700 transition-all">
                      <MessageCircle className="w-4 h-4" /> Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">👔</div>
              <h3 className="text-lg font-bold text-brand-text mb-2">No Agents Found</h3>
              <p className="text-brand-muted text-sm">Try a different search query.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Agents;
