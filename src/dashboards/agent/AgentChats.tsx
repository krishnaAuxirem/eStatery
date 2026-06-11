import ChatModule from "@/components/features/ChatModule";

export default function AgentChats() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-bold text-[#0F172A] text-xl">Chat Center</h2>
        <p className="text-xs text-[#64748B] mt-0.5">Interact with assigned clients, buyers, and property listings owners.</p>
      </div>
      <ChatModule role="agent" />
    </div>
  );
}
