import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X, User } from 'lucide-react';
import { TravelStory } from '../types/travel';
import { TRAVEL_STORIES } from '../data/travelData';

interface TravelStoriesProps {
  onSelectDestinationSlug: (slug: string) => void;
}

export const TravelStories: React.FC<TravelStoriesProps> = ({ onSelectDestinationSlug }) => {
  const [selectedStory, setSelectedStory] = useState<TravelStory | null>(null);

  return (
    <section id="stories-section" className="py-20 sm:py-28 bg-[#0b0f17] border-t border-[#1a2334]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#dfc294] font-medium mb-3">
              Editorial Chronicles
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              TRAVEL <span className="italic font-light text-[#f4ede4]">STORIES</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-[#8e9cb2] max-w-md font-light leading-relaxed">
            Essays on heritage, high-altitude silence, and royal culinary secrets penned by our expedition curators.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAVEL_STORIES.map((story) => (
            <article
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="group bg-[#121824] border border-[#243046] rounded-sm overflow-hidden flex flex-col justify-between cursor-pointer hover:border-[#c5a880]/60 transition-all duration-300 shadow-xl"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-[#dfc294] font-semibold bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded">
                  {story.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#8e9cb2] mb-2">
                    <span>{story.publishedDate}</span>
                    <span aria-hidden="true" className="text-white/30">·</span>
                    <span>{story.readTime}</span>
                  </div>

                  <h3 className="font-editorial text-2xl text-white font-normal group-hover:text-[#dfc294] transition-colors leading-snug">
                    {story.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[#8e9cb2] font-light leading-relaxed line-clamp-3">
                    {story.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#243046] flex items-center justify-between text-xs">
                  <span className="text-[#cbd5e1] font-medium">{story.author}</span>
                  <span className="text-[#dfc294] uppercase tracking-wider font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Essay <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Story Reading Modal */}
        {selectedStory && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
            <div className="relative bg-[#0b0f17] border border-[#243046] rounded-sm max-w-3xl w-full my-8 overflow-hidden shadow-2xl">
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                <img
                  src={selectedStory.coverImage}
                  alt={selectedStory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#dfc294] font-semibold">
                    {selectedStory.category}
                  </span>
                  <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal mt-1 leading-tight">
                    {selectedStory.title}
                  </h2>
                  <div className="mt-2 text-xs text-[#cbd5e1] flex items-center gap-3">
                    <span>By {selectedStory.author} ({selectedStory.authorRole})</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedStory.publishedDate}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-10 space-y-4 text-sm sm:text-base text-[#cbd5e1] font-light leading-relaxed">
                {selectedStory.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}

                <div className="pt-6 border-t border-[#243046] flex items-center justify-between">
                  <button
                    onClick={() => {
                      onSelectDestinationSlug(selectedStory.destinationSlug);
                      setSelectedStory(null);
                    }}
                    className="px-5 py-2.5 bg-[#c5a880] text-black text-xs uppercase tracking-wider font-semibold rounded-sm"
                  >
                    Explore Related Journeys
                  </button>
                  <button
                    onClick={() => setSelectedStory(null)}
                    className="text-xs text-[#8e9cb2] hover:text-white"
                  >
                    Close Reading
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
