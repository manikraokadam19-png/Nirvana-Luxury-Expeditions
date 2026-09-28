import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DestinationDiscovery } from './components/DestinationDiscovery';
import { TravelByMood } from './components/TravelByMood';
import { FeaturedJourneys } from './components/FeaturedJourneys';
import { PackageDetailModal } from './components/PackageDetailModal';
import { BuildYourOwnJourney } from './components/BuildYourOwnJourney';
import { AITravelDiscovery } from './components/AITravelDiscovery';
import { BookingWorkflowModal } from './components/BookingWorkflowModal';
import { AuthModal } from './components/AuthModal';
import { TravelerDashboard } from './components/TravelerDashboard';
import { AdminPortal } from './components/AdminPortal';
import { WhatsAppPreviewModal } from './components/WhatsAppPreviewModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { TravelStories } from './components/TravelStories';
import { LuxuryExperiences } from './components/LuxuryExperiences';
import { HoneymoonAndFamilySection } from './components/HoneymoonAndFamilySection';
import { ReviewsAndGallery } from './components/ReviewsAndGallery';
import { Footer } from './components/Footer';
import { api } from './services/api';
import { Destination, TravelPackage, Booking, TravelStory } from './types/travel';
import { INITIAL_DESTINATIONS, INITIAL_PACKAGES, TRAVEL_STORIES } from './data/travelData';
import { Phone, Compass, MessageCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { user, isAgentOrAdmin, openAuthModal } = useAuth();

  const [activeTab, setActiveTab] = useState<'home' | 'packages' | 'destinations' | 'experiences' | 'stories' | 'dashboard' | 'admin'>('home');
  const [destinations, setDestinations] = useState<Destination[]>(INITIAL_DESTINATIONS);
  const [packages, setPackages] = useState<TravelPackage[]>(INITIAL_PACKAGES);

  // Modals state
  const [selectedPackageForDetail, setSelectedPackageForDetail] = useState<TravelPackage | null>(null);
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState<TravelPackage | null>(null);
  const [selectedBookingForWhatsApp, setSelectedBookingForWhatsApp] = useState<Booking | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [plannerDestination, setPlannerDestination] = useState<string>('Kashmir');

  // Load backend data if available
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pkgs, dests] = await Promise.all([api.getPackages(), fetch('/api/destinations').then(r => r.json()).then(d => d.destinations).catch(() => INITIAL_DESTINATIONS)]);
        if (pkgs && pkgs.length) setPackages(pkgs);
        if (dests && dests.length) setDestinations(dests);
      } catch (e) {
        console.warn('Initial data load completed with baseline catalog.');
      }
    };
    fetchData();
  }, []);

  const handleOpenPlanner = (destName?: string) => {
    if (destName) setPlannerDestination(destName);
    const element = document.getElementById('custom-journey');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById('custom-journey');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleDestinationSelect = (dest: Destination) => {
    // Filter packages matching destination or open planner
    const matched = packages.filter(p => p.destinationName.toLowerCase() === dest.name.toLowerCase());
    if (matched.length > 0) {
      setSelectedPackageForDetail(matched[0]);
    } else {
      handleOpenPlanner(dest.name);
    }
  };

  const handleMoodSelect = (moodId: string) => {
    const el = document.getElementById('packages-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHeroSearch = (params: { destination: string; date: string; travelers: number; tripType: string }) => {
    if (params.destination) {
      const match = packages.find(p => p.destinationName.toLowerCase() === params.destination.toLowerCase());
      if (match) {
        setSelectedPackageForDetail(match);
        return;
      }
    }
    const el = document.getElementById('packages-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-[#f7f5f0] flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenPlanner={() => handleOpenPlanner()}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeTab={activeTab}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* Cinematic Hero */}
            <HeroSection
              onExploreJourneys={() => {
                const el = document.getElementById('packages-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenPlanner={() => handleOpenPlanner()}
              onSearch={handleHeroSearch}
            />

            {/* Destination Discovery */}
            <DestinationDiscovery
              destinations={destinations}
              onSelectDestination={handleDestinationSelect}
              onExploreAll={() => {
                setActiveTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Travel by Mood */}
            <TravelByMood onSelectMood={handleMoodSelect} />

            {/* Curated Featured Journeys */}
            <FeaturedJourneys
              packages={packages}
              onSelectPackage={(pkg) => setSelectedPackageForDetail(pkg)}
              onBookDirect={(pkg) => setSelectedPackageForBooking(pkg)}
            />

            {/* Smart AI-Style Discovery Quiz */}
            <AITravelDiscovery
              packages={packages}
              onSelectPackage={(pkg) => setSelectedPackageForDetail(pkg)}
            />

            {/* Build Your Own Journey */}
            <BuildYourOwnJourney initialDestination={plannerDestination} />

            {/* Signature Luxury Experiences */}
            <LuxuryExperiences
              onSelectExperience={(title) => {
                handleOpenPlanner();
              }}
            />

            {/* Honeymoon & Family Travel */}
            <HoneymoonAndFamilySection
              onPlanTrip={(style) => handleOpenPlanner()}
            />

            {/* Travel Stories Editorial */}
            <TravelStories
              onSelectDestinationSlug={(slug) => {
                const found = destinations.find(d => d.slug === slug);
                if (found) handleDestinationSelect(found);
              }}
            />

            {/* Customer Reviews & Instagram Gallery */}
            <ReviewsAndGallery
              onSelectDestination={(name) => {
                const found = destinations.find(d => d.name.toLowerCase() === name.toLowerCase());
                if (found) handleDestinationSelect(found);
              }}
            />
          </>
        )}

        {/* Tab: All Packages View */}
        {activeTab === 'packages' && (
          <div className="pt-16">
            <FeaturedJourneys
              packages={packages}
              onSelectPackage={(pkg) => setSelectedPackageForDetail(pkg)}
              onBookDirect={(pkg) => setSelectedPackageForBooking(pkg)}
            />
          </div>
        )}

        {/* Tab: Destinations */}
        {activeTab === 'destinations' && (
          <div className="pt-16">
            <DestinationDiscovery
              destinations={destinations}
              onSelectDestination={handleDestinationSelect}
              onExploreAll={() => setActiveTab('packages')}
            />
          </div>
        )}

        {/* Tab: Experiences */}
        {activeTab === 'experiences' && (
          <div className="pt-16">
            <LuxuryExperiences onSelectExperience={() => handleOpenPlanner()} />
          </div>
        )}

        {/* Tab: Travel Stories */}
        {activeTab === 'stories' && (
          <div className="pt-16">
            <TravelStories onSelectDestinationSlug={() => {}} />
          </div>
        )}

        {/* Tab: Traveler Dashboard */}
        {activeTab === 'dashboard' && (
          <TravelerDashboard
            onOpenWhatsAppPreview={(b) => setSelectedBookingForWhatsApp(b)}
            onExploreMore={() => setActiveTab('packages')}
          />
        )}

        {/* Tab: Operations & Admin Console */}
        {activeTab === 'admin' && <AdminPortal />}
      </main>

      {/* Floating Action Button for Instant WhatsApp Concierge */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            const sample = {
              id: 'TRV-2026-000123',
              userName: user?.fullName || 'Aarav Mehta',
              userPhone: user?.phone || '+91 98201 12345',
              destinationName: 'Kashmir',
              packageTitle: 'Kashmir — The Valley of Dreams',
              travelStartDate: '2026-10-12',
              travelEndDate: '2026-10-18',
              numberOfAdults: 2
            } as Booking;
            setSelectedBookingForWhatsApp(sample);
          }}
          className="group flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl transition-all hover:scale-105"
          aria-label="Open WhatsApp Travel Concierge"
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="text-xs font-semibold tracking-wide hidden sm:inline">
            WhatsApp Concierge
          </span>
        </button>
      </div>

      {/* Package Detail Modal */}
      <PackageDetailModal
        pkg={selectedPackageForDetail}
        isOpen={!!selectedPackageForDetail}
        onClose={() => setSelectedPackageForDetail(null)}
        onBookNow={(pkg) => {
          setSelectedPackageForDetail(null);
          setSelectedPackageForBooking(pkg);
        }}
        onCustomize={(pkg) => {
          setSelectedPackageForDetail(null);
          handleOpenPlanner(pkg.destinationName);
        }}
      />

      {/* Booking Workflow Modal */}
      <BookingWorkflowModal
        pkg={selectedPackageForBooking}
        isOpen={!!selectedPackageForBooking}
        onClose={() => setSelectedPackageForBooking(null)}
        onBookingSuccess={(booking) => {
          setSelectedBookingForWhatsApp(booking);
        }}
      />

      {/* Authentication Modal */}
      <AuthModal />

      {/* WhatsApp Simulated Modal */}
      <WhatsAppPreviewModal
        booking={selectedBookingForWhatsApp}
        isOpen={!!selectedBookingForWhatsApp}
        onClose={() => setSelectedBookingForWhatsApp(null)}
      />

      {/* Global Quick Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        destinations={destinations}
        packages={packages}
        stories={TRAVEL_STORIES}
        onSelectDestination={handleDestinationSelect}
        onSelectPackage={(pkg) => setSelectedPackageForDetail(pkg)}
        onSelectStory={() => setActiveTab('stories')}
      />

      {/* Footer */}
      <Footer
        onPlanTrip={() => handleOpenPlanner()}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
