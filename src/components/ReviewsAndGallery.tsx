import React from 'react';
import { Star, ArrowRight, Instagram, CheckCircle2 } from 'lucide-react';
import { REVIEWS, HERO_IMAGE, RAJASTHAN_IMAGE, KERALA_IMAGE, LADAKH_IMAGE } from '../data/travelData';

interface ReviewsAndGalleryProps {
  onSelectDestination: (destName: string) => void;
}

export const ReviewsAndGallery: React.FC<ReviewsAndGalleryProps> = ({ onSelectDestination }) => {
  const galleryItems = [
    { title: 'Kashmir Valley', region: 'India', image: HERO_IMAGE, dest: 'Kashmir' },
    { title: 'Lake Pichola Palace', region: 'Rajasthan', image: RAJASTHAN_IMAGE, dest: 'Rajasthan' },
    { title: 'Alleppey Backwaters', region: 'Kerala', image: KERALA_IMAGE, dest: 'Kerala' },
    { title: 'Nubra Dunes & Pass', region: 'Ladakh', image: LADAKH_IMAGE, dest: 'Ladakh' },
    { title: 'Matterhorn Alpine', region: 'Switzerland', image: LADAKH_IMAGE, dest: 'Switzerland' },
    { title: 'Overwater Lagoon', region: 'Maldives', image: HERO_IMAGE, dest: 'Maldives' }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0b0f17] border-t border-[#1a2334]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* REVIEWS SECTION */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.25em] text-[#dfc294] font-medium mb-3">
              Traveler Memoirs
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl text-white font-normal leading-tight">
              WORDS OF <span className="italic font-light text-[#f4ede4]">GRATITUDE</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#8e9cb2] font-light">
              Verified experiences from travelers who trusted us with their most precious memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#121824] border border-[#243046] p-6 sm:p-8 rounded-sm flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#dfc294] mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#dfc294]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#cbd5e1] font-light leading-relaxed italic">
                    "{rev.reviewText}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#243046] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-medium text-white">{rev.customerName}</div>
                    <div className="text-[11px] text-[#8e9cb2]">{rev.customerCity} · {rev.destinationName}</div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 text-[10px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INSTAGRAM-STYLE GALLERY SECTION */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#243046]">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#dfc294] font-medium">
                Visual Chronicles
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl text-white font-normal mt-1">
                @NIRVANAVOYAGES
              </h3>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#8e9cb2] hover:text-[#dfc294] flex items-center gap-1.5 transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span className="hidden sm:inline">Follow on Instagram</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onSelectDestination(item.dest)}
                className="group relative h-48 sm:h-60 rounded-sm overflow-hidden border border-[#243046] cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex flex-col items-center justify-center p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-editorial text-white font-normal">{item.title}</span>
                  <span className="text-[10px] text-[#dfc294] mt-1 flex items-center gap-1">
                    View Journey <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
