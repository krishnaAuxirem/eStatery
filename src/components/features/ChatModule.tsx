import { useState, useEffect, useRef } from "react";
import { 
  Send, Image as ImageIcon, Paperclip, CheckCheck, Circle, 
  Smile, Search, ArrowLeft, Bot, User, Check
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  status: "sent" | "read";
  file?: {
    name: string;
    type: "image" | "document";
    url: string;
  };
}

interface ChatSession {
  id: string;
  participantName: string;
  participantRole: "buyer" | "seller" | "agent";
  participantAvatar?: string;
  lastMessageText: string;
  unreadCount: number;
  messages: Message[];
}

interface ChatModuleProps {
  role: "buyer" | "seller" | "agent";
}

export default function ChatModule({ role }: ChatModuleProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string>("");
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversations based on the user's role
  useEffect(() => {
    const storageKey = `estatery_chat_sessions_${role}`;
    const local = localStorage.getItem(storageKey);
    
    if (local) {
      const parsed = JSON.parse(local);
      setSessions(parsed);
      if (parsed.length > 0) {
        setSelectedSessionId(parsed[0].id);
      }
    } else {
      // Setup premium default mock chats depending on logged-in role
      let defaults: ChatSession[] = [];

      if (role === "buyer") {
        defaults = [
          {
            id: "chat-seller-1",
            participantName: "Rajesh Kumar",
            participantRole: "seller",
            unreadCount: 2,
            lastMessageText: "Sure, let's schedule a site visit this weekend.",
            messages: [
              { id: "m1", senderId: "seller", senderName: "Rajesh Kumar", text: "Hello! Thank you for inquiring about Sky Residences Penthouse.", timestamp: "10:15 AM", status: "read" },
              { id: "m2", senderId: "buyer", senderName: "You", text: "Hi Rajesh, is the price slightly negotiable?", timestamp: "10:18 AM", status: "read" },
              { id: "m3", senderId: "seller", senderName: "Rajesh Kumar", text: "We can discuss the final offer face-to-face. Sure, let's schedule a site visit this weekend.", timestamp: "10:20 AM", status: "read" },
            ]
          },
          {
            id: "chat-agent-1",
            participantName: "Alok Sharma (eStatery Partner)",
            participantRole: "agent",
            unreadCount: 0,
            lastMessageText: "I've uploaded the official valuation certificate for Gurgaon properties.",
            messages: [
              { id: "a1", senderId: "agent", senderName: "Alok Sharma", text: "Hello! I am your assigned relationship manager.", timestamp: "Yesterday", status: "read" },
              { id: "a2", senderId: "buyer", senderName: "You", text: "Great! Can you share the neighborhood ROI indices?", timestamp: "Yesterday", status: "read" },
              { id: "a3", senderId: "agent", senderName: "Alok Sharma", text: "I've uploaded the official valuation certificate for Gurgaon properties.", timestamp: "Yesterday", status: "read" },
            ]
          }
        ];
      } else if (role === "seller") {
        defaults = [
          {
            id: "chat-buyer-1",
            participantName: "Arjun Mehta",
            participantRole: "buyer",
            unreadCount: 1,
            lastMessageText: "Is the documentation fully verified?",
            messages: [
              { id: "b1", senderId: "buyer", senderName: "Arjun Mehta", text: "Hi, I saw your listing for DLF Towers.", timestamp: "09:00 AM", status: "read" },
              { id: "b2", senderId: "seller", senderName: "You", text: "Hi Arjun, yes, it's open for visits.", timestamp: "09:05 AM", status: "read" },
              { id: "b3", senderId: "buyer", senderName: "Arjun Mehta", text: "Is the documentation fully verified?", timestamp: "09:07 AM", status: "read" },
            ]
          },
          {
            id: "chat-agent-2",
            participantName: "Priya Singh",
            participantRole: "agent",
            unreadCount: 0,
            lastMessageText: "Your listing has been promoted to featured status successfully.",
            messages: [
              { id: "c1", senderId: "agent", senderName: "Priya Singh", text: "Hello, I can assist you in verifying and marketing your property.", timestamp: "2 days ago", status: "read" },
              { id: "c2", senderId: "seller", senderName: "You", text: "Thanks Priya, let's run the premium tier boost.", timestamp: "2 days ago", status: "read" },
              { id: "c3", senderId: "agent", senderName: "Priya Singh", text: "Your listing has been promoted to featured status successfully.", timestamp: "2 days ago", status: "read" },
            ]
          }
        ];
      } else { // Agent
        defaults = [
          {
            id: "chat-buyer-2",
            participantName: "Sneha Patel",
            participantRole: "buyer",
            unreadCount: 1,
            lastMessageText: "Can we do a Zoom virtual walkthrough?",
            messages: [
              { id: "d1", senderId: "buyer", senderName: "Sneha Patel", text: "Hi, I am looking for luxury villas in Bangalore.", timestamp: "08:30 AM", status: "read" },
              { id: "d2", senderId: "agent", senderName: "You", text: "Of course Sneha! I have three beautiful listings.", timestamp: "08:45 AM", status: "read" },
              { id: "d3", senderId: "buyer", senderName: "Sneha Patel", text: "Can we do a Zoom virtual walkthrough?", timestamp: "08:50 AM", status: "read" },
            ]
          },
          {
            id: "chat-seller-3",
            participantName: "Harish Rao",
            participantRole: "seller",
            unreadCount: 0,
            lastMessageText: "Approved the commission invoice. Please proceed with registration.",
            messages: [
              { id: "e1", senderId: "seller", senderName: "Harish Rao", text: "Hi Harish, I've got a buyer interested in your commercial space.", timestamp: "Yesterday", status: "read" },
              { id: "e2", senderId: "agent", senderName: "You", text: "Excellent, please check the commission structure in your dashboard.", timestamp: "Yesterday", status: "read" },
              { id: "e3", senderId: "seller", senderName: "Harish Rao", text: "Approved the commission invoice. Please proceed with registration.", timestamp: "Yesterday", status: "read" },
            ]
          }
        ];
      }

      setSessions(defaults);
      localStorage.setItem(storageKey, JSON.stringify(defaults));
      if (defaults.length > 0) {
        setSelectedSessionId(defaults[0].id);
      }
    }
  }, [role]);

  // Scroll to bottom of message list on update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, selectedSessionId, isTyping]);

  const activeSession = sessions.find(s => s.id === selectedSessionId);

  const saveSessions = (updated: ChatSession[]) => {
    const storageKey = `estatery_chat_sessions_${role}`;
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setSessions(updated);
  };

  const handleSendMessage = (
    textToSend = inputText, 
    fileAttachment?: { name: string; type: "image" | "document"; url: string; }
  ) => {
    if (!textToSend.trim() && !fileAttachment) return;
    if (!activeSession) return;

    const timeString = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: role,
      senderName: "You",
      text: textToSend,
      timestamp: timeString,
      status: "sent",
      file: fileAttachment
    };

    const updatedSession = {
      ...activeSession,
      unreadCount: 0,
      lastMessageText: fileAttachment ? `Shared a ${fileAttachment.type}` : textToSend,
      messages: [...activeSession.messages, newMsg]
    };

    const updatedSessions = sessions.map(s => s.id === activeSession.id ? updatedSession : s);
    saveSessions(updatedSessions);
    setInputText("");

    // Simulate Reply Agent
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const replies = [
        "Sounds good! Let me cross check with the office registry and confirm.",
        "Got it! I am reviewing the documents right now.",
        "Sure, I am available. Does tomorrow 4:00 PM work for you?",
        "Excellent. Let's arrange a call to close the paperwork soon."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      const replyMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        senderId: activeSession.participantRole,
        senderName: activeSession.participantName,
        text: randomReply,
        timestamp: replyTime,
        status: "read"
      };

      const finalSession = {
        ...updatedSession,
        lastMessageText: randomReply,
        messages: [...updatedSession.messages, replyMsg]
      };

      const finalSessions = sessions.map(s => s.id === activeSession.id ? finalSession : s);
      saveSessions(finalSessions);
    }, 2500);
  };

  // Mock File upload handler
  const triggerMockUpload = (type: "image" | "document") => {
    const fileName = type === "image" ? "property_view_elevation.jpg" : "lease_draft_unsigned.pdf";
    const attachment = {
      name: fileName,
      type: type,
      url: type === "image" 
        ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600" 
        : "#"
    };
    
    toast.success(`Mock ${type} uploaded: ${fileName}`);
    handleSendMessage(`Sent attachment: ${fileName}`, attachment);
  };

  const filteredSessions = sessions.filter(s => 
    s.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-[600px] bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden flex shadow-brand-lg">
      
      {/* Sidebar List */}
      <div className="w-80 border-r border-[#E2E8F0] flex flex-col bg-slate-50/50 shrink-0">
        
        {/* Search header */}
        <div className="p-4 border-b border-[#E2E8F0] bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search chat list..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1D4ED8] bg-slate-50 focus:bg-white transition-all font-semibold"
            />
          </div>
        </div>

        {/* List of active chats */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filteredSessions.map((s) => {
            const isActive = s.id === selectedSessionId;
            return (
              <div
                key={s.id}
                onClick={() => {
                  setSelectedSessionId(s.id);
                  // Mark as read
                  const updated = sessions.map(x => x.id === s.id ? { ...x, unreadCount: 0 } : x);
                  saveSessions(updated);
                }}
                className={`p-4 flex gap-3 cursor-pointer transition-colors relative ${
                  isActive ? "bg-blue-50/70 border-l-4 border-[#1D4ED8]" : "hover:bg-slate-50"
                }`}
              >
                {/* Avatar dot */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1D4ED8]/10 to-[#2563EB]/20 flex items-center justify-center text-[#1D4ED8] font-bold text-sm shrink-0 border border-blue-100">
                  {s.participantName.charAt(0)}
                </div>
                
                {/* Meta details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-extrabold text-slate-800 text-xs truncate">{s.participantName}</h4>
                    <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0">{s.participantRole}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] truncate mt-1 font-medium">{s.lastMessageText}</p>
                </div>

                {/* Badges */}
                {s.unreadCount > 0 && !isActive && (
                  <span className="absolute right-4 bottom-4 w-4 h-4 rounded-full bg-red-500 text-white font-extrabold text-[9px] flex items-center justify-center">
                    {s.unreadCount}
                  </span>
                )}
              </div>
            );
          })}
          {filteredSessions.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400 font-bold">No active conversations found.</div>
          )}
        </div>
      </div>

      {/* Conversation Area */}
      {activeSession ? (
        <div className="flex-1 flex flex-col bg-white">
          
          {/* Active Header */}
          <div className="p-4 border-b border-[#E2E8F0] bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] flex items-center justify-center text-white font-bold text-sm">
                {activeSession.participantName.charAt(0)}
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm">{activeSession.participantName}</h3>
                <p className="text-[10px] text-emerald-600 font-bold uppercase flex items-center gap-1">
                  <Circle className="w-1.5 h-1.5 fill-emerald-500 text-emerald-500" /> Active Now
                </p>
              </div>
            </div>
          </div>

          {/* Messages Window */}
          <div className="flex-1 p-5 overflow-y-auto bg-slate-50/40 space-y-4">
            {activeSession.messages.map((m) => {
              const isMe = m.senderId === role;
              return (
                <div key={m.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] rounded-2xl p-3.5 space-y-1.5 shadow-sm border ${
                    isMe 
                      ? "bg-[#1D4ED8] text-white border-blue-600 rounded-tr-none" 
                      : "bg-white text-slate-800 border-slate-100 rounded-tl-none"
                  }`}>
                    {/* Attachment preview */}
                    {m.file && (
                      <div className={`p-2.5 rounded-xl border mb-2 flex items-center gap-2 ${
                        isMe ? "bg-blue-800/50 border-blue-700" : "bg-slate-50 border-slate-100"
                      }`}>
                        {m.file.type === "image" ? (
                          <>
                            <ImageIcon className="w-5 h-5 shrink-0" />
                            <a href={m.file.url} target="_blank" rel="noreferrer" className="text-xs font-bold underline truncate max-w-[150px]">{m.file.name}</a>
                          </>
                        ) : (
                          <>
                            <Paperclip className="w-5 h-5 shrink-0" />
                            <span className="text-xs font-bold truncate max-w-[150px]">{m.file.name}</span>
                          </>
                        )}
                      </div>
                    )}
                    
                    <p className="text-xs font-medium leading-relaxed">{m.text}</p>
                    
                    <div className="flex items-center justify-end gap-1 text-[9px] opacity-75">
                      <span>{m.timestamp}</span>
                      {isMe && <CheckCheck className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Live Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-500 rounded-2xl rounded-tl-none p-3.5 border border-slate-100 shadow-sm flex items-center gap-1.5">
                  <span className="text-xs font-bold">{activeSession.participantName} is typing</span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Typing Bar input */}
          <div className="p-4 border-t border-[#E2E8F0] bg-white flex items-center gap-3">
            <button
              onClick={() => triggerMockUpload("image")}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-[#1D4ED8] text-slate-500 hover:text-[#1D4ED8] transition-all bg-slate-50"
              title="Upload Image"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => triggerMockUpload("document")}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-[#1D4ED8] text-slate-500 hover:text-[#1D4ED8] transition-all bg-slate-50"
              title="Attach Document"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            
            <input
              type="text"
              placeholder="Type your message here..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSendMessage()}
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1D4ED8]"
            />
            
            <button
              onClick={() => handleSendMessage()}
              className="p-2.5 bg-[#1D4ED8] hover:bg-blue-700 text-white rounded-xl transition-all shadow-md flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/30 text-center">
          <Bot className="w-16 h-16 text-[#E2E8F0] mb-3" />
          <h3 className="font-extrabold text-slate-700">Inbox Messenger</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">Select a contact from the sidebar list to start exchanging real estate messages and documents.</p>
        </div>
      )}

    </div>
  );
}
