import { Destination, TravelPackage, TravelStory, Review, Booking } from '../types/travel';

export const HERO_IMAGE = '/src/assets/images/hero_cinematic_travel_1790577287139.jpg';
export const RAJASTHAN_IMAGE = '/src/assets/images/journey_rajasthan_palace_1790577301069.jpg';
export const KERALA_IMAGE = '/src/assets/images/journey_kerala_backwaters_1790577317913.jpg';
export const LADAKH_IMAGE = '/src/assets/images/journey_ladakh_monastery_1790577329423.jpg';

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 'dest-kashmir',
    slug: 'kashmir',
    name: 'Kashmir',
    stateOrCountry: 'Jammu & Kashmir, India',
    region: 'india',
    tagline: 'The Valley of Dreams & Floating Sanctuaries',
    description: 'Drift across glassy Dal Lake in a cedar shikara, wander centuries-old Mughal saffron gardens, and wake up to snow-clad Pir Panjal ridges from a private handcrafted pine lodge.',
    bestTimeToVisit: 'April to October (Spring/Summer), Dec to Feb (Snow)',
    recommendedDuration: '7 Days / 6 Nights',
    estimatedBudgetINR: 42000,
    temperatureCelsius: 16,
    weatherCondition: 'Crisp & Sunny with Mountain Mist',
    coverImage: HERO_IMAGE,
    galleryImages: [HERO_IMAGE, LADAKH_IMAGE, RAJASTHAN_IMAGE],
    popularExperiences: ['Private Dawn Shikara & Floating Market', 'Helicopter Flight to Gulmarg Gondola Phase II', 'Gourmet Wazwan Banquet with Master Chef', 'Aru Valley Meadow Horseback Trail'],
    featured: true,
    moods: ['ESCAPE', 'ROMANCE', 'MOUNTAINS', 'LUXURY']
  },
  {
    id: 'dest-rajasthan',
    slug: 'rajasthan',
    name: 'Rajasthan',
    stateOrCountry: 'Rajasthan, India',
    region: 'india',
    tagline: 'Regal Palaces, Desert Starlight & Royal Lineage',
    description: 'Experience true Indian royalty inside 300-year-old gilded palaces, candle-lit private terraces overlooking Lake Pichola, and luxury dune glamping under celestial Thar skies.',
    bestTimeToVisit: 'October to March',
    recommendedDuration: '8 Days / 7 Nights',
    estimatedBudgetINR: 65000,
    temperatureCelsius: 24,
    weatherCondition: 'Pleasant & Clear Starlit Skies',
    coverImage: RAJASTHAN_IMAGE,
    galleryImages: [RAJASTHAN_IMAGE, HERO_IMAGE, KERALA_IMAGE],
    popularExperiences: ['Sunset Champagne Cruise on Lake Pichola', 'Private Royal Armory & Palace Tour with Historian', 'Dune Dining with Manganiyar Sufi Musicians', 'Vintage Rolls Royce City Tour'],
    featured: true,
    moods: ['LUXURY', 'CULTURE', 'ROMANCE', 'ESCAPE']
  },
  {
    id: 'dest-kerala',
    slug: 'kerala',
    name: 'Kerala',
    stateOrCountry: 'Kerala, India',
    region: 'india',
    tagline: 'Serene Backwaters, Spice Hills & Ayurvedic Renewal',
    description: 'Drift through palm-canopied emerald waters on an ultra-luxury teakwood kettuvalam, breathe crisp cardamom breezes in Munnar, and undergo authentic Ayurvedic restoration.',
    bestTimeToVisit: 'September to March',
    recommendedDuration: '6 Days / 5 Nights',
    estimatedBudgetINR: 38000,
    temperatureCelsius: 28,
    weatherCondition: 'Tropical Breeze with Warm Golden Sun',
    coverImage: KERALA_IMAGE,
    galleryImages: [KERALA_IMAGE, HERO_IMAGE, RAJASTHAN_IMAGE],
    popularExperiences: ['Private Luxury Houseboat with Personal Chef', 'Organic Spice Plantation & Tea Tasting Trail', 'Traditional Abhyanga Ayurvedic Rejuvenation', 'Sunset Kathakali & Kalaripayattu Private Recital'],
    featured: true,
    moods: ['WELLNESS', 'ESCAPE', 'ROMANCE', 'FAMILY']
  },
  {
    id: 'dest-ladakh',
    slug: 'ladakh',
    name: 'Ladakh',
    stateOrCountry: 'Ladakh, India',
    region: 'india',
    tagline: 'Celestial Passes, Moonscapes & Ancient Monasteries',
    description: 'Cross the highest motorable passes on earth, marvel at azure Pangong Tso mirroring jagged peaks, and discover silent cliffside monasteries echoing with sacred chant.',
    bestTimeToVisit: 'May to September',
    recommendedDuration: '7 Days / 6 Nights',
    estimatedBudgetINR: 48000,
    temperatureCelsius: 12,
    weatherCondition: 'Crisp Alpine Sun & Deep Azure Skies',
    coverImage: LADAKH_IMAGE,
    galleryImages: [LADAKH_IMAGE, HERO_IMAGE, RAJASTHAN_IMAGE],
    popularExperiences: ['Stargazing at Hanle Dark Sky Reserve', 'Double-Humped Camel Safari in Nubra Sand Dunes', 'Dawn Chanting at Thiksey Monastery', 'Lakeside Glamping at Pangong Tso'],
    featured: true,
    moods: ['ADVENTURE', 'WILDERNESS', 'MOUNTAINS', 'ESCAPE']
  },
  {
    id: 'dest-goa',
    slug: 'goa',
    name: 'Goa',
    stateOrCountry: 'Goa, India',
    region: 'india',
    tagline: 'Portuguese Heritage, Coastal Solitude & Bespoke Yachts',
    description: 'Beyond crowded shores lies old-world Portuguese Latin quarters, private cliffside villas in Morjim, sunset catamaran charters, and bespoke Konkani fine dining.',
    bestTimeToVisit: 'November to February',
    recommendedDuration: '5 Days / 4 Nights',
    estimatedBudgetINR: 45000,
    temperatureCelsius: 29,
    weatherCondition: 'Warm Sunny Coastal Breeze',
    coverImage: KERALA_IMAGE,
    galleryImages: [KERALA_IMAGE, HERO_IMAGE],
    popularExperiences: ['Private Sunset Catamaran Charter to Butterfly Beach', 'Fontainhas Heritage Walk & Feni Tasting', 'Chef-Table Coastal Seafood Tasting Menu', 'Secluded South Goa Luxury Villa Retreat'],
    featured: false,
    moods: ['BEACH', 'ESCAPE', 'ROMANCE', 'LUXURY']
  },
  {
    id: 'dest-andaman',
    slug: 'andaman',
    name: 'Andaman & Nicobar',
    stateOrCountry: 'Andaman Islands, India',
    region: 'india',
    tagline: 'Turquoise Lagoons, Coral Reefs & Ancient Rainforests',
    description: 'Pristine white talcum sand beaches, crystal-clear diving amidst vibrant marine sanctuaries, and luxury beachfront barefoot villas on Havelock Island.',
    bestTimeToVisit: 'October to May',
    recommendedDuration: '6 Days / 5 Nights',
    estimatedBudgetINR: 52000,
    temperatureCelsius: 27,
    weatherCondition: 'Warm Sunny Tropical Waters',
    coverImage: HERO_IMAGE,
    galleryImages: [HERO_IMAGE, KERALA_IMAGE],
    popularExperiences: ['Night Bioluminescence Kayaking at Havelock', 'PADI Certified Coral Reef Scuba Dive', 'Secluded Candlelit Beach Dining at Radhanagar', 'Private Speedboat to Elephant Beach'],
    featured: false,
    moods: ['BEACH', 'ADVENTURE', 'ROMANCE', 'ESCAPE']
  },
  {
    id: 'dest-maldives',
    slug: 'maldives',
    name: 'Maldives',
    stateOrCountry: 'Maldives',
    region: 'international',
    tagline: 'Overwater Luxury, Private Atolls & Infinite Blue',
    description: 'Signature overwater bungalows with glass floor viewing, direct lagoon steps, submarine dining, and personalized Butler service in private atolls.',
    bestTimeToVisit: 'November to April',
    recommendedDuration: '5 Days / 4 Nights',
    estimatedBudgetINR: 110000,
    temperatureCelsius: 30,
    weatherCondition: 'Brilliant Tropical Sun & Gentle Waves',
    coverImage: HERO_IMAGE,
    galleryImages: [HERO_IMAGE, KERALA_IMAGE],
    popularExperiences: ['Private Seaplane Transfer & Lagoon Landing', 'Underwater Restaurant 5-Course Wine Pairing', 'Swimming with Whale Sharks in South Ari Atoll', 'Starlight Sandbank Champagne Dinner'],
    featured: true,
    moods: ['ROMANCE', 'LUXURY', 'BEACH', 'WELLNESS']
  },
  {
    id: 'dest-switzerland',
    slug: 'switzerland',
    name: 'Switzerland',
    stateOrCountry: 'Switzerland',
    region: 'international',
    tagline: 'Alpine Grandeur, Glacier Express & Historic Chalets',
    description: 'Glide through soaring Matterhorn panoramas on luxury panoramic rail, stay in legendary Alpine grand hotels, and relish Michelin gastronomy overlooking Lake Geneva.',
    bestTimeToVisit: 'June to September & December to March',
    recommendedDuration: '8 Days / 7 Nights',
    estimatedBudgetINR: 185000,
    temperatureCelsius: 14,
    weatherCondition: 'Fresh Alpine Breeze & Mountain Sun',
    coverImage: LADAKH_IMAGE,
    galleryImages: [LADAKH_IMAGE, HERO_IMAGE],
    popularExperiences: ['Glacier Express Excellence Class with 5-Course Lunch', 'Private Helicopter Flight over Matterhorn & Eiger', 'Lake Lucerne Vintage Steamboat Cruise', 'Swiss Chocolate & Alpine Cheese Masterclass'],
    featured: true,
    moods: ['LUXURY', 'MOUNTAINS', 'ROMANCE', 'FAMILY']
  },
  {
    id: 'dest-bali',
    slug: 'bali',
    name: 'Bali',
    stateOrCountry: 'Indonesia',
    region: 'international',
    tagline: 'Sacred Temples, Cliffside Havens & Emerald Terraces',
    description: 'Tucked away bamboo forest villas in Ubud, cliffside infinity pools suspended over the Indian Ocean in Uluwatu, and sacred dawn purification ceremonies.',
    bestTimeToVisit: 'April to October',
    recommendedDuration: '7 Days / 6 Nights',
    estimatedBudgetINR: 58000,
    temperatureCelsius: 28,
    weatherCondition: 'Warm Sunny Island Days',
    coverImage: KERALA_IMAGE,
    galleryImages: [KERALA_IMAGE, RAJASTHAN_IMAGE],
    popularExperiences: ['Dawn Helicopter Tour over Mount Batur & Caldera', 'Private Melukat Water Purification with High Priest', 'Sunset Cliffside Fire Dance at Uluwatu Temple', 'Jungle Villa Floating Breakfast & Flower Bath'],
    featured: false,
    moods: ['ROMANCE', 'WELLNESS', 'CULTURE', 'ESCAPE']
  }
];

