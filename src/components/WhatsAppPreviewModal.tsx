import React, { useState } from 'react';
import { X, Send, Phone, CheckCheck, Sparkles, MessageSquare } from 'lucide-react';
import { Booking } from '../types/travel';
import { api } from '../services/api';

interface WhatsAppPreviewModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppPreviewModal: React.FC<WhatsAppPreviewModalProps> = ({
  booking,
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'concierge' | 'user'; text: string; time: string }>>([
    {
      sender: 'concierge',
      text: `Namaste ${booking?.userName || 'Aarav Mehta'},\n\nYour luxury journey with Nirvana Luxury Expeditions is confirmed!\n\nBooking ID: ${booking?.id || 'TRV-2026-000123'}\nDestination: ${booking?.destinationName || 'Kashmir'}\nDates: ${booking?.travelStartDate || '12/10/2026'} – ${booking?.travelEndDate || '18/10/2026'}\nTravelers: ${booking?.numberOfAdults || 2} Adults\nStatus: Confirmed\n\nYour personal concierge, Priya Sharma, will receive you at arrival.`,
      time: '10:30 AM'
    },
    {
      sender: 'concierge',
      text: `Reminder: Your private chauffeur will be stationed at Terminal 1 with an illuminated placard bearing your name. Helpline: +91 98111 99999.`,
      time: '10:31 AM'
    }
  ]);

  const [inputVal, setInputVal] = useState('');

  if (!isOpen || !booking) return null;

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const userMsg = {
      sender: 'user' as const,
      text: inputVal,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'concierge',
          text: `Namaste ${booking.userName.split(' ')[0]}, received with pleasure! Our luxury concierge is reviewing your request immediately.`,
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };

  const sendTestPickupAlert = async () => {
    try {
      const res = await api.sendWhatsAppMessage(booking.id, 'pickup_reminder');
      setMessages(prev => [
        ...prev,
        {
          sender: 'concierge',
          text: res.message,
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      {/* Smartphone-like Luxury Frame */}
      <div className="relative bg-[#0e171b] border border-[#23353e] rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl flex flex-col h-[580px]">
        {/* Top Bar */}
        <div className="bg-[#1f2c34] p-3 flex items-center justify-between text-white border-b border-[#2a3942]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#c5a880] text-black font-semibold flex items-center justify-center text-xs">
              N
            </div>
            <div>
              <div className="text-xs font-semibold leading-tight">Nirvana Luxury Concierge</div>
              <div className="text-[10px] text-[#7ce79c] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7ce79c] inline-block animate-ping" />
                <span>Active 24/7 Verified</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-[#8e9cb2] hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Automation Actions Toolbar */}
        <div className="bg-[#121b22] px-3 py-1.5 border-b border-[#243046] flex items-center justify-between text-[10px] text-[#8e9cb2]">
          <span>Automated Triggers:</span>
          <button
            onClick={sendTestPickupAlert}
            className="text-[#7ce79c] hover:underline flex items-center gap-1 font-medium"
          >
            <Sparkles className="w-3 h-3" /> Send Chauffeur Alert
          </button>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-2.5 text-xs shadow ${
                  m.sender === 'user'
                    ? 'bg-[#005c4b] text-white rounded-tr-none'
                    : 'bg-[#202c33] text-[#e9edef] rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-white/50">
                  <span>{m.time}</span>
                  <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="bg-[#1f2c34] p-2.5 flex items-center gap-2 border-t border-[#2a3942]">
          <input
            type="text"
            placeholder="Type concierge message..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-[#2a3942] text-xs text-white rounded-full px-3.5 py-2 focus:outline-none placeholder-[#8696a0]"
          />
          <button
            onClick={handleSend}
            className="w-8 h-8 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white flex items-center justify-center transition-colors shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
