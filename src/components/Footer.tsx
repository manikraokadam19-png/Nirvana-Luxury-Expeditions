import React from 'react';
import { Phone, Mail, MapPin, Compass, Shield, Clock, Heart } from 'lucide-react';

interface FooterProps {
  onPlanTrip: () => void;
  onNavigateTab: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onPlanTrip, onNavigateTab }) => {
  return (
    <footer className="bg-[#070a10] border-t border-[#1a2334] text-[#8e9cb2] text-xs">
      {/* Big Final Call to Action Section */}
      <div className="py-20 sm:py-28 border-b border-[#1a2334] text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#dfc294] font-medium block">
            Begin the Expedition
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-white font-normal leading-[1.08] [text-wrap:balance]">
            YOUR NEXT STORY <br />
            <span className="italic font-light text-[#f4ede4]">STARTS HERE.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#cbd5e1] font-light max-w-xl mx-auto">
            Speak with our senior expedition curators to design a private itinerary tailored exclusively to your vision.
          </p>
          <div className="pt-4">
            <button
              onClick={onPlanTrip}
              className="px-10 py-4 bg-[#c5a880] hover:bg-[#dfc294] text-black text-xs uppercase tracking-[0.25em] font-semibold rounded-sm transition-all shadow-2xl"
            >
              PLAN MY JOURNEY
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Indian Trust Coordinates */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-editorial text-2xl tracking-[0.2em] font-medium text-white block">
              NIRVANA
            </span>
            <p className="text-xs text-[#8e9cb2] font-light leading-relaxed max-w-sm">
              India’s premier bespoke travel agency and luxury expedition platform. Handcrafting unforgettable private journeys across Kashmir, Rajasthan, Kerala, the Himalayas, and international sanctuaries.
            </p>
            <div className="pt-2 text-[11px] space-y-1 text-[#a7b5cc]">
              <div>Asia/Kolkata Operating Time: 09:00 AM – 09:00 PM IST</div>
              <div>Registered Tour Operator: Ministry of Tourism, Govt. of India</div>
            </div>
          </div>

          {/* Destinational Realms */}
          <div className="space-y-3">
            <div className="text-[11px] uppercase tracking-wider text-white font-semibold">Indian Sanctuaries</div>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigateTab('packages')} className="hover:text-white transition-colors">Kashmir Valley & Gulmarg</button></li>
              <li><button onClick={() => onNavigateTab('packages')} className="hover:text-white transition-colors">Rajasthan Royal Palaces</button></li>
              <li><button onClick={() => onNavigateTab('packages')} className="hover:text-white transition-colors">Kerala Backwaters & Tea Hills</button></li>
              <li><button onClick={() => onNavigateTab('packages')} className="hover:text-white transition-colors">Ladakh High Moonscapes</button></li>
              <li><button onClick={() => onNavigateTab('packages')} className="hover:text-white transition-colors">Andaman Coral Islands</button></li>
            </ul>
          </div>

          {/* International Sanctuaries */}
          <div className="space-y-3">
            <div className="text-[11px] uppercase tracking-wider text-white font-semibold">Global Expeditions</div>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigateTab('packages')} className="hover:text-white transition-colors">Maldives Overwater Sanctuary</button></li>
              <li><button onClick={() => onNavigateTab('packages')} className="hover:text-white transition-colors">Switzerland Glacier Express</button></li>
              <li><button onClick={() => onNavigateTab('packages')} className="hover:text-white transition-colors">Bali Sacred Rainforests</button></li>
              <li><button onClick={() => onNavigateTab('packages')} className="hover:text-white transition-colors">Dubai Desert Starlight</button></li>
              <li><button onClick={() => onNavigateTab('packages')} className="hover:text-white transition-colors">Amalfi Coast Luxury Villas</button></li>
            </ul>
          </div>

          {/* Concierge & Legal Coordinates */}
          <div className="space-y-3">
            <div className="text-[11px] uppercase tracking-wider text-white font-semibold">Direct Concierge</div>
            <div className="space-y-2 text-xs">
              <a href="tel:+919811199999" className="flex items-center gap-2 hover:text-[#dfc294] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>+91 98111 99999</span>
              </a>
              <a href="mailto:concierge@nirvanavoyages.com" className="flex items-center gap-2 hover:text-[#dfc294] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>concierge@nirvanavoyages.com</span>
              </a>
              <div className="flex items-start gap-2 pt-1 text-[11px] text-[#8e9cb2]">
                <MapPin className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                <span>Level 14, One Horizon Center, Golf Course Road, DLF Phase 5, Gurugram, Delhi NCR 122002</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-[#1a2334] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#64748b]">
          <div>
            © 2026 Nirvana Luxury Expeditions Private Limited. All rights reserved. GSTIN: 07AAACN1234F1Z8.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-white cursor-pointer">Booking Terms</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-white cursor-pointer">Cancellation & Refunds</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#dfc294]">Currency: ₹ INR</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
