import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  MapPin,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { Tour } from '../types';
import { TourCard } from '../components/TourCard';

interface ToursViewProps {
  tours: Tour[];
  initialSearch?: string;
  onSelectTour: (tour: Tour) => void;
  onBookWhatsApp: (tour: Tour) => void;
}

export const ToursView: React.FC<ToursViewProps> = ({
  tours,
  initialSearch = '',
  onSelectTour,
  onBookWhatsApp
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedDestination, setSelectedDestination] = useState<string>('All');
  const [selectedDuration, setSelectedDuration] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(120000);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'duration'>('recommended');

  const destinationsList = useMemo(() => {
    const list = Array.from(new Set(tours.map(t => t.destination)));
    return ['All', ...list];
  }, [tours]);

  const filteredTours = useMemo(() => {
    return tours
      .filter((tour) => {
        // Search term check
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchTitle = tour.title.toLowerCase().includes(q);
          const matchDest = tour.destination.toLowerCase().includes(q);
          const matchRegion = tour.region.toLowerCase().includes(q);
          if (!matchTitle && !matchDest && !matchRegion) return false;
        }

        // Destination filter
        if (selectedDestination !== 'All' && tour.destination !== selectedDestination) {
          return false;
        }

        // Duration filter
        if (selectedDuration === 'short' && tour.durationDays > 4) return false;
        if (selectedDuration === 'medium' && (tour.durationDays < 5 || tour.durationDays > 7)) return false;
        if (selectedDuration === 'long' && tour.durationDays < 8) return false;

        // Price filter
        if (tour.pricePerPerson > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.pricePerPerson - b.pricePerPerson;
        if (sortBy === 'price-desc') return b.pricePerPerson - a.pricePerPerson;
        if (sortBy === 'duration') return a.durationDays - b.durationDays;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [tours, searchTerm, selectedDestination, selectedDuration, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDestination('All');
    setSelectedDuration('All');
    setMaxPrice(120000);
    setSortBy('recommended');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200/60">
          Pakistan Tour Packages
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Explore Curated Northern Adventures
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          From the turquoise waters of Attabad Lake to the ancient forts of Skardu and green meadows of Kashmir.
        </p>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
        
        {/* Search & Sort row */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by tour name, valley, or region..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200/80 rounded-full focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200/80 rounded-full px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
              >
                <option value="recommended">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration">Duration: Short to Long</option>
              </select>
            </div>

            <button
              onClick={handleResetFilters}
              title="Reset all filters"
              className="p-2.5 rounded-full border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Pills row */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs">
          
          {/* Destination chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-slate-600 mr-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-orange-600" />
              Destination:
            </span>
            {destinationsList.map((dest) => (
              <button
                key={dest}
                onClick={() => setSelectedDestination(dest)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedDestination === dest
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dest}
              </button>
            ))}
          </div>

          {/* Duration chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-slate-600 mr-1">Duration:</span>
            {[
              { id: 'All', label: 'All Durations' },
              { id: 'short', label: '1 - 4 Days' },
              { id: 'medium', label: '5 - 7 Days' },
              { id: 'long', label: '8+ Days' }
            ].map((dur) => (
              <button
                key={dur.id}
                onClick={() => setSelectedDuration(dur.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedDuration === dur.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dur.label}
              </button>
            ))}
          </div>

          {/* Price slider */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-slate-500">Max:</span>
            <span className="font-bold text-slate-900">PKR {maxPrice.toLocaleString()}</span>
            <input
              type="range"
              min="20000"
              max="120000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-orange-600 cursor-pointer w-28"
            />
          </div>

        </div>

      </div>

      {/* Tour Grid or Empty State */}
      {filteredTours.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Showing <strong className="text-slate-900">{filteredTours.length}</strong> available tour package{filteredTours.length > 1 ? 's' : ''}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onSelect={onSelectTour}
                onBookWhatsApp={onBookWhatsApp}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-xs max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Tours Match Your Criteria</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search keywords, price slider, or destination filters to find more adventures.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-full bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 transition-colors shadow-xs"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
