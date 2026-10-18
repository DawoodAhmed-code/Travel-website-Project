import React, { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Tour, BookingEnquiry } from './types';
import { getAllTours, getTourBySlug } from './services/tourService';
import { testConnection } from './firebase';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { BookingModal } from './components/BookingModal';
import { AuthModal } from './components/AuthModal';
import { GeminiChatbot } from './components/GeminiChatbot';

import { HomeView } from './views/HomeView';
import { ToursView } from './views/ToursView';
import { TourDetailView } from './views/TourDetailView';
import { DestinationsView } from './views/DestinationsView';
import { TripPlannerView } from './views/TripPlannerView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { DashboardView } from './views/DashboardView';
import { AdminView } from './views/AdminView';

function MainApp() {
  const { user, isAdmin } = useAuth();

  const [currentView, setCurrentView] = useState<string>('home');
  const [tours, setTours] = useState<Tour[]>([]);
  const [loadingTours, setLoadingTours] = useState<boolean>(true);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [searchParam, setSearchParam] = useState<string>('');

  // Modals
  const [bookingModalTour, setBookingModalTour] = useState<Tour | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  const [plannerDestinationId, setPlannerDestinationId] = useState<string>('hunza');

  // Initial data fetch and firestore connection validation
  useEffect(() => {
    testConnection();
    loadTours();

    // Check hash route on load
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('tour-')) {
      const slug = hash.replace('tour-', '');
      handleDeepLinkTour(slug);
    } else if (['home', 'tours', 'destinations', 'planner', 'about', 'contact', 'dashboard', 'admin'].includes(hash)) {
      setCurrentView(hash);
    }
  }, []);

  const loadTours = async () => {
    setLoadingTours(true);
    try {
      const list = await getAllTours(false);
      setTours(list);
    } catch (err) {
      console.warn('Could not load tours list:', err);
    } finally {
      setLoadingTours(false);
    }
  };

  const handleDeepLinkTour = async (slug: string) => {
    try {
      const tour = await getTourBySlug(slug);
      if (tour) {
        setSelectedTour(tour);
        setCurrentView('tour-detail');
      }
    } catch (e) {
      console.warn('Deep link tour load error:', e);
    }
  };

  const handleNavigate = (view: string, param?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'tours' && param) {
      setSearchParam(param);
    } else if (view === 'tours') {
      setSearchParam('');
    }

    if (view === 'planner' && param) {
      setPlannerDestinationId(param);
    }

    setCurrentView(view);
    window.location.hash = view;
  };

  const handleSelectTour = (tour: Tour) => {
    setSelectedTour(tour);
    setCurrentView('tour-detail');
    window.location.hash = `tour-${tour.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTourBySlug = async (slug: string) => {
    const existing = tours.find(t => t.slug === slug);
    if (existing) {
      handleSelectTour(existing);
    } else {
      await handleDeepLinkTour(slug);
    }
  };

  const handleOpenBooking = (tour: Tour) => {
    setBookingModalTour(tour);
  };

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* Global Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {loadingTours && tours.length === 0 ? (
          <div className="py-24 text-center space-y-3">
            <div className="w-10 h-10 border-3 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold text-slate-500">Connecting to Traver Pakistan Database...</p>
          </div>
        ) : (
          <>
            {currentView === 'home' && (
              <HomeView
                tours={tours}
                onSelectTour={handleSelectTour}
                onBookWhatsApp={handleOpenBooking}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'tours' && (
              <ToursView
                tours={tours}
                initialSearch={searchParam}
                onSelectTour={handleSelectTour}
                onBookWhatsApp={handleOpenBooking}
              />
            )}

            {currentView === 'tour-detail' && selectedTour && (
              <TourDetailView
                tour={selectedTour}
                allTours={tours}
                onBack={() => handleNavigate('tours')}
                onBookWhatsApp={handleOpenBooking}
                onSelectRelated={handleSelectTour}
              />
            )}

            {currentView === 'destinations' && (
              <DestinationsView
                onPlanTrip={(destId) => {
                  handleNavigate('planner', destId);
                }}
                onExploreTours={(destName) => {
                  handleNavigate('tours', destName);
                }}
              />
            )}

            {currentView === 'planner' && (
              <TripPlannerView
                tours={tours}
                initialDestinationId={plannerDestinationId}
                onSelectTour={handleSelectTour}
                onBookWhatsApp={handleOpenBooking}
              />
            )}

            {currentView === 'about' && (
              <AboutView onNavigateTours={() => handleNavigate('tours')} />
            )}

            {currentView === 'contact' && (
              <ContactView />
            )}

            {currentView === 'dashboard' && (
              <DashboardView
                onOpenAuth={handleOpenAuth}
                onNavigateTour={handleSelectTourBySlug}
              />
            )}

            {currentView === 'admin' && (
              <AdminView
                onNavigateHome={() => handleNavigate('home')}
                onNavigateTour={handleSelectTourBySlug}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Persistent Floating WhatsApp quick contact */}
      <WhatsAppFloatingButton />

      {/* Gemini AI Multi-turn Tour Advisor Chatbot */}
      <GeminiChatbot tours={tours} onSelectTour={handleSelectTour} />

      {/* Booking and WhatsApp modal */}
      <BookingModal
        tour={bookingModalTour}
        isOpen={!!bookingModalTour}
        onClose={() => setBookingModalTour(null)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
