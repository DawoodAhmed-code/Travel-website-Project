import React, { useState } from 'react';
import {
  Compass,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Send
} from 'lucide-react';
import { subscribeNewsletter } from '../services/contactService';
import { getAgencyWhatsAppNumber } from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const agencyWhatsApp = getAgencyWhatsAppNumber();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await subscribeNewsletter(email);
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error(err);
      setError('Failed to subscribe. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter CTA Banner - matching reference style */}
        <div className="bg-linear-to-r from-orange-600 to-amber-600 rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <span className="text-orange-200 text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
              Never Miss A Mountain Adventure
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 tracking-tight">
              Get Discounts & Secret Tour Deals in Pakistan
            </h3>
            <p className="text-white/80 text-sm mt-2 max-w-xl">
              Subscribe to our weekly travel dispatch for seasonal road condition alerts, new departure dates, and early-bird rates.
            </p>

            <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-white text-slate-900 text-sm px-4 py-3 rounded-full focus:outline-hidden focus:ring-2 focus:ring-white shadow-xs placeholder:text-slate-400"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting || subscribed}
                className="bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm px-6 py-3 rounded-full transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-70"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Subscribed!</span>
                  </>
                ) : submitting ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
            {error && <p className="text-rose-200 text-xs mt-2">{error}</p>}
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div className="w-9 h-9 rounded-full bg-linear-to-tr from-orange-600 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M2.5 19h19v2h-19v-2zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10 8.44 3.52c-.39-.39-1.02-.39-1.41 0l-1.41 1.41c-.39.39-.39 1.02 0 1.41L10 11.2 5.09 12.52l-2.12-2.12c-.39-.39-1.02-.39-1.41 0L.15 11.81c-.2.2-.31.47-.3.75.01.28.14.54.36.72l4.24 3.54c.38.32.9.44 1.38.31l14.8-3.95c.8-.21 1.28-1.04 1.06-1.84z"/>
                </svg>
              </div>
              <span className="text-2xl font-black text-white tracking-tight">Traver</span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Pakistan's premier travel agency delivering luxury, expedition, and family tours across Gilgit-Baltistan, Khyber Pakhtunkhwa, Azad Kashmir, and the historic Punjab trail. Certified mountain guides, 4x4 transport, and transparent WhatsApp booking.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/${agencyWhatsApp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+92 300 8594210 (WhatsApp)</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-orange-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tours')} className="hover:text-orange-400 transition-colors">
                  All Tour Packages
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-orange-400 transition-colors">
                  Popular Destinations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-orange-400 transition-colors">
                  About Our Agency
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-orange-400 transition-colors">
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Pakistan Top Circuits */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Top Destinations</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('tours')} className="hover:text-orange-400 transition-colors text-left">
                  Hunza Valley & Attabad Lake
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tours')} className="hover:text-orange-400 transition-colors text-left">
                  Skardu, Shangrila & Deosai
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tours')} className="hover:text-orange-400 transition-colors text-left">
                  Fairy Meadows & Nanga Parbat
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tours')} className="hover:text-orange-400 transition-colors text-left">
                  Swat, Malam Jabba & Kalam
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tours')} className="hover:text-orange-400 transition-colors text-left">
                  Naran, Kaghan & Saiful Muluk
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tours')} className="hover:text-orange-400 transition-colors text-left">
                  Neelum Valley, Azad Kashmir
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Agency Offices</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Executive Tower, Blue Area, Islamabad, Pakistan</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Main Boulevard, Gulberg III, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>tours@traver.pk</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Mon - Sat: 9:00 AM - 9:00 PM PKT</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & disclosures */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Traver Pakistan Tour Operations. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Licensed by Department of Tourist Services (DTS-PK)</span>
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
