import React, { useState } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { TRAVEL_MOODS } from '../data/travelData';

interface TravelByMoodProps {
  onSelectMood: (moodId: string) => void;
}

export const TravelByMood: React.FC<TravelByMoodProps> = ({ onSelectMood }) => {
  const [selectedMoodId, setSelectedMoodId] = useState<string>('ROMANCE');
  const activeMood = TRAVEL_MOODS.find(m => m.id === selectedMoodId) || TRAVEL_MOODS[0];

  return (
    <section className="py-20 sm:py-28 bg-[#0b0f17] border-t border-[#1a2334]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-[#dfc294] font-medium mb-3">
            Atmospheric Exploration
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
            TRAVEL BY <span className="italic font-light text-[#f4ede4]">MOOD</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#8e9cb2] font-light">
            Do not choose just a point on the map. Choose how you wish to feel when you arrive.
          </p>
        </div>

        {/* Interactive Mood Tabs (Interactive filter control following constitutional guidelines) */}
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mb-10">
          {TRAVEL_MOODS.map((mood) => {
            const isActive = mood.id === selectedMoodId;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMoodId(mood.id)}
                className={`px-4 sm:px-5 py-2 text-xs uppercase tracking-widest font-medium transition-all rounded-sm ${
                  isActive
                    ? 'bg-[#c5a880] text-[#0b0f17] font-semibold shadow-lg scale-105'
                    : 'bg-[#121824] text-[#8e9cb2] hover:text-white border border-[#243046]'
                }`}
              >
                {mood.name}
              </button>
            );
          })}
        </div>

        {/* Mood Showcase Card */}
        <div className="relative rounded-sm overflow-hidden min-h-[380px] sm:min-h-[460px] flex items-end p-8 sm:p-14 border border-[#243046] shadow-2xl">
          <img
            src={activeMood.image}
            alt={activeMood.name}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-out scale-100"
          />
          {/* Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/65 to-black/30" />

          {/* Text and Actions */}
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-[#dfc294] font-medium">
              Vibe & Ambience
            </span>
            <h3 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-white font-normal mt-2 leading-tight">
              "{activeMood.quote}"
            </h3>

            {/* Suggested Destinations */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-[#cbd5e1]">
              <span className="text-[#8e9cb2] uppercase tracking-wider font-semibold">Suggested Realms:</span>
              {activeMood.destinations.map((dest, i) => (
                <React.Fragment key={dest}>
                  <span className="text-white font-medium">{dest}</span>
                  {i < activeMood.destinations.length - 1 && (
                    <span aria-hidden="true" className="text-white/30">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={() => onSelectMood(activeMood.id)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#c5a880] hover:bg-[#dfc294] text-[#0b0f17] text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-sm shadow-xl"
              >
                <span>Explore {activeMood.name} Journeys</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
