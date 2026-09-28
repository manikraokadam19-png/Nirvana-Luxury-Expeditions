import React, { useState, useEffect } from 'react';
import { Shield, TrendingUp, Users, Calendar, CheckCircle2, XCircle, Search, Edit3, Save, Phone, Clock, Plus, Filter } from 'lucide-react';
import { Booking, TravelPackage, WhatsAppMessageLog } from '../types/travel';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const AdminPortal: React.FC = () => {
  const { user, isAdmin, isAgentOrAdmin, switchRoleForDemo } = useAuth();
  const [activeTab, setActiveTab] = useState<'bookings' | 'packages' | 'whatsapp' | 'customers'>('bookings');

  // Stats
  const [stats, setStats] = useState<any>({
    totalCustomers: 148,
    totalBookings: 86,
    upcomingTrips: 24,
    completedTrips: 58,
    cancelledTrips: 4,
    revenueINR: 8450000
  });

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingSearch, setBookingSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Packages state (Admin configurable prices)
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [editPriceINR, setEditPriceINR] = useState<number>(0);
  const [editDurationDays, setEditDurationDays] = useState<number>(0);

  // WhatsApp logs state
  const [whatsappLogs, setWhatsappLogs] = useState<WhatsAppMessageLog[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [s, b, p, w] = await Promise.all([
        api.getAdminStats(),
        api.getBookings(),
        api.getPackages(),
        api.getWhatsAppLogs()
      ]);
      if (s) setStats(s);
      if (b) setBookings(b);
      if (p) setPackages(p);
      if (w) setWhatsappLogs(w);
    } catch (e) {
      console.error(e);
    }
  };

  // Update Booking Status
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const updated = await api.updateBookingStatus(id, newStatus);
      setBookings(prev => prev.map(b => b.id === id ? { ...b, bookingStatus: updated.bookingStatus } : b));
      // Refresh logs
      const w = await api.getWhatsAppLogs();
      setWhatsappLogs(w);
    } catch (err) {
      alert('Failed to update booking status');
    }
  };

  // Save package price configuration
  const handleSavePackage = async (pkg: TravelPackage) => {
    try {
      const updated = await api.updatePackage(pkg.id, {
        startingPriceINR: Number(editPriceINR),
        durationDays: Number(editDurationDays)
      });
      setPackages(prev => prev.map(p => p.id === pkg.id ? updated : p));
      setEditingPackageId(null);
      alert(`Package "${pkg.title}" updated successfully! New price: ₹${Number(editPriceINR).toLocaleString('en-IN')}`);
    } catch (e) {
      alert('Failed to update package');
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (statusFilter !== 'all' && b.bookingStatus.toLowerCase() !== statusFilter.toLowerCase()) return false;
    if (bookingSearch) {
      const q = bookingSearch.toLowerCase();
      return b.id.toLowerCase().includes(q) || b.userName.toLowerCase().includes(q) || b.destinationName.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="py-24 sm:py-28 bg-[#0b0f17] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Role Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1a2334] pb-6 mb-8">
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-[#dfc294] font-semibold flex items-center gap-1.5 mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Operations Management Console</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
              {isAdmin ? 'ADMINISTRATIVE DISPATCH & REVENUE' : 'TRAVEL AGENT CONCIERGE DESK'}
            </h1>
          </div>

          {/* Quick Role Switcher for seamless test-driving */}
          <div className="flex items-center gap-2 bg-[#121824] p-1.5 rounded border border-[#243046] text-xs">
            <span className="text-[#8e9cb2] px-2">Simulate Role:</span>
            <button
              onClick={() => switchRoleForDemo('travel_agent')}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                user?.role === 'travel_agent' ? 'bg-[#c5a880] text-black font-semibold' : 'text-[#8e9cb2] hover:text-white'
              }`}
            >
              Travel Agent
            </button>
            <button
              onClick={() => switchRoleForDemo('admin')}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                user?.role === 'admin' ? 'bg-[#c5a880] text-black font-semibold' : 'text-[#8e9cb2] hover:text-white'
              }`}
            >
              Master Admin
            </button>
          </div>
        </div>

        {/* KPI Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          <div className="bg-[#121824] p-4 rounded-sm border border-[#243046]">
            <span className="text-[10px] uppercase tracking-wider text-[#8e9cb2] block">Total Bookings</span>
            <div className="font-mono text-2xl font-bold text-white mt-1">{stats.totalBookings}</div>
          </div>
          <div className="bg-[#121824] p-4 rounded-sm border border-[#243046]">
            <span className="text-[10px] uppercase tracking-wider text-[#8e9cb2] block">Gross Revenue</span>
            <div className="font-mono text-xl font-bold text-[#dfc294] mt-1">₹{Number(stats.revenueINR || 8450000).toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-[#121824] p-4 rounded-sm border border-[#243046]">
            <span className="text-[10px] uppercase tracking-wider text-[#8e9cb2] block">Upcoming Trips</span>
            <div className="font-mono text-2xl font-bold text-sky-400 mt-1">{stats.upcomingTrips}</div>
          </div>
          <div className="bg-[#121824] p-4 rounded-sm border border-[#243046]">
            <span className="text-[10px] uppercase tracking-wider text-[#8e9cb2] block">Completed Trips</span>
            <div className="font-mono text-2xl font-bold text-emerald-400 mt-1">{stats.completedTrips}</div>
          </div>
          <div className="bg-[#121824] p-4 rounded-sm border border-[#243046]">
            <span className="text-[10px] uppercase tracking-wider text-[#8e9cb2] block">Cancelled</span>
            <div className="font-mono text-2xl font-bold text-rose-400 mt-1">{stats.cancelledTrips}</div>
          </div>
          <div className="bg-[#121824] p-4 rounded-sm border border-[#243046]">
            <span className="text-[10px] uppercase tracking-wider text-[#8e9cb2] block">Registered Users</span>
            <div className="font-mono text-2xl font-bold text-white mt-1">{stats.totalCustomers}</div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 border-b border-[#243046] pb-3 mb-6">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors ${
              activeTab === 'bookings' ? 'bg-[#c5a880] text-black' : 'text-[#8e9cb2] hover:text-white'
            }`}
          >
            Bookings Manager ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors ${
              activeTab === 'packages' ? 'bg-[#c5a880] text-black' : 'text-[#8e9cb2] hover:text-white'
            }`}
          >
            Package Pricing & Itineraries
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors ${
              activeTab === 'whatsapp' ? 'bg-[#c5a880] text-black' : 'text-[#8e9cb2] hover:text-white'
            }`}
          >
            WhatsApp Automation Dispatches ({whatsappLogs.length})
          </button>
        </div>

        {/* TAB 1: BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#121824] p-3 rounded-sm border border-[#243046]">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search Booking ID, Customer, Destination..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  className="w-full bg-[#0b0f17] border border-[#243046] text-white text-xs rounded pl-8 pr-3 py-2 focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-[#8e9cb2] absolute left-2.5 top-2.5" />
              </div>

              <div className="flex items-center gap-2 text-xs text-[#8e9cb2] w-full sm:w-auto">
                <Filter className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#0b0f17] border border-[#243046] text-white text-xs rounded px-2.5 py-1.5"
                >
                  <option value="all">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="bg-[#121824] border border-[#243046] rounded-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0b0f17] border-b border-[#243046] text-[#8e9cb2] uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Booking ID</th>
                    <th className="p-3.5">Primary Traveler</th>
                    <th className="p-3.5">Destination / Package</th>
                    <th className="p-3.5">Dates</th>
                    <th className="p-3.5">Amount (₹)</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#243046] text-[#cbd5e1]">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#162030] transition-colors">
                      <td className="p-3.5 font-mono text-[#dfc294] font-semibold">{b.id}</td>
                      <td className="p-3.5">
                        <div className="font-medium text-white">{b.userName}</div>
                        <div className="text-[11px] text-[#8e9cb2]">{b.userPhone}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="text-white">{b.destinationName}</div>
                        <div className="text-[11px] text-[#8e9cb2] truncate max-w-xs">{b.packageTitle}</div>
                      </td>
                      <td className="p-3.5 font-mono text-[11px]">
                        {b.travelStartDate} → {b.travelEndDate}
                      </td>
                      <td className="p-3.5 font-mono text-white font-semibold">
                        ₹{b.pricing.totalINR.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                            b.bookingStatus === 'Confirmed'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : b.bookingStatus === 'Completed'
                              ? 'bg-sky-950 text-sky-400 border border-sky-800'
                              : b.bookingStatus === 'Cancelled'
                              ? 'bg-rose-950 text-rose-400 border border-rose-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {b.bookingStatus}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <select
                          value={b.bookingStatus}
                          onChange={(e) => handleUpdateStatus(b.id, e.target.value)}
                          className="bg-[#0b0f17] border border-[#243046] text-white text-[11px] rounded px-2 py-1"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Refund Pending">Refund Pending</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PACKAGES (Admin Pricing Configuration) */}
        {activeTab === 'packages' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#121824] rounded border border-[#243046] text-xs text-[#8e9cb2] flex items-center justify-between">
              <span>
                Package prices are fully dynamic and configurable in real-time. Changes are stored in the database.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packages.map((pkg) => {
                const isEditing = editingPackageId === pkg.id;
                return (
                  <div key={pkg.id} className="bg-[#121824] border border-[#243046] p-5 rounded-sm space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#dfc294] font-semibold">{pkg.destinationName}</span>
                        <h4 className="text-white font-editorial text-2xl">{pkg.title}</h4>
                      </div>
                      <span className="text-xs text-[#8e9cb2] font-mono">{pkg.id}</span>
                    </div>

                    {isEditing ? (
                      <div className="bg-[#0b0f17] p-3 rounded border border-[#243046] space-y-3 text-xs">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] text-[#8e9cb2] block">Starting Price (₹ INR)</label>
                            <input
                              type="number"
                              value={editPriceINR}
                              onChange={(e) => setEditPriceINR(Number(e.target.value))}
                              className="w-full bg-[#121824] border border-[#243046] text-white px-2 py-1 rounded"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-[#8e9cb2] block">Duration (Days)</label>
                            <input
                              type="number"
                              value={editDurationDays}
                              onChange={(e) => setEditDurationDays(Number(e.target.value))}
                              className="w-full bg-[#121824] border border-[#243046] text-white px-2 py-1 rounded"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            onClick={() => setEditingPackageId(null)}
                            className="px-3 py-1 text-xs text-[#8e9cb2]"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSavePackage(pkg)}
                            className="px-4 py-1 bg-[#c5a880] text-black font-semibold text-xs rounded"
                          >
                            Save Updates
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between pt-2 border-t border-[#243046]">
                        <div>
                          <div className="text-[10px] text-[#8e9cb2] uppercase">Live Starting Price</div>
                          <div className="font-mono text-xl text-white font-semibold">
                            ₹{pkg.startingPriceINR.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[11px] text-[#8e9cb2]">{pkg.durationDays} Days / {pkg.durationNights} Nights</div>
                        </div>

                        <button
                          onClick={() => {
                            setEditingPackageId(pkg.id);
                            setEditPriceINR(pkg.startingPriceINR);
                            setEditDurationDays(pkg.durationDays);
                          }}
                          className="px-3.5 py-1.5 border border-[#243046] hover:border-[#c5a880] text-white text-xs rounded flex items-center gap-1.5"
                        >
                          <Edit3 className="w-3 h-3 text-[#dfc294]" />
                          <span>Configure Price</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: WHATSAPP AUTOMATION LOGS */}
        {activeTab === 'whatsapp' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#121824] rounded border border-[#243046] flex items-center justify-between text-xs text-[#8e9cb2]">
              <span>Real-time dispatch log of all automated WhatsApp customer messages.</span>
              <span className="text-[#7ce79c] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Gateway Connected
              </span>
            </div>

            <div className="space-y-3">
              {whatsappLogs.map((log) => (
                <div key={log.id} className="bg-[#121824] border border-[#243046] p-4 rounded-sm text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-[#243046] pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#dfc294] font-semibold">{log.bookingId}</span>
                      <span aria-hidden="true" className="text-white/30">·</span>
                      <span className="text-white font-medium">{log.customerName}</span>
                      <span className="text-[#8e9cb2]">({log.phone})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#8e9cb2] font-mono">{new Date(log.timestamp).toLocaleTimeString('en-IN')}</span>
                      <span className="px-2 py-0.5 bg-[#1f2d24] text-[#7ce79c] rounded text-[10px]">
                        {log.status}
                      </span>
                    </div>
                  </div>

                  <pre className="text-[#cbd5e1] font-sans text-xs whitespace-pre-wrap leading-relaxed bg-[#0b0f17] p-3 rounded border border-[#1a2334]">
                    {log.message}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
