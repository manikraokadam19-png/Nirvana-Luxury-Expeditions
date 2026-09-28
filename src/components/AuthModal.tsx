import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, ShieldCheck, Check, ArrowRight, Lock, Phone, Mail, User as UserIcon, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { RAJASTHAN_IMAGE } from '../data/travelData';

export const AuthModal: React.FC = () => {
  const { authModalOpen, authModalMode, closeAuthModal, login, signup, openAuthModal } = useAuth();

  // Mode: 'login' | 'signup' | 'otp' | 'forgot'
  const [currentMode, setCurrentMode] = useState<'login' | 'signup' | 'otp' | 'forgot'>(authModalMode);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState('aarav.mehta@example.com'); // email or mobile
  const [phone, setPhone] = useState('+91 98201 12345');
  const [password, setPassword] = useState('Travel@123');
  const [confirmPassword, setConfirmPassword] = useState('Travel@123');
  const [showPassword, setShowPassword] = useState(false);

  // OTP State
  const [otpCode, setOtpCode] = useState('');
  const [otpCooldown, setOtpCooldown] = useState(60);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [debugOtpCode, setDebugOtpCode] = useState<string | null>(null);

  // Feedback State
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [duplicateAccountNotice, setDuplicateAccountNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCurrentMode(authModalMode);
    setErrorMessage(null);
    setDuplicateAccountNotice(null);
  }, [authModalMode]);

  // Active 60-second OTP countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentMode === 'otp' && otpCooldown > 0) {
      timer = setInterval(() => {
        setOtpCooldown((prev) => {
          if (prev <= 1) {
            setCanResendOtp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentMode, otpCooldown]);

  if (!authModalOpen) return null;

  // Live password validation
  const hasMinLength = password.length >= 6;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  const isPasswordValid = hasMinLength && hasLetter && hasNumber && hasSpecial;

  // Handlers
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await login(identifier, password);
    } catch (err: any) {
      setErrorMessage(err.message || 'Incorrect credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setDuplicateAccountNotice(null);

    if (!isPasswordValid) {
      setErrorMessage('Password must satisfy all security requirements.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Check duplicate user first
      const dupCheck = await api.checkDuplicate(identifier, phone);
      if (dupCheck.exists) {
        setDuplicateAccountNotice('You already have an account with us. Please login to continue your journey.');
        setIsSubmitting(false);
        return;
      }

      // 2. Dispatch OTP
      const otpRes = await api.sendOtp(phone);
      if (otpRes.debugOtp) setDebugOtpCode(otpRes.debugOtp);
      setOtpCooldown(60);
      setCanResendOtp(false);
      setCurrentMode('otp');
    } catch (err: any) {
      setErrorMessage(err.message || 'Signup initiation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await api.verifyOtp(phone, otpCode);
      // Proceed to complete verified signup
      await signup({
        fullName,
        email: identifier,
        phone,
        password
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Incorrect OTP code');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResendOtp) return;
    setErrorMessage(null);
    try {
      const res = await api.sendOtp(phone);
      if (res.debugOtp) setDebugOtpCode(res.debugOtp);
      setOtpCooldown(60);
      setCanResendOtp(false);
      setOtpCode('');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="relative bg-[#0b0f17] border border-[#243046] rounded-sm max-w-4xl w-full overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-colors"
          aria-label="Close authentication modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Full-Height Cinematic Image Panel (col-span-5) */}
        <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-8 overflow-hidden">
          <img
            src={RAJASTHAN_IMAGE}
            alt="Cinematic Indian Sanctuary"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/60 to-black/30" />

          <div className="relative z-10">
            <span className="font-editorial text-2xl tracking-[0.2em] font-medium text-white">
              NIRVANA
            </span>
          </div>

          <div className="relative z-10">
            <h4 className="font-editorial text-2xl text-white font-normal leading-snug">
              "Your next unforgettable story begins with a single step."
            </h4>
            <div className="mt-4 pt-3 border-t border-white/20 text-xs text-[#cbd5e1] font-light">
              Oberoi & Taj Heritage Partner • Asia/Kolkata
            </div>
          </div>
        </div>

        {/* Right: Elegant Authentication Panel (col-span-7) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          {/* Duplicate Account Alert Banner */}
          {duplicateAccountNotice && (
            <div className="mb-6 p-4 rounded-sm bg-[#121824] border border-[#c5a880] text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#dfc294] font-semibold">
                <AlertCircle className="w-4 h-4" />
                <span>You already have an account with us.</span>
              </div>
              <p className="text-[#8e9cb2]">{duplicateAccountNotice}</p>
              <button
                type="button"
                onClick={() => {
                  setDuplicateAccountNotice(null);
                  setCurrentMode('login');
                }}
                className="px-4 py-1.5 bg-[#c5a880] text-black text-xs font-semibold rounded-sm uppercase tracking-wider"
              >
                Login Now
              </button>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-3 rounded-sm bg-rose-950/40 border border-rose-800 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* VIEW 1: LOGIN */}
          {currentMode === 'login' && (
            <div>
              <div className="mb-6">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#dfc294] font-semibold block mb-1">
                  Access Portal
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
                  WELCOME BACK.
                </h3>
                <p className="text-xs sm:text-sm text-[#8e9cb2] mt-1">
                  Your next journey is waiting.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#8e9cb2] block mb-1">
                    Email or Indian Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="aarav.mehta@example.com"
                      className="w-full bg-[#121824] border border-[#243046] text-white text-xs rounded px-3 py-2.5 pl-9 focus:outline-none focus:border-[#c5a880]"
                    />
                    <Mail className="w-4 h-4 text-[#8e9cb2] absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#8e9cb2]">Password</label>
                    <button
                      type="button"
                      onClick={() => setCurrentMode('forgot')}
                      className="text-[11px] text-[#dfc294] hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#121824] border border-[#243046] text-white text-xs rounded px-3 py-2.5 pl-9 pr-9 focus:outline-none focus:border-[#c5a880]"
                    />
                    <Lock className="w-4 h-4 text-[#8e9cb2] absolute left-3 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-[#8e9cb2] hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#c5a880] hover:bg-[#dfc294] text-black text-xs uppercase tracking-widest font-semibold rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? 'Authenticating...' : 'Login'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Demo Quick Logins */}
              <div className="mt-6 pt-4 border-t border-[#1a2334] text-[11px] text-[#8e9cb2]">
                <div className="font-semibold text-white mb-2">Instant Test Drive Credentials:</div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIdentifier('aarav.mehta@example.com');
                      setPassword('Travel@123');
                    }}
                    className="p-1.5 bg-[#121824] border border-[#243046] hover:border-[#c5a880] rounded text-left text-[10px]"
                  >
                    <span className="text-white block font-medium">Customer</span>
                    <span className="text-[#8e9cb2]">Aarav</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIdentifier('agent.priya@nirvanavoyages.com');
                      setPassword('Travel@123');
                    }}
                    className="p-1.5 bg-[#121824] border border-[#243046] hover:border-[#c5a880] rounded text-left text-[10px]"
                  >
                    <span className="text-white block font-medium">Agent</span>
                    <span className="text-[#8e9cb2]">Priya</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIdentifier('admin@nirvanavoyages.com');
                      setPassword('Travel@123');
                    }}
                    className="p-1.5 bg-[#121824] border border-[#243046] hover:border-[#c5a880] rounded text-left text-[10px]"
                  >
                    <span className="text-white block font-medium">Admin</span>
                    <span className="text-[#8e9cb2]">Arjun</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center text-xs text-[#8e9cb2]">
                Don’t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setCurrentMode('signup')}
                  className="text-[#dfc294] font-semibold hover:underline"
                >
                  Create Account
                </button>
              </div>
            </div>
          )}

          {/* VIEW 2: SIGN UP */}
          {currentMode === 'signup' && (
            <div>
              <div className="mb-6">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#dfc294] font-semibold block mb-1">
                  Begin Your Expedition
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
                  START YOUR JOURNEY.
                </h3>
                <p className="text-xs sm:text-sm text-[#8e9cb2] mt-1">
                  Create your account and discover a world of possibilities.
                </p>
              </div>

              <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8e9cb2] block mb-1">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Vikramaditya Rathore"
                      className="w-full bg-[#121824] border border-[#243046] text-white text-xs rounded px-3 py-2 pl-9 focus:outline-none focus:border-[#c5a880]"
                    />
                    <UserIcon className="w-3.5 h-3.5 text-[#8e9cb2] absolute left-3 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8e9cb2] block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full bg-[#121824] border border-[#243046] text-white text-xs rounded px-3 py-2 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8e9cb2] block mb-1">Indian Mobile (+91)</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98201 12345"
                      className="w-full bg-[#121824] border border-[#243046] text-white text-xs rounded px-3 py-2 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8e9cb2] block mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="e.g. Travel@1"
                      className="w-full bg-[#121824] border border-[#243046] text-white text-xs rounded px-3 py-2 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8e9cb2] block mb-1">Confirm Password</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-[#121824] border border-[#243046] text-white text-xs rounded px-3 py-2 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>

                {/* Live Password Validation Requirements */}
                <div className="bg-[#121824] p-3 rounded border border-[#243046] space-y-1 text-[11px]">
                  <span className="text-[#8e9cb2] block font-medium">Security Standard:</span>
                  <div className="grid grid-cols-2 gap-1 text-[10px]">
                    <div className={hasMinLength ? 'text-emerald-400' : 'text-[#8e9cb2]'}>
                      {hasMinLength ? '✓' : '○'} Min 6 characters
                    </div>
                    <div className={hasLetter ? 'text-emerald-400' : 'text-[#8e9cb2]'}>
                      {hasLetter ? '✓' : '○'} At least one letter
                    </div>
                    <div className={hasNumber ? 'text-emerald-400' : 'text-[#8e9cb2]'}>
                      {hasNumber ? '✓' : '○'} At least one number
                    </div>
                    <div className={hasSpecial ? 'text-emerald-400' : 'text-[#8e9cb2]'}>
                      {hasSpecial ? '✓' : '○'} Special character (!@#$%^&*)
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#c5a880] hover:bg-[#dfc294] text-black text-xs uppercase tracking-widest font-semibold rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? 'Checking Details...' : 'Send 6-Digit OTP'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center text-xs text-[#8e9cb2]">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setCurrentMode('login')}
                  className="text-[#dfc294] font-semibold hover:underline"
                >
                  Login
                </button>
              </div>
            </div>
          )}

          {/* VIEW 3: OTP VERIFICATION */}
          {currentMode === 'otp' && (
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#dfc294] font-semibold block mb-1">
                  Security Check
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
                  VERIFY YOUR JOURNEY
                </h3>
                <p className="text-xs sm:text-sm text-[#8e9cb2] mt-1 max-w-sm mx-auto">
                  Enter the 6-digit verification code sent to your registered mobile number: <span className="font-mono text-white">{phone}</span>
                </p>
                {debugOtpCode && (
                  <div className="mt-2 text-xs text-[#dfc294] bg-[#121824] inline-block px-3 py-1 rounded border border-[#243046]">
                    Demo OTP Code: <span className="font-mono font-bold tracking-widest text-white">{debugOtpCode}</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleOtpVerify} className="space-y-6">
                <div>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="123456"
                    className="w-full bg-[#121824] border border-[#243046] text-white text-2xl tracking-[0.4em] font-mono text-center rounded py-3 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div className="text-center text-xs text-[#8e9cb2]">
                  {otpCooldown > 0 ? (
                    <span>Resend OTP in <span className="font-mono text-white font-semibold">{otpCooldown} seconds</span></span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-[#dfc294] font-semibold hover:underline"
                    >
                      Resend 6-Digit OTP Now
                    </button>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || otpCode.length !== 6}
                    className="w-full py-3 bg-[#c5a880] hover:bg-[#dfc294] text-black text-xs uppercase tracking-widest font-semibold rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? 'Verifying...' : 'Verify & Enter Nirvana'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* VIEW 4: FORGOT PASSWORD */}
          {currentMode === 'forgot' && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#dfc294] font-semibold block mb-1">
                  Credential Recovery
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
                  RESET PASSWORD
                </h3>
                <p className="text-xs sm:text-sm text-[#8e9cb2] mt-1">
                  We will send a 6-digit recovery code to your registered coordinates.
                </p>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  try {
                    const res = await api.sendOtp(identifier);
                    if (res.debugOtp) setDebugOtpCode(res.debugOtp);
                    setOtpCooldown(60);
                    setCanResendOtp(false);
                    setCurrentMode('otp');
                  } catch (err: any) {
                    setErrorMessage(err.message);
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8e9cb2] block mb-1">
                    Email or Mobile Number
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full bg-[#121824] border border-[#243046] text-white text-xs rounded px-3 py-2.5 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#c5a880] hover:bg-[#dfc294] text-black text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
                  >
                    {isSubmitting ? 'Sending Code...' : 'Send Recovery OTP'}
                  </button>
                </div>
              </form>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setCurrentMode('login')}
                  className="text-xs text-[#8e9cb2] hover:text-white"
                >
                  ← Return to Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
