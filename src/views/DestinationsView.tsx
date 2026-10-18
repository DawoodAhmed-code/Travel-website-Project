import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Compass,
  Calculator,
  ArrowRight,
  Sparkles,
  ChevronRight,
  SunMedium
} from 'lucide-react';
import { PLANNER_DESTINATIONS, PlannerDestination } from '../data/plannerData';
import { Tour } from '../types';

interface DestinationsViewProps {
  onPlanTrip: (destinationId: string) => void;
  onExploreTours: (destinationName: string) => void;
}

export const DestinationsView: React.FC<DestinationsViewProps> = ({
  onPlanTrip,
  onExploreTours
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const regions = ['All', 'Gilgit-Baltistan', 'Khyber Pakhtunkhwa', 'Azad Kashmir', 'Balochistan'];

  const filteredDestinations = PLANNER_DESTINATIONS.filter((d) => {
    if (selectedRegion === 'All') return true;
    return d.region === selectedRegion;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200/60">
          Iconic Pakistan Circuits
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Famous & Popular Destinations
        </h1>
        <p className="text-xs sm:text-base text-slate-500">
          Discover high-altitude plateaus, turquoise glacial lakes, jagged granite spires, and golden coastal highways across Pakistan.
        </p>
      </div>

      {/* Region Filter Chips */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedRegion === region
                ? 'bg-orange-600 text-white shadow-md shadow-orange-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map((dest) => (
          <div
            key={dest.id}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              {/* Cover Image */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                <img
                  src={dest.coverImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3.5 left-3.5 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full">
                  {dest.region}
                </span>

                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-orange-600" />
                  <span>{dest.recommendedDays} Days Suggested</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {dest.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {dest.tagline}
                </p>

                {/* Quick specs */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">From Islamabad:</span>
                    <strong className="text-slate-800">{dest.distanceFromIslamabadKm} km (~{dest.driveTimeHours} hrs)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Best Season:</span>
                    <strong className="text-emerald-700 font-semibold">{dest.bestMonths.split('(')[0]}</strong>
                  </div>
                  {dest.flightAvailable && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Airport:</span>
                      <strong className="text-blue-700 font-semibold">Direct Flights Available</strong>
                    </div>
                  )}
                </div>

                {/* Day 1 & Day 2 Plan Preview */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100/80 space-y-1.5 mt-3 text-[11px]">
                  <div className="font-bold text-slate-800 flex items-center gap-1 text-[10px] uppercase tracking-wider text-orange-600">
                    <span>Sample Travel Plan:</span>
                  </div>
                  <div className="text-slate-600">
                    <strong>Day 1:</strong> {dest.sampleItinerary[0]?.title}
                  </div>
                  <div className="text-slate-600">
                    <strong>Day 2:</strong> {dest.sampleItinerary[1]?.title}
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="p-6 pt-0 flex items-center gap-2">
              <button
                onClick={() => onPlanTrip(dest.id)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 py-2.5 px-3 rounded-full transition-all shadow-xs cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Estimate Cost & Plan</span>
              </button>

              <button
                onClick={() => onExploreTours(dest.name)}
                className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 border border-slate-200 hover:bg-slate-100 py-2.5 px-3.5 rounded-full transition-colors cursor-pointer"
              >
                <span>Tours</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
