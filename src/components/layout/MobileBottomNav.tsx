import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Search, Calendar, MessageSquare, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { page, setPage, role, setIsAuthModalOpen, setAuthMode, isLoggedIn, loggedInUser, bookings, setActiveBookingForChat } = useApp();

  const handleMessagesTab = () => {
    // Open chat for the most recent booking, or navigate to dashboard
    if (!isLoggedIn) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return;
    }
    const latestBooking = bookings[0] || null;
    if (latestBooking) {
      setActiveBookingForChat(latestBooking);
    } else {
      setPage(role === 'customer' ? 'customer-dashboard' : 'provider-dashboard');
    }
  };

  const handleProfileTab = () => {
    if (!isLoggedIn) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
    } else {
      setPage(role === 'customer' ? 'customer-dashboard' : 'provider-dashboard');
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
      <button
        onClick={() => setPage('landing')}
        className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-colors ${
          page === 'landing' ? 'text-brand-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">Home</span>
      </button>

      <button
        onClick={() => setPage('discovery')}
        className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-colors ${
          page === 'discovery' ? 'text-brand-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px]">Search</span>
      </button>

      <button
        onClick={() => {
          if (!isLoggedIn) { setAuthMode('login'); setIsAuthModalOpen(true); return; }
          setPage(role === 'customer' ? 'customer-dashboard' : 'provider-dashboard');
        }}
        className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-colors relative ${
          page === 'customer-dashboard' || page === 'provider-dashboard' ? 'text-brand-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Calendar className="w-5 h-5" />
        <span className="text-[10px]">Bookings</span>
      </button>

      <button
        onClick={handleMessagesTab}
        className="flex flex-col items-center gap-1 p-1.5 rounded-xl text-slate-500 hover:text-slate-800 transition-colors relative"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-[10px]">Messages</span>
      </button>

      <button
        onClick={handleProfileTab}
        className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-colors ${
          isLoggedIn ? 'text-brand-600' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        {isLoggedIn ? (
          <div className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center text-[9px] font-black">
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
