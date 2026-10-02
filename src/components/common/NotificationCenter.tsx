import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, Calendar, MessageSquare, ShieldCheck, Star } from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadNotificationCount, markNotificationRead, markAllNotificationsRead, setActiveBookingForChat, bookings, setPage } = useApp();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notif: any) => {
    markNotificationRead(notif.id);
    setIsOpen(false);
    if (notif.linkBookingId) {
      const b = bookings.find(item => item.id === notif.linkBookingId);
      if (b) {
        if (notif.type === 'message') {
          setActiveBookingForChat(b);
        } else {
          setPage('customer-dashboard');
        }
      }
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl text-ns-text-secondary hover:text-ns-navy hover:bg-kolam-sunk transition-colors focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadNotificationCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-brand-600 text-white font-semibold text-[10px] rounded-full flex items-center justify-center animate-pulse">
            {unreadNotificationCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-kolam-surface rounded-2xl shadow-elevated border border-kolam-sunk py-3 z-50 animate-fade-in">
          <div className="px-4 pb-3 border-b border-kolam-sunk flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-ns-navy text-sm">Notifications</h3>
              {unreadNotificationCount > 0 && (
                <span className="text-xs bg-brand-50 text-brand-700 font-semibold px-2 py-0.5 rounded-full">
                  {unreadNotificationCount} new
                </span>
              )}
            </div>
            {unreadNotificationCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" /> Mark read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-kolam-wash">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-ns-text-secondary text-xs">
                No notifications right now.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-4 hover:bg-kolam-wash transition-colors cursor-pointer flex items-start gap-3 ${
                    !notif.isRead ? 'bg-brand-50/40' : ''
                  }`}
                >
                  <div className="p-2 rounded-xl bg-brand-100 text-brand-600 shrink-0 mt-0.5">
                    {notif.type === 'booking' && <Calendar className="w-4 h-4" />}
                    {notif.type === 'message' && <MessageSquare className="w-4 h-4" />}
                    {notif.type === 'review' && <Star className="w-4 h-4" />}
                    {notif.type === 'system' && <ShieldCheck className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-ns-navy">{notif.title}</p>
                      <span className="text-[10px] text-ns-text-secondary">{notif.timestamp}</span>
                    </div>
                    <p className="text-xs text-ns-text-secondary mt-0.5 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
