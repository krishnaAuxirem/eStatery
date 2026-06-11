import ChatModule from "@/components/features/ChatModule";

export default function SellerChats() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-bold text-[#0F172A] text-xl">Inbox Messages</h2>
        <p className="text-xs text-[#64748B] mt-0.5">Chat with potential buyers and listing agents regarding your properties.</p>
      </div>
      <ChatModule role="seller" />
    </div>
  );
}
