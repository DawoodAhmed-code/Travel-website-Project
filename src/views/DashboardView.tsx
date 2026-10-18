import React, { useEffect, useState } from 'react';
import {
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  BookmarkCheck,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Edit2,
  Save,
  LogOut,
  Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BookingEnquiry, EnquiryStatus } from '../types';
import { getUserEnquiries } from '../services/enquiryService';
import { openWhatsAppChat } from '../utils/whatsapp';

interface DashboardViewProps {
  onOpenAuth: (mode?: 'signin') => void;
  onNavigateTour: (slug: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onOpenAuth, onNavigateTour }) => {
  const { user, profile, updateUserProfileData, logout, isAdmin } = useAuth();
  const [enquiries, setEnquiries] = useState<BookingEnquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Profile edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setEditName(profile?.displayName || user.displayName || '');
      setEditPhone(profile?.phone || '');
      fetchEnquiries();
    } else {
      setLoading(false);
    }
  }, [user, profile]);

  const fetchEnquiries = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const list = await getUserEnquiries(user.uid);
      setEnquiries(list);
    } catch (err) {
      console.warn('Could not load user enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfileData(editName, editPhone);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-100 shadow-md text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Sign In to View Your Dashboard</h2>
        <p className="text-xs text-slate-500">
          Track your Pakistan tour bookings, update contact details, and review WhatsApp enquiry histories.
        </p>
        <button
          onClick={() => onOpenAuth('signin')}
          className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-full shadow-md shadow-orange-500/25 transition-all"
        >
          Sign In / Create Account
        </button>
      </div>
    );
  }

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Contacted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Profile Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-tr from-slate-900 to-slate-800 text-white flex items-center justify-center text-xl font-black shadow-md">
            {profile?.displayName?.[0] || user.email?.[0] || 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {profile?.displayName || 'Traveler'}
              </h1>
              {isAdmin && (
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
            {profile?.phone && (
              <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1">
                <Phone className="w-3 h-3 text-orange-600" />
                <span>{profile.phone}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-slate-200 hover:border-slate-300 text-slate-700 bg-white shadow-xs transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
          </button>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </div>

      {/* Profile Edit Form */}
      {isEditing && (
        <form onSubmit={handleSaveProfile} className="bg-orange-50/50 rounded-3xl p-6 border border-orange-200/60 max-w-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Update Profile Information</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
                className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone / WhatsApp Number</label>
              <input
                type="tel"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 px-5 py-2.5 rounded-full shadow-xs cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile</span>
          </button>
        </form>
      )}

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2 max-w-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      {/* Explanatory Notice regarding WhatsApp Booking */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">How Tour Confirmation Works:</strong> Booking enquiries submitted on the site are recorded in our secure database. Our travel desk in Islamabad connects with you via WhatsApp to verify passenger seats, confirm customized requests, and issue the final trip voucher. Status updates reflect your enquiry progress.
        </div>
      </div>

      {/* Enquiries Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-orange-600" />
            <span>My Tour Booking Enquiries</span>
          </h2>
          <span className="text-xs text-slate-500">
            {enquiries.length} Enquir{enquiries.length === 1 ? 'y' : 'ies'} Logged
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">Loading your enquiries...</div>
        ) : enquiries.length > 0 ? (
          <div className="space-y-4">
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-200 transition-all"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      #{enq.id.slice(0, 10)}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusBadge(enq.status)}`}>
                      {enq.status}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-semibold text-slate-500">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3
                    onClick={() => onNavigateTour(enq.tourSlug)}
                    className="text-base font-bold text-slate-900 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    {enq.tourTitle}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-orange-600" />
                      Departure: <strong>{enq.departureDate}</strong>
                    </span>
                    <span>Travellers: <strong>{enq.travellerCount} Persons</strong></span>
                    <span>Quoted: <strong className="text-slate-900 font-bold">PKR {enq.quotedTotal.toLocaleString()}</strong></span>
                  </div>

                  {enq.adminNotes && (
                    <div className="mt-2 p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[11px] text-slate-600">
                      <strong>Agent Note:</strong> {enq.adminNotes}
                    </div>
                  )}
                </div>

                {/* Right buttons */}
                <div className="flex items-center gap-2 pt-2 md:pt-0">
                  <button
                    onClick={() =>
                      openWhatsAppChat({
                        tourTitle: enq.tourTitle,
                        destination: enq.destination,
                        departureDate: enq.departureDate,
                        travellerCount: enq.travellerCount,
                        pricePerPerson: enq.quotedPricePerPerson,
                        totalPrice: enq.quotedTotal,
                        tourSlug: enq.tourSlug,
                        enquiryId: enq.id,
                        travellerName: enq.travellerName,
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 rounded-full transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp Desk</span>
                  </button>

                  <button
                    onClick={() => onNavigateTour(enq.tourSlug)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-full transition-colors"
                  >
                    <span>View Tour</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 space-y-3">
            <BookmarkCheck className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">No Booking Enquiries Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You haven't requested any tour bookings yet. Explore our top Pakistani destinations and plan your next mountain getaway!
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
