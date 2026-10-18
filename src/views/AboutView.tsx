import React from 'react';
import {
  ShieldCheck,
  Award,
  HeartHandshake,
  Users,
  Compass,
  Car,
  Phone,
  ArrowRight,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { openGeneralWhatsAppInquiry } from '../utils/whatsapp';

interface AboutViewProps {
  onNavigateTours: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigateTours }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200/60">
          About Traver Pakistan
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Unlocking The World’s Most Breathtaking Mountains & Valleys
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Founded in Islamabad, Traver is Pakistan’s foremost travel management company dedicated to showcasing the natural splendor, ancient heritage, and warm hospitality of Gilgit-Baltistan, Khyber Pakhtunkhwa, Azad Kashmir, and Punjab.
        </p>
      </div>

      {/* Visual Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-3xl overflow-hidden shadow-lg h-72">
          <img
            src="https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80"
            alt="Hunza Valley"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="rounded-3xl overflow-hidden shadow-lg h-72 md:-mt-6">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
            alt="Fairy Meadows"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="rounded-3xl overflow-hidden shadow-lg h-72">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            alt="Skardu Dunes"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Mission & Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            To make Pakistan's extraordinary northern destinations effortlessly accessible to local families and overseas travelers through honest pricing, authentic itineraries, and seamless WhatsApp communication.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Safety First</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every vehicle is mechanically inspected prior to mountain pass ascents. Our guides are trained in wilderness first aid and carry high-altitude oxygen supplies for passes above 3,500m.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Responsible Tourism</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We partner with indigenous Balti, Wakhi, and Kohistani communities. We practice Leave No Trace principles across fragile high-altitude ecosystems like Deosai and Fairy Meadows.
          </p>
        </div>
      </div>

      {/* Fleet & Services details */}
      <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/60">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
              Fleet & Guides —
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why 2,000+ Explorers Choose Traver
            </h2>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Fleet of 4x4 Mountain Vehicles:</strong> Toyota Land Cruiser Prados and custom-rigged Willy's and Hilux mountain jeeps for challenging tracks like Tattu and Deosai.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Luxury Saloon Coasters:</strong> Air-conditioned Toyota Coasters and Hiace Grand Cabins with reclining executive seating for smooth motorway travel.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Licensed Guides:</strong> DTS-certified guides fluent in English, Urdu, Shina, and Balti who know hidden photo points and local stories.
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onNavigateTours}
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-full shadow-md transition-all cursor-pointer"
              >
                <span>Browse Tour Packages</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openGeneralWhatsAppInquiry('Agency Consultation')}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 px-6 py-3 rounded-full transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Speak with Founder</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Our Operational Hubs</h4>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span>Islamabad Operations HQ</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Executive Tower, Jinnah Avenue, Blue Area, Islamabad
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span>Lahore Branch Office</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Main Boulevard, Gulberg III, Lahore
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span>Gilgit Base Camp & Logistics Desk</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Airport Road, Jutial, Gilgit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
