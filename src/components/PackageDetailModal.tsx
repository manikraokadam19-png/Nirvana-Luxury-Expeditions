import React, { useState } from 'react';
import { X, Clock, Calendar, Check, AlertCircle, ChevronDown, ChevronUp, ArrowRight, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { TravelPackage } from '../types/travel';

interface PackageDetailModalProps {
  pkg: TravelPackage | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (pkg: TravelPackage) => void;
  onCustomize: (pkg: TravelPackage) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  pkg,
  isOpen,
  onClose,
  onBookNow,
  onCustomize
}) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  if (!isOpen || !pkg) return null;

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#0b0f17] border border-[#243046] rounded-sm max-w-4xl w-full my-6 overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Banner */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={pkg.bannerImage}
            alt={pkg.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/50 to-transparent" />

          {/* Hero Content */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#dfc294] font-medium mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{pkg.destinationName}</span>
              <span aria-hidden="true" className="text-white/40">·</span>
              <span>{pkg.luxuryLevel}</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight max-w-2xl">
              {pkg.title}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#cbd5e1] font-light max-w-xl">
              {pkg.tagline}
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-4 pt-3 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-[#e2e8f0]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#c5a880]" />
                <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#c5a880]" />
                <span>Best: {pkg.bestSeason}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                <span>Private Chauffeur & VIP Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Strip */}
        <div className="bg-[#121824] border-y border-[#243046] px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#8e9cb2]">Starting From</div>
            <div className="flex items-baseline gap-2">
              <span className="font-editorial text-3xl text-white font-mono tabular-nums">
                ₹{pkg.startingPriceINR.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#8e9cb2]">/ person + 5% GST</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onCustomize(pkg);
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 border border-[#c5a880]/60 hover:border-[#c5a880] text-xs uppercase tracking-wider text-[#dfc294] hover:text-white rounded-sm transition-colors text-center"
            >
              Customize
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(pkg);
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-[#c5a880] hover:bg-[#dfc294] text-[#0b0f17] text-xs uppercase tracking-widest font-semibold rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Book This Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-10">
          {/* Overview */}
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#dfc294] font-medium mb-2">
              The Experience
            </h2>
            <p className="text-sm sm:text-base text-[#cbd5e1] font-light leading-relaxed">
              {pkg.overview}
            </p>
          </div>

          {/* Day-by-Day Timeline Itinerary */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#dfc294] font-medium">
                Day-by-Day Curated Timeline
              </h2>
              <span className="text-xs text-[#8e9cb2]">{pkg.itinerary.length} Days</span>
            </div>

            <div className="space-y-3">
              {pkg.itinerary.map((day) => {
                const isExpanded = expandedDay === day.day;
                return (
                  <div
                    key={day.day}
                    className="border border-[#243046] rounded-sm bg-[#121824] overflow-hidden"
                  >
                    <button
                      onClick={() => toggleDay(day.day)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-[#162030] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-editorial text-xl text-[#dfc294] font-mono tabular-nums">
                          DAY 0{day.day}
                        </span>
                        <div>
                          <div className="font-medium text-sm text-white">{day.title}</div>
                          <div className="text-xs text-[#8e9cb2]">{day.subtitle}</div>
                        </div>
                      </div>
                      <div className="text-[#8e9cb2]">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-[#cbd5e1] border-t border-[#1a2334] space-y-3">
                        <p className="leading-relaxed font-light">{day.description}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs">
                          <div className="bg-[#0b0f17] p-2.5 rounded border border-[#1a2334]">
                            <span className="text-[#8e9cb2] uppercase tracking-wider text-[10px] block font-semibold">Stay</span>
                            <span className="text-white font-medium">{day.stay}</span>
                          </div>
                          <div className="bg-[#0b0f17] p-2.5 rounded border border-[#1a2334]">
                            <span className="text-[#8e9cb2] uppercase tracking-wider text-[10px] block font-semibold">Culinary</span>
                            <span className="text-white font-medium">{day.meals}</span>
                          </div>
                        </div>

                        {day.highlights && day.highlights.length > 0 && (
                          <div className="pt-2 flex flex-wrap gap-2">
                            {day.highlights.map((h, idx) => (
                              <span key={idx} className="text-xs text-[#dfc294] bg-[#c5a880]/10 px-2.5 py-1 rounded border border-[#c5a880]/20">
                                ✦ {h}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inclusions and Exclusions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#1a2334]">
            {/* Inclusions */}
            <div className="bg-[#121824] p-5 rounded-sm border border-[#243046]">
              <h3 className="text-xs uppercase tracking-widest text-[#dfc294] font-semibold flex items-center gap-2 mb-4">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Package Inclusions</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-[#cbd5e1]">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-[#121824] p-5 rounded-sm border border-[#243046]">
              <h3 className="text-xs uppercase tracking-widest text-[#a7b5cc] font-semibold flex items-center gap-2 mb-4">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>Exclusions & Notes</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-[#8e9cb2]">
                {pkg.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-rose-400 mt-0.5">✕</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
