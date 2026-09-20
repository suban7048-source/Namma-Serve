import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { RatingStars } from '../common/RatingStars';
import { Star, X, CheckCircle2 } from 'lucide-react';

export const WriteReviewModal: React.FC = () => {
  const { reviewBooking, setReviewBooking, reviewProvider, setReviewProvider, addReview, loggedInUser } = useApp();
  const { showToast } = useToast();

  const [overallRating, setOverallRating] = useState<number>(5);
  const [qualityRating, setQualityRating] = useState<number>(5);
  const [professionalismRating, setProfessionalismRating] = useState<number>(5);
  const [punctualityRating, setPunctualityRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Punctual', 'Fair Price']);
  const [selectedServiceName, setSelectedServiceName] = useState<string>('');

  React.useEffect(() => {
    if (reviewBooking) {
      setOverallRating(5);
      setQualityRating(5);
      setProfessionalismRating(5);
      setPunctualityRating(5);
      setComment('');
      setSelectedTags(['Punctual', 'Fair Price']);
      setSelectedServiceName(reviewBooking.serviceName);
    } else if (reviewProvider) {
      setOverallRating(5);
      setQualityRating(5);
      setProfessionalismRating(5);
      setPunctualityRating(5);
      setComment('');
      setSelectedTags(['Punctual', 'Expert Work']);
      setSelectedServiceName(reviewProvider.offeredServices[0]?.name || reviewProvider.category);
    }
  }, [reviewBooking, reviewProvider]);

  if (!reviewBooking && !reviewProvider) return null;

  const targetProviderId = reviewBooking ? reviewBooking.providerId : reviewProvider!.id;
  const targetProviderName = reviewBooking ? reviewBooking.providerName : reviewProvider!.name;

  const availableTags = ['Punctual', 'Fair Price', 'Clean Worksite', 'Fast Response', 'Expert Work', 'Friendly'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleClose = () => {
    if (reviewBooking) setReviewBooking(null);
    if (reviewProvider) setReviewProvider(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast('Please write a review comment', '', 'warning');
      return;
    }

    addReview(
      targetProviderId,
      {
        authorName: loggedInUser?.name || 'Aakash Malhotra',
        authorAvatar: '',
        rating: overallRating,
        subRatings: {
          quality: qualityRating,
          professionalism: professionalismRating,
          punctuality: punctualityRating
        },
        comment: comment.trim(),
        tags: selectedTags,
        serviceUsed: selectedServiceName || 'General Service'
      },
      reviewBooking?.id
    );

    showToast('Review Submitted!', 'Thank you for your valuable feedback.', 'success');
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-elevated border border-slate-100 relative my-auto max-h-[92vh] overflow-y-auto">
        
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">Leave a Review</h3>
            <p className="text-xs text-slate-500">For {targetProviderName} • Chennai</p>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Service selector if reviewProvider has multiple services */}
        {reviewProvider && reviewProvider.offeredServices.length > 0 && (
          <div className="mb-4 space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Service availed:</label>
            <select
              value={selectedServiceName}
              onChange={(e) => setSelectedServiceName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-600"
            >
              {reviewProvider.offeredServices.map(s => (
                <option key={s.id} value={s.name}>{s.name} (₹{s.price})</option>
              ))}
              <option value="General Service">General Service / Consultation</option>
            </select>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Overall Rating */}
          <div className="text-center bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">Overall Rating</label>
            <div className="flex justify-center">
              <RatingStars
                rating={overallRating}
                size={28}
                interactive
                onRatingChange={(r) => setOverallRating(r)}
              />
            </div>
            <span className="text-xs font-bold text-amber-600 block">{overallRating} of 5 Stars</span>
          </div>

          {/* Sub Ratings */}
          <div className="space-y-3 text-xs font-semibold text-slate-700">
            <div className="flex items-center justify-between">
              <span>Service Quality</span>
              <RatingStars rating={qualityRating} size={18} interactive onRatingChange={(r) => setQualityRating(r)} />
            </div>
            <div className="flex items-center justify-between">
              <span>Professionalism</span>
              <RatingStars rating={professionalismRating} size={18} interactive onRatingChange={(r) => setProfessionalismRating(r)} />
            </div>
            <div className="flex items-center justify-between">
              <span>Punctuality</span>
              <RatingStars rating={punctualityRating} size={18} interactive onRatingChange={(r) => setPunctualityRating(r)} />
            </div>
          </div>

          {/* Comment text */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">Your Review</label>
            <textarea
              rows={3}
              placeholder="Describe your experience with this service provider..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Tag Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">Highlights</label>
            <div className="flex flex-wrap gap-1.5">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-3.5 rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Submit Review
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
