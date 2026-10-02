import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showNumeric?: boolean;
  reviewCount?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 16,
  interactive = false,
  onRatingChange,
  showNumeric = false,
  reviewCount
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, idx) => {
          const starValue = idx + 1;
          const isFull = displayRating >= starValue;
          const isHalf = displayRating >= starValue - 0.5 && displayRating < starValue;

          return (
            <button
              key={idx}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onRatingChange?.(starValue)}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
              onMouseLeave={() => interactive && setHoverRating(0)}
              className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} focus:outline-none`}
            >
              <Star
                size={size}
                className={`${
                  isFull
                    ? 'fill-kolam-marigold text-kolam-marigold'
                    : isHalf
                    ? 'fill-kolam-marigold-line/50 text-kolam-marigold'
                    : 'fill-kolam-sunk text-ns-border'
                }`}
              />
            </button>
          );
        })}
      </div>
      {showNumeric && (
        <span className="font-semibold text-ns-navy text-sm ml-1">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-ns-text-secondary font-normal">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
