import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useProperty } from "@/context/PropertyContext";
import { toast } from "sonner";

export default function SellerProfile() {
  const { user, updateProfile } = useAuth();
  const { allProperties } = useProperty();

  const myProps = allProperties.filter(p => p.ownerId === user?.id || p.ownerName === user?.name);
  const totalViews = myProps.reduce((s: number, p: any) => s + p.views, 0);
  const activeListings = myProps.filter((p: any) => p.status === "active").length;

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [bio, setBio] = useState(user?.bio || "");

  const handleSave = () => {
    updateProfile({ name, phone, bio });
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="max-w-2xl">
      <h2 className="font-bold text-[#0F172A] text-xl mb-6">My Profile</h2>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-[#1D4ED8] to-[#2563EB]" />
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-8 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] flex items-center justify-center text-white font-extrabold text-2xl shadow-lg ring-4 ring-white">{user?.name?.charAt(0)}</div>
            <div className="mb-1"><h3 className="font-bold text-[#0F172A] text-lg">{user?.name}</h3><p className="text-[#64748B] text-sm">{user?.email}</p></div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Phone Number</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Bio</label>
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} placeholder="Tell us about yourself..."
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 resize-none transition-all" />
            </div>
            <button onClick={handleSave} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] text-white font-bold text-sm hover:shadow-lg transition-all">Save Changes</button>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#E2E8F0]">
            {[
              { label: "Total Listings", value: myProps.length }, { label: "Active Listings", value: activeListings },
              { label: "Total Views", value: totalViews.toLocaleString() }, { label: "Member Since", value: "Jan 2025" },
            ].map(s => (
              <div key={s.label} className="p-4 bg-[#F5F7FA] rounded-xl text-center">
                <div className="text-xl font-bold text-[#0F172A]">{s.value}</div>
                <div className="text-[#64748B] text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
