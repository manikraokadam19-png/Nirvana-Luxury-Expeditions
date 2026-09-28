import React, { useState } from 'react';
import { Compass, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { TravelPackage } from '../types/travel';

interface AITravelDiscoveryProps {
  packages: TravelPackage[];
  onSelectPackage: (pkg: TravelPackage) => void;
}

export const AITravelDiscovery: React.FC<AITravelDiscoveryProps> = ({
  packages,
  onSelectPackage
}) => {
  const [terrain, setTerrain] = useState<'any' | 'mountains' | 'backwaters' | 'palace' | 'islands'>('mountains');
  const [tripVibe, setTripVibe] = useState<string>('Luxury escape');
  const [budgetTier, setBudgetTier] = useState<number>(60000);
  const [durationTier, setDurationTier] = useState<number>(7);
  const [matchedJourneys, setMatchedJourneys] = useState<{ pkg: TravelPackage; matchScore: number }[]>([]);
  const [hasQueried, setHasQueried] = useState<boolean>(false);

  const calculateMatches = () => {
    const scores = packages.map((pkg) => {
      let score = 75;
      if (terrain === 'mountains' && (pkg.destinationName === 'Kashmir' || pkg.destinationName === 'Ladakh' || pkg.destinationName === 'Switzerland')) {
        score += 15;
      } else if (terrain === 'backwaters' && pkg.destinationName === 'Kerala') {
        score += 20;
      } else if (terrain === 'palace' && pkg.destinationName === 'Rajasthan') {
        score += 20;
      } else if (terrain === 'islands' && (pkg.destinationName === 'Bali' || pkg.destinationName === 'Maldives' || pkg.destinationName === 'Andaman')) {
        score += 20;
      }

      if (pkg.startingPriceINR <= budgetTier * 1.2 && pkg.startingPriceINR >= budgetTier * 0.7) {
        score += 5;
      }

      if (Math.abs(pkg.durationDays - durationTier) <= 1) {
        score += 4;
      }

      return {
        pkg,
        matchScore: Math.min(score, 99)
      };
    });

    scores.sort((a, b) => b.matchScore - a.matchScore);
    setMatchedJourneys(scores.slice(0, 3));
    setHasQueried(true);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#121824] border-t border-[#1a2334]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#dfc294] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Journey Finder</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl text-white font-normal leading-tight">
            DISCOVER YOUR <span className="italic font-light text-[#f4ede4]">SANCTUARY</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8e9cb2] font-light">
            Share the texture of your desires and our recommendation algorithm will reveal matching sanctuaries.
          </p>
        </div>

        {/* Discovery Questionnaire */}
        <div className="bg-[#0b0f17] border border-[#243046] rounded-sm p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Question 1: Terrain */}
          <div>
            <label className="text-xs uppercase tracking-wider text-[#8e9cb2] block mb-3 font-semibold">
              1. Where does your imagination pull you?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {[
                { id: 'mountains', label: 'Snow & Peaks' },
                { id: 'backwaters', label: 'Emerald Waters' },
                { id: 'palace', label: 'Royal Heritage' },
                { id: 'islands', label: 'Tropical Atolls' },
                { id: 'any', label: 'Anywhere Serene' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTerrain(item.id as any)}
                  className={`py-3 px-3 text-xs text-center rounded-sm border transition-all ${
                    terrain === item.id
                      ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#dfc294] font-semibold'
                      : 'border-[#243046] text-[#cbd5e1] hover:bg-[#162030]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Vibe */}
          <div>
            <label className="text-xs uppercase tracking-wider text-[#8e9cb2] block mb-3 font-semibold">
              2. What kind of trip are you imagining?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                'Relax by the sea',
                'Explore mountains',
                'Discover culture',
                'Chase adventure',
                'Luxury escape',
                'Romantic getaway',
                'Family holiday',
                'Wellness rejuvenation'
              ].map((vibe) => (
                <button
                  key={vibe}
                  type="button"
                  onClick={() => setTripVibe(vibe)}
                  className={`py-2.5 px-3 text-xs text-center rounded-sm border transition-all ${
                    tripVibe === vibe
                      ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#dfc294] font-semibold'
                      : 'border-[#243046] text-[#cbd5e1] hover:bg-[#162030]'
                  }`}
                >
                  {vibe}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 & 4: Budget & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider text-[#8e9cb2] font-semibold">
                  3. Approximate budget per traveler:
                </label>
                <span className="font-mono text-white text-xs font-semibold">
                  ₹{budgetTier.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={30000}
                max={200000}
                step={5000}
                value={budgetTier}
                onChange={(e) => setBudgetTier(Number(e.target.value))}
                className="w-full accent-[#c5a880] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider text-[#8e9cb2] font-semibold">
                  4. How long do you want to disappear?
                </label>
                <span className="font-mono text-white text-xs font-semibold">
                  {durationTier} Days
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={14}
                step={1}
                value={durationTier}
                onChange={(e) => setDurationTier(Number(e.target.value))}
                className="w-full accent-[#c5a880] cursor-pointer"
              />
            </div>
          </div>

          {/* Query Action */}
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={calculateMatches}
              className="px-8 py-3.5 bg-[#c5a880] hover:bg-[#dfc294] text-black text-xs uppercase tracking-widest font-semibold rounded-sm transition-all shadow-xl inline-flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Reveal My Curated Matches</span>
            </button>
          </div>
        </div>

        {/* Personalized Recommendations Display */}
        {hasQueried && matchedJourneys.length > 0 && (
          <div className="mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm uppercase tracking-widest text-[#dfc294] font-semibold">
                Personalized Itinerary Matches ({matchedJourneys.length})
              </h3>
              <span className="text-xs text-[#8e9cb2]">Ranked by affinity</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matchedJourneys.map(({ pkg, matchScore }) => (
                <div
                  key={pkg.id}
                  onClick={() => onSelectPackage(pkg)}
                  className="group bg-[#0b0f17] border border-[#243046] hover:border-[#c5a880] rounded-sm overflow-hidden p-5 cursor-pointer flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] text-[#c5a880] uppercase tracking-wider font-semibold">
                        {pkg.destinationName}
                      </span>
                      <span className="font-mono text-xs text-emerald-400 font-medium">
                        {matchScore}% Match
                      </span>
                    </div>

                    <h4 className="font-editorial text-2xl text-white font-normal group-hover:text-[#dfc294] transition-colors">
                      {pkg.title}
                    </h4>

                    <p className="mt-2 text-xs text-[#8e9cb2] line-clamp-2 font-light">
                      {pkg.tagline}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#243046] flex items-center justify-between">
                    <div>
                      <div className="font-mono text-white text-base font-semibold">
                        ₹{pkg.startingPriceINR.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-[#8e9cb2]">{pkg.durationDays} Days / {pkg.durationNights} Nights</div>
                    </div>
                    <span className="text-xs uppercase tracking-wider text-[#dfc294] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
