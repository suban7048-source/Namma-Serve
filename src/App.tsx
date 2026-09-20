import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { LandingPage } from './components/landing/LandingPage';
import { DiscoveryPage } from './components/discovery/DiscoveryPage';
import { CustomerDashboard } from './components/dashboard/CustomerDashboard';
import { ProviderDashboard } from './components/dashboard/ProviderDashboard';
import { ProviderProfileModal } from './components/profile/ProviderProfileModal';
import { BookingModal } from './components/booking/BookingModal';
import { MessagingModal } from './components/messaging/MessagingModal';
import { WriteReviewModal } from './components/reviews/WriteReviewModal';
import { AuthModal } from './components/auth/AuthModal';
import { ToastContainer } from './components/common/ToastContainer';
import { FloatingCartBar } from './components/cart/FloatingCartBar';
import { CartDrawer } from './components/cart/CartDrawer';
import { LocationModal } from './components/layout/LocationModal';

const MainLayout: React.FC = () => {
  const {
    page,
    activeProviderProfile, setActiveProviderProfile,
    bookingProvider, setBookingProvider
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-brand-500 selection:text-white pb-16 sm:pb-0">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {page === 'landing' && <LandingPage />}
        {page === 'discovery' && <DiscoveryPage />}
        {page === 'customer-dashboard' && <CustomerDashboard />}
        {page === 'provider-dashboard' && <ProviderDashboard />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Fixed Navigation */}
      <MobileBottomNav />

      {/* Urban Company Floating Cart Summary Bar */}
      <FloatingCartBar />

      {/* Urban Company Cart & Checkout Drawer */}
      <CartDrawer />

      {/* Chennai Location Picker Modal */}
      <LocationModal />

      {/* Global Modals Stack */}
      <ProviderProfileModal
        provider={activeProviderProfile}
        onClose={() => setActiveProviderProfile(null)}
      />

      <BookingModal
        provider={bookingProvider}
        onClose={() => setBookingProvider(null)}
      />

      <MessagingModal />
      <WriteReviewModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </ToastProvider>
  );
}

export default App;
