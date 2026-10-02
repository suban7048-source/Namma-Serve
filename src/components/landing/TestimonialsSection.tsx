import React from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { Star, Quote } from 'lucide-react';

/**
 * Actual testimonials.
 *
 * This file previously contained no testimonials at all — it rendered a
 * "Become a Provider" call to action under a misleading name, while the review
 * data (ratings, sub-ratings, comments, the service used) sat unread in the
 * model. Reviews are the one thing a marketplace landing page genuinely needs,
 * so they now get a section, and the provider CTA moved to its own component.
 */
export const TestimonialsSection: React.FC = () => {
  const { providers, language } = useApp();

  // Pull the strongest real reviews out of the provider data.
  const reviews = providers
    .flatMap(p =>
      (p.reviews ?? []).map(r => ({
        ...r,
        providerName: p.name,
        providerAvatar: p.avatar,
        providerCategory: p.category
      }))
    )
    .filter(r => r.comment && r.comment.length > 40)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  if (reviews.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-kolam-wash" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <header className="max-w-2xl mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ns-navy">
            {language === 'ta' ? 'வாடிக்கையாளர்கள் சொல்வது' : 'From people who booked'}
          </h2>
          <p className="mt-3 text-[17px] text-ns-text-secondary leading-relaxed">
            {language === 'ta'
              ? 'வேலை முடிந்த பிறகு எழுதப்பட்ட சரிபார்க்கப்பட்ட மதிப்புரைகள்.'
              : 'Verified reviews, written after the job was signed off.'}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <figure
              key={r.id}
              className="bg-kolam-surface border border-ns-border rounded-2xl p-6 flex flex-col"
            >
              <Quote className="w-6 h-6 text-kolam-marigold/70 shrink-0" aria-hidden="true" />

              <blockquote className="mt-4 text-[15px] text-ns-text leading-relaxed flex-1">
                {r.comment}
              </blockquote>

              {r.subRatings && (
                <dl className="mt-5 grid grid-cols-3 gap-3 py-4 border-y border-ns-border/70">
                  {[
                    { k: language === 'ta' ? 'தரம்' : 'Quality', v: r.subRatings.quality },
                    { k: language === 'ta' ? 'தொழில்முறை' : 'Conduct', v: r.subRatings.professionalism },
                    { k: language === 'ta' ? 'நேரம்' : 'On time', v: r.subRatings.punctuality }
                  ].map(({ k, v }) => (
                    <div key={k}>
                      <dt className="text-[10px] uppercase tracking-wider text-ns-text-secondary">{k}</dt>
                      <dd className="font-display text-base font-semibold text-ns-navy tnum mt-0.5">
                        {v.toFixed(1)}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <figcaption className="mt-5 flex items-center gap-3">
                <Avatar name={r.authorName} src={r.authorAvatar} size="sm" rounded="full" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ns-navy truncate">{r.authorName}</p>
                  <p className="text-xs text-ns-text-secondary truncate">
                    {r.serviceUsed} · {r.providerName}
                  </p>
                </div>
                <span className="ml-auto flex items-center gap-1 shrink-0">
                  <Star className="w-4 h-4 fill-kolam-marigold text-kolam-marigold" />
                  <span className="text-sm font-semibold text-ns-navy tnum">{r.rating.toFixed(1)}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
