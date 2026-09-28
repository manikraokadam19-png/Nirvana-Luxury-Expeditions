import React, { useState, useEffect } from 'react';
import { Search, Compass, User as UserIcon, Menu, X, Shield, PhoneCall } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenPlanner: () => void;
  onNavigateTab: (tab: 'home' | 'packages' | 'destinations' | 'experiences' | 'stories' | 'dashboard' | 'admin') => void;
  activeTab: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenPlanner,
  onNavigateTab,
  activeTab
}) => {
  const { user, isAuthenticated, isAdmin, isAgentOrAdmin, openAuthModal, logout, switchRoleForDemo } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0b0f17]/90 backdrop-blur-md border-b border-[#243046]/70 shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-[#0b0f17]/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar 3-Zone Contract */}
        <div className="flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => {
              onNavigateTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group text-left focus-visible:outline-none"
          >
            <span className="font-editorial text-2xl sm:text-3xl tracking-[0.2em] font-medium text-white transition-colors group-hover:text-[#dfc294]">
              NIRVANA
            </span>
          </button>

          {/* Zone 2: 5 clean text navigation links (No static pills) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
            <button
              onClick={() => onNavigateTab('destinations')}
              className={`transition-colors hover:text-white py-1 relative ${
                activeTab === 'destinations' ? 'text-white font-semibold' : 'text-[#c3ccd9]'
              }`}
            >
              Destinations
              {activeTab === 'destinations' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c5a880]" />
              )}
            </button>

            <button
              onClick={() => onNavigateTab('packages')}
              className={`transition-colors hover:text-white py-1 relative ${
                activeTab === 'packages' ? 'text-white font-semibold' : 'text-[#c3ccd9]'
              }`}
            >
              Journeys
              {activeTab === 'packages' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c5a880]" />
              )}
            </button>

            <button
              onClick={() => onNavigateTab('experiences')}
              className={`transition-colors hover:text-white py-1 relative ${
                activeTab === 'experiences' ? 'text-white font-semibold' : 'text-[#c3ccd9]'
              }`}
            >
              Experiences
              {activeTab === 'experiences' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c5a880]" />
              )}
            </button>

            <button
              onClick={() => onNavigateTab('stories')}
              className={`transition-colors hover:text-white py-1 relative ${
                activeTab === 'stories' ? 'text-white font-semibold' : 'text-[#c3ccd9]'
              }`}
            >
              Travel Stories
              {activeTab === 'stories' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c5a880]" />
              )}
            </button>

            <button
              onClick={onOpenPlanner}
              className="text-[#dfc294] hover:text-white transition-colors flex items-center gap-1.5 py-1"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Bespoke Planner</span>
            </button>

            {isAgentOrAdmin && (
              <button
                onClick={() => onNavigateTab('admin')}
                className={`flex items-center gap-1.5 py-1 text-sm font-medium ${
                  activeTab === 'admin' ? 'text-[#e5cb9f] font-semibold' : 'text-[#a7b5cc] hover:text-white'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>{isAdmin ? 'Admin Console' : 'Agent Desk'}</span>
              </button>
            )}
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-3.5">
            {/* Global Quick Search button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#c3ccd9] hover:text-white hover:bg-white/5 rounded-md transition-colors"
              aria-label="Search destinations and packages"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* User Profile / Dashboard / Login */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#162030] hover:bg-[#1f2b40] border border-[#243046] text-xs text-white transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-[#c5a880]/20 text-[#dfc294] flex items-center justify-center font-medium">
                    {user?.fullName.charAt(0) || 'U'}
                  </div>
                  <span className="hidden sm:inline font-medium max-w-[120px] truncate">{user?.fullName.split(' ')[0]}</span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md bg-[#121824] border border-[#243046] shadow-xl py-2 z-50 text-xs">
                    <div className="px-4 py-2 border-b border-[#243046]">
                      <p className="font-medium text-white truncate">{user?.fullName}</p>
                      <p className="text-[#8e9cb2] truncate">{user?.email}</p>
                      <div className="mt-1 inline-block text-[10px] uppercase tracking-wider text-[#dfc294]">
                        Role: {user?.role}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onNavigateTab('dashboard');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#1a2334] text-white flex items-center gap-2"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-[#c5a880]" />
                      <span>My Trips & Itineraries</span>
                    </button>

                    {isAgentOrAdmin && (
                      <button
                        onClick={() => {
                          onNavigateTab('admin');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#1a2334] text-[#dfc294] flex items-center gap-2"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        <span>Operations Dashboard</span>
                      </button>
                    )}

                    {/* Quick Role Switcher for seamless test-drive */}
                    <div className="px-4 py-1.5 border-t border-[#243046] my-1 text-[11px] text-[#8e9cb2]">
                      <div className="font-semibold text-[#a7b5cc] mb-1">Preview Role As:</div>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => {
                            switchRoleForDemo('customer');
                            setProfileDropdownOpen(false);
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] ${
                            user?.role === 'customer' ? 'bg-[#c5a880] text-black font-semibold' : 'bg-[#1e293b] text-[#c3ccd9]'
                          }`}
                        >
                          Customer
                        </button>
                        <button
                          onClick={() => {
                            switchRoleForDemo('travel_agent');
                            setProfileDropdownOpen(false);
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] ${
                            user?.role === 'travel_agent' ? 'bg-[#c5a880] text-black font-semibold' : 'bg-[#1e293b] text-[#c3ccd9]'
                          }`}
                        >
                          Agent
                        </button>
                        <button
                          onClick={() => {
                            switchRoleForDemo('admin');
                            setProfileDropdownOpen(false);
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] ${
                            user?.role === 'admin' ? 'bg-[#c5a880] text-black font-semibold' : 'bg-[#1e293b] text-[#c3ccd9]'
                          }`}
                        >
                          Admin
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#1a2334] text-rose-400 border-t border-[#243046]"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => openAuthModal('login')}
                  className="text-xs sm:text-sm font-medium text-[#c3ccd9] hover:text-white px-2 py-1 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="text-xs sm:text-sm font-medium text-[#dfc294] hover:text-white px-2 py-1 transition-colors hidden sm:inline"
                >
                  Register
                </button>
              </div>
            )}

            {/* Primary Action Button */}
            <button
              onClick={onOpenPlanner}
              className="px-3.5 sm:px-4 py-2 text-xs font-semibold text-[#0b0f17] bg-[#c5a880] hover:bg-[#dfc294] transition-all rounded-sm tracking-wider uppercase whitespace-nowrap"
            >
              Plan My Trip
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#c3ccd9] hover:text-white rounded-md"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-[#243046] pb-4 space-y-3 bg-[#0b0f17]">
            <button
              onClick={() => {
                onNavigateTab('destinations');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm text-[#e2e8f0]"
            >
              Destinations
            </button>
            <button
              onClick={() => {
                onNavigateTab('packages');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm text-[#e2e8f0]"
            >
              Curated Journeys
            </button>
            <button
              onClick={() => {
                onNavigateTab('experiences');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm text-[#e2e8f0]"
            >
              Luxury Experiences
            </button>
            <button
              onClick={() => {
                onNavigateTab('stories');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm text-[#e2e8f0]"
            >
              Travel Stories & Editorial
            </button>
            <button
              onClick={() => {
                onNavigateTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm text-[#dfc294]"
            >
              My Trips & Itinerary
            </button>
            {isAgentOrAdmin && (
              <button
                onClick={() => {
                  onNavigateTab('admin');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-sm text-[#dfc294]"
              >
                Operations & Admin Console
              </button>
            )}
            <div className="pt-2 border-t border-[#243046] flex items-center justify-between text-xs text-[#8e9cb2]">
              <span>Helpline: +91 98111 99999</span>
              <a href="tel:+919811199999" className="text-[#dfc294] flex items-center gap-1">
                <PhoneCall className="w-3 h-3" /> Call Concierge
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
