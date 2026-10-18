import React, { useState, useEffect } from 'react';
import {
  Shield,
  Package,
  BookmarkCheck,
  Users,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  RotateCcw,
  Save,
  Search,
  Settings,
  Mail,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Tour, BookingEnquiry, ContactMessage, EnquiryStatus } from '../types';
import {
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  seedDefaultTours
} from '../services/tourService';
import {
  getAllEnquiries,
  updateEnquiryStatus
} from '../services/enquiryService';
import { getAllContactMessages } from '../services/contactService';
import {
  getAgencyWhatsAppNumber,
  setAgencyWhatsAppNumber
} from '../utils/whatsapp';

interface AdminViewProps {
  onNavigateHome: () => void;
  onNavigateTour: (slug: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onNavigateHome, onNavigateTour }) => {
  const { user, isAdmin, simulateAdminMode } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'tours' | 'messages' | 'settings'>('overview');

  const [tours, setTours] = useState<Tour[]>([]);
  const [enquiries, setEnquiries] = useState<BookingEnquiry[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // Tour Form State (Create / Edit)
  const [isEditingTour, setIsEditingTour] = useState(false);
  const [editingTourId, setEditingTourId] = useState<string | null>(null);
  const [tourForm, setTourForm] = useState({
    title: '',
    slug: '',
    destination: '',
    region: 'Gilgit-Baltistan',
    pricePerPerson: 60000,
    durationDays: 5,
    durationNights: 4,
    shortDescription: '',
    description: '',
    coverImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    meetingPoint: 'Islamabad I-8 / Airport',
    difficulty: 'Moderate' as 'Easy' | 'Moderate' | 'Challenging' | 'Strenuous',
    published: true,
    featured: false,
  });

  // Settings state
  const [agencyPhone, setAgencyPhone] = useState(getAgencyWhatsAppNumber());
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [tList, eList, mList] = await Promise.all([
        getAllTours(true),
        getAllEnquiries(),
        getAllContactMessages(),
      ]);
      setTours(tList);
      setEnquiries(eList);
      setMessages(mList);
    } catch (err) {
      console.warn('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (enquiryId: string, status: EnquiryStatus, notes?: string) => {
    try {
      await updateEnquiryStatus(enquiryId, status, notes);
      setEnquiries(prev =>
        prev.map(e => (e.id === enquiryId ? { ...e, status, adminNotes: notes ?? e.adminNotes } : e))
      );
    } catch (err) {
      console.error(err);
      alert('Failed to update enquiry status.');
    }
  };

  const handleSaveTour = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTourId) {
        await updateTour(editingTourId, { ...tourForm });
      } else {
        await createTour({
          ...tourForm,
          images: [tourForm.coverImage],
          itinerary: [
            {
              day: 1,
              title: 'Departure & Scenic Journey',
              description: 'Travel from meeting point into the majestic northern mountain valley.',
              meal: 'Breakfast & Dinner',
              accommodation: 'Mountain View Hotel'
            },
            {
              day: 2,
              title: 'Exploration & Sightseeing',
              description: 'Full day excursion to iconic viewpoints, lakes, and cultural monuments.',
              meal: 'Breakfast & Dinner',
              accommodation: 'Mountain View Hotel'
            }
          ],
          includedServices: [
            'AC Transport and fuel throughout tour',
            'Hotel accommodation on twin sharing basis',
            'Daily breakfast and buffet dinners',
            'Certified licensed tour guide'
          ],
          excludedServices: [
            'Lunch and personal snacks',
            'Personal luggage porter services'
          ],
          departureDates: [
            { date: '2026-11-15', seatsTotal: 20, seatsAvailable: 15, status: 'Available' },
            { date: '2026-12-01', seatsTotal: 20, seatsAvailable: 20, status: 'Available' }
          ],
          rating: 5.0,
          reviewsCount: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      setIsEditingTour(false);
      setEditingTourId(null);
      await loadAllData();
    } catch (err) {
      console.error(err);
      alert('Failed to save tour package.');
    }
  };

  const handleDeleteTour = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete tour "${title}"?`)) {
      try {
        await deleteTour(id);
        setTours(prev => prev.filter(t => t.id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete tour.');
      }
    }
  };

  const handleSeedTours = async () => {
    if (confirm('Re-seed initial Pakistani tour packages into Firestore?')) {
      setLoading(true);
      await seedDefaultTours();
      await loadAllData();
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setAgencyWhatsAppNumber(agencyPhone);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-100 shadow-md text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Access Restricted</h2>
        <p className="text-xs text-slate-500">
          This panel is restricted to authorized Traver travel agency administrators.
        </p>
        <button
          onClick={onNavigateHome}
          className="py-2.5 px-6 rounded-full bg-slate-900 text-white font-bold text-xs"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  // Calculate metrics
  const pendingCount = enquiries.filter(e => e.status === 'Pending').length;
  const confirmedCount = enquiries.filter(e => e.status === 'Confirmed').length;
  const pipelinePKR = enquiries
    .filter(e => e.status !== 'Cancelled')
    .reduce((sum, e) => sum + (e.quotedTotal || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/20 px-3 py-1 rounded-full">
              Agency Control Center
            </span>
            {simulateAdminMode && (
              <span className="text-[10px] bg-purple-500/30 text-purple-200 px-2.5 py-0.5 rounded-full font-semibold">
                Preview Mode
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Traver Tour Operations Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Signed in as: <strong className="text-slate-200">{user?.email || 'Admin'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSeedTours}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-full border border-slate-700 transition-colors"
            title="Seed initial tours into Firestore"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Seed Sample Tours</span>
          </button>
          
          <button
            onClick={() => {
              setEditingTourId(null);
              setTourForm({
                title: '',
                slug: `tour-${Date.now()}`,
                destination: 'Hunza Valley',
                region: 'Gilgit-Baltistan',
                pricePerPerson: 55000,
                durationDays: 5,
                durationNights: 4,
                shortDescription: '',
                description: '',
                coverImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
                meetingPoint: 'Islamabad Faizabad / Airport',
                difficulty: 'Moderate',
                published: true,
                featured: false,
              });
              setIsEditingTour(true);
              setActiveTab('tours');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 px-4 py-2.5 rounded-full shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Tour</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-xs sm:text-sm overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview Metrics', icon: Shield },
          { id: 'enquiries', label: `Booking Enquiries (${enquiries.length})`, icon: BookmarkCheck },
          { id: 'tours', label: `Tour Packages (${tours.length})`, icon: Package },
          { id: 'messages', label: `Contact Inquiries (${messages.length})`, icon: Mail },
          { id: 'settings', label: 'Agency WhatsApp & Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Total Enquiries</span>
                <BookmarkCheck className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-3xl font-black text-slate-900 mt-2">{enquiries.length}</div>
              <p className="text-[11px] text-slate-400 mt-1">Logged from web & WhatsApp</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Pending Action</span>
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-3xl font-black text-amber-600 mt-2">{pendingCount}</div>
              <p className="text-[11px] text-slate-400 mt-1">Requires WhatsApp reply</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Confirmed Bookings</span>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-3xl font-black text-emerald-600 mt-2">{confirmedCount}</div>
              <p className="text-[11px] text-slate-400 mt-1">Vouchers issued</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Enquiry Pipeline</span>
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2">
                PKR {pipelinePKR.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Active booking value</p>
            </div>

          </div>

          {/* Quick Enquiries List */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Recent Customer Enquiries</h3>
              <button
                onClick={() => setActiveTab('enquiries')}
                className="text-xs font-bold text-orange-600 hover:underline"
              >
                View All Enquiries →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                  <tr>
                    <th className="p-3">Ref ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Tour</th>
                    <th className="p-3">Departure</th>
                    <th className="p-3">Total (PKR)</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enquiries.slice(0, 5).map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-50/50">
                      <td className="p-3 font-mono font-bold text-slate-800">#{enq.id.slice(0, 8)}</td>
                      <td className="p-3">
                        <strong className="text-slate-900">{enq.travellerName}</strong>
                        <div className="text-[10px] text-slate-400">{enq.travellerPhone}</div>
                      </td>
                      <td className="p-3 font-medium text-slate-800 max-w-[180px] truncate">{enq.tourTitle}</td>
                      <td className="p-3">{enq.departureDate}</td>
                      <td className="p-3 font-bold text-slate-900">PKR {enq.quotedTotal.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          enq.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                          enq.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                          enq.status === 'Cancelled' ? 'bg-rose-100 text-rose-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {enq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ENQUIRIES MANAGEMENT */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Manage Booking Enquiries</h2>
            <span className="text-xs text-slate-500">Live synchronization with Firestore</span>
          </div>

          <div className="space-y-4">
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-slate-500">#{enq.id}</span>
                      <span className="text-xs text-slate-400">• {new Date(enq.createdAt).toLocaleString()}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {enq.tourTitle} ({enq.destination})
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">Status:</span>
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                      className="text-xs font-bold border border-slate-200 rounded-full px-3 py-1.5 bg-slate-50 text-slate-800 focus:outline-hidden"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-600">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Customer</span>
                    <strong className="text-slate-900">{enq.travellerName}</strong>
                    <div className="text-[11px] text-slate-500">{enq.travellerEmail}</div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone / WhatsApp</span>
                    <strong className="text-slate-900">{enq.travellerPhone}</strong>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Booking Specs</span>
                    <span>Departure: <strong>{enq.departureDate}</strong></span>
                    <div>Party Size: <strong>{enq.travellerCount} Persons</strong></div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Pricing Quoted</span>
                    <strong className="text-orange-600 font-extrabold text-sm block">
                      PKR {enq.quotedTotal.toLocaleString()}
                    </strong>
                    <span className="text-[10px] text-slate-400">PKR {enq.quotedPricePerPerson.toLocaleString()} / person</span>
                  </div>
                </div>

                {enq.specialRequests && (
                  <div className="p-3 bg-slate-50 rounded-2xl text-xs text-slate-600">
                    <strong className="text-slate-700">Special Requests:</strong> {enq.specialRequests}
                  </div>
                )}

                {/* Actions & WhatsApp Direct Message */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex-1 max-w-md">
                    <input
                      type="text"
                      defaultValue={enq.adminNotes || ''}
                      onBlur={(e) => handleStatusChange(enq.id, enq.status, e.target.value)}
                      placeholder="Add internal admin notes..."
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500"
                    />
                  </div>

                  <a
                    href={`https://wa.me/${enq.travellerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                      `Hello ${enq.travellerName}! This is Traver Pakistan tour management regarding your booking enquiry #${enq.id.slice(0, 8)} for ${enq.tourTitle}. We would love to confirm your seats and answer any questions.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-full transition-colors shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp Traveller</span>
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TOUR MANAGEMENT */}
      {activeTab === 'tours' && (
        <div className="space-y-6">
          {isEditingTour ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  {editingTourId ? 'Edit Tour Package' : 'Create New Tour Package'}
                </h3>
                <button
                  onClick={() => setIsEditingTour(false)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSaveTour} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tour Title</label>
                    <input
                      type="text"
                      value={tourForm.title}
                      onChange={(e) => setTourForm({ ...tourForm, title: e.target.value })}
                      required
                      placeholder="e.g. Swat & Kalam Scenic Valley Tour"
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Slug (Unique URL)</label>
                    <input
                      type="text"
                      value={tourForm.slug}
                      onChange={(e) => setTourForm({ ...tourForm, slug: e.target.value })}
                      required
                      placeholder="swat-kalam-tour"
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Destination</label>
                    <input
                      type="text"
                      value={tourForm.destination}
                      onChange={(e) => setTourForm({ ...tourForm, destination: e.target.value })}
                      required
                      placeholder="e.g. Swat Valley"
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Region</label>
                    <select
                      value={tourForm.region}
                      onChange={(e) => setTourForm({ ...tourForm, region: e.target.value })}
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500"
                    >
                      <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                      <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                      <option value="Azad Kashmir">Azad Kashmir</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Balochistan">Balochistan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Price per Person (PKR)</label>
                    <input
                      type="number"
                      value={tourForm.pricePerPerson}
                      onChange={(e) => setTourForm({ ...tourForm, pricePerPerson: Number(e.target.value) })}
                      required
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Duration Days</label>
                    <input
                      type="number"
                      value={tourForm.durationDays}
                      onChange={(e) => setTourForm({ ...tourForm, durationDays: Number(e.target.value) })}
                      required
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Duration Nights</label>
                    <input
                      type="number"
                      value={tourForm.durationNights}
                      onChange={(e) => setTourForm({ ...tourForm, durationNights: Number(e.target.value) })}
                      required
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty</label>
                    <select
                      value={tourForm.difficulty}
                      onChange={(e) => setTourForm({ ...tourForm, difficulty: e.target.value as any })}
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Challenging">Challenging</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    value={tourForm.coverImage}
                    onChange={(e) => setTourForm({ ...tourForm, coverImage: e.target.value })}
                    required
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Short Description</label>
                  <input
                    type="text"
                    value={tourForm.shortDescription}
                    onChange={(e) => setTourForm({ ...tourForm, shortDescription: e.target.value })}
                    placeholder="Brief 1-2 sentence summary"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description</label>
                  <textarea
                    value={tourForm.description}
                    onChange={(e) => setTourForm({ ...tourForm, description: e.target.value })}
                    rows={4}
                    placeholder="Full package overview..."
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tourForm.published}
                      onChange={(e) => setTourForm({ ...tourForm, published: e.target.checked })}
                      className="accent-orange-600 rounded-sm"
                    />
                    <span>Publish on Website</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tourForm.featured}
                      onChange={(e) => setTourForm({ ...tourForm, featured: e.target.checked })}
                      className="accent-orange-600 rounded-sm"
                    />
                    <span>Mark as Featured</span>
                  </label>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-6 py-3 rounded-full shadow-md cursor-pointer"
                  >
                    Save Tour Package
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingTour(false)}
                    className="border border-slate-200 text-slate-600 text-xs font-semibold px-5 py-3 rounded-full hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="aspect-16/9 rounded-2xl overflow-hidden bg-slate-100 relative">
                      <img src={t.coverImage} alt={t.title} className="w-full h-full object-cover" />
                      <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.published ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'
                      }`}>
                        {t.published ? 'Live' : 'Draft'}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{t.title}</h4>
                    <p className="text-xs text-slate-500">{t.destination} • {t.durationDays}D/{t.durationNights}N</p>
                    <p className="text-xs font-black text-slate-900">PKR {t.pricePerPerson.toLocaleString()} / person</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <button
                      onClick={() => onNavigateTour(t.slug)}
                      className="text-xs font-semibold text-orange-600 hover:underline flex items-center gap-1"
                    >
                      <span>Preview</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingTourId(t.id);
                          setTourForm({
                            title: t.title,
                            slug: t.slug,
                            destination: t.destination,
                            region: t.region,
                            pricePerPerson: t.pricePerPerson,
                            durationDays: t.durationDays,
                            durationNights: t.durationNights,
                            shortDescription: t.shortDescription,
                            description: t.description,
                            coverImage: t.coverImage,
                            meetingPoint: t.meetingPoint,
                            difficulty: t.difficulty,
                            published: t.published,
                            featured: t.featured,
                          });
                          setIsEditingTour(true);
                        }}
                        className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
                        title="Edit Tour"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteTour(t.id, t.title)}
                        className="p-2 rounded-xl text-rose-600 hover:bg-rose-50"
                        title="Delete Tour"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: CONTACT MESSAGES */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Inbound Contact Messages</h2>
          {messages.length > 0 ? (
            <div className="space-y-3">
              {messages.map((m) => (
                <div key={m.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-slate-900">{m.name} ({m.email})</span>
                    <span>{new Date(m.createdAt).toLocaleString()}</span>
                  </div>
                  {m.phone && <div className="text-xs text-slate-500">Phone: {m.phone}</div>}
                  {m.subject && <div className="text-xs font-bold text-slate-800">Subject: {m.subject}</div>}
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl">{m.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center text-xs text-slate-400 border border-slate-100">
              No messages received yet.
            </div>
          )}
        </div>
      )}

      {/* TAB 5: AGENCY SETTINGS */}
      {activeTab === 'settings' && (
        <div className="max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Agency WhatsApp Configuration</h2>
          <p className="text-xs text-slate-500">
            Configure the central WhatsApp business desk that receives tour booking enquiries and customer messages across the entire application.
          </p>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                WhatsApp Phone Number (International Format, digits only)
              </label>
              <input
                type="text"
                value={agencyPhone}
                onChange={(e) => setAgencyPhone(e.target.value)}
                placeholder="923008594210"
                required
                className="w-full text-xs p-3 border border-slate-200 rounded-xl font-mono focus:outline-hidden focus:border-orange-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Do not include '+' or spaces (e.g. <code>923008594210</code> for Pakistan).
              </span>
            </div>

            {settingsSaved && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>WhatsApp number updated successfully!</span>
              </div>
            )}

            <button
              type="submit"
              className="inline-flex items-center gap-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-full shadow-md cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Update WhatsApp Configuration</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
