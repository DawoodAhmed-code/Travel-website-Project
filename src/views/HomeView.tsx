import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  Search,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Star,
  Compass,
  Phone,
  Plane,
  HeartHandshake,
  Award,
  ChevronRight,
  Clock,
  X,
  ExternalLink
} from 'lucide-react';
import { Tour } from '../types';
import { TourCard } from '../components/TourCard';
import { SAMPLE_REVIEWS } from '../data/seedData';
import { openGeneralWhatsAppInquiry } from '../utils/whatsapp';

interface HomeViewProps {
  tours: Tour[];
  onSelectTour: (tour: Tour) => void;
  onBookWhatsApp: (tour: Tour) => void;
  onNavigate: (view: string, param?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  tours,
  onSelectTour,
  onBookWhatsApp,
  onNavigate
}) => {
  // Search state matching the reference image's search form
  const [searchLocation, setSearchLocation] = useState('');
  const [searchPersons, setSearchPersons] = useState('2');
  const [searchDate, setSearchDate] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close predictive dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Predictive Tour & Destination Matching (filters in real-time as user types)
  const predictiveResults = useMemo(() => {
    const q = searchLocation.trim().toLowerCase();
    if (!q) return { matchingTours: [], matchingDestinations: [] };

    const matchingTours = tours.filter((t) => {
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchDest = t.destination.toLowerCase().includes(q);
      const matchRegion = t.region.toLowerCase().includes(q);
      return matchTitle || matchDest || matchRegion;
    });

    const destinationsSet = new Set<string>();
    tours.forEach((t) => {
      if (
        t.destination.toLowerCase().includes(q) ||
        t.region.toLowerCase().includes(q)
      ) {
        destinationsSet.add(t.destination);
      }
    });

    return {
      matchingTours: matchingTours.slice(0, 5),
      matchingDestinations: Array.from(destinationsSet).slice(0, 4),
    };
  }, [tours, searchLocation]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    onNavigate('tours', searchLocation);
  };

  const handleSelectPredictiveTour = (tour: Tour) => {
    setIsSearchFocused(false);
    onSelectTour(tour);
  };

  const handleSelectPredictiveDestination = (dest: string) => {
    setSearchLocation(dest);
    setIsSearchFocused(false);
    onNavigate('tours', dest);
  };

  const featuredTours = tours.slice(0, 6);

  return (
    <div className="space-y-24 pb-12 overflow-hidden">
      
      {/* 1. HERO SECTION - Strictly matching the layout, typography, colors, and floating badges from the reference image */}
      <section className="relative pt-8 sm:pt-14 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle background ambient glow */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-orange-100/60 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle, and Predictive Search Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200/60 px-3.5 py-1.5 rounded-full">
              <Plane className="w-3.5 h-3.5 text-orange-600 rotate-45" />
              <span>Explore the World & Pakistan —</span>
            </div>

            {/* Bold Headline matching reference */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Discover The <br />
              <span className="text-orange-600">Best Destinations</span> <br />
              In Pakistan
            </h1>

            {/* Subtitle */}
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
              Let's find your dream destinations here. We recommend you beautiful places, certified mountain expeditions, and a cheap, luxury trip with your beloved family.
            </p>

            {/* Predictive Search Container */}
            <div ref={searchContainerRef} className="relative mt-4">
              {/* Floating Search Form Card - precisely matching the pill-style input card in the image */}
              <form
                onSubmit={handleSearchSubmit}
                className="bg-white rounded-3xl sm:rounded-full p-2 sm:p-2.5 shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col sm:flex-row items-center gap-2 relative z-30"
              >
                {/* Location Input with Live Predictive Trigger */}
                <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full sm:w-auto border-b sm:border-b-0 sm:border-r border-slate-100 relative">
                  <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Location / Tour
                    </span>
                    <input
                      type="text"
                      value={searchLocation}
                      onFocus={() => setIsSearchFocused(true)}
                      onChange={(e) => {
                        setSearchLocation(e.target.value);
                        setIsSearchFocused(true);
                      }}
                      placeholder="e.g. Hunza, Skardu, Swat, Trek..."
                      className="w-full text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-hidden bg-transparent pr-4"
                      autoComplete="off"
                    />
                  </div>
                  {searchLocation && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchLocation('');
                        setIsSearchFocused(false);
                      }}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Persons Selector */}
                <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full sm:w-auto border-b sm:border-b-0 sm:border-r border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Person
                    </span>
                    <select
                      value={searchPersons}
                      onChange={(e) => setSearchPersons(e.target.value)}
                      className="w-full text-xs font-semibold text-slate-800 focus:outline-hidden bg-transparent cursor-pointer"
                    >
                      <option value="1">1 Person (Solo)</option>
                      <option value="2">2 Persons (Couple)</option>
                      <option value="4">4 Persons (Family)</option>
                      <option value="6">6+ Persons (Group)</option>
                    </select>
                  </div>
                </div>

                {/* Date Input */}
                <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full sm:w-auto">
                  <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Select Date
                    </span>
                    <input
                      type="date"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      className="w-full text-xs font-semibold text-slate-800 focus:outline-hidden bg-transparent cursor-pointer"
                    />
                  </div>
                </div>

                {/* Get Started Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg shadow-orange-500/25 transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <span>Explore Tours</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>

              {/* Predictive Search Dropdown Panel (Appears as user types in Location) */}
              {isSearchFocused && searchLocation.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 z-40 animate-in fade-in slide-in-from-top-2 duration-200">
                  
                  {/* Matching Destinations Chips */}
                  {predictiveResults.matchingDestinations.length > 0 && (
                    <div className="mb-3 pb-3 border-b border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                        Suggested Destinations
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {predictiveResults.matchingDestinations.map((dest) => (
                          <button
                            key={dest}
                            type="button"
                            onClick={() => handleSelectPredictiveDestination(dest)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-full text-xs font-semibold transition-colors"
                          >
                            <MapPin className="w-3 h-3 text-orange-600" />
                            <span>{dest}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Tour Packages List */}
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      <span>Matching Tour Packages</span>
                      <span>{predictiveResults.matchingTours.length} found</span>
                    </div>

                    {predictiveResults.matchingTours.length > 0 ? (
                      <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                        {predictiveResults.matchingTours.map((tour) => (
                          <div
                            key={tour.id}
                            onClick={() => handleSelectPredictiveTour(tour)}
                            className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer group"
                          >
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 shadow-xs">
                              <img
                                src={tour.coverImage}
                                alt={tour.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-slate-900 group-hover:text-orange-600 transition-colors truncate">
                                {tour.title}
                              </h4>
                              <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                                <span className="flex items-center gap-1 font-medium text-orange-600">
                                  <MapPin className="w-3 h-3" />
                                  {tour.destination}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {tour.durationDays}D/{tour.durationNights}N
                                </span>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="text-xs font-black text-slate-900 block">
                                PKR {tour.pricePerPerson.toLocaleString()}
                              </span>
                              <span className="text-[9px] text-slate-400 font-medium">per person</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-4 text-center text-xs text-slate-500">
                        No direct tour match for "<strong>{searchLocation}</strong>". Press Enter to view all tours or explore popular destinations below.
                      </div>
                    )}
                  </div>

                  {/* View All Matches Footer */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">
                      Press Enter to search all results
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchFocused(false);
                        onNavigate('tours', searchLocation);
                      }}
                      className="font-bold text-orange-600 hover:text-orange-700 hover:underline flex items-center gap-1"
                    >
                      <span>See all results for "{searchLocation}"</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              )}
            </div>

            {/* Quick destination tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Popular:</span>
              {['Hunza Valley', 'Skardu', 'Fairy Meadows', 'Swat', 'Neelum Valley'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchLocation(tag);
                    onNavigate('tours', tag);
                  }}
                  className="bg-white hover:bg-orange-50 hover:text-orange-600 border border-slate-200/80 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Hero Collage strictly following the multi-image & badge composition in the reference image */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Collage Container */}
            <div className="relative w-full max-w-md h-[460px] sm:h-[500px]">
              
              {/* Main Center Image */}
              <div className="absolute top-0 right-4 w-[60%] h-[75%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80"
                  alt="Attabad Lake Hunza"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom Left Secondary Image */}
              <div className="absolute bottom-2 left-0 w-[55%] h-[55%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                  alt="Skardu Valley"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badge 1: 100+ Destinations (matching reference image) */}
              <div className="absolute top-10 -left-4 sm:left-0 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20 animate-in fade-in slide-in-from-left duration-500">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                  100+
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">100+ Destinations</h4>
                  <p className="text-[10px] text-slate-500 leading-tight">Across Gilgit, Swat & Kashmir</p>
                </div>
              </div>

              {/* Floating Badge 2: 100% Verified (matching reference image) */}
              <div className="absolute top-2 right-0 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 z-20">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
                  ✓
                </div>
                <div className="text-[11px] font-bold text-slate-900">
                  100% Verified
                </div>
              </div>

              {/* Floating Badge 3: 4.9 Star Rating */}
              <div className="absolute bottom-6 right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 z-20">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900">4.9 / 5.0</div>
                  <div className="text-[10px] text-slate-400">2,000+ Traveler Reviews</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 2. ABOUT & MONTHLY RECOMMENDATIONS - Matching the middle section in the reference image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Overlapping Rounded Photo Mosaic on Left */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-lg h-56">
                  <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
                    alt="Fairy Meadows"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg h-44">
                  <img
                    src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80"
                    alt="Swat Valley"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="rounded-3xl overflow-hidden shadow-lg h-44">
                  <img
                    src="https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=600&q=80"
                    alt="Attabad Lake"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg h-56">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                    alt="Skardu Dunes"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Text & Stats (strictly matching reference layout) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-orange-600 text-xs font-bold uppercase tracking-wider">
              About —
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              We Recommend <br />
              <span className="text-orange-600">Beautiful Destinations</span> <br />
              Every Month
            </h2>

            <p className="text-slate-500 text-sm leading-relaxed">
              Let's choose your dream destinations here. We provide several choices of customized destinations and we offer the best travel packages every week with certified local drivers and premium hotel partnerships.
            </p>

            {/* 3 Metric Stat Boxes */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-black text-orange-600">2000+</div>
                <div className="text-xs font-bold text-slate-800 mt-1">Our Explorers</div>
                <div className="text-[10px] text-slate-400">Happy travelers</div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-black text-slate-900">100+</div>
                <div className="text-xs font-bold text-slate-800 mt-1">Destinations</div>
                <div className="text-[10px] text-slate-400">Across Pakistan</div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-black text-slate-900">12+</div>
                <div className="text-xs font-bold text-slate-800 mt-1">Years Experience</div>
                <div className="text-[10px] text-slate-400">Tour operations</div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-6 py-3 rounded-full transition-all shadow-md cursor-pointer"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 3. WHAT WE GIVE - BEST FEATURES FOR YOU (Directly matching the 3 feature cards in the image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-orange-600 text-xs font-bold uppercase tracking-wider">
            What We Give —
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Best Features For You
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            We will provide the best features for those of you who want to travel comfortably with your family and friends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs hover:shadow-lg transition-all text-center space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Lots of Choices</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We have provided several choices of destinations and very cheap traveling packages tailored to northern Pakistan circuits.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs hover:shadow-lg transition-all text-center space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Best Tour Guide</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We provide professional certified tour guides and kind local people who understand the history, language, and culture.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs hover:shadow-lg transition-all text-center space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Phone className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Easy WhatsApp Booking</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We make it easy for users to check available seats, review itineraries, and chat with tour advisors directly via WhatsApp.
            </p>
          </div>

        </div>
      </section>

      {/* 3.5. TRIP COST CALCULATOR & ROUTE PLANNER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-tr from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
                Pakistan Travel & Cost Calculator
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Calculate Cost From Your City & View Day-by-Day Visual Plans with Photos
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Apna city search karein (Islamabad, Lahore, Karachi, Peshawar, Quetta, Faisalabad, Gujrat, Swat ਸਮੇਤ 85+ cities), apni travel vehicle select karein (Local Transport, By Bus, ya Private 4x4 Prado / Sedan), aur Day 1, Day 2 se aakhri din tak har location ki real photos ke sath itinerary check karein!
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('planner')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-full shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
                >
                  <span>Launch Cost Calculator & Photo Planner</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('destinations')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 px-5 py-3 rounded-full transition-colors cursor-pointer"
                >
                  <span>Explore Famous Destinations</span>
                </button>
              </div>
            </div>

            {/* Quick Interactive Preview Widget */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3.5 text-xs text-white">
              <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                <span className="font-bold text-slate-200">Trip Distance & Cost Matrix</span>
                <span className="text-orange-400 font-bold">85+ Cities Database</span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-300">Any City → Hunza Valley & Attabad:</span>
                  <strong className="text-white">Day 1 to 7 Visual Photo Plan</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-300">Any City → Skardu & Deosai Plains:</span>
                  <strong className="text-white">Local / Bus / Private Prado</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-300">Any City → Swat, Kalam & Malam Jabba:</span>
                  <strong className="text-white">Motorway + 4x4 Jeep Routes</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-300">Any City → Neelum & Fairy Meadows:</span>
                  <strong className="text-white">Camp, Resort & Meal Estimates</strong>
                </div>
              </div>

              <div className="bg-orange-500/20 rounded-xl p-2.5 text-[10px] text-orange-200">
                ✓ Search any city • ✓ Local/Private/Bus transport options • ✓ High-res location photos for Day 1 & Day 2
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TOP DESTINATIONS SECTION - Matching the bottom section in the reference image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50/70 border border-slate-200/60 rounded-3xl p-6 sm:p-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <span className="text-orange-600 text-xs font-bold uppercase tracking-wider">
                Top Destination —
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Let's Explore Your Dream Destination Here!
              </h2>
              <p className="text-xs text-slate-500">
                We have recommended popular destinations every week so you don't have to worry about your dream destination with Traver.
              </p>
            </div>

            <button
              onClick={() => onNavigate('tours')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline shrink-0"
            >
              <span>View All Tour Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tour Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onSelect={onSelectTour}
                onBookWhatsApp={onBookWhatsApp}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 5. HOW IT WORKS WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-orange-600 text-xs font-bold uppercase tracking-wider">
            Booking Process —
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            How WhatsApp Booking Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Transparent, flexible, and real-time coordination for your peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Browse & Choose Tour',
              desc: 'Select from our verified northern Pakistan packages with day-by-day itineraries.'
            },
            {
              step: '02',
              title: 'Select Dates & Travellers',
              desc: 'Pick your preferred departure date and traveler count to see transparent PKR prices.'
            },
            {
              step: '03',
              title: 'Submit & Chat on WhatsApp',
              desc: 'Enquiry logs in our database and generates a pre-filled WhatsApp message with unique reference.'
            },
            {
              step: '04',
              title: 'Confirm with Agent',
              desc: 'Travel desk verifies seat availability, sends invoice, and shares packing checklist.'
            }
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs relative">
              <span className="text-3xl font-black text-orange-200 block mb-2">{item.step}</span>
              <h4 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TRAVELER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
            <span className="text-orange-600 text-xs font-bold uppercase tracking-wider">
              Traveler Stories —
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Loved By Families & Adventurers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAMPLE_REVIEWS.map((rev) => (
              <div key={rev.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200/60">
                  <h5 className="text-xs font-bold text-slate-900">{rev.authorName}</h5>
                  <p className="text-[10px] text-slate-400">{rev.location} • {rev.tourTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL DIRECT WHATSAPP CONSULTATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-tr from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">
              Custom Itineraries & Corporate Trips
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Need a Customized Tour in Northern Pakistan?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Planning a honeymoon, family reunion, or corporate offsite? Speak directly with our lead travel designer on WhatsApp.
            </p>
          </div>

          <button
            onClick={() => openGeneralWhatsAppInquiry('Customized Tour Request')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3.5 rounded-full flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all shrink-0 cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>Chat With Tour Specialist</span>
          </button>
        </div>
      </section>

    </div>
  );
};
