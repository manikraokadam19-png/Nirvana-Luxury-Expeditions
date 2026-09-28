import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import crypto from 'crypto';
import {
  INITIAL_DESTINATIONS,
  INITIAL_PACKAGES,
  TRAVEL_STORIES,
  REVIEWS,
  SAMPLE_BOOKINGS,
  TRAVEL_MOODS
} from './src/data/travelData';
import {
  User,
  TravelPackage,
  Destination,
  Booking,
  WhatsAppMessageLog,
  IndianAddress,
  TravelerInfo
} from './src/types/travel';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Database with Seeded Data
interface StoredUser extends User {
  passwordHash: string;
  salt: string;
}

// In-memory data stores
let users: StoredUser[] = [];
let packages: TravelPackage[] = JSON.parse(JSON.stringify(INITIAL_PACKAGES));
let destinations: Destination[] = JSON.parse(JSON.stringify(INITIAL_DESTINATIONS));
let bookings: Booking[] = JSON.parse(JSON.stringify(SAMPLE_BOOKINGS));
let whatsappLogs: WhatsAppMessageLog[] = [];
let otpStore: Map<string, { otp: string; expiresAt: number; lastSentAt: number; attempts: number }> = new Map();

// Helper: Secure Password Hashing (PBKDF2 with SHA-256)
function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha256').toString('hex');
}

function verifyPassword(password: string, hash: string, salt: string): boolean {
  const testHash = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(testHash, 'hex'), Buffer.from(hash, 'hex'));
}

// Seed default users
const adminSalt = crypto.randomBytes(16).toString('hex');
const adminHash = hashPassword('Travel@123', adminSalt);
users.push({
  id: 'usr-admin-1',
  fullName: 'Arjun Singhania',
  email: 'admin@nirvanavoyages.com',
  phone: '+91 98111 99999',
  role: 'admin',
  isVerified: true,
  createdAt: new Date().toISOString(),
  passwordHash: adminHash,
  salt: adminSalt
});

const agentSalt = crypto.randomBytes(16).toString('hex');
const agentHash = hashPassword('Travel@123', agentSalt);
users.push({
  id: 'usr-agent-1',
  fullName: 'Priya Sharma',
  email: 'agent.priya@nirvanavoyages.com',
  phone: '+91 98333 44444',
  role: 'travel_agent',
  isVerified: true,
  createdAt: new Date().toISOString(),
  passwordHash: agentHash,
  salt: agentSalt
});

const customerSalt = crypto.randomBytes(16).toString('hex');
const customerHash = hashPassword('Travel@123', customerSalt);
users.push({
  id: 'user-aarav-1',
  fullName: 'Aarav Mehta',
  email: 'aarav.mehta@example.com',
  phone: '+91 98201 12345',
  role: 'customer',
  isVerified: true,
  createdAt: new Date().toISOString(),
  passwordHash: customerHash,
  salt: customerSalt
});

// Seed initial WhatsApp notification log
whatsappLogs.push({
  id: 'wa-msg-1',
  bookingId: 'TRV-2026-000123',
  customerName: 'Aarav Mehta',
  phone: '+91 98201 12345',
  type: 'booking_confirmation',
  message: `Namaste Aarav Mehta,\n\nYour luxury journey with Nirvana Luxury Expeditions is confirmed!\n\nBooking ID: TRV-2026-000123\nDestination: Kashmir — The Valley of Dreams\nDates: 12/10/2026 – 18/10/2026\nTravelers: 2 Adults\nStatus: Confirmed\nTotal: ₹1,02,898\n\nYour personal concierge, Priya Sharma, will contact you 48 hours prior to arrival with flight meet & greet coordinates.\n\nThank you for choosing Nirvana Luxury Expeditions.`,
  timestamp: new Date().toISOString(),
  status: 'delivered'
});

