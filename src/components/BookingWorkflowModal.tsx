import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, MapPin, Calendar, Users, CreditCard, Sparkles, Download, Phone, Check } from 'lucide-react';
import { TravelPackage, Booking, TravelerInfo, IndianAddress } from '../types/travel';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface BookingWorkflowModalProps {
  pkg: TravelPackage | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (booking: Booking) => void;
}

export const BookingWorkflowModal: React.FC<BookingWorkflowModalProps> = ({
  pkg,
  isOpen,
  onClose,
  onBookingSuccess
}) => {
  const { user } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Form State
  const [startDate, setStartDate] = useState('2026-10-15');
  const [endDate, setEndDate] = useState('2026-10-21');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);

  // Primary Traveler Details (Indian specifics)
  const [primaryTraveler, setPrimaryTraveler] = useState<TravelerInfo>({
    isPrimary: true,
    fullName: user?.fullName || 'Aarav Mehta',
    email: user?.email || 'aarav.mehta@example.com',
    phone: user?.phone || '+91 98201 12345',
    gender: 'male',
    dob: '1990-05-14',
    address: {
      houseFlat: 'A-901, Oberoi Sky Heights',
      street: 'Lokhandwala Complex',
      area: 'Andheri West',
      landmark: 'Near Infinity Mall',
      city: 'Mumbai',
      district: 'Mumbai Suburban',
      state: 'Maharashtra',
      pinCode: '400053',
      country: 'India'
    },
    emergencyContact: {
      name: 'Rohit Mehta',
      phone: '+91 98201 99888',
      relation: 'Brother'
    }
  });

  // Additional Traveler
  const [secondTraveler, setSecondTraveler] = useState<{ fullName: string; gender: 'male' | 'female' | 'other'; age: number }>({
    fullName: 'Devika Mehta',
    gender: 'female',
    age: 32
  });

  // Add-ons
  const [addOnHelicopter, setAddOnHelicopter] = useState(false);
  const [addOnInsurance, setAddOnInsurance] = useState(true);
  const [addOnChef, setAddOnChef] = useState(false);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('aarav@okhdfcbank');

  if (!isOpen || !pkg) return null;

  // Pricing calculations
  const totalTravelers = adults + children;
  const baseSubtotal = pkg.startingPriceINR * totalTravelers;
  let addOnsTotal = 0;
  if (addOnHelicopter) addOnsTotal += 18000;
  if (addOnInsurance) addOnsTotal += 3500;
  if (addOnChef) addOnsTotal += 12000;
  const gstAmount = Math.round((baseSubtotal + addOnsTotal) * 0.05);
  const grandTotalINR = baseSubtotal + addOnsTotal + gstAmount;

  // Validation
  const validateAddress = () => {
    if (!primaryTraveler.address?.pinCode || !/^\d{6}$/.test(primaryTraveler.address.pinCode)) {
      alert('Please enter a valid 6-digit Indian PIN code.');
      return false;
    }
    if (!primaryTraveler.fullName || !primaryTraveler.phone) {
      alert('Please complete primary traveler full name and Indian mobile number.');
      return false;
    }
    return true;
  };

  const handleCompleteBooking = async () => {
    setIsProcessing(true);
    try {
      const selectedAddOns = [];
      if (addOnHelicopter) selectedAddOns.push({ id: 'addon-heli', name: 'Private Helicopter Sightseeing', priceINR: 18000, description: 'Scenic flight', selected: true });
      if (addOnInsurance) selectedAddOns.push({ id: 'addon-ins', name: 'Comprehensive Luxury Travel Protection', priceINR: 3500, description: 'Medical & baggage', selected: true });
      if (addOnChef) selectedAddOns.push({ id: 'addon-chef', name: 'Dedicated Royal Chef Experience', priceINR: 12000, description: 'Custom banquet', selected: true });

      const travelersList: TravelerInfo[] = [primaryTraveler];
      if (adults > 1) {
        travelersList.push({
          isPrimary: false,
          fullName: secondTraveler.fullName,
          gender: secondTraveler.gender,
          age: secondTraveler.age
        });
      }

      const payload = {
        userId: user?.id || 'usr-guest',
        userEmail: primaryTraveler.email,
        userName: primaryTraveler.fullName,
        userPhone: primaryTraveler.phone,
        packageId: pkg.id,
        packageTitle: pkg.title,
        destinationName: pkg.destinationName,
        packageBannerImage: pkg.bannerImage,
        travelStartDate: startDate,
        travelEndDate: endDate,
        numberOfAdults: adults,
        numberOfChildren: children,
        numberOfInfants: infants,
        travelers: travelersList,
        addOns: selectedAddOns,
        pricing: {
          basePricePerPersonINR: pkg.startingPriceINR,
          travelersSubtotalINR: baseSubtotal,
          addOnsTotalINR: addOnsTotal,
          gstINR: gstAmount,
          totalINR: grandTotalINR
        },
        paymentDetails: {
          method: paymentMethod,
          transactionId: `UPI-INR-${Math.floor(100000000000 + Math.random() * 900000000000)}`,
          paidAt: new Date().toISOString()
        }
      };

      const res = await api.createBooking(payload);
      setConfirmedBooking(res.booking);
      setStep(5);
      onBookingSuccess(res.booking);
    } catch (err: any) {
      alert(err.message || 'Payment processing error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="relative bg-[#0b0f17] border border-[#243046] rounded-sm max-w-3xl w-full my-6 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-[#121824] px-6 py-4 border-b border-[#243046] flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#dfc294] font-semibold">
              Bespoke Booking Workflow
            </div>
            <div className="text-sm sm:text-base font-editorial text-white">
              {pkg.title}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1a2334] text-white/80 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Tracker */}
        {step < 5 && (
          <div className="bg-[#0b0f17] px-6 py-3 border-b border-[#1a2334] flex items-center justify-between text-[11px] text-[#8e9cb2]">
            <span className={step === 1 ? 'text-[#dfc294] font-semibold' : step > 1 ? 'text-white' : ''}>1. Dates & Party</span>
            <span className={step === 2 ? 'text-[#dfc294] font-semibold' : step > 2 ? 'text-white' : ''}>2. Traveler Details</span>
            <span className={step === 3 ? 'text-[#dfc294] font-semibold' : step > 3 ? 'text-white' : ''}>3. Add-ons</span>
            <span className={step === 4 ? 'text-[#dfc294] font-semibold' : step > 4 ? 'text-white' : ''}>4. Payment (₹ INR)</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {/* STEP 1: Dates & Travelers */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-base font-medium text-white">Select Travel Dates & Party</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e9cb2] block mb-1.5 font-semibold">Departure Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#121824] border border-[#243046] text-white text-xs rounded-sm px-3 py-2.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e9cb2] block mb-1.5 font-semibold">Return Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-[#121824] border border-[#243046] text-white text-xs rounded-sm px-3 py-2.5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-[#121824] p-3 rounded-sm border border-[#243046]">
                  <span className="text-xs text-[#8e9cb2] block">Adults (12+ yrs)</span>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-7 h-7 bg-[#1a2334] rounded text-white flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="font-mono text-white text-sm font-semibold">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="w-7 h-7 bg-[#1a2334] rounded text-white flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="bg-[#121824] p-3 rounded-sm border border-[#243046]">
                  <span className="text-xs text-[#8e9cb2] block">Children (2–11 yrs)</span>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-7 h-7 bg-[#1a2334] rounded text-white flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="font-mono text-white text-sm font-semibold">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren(children + 1)}
                      className="w-7 h-7 bg-[#1a2334] rounded text-white flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="bg-[#121824] p-3 rounded-sm border border-[#243046]">
                  <span className="text-xs text-[#8e9cb2] block">Infants (Under 2 yrs)</span>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setInfants(Math.max(0, infants - 1))}
                      className="w-7 h-7 bg-[#1a2334] rounded text-white flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="font-mono text-white text-sm font-semibold">{infants}</span>
                    <button
                      type="button"
                      onClick={() => setInfants(infants + 1)}
                      className="w-7 h-7 bg-[#1a2334] rounded text-white flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Preview */}
              <div className="bg-[#121824] p-4 rounded-sm border border-[#243046] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#8e9cb2] block">Starting base for {totalTravelers} Traveler(s):</span>
                  <span className="font-mono text-white text-base font-semibold">
                    ₹{baseSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[11px] text-[#dfc294]">Includes 5-Star Accommodations & Private Chauffeur</span>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-[#c5a880] hover:bg-[#dfc294] text-black text-xs uppercase tracking-widest font-semibold rounded-sm transition-all flex items-center gap-2"
                >
                  <span>Continue to Traveler Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Indian Traveler Details & Address */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-base font-medium text-white">Primary Traveler & Indian Address Coordinates</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8e9cb2] block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={primaryTraveler.fullName}
                    onChange={(e) => setPrimaryTraveler({ ...primaryTraveler, fullName: e.target.value })}
                    className="w-full bg-[#121824] border border-[#243046] text-white text-xs rounded-sm px-3 py-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8e9cb2] block mb-1">Email</label>
                  <input
                    type="email"
                    value={primaryTraveler.email}
                    onChange={(e) => setPrimaryTraveler({ ...primaryTraveler, email: e.target.value })}
                    className="w-full bg-[#121824] border border-[#243046] text-white text-xs rounded-sm px-3 py-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8e9cb2] block mb-1">Indian Mobile (+91)</label>
                  <input
                    type="tel"
                    value={primaryTraveler.phone}
                    onChange={(e) => setPrimaryTraveler({ ...primaryTraveler, phone: e.target.value })}
                    className="w-full bg-[#121824] border border-[#243046] text-white text-xs rounded-sm px-3 py-2 focus:outline-none"
                  />
                </div>
              </div>

              {/* Indian Address Breakdown */}
              <div className="bg-[#121824] p-4 rounded-sm border border-[#243046] space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#dfc294] font-semibold block">
                  Indian Billing & Logistics Address
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] uppercase text-[#8e9cb2] block mb-1">House / Flat / Villa No.</label>
                    <input
                      type="text"
                      value={primaryTraveler.address?.houseFlat}
                      onChange={(e) => setPrimaryTraveler({
                        ...primaryTraveler,
                        address: { ...primaryTraveler.address!, houseFlat: e.target.value }
                      })}
                      className="w-full bg-[#0b0f17] border border-[#243046] text-white text-xs rounded px-2.5 py-1.5 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[#8e9cb2] block mb-1">Street / Colony</label>
                    <input
                      type="text"
                      value={primaryTraveler.address?.street}
                      onChange={(e) => setPrimaryTraveler({
                        ...primaryTraveler,
                        address: { ...primaryTraveler.address!, street: e.target.value }
                      })}
                      className="w-full bg-[#0b0f17] border border-[#243046] text-white text-xs rounded px-2.5 py-1.5 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[#8e9cb2] block mb-1">City</label>
                    <input
                      type="text"
                      value={primaryTraveler.address?.city}
                      onChange={(e) => setPrimaryTraveler({
                        ...primaryTraveler,
                        address: { ...primaryTraveler.address!, city: e.target.value }
                      })}
                      className="w-full bg-[#0b0f17] border border-[#243046] text-white text-xs rounded px-2.5 py-1.5 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[#8e9cb2] block mb-1">State</label>
                    <input
                      type="text"
                      value={primaryTraveler.address?.state}
                      onChange={(e) => setPrimaryTraveler({
                        ...primaryTraveler,
                        address: { ...primaryTraveler.address!, state: e.target.value }
                      })}
                      className="w-full bg-[#0b0f17] border border-[#243046] text-white text-xs rounded px-2.5 py-1.5 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[#8e9cb2] block mb-1">6-Digit PIN Code</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={primaryTraveler.address?.pinCode}
                      onChange={(e) => setPrimaryTraveler({
                        ...primaryTraveler,
                        address: { ...primaryTraveler.address!, pinCode: e.target.value.replace(/[^0-9]/g, '') }
                      })}
                      className="w-full bg-[#0b0f17] border border-[#243046] text-white text-xs rounded px-2.5 py-1.5 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[#8e9cb2] block mb-1">Country</label>
                    <input
                      type="text"
                      disabled
                      value="India"
                      className="w-full bg-[#0b0f17] border border-[#243046] text-[#8e9cb2] text-xs rounded px-2.5 py-1.5 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Second Traveler if party > 1 */}
              {adults > 1 && (
                <div className="bg-[#121824] p-4 rounded-sm border border-[#243046] space-y-3">
                  <span className="text-xs uppercase tracking-wider text-[#dfc294] font-semibold block">
                    Traveler 2 Details
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-[10px] uppercase text-[#8e9cb2] block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={secondTraveler.fullName}
                        onChange={(e) => setSecondTraveler({ ...secondTraveler, fullName: e.target.value })}
                        className="w-full bg-[#0b0f17] border border-[#243046] text-white text-xs rounded px-2.5 py-1.5 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-[#8e9cb2] block mb-1">Age</label>
                      <input
                        type="number"
                        value={secondTraveler.age}
                        onChange={(e) => setSecondTraveler({ ...secondTraveler, age: Number(e.target.value) })}
                        className="w-full bg-[#0b0f17] border border-[#243046] text-white text-xs rounded px-2.5 py-1.5 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-[#8e9cb2] block mb-1">Gender</label>
                      <select
                        value={secondTraveler.gender}
                        onChange={(e) => setSecondTraveler({ ...secondTraveler, gender: e.target.value as any })}
                        className="w-full bg-[#0b0f17] border border-[#243046] text-white text-xs rounded px-2.5 py-1.5 focus:outline-none"
                      >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs text-[#8e9cb2] hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validateAddress()) setStep(3);
                  }}
                  className="px-6 py-2.5 bg-[#c5a880] hover:bg-[#dfc294] text-black text-xs uppercase tracking-widest font-semibold rounded-sm transition-all flex items-center gap-2"
                >
                  <span>Continue to Add-ons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Luxury Add-ons */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-base font-medium text-white">Elevate Your Expedition with Private Add-ons</h3>

              <div className="space-y-3">
                <div
                  onClick={() => setAddOnHelicopter(!addOnHelicopter)}
                  className={`p-4 rounded-sm border cursor-pointer flex items-center justify-between transition-colors ${
                    addOnHelicopter ? 'bg-[#c5a880]/15 border-[#c5a880]' : 'bg-[#121824] border-[#243046] hover:bg-[#162030]'
                  }`}
                >
                  <div>
                    <div className="text-sm font-medium text-white flex items-center gap-2">
                      <span>Private Helicopter Sightseeing Flight</span>
                      {addOnHelicopter && <Check className="w-4 h-4 text-[#c5a880]" />}
                    </div>
                    <div className="text-xs text-[#8e9cb2]">Panoramic 30-minute aerial overflight with VIP helipad transfers</div>
                  </div>
                  <div className="font-mono text-white text-sm font-semibold">+₹18,000</div>
                </div>

                <div
                  onClick={() => setAddOnInsurance(!addOnInsurance)}
                  className={`p-4 rounded-sm border cursor-pointer flex items-center justify-between transition-colors ${
                    addOnInsurance ? 'bg-[#c5a880]/15 border-[#c5a880]' : 'bg-[#121824] border-[#243046] hover:bg-[#162030]'
                  }`}
                >
                  <div>
                    <div className="text-sm font-medium text-white flex items-center gap-2">
                      <span>Comprehensive Luxury Travel Protection</span>
                      {addOnInsurance && <Check className="w-4 h-4 text-[#c5a880]" />}
                    </div>
                    <div className="text-xs text-[#8e9cb2]">Full medical evacuation, flight delay compensation, and baggage guarantee</div>
                  </div>
                  <div className="font-mono text-white text-sm font-semibold">+₹3,500</div>
                </div>

                <div
                  onClick={() => setAddOnChef(!addOnChef)}
                  className={`p-4 rounded-sm border cursor-pointer flex items-center justify-between transition-colors ${
                    addOnChef ? 'bg-[#c5a880]/15 border-[#c5a880]' : 'bg-[#121824] border-[#243046] hover:bg-[#162030]'
                  }`}
                >
                  <div>
                    <div className="text-sm font-medium text-white flex items-center gap-2">
                      <span>Dedicated Royal Chef 5-Course Banquet</span>
                      {addOnChef && <Check className="w-4 h-4 text-[#c5a880]" />}
                    </div>
                    <div className="text-xs text-[#8e9cb2]">Personalized heritage tasting menu prepared live with sommelier wine pairing</div>
                  </div>
                  <div className="font-mono text-white text-sm font-semibold">+₹12,000</div>
                </div>
              </div>

              {/* Total Calculation Strip */}
              <div className="bg-[#121824] p-4 rounded-sm border border-[#243046] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#8e9cb2]">
                  <span>Travelers Base ({totalTravelers} Pax):</span>
                  <span className="font-mono">₹{baseSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#8e9cb2]">
                  <span>Selected Add-ons:</span>
                  <span className="font-mono">₹{addOnsTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#8e9cb2]">
                  <span>Applicable GST (5%):</span>
                  <span className="font-mono">₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-white font-semibold pt-2 border-t border-[#243046]">
                  <span className="text-sm">Total Investment:</span>
                  <span className="font-mono text-base text-[#dfc294]">₹{grandTotalINR.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs text-[#8e9cb2] hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 bg-[#c5a880] hover:bg-[#dfc294] text-black text-xs uppercase tracking-widest font-semibold rounded-sm transition-all flex items-center gap-2"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Indian Payment Simulation */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-base font-medium text-white">Payment Gateway (Secured 256-Bit SSL)</h3>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'upi', label: 'UPI / GPay / PhonePe' },
                  { id: 'card', label: 'Credit / Debit / RuPay' },
                  { id: 'netbanking', label: 'Net Banking' }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`py-3 px-2 text-xs text-center rounded-sm border transition-all ${
                      paymentMethod === m.id
                        ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#dfc294] font-semibold'
                        : 'border-[#243046] text-[#8e9cb2] hover:bg-[#121824]'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {paymentMethod === 'upi' && (
                <div className="bg-[#121824] p-4 rounded-sm border border-[#243046] space-y-3">
                  <label className="text-[11px] uppercase tracking-wider text-[#8e9cb2] block">Enter Virtual Payment Address (VPA / UPI ID)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@okhdfcbank"
                    className="w-full bg-[#0b0f17] border border-[#243046] text-white text-xs rounded px-3 py-2.5 focus:outline-none font-mono"
                  />
                  <p className="text-[11px] text-[#8e9cb2]">A payment prompt for ₹{grandTotalINR.toLocaleString('en-IN')} will be verified securely by your bank.</p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="bg-[#121824] p-4 rounded-sm border border-[#243046] space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] uppercase text-[#8e9cb2] block mb-1">Card Number</label>
                    <input
                      type="text"
                      defaultValue="4532 •••• •••• 9912"
                      className="w-full bg-[#0b0f17] border border-[#243046] text-white text-xs rounded px-2.5 py-2 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase text-[#8e9cb2] block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full bg-[#0b0f17] border border-[#243046] text-white text-xs rounded px-2.5 py-2 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-[#8e9cb2] block mb-1">CVV</label>
                      <input
                        type="password"
                        defaultValue="842"
                        className="w-full bg-[#0b0f17] border border-[#243046] text-white text-xs rounded px-2.5 py-2 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="bg-[#121824] p-4 rounded-sm border border-[#243046] space-y-2 text-xs">
                  <label className="text-[10px] uppercase text-[#8e9cb2] block">Select Banking Institution</label>
                  <select className="w-full bg-[#0b0f17] border border-[#243046] text-white text-xs rounded px-3 py-2">
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India (SBI)</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {/* Security Seal */}
              <div className="flex items-center gap-2 text-xs text-[#8e9cb2] pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Authorized Indian Tour Operator License • Instant WhatsApp voucher dispatch</span>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 text-xs text-[#8e9cb2] hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleCompleteBooking}
                  className="px-8 py-3 bg-[#c5a880] hover:bg-[#dfc294] text-black text-xs uppercase tracking-widest font-semibold rounded-sm transition-all shadow-xl flex items-center gap-2"
                >
                  <span>{isProcessing ? 'Verifying with Bank...' : `Pay ₹${grandTotalINR.toLocaleString('en-IN')}`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Booking Confirmation & Digital Voucher */}
          {step === 5 && confirmedBooking && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#c5a880]/20 text-[#dfc294] flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
                  Your Journey is Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-[#8e9cb2] mt-1">
                  Booking Reference: <span className="font-mono text-white font-semibold">{confirmedBooking.id}</span>
                </p>
              </div>

              {/* Digital Travel Voucher Preview Card */}
              <div className="bg-[#121824] border border-[#243046] rounded-sm p-5 text-left max-w-lg mx-auto text-xs space-y-2.5">
                <div className="flex justify-between border-b border-[#243046] pb-2">
                  <span className="text-[#8e9cb2]">Package:</span>
                  <span className="text-white font-medium">{confirmedBooking.packageTitle}</span>
                </div>
                <div className="flex justify-between border-b border-[#243046] pb-2">
                  <span className="text-[#8e9cb2]">Travel Dates:</span>
                  <span className="font-mono text-white">{confirmedBooking.travelStartDate} to {confirmedBooking.travelEndDate}</span>
                </div>
                <div className="flex justify-between border-b border-[#243046] pb-2">
                  <span className="text-[#8e9cb2]">Travelers:</span>
                  <span className="text-white font-medium">{confirmedBooking.numberOfAdults} Adults{confirmedBooking.numberOfChildren ? `, ${confirmedBooking.numberOfChildren} Children` : ''}</span>
                </div>
                <div className="flex justify-between border-b border-[#243046] pb-2">
                  <span className="text-[#8e9cb2]">Total Paid:</span>
                  <span className="font-mono text-[#dfc294] font-semibold">₹{confirmedBooking.pricing.totalINR.toLocaleString('en-IN')} (Paid via UPI)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-[11px] pt-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp confirmation dispatched to {confirmedBooking.userPhone}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 border border-[#243046] hover:border-[#c5a880] text-white text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#dfc294]" />
                  <span>Download Voucher PDF</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#c5a880] hover:bg-[#dfc294] text-black text-xs uppercase tracking-wider font-semibold rounded-sm transition-all"
                >
                  View in My Trips Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