export const INITIAL_PACKAGES: TravelPackage[] = [
  {
    id: 'pkg-kashmir-dreams',
    slug: 'kashmir-valley-of-dreams',
    title: 'Kashmir — The Valley of Dreams',
    tagline: 'Dal Lake Houseboat, Gulmarg Snow Peaks & Saffron Valleys',
    destinationId: 'dest-kashmir',
    destinationName: 'Kashmir',
    region: 'india',
    durationDays: 7,
    durationNights: 6,
    startingPriceINR: 39999,
    originalPriceINR: 48999,
    luxuryLevel: 'Bespoke Classic',
    rating: 4.94,
    reviewCount: 148,
    bannerImage: HERO_IMAGE,
    galleryImages: [HERO_IMAGE, LADAKH_IMAGE, RAJASTHAN_IMAGE],
    overview: 'Immerse yourself in timeless Kashmiri hospitality. Stay aboard an intricately carved heritage cedar houseboat, fly above pine valleys on the Gulmarg Gondola, and savor authentic multi-course royal Wazwan banquets beside crackling cedar fireplaces.',
    bestSeason: 'March to November & Dec–Feb for Skiing',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Srinagar & Royal Houseboat Check-in',
        subtitle: 'The Waters of Dal Lake',
        description: 'Chauffeured pickup from Srinagar Airport. Board your private luxury cedar houseboat on Dal Lake. Enjoy authentic Kashmiri Saffron Kahwa with almond flakes, followed by a sunset shikara ride through the floating lotus gardens.',
        meals: 'Traditional Welcome High Tea & Gourmet Dinner',
        stay: 'The Oberoi Vivanta / Luxury Heritage Houseboat',
        highlights: ['Private airport transfer', 'Sunset shikara cruise', 'Mughal garden view']
      },
      {
        day: 2,
        title: 'Mughal Gardens, Old City & Saffron Trails',
        subtitle: 'Pari Mahal, Nishat & Shalimar Bagh',
        description: 'Explore the terraced water gardens commissioned by Emperor Jahangir. Visit the historic Jamia Masjid in Old Srinagar and stroll through artisanal pashmina and walnut woodcraft ateliers.',
        meals: 'Artisanal Breakfast & Royal Wazwan Lunch',
        stay: 'The Oberoi Vivanta / Luxury Heritage Houseboat',
        highlights: ['Private art & heritage guide', 'Wazwan tasting menu', 'Old city walking trail']
      },
      {
        day: 3,
        title: 'Ascent to Gulmarg — The Meadow of Flowers',
        subtitle: 'Snow Peaks & Gondola Flight',
        description: 'Scenic private drive to Gulmarg. VIP access to the world-famous Gulmarg Gondola Phase 1 & 2 reaching 13,780 feet atop Apharwat Peak with panoramic views of Nanga Parbat.',
        meals: 'Breakfast & Alpine Fondue Dinner',
        stay: 'The Khyber Himalayan Resort & Spa',
        highlights: ['VIP Gondola access pass', 'Snowmobile / Ski introduction', 'Heated indoor pool with mountain views']
      },
      {
        day: 4,
        title: 'Gulmarg Wellness & Pine Forest Trails',
        subtitle: 'Serenity & Himalayan Spa',
        description: 'Awaken to snow-dusted pine panoramas. Indulge in an afternoon hot-stone Himalayan wellness ritual followed by high tea on the sun deck.',
        meals: 'Breakfast & Chef Dinner',
        stay: 'The Khyber Himalayan Resort & Spa',
        highlights: ['L’Occitane spa therapy voucher', 'Guided pine nature walk', 'Starlight bonfire']
      },
      {
        day: 5,
        title: 'Pahalgam — The Valley of Shepherds',
        subtitle: 'Lidder River & Pine Glades',
        description: 'Drive along the shimmering Lidder River through world-famous saffron fields in Pampore. Check into your pine-wood riverside lodge and embark on a horseback trail to Betaab Valley.',
        meals: 'Breakfast & Riverside Barbecue Dinner',
        stay: 'Pahalgam Hotel / Pine N Peak',
        highlights: ['Saffron farm visit', 'Betaab Valley & Aru Valley excursion', 'Lidder river trout dinner']
      },
      {
        day: 6,
        title: 'Baisaran Valley & Local Artisan Encounter',
        subtitle: 'Mini Switzerland of India',
        description: 'Trek or ride to the rolling green meadows of Baisaran. In the evening, meet master carpet weavers and papier-mâché artisans.',
        meals: 'Breakfast & Traditional Dinner',
        stay: 'Pahalgam Hotel / Pine N Peak',
        highlights: ['Baisaran meadow trail', 'Artisan masterclass', 'Evening campfire']
      },
      {
        day: 7,
        title: 'Farewell Kashmir — Return with Memories',
        subtitle: 'Departure from Srinagar',
        description: 'Morning private transfer from Pahalgam to Srinagar Airport with curated gift hamper of Kashmiri Saffron and Mamra Almonds.',
        meals: 'Buffet Breakfast',
        stay: 'Departure',
        highlights: ['Private airport transfer', 'Handcrafted departure souvenir gift']
      }
    ],
    inclusions: [
      '6 Nights 5-Star Luxury Stays (Houseboat, Khyber Gulmarg, Riverside Lodge)',
      'Dedicated Chauffeur in Luxury Toyota Crysta / Mercedes SUV',
      'Daily Gourmet Breakfast and Curated Multi-Course Dinners',
      'Phase I & II VIP Tickets for Gulmarg Gondola',
      'Private Shikara Rides on Dal Lake with Kahwa service',
      'Local Historian & Certified Mountain Guide',
      'All Tolls, Fuel, Parking & State Luxury Taxes'
    ],
    exclusions: [
      'Commercial Airfare to/from Srinagar',
      'Personal Pony/Horse rides outside scheduled itinerary',
      'Optional Adventure Sports (Ski rentals, Heli-skiing)',
      'Travel Insurance unless added at checkout'
    ],
    activities: ['Shikara Boat Rides', 'Gondola Cable Car', 'Heritage Walking Tour', 'Skiing & Snowshoeing', 'Wazwan Cooking Demo'],
    moods: ['ESCAPE', 'ROMANCE', 'MOUNTAINS', 'LUXURY'],
    featured: true,
    active: true
  },
  {
    id: 'pkg-rajasthan-royals',
    slug: 'rajasthan-royal-splendour',
    title: 'Rajasthan — The Maharaja Grandeur',
    tagline: 'Palaces of Udaipur, Blue City Jodhpur & Thar Desert Glamping',
    destinationId: 'dest-rajasthan',
    destinationName: 'Rajasthan',
    region: 'india',
    durationDays: 8,
    durationNights: 7,
    startingPriceINR: 64999,
    originalPriceINR: 76000,
    luxuryLevel: 'Royal Heritage',
    rating: 4.97,
    reviewCount: 210,
    bannerImage: RAJASTHAN_IMAGE,
    galleryImages: [RAJASTHAN_IMAGE, HERO_IMAGE, KERALA_IMAGE],
    overview: 'Live like royalty in India’s most storied palace hotels. Dine beneath crystal chandeliers in Udaipur, explore towering Mehrangarh Fort in Jodhpur, and sleep under millions of stars in ultra-luxury desert camps.',
    bestSeason: 'October to April',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in the City of Lakes — Udaipur',
        subtitle: 'Palace Arrival Ceremony',
        description: 'Arrive in Udaipur. Private boat arrival at your island palace with traditional dhol players and rose-petal shower. Sunset champagne cruise across Lake Pichola.',
        meals: 'Welcome Refreshments & Royal Dinner',
        stay: 'Taj Lake Palace / The Leela Palace Udaipur',
        highlights: ['Private jetty transfer', 'Sunset cruise on Lake Pichola', 'Palace champagne welcome']
      },
      {
        day: 2,
        title: 'City Palace, Crystal Gallery & Jagdish Temple',
        subtitle: 'Centuries of Mewar Heritage',
        description: 'Private tour of the sprawling City Palace complex with royal curator. Walk through Mor Chowk mosaic peacocks and the King’s private crystal collection.',
        meals: 'Breakfast & Mewari Royal Thali',
        stay: 'Taj Lake Palace / The Leela Palace Udaipur',
        highlights: ['Private royal curator tour', 'Crystal gallery entry', 'Fine dining on candlelit terrace']
      },
      {
        day: 3,
        title: 'Ranakpur Marble Temples & Arrival in Jodhpur',
        subtitle: '1,444 Carved Marble Pillars',
        description: 'Drive through Aravalli hills to the breathtaking 15th-century Ranakpur Jain temples. Continue to Jodhpur, the Blue City.',
        meals: 'Breakfast & High Tea',
        stay: 'Umaid Bhawan Palace / RAAS Jodhpur',
        highlights: ['Ranakpur guided tour', 'Artisan pottery stop', 'Jodhpur stepwell sunset']
      },
      {
        day: 4,
        title: 'Mehrangarh Citadel & Blue City Heritage Walk',
        subtitle: 'Citadel of the Sun',
        description: 'VIP private tour of Mehrangarh Fort with palace historian. Walk through indigo-washed streets of the old city and savor royal kachoris.',
        meals: 'Breakfast & Rooftop Dinner overlooking Fort',
        stay: 'Umaid Bhawan Palace / RAAS Jodhpur',
        highlights: ['Mehrangarh VIP pass', 'Private photography tour', 'Rooftop dinner at Darikhana']
      },
      {
        day: 5,
        title: 'Journey to the Golden Sands of Jaisalmer',
        subtitle: 'Into the Thar Desert',
        description: 'Drive into the Golden City. Check into ultra-luxury air-conditioned canvas tents nestled in deep sand dunes with private plunge pools.',
        meals: 'Breakfast & Desert Barbecue',
        stay: 'Sujan The Serai / The Desert Resort',
        highlights: ['Luxury tent check-in', 'Private sunset camel safari', 'Sufi folk recital around bonfire']
      },
      {
        day: 6,
        title: 'Living Fort of Jaisalmer & Desert Stargazing',
        subtitle: 'Golden Sandstone Architecture',
        description: 'Explore the only living fort in India, Jain temples, and ornate Patwon Ki Haveli. Night stargazing with high-powered telescope.',
        meals: 'Breakfast & Candlelit Dune Dinner',
        stay: 'Sujan The Serai / The Desert Resort',
        highlights: ['Living fort walking tour', 'Astronomer starlight session', 'Champagne on the dunes']
      },
      {
        day: 7,
        title: 'Royal Cenotaphs & Artisanal Jaipur / Jodhpur Trails',
        subtitle: 'Bada Bagh & Heritage Weavers',
        description: 'Visit the hauntingly beautiful golden cenotaphs of Bada Bagh at sunrise. Return for wellness spa rituals.',
        meals: 'Breakfast & Royal Banquet',
        stay: 'Sujan The Serai / RAAS Jodhpur',
        highlights: ['Bada Bagh photography', 'Ayurvedic palace massage', 'Gala farewell dinner']
      },
      {
        day: 8,
        title: 'Departure with Royal Keepsakes',
        subtitle: 'Depart Jodhpur / Udaipur',
        description: 'Chauffeured luxury transfer to Jodhpur or Udaipur Airport with bespoke royal spices and miniature painting gift.',
        meals: 'Breakfast',
        stay: 'Departure',
        highlights: ['Airport transfer', 'Royal farewell souvenir']
      }
    ],
    inclusions: [
      '7 Nights Heritage Palace Stays & Sujan Luxury Desert Camp',
      'Private Chauffeur-driven BMW / Mercedes / Toyota Innova Crysta',
      'Royal Welcome Ceremony with Traditional Musicians',
      'Daily Royal Breakfast and 4 Curated Dinners',
      'Private Lake Pichola Champagne Boat Charter',
      'Curator-led Fort & Palace Access without Queues',
      'Desert Camel Safari & Stargazing Session with Astronomer'
    ],
    exclusions: [
      'Flights to Udaipur and from Jodhpur',
      'Discretionary Tips and Gratuities',
      'Personal Spa Treatments outside specified package'
    ],
    activities: ['Lake Boat Cruise', 'Mehrangarh Fort Tour', 'Desert Dune Safari', 'Astronomer Stargazing', 'Sufi Night'],
    moods: ['LUXURY', 'CULTURE', 'ROMANCE', 'ESCAPE'],
    featured: true,
    active: true
  },
  {
    id: 'pkg-kerala-waters',
    slug: 'kerala-serene-backwaters',
    title: 'Kerala — Whispers of the Backwaters',
    tagline: 'Private Houseboat, Munnar Cloud Tea Hills & Ayurvedic Rejuvenation',
    destinationId: 'dest-kerala',
    destinationName: 'Kerala',
    region: 'india',
    durationDays: 6,
    durationNights: 5,
    startingPriceINR: 37999,
    originalPriceINR: 44000,
    luxuryLevel: 'Bespoke Classic',
    rating: 4.91,
    reviewCount: 165,
    bannerImage: KERALA_IMAGE,
    galleryImages: [KERALA_IMAGE, HERO_IMAGE, RAJASTHAN_IMAGE],
    overview: 'Unwind along tranquil palm-fringed canals aboard a private teakwood houseboat with your own chef. Breathe the fragrant air of Munnar tea hills and rejuvenate with doctor-consulted Ayurvedic therapies.',
    bestSeason: 'August to March',
    itinerary: [
      {
        day: 1,
        title: 'Kochi Arrival & Heritage Fort Kochi Walk',
        subtitle: 'Colonial Spice Port',
        description: 'Meet your chauffeur at Cochin International Airport. Check into your heritage waterfront hotel. Visit the Chinese fishing nets and Jewish Synagogue.',
        meals: 'Welcome Drink & Seafood Dinner',
        stay: 'Brunton Boatyard / Malabar House',
        highlights: ['Chinese fishing net sunset', 'Historic spice market walk', 'Private Kathakali dance demo']
      },
      {
        day: 2,
        title: 'Scenic Drive to Munnar Tea Sanctuaries',
        subtitle: 'Into the Mist and Cardamom',
        description: 'Drive through rubber plantations and cascading Cheeyappara waterfalls up into the cool rolling hills of Munnar.',
        meals: 'Breakfast & High Tea at Tea Estate',
        stay: 'Windermere Estate / Fragrant Nature',
        highlights: ['Waterfall viewpoints', 'Private tea garden walk', 'Fresh tea leaf picking experience']
      },
      {
        day: 3,
        title: 'Eravikulam National Park & Spice Tasting',
        subtitle: 'Endangered Nilgiri Tahr & Cardamom',
        description: 'Morning wildlife excursion to view the Nilgiri Tahr. Afternoon spice plantation walk with botanist.',
        meals: 'Breakfast & Traditional Sadya Lunch',
        stay: 'Windermere Estate / Fragrant Nature',
        highlights: ['Wildlife sanctuary visit', 'Botanist spice tour', 'Kerala banana leaf Sadya feast']
      },
      {
        day: 4,
        title: 'Alleppey — Boarding your Private Luxury Kettuvalam',
        subtitle: 'Gliding Through Emerald Waters',
        description: 'Board your private handcrafted air-conditioned houseboat with dedicated captain, navigator, and personal culinary chef.',
        meals: 'Breakfast, Karimeen Pollichathu Lunch & Dinner',
        stay: 'Spice Coast Cruises / Luxury Houseboat',
        highlights: ['Private houseboat cruise', 'Village toddy & coconut experience', 'Authentic Karimeen fish delicacy']
      },
      {
        day: 5,
        title: 'Kumarakom Lakeside Solitude & Ayurvedic Spa',
        subtitle: 'Vembanad Lake Serenity',
        description: 'Disembark at a tranquil lake resort on Vembanad Lake. Indulge in certified Ayurvedic Abhyanga and Shirodhara wellness sessions.',
        meals: 'Breakfast & Candlelight Lakeside Dinner',
        stay: 'Kumarakom Lake Resort / The Zuri',
        highlights: ['Full body Ayurvedic treatment', 'Bird sanctuary boat ride', 'Lakeside flute performance']
      },
      {
        day: 6,
        title: 'Farewell God’s Own Country',
        subtitle: 'Transfer to Kochi',
        description: 'Morning yoga session by the lake. Private transfer to Kochi Airport with organic spices and coconut oil gift pack.',
        meals: 'Breakfast',
        stay: 'Departure',
        highlights: ['Morning lake yoga', 'Airport transfer', 'Gift hamper']
      }
    ],
    inclusions: [
      '5 Nights Luxury Accommodations (Heritage Port, Tea Estate, Private Houseboat, Lake Resort)',
      'Dedicated Chauffeur in Air-Conditioned SUV throughout Kerala',
      'All Meals aboard Private Houseboat cooked fresh by Personal Chef',
      'Doctor-Consulted 90-minute Ayurvedic Wellness Session',
      'Kathakali Private Performance and Fort Kochi Heritage Tour',
      'All entry tickets, ferry tolls, and plantation fees'
    ],
    exclusions: [
      'Air tickets to/from Kochi',
      'Additional Ayurveda treatments beyond included session',
      'Personal laundry and telephone charges'
    ],
    activities: ['Houseboat Cruise', 'Ayurvedic Spa', 'Tea Tasting', 'Kathakali Performance', 'Bird Watching'],
    moods: ['WELLNESS', 'ESCAPE', 'ROMANCE', 'FAMILY'],
    featured: true,
    active: true
  },
  {
    id: 'pkg-ladakh-expedition',
    slug: 'ladakh-celestial-high',
    title: 'Ladakh — The High Moonscape',
    tagline: 'Nubra Sand Dunes, Pangong Tso & Hanle Stargazing',
    destinationId: 'dest-ladakh',
    destinationName: 'Ladakh',
    region: 'india',
    durationDays: 7,
    durationNights: 6,
    startingPriceINR: 47999,
    originalPriceINR: 55000,
    luxuryLevel: 'Private Expedition',
    rating: 4.96,
    reviewCount: 92,
    bannerImage: LADAKH_IMAGE,
    galleryImages: [LADAKH_IMAGE, HERO_IMAGE, RAJASTHAN_IMAGE],
    overview: 'Traverse the highest roads on earth in complete comfort with medical oxygen onboard. Experience dawn prayers at cliffside monasteries, camel safaris on high-altitude sand dunes, and reflections on Pangong Tso.',
    bestSeason: 'May to September',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Leh & Gentle Acclimatization',
        subtitle: '11,500 Feet Above Sea Level',
        description: 'Arrival at Kushok Bakula Rimpochee Airport. Warm welcome with traditional Ladakhi Khatag scarf. Rest and acclimatize in your luxury boutique hotel with heated rooms.',
        meals: 'Welcome Butter Tea & Light Dinner',
        stay: 'The Grand Dragon Ladakh / Chamba Camp',
        highlights: ['Airport pickup', 'Medical acclimatization check', 'Warm Ladakhi hospitality']
      },
      {
        day: 2,
        title: 'Monasteries of the Indus Valley',
        subtitle: 'Thiksey, Shey & Hemis',
        description: 'Visit Thiksey Monastery, reminiscent of Lhasa’s Potala Palace. Witness monks chanting and explore Hemis, the wealthiest monastery in Ladakh.',
        meals: 'Breakfast & Tibetan Lunch',
        stay: 'The Grand Dragon Ladakh',
        highlights: ['Dawn monk chanting', 'Maitreya Buddha statue', 'Indus river confluence view']
      },
      {
        day: 3,
        title: 'Crossing Khardung La to Nubra Valley',
        subtitle: 'Top of the World at 17,982 ft',
        description: 'Drive across the legendary Khardung La pass. Descend into the dramatic green valley of Nubra with white sand dunes.',
        meals: 'Breakfast & Campfire Dinner',
        stay: 'Lchang Nang Retreat / Chamba Camp Thiksey',
        highlights: ['Khardung La photo opportunity', 'Double-humped Bactrian camel ride', 'Organic farm-to-table dining']
      },
      {
        day: 4,
        title: 'Diskit Monastery & Turuk Border Village',
        subtitle: 'Maitreya Buddha overlooking Valley',
        description: 'Visit the 106-foot statue of Maitreya Buddha. Explore Balti heritage and apricot orchards in Turtuk, near the Line of Control.',
        meals: 'Breakfast & Balti Lunch',
        stay: 'Lchang Nang Retreat',
        highlights: ['106-ft Maitreya Buddha', 'Turtuk village walk', 'Apricot blossom trails']
      },
      {
        day: 5,
        title: 'Nubra to Pangong Tso via Shyok River',
        subtitle: 'The 134km Azure Wonder',
        description: 'Spectacular off-road expedition along the turquoise Shyok River to the surreal high-altitude salt lake Pangong Tso.',
        meals: 'Breakfast & Lakeside Dinner',
        stay: 'Pangong Glamping Luxury Camps',
        highlights: ['Changing lake color spectrum', 'Sunset over Himalayan ridges', 'Starry sky astrophotography']
      },
      {
        day: 6,
        title: 'Sunrise over Pangong & Return to Leh via Chang La',
        subtitle: 'Third Highest Pass in the World',
        description: 'Watch golden sunrise rays hit the lake waters. Return to Leh crossing Chang La (17,688 ft). Evening shopping in Leh bazaar for pashmina and silver.',
        meals: 'Breakfast & Farewell Ladakhi Feast',
        stay: 'The Grand Dragon Ladakh',
        highlights: ['Pangong sunrise', 'Chang La crossing', 'Leh heritage market exploration']
      },
      {
        day: 7,
        title: 'Depart from the Roof of the World',
        subtitle: 'Leh Airport Departure',
        description: 'Early morning transfer to Leh Airport with prayer wheel keepsake.',
        meals: 'Breakfast',
        stay: 'Departure',
        highlights: ['Airport transfer', 'Prayer flag departure gift']
      }
    ],
    inclusions: [
      '6 Nights in Luxury Heated Hotels and Premium Glamping Tents',
      'Private 4x4 Toyota Fortuner with Experienced Mountain Chauffeur',
      'Onboard Oxygen Cylinders and Pulse Oximeter throughout the trip',
      'Inner Line Permits and Wildlife Sanctuary Fees for Indian Travelers',
      'All Meals including Mountain Lunches and Campfire Dinners',
      'Camel Safari at Hunder Dunes & Monastery Entry passes'
    ],
    exclusions: [
      'Flights to and from Leh',
      'Emergency Evacuation Insurance',
      'Personal Rafting or ATV rental fees'
    ],
    activities: ['High Mountain Passes', 'Camel Safari', 'Monastery Dawn Chanting', 'Stargazing', 'Glacier Lakes'],
    moods: ['ADVENTURE', 'WILDERNESS', 'MOUNTAINS', 'ESCAPE'],
    featured: true,
    active: true
  },
  {
    id: 'pkg-bali-sanctuary',
    slug: 'bali-island-of-gods',
    title: 'Bali — Island of Gods & Sacred Rivers',
    tagline: 'Private Ubud Jungle Villa, Uluwatu Cliffs & Nusa Penida Yacht',
    destinationId: 'dest-bali',
    destinationName: 'Bali',
    region: 'international',
    durationDays: 6,
    durationNights: 5,
    startingPriceINR: 54999,
    originalPriceINR: 65000,
    luxuryLevel: 'Ultra Luxury',
    rating: 4.93,
    reviewCount: 118,
    bannerImage: KERALA_IMAGE,
    galleryImages: [KERALA_IMAGE, HERO_IMAGE],
    overview: 'Discover Bali like never before. Stay in a private pool villa overlooking the Ayung River in Ubud, experience sacred dawn temple rituals, and cruise to secluded coral beaches on a private catamaran.',
    bestSeason: 'Year Round (Best April to October)',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Denpasar & Ubud Rainforest Transfer',
        subtitle: 'Ayung River Gorge',
        description: 'VIP airport fast-track service and luxury transfer to your private pool villa surrounded by tropical greenery in Ubud.',
        meals: 'Welcome Balinese Canapes & Dinner',
        stay: 'Four Seasons Resort Bali at Sayan / Mandapa',
        highlights: ['VIP airport fast track', 'Ayung river bridge walk', 'Private infinity pool']
      },
      {
        day: 2,
        title: 'Tegallalang Terraces & Sacred Water Blessing',
        subtitle: 'Melukat Ceremony with Balinese Priest',
        description: 'Sunrise walk through emerald rice terraces. Participate in a traditional holy spring water blessing ceremony at Tirta Empul.',
        meals: 'Floating Breakfast & Traditional Duck Feast',
        stay: 'Four Seasons Resort Bali at Sayan',
        highlights: ['Private priest blessing', 'Floating pool breakfast', 'Art village exploration']
      },
      {
        day: 3,
        title: 'Mount Batur Sunrise & Jungle Swing',
        subtitle: 'Volcano Panoramas',
        description: 'Morning 4WD Jeep tour up Mount Batur black lava fields. Afternoon visit to artisanal coffee plantations.',
        meals: 'Breakfast & High Tea',
        stay: 'Four Seasons Resort Bali at Sayan',
        highlights: ['4WD Jeep sunrise tour', 'Luwak coffee tasting', 'Spa ritual']
      },
      {
        day: 4,
        title: 'Uluwatu Ocean Cliffs & Kecak Fire Dance',
        subtitle: 'Cliffs of the South',
        description: 'Transfer to cliffside resort in Uluwatu. Watch the mesmerizing sunset Kecak fire dance against crashing ocean waves.',
        meals: 'Breakfast & Cliffside Seafood Tasting',
        stay: 'Bulgari Resort Bali / Six Senses Uluwatu',
        highlights: ['Cliffside pool villa', 'Kecak sunset fire dance', 'Jimbaran bay seafood dinner']
      },
      {
        day: 5,
        title: 'Private Yacht Charter to Nusa Penida',
        subtitle: 'Kelingking & Crystal Bay',
        description: 'Board a private yacht charter to Nusa Penida. Snorkel with gentle manta rays and marvel at T-Rex cliff from the sea.',
        meals: 'Breakfast, Onboard Gourmet Lunch & Dinner',
        stay: 'Bulgari Resort Bali / Six Senses Uluwatu',
        highlights: ['Private yacht charter', 'Manta ray snorkeling', 'Sunset champagne toast']
      },
      {
        day: 6,
        title: 'Farewell Bali — Island of Memories',
        subtitle: 'Departure Transfer',
        description: 'Relax in your villa with late checkout. Chauffeur transfer to Ngurah Rai International Airport.',
        meals: 'Breakfast',
        stay: 'Departure',
        highlights: ['Late checkout', 'Airport transfer', 'Balinese batik gift']
      }
    ],
    inclusions: [
      '5 Nights in 5-Star Private Pool Villas (Ubud Rainforest & Uluwatu Cliff)',
      'Private Chauffeur-driven Mercedes van throughout Bali',
      'Private Yacht Charter to Nusa Penida with Snorkeling Gear',
      'Exclusive Melukat Water Blessing Ceremony with Priest',
      'Daily Signature Breakfasts including 1 Floating Breakfast',
      'VIP Airport Meet & Greet Fast Track on Arrival'
    ],
    exclusions: [
      'International Flights India — Bali',
      'Indonesian Visa on Arrival fee ($35 USD)',
      'Personal shopping and alcoholic beverages outside meals'
    ],
    activities: ['Floating Breakfast', 'Yacht Charter', 'Temple Blessing', 'Kecak Fire Dance', 'Manta Snorkeling'],
    moods: ['ROMANCE', 'WELLNESS', 'BEACH', 'LUXURY'],
    featured: true,
    active: true
  },
  {
    id: 'pkg-swiss-alps',
    slug: 'switzerland-alpine-escape',
    title: 'Switzerland — The Alpine Sanctuary',
    tagline: 'Glacier Express Excellence Class, Zermatt Matterhorn & Lake Geneva',
    destinationId: 'dest-switzerland',
    destinationName: 'Switzerland',
    region: 'international',
    durationDays: 8,
    durationNights: 7,
    startingPriceINR: 149999,
    originalPriceINR: 175000,
    luxuryLevel: 'Ultra Luxury',
    rating: 4.98,
    reviewCount: 74,
    bannerImage: LADAKH_IMAGE,
    galleryImages: [LADAKH_IMAGE, HERO_IMAGE],
    overview: 'Glide through towering snow peaks on the world-famous Glacier Express Excellence Class. Stay in legendary Belle Époque palaces, helicopter around the Matterhorn, and taste Grand Cru chocolates.',
    bestSeason: 'June to October & Dec–March for Skiing',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Zurich & Lake Promenade',
        subtitle: 'Gateway to the Alps',
        description: 'First-class train or Mercedes limousine transfer to your lakeside grand hotel in Zurich. Stroll along Bahnhofstrasse.',
        meals: 'Welcome Champagne & Swiss Fondue',
        stay: 'The Dolder Grand Zurich / Baur au Lac',
        highlights: ['First-class transfer', 'Old town walking tour', 'Lakeside dinner']
      },
      {
        day: 2,
        title: 'Lucerne & Mount Pilatus Golden Round Trip',
        subtitle: 'Dragon Mountain & Lake Steamer',
        description: 'Historic paddle steamer cruise across Lake Lucerne followed by the world’s steepest cogwheel railway to Mount Pilatus.',
        meals: 'Breakfast & Alpine Lunch',
        stay: 'Bürgenstock Resort Lake Lucerne',
        highlights: ['Paddle steamer cruise', 'Steepest cogwheel train', 'Infinity pool hanging over lake']
      },
      {
        day: 3,
        title: 'Boarding the Legendary Glacier Express',
        subtitle: 'Excellence Class — St. Moritz to Zermatt',
        description: 'Board the Glacier Express Excellence Class with guaranteed window seats, concierge service, and 5-course wine pairing lunch over the Landwasser Viaduct.',
        meals: 'Breakfast & 5-Course Excellence Class Lunch',
        stay: 'Mont Cervin Palace Zermatt / The Omnia',
        highlights: ['Glacier Express Excellence Class pass', 'Landwasser Viaduct crossing', 'Matterhorn view balcony']
      },
      {
        day: 4,
        title: 'Zermatt & Gornergrat Matterhorn Vista',
        subtitle: 'Icon of the Alps',
        description: 'Ascend by electric cogwheel railway to Gornergrat (10,135 ft) with unmatched vistas of the Matterhorn and Monte Rosa glacier.',
        meals: 'Breakfast & Valais Raclette Dinner',
        stay: 'Mont Cervin Palace Zermatt',
        highlights: ['Gornergrat railway pass', 'Riffelsee lake reflection walk', 'Chalet raclette dinner']
      },
      {
        day: 5,
        title: 'Private Helicopter Overflight of the Matterhorn',
        subtitle: 'Touch the Sky',
        description: 'Spectacular 30-minute private helicopter overflight circling the sheer north face of the Matterhorn. Afternoon spa.',
        meals: 'Breakfast & Michelin-Star Dinner',
        stay: 'Mont Cervin Palace Zermatt',
        highlights: ['Private Air Zermatt helicopter flight', 'Spa relaxation', 'Michelin-starred tasting menu']
      },
      {
        day: 6,
        title: 'Montreux & the Swiss Riviera',
        subtitle: 'Vineyards of Lavaux & Lake Geneva',
        description: 'Scenic train through the Rhone Valley to Montreux. Visit Chateau de Chillon and taste UNESCO Lavaux vineyard wines.',
        meals: 'Breakfast & Wine Tasting Lunch',
        stay: 'Fairmont Le Montreux Palace',
        highlights: ['Chillon castle private tour', 'Lavaux vineyard wine tasting', 'Lake Geneva promenade']
      },
      {
        day: 7,
        title: 'Geneva Horology & Fine Dining',
        subtitle: 'Capital of Watchmaking',
        description: 'Private tour of Patek Philippe Museum and exclusive watch atelier. Evening farewell dinner on a private salon yacht.',
        meals: 'Breakfast & Farewell Gala Dinner',
        stay: 'Fairmont Le Montreux Palace / The Ritz-Carlton Geneva',
        highlights: ['Horology masterclass', 'Private salon boat cruise', 'Gala dinner']
      },
      {
        day: 8,
        title: 'Departure from Geneva',
        subtitle: 'Au Revoir Suisse',
        description: 'Private limousine transfer to Geneva International Airport with artisanal Swiss chocolate gift chest.',
        meals: 'Breakfast',
        stay: 'Departure',
        highlights: ['Limousine airport transfer', 'Handmade Swiss chocolate gift']
      }
    ],
    inclusions: [
      '7 Nights in 5-Star Superior Swiss Grand Hotels & Resorts',
      'Glacier Express Excellence Class tickets with 5-Course Wine Pairing',
      'First-Class Swiss Travel Pass for all scenic mountain railways & boats',
      'Private 30-Minute Helicopter flight around the Matterhorn',
      'Daily Grand Breakfast Buffet and 3 Gourmet Michelin-level Dinners',
      'Luggage porterage and private limousine transfers'
    ],
    exclusions: [
      'International flights from India to Zurich / Geneva',
      'Schengen Visa fees & processing',
      'Discretionary tips and personal expenditures'
    ],
    activities: ['Glacier Express Train', 'Helicopter Flight', 'Mountain Cogwheel', 'Lake Cruise', 'Wine Tasting'],
    moods: ['LUXURY', 'MOUNTAINS', 'ROMANCE', 'ESCAPE'],
    featured: true,
    active: true
  }
];

