import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Compass, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { TravelPackage, Destination, TravelStory } from '../types/travel';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinations: Destination[];
  packages: TravelPackage[];
  stories: TravelStory[];
  onSelectDestination: (dest: Destination) => void;
  onSelectPackage: (pkg: TravelPackage) => void;
  onSelectStory: (story: TravelStory) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  destinations,
  packages,
  stories,
  onSelectDestination,
  onSelectPackage,
  onSelectStory
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedDestinations = q
    ? destinations.filter(d => d.name.toLowerCase().includes(q) || d.tagline.toLowerCase().includes(q))
    : destinations.slice(0, 3);

  const matchedPackages = q
    ? packages.filter(p => p.title.toLowerCase().includes(q) || p.destinationName.toLowerCase().includes(q) || p.overview.toLowerCase().includes(q))
    : packages.slice(0, 3);

  const matchedStories = q
    ? stories.filter(s => s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q))
    : stories.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24">
      <div className="relative bg-[#0b0f17] border border-[#243046] rounded-sm max-w-2xl w-full overflow-hidden shadow-2xl space-y-4">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#243046] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#c5a880]" />
          <input
            type="text"
            autoFocus
            placeholder="Search Kashmir, Rajasthan, Palace dining, Honeymoon, Kerala..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-white focus:outline-none placeholder-[#8e9cb2]"
          />
          <button onClick={onClose} className="p-1 text-[#8e9cb2] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-6 text-xs">
          {/* Destinations */}
          {matchedDestinations.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#dfc294] font-semibold mb-2.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Destinations ({matchedDestinations.length})</span>
              </div>
              <div className="space-y-2">
                {matchedDestinations.map(d => (
                  <div
                    key={d.id}
                    onClick={() => {
                      onSelectDestination(d);
                      onClose();
                    }}
                    className="p-3 rounded-sm bg-[#121824] hover:bg-[#1a2334] border border-[#243046] cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="font-editorial text-lg text-white">{d.name}</div>
                      <div className="text-[#8e9cb2] text-[11px]">{d.tagline}</div>
                    </div>
                    <span className="font-mono text-[#dfc294]">{d.temperatureCelsius}°C</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Curated Packages */}
          {matchedPackages.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#dfc294] font-semibold mb-2.5 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Curated Journeys ({matchedPackages.length})</span>
              </div>
              <div className="space-y-2">
                {matchedPackages.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectPackage(p);
                      onClose();
                    }}
                    className="p-3 rounded-sm bg-[#121824] hover:bg-[#1a2334] border border-[#243046] cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="font-medium text-white">{p.title}</div>
                      <div className="text-[#8e9cb2] text-[11px]">{p.durationDays} Days / {p.durationNights} Nights · {p.destinationName}</div>
                    </div>
                    <span className="font-mono text-white font-semibold">₹{p.startingPriceINR.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Travel Stories */}
          {matchedStories.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#dfc294] font-semibold mb-2.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Editorial Travel Stories ({matchedStories.length})</span>
              </div>
              <div className="space-y-2">
                {matchedStories.map(s => (
                  <div
                    key={s.id}
                    onClick={() => {
                      onSelectStory(s);
                      onClose();
                    }}
                    className="p-3 rounded-sm bg-[#121824] hover:bg-[#1a2334] border border-[#243046] cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="font-medium text-white">{s.title}</div>
                      <div className="text-[#8e9cb2] text-[11px]">{s.category} · {s.readTime}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8e9cb2]" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
