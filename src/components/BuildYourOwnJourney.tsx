import React, { useState } from 'react';
import { Compass, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import { CustomJourneyRequest } from '../types/travel';

interface BuildYourOwnJourneyProps {
  onClose?: () => void;
  initialDestination?: string;
}

export const BuildYourOwnJourney: React.FC<BuildYourOwnJourneyProps> = ({
  onClose,
  initialDestination = 'Kashmir'
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ referenceId: string; estimatedQuoteINR: number } | null>(null);

  const [form, setForm] = useState<CustomJourneyRequest>({
    destination: initialDestination,
    travelDates: { start: '2026-10-20', end: '2026-10-27' },
    adults: 2,
    children: 0,
    budgetPerPersonINR: 65000,
    travelStyle: 'Luxury',
    hotelCategory: '5-Star Luxury Heritage',
    preferredActivities: ['Private Boat Charter', 'Palace Dining', 'Helicopter Sightseeing'],
    contactName: 'Aarav Mehta',
    contactEmail: 'aarav.mehta@example.com',
    contactPhone: '+91 98201 12345'
  });

  const toggleActivity = (act: string) => {
    if (form.preferredActivities.includes(act)) {
      setForm({ ...form, preferredActivities: form.preferredActivities.filter(a => a !== act) });
    } else {
      setForm({ ...form, preferredActivities: [...form.preferredActivities, act] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await api.submitCustomJourney(form);
      setSubmittedData({
        referenceId: res.referenceId,
        estimatedQuoteINR: res.estimatedQuoteINR
      });
      setStep(5);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="custom-journey" className="py-20 sm:py-28 bg-[#0b0f17] border-t border-[#1a2334]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#dfc294] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke Travel Atelier</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl text-white font-normal leading-tight">
            BUILD YOUR <span className="italic font-light text-[#f4ede4]">OWN JOURNEY</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8e9cb2] font-light max-w-xl mx-auto">
            Design an itinerary precisely around your schedule, tastes, and desired level of privacy.
          </p>
        </div>

        {/* Step Indicator (Clean numbers, zero-pill discipline) */}
        {step < 5 && (
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#243046] text-xs">
            {['1. Realm & Dates', '2. Party & Budget', '3. Style & Stay', '4. Concierge Details'].map((label, idx) => (
              <div
                key={label}
                className={`flex items-center gap-2 ${
                  step === idx + 1 ? 'text-[#dfc294] font-semibold' : step > idx + 1 ? 'text-white' : 'text-[#8e9cb2]'
                }`}
              >
                <span>{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Form Container */}
        <div className="bg-[#121824] border border-[#243046] rounded-sm p-6 sm:p-10 shadow-2xl">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-base font-medium text-white">Select Your Destination & Travel Window</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e9cb2] block mb-2 font-medium">Destination Realm</label>
                  <select
                    value={form.destination}
                    onChange={(e) => setForm({ ...form, destination: e.target.value })}
                    className="w-full bg-[#0b0f17] border border-[#243046] text-white text-sm rounded-sm px-4 py-3 focus:outline-none focus:border-[#c5a880]"
                  >
                    <option value="Kashmir">Kashmir (Valleys & Dal Lake)</option>
                    <option value="Rajasthan">Rajasthan (Udaipur & Jodhpur Palaces)</option>
                    <option value="Kerala">Kerala (Backwaters & Munnar Hills)</option>
                    <option value="Ladakh">Ladakh (High Passes & Nubra Dunes)</option>
                    <option value="Goa">Goa (Private Coastal Villas)</option>
                    <option value="Andaman">Andaman Islands (Havelock Coral)</option>
                    <option value="Maldives">Maldives (Overwater Villa)</option>
                    <option value="Switzerland">Switzerland (Glacier Express & Matterhorn)</option>
                    <option value="Bali">Bali (Ayung River Villas)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e9cb2] block mb-2 font-medium">Departure Date</label>
                  <input
                    type="date"
                    value={form.travelDates.start}
                    onChange={(e) => setForm({ ...form, travelDates: { ...form.travelDates, start: e.target.value } })}
                    className="w-full bg-[#0b0f17] border border-[#243046] text-white text-sm rounded-sm px-4 py-3 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#8e9cb2] block mb-2 font-medium">Return Date</label>
                <input
                  type="date"
                  value={form.travelDates.end}
                  onChange={(e) => setForm({ ...form, travelDates: { ...form.travelDates, end: e.target.value } })}
                  className="w-full bg-[#0b0f17] border border-[#243046] text-white text-sm rounded-sm px-4 py-3 focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-[#c5a880] hover:bg-[#dfc294] text-black text-xs uppercase tracking-widest font-semibold rounded-sm transition-all flex items-center gap-2"
                >
                  <span>Continue to Party & Budget</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-base font-medium text-white">Travelers & Estimated Budget</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e9cb2] block mb-2 font-medium">Adults (12+ yrs)</label>
                  <input
                    type="number"
                    min={1}
                    max={16}
                    value={form.adults}
                    onChange={(e) => setForm({ ...form, adults: Number(e.target.value) })}
                    className="w-full bg-[#0b0f17] border border-[#243046] text-white text-sm rounded-sm px-4 py-3 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e9cb2] block mb-2 font-medium">Children (Under 12)</label>
                  <input
                    type="number"
                    min={0}
                    max={8}
                    value={form.children}
                    onChange={(e) => setForm({ ...form, children: Number(e.target.value) })}
                    className="w-full bg-[#0b0f17] border border-[#243046] text-white text-sm rounded-sm px-4 py-3 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider text-[#8e9cb2] font-medium">Budget Target Per Person (₹ INR)</label>
                  <span className="font-mono tabular-nums text-white text-sm font-semibold">
                    ₹{form.budgetPerPersonINR.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min={25000}
                  max={250000}
                  step={5000}
                  value={form.budgetPerPersonINR}
                  onChange={(e) => setForm({ ...form, budgetPerPersonINR: Number(e.target.value) })}
                  className="w-full accent-[#c5a880] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#8e9cb2] mt-1 font-mono">
                  <span>₹25,000</span>
                  <span>₹1,00,000</span>
                  <span>₹2,50,000+</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs text-[#8e9cb2] hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-[#c5a880] hover:bg-[#dfc294] text-black text-xs uppercase tracking-widest font-semibold rounded-sm transition-all flex items-center gap-2"
                >
                  <span>Continue to Style & Stay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-base font-medium text-white">Travel Style & Hospitality Tier</h3>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#8e9cb2] block mb-2 font-medium">Travel Style</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Luxury', 'Adventure', 'Romantic', 'Family', 'Wellness', 'Corporate Retreat'].map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setForm({ ...form, travelStyle: style })}
                      className={`p-3 text-xs text-center rounded-sm border transition-all ${
                        form.travelStyle === style
                          ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#dfc294] font-semibold'
                          : 'border-[#243046] text-[#cbd5e1] hover:bg-[#162030]'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#8e9cb2] block mb-2 font-medium">Hotel Category</label>
                <select
                  value={form.hotelCategory}
                  onChange={(e) => setForm({ ...form, hotelCategory: e.target.value })}
                  className="w-full bg-[#0b0f17] border border-[#243046] text-white text-sm rounded-sm px-4 py-3 focus:outline-none"
                >
                  <option value="5-Star Luxury Heritage">5-Star Luxury Heritage (Palace / Grand Hotel)</option>
                  <option value="Private Pool Villa / Houseboat">Private Pool Villa / Teakwood Houseboat</option>
                  <option value="Boutique Luxury Eco-Resort">Boutique Luxury Eco-Resort</option>
                  <option value="Ultra-Luxury Glamping Sanctuary">Ultra-Luxury Glamping Sanctuary</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#8e9cb2] block mb-2 font-medium">Selected Signature Activities</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Private Boat Charter',
                    'Palace Dining with Royal Chef',
                    'Helicopter Sightseeing Flight',
                    'Ayurvedic Spa Consultation',
                    'Astronomer Stargazing Session',
                    'Local Master Artisan Atelier Visit'
                  ].map((act) => {
                    const isSelected = form.preferredActivities.includes(act);
                    return (
                      <button
                        key={act}
                        type="button"
                        onClick={() => toggleActivity(act)}
                        className={`p-2.5 text-xs text-left rounded-sm border flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#dfc294]'
                            : 'border-[#243046] text-[#8e9cb2] hover:bg-[#162030]'
                        }`}
                      >
                        <span>{act}</span>
                        {isSelected && <span className="text-[#c5a880]">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-xs text-[#8e9cb2] hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-3 bg-[#c5a880] hover:bg-[#dfc294] text-black text-xs uppercase tracking-widest font-semibold rounded-sm transition-all flex items-center gap-2"
                >
                  <span>Review & Contact Coordinates</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-base font-medium text-white">Your Contact Coordinates for Bespoke Design</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e9cb2] block mb-2 font-medium">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    className="w-full bg-[#0b0f17] border border-[#243046] text-white text-sm rounded-sm px-4 py-3 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e9cb2] block mb-2 font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.contactEmail}
                    onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                    className="w-full bg-[#0b0f17] border border-[#243046] text-white text-sm rounded-sm px-4 py-3 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e9cb2] block mb-2 font-medium">Indian Mobile (+91)</label>
                  <input
                    type="tel"
                    required
                    value={form.contactPhone}
                    onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                    className="w-full bg-[#0b0f17] border border-[#243046] text-white text-sm rounded-sm px-4 py-3 focus:outline-none"
                  />
                </div>
              </div>

              {/* Instant Quote Preview */}
              <div className="bg-[#0b0f17] p-4 rounded-sm border border-[#243046] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[#8e9cb2]">Estimated Baseline (2 Travelers + 5% GST):</span>
                  <div className="font-editorial text-2xl text-white font-mono tabular-nums">
                    ₹{(form.budgetPerPersonINR * (form.adults + form.children) * 1.05).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-[11px] text-[#8e9cb2] max-w-xs">
                  Includes private chauffeur, curated accommodations, experiences and concierge service.
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2.5 text-xs text-[#8e9cb2] hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-[#c5a880] hover:bg-[#dfc294] text-black text-xs uppercase tracking-widest font-semibold rounded-sm transition-all shadow-xl flex items-center gap-2"
                >
                  <span>{isSubmitting ? 'Designing Your Journey...' : 'Create My Journey'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 5 && submittedData && (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#c5a880]/20 text-[#dfc294] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
                Your Bespoke Journey is in Motion
              </h3>

              <div className="max-w-md mx-auto bg-[#0b0f17] p-5 rounded-sm border border-[#243046] text-xs text-left space-y-2">
                <div className="flex justify-between border-b border-[#243046] pb-2">
                  <span className="text-[#8e9cb2]">Reference ID:</span>
                  <span className="font-mono text-white font-semibold">{submittedData.referenceId}</span>
                </div>
                <div className="flex justify-between border-b border-[#243046] pb-2">
                  <span className="text-[#8e9cb2]">Destination:</span>
                  <span className="text-white font-medium">{form.destination}</span>
                </div>
                <div className="flex justify-between border-b border-[#243046] pb-2">
                  <span className="text-[#8e9cb2]">Estimated Investment:</span>
                  <span className="font-mono text-[#dfc294] font-semibold">
                    ₹{submittedData.estimatedQuoteINR.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8e9cb2]">WhatsApp Confirmation:</span>
                  <span className="text-emerald-400 font-medium">Dispatched to {form.contactPhone}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#cbd5e1] max-w-lg mx-auto font-light leading-relaxed">
                Our Senior Travel Concierge will prepare your day-by-day customized itinerary proposal and connect directly on WhatsApp within 4 business hours.
              </p>

              <div>
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2.5 border border-[#243046] hover:border-[#c5a880] text-xs uppercase tracking-wider text-white rounded-sm transition-colors"
                >
                  Plan Another Journey
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
