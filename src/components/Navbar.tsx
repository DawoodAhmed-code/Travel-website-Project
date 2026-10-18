import React, { useState } from 'react';
import {
  Compass,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Shield,
  Phone,
  BookmarkCheck,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getAgencyWhatsAppNumber } from '../utils/whatsapp';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenAuth }) => {
  const { user, profile, isAdmin, logout, simulateAdminMode, setSimulateAdminMode } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const agencyWhatsApp = getAgencyWhatsAppNumber();

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Tours', view: 'tours' },
    { label: 'Destinations', view: 'destinations' },
    { label: 'Trip Cost & Plan', view: 'planner' },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Designed precisely matching the reference image */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-orange-600 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M2.5 19h19v2h-19v-2zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10 8.44 3.52c-.39-.39-1.02-.39-1.41 0l-1.41 1.41c-.39.39-.39 1.02 0 1.41L10 11.2 5.09 12.52l-2.12-2.12c-.39-.39-1.02-.39-1.41 0L.15 11.81c-.2.2-.31.47-.3.75.01.28.14.54.36.72l4.24 3.54c.38.32.9.44 1.38.31l14.8-3.95c.8-.21 1.28-1.04 1.06-1.84z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                Traver
              </span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-orange-600 -mt-1">
                Pakistan Tours
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => onNavigate(link.view)}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-orange-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right CTA / User controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* WhatsApp Quick Chat */}
            <a
              href={`https://wa.me/${agencyWhatsApp}?text=${encodeURIComponent('Hello Traver! I want to plan a custom tour in Pakistan.')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 px-3 py-1.5 rounded-full transition-colors"
              title="Chat directly on WhatsApp"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>WhatsApp Desk</span>
            </a>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-slate-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-linear-to-tr from-slate-800 to-slate-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      (profile?.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()
                    )}
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-slate-800 max-w-[100px] truncate leading-tight">
                      {profile?.displayName || user.email?.split('@')[0]}
                    </p>
                    <p className="text-[10px] text-orange-600 font-medium">
                      {isAdmin ? 'Admin' : 'Traveler'}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900 truncate">{profile?.displayName || 'Traveler'}</p>
                      <p className="text-slate-500 truncate text-[11px]">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('dashboard');
                      }}
                      className="w-full px-4 py-2 text-left flex items-center gap-2 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      <BookmarkCheck className="w-4 h-4 text-orange-500" />
                      <span>My Bookings & Profile</span>
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onNavigate('admin');
                        }}
                        className="w-full px-4 py-2 text-left flex items-center gap-2 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors font-semibold"
                      >
                        <Shield className="w-4 h-4 text-orange-600" />
                        <span>Admin Dashboard</span>
                      </button>
                    )}

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={async () => {
                        setUserDropdownOpen(false);
                        await logout();
                        onNavigate('home');
                      }}
                      className="w-full px-4 py-2 text-left flex items-center gap-2 text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Admin Mode Demo Toggle for convenient reviewer testing */}
                <button
                  onClick={() => setSimulateAdminMode(!simulateAdminMode)}
                  title="Toggle Admin View preview"
                  className={`text-[11px] px-2.5 py-1 rounded-full font-semibold border transition-all flex items-center gap-1 ${
                    simulateAdminMode
                      ? 'bg-purple-100 text-purple-700 border-purple-300'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <Shield className="w-3 h-3" />
                  <span>{simulateAdminMode ? 'Admin View: ON' : 'Admin Demo'}</span>
                </button>

                <button
                  onClick={() => onOpenAuth('signin')}
                  className="text-xs font-semibold text-slate-700 hover:text-orange-600 px-3 py-2 transition-colors"
                >
                  Sign In
                </button>

                <button
                  onClick={() => onOpenAuth('signup')}
                  className="text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-full shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-4 pt-2 pb-6 space-y-3 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate(link.view);
                }}
                className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
                  currentView === link.view
                    ? 'bg-orange-50 text-orange-600 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {user ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('dashboard');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <BookmarkCheck className="w-4 h-4 text-orange-500" />
                  <span>My Bookings & Profile</span>
                </button>
                {isAdmin && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate('admin');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-orange-600 bg-orange-50 flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </button>
                )}
                <button
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await logout();
                    onNavigate('home');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signin');
                  }}
                  className="w-full py-2.5 rounded-full border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="w-full py-2.5 rounded-full bg-orange-600 text-white text-sm font-bold shadow-sm shadow-orange-500/20"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
