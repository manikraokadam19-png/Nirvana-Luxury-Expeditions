import React, { useState } from 'react';
import { Compass, Calendar, Users, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/travelData';

interface HeroSectionProps {
  onExploreJourneys: () => void;
  onOpenPlanner: () => void;
  onSearch: (searchParams: { destination: string; date: string; travelers: number; tripType: string }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreJourneys,
  onOpenPlanner,
  onSearch
}) => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('2026-10-15');
  const [travelers, setTravelers] = useState(2);
  const [tripType, setTripType] = useState('Luxury Escape');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ destination, date, travelers, tripType });
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden pt-24 pb-12 sm:pb-16">
      {/* Background Image with Cinematic Slow Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Cinematic Dal Lake Kashmir at Dawn"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite] transition-transform duration-1000 ease-out"
          style={{ animationDuration: '24s' }}
        />
        {/* Measured Luxury Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/55 to-[#0b0f17]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0b0f17]/40 to-[#0b0f17]/90" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto text-center flex flex-col items-center">
        {/* Small editorial kicker */}
        <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 text-xs uppercase tracking-[0.3em] text-[#dfc294] font-medium">
          <Sparkles className="w-3 h-3 text-[#c5a880]" />
          <span>Curated Journeys • 2026</span>
          <span className="w-8 h-[1px] bg-[#c5a880]/60 inline-block" />
        </div>

        {/* Main Editorial Headline */}
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white max-w-4xl font-normal leading-[1.05] [text-wrap:balance]">
          THE WORLD <br />
          <span className="italic font-light text-[#f4ede4]">IS WAITING.</span>
        </h1>

        {/* Subheading */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-[#d4dde8] max-w-2xl font-light leading-relaxed [text-wrap:balance]">
          Discover extraordinary sanctuaries, timeless royal heritage, and expeditions designed intimately around you.
        </p>

        {/* Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreJourneys}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#c5a880] hover:bg-[#dfc294] text-[#0b0f17] text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-sm shadow-xl flex items-center justify-center gap-2"
          >
            <span>Explore Journeys</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenPlanner}
            className="w-full sm:w-auto px-8 py-3.5 bg-black/40 hover:bg-black/60 text-white border border-[#c5a880]/50 hover:border-[#c5a880] text-xs uppercase tracking-[0.2em] font-medium backdrop-blur-sm transition-all rounded-sm flex items-center justify-center gap-2"
          >
            <Compass className="w-3.5 h-3.5 text-[#dfc294]" />
            <span>Plan My Trip</span>
          </button>
        </div>
      </div>

      {/* Sophisticated Search / Booking Bar at the bottom */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full mt-10">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-[#121824]/90 backdrop-blur-md border border-[#243046] p-3 sm:p-4 rounded-md shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center"
        >
          {/* Destination */}
          <div className="px-3 py-2 border-b sm:border-b-0 sm:border-r border-[#243046]">
            <label className="text-[10px] uppercase tracking-wider text-[#8e9cb2] font-semibold flex items-center gap-1.5 mb-1">
              <MapPin className="w-3 h-3 text-[#c5a880]" />
              <span>Destination</span>
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="" className="bg-[#121824] text-white">All Destinations</option>
              <option value="Kashmir" className="bg-[#121824] text-white">Kashmir</option>
              <option value="Rajasthan" className="bg-[#121824] text-white">Rajasthan</option>
              <option value="Kerala" className="bg-[#121824] text-white">Kerala</option>
              <option value="Ladakh" className="bg-[#121824] text-white">Ladakh</option>
              <option value="Maldives" className="bg-[#121824] text-white">Maldives</option>
              <option value="Bali" className="bg-[#121824] text-white">Bali</option>
              <option value="Switzerland" className="bg-[#121824] text-white">Switzerland</option>
            </select>
          </div>

          {/* Travel Dates */}
          <div className="px-3 py-2 border-b sm:border-b-0 sm:border-r border-[#243046]">
            <label className="text-[10px] uppercase tracking-wider text-[#8e9cb2] font-semibold flex items-center gap-1.5 mb-1">
              <Calendar className="w-3 h-3 text-[#c5a880]" />
              <span>Departure</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            />
          </div>

          {/* Travelers */}
          <div className="px-3 py-2 border-b lg:border-b-0 lg:border-r border-[#243046]">
            <label className="text-[10px] uppercase tracking-wider text-[#8e9cb2] font-semibold flex items-center gap-1.5 mb-1">
              <Users className="w-3 h-3 text-[#c5a880]" />
              <span>Travelers</span>
            </label>
            <select
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              className="w-full bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value={1} className="bg-[#121824] text-white">1 Solo Traveler</option>
              <option value={2} className="bg-[#121824] text-white">2 Adults (Couple)</option>
              <option value={3} className="bg-[#121824] text-white">3 Travelers</option>
              <option value={4} className="bg-[#121824] text-white">4 Travelers (Family)</option>
              <option value={6} className="bg-[#121824] text-white">6+ Private Group</option>
            </select>
          </div>

          {/* Trip Type */}
          <div className="px-3 py-2">
            <label className="text-[10px] uppercase tracking-wider text-[#8e9cb2] font-semibold flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3 h-3 text-[#c5a880]" />
              <span>Trip Type</span>
            </label>
            <select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              className="w-full bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="Luxury Escape" className="bg-[#121824] text-white">Luxury Escape</option>
              <option value="Romantic Honeymoon" className="bg-[#121824] text-white">Romantic Honeymoon</option>
              <option value="High Adventure" className="bg-[#121824] text-white">High Adventure</option>
              <option value="Family Holiday" className="bg-[#121824] text-white">Family Holiday</option>
              <option value="Ayurvedic Wellness" className="bg-[#121824] text-white">Ayurvedic Wellness</option>
            </select>
          </div>

          {/* Submit Explore Button */}
          <div className="p-1">
            <button
              type="submit"
              className="w-full py-3 bg-[#c5a880] hover:bg-[#dfc294] text-[#0b0f17] text-xs uppercase tracking-[0.15em] font-semibold rounded transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
