import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Search, Calendar, MessageSquare, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { page, setPage, role, setIsAuthModalOpen, setAuthMode, isLoggedIn, loggedInUser, bookings, setActiveBookingForChat } = useApp();

  const handleMessagesTab = () => {
    if (!isLoggedIn) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return;
    }
    const latestBooking = bookings[0] || null;
    if (latestBooking) {
      setActiveBookingForChat(latestBooking);
    } else {
      setPage(loggedInUser?.role === 'provider' ? 'provider-dashboard' : loggedInUser?.role === 'admin' ? 'admin-dashboard' : 'customer-dashboard');
    }
  };

  const handleProfileTab = () => {
    if (!isLoggedIn) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
    } else {
      setPage(loggedInUser?.role === 'provider' ? 'provider-dashboard' : loggedInUser?.role === 'admin' ? 'admin-dashboard' : 'customer-dashboard');
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-ns-border px-3 py-2 flex items-center justify-around">
      <button
        onClick={() => setPage('landing')}
        className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors ${
          page === 'landing' ? 'text-ns-primary font-bold' : 'text-ns-text-secondary hover:text-ns-navy'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">Home</span>
      </button>

      <button
        onClick={() => setPage('discovery')}
        className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors ${
          page === 'discovery' ? 'text-ns-primary font-bold' : 'text-ns-text-secondary hover:text-ns-navy'
        }`}
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px]">Search</span>
      </button>

      <button
        onClick={() => {
          if (!isLoggedIn) { setAuthMode('login'); setIsAuthModalOpen(true); return; }
          setPage(loggedInUser?.role === 'provider' ? 'provider-dashboard' : loggedInUser?.role === 'admin' ? 'admin-dashboard' : 'customer-dashboard');
        }}
        className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors relative ${
          page === 'customer-dashboard' || page === 'provider-dashboard' ? 'text-ns-primary font-bold' : 'text-ns-text-secondary hover:text-ns-navy'
        }`}
      >
        <Calendar className="w-5 h-5" />
        <span className="text-[10px]">Bookings</span>
      </button>

      <button
        onClick={handleMessagesTab}
        className="flex flex-col items-center gap-1 p-1.5 rounded-lg text-ns-text-secondary hover:text-ns-navy transition-colors relative"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-[10px]">Messages</span>
      </button>

      <button
        onClick={handleProfileTab}
        className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors ${
          isLoggedIn ? 'text-ns-primary' : 'text-ns-text-secondary hover:text-ns-navy'
        }`}
      >
        {isLoggedIn ? (
          <div className="w-5 h-5 rounded-full bg-ns-navy text-white flex items-center justify-center text-[9px] font-bold">
            {(loggedInUser?.name ?? 'U').charAt(0).toUpperCase()}
          </div>
        ) : (
          <User className="w-5 h-5" />
        )}
        <span className="text-[10px]">{isLoggedIn ? loggedInUser?.name?.split(' ')[0] : 'Profile'}</span>
      </button>
    </div>
  );
};
