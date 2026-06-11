import ChatModule from "@/components/features/ChatModule";

export default function BuyerChats() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-bold text-[#0F172A] text-xl">My Messages</h2>
        <p className="text-xs text-[#64748B] mt-0.5">Communicate directly with property owners and relationship agents.</p>
      </div>
      <ChatModule role="buyer" />
    </div>
  );
}