export const TRAVEL_MOODS = [
  {
    id: 'ESCAPE',
    name: 'ESCAPE',
    quote: 'Disappear into untouched sanctuaries and silent horizons.',
    image: HERO_IMAGE,
    destinations: ['Kashmir', 'Kerala', 'Ladakh', 'Maldives']
  },
  {
    id: 'ADVENTURE',
    name: 'ADVENTURE',
    quote: 'Go beyond the ordinary and cross forbidden frontiers.',
    image: LADAKH_IMAGE,
    destinations: ['Ladakh', 'Andaman', 'Switzerland']
  },
  {
    id: 'ROMANCE',
    name: 'ROMANCE',
    quote: 'Two tickets. One unforgettable story written together.',
    image: HERO_IMAGE,
    destinations: ['Kashmir', 'Bali', 'Maldives', 'Rajasthan']
  },
  {
    id: 'LUXURY',
    name: 'LUXURY',
    quote: 'Travel beautifully with private jets, royal palaces and personal butlers.',
    image: RAJASTHAN_IMAGE,
    destinations: ['Rajasthan', 'Switzerland', 'Maldives', 'Dubai']
  },
  {
    id: 'FAMILY',
    name: 'FAMILY',
    quote: 'Memories and shared wonders they will talk about for years.',
    image: KERALA_IMAGE,
    destinations: ['Kerala', 'Switzerland', 'Goa', 'Bali']
  },
  {
    id: 'WELLNESS',
    name: 'WELLNESS',
    quote: 'Restore the mind, body and spirit with sacred Ayurvedic traditions.',
    image: KERALA_IMAGE,
    destinations: ['Kerala', 'Bali', 'Kashmir']
  },
  {
    id: 'CULTURE',
    name: 'CULTURE',
    quote: 'Walk with maharajas, monks and artisans across living heritage.',
    image: RAJASTHAN_IMAGE,
    destinations: ['Rajasthan', 'Ladakh', 'Kashmir']
  },
  {
    id: 'WILDERNESS',
    name: 'WILDERNESS',
    quote: 'Breathe pristine mountain air beneath celestial constellations.',
    image: LADAKH_IMAGE,
    destinations: ['Ladakh', 'Kashmir', 'Andaman']
  }
];

