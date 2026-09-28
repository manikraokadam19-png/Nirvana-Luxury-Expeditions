import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { HERO_IMAGE, RAJASTHAN_IMAGE, KERALA_IMAGE, LADAKH_IMAGE } from '../data/travelData';

interface LuxuryExperiencesProps {
  onSelectExperience: (title: string) => void;
}

export const LuxuryExperiences: React.FC<LuxuryExperiencesProps> = ({ onSelectExperience }) => {
  const experiences = [
    {
      title: 'Lake Pichola Champagne Sunset Boat',
      destination: 'Udaipur, Rajasthan',
      image: RAJASTHAN_IMAGE,
      tag: 'Private Charter',
      desc: 'Glide past 400-year-old marble palaces as earthen oil lamps glow on the waters of Mewar.'
    },
    {
      title: 'Dawn Shikara Floating Market & Saffron Tea',
      destination: 'Srinagar, Kashmir',
      image: HERO_IMAGE,
      tag: 'Heritage Morning',
      desc: 'Awaken before dawn to witness Kashmiri lotus cultivators and sip fresh saffron Kahwa on Dal Lake.'
    },
    {
      title: 'Private Teakwood Kettuvalam Houseboat Cruise',
      destination: 'Alleppey, Kerala',
      image: KERALA_IMAGE,
      tag: 'Culinary Cruise',
      desc: 'A dedicated onboard chef preparing royal Karimeen fish delicacies as you drift beneath emerald palms.'
    },
    {
      title: 'Hanle High-Altitude Astronomical Stargazing',
      destination: 'Hanle, Ladakh',
      image: LADAKH_IMAGE,
      tag: 'Dark Sky Reserve',
      desc: 'Marvel at the crystalline Milky Way arching across the Himalayan sky at 14,000 feet.'
    }
  ];

  return (
    <section id="experiences-section" className="py-20 sm:py-28 bg-[#0b0f17] border-t border-[#1a2334]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#dfc294] font-medium mb-3">
              Unrivaled Access
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              SIGNATURE <span className="italic font-light text-[#f4ede4]">EXPERIENCES</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-[#8e9cb2] max-w-md font-light leading-relaxed">
            Moments crafted with extraordinary discretion, personal curators, and unforgettable intimacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              onClick={() => onSelectExperience(exp.title)}
              className="group bg-[#121824] border border-[#243046] rounded-sm overflow-hidden flex flex-col justify-between cursor-pointer hover:border-[#c5a880]/60 transition-all duration-300 shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider text-[#dfc294] font-semibold bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded">
                  {exp.tag}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] text-[#8e9cb2] block">{exp.destination}</span>
                  <h3 className="font-editorial text-xl text-white font-normal mt-1 leading-snug group-hover:text-[#dfc294] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#8e9cb2] font-light leading-relaxed line-clamp-2">
                    {exp.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#243046] flex items-center justify-between text-xs text-[#dfc294]">
                  <span className="uppercase tracking-wider font-semibold">Reserve Experience</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
