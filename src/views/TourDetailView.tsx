import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Star,
  ShieldCheck,
  Check,
  X,
  Phone,
  MessageSquare,
  Users,
  ChevronLeft,
  Share2,
  Info,
  Car,
  Home,
  Compass,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { Tour } from '../types';
import { TourCard } from '../components/TourCard';

interface TourDetailViewProps {
  tour: Tour;
  allTours: Tour[];
  onBack: () => void;
  onBookWhatsApp: (tour: Tour) => void;
  onSelectRelated: (tour: Tour) => void;
}

export const TourDetailView: React.FC<TourDetailViewProps> = ({
  tour,
  allTours,
  onBack,
  onBookWhatsApp,
  onSelectRelated
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(tour.coverImage);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'policies'>('itinerary');

  const relatedTours = allTours
    .filter(t => t.id !== tour.id && (t.region === tour.region || t.destination === tour.destination))
    .slice(0, 3);

  const imagesList = tour.images && tour.images.length > 0 ? tour.images : [tour.coverImage];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tour.title,
        text: `Check out this tour package to ${tour.destination} on Traver Pakistan!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tour link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600 bg-white border border-slate-200 px-3.5 py-2 rounded-full transition-colors shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Tours</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-full transition-colors shadow-xs"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Tour</span>
        </button>
      </div>

      {/* Tour Title & Meta */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200/60 px-3 py-1 rounded-full">
            {tour.region}
          </span>
          <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-orange-600" />
            <span>{tour.destination}</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-500" />
            <span>{tour.rating.toFixed(1)}</span>
            <span className="text-slate-400 font-normal">({tour.reviewsCount} reviews)</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {tour.title}
        </h1>
      </div>

      {/* Image Gallery */}
      <div className="space-y-3">
        {/* Main Display Image */}
        <div className="relative aspect-16/9 sm:aspect-21/9 w-full rounded-3xl overflow-hidden bg-slate-900 shadow-xl">
          <img
            src={selectedImage}
            alt={tour.title}
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>{tour.durationDays} Days / {tour.durationNights} Nights</span>
          </div>
        </div>

        {/* Thumbnail Selector */}
        {imagesList.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {imagesList.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-24 h-16 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                  selectedImage === img
                    ? 'border-orange-600 ring-2 ring-orange-500/20 scale-102'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Grid: Left Details & Right Booking Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column (8 cols): Content */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Quick Specs Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs text-center">
              <Clock className="w-5 h-5 text-orange-600 mx-auto mb-1" />
              <div className="text-[10px] text-slate-400 uppercase font-bold">Duration</div>
              <div className="text-xs font-bold text-slate-800">{tour.durationDays}D / {tour.durationNights}N</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs text-center">
              <Compass className="w-5 h-5 text-orange-600 mx-auto mb-1" />
              <div className="text-[10px] text-slate-400 uppercase font-bold">Difficulty</div>
              <div className="text-xs font-bold text-slate-800">{tour.difficulty}</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs text-center">
              <Car className="w-5 h-5 text-orange-600 mx-auto mb-1" />
              <div className="text-[10px] text-slate-400 uppercase font-bold">Transport</div>
              <div className="text-xs font-bold text-slate-800">4x4 / AC Cabin</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs text-center">
              <MapPin className="w-5 h-5 text-orange-600 mx-auto mb-1" />
              <div className="text-[10px] text-slate-400 uppercase font-bold">Meeting Point</div>
              <div className="text-xs font-bold text-slate-800 truncate" title={tour.meetingPoint}>
                Islamabad / KKH
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">Tour Overview</h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {tour.description}
            </p>
          </div>

          {/* Content Tabs */}
          <div className="border-b border-slate-200">
            <nav className="flex gap-8 text-sm">
              <button
                onClick={() => setActiveTab('itinerary')}
                className={`py-3 font-bold border-b-2 transition-all ${
                  activeTab === 'itinerary'
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Day-by-Day Itinerary ({tour.itinerary?.length || 0} Days)
              </button>

              <button
                onClick={() => setActiveTab('inclusions')}
                className={`py-3 font-bold border-b-2 transition-all ${
                  activeTab === 'inclusions'
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Included & Excluded
              </button>

              <button
                onClick={() => setActiveTab('policies')}
                className={`py-3 font-bold border-b-2 transition-all ${
                  activeTab === 'policies'
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Policies & Meeting Info
              </button>
            </nav>
          </div>

          {/* Tab 1: Day by Day Itinerary */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              {tour.itinerary?.map((day) => (
                <div
                  key={day.day}
                  className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs space-y-2 relative"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 font-extrabold text-xs flex items-center justify-center shrink-0">
                      D{day.day}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      Day {day.day}: {day.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 pl-11 leading-relaxed">
                    {day.description}
                  </p>
                  {(day.meal || day.accommodation) && (
                    <div className="pl-11 pt-2 flex flex-wrap items-center gap-4 text-[11px] text-slate-500 border-t border-slate-50 mt-3">
                      {day.meal && <span>🍽 <strong>Meals:</strong> {day.meal}</span>}
                      {day.accommodation && <span>🏨 <strong>Stay:</strong> {day.accommodation}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Included & Excluded Services */}
          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Included */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>What is Included</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {tour.includedServices?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded */}
              <div className="bg-rose-50/50 border border-rose-100 rounded-3xl p-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                  <X className="w-4 h-4 text-rose-600 stroke-[3]" />
                  <span>What is Excluded</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {tour.excludedServices?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

          {/* Tab 3: Policies & Meeting */}
          {activeTab === 'policies' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span>Meeting Point & Departure Protocol</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Official Departure Location:</strong> {tour.meetingPoint}
                  <br />
                  Our tour managers gather guests 45 minutes prior to the scheduled departure time for vehicle seat assignment, luggage tag verification, and a brief mountain safety orientation.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  <span>Cancellation & Refund Policy</span>
                </h4>
                <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5">
                  <li>Up to 10 days before departure: 100% full refund or free date rescheduling.</li>
                  <li>Between 5 and 9 days before departure: 70% refund of total trip invoice.</li>
                  <li>Within 4 days of departure: 30% refund due to advance hotel & jeep blockings.</li>
                  <li>In the event of unforeseen road blockages (landslides or snow clearance), our tour guides implement alternate safe tourist circuits without additional charges.</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Right Column (4 cols): Sticky WhatsApp Booking Box */}
        <div className="lg:col-span-4 sticky top-28 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xl space-y-5">
            
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Price per person
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-slate-900">
                  PKR {tour.pricePerPerson.toLocaleString()}
                </span>
                {tour.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    PKR {tour.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                ✓ Guaranteed lowest rate with no hidden charges
              </span>
            </div>

            {/* Upcoming departures preview */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 block">
                Available Departures
              </span>
              <div className="space-y-1.5">
                {tour.departureDates?.slice(0, 3).map((d) => (
                  <div
                    key={d.date}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                  >
                    <div className="flex items-center gap-2 font-semibold text-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-orange-600" />
                      <span>{d.date}</span>
                    </div>
                    <span className={`text-[11px] font-bold ${
                      d.status === 'Filling Fast' ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {d.seatsAvailable} seats • {d.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp Booking CTA */}
            <div className="pt-2 space-y-2.5">
              <button
                onClick={() => onBookWhatsApp(tour)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3.5 px-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all hover:scale-101 active:scale-99 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Book via WhatsApp</span>
              </button>

              <p className="text-[11px] text-center text-slate-400 leading-snug">
                Submits your preferred dates to our database and initiates WhatsApp chat with verified tour desk.
              </p>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Licensed Pakistani Tour Operator</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Private & Small-Group Family Tours</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Instant 24/7 Tour Coordination</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Related Tours */}
      {relatedTours.length > 0 && (
        <div className="pt-12 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">
              Other Similar Tours in {tour.region}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTours.map((t) => (
              <TourCard
                key={t.id}
                tour={t}
                onSelect={onSelectRelated}
                onBookWhatsApp={onBookWhatsApp}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