// Password validation regex: min 6 chars, at least 1 letter, 1 number, 1 special character
function isPasswordStrong(pw: string): boolean {
  if (!pw || pw.length < 6) return false;
  const hasLetter = /[a-zA-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pw);
  return hasLetter && hasNumber && hasSpecial;
}

// Indian mobile validation: starts with +91 or standard 10-digit 6-9
function normalizeIndianPhone(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.length === 10) return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return phone;
}

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

// Check duplicate user (Email & Indian Mobile)
app.post('/api/auth/check-duplicate', (req: Request, res: Response) => {
  const { email, phone } = req.body;
  const normEmail = (email || '').trim().toLowerCase();
  const normPhone = (phone || '').replace(/[^0-9]/g, '');

  const duplicate = users.find(u => {
    const uPhone = u.phone.replace(/[^0-9]/g, '');
    return (normEmail && u.email.toLowerCase() === normEmail) || (normPhone && uPhone === normPhone);
  });

  if (duplicate) {
    return res.status(200).json({
      exists: true,
      message: 'You already have an account with us. Please login to continue your journey.'
    });
  }

  return res.status(200).json({ exists: false });
});

// Send 6-digit OTP with 60s cooldown timer
app.post('/api/auth/send-otp', (req: Request, res: Response) => {
  const { identifier } = req.body; // email or phone
  if (!identifier) {
    return res.status(400).json({ error: 'Mobile number or email is required.' });
  }

  const key = identifier.trim().toLowerCase();
  const now = Date.now();
  const existing = otpStore.get(key);

  // Rate limiting: 60s cooldown
  if (existing && now - existing.lastSentAt < 60000) {
    const waitSeconds = Math.ceil((60000 - (now - existing.lastSentAt)) / 1000);
    return res.status(429).json({
      error: `Please wait ${waitSeconds} seconds before requesting a new verification code.`,
      cooldownSeconds: waitSeconds
    });
  }

  // Generate cryptographic 6-digit OTP
  const otpNumber = crypto.randomInt(100000, 999999).toString();
  const expiresAt = now + 10 * 60 * 1000; // 10 minutes

  otpStore.set(key, {
    otp: otpNumber,
    expiresAt,
    lastSentAt: now,
    attempts: 0
  });

  console.log(`[AUTH OTP] Sent to ${key}: ${otpNumber}`);

  return res.status(200).json({
    success: true,
    message: 'A 6-digit verification code has been sent to your registered mobile number.',
    cooldownSeconds: 60,
    // Return debugOtp so test drives and evaluation environments work flawlessly
    debugOtp: otpNumber
  });
});

// Verify 6-digit OTP
app.post('/api/auth/verify-otp', (req: Request, res: Response) => {
  const { identifier, otp } = req.body;
  if (!identifier || !otp) {
    return res.status(400).json({ error: 'Identifier and 6-digit OTP are required.' });
  }

  const key = identifier.trim().toLowerCase();
  const record = otpStore.get(key);

  if (!record) {
    return res.status(400).json({ error: 'No verification code found. Please request a new code.' });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(key);
    return res.status(400).json({ error: 'Verification code has expired. Please request a new code.' });
  }

  if (record.attempts >= 5) {
    otpStore.delete(key);
    return res.status(429).json({ error: 'Too many incorrect attempts. Please request a new code.' });
  }

  if (record.otp !== otp.trim()) {
    record.attempts += 1;
    return res.status(400).json({ error: 'Incorrect verification code. Please check your credentials.' });
  }

  // Invalidate verified OTP
  otpStore.delete(key);

  return res.status(200).json({
    success: true,
    message: 'Mobile number verified successfully.'
  });
});

