import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Booking, Complaint, Provider } from '../../types';
import {
  LayoutDashboard, Users, ShoppingBag, AlertTriangle, TrendingUp,
  CheckCircle2, XCircle, Clock, Search, BarChart3, Shield, FileText,
  ChevronRight, Wrench, Star, MapPin, Phone
} from 'lucide-react';

type AdminTab = 'overview' | 'bookings' | 'technicians' | 'complaints' | 'reports';

export const AdminDashboard: React.FC = () => {
  const { bookings, providers, complaints, updateComplaintStatus, updateBookingStatus, updateProviderVerification, removeProvider, loggedInUser, setPage, setRole } = useApp();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Compute stats
  const totalRevenue = bookings
    .filter(b => b.paymentStatus === 'SUCCESS')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const activeBookings = bookings.filter(b =>
    ['PENDING', 'TECHNICIAN_ASSIGNED', 'TECHNICIAN_ACCEPTED', 'ON_THE_WAY', 'ARRIVED', 'SERVICE_STARTED'].includes(b.status)
  );
  const completedBookings = bookings.filter(b => b.status === 'COMPLETED');
  const openComplaints = complaints.filter(c => c.status === 'OPEN' || c.status === 'UNDER_REVIEW');
  const verifiedProviders = providers.filter(p => p.isVerified);

  const TABS: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'bookings', label: 'Bookings', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'technicians', label: 'Technicians', icon: <Wrench className="w-4 h-4" /> },
    { id: 'complaints', label: 'Complaints', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const filteredBookings = bookings.filter(b =>
    !searchQuery ||
    b.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProviders = providers.filter(p =>
    !searchQuery ||
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
      TECHNICIAN_ASSIGNED: 'bg-blue-50 text-blue-700 border-blue-200',
      TECHNICIAN_ACCEPTED: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      ON_THE_WAY: 'bg-sky-50 text-sky-700 border-sky-200',
      ARRIVED: 'bg-teal-50 text-teal-700 border-teal-200',
      SERVICE_STARTED: 'bg-violet-50 text-violet-700 border-violet-200',
      SERVICE_COMPLETED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      PAYMENT_PENDING: 'bg-orange-50 text-orange-700 border-orange-200',
      COMPLETED: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      CANCELLED: 'bg-red-50 text-red-700 border-red-200',
    };
    return map[status] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const handleResolveComplaint = (complaintId: string) => {
    updateComplaintStatus(complaintId, 'RESOLVED', 'Resolved by admin after review.');
    showToast('Complaint Resolved', 'The complaint has been marked as resolved.', 'success');
  };

  const handleRejectComplaint = (complaintId: string) => {
    updateComplaintStatus(complaintId, 'REJECTED', 'Complaint reviewed. No policy violation found.');
    showToast('Complaint Rejected', 'The complaint has been rejected.', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Admin Top Header */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-700 flex items-center justify-center text-white font-black">
              A
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Admin Dashboard</p>
              <h1 className="text-lg font-extrabold text-slate-900">NammaServe Control Panel</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setRole('customer'); setPage('landing'); }}
              className="px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              Exit to Marketplace
            </button>
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-slate-900">{loggedInUser?.name || 'Administrator'}</p>
              <p className="text-[10px] text-slate-400">{loggedInUser?.email}</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-brand-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 bg-white rounded-2xl p-1.5 border border-slate-200/80 shadow-soft overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.id === 'complaints' && openComplaints.length > 0 && (
                <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black ${
                  activeTab === 'complaints' ? 'bg-white text-brand-700' : 'bg-red-500 text-white'
                }`}>
                  {openComplaints.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: <TrendingUp className="w-5 h-5 text-emerald-600" />, bg: 'bg-emerald-50 border-emerald-200', change: '+12%' },
                { label: 'Active Bookings', value: activeBookings.length, icon: <ShoppingBag className="w-5 h-5 text-brand-600" />, bg: 'bg-brand-50 border-brand-200', change: `${bookings.length} total` },
                { label: 'Verified Technicians', value: verifiedProviders.length, icon: <Users className="w-5 h-5 text-indigo-600" />, bg: 'bg-indigo-50 border-indigo-200', change: `${providers.length} total` },
                { label: 'Open Complaints', value: openComplaints.length, icon: <AlertTriangle className="w-5 h-5 text-red-600" />, bg: 'bg-red-50 border-red-200', change: complaints.length > 0 ? `${complaints.filter(c => c.status === 'RESOLVED').length} resolved` : 'None yet' },
              ].map((kpi, idx) => (
                <div key={idx} className={`bg-white border ${kpi.bg.split(' ')[1]} rounded-2xl p-5 space-y-3 shadow-soft`}>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${kpi.bg}`}>
                    {kpi.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{kpi.label}</p>
                    <p className="text-2xl font-black text-slate-900">{kpi.value}</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">{kpi.change}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Category Revenue Breakdown */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-6">
              <h3 className="text-base font-extrabold text-slate-900 mb-4">Bookings by Category</h3>
              <div className="space-y-3">
                {Object.entries(
                  bookings.reduce((acc: Record<string, number>, b) => {
                    acc[b.providerCategory] = (acc[b.providerCategory] || 0) + 1;
                    return acc;
                  }, {})
                ).sort(([, a], [, b]) => b - a).slice(0, 6).map(([cat, count]) => {
                  const pct = Math.round((count / bookings.length) * 100);
                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-700">{cat}</span>
                        <span className="font-bold text-slate-900">{count} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-brand-500 h-2 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent bookings */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-extrabold text-slate-900">Recent Bookings</h3>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  View All <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {bookings.slice(0, 5).map(b => (
                  <div key={b.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 text-xs">
                    <div>
                      <p className="font-bold text-slate-900">{b.serviceName}</p>
                      <p className="text-slate-400 font-mono">{b.bookingNumber} • {b.customerName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">₹{b.totalPrice}</span>
                      <span className={`px-2 py-0.5 rounded-full border font-bold text-[10px] ${getStatusBadge(b.status)}`}>
                        {b.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search bookings by number, customer, or technician..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-brand-500"
                />
              </div>
              <div className="text-xs text-slate-500 font-medium bg-white border border-slate-200/80 rounded-xl px-3 py-2.5">
                {filteredBookings.length} bookings
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-3 font-bold text-slate-500 uppercase tracking-wide text-[10px]">Booking</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-500 uppercase tracking-wide text-[10px] hidden md:table-cell">Customer</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-500 uppercase tracking-wide text-[10px] hidden lg:table-cell">Technician</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-500 uppercase tracking-wide text-[10px]">Status</th>
                    <th className="text-right px-4 py-3 font-bold text-slate-500 uppercase tracking-wide text-[10px]">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-bold text-slate-900">{b.serviceName}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{b.bookingNumber}</p>
                        <p className="text-[10px] text-slate-400">{b.scheduledDate}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="font-semibold text-slate-800">{b.customerName}</p>
                        <p className="text-[10px] text-slate-400">{b.customerPhone}</p>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <p className="font-semibold text-slate-800">{b.providerName}</p>
                        <p className="text-[10px] text-slate-400">{b.providerCategory}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-lg border font-bold text-[10px] ${getStatusBadge(b.status)}`}>
                          {b.status.replace(/_/g, ' ')}
                        </span>
                        {b.isEmergency && (
                          <span className="ml-1 text-[10px] font-bold text-red-600">🚨</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <p className="font-extrabold text-slate-900">₹{b.totalPrice}</p>
                        <p className={`text-[10px] font-semibold ${
                          b.paymentStatus === 'SUCCESS' ? 'text-emerald-600' : 'text-amber-600'
                        }`}>{b.paymentStatus || 'PENDING'}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredBookings.length === 0 && (
                <div className="text-center py-10 text-xs text-slate-400">No bookings match your search.</div>
              )}
            </div>
          </div>
        )}

        {/* TECHNICIANS TAB */}
        {activeTab === 'technicians' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search technicians by name, category, or location..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProviders.map(p => (
                <div key={p.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-700 font-black text-sm border border-brand-100">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900 text-sm">{p.name}</p>
                        <p className="text-[10px] text-slate-400">{p.category}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${
                      p.verificationStatus === 'VERIFIED'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : p.verificationStatus === 'PENDING'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {p.verificationStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[10px] text-center">
                    <div className="bg-slate-50 rounded-xl p-2 border border-slate-100">
                      <p className="font-black text-slate-900 text-sm">{p.rating}★</p>
                      <p className="text-slate-400">{p.reviewCount} reviews</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-2 border border-slate-100">
                      <p className="font-black text-slate-900 text-sm">{p.completedJobs}</p>
                      <p className="text-slate-400">Jobs done</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-2 border border-slate-100">
                      <p className="font-black text-slate-900 text-sm">{p.yearsExperience}yr</p>
                      <p className="text-slate-400">Experience</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <MapPin className="w-3 h-3" />
                    <span>{p.location}</span>
                    <span>• {p.distanceKm} km</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${p.isAvailable ? 'bg-emerald-400' : 'bg-slate-300'}`} />
                    <span className="text-[10px] font-semibold text-slate-600">
                      {p.isAvailable ? 'Available' : 'Offline'}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[10px] text-slate-500">{p.phone}</span>
                  </div>

                  {p.verificationStatus === 'PENDING' || p.verificationStatus === 'UNDER_REVIEW' ? (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { updateProviderVerification(p.id, 'VERIFIED'); showToast('Technician Approved', 'Technician has been verified successfully', 'success'); }}
                        className="flex-1 py-2 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors">
                        Approve
                      </button>
                      <button 
                        onClick={() => { updateProviderVerification(p.id, 'REJECTED'); showToast('Technician Rejected', 'Technician verification rejected', 'error'); }}
                        className="flex-1 py-2 text-[11px] font-bold border border-red-200 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { removeProvider(p.id); showToast('Technician Removed', 'Technician has been removed from the platform', 'info'); }}
                        className="flex-1 py-2 text-[11px] font-bold border border-red-200 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COMPLAINTS TAB */}
        {activeTab === 'complaints' && (
          <div className="space-y-4 animate-fade-in">
            {complaints.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="font-extrabold text-slate-900 text-lg">No Complaints Yet</h3>
                <p className="text-xs text-slate-500">All clear! No customer complaints have been filed.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {complaints.map(c => (
                  <div key={c.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-slate-400">#{c.bookingNumber}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            c.status === 'OPEN' ? 'bg-red-50 text-red-700 border-red-200' :
                            c.status === 'UNDER_REVIEW' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            c.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            'bg-slate-100 text-slate-600 border-slate-200'
                          }`}>
                            {c.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <p className="font-bold text-slate-900 text-sm mt-1">
                          {c.category.replace(/_/g, ' ')}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                          <span>Customer: <strong className="text-slate-700">{c.customerName}</strong></span>
                          <span>•</span>
                          <span>Technician: <strong className="text-slate-700">{c.technicianName}</strong></span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {new Date(c.createdAt).toLocaleDateString('en-IN')}
                      </span>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <p className="text-xs text-slate-700 leading-relaxed">"{c.description}"</p>
                    </div>

                    {c.adminNote && (
                      <div className="bg-brand-50 border border-brand-100 rounded-xl p-3 text-xs text-brand-800">
                        <strong>Admin Note:</strong> {c.adminNote}
                      </div>
                    )}

                    {(c.status === 'OPEN' || c.status === 'UNDER_REVIEW') && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleResolveComplaint(c.id)}
                          className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Mark Resolved
                        </button>
                        <button
                          onClick={() => handleRejectComplaint(c.id)}
                          className="flex-1 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* REPORTS TAB */}
        {activeTab === 'reports' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Booking Status Distribution */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-6">
                <h3 className="text-base font-extrabold text-slate-900 mb-4">Booking Status</h3>
                <div className="space-y-2">
                  {Object.entries(
                    bookings.reduce((acc: Record<string, number>, b) => {
                      acc[b.status] = (acc[b.status] || 0) + 1;
                      return acc;
                    }, {})
                  ).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between text-xs">
                      <span className={`px-2 py-0.5 rounded-full border font-bold text-[10px] ${getStatusBadge(status)}`}>
                        {status.replace(/_/g, ' ')}
                      </span>
                      <span className="font-bold text-slate-900">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Performers */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-6">
                <h3 className="text-base font-extrabold text-slate-900 mb-4">Top Technicians</h3>
                <div className="space-y-3">
                  {providers
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 5)
                    .map((p, idx) => (
                      <div key={p.id} className="flex items-center gap-3 text-xs">
                        <span className="text-slate-400 font-bold w-4">#{idx + 1}</span>
                        <div className="w-7 h-7 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-700 font-black text-[10px]">
                          {p.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 truncate">{p.name}</p>
                          <p className="text-[10px] text-slate-400">{p.category}</p>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{p.rating}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Financial Summary */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-6">
                <h3 className="text-base font-extrabold text-slate-900 mb-4">Financial Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Total Bookings Value</span>
                    <span className="font-extrabold text-slate-900">
                      ₹{bookings.reduce((s, b) => s + b.totalPrice, 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Collected Payments</span>
                    <span className="font-extrabold text-emerald-700">
                      ₹{totalRevenue.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Completed Bookings</span>
                    <span className="font-extrabold text-slate-900">{completedBookings.length}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-600">Cancellations</span>
                    <span className="font-extrabold text-red-600">
                      {bookings.filter(b => b.status === 'CANCELLED').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Platform Health */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-6">
                <h3 className="text-base font-extrabold text-slate-900 mb-4">Platform Health</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Verified Technicians', value: verifiedProviders.length, total: providers.length, color: 'bg-emerald-500' },
                    { label: 'Booking Completion Rate', value: completedBookings.length, total: Math.max(bookings.length, 1), color: 'bg-brand-500' },
                    { label: 'Complaints Resolution Rate', value: complaints.filter(c => c.status === 'RESOLVED').length, total: Math.max(complaints.length, 1), color: 'bg-indigo-500' },
                  ].map((item) => {
                    const pct = Math.round((item.value / item.total) * 100);
                    return (
                      <div key={item.label} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-600">{item.label}</span>
                          <span className="font-bold text-slate-900">{pct}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div className={`${item.color} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
