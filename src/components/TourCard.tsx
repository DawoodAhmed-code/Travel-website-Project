import React from 'react';
import { MapPin, Calendar, Clock, Star, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Tour } from '../types';

interface TourCardProps {
  tour: Tour;
  onSelect: (tour: Tour) => void;
  onBookWhatsApp: (tour: Tour) => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onSelect, onBookWhatsApp }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Cover Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        <img
          src={tour.coverImage}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Rating badge - top right */}
        <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>{tour.rating.toFixed(1)}</span>
        </div>

        {/* Region tag - top left */}
        <div className="absolute top-3.5 left-3.5 bg-slate-900/70 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {tour.region}
        </div>

        {/* Duration badge - bottom left on image */}
        <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1.5 drop-shadow-md">
          <Clock className="w-3.5 h-3.5 text-orange-400" />
          <span>{tour.durationDays} Days / {tour.durationNights} Nights</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 text-orange-600 text-xs font-semibold mb-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{tour.destination}</span>
          </div>

          <h3
            onClick={() => onSelect(tour)}
            className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1 cursor-pointer leading-snug"
          >
            {tour.title}
          </h3>

          <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
            {tour.shortDescription}
          </p>
        </div>

        {/* Price & Action row */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              From Per Person
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900">
                PKR {tour.pricePerPerson.toLocaleString()}
              </span>
              {tour.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  PKR {tour.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onBookWhatsApp(tour)}
              title="Book or enquire via WhatsApp"
              className="p-2.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all shadow-xs"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={() => onSelect(tour)}
              className="text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 px-3.5 py-2.5 rounded-full transition-all flex items-center gap-1 shadow-xs shadow-orange-500/20"
            >
              <span>Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