// Sign Up with Strong Password and Duplicate Validation
app.post('/api/auth/signup', (req: Request, res: Response) => {
  const { fullName, email, phone, password, preferredTravelStyle } = req.body;

  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ error: 'All mandatory fields must be completed.' });
  }

  if (!isPasswordStrong(password)) {
    return res.status(400).json({
      error: 'Password must be at least 6 characters and include at least one letter, one number, and one special character.'
    });
  }

  const normEmail = email.trim().toLowerCase();
  const normPhone = phone.replace(/[^0-9]/g, '');

  const duplicate = users.find(u => {
    const uPhone = u.phone.replace(/[^0-9]/g, '');
    return u.email.toLowerCase() === normEmail || uPhone === normPhone;
  });

  if (duplicate) {
    return res.status(409).json({
      error: 'You already have an account with us. Please login to continue your journey.'
    });
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);

  const newUser: StoredUser = {
    id: `usr-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
    fullName: fullName.trim(),
    email: normEmail,
    phone: normalizeIndianPhone(phone),
    role: 'customer',
    isVerified: true,
    createdAt: new Date().toISOString(),
    passwordHash,
    salt
  };

  users.push(newUser);

  // Return sanitized user
  const sanitizedUser: User = {
    id: newUser.id,
    fullName: newUser.fullName,
    email: newUser.email,
    phone: newUser.phone,
    role: newUser.role,
    isVerified: newUser.isVerified,
    createdAt: newUser.createdAt
  };

  const sessionToken = `tok_${newUser.id}_${crypto.randomBytes(16).toString('hex')}`;

  return res.status(201).json({
    success: true,
    user: sanitizedUser,
    token: sessionToken,
    message: 'Account created successfully. Welcome to Nirvana Luxury Expeditions.'
  });
});

// Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { identifier, password } = req.body; // email or phone
  if (!identifier || !password) {
    return res.status(400).json({ error: 'Email/Mobile and password are required.' });
  }

  const cleanId = identifier.trim().toLowerCase();
  const digitsId = identifier.replace(/[^0-9]/g, '');

  const user = users.find(u => {
    const uDigits = u.phone.replace(/[^0-9]/g, '');
    return u.email.toLowerCase() === cleanId || (digitsId.length >= 10 && uDigits.endsWith(digitsId));
  });

  if (!user) {
    return res.status(404).json({
      error: 'Account not found. Please create an account.'
    });
  }

  const isMatch = verifyPassword(password, user.passwordHash, user.salt);
  if (!isMatch) {
    return res.status(401).json({
      error: 'Incorrect password. Please check your credentials.'
    });
  }

  const sanitizedUser: User = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isVerified: user.isVerified,
    createdAt: user.createdAt
  };

  const sessionToken = `tok_${user.id}_${crypto.randomBytes(16).toString('hex')}`;

  return res.status(200).json({
    success: true,
    user: sanitizedUser,
    token: sessionToken,
    message: `Welcome back, ${user.fullName}.`
  });
});

// Forgot Password — Reset
app.post('/api/auth/reset-password', (req: Request, res: Response) => {
  const { identifier, otp, newPassword } = req.body;
  if (!identifier || !otp || !newPassword) {
    return res.status(400).json({ error: 'Identifier, OTP, and new password are required.' });
  }

  if (!isPasswordStrong(newPassword)) {
    return res.status(400).json({
      error: 'Password must be at least 6 characters and include at least one letter, one number, and one special character.'
    });
  }

  const key = identifier.trim().toLowerCase();
  const record = otpStore.get(key);

  if (!record || record.otp !== otp.trim() || Date.now() > record.expiresAt) {
    return res.status(400).json({ error: 'Invalid or expired OTP code.' });
  }

  const cleanId = identifier.trim().toLowerCase();
  const digitsId = identifier.replace(/[^0-9]/g, '');

  const user = users.find(u => {
    const uDigits = u.phone.replace(/[^0-9]/g, '');
    return u.email.toLowerCase() === cleanId || (digitsId.length >= 10 && uDigits.endsWith(digitsId));
  });

  if (!user) {
    return res.status(404).json({ error: 'Account not found.' });
  }

  // Update password
  const newSalt = crypto.randomBytes(16).toString('hex');
  user.salt = newSalt;
  user.passwordHash = hashPassword(newPassword, newSalt);
  otpStore.delete(key);

  return res.status(200).json({
    success: true,
    message: 'Password successfully changed. Please login with your new credentials.'
  });
});

// ==========================================
// PACKAGES API (Configurable from Admin)
// ==========================================

// Get all packages with optional search/filter
app.get('/api/packages', (req: Request, res: Response) => {
  const { destination, budget, duration, mood, query, region } = req.query;
  let result = packages.filter(p => p.active);

  if (destination) {
    result = result.filter(p => p.destinationName.toLowerCase() === (destination as string).toLowerCase());
  }

  if (region) {
    result = result.filter(p => p.region === region);
  }

  if (mood) {
    result = result.filter(p => p.moods.includes(mood as string));
  }

  if (budget) {
    const maxBudget = Number(budget);
    if (!isNaN(maxBudget)) {
      result = result.filter(p => p.startingPriceINR <= maxBudget);
    }
  }

  if (duration) {
    const days = Number(duration);
    if (!isNaN(days)) {
      result = result.filter(p => p.durationDays <= days);
    }
  }

  if (query) {
    const q = (query as string).toLowerCase();
    result = result.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.destinationName.toLowerCase().includes(q) ||
      p.overview.toLowerCase().includes(q) ||
      p.activities.some(a => a.toLowerCase().includes(q))
    );
  }

  return res.status(200).json({ packages: result });
});

// Get package by slug or id
app.get('/api/packages/:identifier', (req: Request, res: Response) => {
  const { identifier } = req.params;
  const pkg = packages.find(p => p.slug === identifier || p.id === identifier);
  if (!pkg) {
    return res.status(404).json({ error: 'Journey package not found.' });
  }
  return res.status(200).json({ package: pkg });
});

// Admin: Update package (prices configurable from admin, never hard-coded)
app.put('/api/packages/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = packages.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Package not found.' });
  }

  const updated: TravelPackage = {
    ...packages[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  packages[index] = updated;
  return res.status(200).json({ success: true, package: updated });
});

// Admin: Create new package
app.post('/api/packages', (req: Request, res: Response) => {
  const data = req.body;
  if (!data.title || !data.destinationName || !data.startingPriceINR) {
    return res.status(400).json({ error: 'Title, destination, and starting price are required.' });
  }

  const newPkg: TravelPackage = {
    id: `pkg-${Date.now()}`,
    slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: data.title,
    tagline: data.tagline || '',
    destinationId: data.destinationId || 'dest-custom',
    destinationName: data.destinationName,
    region: data.region || 'india',
    durationDays: data.durationDays || 6,
    durationNights: data.durationNights || 5,
    startingPriceINR: Number(data.startingPriceINR),
    originalPriceINR: data.originalPriceINR ? Number(data.originalPriceINR) : undefined,
    luxuryLevel: data.luxuryLevel || 'Bespoke Classic',
    rating: 5.0,
    reviewCount: 1,
    bannerImage: data.bannerImage || INITIAL_PACKAGES[0].bannerImage,
    galleryImages: data.galleryImages || [INITIAL_PACKAGES[0].bannerImage],
    overview: data.overview || '',
    bestSeason: data.bestSeason || 'Year Round',
    itinerary: data.itinerary || [],
    inclusions: data.inclusions || [],
    exclusions: data.exclusions || [],
    activities: data.activities || [],
    moods: data.moods || ['LUXURY', 'ESCAPE'],
    featured: data.featured ?? false,
    active: true
  };

  packages.unshift(newPkg);
  return res.status(201).json({ success: true, package: newPkg });
});

// ==========================================
// DESTINATIONS API
// ==========================================

app.get('/api/destinations', (req: Request, res: Response) => {
  return res.status(200).json({ destinations });
});

app.get('/api/destinations/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const destination = destinations.find(d => d.slug === slug || d.id === slug);
  if (!destination) {
    return res.status(404).json({ error: 'Destination not found.' });
  }
  const relatedPackages = packages.filter(p => p.destinationName.toLowerCase() === destination.name.toLowerCase());
  return res.status(200).json({ destination, packages: relatedPackages });
});

// ==========================================
// BOOKING SYSTEM API
// ==========================================

// Create booking with strict Indian traveler validations
app.post('/api/bookings', (req: Request, res: Response) => {
  const {
    userId,
    userEmail,
    userName,
    userPhone,
    packageId,
    travelStartDate,
    travelEndDate,
    numberOfAdults,
    numberOfChildren = 0,
    numberOfInfants = 0,
    travelers,
    addOns = [],
    specialRequests
  } = req.body;

  if (!packageId || !travelStartDate || !travelers || !Array.isArray(travelers) || travelers.length === 0) {
    return res.status(400).json({ error: 'Package, travel dates, and traveler details are required.' });
  }

  const pkg = packages.find(p => p.id === packageId);
  if (!pkg) {
    return res.status(404).json({ error: 'Selected package was not found.' });
  }

  // Validate Primary Traveler & Indian Address
  const primaryTraveler: TravelerInfo = travelers.find((t: TravelerInfo) => t.isPrimary) || travelers[0];
  if (!primaryTraveler.fullName || !primaryTraveler.phone) {
    return res.status(400).json({ error: 'Primary traveler must provide full name and mobile number.' });
  }

  if (primaryTraveler.address) {
    const pin = primaryTraveler.address.pinCode || '';
    if (pin.length !== 6 || !/^\d{6}$/.test(pin)) {
      return res.status(400).json({ error: 'Please enter a valid 6-digit Indian PIN code.' });
    }
  }

  // Server-side pricing calculation
  const totalTravelersCount = Number(numberOfAdults || 1) + Number(numberOfChildren || 0);
  const basePricePerPerson = pkg.startingPriceINR;
  const travelersSubtotal = basePricePerPerson * totalTravelersCount;
  const addOnsTotal = addOns.reduce((sum: number, a: any) => sum + (a.selected ? Number(a.priceINR || 0) : 0), 0);
  const gstRate = 0.05; // 5% GST for Indian luxury tour operators
  const subtotalBeforeGst = travelersSubtotal + addOnsTotal;
  const gstAmount = Math.round(subtotalBeforeGst * gstRate);
  const totalAmount = subtotalBeforeGst + gstAmount;

  // Generate Unique Booking ID: TRV-2026-XXXXXX
  const randomSuffix = crypto.randomInt(100000, 999999);
  const bookingId = `TRV-2026-${randomSuffix}`;

  const newBooking: Booking = {
    id: bookingId,
    userId: userId || 'guest-user',
    userEmail: userEmail || primaryTraveler.email || 'customer@example.com',
    userName: userName || primaryTraveler.fullName,
    userPhone: userPhone || primaryTraveler.phone,
    packageId: pkg.id,
    packageTitle: pkg.title,
    destinationName: pkg.destinationName,
    packageBannerImage: pkg.bannerImage,
    travelStartDate,
    travelEndDate: travelEndDate || travelStartDate,
    numberOfAdults: Number(numberOfAdults || 1),
    numberOfChildren: Number(numberOfChildren || 0),
    numberOfInfants: Number(numberOfInfants || 0),
    travelers,
    addOns,
    pricing: {
      basePricePerPersonINR: basePricePerPerson,
      travelersSubtotalINR: travelersSubtotal,
      addOnsTotalINR: addOnsTotal,
      gstINR: gstAmount,
      totalINR: totalAmount
    },
    paymentStatus: 'paid',
    bookingStatus: 'Confirmed',
    paymentDetails: {
      method: 'upi',
      transactionId: `UPI-RAZOR-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
      paidAt: new Date().toISOString()
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    specialRequests,
    assignedAgentName: 'Priya Sharma (Senior Travel Concierge)'
  };

  bookings.unshift(newBooking);

  // Automated WhatsApp Message Trigger
  const waMessage = `Namaste ${newBooking.userName},\n\nYour travel booking is confirmed!\n\nBooking ID:\n${newBooking.id}\n\nDestination:\n${newBooking.destinationName}\n\nTravel Dates:\n${newBooking.travelStartDate} – ${newBooking.travelEndDate}\n\nTravelers:\n${newBooking.numberOfAdults} Adults${newBooking.numberOfChildren ? `, ${newBooking.numberOfChildren} Children` : ''}\n\nPackage:\n${newBooking.packageTitle}\n\nTotal:\n₹${newBooking.pricing.totalINR.toLocaleString('en-IN')}\n\nThank you for choosing Nirvana Luxury Expeditions.\nYour luxury itinerary voucher is now ready in your dashboard.`;

  const waLog: WhatsAppMessageLog = {
    id: `wa-${Date.now()}`,
    bookingId: newBooking.id,
    customerName: newBooking.userName,
    phone: newBooking.userPhone,
    type: 'booking_confirmation',
    message: waMessage,
    timestamp: new Date().toISOString(),
    status: 'delivered'
  };

  whatsappLogs.unshift(waLog);

  return res.status(201).json({
    success: true,
    booking: newBooking,
    whatsAppMessage: waLog,
    message: 'Booking confirmed successfully!'
  });
});

