import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Calculator,
  Compass,
  MapPin,
  Calendar,
  Users,
  Car,
  Plane,
  Clock,
  Sparkles,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Search,
  Crosshair,
  Bus,
  ExternalLink,
  ChevronRight,
  Info,
  Navigation,
  X,
  Maximize2,
  Utensils,
  Bed,
  Luggage,
  Shield
} from 'lucide-react';
import {
  ORIGIN_CITIES,
  PLANNER_DESTINATIONS,
  VEHICLE_FACILITIES,
  calculateTripCost,
  PlannerDestination,
  VehicleFacility,
  OriginCity,
  ItineraryDayDetail
} from '../data/plannerData';
import { Tour } from '../types';
import { openWhatsAppChat } from '../utils/whatsapp';

interface TripPlannerViewProps {
  tours: Tour[];
  initialDestinationId?: string;
  onSelectTour: (tour: Tour) => void;
  onBookWhatsApp: (tour: Tour) => void;
}

export const TripPlannerView: React.FC<TripPlannerViewProps> = ({
  tours,
  initialDestinationId = 'hunza',
  onSelectTour,
  onBookWhatsApp
}) => {
  // Origin search state
  const [originSearch, setOriginSearch] = useState('');
  const [selectedOriginId, setSelectedOriginId] = useState<string>('isb');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [provinceFilter, setProvinceFilter] = useState<string>('All');

  // Destination & Parameters state
  const [selectedDestId, setSelectedDestId] = useState<string>(initialDestinationId);
  const [vehicleCategoryFilter, setVehicleCategoryFilter] = useState<'all' | 'bus' | 'private' | 'local' | 'flight'>('all');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('private-prado');
  const [days, setDays] = useState<number>(5);
  const [travellers, setTravellers] = useState<number>(2);
  const [travelStyle, setTravelStyle] = useState<'Standard' | 'Luxury' | 'Budget'>('Standard');

  // Photo Lightbox Modal
  const [activePhotoModal, setActivePhotoModal] = useState<ItineraryDayDetail | null>(null);

  // AI Itinerary Generation State
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [copiedPlan, setCopiedPlan] = useState<boolean>(false);

  const cityDropdownRef = useRef<HTMLDivElement>(null);

  // Sync initialDestinationId if it changes
  useEffect(() => {
    if (initialDestinationId && PLANNER_DESTINATIONS.some(d => d.id === initialDestinationId)) {
      setSelectedDestId(initialDestinationId);
    }
  }, [initialDestinationId]);

  // Close city dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered cities based on search & province
  const filteredCities = useMemo(() => {
    let list = ORIGIN_CITIES;
    if (provinceFilter !== 'All') {
      if (provinceFilter === 'Islamabad') {
        list = list.filter(c => c.province === 'Capital Territory');
      } else {
        list = list.filter(c => c.province.toLowerCase().includes(provinceFilter.toLowerCase()));
      }
    }
    const q = originSearch.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.province.toLowerCase().includes(q) ||
        (c.division && c.division.toLowerCase().includes(q))
    );
  }, [originSearch, provinceFilter]);

  const selectedOrigin = useMemo(() => {
    return ORIGIN_CITIES.find(c => c.id === selectedOriginId) || ORIGIN_CITIES[0];
  }, [selectedOriginId]);

  const currentDest = useMemo(() => {
    return PLANNER_DESTINATIONS.find(d => d.id === selectedDestId) || PLANNER_DESTINATIONS[0];
  }, [selectedDestId]);

  const filteredVehicles = useMemo(() => {
    if (vehicleCategoryFilter === 'all') return VEHICLE_FACILITIES;
    return VEHICLE_FACILITIES.filter(v => v.categoryGroup === vehicleCategoryFilter);
  }, [vehicleCategoryFilter]);

  const selectedVehicle = useMemo(() => {
    return VEHICLE_FACILITIES.find(v => v.id === selectedVehicleId) || VEHICLE_FACILITIES[0];
  }, [selectedVehicleId]);

  // Real-Time Cost Calculation
  const costEstimate = useMemo(() => {
    return calculateTripCost(
      selectedOriginId,
      selectedDestId,
      selectedVehicleId,
      days,
      travellers,
      travelStyle
    );
  }, [selectedOriginId, selectedDestId, selectedVehicleId, days, travellers, travelStyle]);

  // Matched Tour Package
  const matchedTour = useMemo(() => {
    return tours.find(t => t.slug === currentDest.slug) || tours[0];
  }, [tours, currentDest]);

  // Handle GPS location detection
  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          if (lat < 27) {
            setSelectedOriginId('khi'); // Karachi / Sindh
          } else if (lat < 30) {
            setSelectedOriginId('uet'); // Quetta / South
          } else if (lat < 32) {
            setSelectedOriginId('lhr'); // Lahore / Central Punjab
          } else if (lat > 33.8) {
            setSelectedOriginId('pew'); // KPK / Peshawar
          } else {
            setSelectedOriginId('isb'); // Islamabad / Rawalpindi
          }
          setIsCityDropdownOpen(false);
        },
        () => {
          setSelectedOriginId('isb');
        }
      );
    }
  };

  const handleCopyItinerary = () => {
    let text = `TRAVER PAKISTAN TOUR PLAN: ${selectedOrigin.name} ➔ ${currentDest.name}\n`;
    text += `Duration: ${days} Days / ${Math.max(1, days - 1)} Nights\n`;
    text += `Vehicle Facility: ${selectedVehicle.name}\n`;
    text += `Party Size: ${travellers} Persons | Travel Comfort: ${travelStyle}\n`;
    text += `Estimated Total Cost: PKR ${costEstimate.costs.totalPKR.toLocaleString()} (PKR ${costEstimate.costs.perPersonPKR.toLocaleString()} / person)\n\n`;

    const planToCopy = currentDest.sampleItinerary.slice(0, days);
    planToCopy.forEach((d) => {
      text += `Day ${d.day}: ${d.title} (${d.locationName})\n`;
      text += `• Highlights: ${d.highlights.join(', ')}\n`;
      text += `• Travel Time: ${d.travelTime}\n`;
      text += `• Food Tip: ${d.foodTip}\n`;
      text += `• Night Stay: ${d.stayRecommendation}\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2500);
  };

  const handleWhatsAppBooking = () => {
    openWhatsAppChat({
      tourTitle: `${currentDest.name} (${days} Days via ${selectedVehicle.name})`,
      destination: currentDest.name,
      departureDate: `Flexible departure from ${selectedOrigin.name}`,
      travellerCount: travellers,
      pricePerPerson: costEstimate.costs.perPersonPKR,
      totalPrice: costEstimate.costs.totalPKR,
      tourSlug: currentDest.slug,
    });
  };

  const PROVINCES = ['All', 'Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Islamabad', 'Azad Kashmir', 'Gilgit-Baltistan'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200/60">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Pakistan Travel & Cost Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Calculate Trip Cost & Day-by-Day Visual Travel Plan
        </h1>
        <p className="text-xs sm:text-base text-slate-500">
          Apna city search karein, apni pasand ki vehicle facility (Local transport, By bus, ya Private 4x4 / Car) select karein, aur har din ka visual travel plan photos ke sath check karein!
        </p>
      </div>

      {/* Main Grid: Controls (Left) & Live Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (5 cols): Parameter Controls */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-xl space-y-6">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Compass className="w-4 h-4 text-orange-600" />
            <span>Trip Parameters & Vehicle Facilities</span>
          </h2>

          {/* 1. COMPREHENSIVE SEARCHABLE ORIGIN CITY INPUT */}
          <div ref={cityDropdownRef} className="relative">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <span>My Location (Origin City in Pakistan)</span>
              </label>
              <button
                type="button"
                onClick={handleDetectLocation}
                className="text-[11px] text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                title="Detect city via browser location"
              >
                <Crosshair className="w-3 h-3" />
                <span>Detect Nearest City</span>
              </button>
            </div>

            {/* City Search Bar & Selected Display */}
            <div
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="w-full flex items-center justify-between p-3.5 bg-slate-50 border-2 border-slate-200 hover:border-orange-500 rounded-2xl cursor-pointer transition-all shadow-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold shrink-0">
                  📍
                </div>
                <div className="text-left truncate">
                  <span className="text-sm font-black text-slate-900 block truncate">
                    {selectedOrigin.name}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {selectedOrigin.province} • {selectedOrigin.distanceToCapitalKm === 0 ? 'Northern Gateway Hub' : `${selectedOrigin.distanceToCapitalKm} km to Motorway`}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-orange-600 shadow-xs">
                <Search className="w-3 h-3" />
                <span>Search / Change</span>
              </div>
            </div>

            {/* Searchable Dropdown Modal / Panel */}
            {isCityDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                
                {/* Search Input Bar with Clear Button */}
                <div className="relative mb-3">
                  <Search className="w-4 h-4 text-orange-600 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={originSearch}
                    onChange={(e) => setOriginSearch(e.target.value)}
                    placeholder="Search any Pakistani city (e.g. Lahore, Karachi, Abbottabad, Swat, Gujrat, Quetta)..."
                    autoFocus
                    className="w-full pl-10 pr-9 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500 focus:bg-white text-slate-900 placeholder:text-slate-400"
                  />
                  {originSearch && (
                    <button
                      type="button"
                      onClick={() => setOriginSearch('')}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Province Filter Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-2 scrollbar-none text-[10px]">
                  {PROVINCES.map((prov) => (
                    <button
                      key={prov}
                      type="button"
                      onClick={() => setProvinceFilter(prov)}
                      className={`px-2.5 py-1 rounded-full font-bold whitespace-nowrap transition-colors cursor-pointer ${
                        provinceFilter === prov
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {prov === 'Khyber Pakhtunkhwa' ? 'KPK' : prov}
                    </button>
                  ))}
                </div>

                {/* Quick Popular City Chips */}
                <div className="flex flex-wrap gap-1 mb-2 pb-2.5 border-b border-slate-100">
                  <span className="text-[10px] text-slate-400 font-semibold self-center mr-1">Popular:</span>
                  {['Islamabad', 'Lahore', 'Karachi', 'Peshawar', 'Faisalabad', 'Multan', 'Sialkot', 'Quetta', 'Abbottabad', 'Swat'].map((cityName) => {
                    const match = ORIGIN_CITIES.find(c => c.name.toLowerCase().includes(cityName.toLowerCase()));
                    if (!match) return null;
                    return (
                      <button
                        key={match.id}
                        type="button"
                        onClick={() => {
                          setSelectedOriginId(match.id);
                          setIsCityDropdownOpen(false);
                          setOriginSearch('');
                        }}
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                          selectedOriginId === match.id
                            ? 'bg-orange-600 text-white border-orange-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-orange-50 hover:border-orange-200'
                        }`}
                      >
                        {cityName}
                      </button>
                    );
                  })}
                </div>

                {/* Cities Scrollable List */}
                <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
                  <div className="text-[10px] text-slate-400 font-bold px-2 py-1">
                    Showing {filteredCities.length} Pakistani Cities
                  </div>
                  {filteredCities.map((city) => (
                    <div
                      key={city.id}
                      onClick={() => {
                        setSelectedOriginId(city.id);
                        setIsCityDropdownOpen(false);
                        setOriginSearch('');
                      }}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs cursor-pointer transition-all ${
                        selectedOriginId === city.id
                          ? 'bg-orange-500 text-white font-bold shadow-xs'
                          : 'hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <MapPin className={`w-3.5 h-3.5 shrink-0 ${selectedOriginId === city.id ? 'text-white' : 'text-orange-600'}`} />
                        <div>
                          <span className="block leading-tight">{city.name}</span>
                          <span className={`text-[10px] block ${selectedOriginId === city.id ? 'text-orange-100' : 'text-slate-400'}`}>
                            {city.division ? `${city.division} Div • ` : ''}{city.province}
                          </span>
                        </div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 font-medium ${
                        selectedOriginId === city.id
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {city.distanceToCapitalKm === 0 ? 'Hub' : `${city.distanceToCapitalKm} km`}
                      </span>
                    </div>
                  ))}
                  {filteredCities.length === 0 && (
                    <div className="py-6 text-center text-xs text-slate-400">
                      No matching city found. Please try searching another spelling.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 2. CHOOSE FAMOUS DESTINATION */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Choose Travel Destination in Pakistan</span>
              <span className="text-[10px] text-orange-600 font-semibold">{PLANNER_DESTINATIONS.length} Famous Places</span>
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              <select
                value={selectedDestId}
                onChange={(e) => setSelectedDestId(e.target.value)}
                className="w-full px-3.5 py-3 text-xs font-bold bg-slate-50 border-2 border-slate-200 hover:border-orange-500 rounded-2xl focus:outline-hidden focus:border-orange-500 text-slate-900 cursor-pointer shadow-xs transition-colors"
              >
                {PLANNER_DESTINATIONS.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name} — {dest.region} ({dest.recommendedDays} Days Recommended)
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 italic">
              ✨ {currentDest.tagline}
            </p>
          </div>

          {/* 3. VEHICLE & TRANSPORT FACILITIES (LOCAL, PRIVATE, BY BUS) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-orange-600" />
                <span>Vehicle Facilities / Travel Mode</span>
              </label>
              <span className="text-[10px] text-slate-400 font-semibold">Local, Bus & Private</span>
            </div>

            {/* Vehicle Category Filter Tabs */}
            <div className="grid grid-cols-5 gap-1 bg-slate-100 p-1 rounded-2xl text-[10px] font-bold">
              {[
                { id: 'all', label: 'All' },
                { id: 'bus', label: '🚌 By Bus' },
                { id: 'private', label: '🚗 Private' },
                { id: 'local', label: '🚐 Local' },
                { id: 'flight', label: '✈ By Air' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setVehicleCategoryFilter(tab.id as any)}
                  className={`py-1.5 px-1 rounded-xl text-center transition-all cursor-pointer ${
                    vehicleCategoryFilter === tab.id
                      ? 'bg-white text-orange-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Vehicle Cards List */}
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {filteredVehicles.map((v) => {
                const isSelected = selectedVehicleId === v.id;
                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVehicleId(v.id)}
                    className={`p-3.5 rounded-2xl border-2 text-xs cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-orange-600 bg-orange-50/70 shadow-sm ring-1 ring-orange-500/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {v.iconName === 'suv' && <Car className="w-4 h-4" />}
                      {v.iconName === 'car' && <Car className="w-4 h-4" />}
                      {v.iconName === 'bus' && <Bus className="w-4 h-4" />}
                      {v.iconName === 'plane' && <Plane className="w-4 h-4" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-black text-slate-900 leading-tight truncate">{v.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 border ${v.badgeColor}`}>
                          {v.tag}
                        </span>
                      </div>
                      
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {v.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-500 mt-2 font-medium">
                        <span>👥 {v.capacityText}</span>
                        <span>•</span>
                        <span>🧳 {v.baggageAllowance}</span>
                      </div>

                      {/* Included perks preview */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {v.features.slice(0, 2).map((feat, fi) => (
                          <span key={fi} className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. DURATION & TRAVELLERS */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Trip Duration (Days)
              </label>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-1.5">
                <button
                  type="button"
                  onClick={() => setDays(Math.max(2, days - 1))}
                  className="w-8 h-8 rounded-xl bg-white text-slate-800 font-bold text-xs flex items-center justify-center hover:bg-slate-100 shadow-xs cursor-pointer"
                >
                  -
                </button>
                <div className="flex-1 text-center font-black text-xs text-slate-900">
                  {days} Days
                </div>
                <button
                  type="button"
                  onClick={() => setDays(Math.min(14, days + 1))}
                  className="w-8 h-8 rounded-xl bg-white text-slate-800 font-bold text-xs flex items-center justify-center hover:bg-slate-100 shadow-xs cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Travellers (Persons)
              </label>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-1.5">
                <button
                  type="button"
                  onClick={() => setTravellers(Math.max(1, travellers - 1))}
                  className="w-8 h-8 rounded-xl bg-white text-slate-800 font-bold text-xs flex items-center justify-center hover:bg-slate-100 shadow-xs cursor-pointer"
                >
                  -
                </button>
                <div className="flex-1 text-center font-black text-xs text-slate-900">
                  {travellers} Person{travellers > 1 ? 's' : ''}
                </div>
                <button
                  type="button"
                  onClick={() => setTravellers(travellers + 1)}
                  className="w-8 h-8 rounded-xl bg-white text-slate-800 font-bold text-xs flex items-center justify-center hover:bg-slate-100 shadow-xs cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 5. HOTEL COMFORT LEVEL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Hotel Comfort & Stay Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Budget', 'Standard', 'Luxury'] as const).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setTravelStyle(style)}
                  className={`py-2 px-1 text-center rounded-2xl border-2 text-xs font-bold transition-all cursor-pointer ${
                    travelStyle === style
                      ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (7 cols): Cost Estimation & Photo Itinerary */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Real-Time Cost Calculation Card */}
          <div className="bg-linear-to-tr from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-orange-400 text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" />
                  Live Estimated Trip Cost Breakdown
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {selectedOrigin.name} ➔ {currentDest.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  via <strong className="text-orange-400">{selectedVehicle.name}</strong> • {costEstimate.totalDistanceKm} km one-way (~{costEstimate.oneWayHours} hrs transit)
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-2xl sm:text-3xl font-black text-orange-400 block">
                  PKR {costEstimate.costs.totalPKR.toLocaleString()}
                </span>
                <span className="text-xs text-slate-300">
                  ≈ PKR {costEstimate.costs.perPersonPKR.toLocaleString()} / person ({travellers} travellers)
                </span>
              </div>
            </div>

            {/* Cost Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                <span className="text-slate-400 text-[10px] block">Vehicle & Transit</span>
                <strong className="text-white font-bold text-sm">
                  PKR {(costEstimate.costs.transportFuelPKR + costEstimate.costs.flightTicketsPKR).toLocaleString()}
                </strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">{selectedVehicle.tag}</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                <span className="text-slate-400 text-[10px] block">
                  Hotels ({days - 1} Nights)
                </span>
                <strong className="text-white font-bold text-sm">
                  PKR {costEstimate.costs.accommodationPKR.toLocaleString()}
                </strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">{travelStyle} Rooms</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                <span className="text-slate-400 text-[10px] block">Meals & Dining</span>
                <strong className="text-white font-bold text-sm">
                  PKR {costEstimate.costs.mealsPKR.toLocaleString()}
                </strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">{days} days meals</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                <span className="text-slate-400 text-[10px] block">Mountain Jeeps & Passes</span>
                <strong className="text-white font-bold text-sm">
                  PKR {(costEstimate.costs.mountainJeepsPKR + costEstimate.costs.activityFeesPKR).toLocaleString()}
                </strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">Offroad & Entry</span>
              </div>
            </div>

            {/* Inclusions Note */}
            <div className="bg-white/5 rounded-xl p-2.5 text-[11px] text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Includes vehicle fuel, chauffeur accommodation & food, road motorway tolls, and certified local guidance.</span>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <button
                onClick={handleWhatsAppBooking}
                className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3.5 px-5 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Book This Custom Tour via WhatsApp</span>
              </button>

              <button
                onClick={handleCopyItinerary}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-3.5 px-4 rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Copy itinerary text"
              >
                {copiedPlan ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPlan ? 'Plan Copied!' : 'Copy Plan'}</span>
              </button>
            </div>
          </div>

          {/* DAY-BY-DAY VISUAL ITINERARY WITH EXACT LOCATION PICTURES */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                  Visual Tour Planning with Real Location Photos
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {days}-Day Itinerary for {currentDest.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Day 1, Day 2, Day 3... Har location ki picture aur travel plan check karein:
                </p>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3.5 py-1.5 rounded-full self-start sm:self-center">
                {days} Days / {Math.max(1, days - 1)} Nights Plan
              </span>
            </div>

            {/* Daily Cards with Location Pictures */}
            <div className="space-y-6">
              {currentDest.sampleItinerary.slice(0, days).map((d) => (
                <div
                  key={d.day}
                  className="rounded-3xl border-2 border-slate-100 hover:border-orange-300 overflow-hidden shadow-xs hover:shadow-md transition-all bg-white flex flex-col md:flex-row group"
                >
                  {/* Location Picture for That Day */}
                  <div className="md:w-5/12 aspect-16/10 md:aspect-auto overflow-hidden bg-slate-100 relative shrink-0">
                    <img
                      src={d.image}
                      alt={d.locationName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => setActivePhotoModal(d)}
                      loading="lazy"
                    />
                    
                    {/* Day Badge */}
                    <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                      <span>Day {d.day}</span>
                    </div>

                    {/* Expand Photo Button */}
                    <button
                      type="button"
                      onClick={() => setActivePhotoModal(d)}
                      className="absolute top-3 right-3 w-7 h-7 bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                      title="View full location picture"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Exact Location Name Badge */}
                    <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1.5 rounded-xl truncate flex items-center gap-1">
                      <span className="text-orange-400">📍</span>
                      <span className="truncate">{d.locationName}</span>
                    </div>
                  </div>

                  {/* Day Plan Content */}
                  <div className="p-5 md:w-7/12 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-base font-black text-slate-900 leading-snug">
                          {d.title}
                        </h4>
                        <span className="text-[10px] text-slate-500 shrink-0 font-bold bg-slate-100 px-2 py-0.5 rounded-md">
                          ⏱ {d.travelTime}
                        </span>
                      </div>

                      {/* Daily Plan Schedule / Highlights */}
                      <div className="space-y-1.5 mt-3">
                        {d.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                            <span className="leading-relaxed">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specialty Dish & Night Stay */}
                    <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-start gap-1.5">
                        <span className="text-orange-600 font-bold shrink-0">🍽 Specialty Dish:</span>
                        <span className="text-slate-800 font-medium">{d.foodTip}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold shrink-0">🏨 Night Stay:</span>
                        <span className="text-slate-800 font-medium">{d.stayRecommendation}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Matched Ready Package CTA */}
            {matchedTour && (
              <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-orange-700 block">
                    Verified Fixed Departure Tour Package
                  </span>
                  <span className="text-xs font-bold text-slate-900">
                    {matchedTour.title} (PKR {matchedTour.pricePerPerson.toLocaleString()} / person)
                  </span>
                </div>
                <button
                  onClick={() => onSelectTour(matchedTour)}
                  className="text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full shadow-xs shrink-0 cursor-pointer"
                >
                  View Fixed Tour
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* FULL PHOTO LIGHTBOX MODAL */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            {/* Close button */}
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Image */}
            <div className="aspect-16/10 w-full overflow-hidden bg-black">
              <img
                src={activePhotoModal.image}
                alt={activePhotoModal.locationName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description Bar */}
            <div className="p-5 text-white space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-orange-600 text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                  Day {activePhotoModal.day}
                </span>
                <span className="text-sm font-black text-white">
                  {activePhotoModal.title}
                </span>
              </div>
              <p className="text-xs text-orange-300 font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activePhotoModal.locationName}</span>
              </p>
              <div className="text-xs text-slate-300 flex flex-wrap gap-x-4 gap-y-1 pt-1">
                <span>⏱ Transit: {activePhotoModal.travelTime}</span>
                <span>🍽 Food: {activePhotoModal.foodTip}</span>
                <span>🏨 Stay: {activePhotoModal.stayRecommendation}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