export const TRAVEL_STORIES: TravelStory[] = [
  {
    id: 'story-1',
    slug: 'kashmir-saffron-mornings',
    title: 'Saffron Mornings on Dal Lake: A Story of Cedar & Silence',
    subtitle: 'Waking up before dawn aboard an intricately hand-carved shikara in the heart of Kashmir.',
    category: 'Destinations',
    author: 'Vikramaditya Singhania',
    authorRole: 'Curator of Bespoke Expeditions',
    publishedDate: '18 September 2026',
    readTime: '6 min read',
    coverImage: HERO_IMAGE,
    excerpt: 'Before the sun crests the snow-crested Pir Panjal mountains, Dal Lake is a sheet of black obsidian. The only sound is the rhythmic dipping of a heart-shaped cedar oar.',
    content: [
      'Before the sun crests the snow-crested Pir Panjal mountains, Dal Lake is a sheet of black obsidian. The only sound is the rhythmic dipping of a heart-shaped cedar oar and the fragrant steam rising from a brass samovar of Kahwa brewed with freshly picked saffron threads, green cardamom, and crushed Mamra almonds.',
      'To experience Kashmir through our private cedar houseboats is to step back into an era when travelers did not rush. The master carpenters who carved these floating palaces worked with fragrant deodar pine, each panel telling stories of chinar leaves, nightingales, and mountain streams.',
      'By midday, our private helicopter ascends smoothly above Gulmarg, unveiling the sheer scale of the western Himalayas. As our guests sip champagne at 13,000 feet, the hustle of modern life dissolves entirely into the pristine snow.'
    ],
    destinationSlug: 'kashmir'
  },
  {
    id: 'story-2',
    slug: 'secrets-of-udaipur-palaces',
    title: 'The Living Royalty of Udaipur: Dining with Historians in Lake Pichola',
    subtitle: 'Behind the marble screens of Mewar palaces where five centuries of royal hospitality still thrive.',
    category: 'Luxury Travel',
    author: 'Meenakshi Rathore',
    authorRole: 'Heritage Travel Writer',
    publishedDate: '12 September 2026',
    readTime: '5 min read',
    coverImage: RAJASTHAN_IMAGE,
    excerpt: 'In Udaipur, luxury is not merely marble floors or gilded chandeliers. It is the living thread of Mewari honor, where every guest is welcomed as an emissary of divine grace.',
    content: [
      'In Udaipur, luxury is not merely marble floors or gilded chandeliers. It is the living thread of Mewari honor, where every guest is welcomed as an emissary of divine grace with the ancient greeting of Khamaghani.',
      'Our signature private royal itinerary opens doors typically sealed to the general public. Guests are guided through private courtyards by senior royal historians, holding manuscripts illuminated with real crushed lapis lazuli and gold leaf.',
      'As dusk falls over Lake Pichola, the City Palace glows with thousands of warm earthen diyas, their golden light dancing on the dark waters while a private sarangi recital plays softly in the background.'
    ],
    destinationSlug: 'rajasthan'
  },
  {
    id: 'story-3',
    slug: 'monks-of-ladakh-dawn',
    title: 'Chants at 12,000 Feet: The Sacred Monasteries of Ladakh',
    subtitle: 'Listening to the reverberations of copper horns and ancient Tibetan bells as the sun kisses Thiksey.',
    category: 'Culture',
    author: 'Tenzin Dorje',
    authorRole: 'High Himalayan Expedition Leader',
    publishedDate: '04 September 2026',
    readTime: '7 min read',
    coverImage: LADAKH_IMAGE,
    excerpt: 'High above the Indus River, the morning air in Ladakh is so thin and pure that every sound carries for miles. When the deep copper dungchen horn sounds from the rooftop of Thiksey Monastery, your pulse slows down.',
    content: [
      'High above the Indus River, the morning air in Ladakh is so thin and pure that every sound carries for miles. When the deep copper dungchen horn sounds from the rooftop of Thiksey Monastery, your pulse slows down.',
      'Here, far above the chaos of modern cities, our travelers learn that luxury can also mean profound stillness. Accompanied by our dedicated medical doctors and acclimatization team in 4x4 expedition vehicles, you traverse world-record passes with total peace of mind.',
      'At night, Hanle unveils the universe. With virtually zero atmospheric pollution, the Milky Way arches across the sky with crystalline intensity, reminding us how extraordinary our planet truly is.'
    ],
    destinationSlug: 'ladakh'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Aarav & Devika Malhotra',
    customerCity: 'Mumbai',
    destinationName: 'Kashmir',
    packageTitle: 'Kashmir — The Valley of Dreams',
    rating: 5,
    reviewText: 'Every single detail was organized with absolute perfection. From the private shikara pickup to the helicopter ride in Gulmarg, we did not have to worry about a thing. The WhatsApp concierge was responsive within 2 minutes throughout our trip.',
    travelDate: 'October 2026',
    verifiedBooking: true
  },
  {
    id: 'rev-2',
    customerName: 'Rajesh & Sangeeta Singhal',
    customerCity: 'New Delhi',
    destinationName: 'Rajasthan',
    packageTitle: 'Rajasthan — The Maharaja Grandeur',
    rating: 5,
    reviewText: 'Staying at the Taj Lake Palace and having a private historian take our family through Mehrangarh was unforgettable. Nirvana Luxury provided true Indian royal hospitality with zero stress.',
    travelDate: 'November 2026',
    verifiedBooking: true
  },
  {
    id: 'rev-3',
    customerName: 'Karthik Ramanathan',
    customerCity: 'Bengaluru',
    destinationName: 'Ladakh',
    packageTitle: 'Ladakh — The High Moonscape',
    rating: 5,
    reviewText: 'As an avid photographer, Ladakh was on my bucket list. The private 4x4, the oxygen support, and the glamping by Pangong Tso at sunrise were surreal. Truly world-class standards.',
    travelDate: 'August 2026',
    verifiedBooking: true
  }
];

