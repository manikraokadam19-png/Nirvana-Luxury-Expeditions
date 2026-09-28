import React from 'react';
import { Heart, Users, Sparkles, ArrowRight } from 'lucide-react';
import { HERO_IMAGE, KERALA_IMAGE, RAJASTHAN_IMAGE } from '../data/travelData';

interface HoneymoonAndFamilySectionProps {
  onPlanTrip: (style: string) => void;
}

export const HoneymoonAndFamilySection: React.FC<HoneymoonAndFamilySectionProps> = ({ onPlanTrip }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#121824] border-t border-[#1a2334]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* HONEYMOON FEATURE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 relative h-[380px] sm:h-[480px] rounded-sm overflow-hidden border border-[#243046]">
            <img
              src={HERO_IMAGE}
              alt="Honeymoon in Kashmir Dal Lake"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-xs text-[#dfc294] font-medium tracking-widest uppercase">
              Kashmir · Maldives · Bali · Switzerland
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#dfc294] font-semibold">
              <Heart className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Romantic Sanctuaries</span>
            </div>

            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              JUST THE <br />
              <span className="italic font-light text-[#f4ede4]">TWO OF YOU.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#cbd5e1] font-light leading-relaxed">
              Drift along silent cedar waters under starlight, awaken in secluded overwater villas, and toast with vintage champagne above the clouds. We orchestrate private candlelight dining and quiet sanctuaries designed purely for two.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onPlanTrip('Romantic')}
                className="px-8 py-3.5 bg-[#c5a880] hover:bg-[#dfc294] text-black text-xs uppercase tracking-widest font-semibold rounded-sm transition-all shadow-xl inline-flex items-center gap-2"
              >
                <span>Plan Your Honeymoon</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* FAMILY TRAVEL FEATURE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-[#1a2334]">
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#dfc294] font-semibold">
              <Users className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Multi-Generation Expeditions</span>
            </div>

            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              MEMORIES THEY'LL TALK ABOUT <br />
              <span className="italic font-light text-[#f4ede4]">FOR YEARS.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#cbd5e1] font-light leading-relaxed">
              Expeditions designed with seamless comfort for elders and stimulating wildlife discovery for young explorers. Stay in private interconnected palace suites, enjoy dedicated chauffeurs throughout, and travel without the stress of logistics.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onPlanTrip('Family')}
                className="px-8 py-3.5 bg-[#c5a880] hover:bg-[#dfc294] text-black text-xs uppercase tracking-widest font-semibold rounded-sm transition-all shadow-xl inline-flex items-center gap-2"
              >
                <span>Plan Family Vacation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[380px] sm:h-[480px] rounded-sm overflow-hidden border border-[#243046] order-1 lg:order-2">
            <img
              src={KERALA_IMAGE}
              alt="Family Backwaters in Kerala"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-xs text-[#dfc294] font-medium tracking-widest uppercase">
              Kerala · Rajasthan · Switzerland · Goa
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
