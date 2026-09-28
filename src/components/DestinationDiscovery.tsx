import React from 'react';
import { ArrowUpRight, CloudSun, Compass } from 'lucide-react';
import { Destination } from '../types/travel';

interface DestinationDiscoveryProps {
  destinations: Destination[];
  onSelectDestination: (destination: Destination) => void;
  onExploreAll: () => void;
}

export const DestinationDiscovery: React.FC<DestinationDiscoveryProps> = ({
  destinations,
  onSelectDestination,
  onExploreAll
}) => {
  const kashmir = destinations.find(d => d.slug === 'kashmir') || destinations[0];
  const rajasthan = destinations.find(d => d.slug === 'rajasthan') || destinations[1];
  const kerala = destinations.find(d => d.slug === 'kerala') || destinations[2];
  const ladakh = destinations.find(d => d.slug === 'ladakh') || destinations[3];
  const maldives = destinations.find(d => d.slug === 'maldives') || destinations[4];
  const switzerland = destinations.find(d => d.slug === 'switzerland') || destinations[5];

  return (
    <section className="py-20 sm:py-28 bg-[#0b0f17] border-t border-[#1a2334]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#dfc294] font-medium mb-3">
              Curated Geography
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              WHERE WILL YOU <span className="italic font-light text-[#f4ede4]">GO NEXT?</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-[#8e9cb2] max-w-md font-light leading-relaxed">
            From the cedar waters of Dal Lake to the gilded royal havelis of Mewar, each destination is an immersive chapter waiting to be experienced.
          </p>
        </div>

        {/* Editorial Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Large Featured Hero Destination Card: Kashmir (col-span-7) */}
          <div
            onClick={() => onSelectDestination(kashmir)}
            className="lg:col-span-7 group relative rounded-sm overflow-hidden min-h-[480px] lg:min-h-[560px] cursor-pointer flex flex-col justify-between p-6 sm:p-10 border border-[#243046]/80 bg-[#121824] transition-all duration-500 hover:border-[#c5a880]/60"
          >
            {/* Background Image */}
            <img
              src={kashmir.coverImage}
              alt={kashmir.name}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Measured Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/40 to-black/30 group-hover:opacity-85 transition-opacity" />

            {/* Top Info */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-white/90">
                <span className="font-medium tracking-wider uppercase text-[#dfc294]">Marquee Sanctuary</span>
                <span aria-hidden="true" className="text-white/40">·</span>
                <span>{kashmir.stateOrCountry}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-black/40 backdrop-blur-md border border-white/10 text-xs text-white">
                <CloudSun className="w-3.5 h-3.5 text-[#dfc294]" />
                <span className="font-mono tabular-nums">{kashmir.temperatureCelsius}°C</span>
                <span className="text-white/60 hidden sm:inline">· Crisp & Sunny</span>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 mt-auto">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-wide group-hover:translate-x-1 transition-transform">
                    {kashmir.name}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-[#e2e8f0]/90 max-w-lg font-light">
                    {kashmir.tagline}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-[#c5a880] group-hover:text-black group-hover:border-[#c5a880] transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Unboxed Metadata (Zero-Pill Discipline) */}
              <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs text-[#cbd5e1]">
                <span>{kashmir.recommendedDuration}</span>
                <span aria-hidden="true" className="text-white/30">·</span>
                <span>Best: {kashmir.bestTimeToVisit.split('(')[0]}</span>
                <span aria-hidden="true" className="text-white/30">·</span>
                <span className="font-mono tabular-nums">From ₹{kashmir.estimatedBudgetINR.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Right Stack: 2 Medium Destination Cards (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Rajasthan Card */}
            <div
              onClick={() => onSelectDestination(rajasthan)}
              className="group relative rounded-sm overflow-hidden h-[270px] cursor-pointer flex flex-col justify-between p-6 sm:p-8 border border-[#243046]/80 bg-[#121824] transition-all duration-500 hover:border-[#c5a880]/60"
            >
              <img
                src={rajasthan.coverImage}
                alt={rajasthan.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/40 to-black/20 group-hover:opacity-85 transition-opacity" />

              <div className="relative z-10 flex items-center justify-between text-xs text-white/90">
                <span className="text-[#dfc294] font-medium tracking-wider uppercase">Royal Heritage</span>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-black/40 backdrop-blur-sm border border-white/10 text-xs">
                  <span className="font-mono tabular-nums">{rajasthan.temperatureCelsius}°C</span>
                </div>
              </div>

              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal tracking-wide group-hover:translate-x-1 transition-transform">
                    {rajasthan.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#cbd5e1] font-light max-w-xs mt-1">
                    {rajasthan.tagline}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-[#c5a880] group-hover:text-black group-hover:border-[#c5a880] transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Kerala Card */}
            <div
              onClick={() => onSelectDestination(kerala)}
              className="group relative rounded-sm overflow-hidden h-[270px] cursor-pointer flex flex-col justify-between p-6 sm:p-8 border border-[#243046]/80 bg-[#121824] transition-all duration-500 hover:border-[#c5a880]/60"
            >
              <img
                src={kerala.coverImage}
                alt={kerala.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/40 to-black/20 group-hover:opacity-85 transition-opacity" />

              <div className="relative z-10 flex items-center justify-between text-xs text-white/90">
                <span className="text-[#dfc294] font-medium tracking-wider uppercase">Backwaters & Spice</span>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-black/40 backdrop-blur-sm border border-white/10 text-xs">
                  <span className="font-mono tabular-nums">{kerala.temperatureCelsius}°C</span>
                </div>
              </div>

              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal tracking-wide group-hover:translate-x-1 transition-transform">
                    {kerala.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#cbd5e1] font-light max-w-xs mt-1">
                    {kerala.tagline}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-[#c5a880] group-hover:text-black group-hover:border-[#c5a880] transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Row: Ladakh, Maldives, Switzerland */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[ladakh, maldives, switzerland].map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              className="group relative rounded-sm overflow-hidden h-[240px] cursor-pointer flex flex-col justify-between p-6 border border-[#243046]/80 bg-[#121824] transition-all duration-500 hover:border-[#c5a880]/60"
            >
              <img
                src={dest.coverImage}
                alt={dest.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/50 to-black/20 group-hover:opacity-85 transition-opacity" />

              <div className="relative z-10 flex items-center justify-between text-xs text-white/90">
                <span className="text-[#dfc294] font-medium tracking-wider uppercase text-[11px]">{dest.stateOrCountry}</span>
                <span className="font-mono tabular-nums text-xs bg-black/40 px-2 py-0.5 rounded border border-white/10">{dest.temperatureCelsius}°C</span>
              </div>

              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <h4 className="font-editorial text-2xl sm:text-3xl text-white font-normal group-hover:translate-x-1 transition-transform">
                    {dest.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-[#cbd5e1] mt-1">
                    <span>{dest.recommendedDuration}</span>
                    <span aria-hidden="true" className="text-white/30">·</span>
                    <span className="font-mono tabular-nums">From ₹{dest.estimatedBudgetINR.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-[#c5a880] group-hover:text-black group-hover:border-[#c5a880] transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Destinations Bar */}
        <div className="mt-12 text-center">
          <button
            onClick={onExploreAll}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#dfc294] hover:text-white transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>Discover All 12 Curated Sanctuaries</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
