import React, { useState } from 'react';
import {
  X,
  Calendar,
  Users,
  Phone,
  Mail,
  User as UserIcon,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Tour, BookingEnquiry } from '../types';
import { useAuth } from '../context/AuthContext';
import { createBookingEnquiry } from '../services/enquiryService';
import { openWhatsAppChat, getAgencyWhatsAppNumber } from '../utils/whatsapp';

interface BookingModalProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (enquiry: BookingEnquiry) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ tour, isOpen, onClose, onSuccess }) => {
  const { user, profile } = useAuth();

  const [departureDate, setDepartureDate] = useState<string>(
    tour?.departureDates?.[0]?.date || ''
  );
  const [travellerCount, setTravellerCount] = useState<number>(2);
  const [name, setName] = useState<string>(profile?.displayName || user?.displayName || '');
  const [email, setEmail] = useState<string>(user?.email || '');
  const [phone, setPhone] = useState<string>(profile?.phone || '');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<BookingEnquiry | null>(null);
  const [error, setError] = useState<string>('');

  if (!isOpen || !tour) return null;

  const pricePerPerson = tour.pricePerPerson;
  const totalPrice = pricePerPerson * travellerCount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!phone.trim()) {
      setError('Please provide your contact phone / WhatsApp number.');
      return;
    }
    if (!departureDate) {
      setError('Please select a preferred departure date.');
      return;
    }
    if (travellerCount < 1) {
      setError('Number of travellers must be at least 1.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Create Enquiry in Firestore
      const enquiry = await createBookingEnquiry({
        tourId: tour.id,
        tourTitle: tour.title,
        tourSlug: tour.slug,
        destination: tour.destination,
        userId: user ? user.uid : null,
        travellerName: name.trim(),
        travellerEmail: email.trim() || 'guest@traver.pk',
        travellerPhone: phone.trim(),
        departureDate,
        travellerCount,
        quotedPricePerPerson: pricePerPerson,
        quotedTotal: totalPrice,
        specialRequests: specialRequests.trim() || undefined,
      });

      setSubmittedEnquiry(enquiry);
      if (onSuccess) onSuccess(enquiry);

      // 2. Open WhatsApp pre-filled with validated data and enquiry reference
      openWhatsAppChat({
        tourTitle: tour.title,
        destination: tour.destination,
        departureDate,
        travellerCount,
        pricePerPerson,
        totalPrice,
        tourSlug: tour.slug,
        enquiryId: enquiry.id,
        travellerName: name.trim(),
      });
    } catch (err) {
      console.error(err);
      setError('Failed to record booking enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLaunchWhatsAppAgain = () => {
    if (!submittedEnquiry) return;
    openWhatsAppChat({
      tourTitle: tour.title,
      destination: tour.destination,
      departureDate,
      travellerCount,
      pricePerPerson,
      totalPrice,
      tourSlug: tour.slug,
      enquiryId: submittedEnquiry.id,
      travellerName: name.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">
            Booking & WhatsApp Enquiry
          </span>
          <h2 className="text-xl font-bold mt-1 text-white pr-6 line-clamp-1">
            {tour.title}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {tour.destination} • {tour.durationDays} Days / {tour.durationNights} Nights
          </p>
        </div>

        {/* Confirmation Screen */}
        {submittedEnquiry ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900">Enquiry Recorded!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Booking Reference: <span className="font-mono font-bold text-slate-800">#{submittedEnquiry.id}</span>
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Departure Date:</span>
                <span className="font-semibold text-slate-900">{submittedEnquiry.departureDate}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Travellers:</span>
                <span className="font-semibold text-slate-900">{submittedEnquiry.travellerCount} Persons</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Quoted Total:</span>
                <span className="font-bold text-orange-600 text-sm">
                  PKR {submittedEnquiry.quotedTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-800 text-left flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Important Notice:</strong> Sending a WhatsApp message logs your booking enquiry and connects you directly with our tour desk. Final seat confirmation and payment are completed directly through official tour invoices.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleLaunchWhatsAppAgain}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Open WhatsApp Chat</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onClose}
                className="py-3 px-6 rounded-full border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Departure Date Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Select Departure Date <span className="text-orange-600">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tour.departureDates?.map((d) => (
                  <button
                    type="button"
                    key={d.date}
                    onClick={() => setDepartureDate(d.date)}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all flex flex-col justify-between ${
                      departureDate === d.date
                        ? 'border-orange-600 bg-orange-50/60 ring-2 ring-orange-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Calendar className="w-3.5 h-3.5 text-orange-600" />
                      <span>{d.date}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
                      <span>{d.seatsAvailable} seats left</span>
                      <span className={`font-semibold ${d.status === 'Filling Fast' ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {d.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Or custom date input */}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[11px] text-slate-400">Or custom date:</span>
                <input
                  type="date"
                  value={departureDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="text-xs border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-hidden focus:border-orange-500"
                />
              </div>
            </div>

            {/* Traveller Count */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Number of Travellers <span className="text-orange-600">*</span>
              </label>
              <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-2.5 max-w-xs">
                <button
                  type="button"
                  onClick={() => setTravellerCount(Math.max(1, travellerCount - 1))}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100"
                >
                  -
                </button>
                <div className="flex-1 text-center font-extrabold text-slate-900 text-sm">
                  {travellerCount} Person{travellerCount > 1 ? 's' : ''}
                </div>
                <button
                  type="button"
                  onClick={() => setTravellerCount(travellerCount + 1)}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Traveler Contact Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-orange-600">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dawood Ahmed"
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone / WhatsApp <span className="text-orange-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +92 300 1234567"
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address (Optional)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. traveler@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Special Requests or Dietary Requirements
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Mention any room preferences, airport pickup time, or vegetarian diet needs..."
                rows={2}
                className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
              />
            </div>

            {/* Price Breakdown Card */}
            <div className="bg-orange-50/70 border border-orange-200/60 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-orange-900 font-medium block">
                  PKR {pricePerPerson.toLocaleString()} × {travellerCount} Persons
                </span>
                <span className="text-xs font-bold text-slate-700">Estimated Total Cost</span>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-orange-600 block">
                  PKR {totalPrice.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500">Includes taxes & transport</span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3.5 px-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer disabled:opacity-70"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>{isSubmitting ? 'Recording Enquiry...' : 'Continue to WhatsApp Booking'}</span>
            </button>

            <p className="text-center text-[10px] text-slate-400">
              Your contact info is strictly used for tour coordination. No spam guaranteed.
            </p>
          </form>
        )}

      </div>
    </div>
  );
};
