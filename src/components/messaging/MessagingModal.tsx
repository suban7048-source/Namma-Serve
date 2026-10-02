import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { Booking } from '../../types';
import { Send, Image, X, Wrench, ShieldCheck, CheckCheck, Clock, User, Phone, Info } from 'lucide-react';

export const MessagingModal: React.FC = () => {
  const { 
    activeBookingForChat, setActiveBookingForChat, 
    messages, sendMessage, role 
  } = useApp();

  const [inputMessage, setInputMessage] = useState<string>('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const bookingMessages = activeBookingForChat 
    ? messages.filter(m => m.bookingId === activeBookingForChat.id)
    : [];

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [bookingMessages.length, activeBookingForChat]);

  if (!activeBookingForChat) return null;

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    sendMessage(activeBookingForChat.id, inputMessage.trim(), role);
    setInputMessage('');
  };

  const quickReplies = [
    "I'm on my way!",
    "Can you confirm the gate code?",
    "I've arrived at the location.",
    "Thanks! Everything looks great."
  ];

  const recipientName = role === 'customer' 
    ? activeBookingForChat.providerName 
    : activeBookingForChat.customerName;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ns-navy/65 backdrop-blur-sm animate-fade-in">
      <div className="bg-kolam-surface rounded-2xl max-w-xl w-full h-[620px] max-h-[90vh] shadow-elevated border border-kolam-sunk flex flex-col relative overflow-hidden my-auto">
        
        {/* Chat Header */}
        <div className="p-4 sm:p-5 border-b border-kolam-sunk bg-white flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar name={recipientName} size="sm" rounded="full" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-kolam-teal rounded-full border-2 border-white" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold text-ns-navy text-sm">{recipientName}</h3>
                <span className="text-[10px] bg-kolam-sunk text-ns-text-secondary font-semibold px-2 py-0.5 rounded-full">
                  {role === 'customer' ? 'Service Provider' : 'Customer'}
                </span>
              </div>
              <p className="text-[11px] text-brand-600 font-semibold flex items-center gap-1">
                <Wrench className="w-3 h-3" /> Booking #{activeBookingForChat.bookingNumber} • {activeBookingForChat.serviceName}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveBookingForChat(null)}
            className="p-2 text-ns-text-secondary hover:text-ns-text-secondary rounded-full hover:bg-kolam-sunk"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log timeline */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-kolam-wash space-y-4">
          
          <div className="text-center py-2">
            <span className="text-[10px] text-ns-text-secondary bg-kolam-surface border border-ns-border px-3 py-1 rounded-full font-medium shadow-2xs">
              Direct communication for Booking #{activeBookingForChat.bookingNumber}
            </span>
          </div>

          {bookingMessages.length === 0 ? (
            <div className="text-center text-ns-text-secondary text-xs py-10">
              No messages yet. Send a message to get in touch!
            </div>
          ) : (
            bookingMessages.map((msg) => {
              const isMe = msg.senderRole === role;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-2xs ${
                      isMe
                        ? 'bg-brand-600 text-white rounded-br-none font-medium'
                        : 'bg-white text-ns-navy rounded-bl-none border border-ns-border/80 font-normal'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div
                      className={`text-[9px] mt-1 flex items-center justify-end gap-1 ${
                        isMe ? 'text-brand-200' : 'text-ns-text-secondary'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick response chips */}
        <div className="px-4 py-2 bg-kolam-surface border-t border-kolam-sunk flex items-center gap-2 overflow-x-auto">
          {quickReplies.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => {
                sendMessage(activeBookingForChat.id, chip, role);
              }}
              className="px-3 py-1 rounded-full bg-kolam-sunk hover:bg-brand-50 hover:text-brand-700 text-[11px] font-semibold text-ns-text-secondary shrink-0 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 sm:p-4 bg-kolam-surface border-t border-kolam-sunk flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 bg-kolam-wash border border-ns-border rounded-2xl py-3 px-4 text-xs font-medium text-ns-navy focus:outline-none focus:border-brand-500"
          />

          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="p-3 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white rounded-2xl transition-all shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
