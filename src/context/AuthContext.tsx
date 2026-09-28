import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types/travel';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAgentOrAdmin: boolean;
  login: (identifier: string, pass: string) => Promise<User>;
  signup: (payload: { fullName: string; email: string; phone: string; password: string; preferredTravelStyle?: string }) => Promise<User>;
  logout: () => void;
  switchRoleForDemo: (role: UserRole) => void;
  authModalOpen: boolean;
  authModalMode: 'login' | 'signup' | 'otp' | 'forgot';
  openAuthModal: (mode?: 'login' | 'signup' | 'otp' | 'forgot') => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nirvana_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default demo user: Aarav Mehta (Customer)
    return {
      id: 'user-aarav-1',
      fullName: 'Aarav Mehta',
      email: 'aarav.mehta@example.com',
      phone: '+91 98201 12345',
      role: 'customer',
      isVerified: true,
      createdAt: '2026-09-01T00:00:00Z'
    };
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('nirvana_token') || 'tok_demo_active';
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'otp' | 'forgot'>('login');

  useEffect(() => {
    if (user) {
      localStorage.setItem('nirvana_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nirvana_current_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('nirvana_token', token);
    } else {
      localStorage.removeItem('nirvana_token');
    }
  }, [token]);

  const login = async (identifier: string, pass: string): Promise<User> => {
    const res = await api.login(identifier, pass);
    setUser(res.user);
    setToken(res.token);
    setAuthModalOpen(false);
    return res.user;
  };

  const signup = async (payload: { fullName: string; email: string; phone: string; password: string; preferredTravelStyle?: string }): Promise<User> => {
    const res = await api.signup(payload);
    setUser(res.user);
    setToken(res.token);
    setAuthModalOpen(false);
    return res.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('nirvana_current_user');
    localStorage.removeItem('nirvana_token');
  };

  const switchRoleForDemo = (role: UserRole) => {
    if (role === 'admin') {
      setUser({
        id: 'usr-admin-1',
        fullName: 'Arjun Singhania',
        email: 'admin@nirvanavoyages.com',
        phone: '+91 98111 99999',
        role: 'admin',
        isVerified: true,
        createdAt: '2026-01-01T00:00:00Z'
      });
      setToken('tok_admin_demo');
    } else if (role === 'travel_agent') {
      setUser({
        id: 'usr-agent-1',
        fullName: 'Priya Sharma',
        email: 'agent.priya@nirvanavoyages.com',
        phone: '+91 98333 44444',
        role: 'travel_agent',
        isVerified: true,
        createdAt: '2026-03-01T00:00:00Z'
      });
      setToken('tok_agent_demo');
    } else {
      setUser({
        id: 'user-aarav-1',
        fullName: 'Aarav Mehta',
        email: 'aarav.mehta@example.com',
        phone: '+91 98201 12345',
        role: 'customer',
        isVerified: true,
        createdAt: '2026-09-01T00:00:00Z'
      });
      setToken('tok_customer_demo');
    }
  };

  const openAuthModal = (mode: 'login' | 'signup' | 'otp' | 'forgot' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isAgentOrAdmin: user?.role === 'admin' || user?.role === 'travel_agent' || user?.role === 'manager',
        login,
        signup,
        logout,
        switchRoleForDemo,
        authModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