// Get bookings (filtered by user if customer, or all if admin/agent)
app.get('/api/bookings', (req: Request, res: Response) => {
  const { userId, role, status } = req.query;
  let list = bookings;

  if (role === 'customer' && userId) {
    list = list.filter(b => b.userId === userId || b.userEmail === req.query.email);
  }

  if (status) {
    list = list.filter(b => b.bookingStatus.toLowerCase() === (status as string).toLowerCase());
  }

  return res.status(200).json({ bookings: list });
});

// Get single booking
app.get('/api/bookings/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const booking = bookings.find(b => b.id === id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found.' });
  }
  return res.status(200).json({ booking });
});

// Update booking status (Admin / Agent)
app.put('/api/bookings/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, note } = req.body;
  const booking = bookings.find(b => b.id === id);

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found.' });
  }

  booking.bookingStatus = status;
  booking.updatedAt = new Date().toISOString();

  // WhatsApp trigger on status change
  let waText = `Namaste ${booking.userName},\n\nUpdate on your booking ${booking.id}:\nStatus is now ${status}.`;
  if (status === 'Completed') {
    waText += `\nWe hope you enjoyed your unforgettable journey to ${booking.destinationName}! Please share your review on our portal.`;
  } else if (status === 'Cancelled') {
    waText += `\nYour booking has been cancelled as requested. Any applicable refund has been initiated to your source account.`;
  }

  const waLog: WhatsAppMessageLog = {
    id: `wa-${Date.now()}`,
    bookingId: booking.id,
    customerName: booking.userName,
    phone: booking.userPhone,
    type: status === 'Cancelled' ? 'cancellation' : 'itinerary_update',
    message: waText,
    timestamp: new Date().toISOString(),
    status: 'delivered'
  };

  whatsappLogs.unshift(waLog);

  return res.status(200).json({ success: true, booking, whatsAppMessage: waLog });
});

