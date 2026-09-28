import React, { useState } from 'react';
import { ArrowRight, Clock, Star, Sparkles, Filter } from 'lucide-react';
import { TravelPackage } from '../types/travel';

interface FeaturedJourneysProps {
  packages: TravelPackage[];
  onSelectPackage: (pkg: TravelPackage) => void;
  onBookDirect: (pkg: TravelPackage) => void;
}

export const FeaturedJourneys: React.FC<FeaturedJourneysProps> = ({
  packages,
  onSelectPackage,
  onBookDirect
}) => {
  const [regionFilter, setRegionFilter] = useState<'all' | 'india' | 'international'>('all');
  const [budgetFilter, setBudgetFilter] = useState<'all' | 'under50k' | '50kto100k' | 'above100k'>('all');

  const filteredPackages = packages.filter(pkg => {
    if (regionFilter !== 'all' && pkg.region !== regionFilter) return false;
    if (budgetFilter === 'under50k' && pkg.startingPriceINR >= 50000) return false;
    if (budgetFilter === '50kto100k' && (pkg.startingPriceINR < 50000 || pkg.startingPriceINR > 100000)) return false;
    if (budgetFilter === 'above100k' && pkg.startingPriceINR <= 100000) return false;
    return true;
  });

  return (
    <section id="packages-section" className="py-20 sm:py-28 bg-[#0b0f17] border-t border-[#1a2334]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#dfc294] font-medium mb-3">
              Handcrafted Itineraries
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              CURATED <span className="italic font-light text-[#f4ede4]">JOURNEYS</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-[#8e9cb2] max-w-md font-light leading-relaxed">
            Every journey is conceived with private transfers, 5-star heritage stays, and intimate access typically reserved for royalty.
          </p>
        </div>

        {/* Filter Controls (Functional button segmented controls conforming to zero-pill rules) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-[#1a2334]">
          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#121824] rounded-sm border border-[#243046]">
            <button
              onClick={() => setRegionFilter('all')}
              className={`px-3 sm:px-4 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                regionFilter === 'all' ? 'bg-[#c5a880] text-black font-semibold' : 'text-[#8e9cb2] hover:text-white'
              }`}
            >
              All Realms
            </button>
            <button
              onClick={() => setRegionFilter('india')}
              className={`px-3 sm:px-4 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                regionFilter === 'india' ? 'bg-[#c5a880] text-black font-semibold' : 'text-[#8e9cb2] hover:text-white'
              }`}
            >
              India Expeditions
            </button>
            <button
              onClick={() => setRegionFilter('international')}
              className={`px-3 sm:px-4 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                regionFilter === 'international' ? 'bg-[#c5a880] text-black font-semibold' : 'text-[#8e9cb2] hover:text-white'
              }`}
            >
              International
            </button>
          </div>

          {/* Budget Filter */}
          <div className="flex items-center gap-2 text-xs text-[#8e9cb2]">
            <Filter className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Budget:</span>
            <select
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value as any)}
              className="bg-[#121824] border border-[#243046] rounded-sm px-3 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="all">All Price Ranges</option>
              <option value="under50k">Under ₹50,000 / person</option>
              <option value="50kto100k">₹50,000 – ₹1,00,000 / person</option>
              <option value="above100k">₹1,00,000+ Luxury / person</option>
            </select>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-[#121824] border border-[#243046] rounded-sm overflow-hidden flex flex-col justify-between hover:border-[#c5a880]/60 transition-all duration-300 shadow-xl"
            >
              {/* Card Image */}
              <div
                onClick={() => onSelectPackage(pkg)}
                className="relative h-64 overflow-hidden cursor-pointer"
              >
                <img
                  src={pkg.bannerImage}
                  alt={pkg.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-black/20 to-transparent" />

                {/* Quiet Top Metadata (Zero-Pill Discipline) */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="text-[#dfc294] font-medium tracking-wider uppercase text-[11px] drop-shadow">
                    {pkg.luxuryLevel}
                  </span>
                  <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded text-xs">
                    <Star className="w-3 h-3 text-[#dfc294] fill-[#dfc294]" />
                    <span className="font-mono tabular-nums">{pkg.rating}</span>
                    <span className="text-white/60">({pkg.reviewCount})</span>
                  </div>
                </div>

                {/* Duration indicator */}
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-[#cbd5e1] drop-shadow">
                  <Clock className="w-3.5 h-3.5 text-[#dfc294]" />
                  <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => onSelectPackage(pkg)}
                    className="font-editorial text-2xl text-white font-normal hover:text-[#dfc294] transition-colors cursor-pointer"
                  >
                    {pkg.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#8e9cb2] line-clamp-2 font-light leading-relaxed">
                    {pkg.overview}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 pt-3 border-t border-[#243046]/70 space-y-1.5 text-xs text-[#a7b5cc]">
                    {pkg.inclusions.slice(0, 3).map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 truncate">
                        <span className="text-[#c5a880]">✓</span>
                        <span className="truncate">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Pricing & Action */}
                <div className="mt-6 pt-4 border-t border-[#243046] flex items-end justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8e9cb2] block">From</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-editorial text-2xl sm:text-3xl text-white font-normal font-mono tabular-nums">
                        ₹{pkg.startingPriceINR.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-[#8e9cb2]">/ person</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="px-3.5 py-2 text-xs font-medium text-white hover:text-[#dfc294] transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onBookDirect(pkg)}
                      className="px-4 py-2 bg-[#c5a880] hover:bg-[#dfc294] text-[#0b0f17] text-xs font-semibold uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center gap-1"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