export const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: 'TRV-2026-000123',
    userId: 'user-aarav-1',
    userEmail: 'aarav.mehta@example.com',
    userName: 'Aarav Mehta',
    userPhone: '+91 98201 12345',
    packageId: 'pkg-kashmir-dreams',
    packageTitle: 'Kashmir — The Valley of Dreams',
    destinationName: 'Kashmir',
    packageBannerImage: HERO_IMAGE,
    travelStartDate: '2026-10-12',
    travelEndDate: '2026-10-18',
    numberOfAdults: 2,
    numberOfChildren: 0,
    numberOfInfants: 0,
    travelers: [
      {
        isPrimary: true,
        fullName: 'Aarav Mehta',
        email: 'aarav.mehta@example.com',
        phone: '+91 98201 12345',
        gender: 'male',
        dob: '1988-06-14',
        address: {
          houseFlat: 'B-1402, Lodha Bellissimo',
          street: 'NM Joshi Marg',
          area: 'Lower Parel',
          landmark: 'Opposite Palladium Mall',
          city: 'Mumbai',
          district: 'Mumbai City',
          state: 'Maharashtra',
          pinCode: '400013',
          country: 'India'
        },
        emergencyContact: {
          name: 'Rohit Mehta',
          phone: '+91 98201 99888',
          relation: 'Brother'
        }
      },
      {
        isPrimary: false,
        fullName: 'Devika Mehta',
        gender: 'female',
        dob: '1990-09-22',
        age: 36
      }
    ],
    addOns: [
      {
        id: 'addon-vip-transfer',
        name: 'Private Luxury Helicopter Transfer Gulmarg',
        description: 'Skip road traffic with scenic mountain helicopter ride',
        priceINR: 18000,
        selected: true
      }
    ],
    pricing: {
      basePricePerPersonINR: 39999,
      travelersSubtotalINR: 79998,
      addOnsTotalINR: 18000,
      gstINR: 4899.9,
      totalINR: 102897.9
    },
    paymentStatus: 'paid',
    bookingStatus: 'Confirmed',
    paymentDetails: {
      method: 'upi',
      transactionId: 'UPI-RAZOR-99881230491',
      paidAt: '2026-09-20T10:30:00Z'
    },
    createdAt: '2026-09-20T10:28:00Z',
    updatedAt: '2026-09-20T10:30:00Z',
    specialRequests: 'High floor lake-facing suite on the cedar houseboat; mild spices for dinner.',
    assignedAgentName: 'Priya Sharma (Senior Travel Concierge)'
  }
];
