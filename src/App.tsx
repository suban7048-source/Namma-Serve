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
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { ProviderProfileModal } from './components/profile/ProviderProfileModal';
import { BookingModal } from './components/booking/BookingModal';
import { MessagingModal } from './components/messaging/MessagingModal';
import { WriteReviewModal } from './components/reviews/WriteReviewModal';
import { AuthModal } from './components/auth/AuthModal';
import { ToastContainer } from './components/common/ToastContainer';
import { FloatingCartBar } from './components/cart/FloatingCartBar';
import { CartDrawer } from './components/cart/CartDrawer';
import { LocationModal } from './components/layout/LocationModal';
import { ComplaintModal } from './components/common/ComplaintModal';
import { InvoiceModal } from './components/common/InvoiceModal';

const MainLayout: React.FC = () => {
  const {
    page, setPage, role, isLoggedIn, openAuthModal,
    activeProviderProfile, setActiveProviderProfile,
    bookingProvider, setBookingProvider
  } = useApp();

  // Guard dashboard routes against unauthenticated access
  React.useEffect(() => {
    if (!isLoggedIn) {
      if (page === 'customer-dashboard') {
        openAuthModal('login', 'customer');
        setPage('landing');
      } else if (page === 'provider-dashboard') {
        openAuthModal('login', 'provider');
        setPage('landing');
      } else if (page === 'admin-dashboard') {
        openAuthModal('login', 'provider');
        setPage('landing');
      }
    }
  }, [page, isLoggedIn]);

  // Admins have a full-screen dashboard without the standard footer/nav
  const isAdminPage = page === 'admin-dashboard' && role === 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-ns-bg text-ns-navy font-sans selection:bg-ns-primary selection:text-white pb-16 sm:pb-0">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Dynamic View with Strict Role Isolation & Auth Protection */}
      <main className="flex-1">
        {page === 'landing' && <LandingPage />}
        {page === 'discovery' && <DiscoveryPage />}
        {page === 'customer-dashboard' && (
          !isLoggedIn ? <LandingPage /> : (role === 'provider' ? <ProviderDashboard /> : (role === 'admin' ? <AdminDashboard /> : <CustomerDashboard />))
        )}
        {page === 'provider-dashboard' && (
          !isLoggedIn ? <LandingPage /> : (role === 'customer' ? <CustomerDashboard /> : (role === 'admin' ? <AdminDashboard /> : <ProviderDashboard />))
        )}
        {page === 'admin-dashboard' && (
          !isLoggedIn || role !== 'admin' ? <LandingPage /> : <AdminDashboard />
        )}
      </main>

      {/* Footer — hide on admin page for cleaner look */}
      {!isAdminPage && <Footer />}

      {/* Mobile Fixed Navigation */}
      <MobileBottomNav />

      {/* Floating Cart Summary Bar */}
      <FloatingCartBar />

      {/* Cart & Checkout Drawer */}
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
      <ComplaintModal />
      <InvoiceModal />
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
