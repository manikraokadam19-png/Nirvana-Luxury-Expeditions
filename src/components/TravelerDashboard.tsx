import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Download, Phone, ShieldCheck, ArrowRight, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';
import { Booking } from '../types/travel';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

interface TravelerDashboardProps {
  onOpenWhatsAppPreview: (booking: Booking) => void;
  onExploreMore: () => void;
}

export const TravelerDashboard: React.FC<TravelerDashboardProps> = ({
  onOpenWhatsAppPreview,
  onExploreMore
}) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [selectedBookingForDetail, setSelectedBookingForDetail] = useState<Booking | null>(null);

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 14,
    hours: 8,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const list = await api.getBookings(user?.id, user?.role);
        setBookings(list);
      } catch (e) {
        console.error(e);
      }
    };
    fetchBookings();
  }, [user]);

  // Dynamic countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const upcomingBookings = bookings.filter(b => b.bookingStatus === 'Confirmed' || b.bookingStatus === 'Upcoming');
  const completedBookings = bookings.filter(b => b.bookingStatus === 'Completed');
  const cancelledBookings = bookings.filter(b => b.bookingStatus === 'Cancelled');

  const marqueeBooking = upcomingBookings[0] || bookings[0];

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'GOOD MORNING';
    if (hour < 18) return 'GOOD AFTERNOON';
    return 'GOOD EVENING';
  };

  return (
    <div className="py-24 sm:py-28 bg-[#0b0f17] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-12 border-b border-[#1a2334] pb-8">
          <div className="text-xs uppercase tracking-[0.25em] text-[#dfc294] font-medium mb-2">
            Voyager Sanctuary
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal">
            {greeting()}, {user?.fullName.toUpperCase() || 'TRAVELER'}.
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#8e9cb2] font-light">
            Where will your next story take you?
          </p>
        </div>

        {/* Marquee Next Journey Spotlight Card */}
        {marqueeBooking && (
          <div className="mb-14 bg-[#121824] border border-[#243046] rounded-sm overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Image banner */}
              <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[380px]">
                <img
                  src={marqueeBooking.packageBannerImage}
                  alt={marqueeBooking.packageTitle}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#121824]" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs text-[#dfc294] font-mono border border-white/10">
                  {marqueeBooking.id}
                </div>
              </div>

              {/* Details & Live Countdown */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-widest text-[#dfc294] font-semibold">
                      Your Next Journey
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-400 font-medium">
                      Status: {marqueeBooking.bookingStatus}
                    </span>
                  </div>

                  <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
                    {marqueeBooking.destinationName}
                  </h2>
                  <p className="text-sm text-[#cbd5e1] mt-1 font-light">
                    {marqueeBooking.packageTitle}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#243046] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#cbd5e1]">
                    <div>
                      <span className="text-[#8e9cb2] block">Travel Dates</span>
                      <span className="font-mono text-white">{marqueeBooking.travelStartDate} – {marqueeBooking.travelEndDate}</span>
                    </div>
                    <div>
                      <span className="text-[#8e9cb2] block">Travelers</span>
                      <span className="text-white">{marqueeBooking.numberOfAdults} Adults</span>
                    </div>
                    <div>
                      <span className="text-[#8e9cb2] block">Concierge</span>
                      <span className="text-[#dfc294]">{marqueeBooking.assignedAgentName || 'Priya Sharma'}</span>
                    </div>
                  </div>
                </div>

                {/* Atmospheric Countdown Timer */}
                <div className="mt-8 pt-6 border-t border-[#243046]">
                  <div className="text-[11px] uppercase tracking-[0.25em] text-[#8e9cb2] mb-3">
                    Your Journey Begins In:
                  </div>
                  <div className="flex items-center gap-3 text-center">
                    <div className="bg-[#0b0f17] border border-[#243046] px-3.5 py-2 rounded-sm min-w-[64px]">
                      <div className="font-mono text-2xl font-bold text-white tabular-nums">{timeLeft.days}</div>
                      <div className="text-[9px] uppercase tracking-wider text-[#8e9cb2]">Days</div>
                    </div>
                    <span className="text-[#c5a880] font-mono text-xl">:</span>
                    <div className="bg-[#0b0f17] border border-[#243046] px-3.5 py-2 rounded-sm min-w-[64px]">
                      <div className="font-mono text-2xl font-bold text-white tabular-nums">{timeLeft.hours}</div>
                      <div className="text-[9px] uppercase tracking-wider text-[#8e9cb2]">Hours</div>
                    </div>
                    <span className="text-[#c5a880] font-mono text-xl">:</span>
                    <div className="bg-[#0b0f17] border border-[#243046] px-3.5 py-2 rounded-sm min-w-[64px]">
                      <div className="font-mono text-2xl font-bold text-white tabular-nums">{timeLeft.minutes}</div>
                      <div className="text-[9px] uppercase tracking-wider text-[#8e9cb2]">Mins</div>
                    </div>
                    <span className="text-[#c5a880] font-mono text-xl">:</span>
                    <div className="bg-[#0b0f17] border border-[#243046] px-3.5 py-2 rounded-sm min-w-[64px]">
                      <div className="font-mono text-2xl font-bold text-[#dfc294] tabular-nums">{timeLeft.seconds}</div>
                      <div className="text-[9px] uppercase tracking-wider text-[#8e9cb2]">Secs</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setSelectedBookingForDetail(marqueeBooking)}
                      className="px-5 py-2.5 bg-[#c5a880] hover:bg-[#dfc294] text-black text-xs uppercase tracking-wider font-semibold rounded-sm transition-all"
                    >
                      View Trip Itinerary
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2.5 border border-[#243046] hover:border-white text-white text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-[#dfc294]" />
                      <span>Download Itinerary</span>
                    </button>
                    <button
                      onClick={() => onOpenWhatsAppPreview(marqueeBooking)}
                      className="px-4 py-2.5 bg-[#1f2d24] hover:bg-[#283e30] border border-[#2e5239] text-[#7ce79c] text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>WhatsApp Concierge</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabbed "My Trips" History */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#243046] pb-3">
            <h3 className="font-editorial text-2xl sm:text-3xl text-white font-normal">
              MY TRIPS
            </h3>

            {/* Tabs (Functional button segmented control) */}
            <div className="flex items-center gap-2 p-1 bg-[#121824] rounded border border-[#243046]">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  activeTab === 'upcoming' ? 'bg-[#c5a880] text-black font-semibold' : 'text-[#8e9cb2] hover:text-white'
                }`}
              >
                Upcoming ({upcomingBookings.length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  activeTab === 'completed' ? 'bg-[#c5a880] text-black font-semibold' : 'text-[#8e9cb2] hover:text-white'
                }`}
              >
                Completed ({completedBookings.length})
              </button>
              <button
                onClick={() => setActiveTab('cancelled')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  activeTab === 'cancelled' ? 'bg-[#c5a880] text-black font-semibold' : 'text-[#8e9cb2] hover:text-white'
                }`}
              >
                Cancelled ({cancelledBookings.length})
              </button>
            </div>
          </div>

          {/* List of trips */}
          <div className="space-y-4">
            {(activeTab === 'upcoming' ? upcomingBookings : activeTab === 'completed' ? completedBookings : cancelledBookings).map((b) => (
              <div
                key={b.id}
                className="bg-[#121824] border border-[#243046] p-5 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#c5a880]/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={b.packageBannerImage}
                    alt={b.packageTitle}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-[#dfc294] font-semibold">{b.id}</span>
                      <span aria-hidden="true" className="text-white/30">·</span>
                      <span className="text-white font-medium">{b.destinationName}</span>
                    </div>
                    <h4 className="text-white font-medium text-sm mt-0.5">{b.packageTitle}</h4>
                    <div className="text-xs text-[#8e9cb2] mt-1">
                      {b.travelStartDate} to {b.travelEndDate} · {b.numberOfAdults} Adults · ₹{b.pricing.totalINR.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setSelectedBookingForDetail(b)}
                    className="px-3.5 py-1.5 text-xs text-white border border-[#243046] hover:border-white rounded-sm"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onOpenWhatsAppPreview(b)}
                    className="px-3.5 py-1.5 text-xs bg-[#1f2d24] text-[#7ce79c] rounded-sm flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}

            {(activeTab === 'upcoming' ? upcomingBookings : activeTab === 'completed' ? completedBookings : cancelledBookings).length === 0 && (
              <div className="text-center py-12 bg-[#121824] border border-[#243046] rounded-sm">
                <p className="text-sm text-[#8e9cb2]">No {activeTab} journeys in your vault.</p>
                <button
                  onClick={onExploreMore}
                  className="mt-3 text-xs uppercase tracking-widest text-[#dfc294] hover:underline"
                >
                  Explore Handcrafted Collections →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal: Full Trip Digital Voucher & Document */}
        {selectedBookingForDetail && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
            <div className="bg-[#0b0f17] border border-[#243046] rounded-sm max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
              <button
                onClick={() => setSelectedBookingForDetail(null)}
                className="absolute top-4 right-4 text-[#8e9cb2] hover:text-white"
              >
                ✕
              </button>

              <div className="border-b border-[#243046] pb-4">
                <div className="text-[10px] uppercase tracking-widest text-[#dfc294]">
                  Digital Itinerary Voucher
                </div>
                <h3 className="font-editorial text-3xl text-white">
                  {selectedBookingForDetail.packageTitle}
                </h3>
                <div className="text-xs text-[#8e9cb2] font-mono mt-1">
                  ID: {selectedBookingForDetail.id} · Issued to {selectedBookingForDetail.userName}
                </div>
              </div>

              {/* Verified Inclusions & Chauffeur Note */}
              <div className="bg-[#121824] p-4 rounded-sm border border-[#243046] text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#8e9cb2]">Travel Dates:</span>
                  <span className="text-white font-mono">{selectedBookingForDetail.travelStartDate} to {selectedBookingForDetail.travelEndDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8e9cb2]">Primary Contact:</span>
                  <span className="text-white">{selectedBookingForDetail.userName} ({selectedBookingForDetail.userPhone})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8e9cb2]">Assigned Concierge:</span>
                  <span className="text-[#dfc294]">{selectedBookingForDetail.assignedAgentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8e9cb2]">Total Package Investment:</span>
                  <span className="text-white font-mono font-semibold">₹{selectedBookingForDetail.pricing.totalINR.toLocaleString('en-IN')} (Paid)</span>
                </div>
              </div>

              {/* Digital QR verification stamp */}
              <div className="p-4 bg-[#121824] border border-[#243046] flex items-center justify-between">
                <div>
                  <div className="text-xs text-white font-medium">VIP Airport Placard & Voucher QR</div>
                  <div className="text-[11px] text-[#8e9cb2]">Show this voucher to your chauffeur at arrival</div>
                </div>
                <div className="w-14 h-14 bg-white p-1 rounded flex items-center justify-center font-mono text-[9px] text-black text-center font-bold">
                  [QR VOUCHER]
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-[#243046] hover:border-white text-white text-xs uppercase tracking-wider rounded-sm flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#dfc294]" />
                  <span>Print Voucher</span>
                </button>
                <button
                  onClick={() => setSelectedBookingForDetail(null)}
                  className="px-6 py-2 bg-[#c5a880] text-black text-xs uppercase tracking-wider font-semibold rounded-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