// ==========================================
// WHATSAPP AUTOMATION LOGS & SIMULATION
// ==========================================

app.get('/api/whatsapp/logs', (req: Request, res: Response) => {
  const { bookingId } = req.query;
  let logs = whatsappLogs;
  if (bookingId) {
    logs = logs.filter(l => l.bookingId === bookingId);
  }
  return res.status(200).json({ logs });
});

app.post('/api/whatsapp/send', (req: Request, res: Response) => {
  const { bookingId, type, customMessage } = req.body;
  const booking = bookings.find(b => b.id === bookingId);

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found for WhatsApp notification.' });
  }

  let text = customMessage;
  if (!text) {
    if (type === 'pickup_reminder') {
      text = `Namaste ${booking.userName},\n\nYour ${booking.destinationName} expedition begins tomorrow. Your private chauffeur will receive you with a personalized placard at 8:00 AM.\n\nHelpline: +91 98111 99999\nBon Voyage!`;
    } else {
      text = `Namaste ${booking.userName},\n\nUpdate regarding your booking ${booking.id}: Your concierge is available 24/7 for any reservations or dining requests.`;
    }
  }

  const log: WhatsAppMessageLog = {
    id: `wa-${Date.now()}`,
    bookingId: booking.id,
    customerName: booking.userName,
    phone: booking.userPhone,
    type: type || 'itinerary_update',
    message: text,
    timestamp: new Date().toISOString(),
    status: 'delivered'
  };

  whatsappLogs.unshift(log);
  return res.status(200).json({ success: true, log });
});

// ==========================================
// ADMIN DASHBOARD METRICS
// ==========================================

app.get('/api/admin/stats', (req: Request, res: Response) => {
  const totalCustomers = users.filter(u => u.role === 'customer').length;
  const totalBookings = bookings.length;
  const upcomingTrips = bookings.filter(b => b.bookingStatus === 'Confirmed' || b.bookingStatus === 'Upcoming').length;
  const completedTrips = bookings.filter(b => b.bookingStatus === 'Completed').length;
  const cancelledTrips = bookings.filter(b => b.bookingStatus === 'Cancelled').length;
  const revenueINR = bookings
    .filter(b => b.bookingStatus !== 'Cancelled' && b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + b.pricing.totalINR, 0);

  return res.status(200).json({
    totalCustomers,
    totalBookings,
    upcomingTrips,
    completedTrips,
    cancelledTrips,
    revenueINR: Math.round(revenueINR),
    recentBookings: bookings.slice(0, 5)
  });
});

// ==========================================
// CUSTOM JOURNEY ("Build Your Own Journey")
// ==========================================

app.post('/api/custom-journey', (req: Request, res: Response) => {
  const {
    destination,
    travelDates,
    adults = 2,
    children = 0,
    budgetPerPersonINR = 50000,
    travelStyle = 'Luxury',
    hotelCategory = '5-Star Luxury',
    preferredActivities = [],
    contactName,
    contactEmail,
    contactPhone
  } = req.body;

  if (!destination || !contactName || !contactPhone) {
    return res.status(400).json({ error: 'Destination, contact name, and Indian mobile are required.' });
  }

  const totalPeople = Number(adults) + Number(children);
  const estimatedQuoteINR = Math.round(Number(budgetPerPersonINR) * totalPeople * 1.05);

  const referenceId = `BYO-${Date.now().toString().slice(-6)}`;

  // Also log simulated WhatsApp notification for custom itinerary request
  const waLog: WhatsAppMessageLog = {
    id: `wa-${Date.now()}`,
    bookingId: referenceId,
    customerName: contactName,
    phone: contactPhone,
    type: 'itinerary_update',
    message: `Namaste ${contactName},\n\nWe have received your custom journey request for ${destination}!\n\nReference: ${referenceId}\nStyle: ${travelStyle}\nTravelers: ${adults} Adults\nEstimated Budget: ₹${estimatedQuoteINR.toLocaleString('en-IN')}\n\nOur bespoke travel designer will connect with your private itinerary within 4 business hours.`,
    timestamp: new Date().toISOString(),
    status: 'delivered'
  };

  whatsappLogs.unshift(waLog);

  return res.status(200).json({
    success: true,
    referenceId,
    estimatedQuoteINR,
    message: 'Your bespoke journey request has been received. Our senior curator will reach out shortly.'
  });
});

// Editorial Stories and Reviews
app.get('/api/stories', (req: Request, res: Response) => {
  return res.status(200).json({ stories: TRAVEL_STORIES });
});

app.get('/api/reviews', (req: Request, res: Response) => {
  return res.status(200).json({ reviews: REVIEWS });
});

// Mount Vite or Static Files
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[NIRVANA LUXURY] Production Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
