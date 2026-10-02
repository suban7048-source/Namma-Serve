import React, { useState } from 'react';
import { InitialsAvatar } from './InitialsAvatar';

type Size = 'sm' | 'md' | 'lg' | 'xl';
type Rounded = 'full' | 'xl' | '2xl' | '3xl';

interface AvatarProps {
  name: string;
  src?: string | null;
  size?: Size;
  rounded?: Rounded;
  className?: string;
  /** Marks the image as above-the-fold so the browser loads it immediately. */
  priority?: boolean;
}

/** Pixel sizes mirror InitialsAvatar so the fallback never shifts the layout. */
const PIXELS: Record<Size, number> = { sm: 40, md: 56, lg: 80, xl: 128 };

const SIZE_CLASS: Record<Size, string> = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
  xl: 'w-24 h-24 sm:w-32 sm:h-32'
};

const ROUNDED_CLASS: Record<Rounded, string> = {
  full: 'rounded-full',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl'
};

/**
 * A provider's photograph, with the initials monogram as the fallback.
 *
 * Every Provider record already carried an `avatar` URL and nothing in the app
 * ever rendered one — InitialsAvatar was used unconditionally in eight
 * components, which is the main reason the site looked empty. This shows the
 * photo when there is one and falls back cleanly when there isn't, or when the
 * image fails to load.
 */
export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  rounded = '2xl',
  className = '',
  priority = false
}) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <InitialsAvatar name={name} size={size} rounded={rounded} className={className} />;
  }

  const px = PIXELS[size];

  return (
    <img
      src={src}
      alt={name}
      width={px}
      height={px}
      // Explicit dimensions keep the row from jumping while the image arrives.
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={[
        SIZE_CLASS[size],
        ROUNDED_CLASS[rounded],
        'object-cover shrink-0 select-none bg-kolam-indigo-soft ring-1 ring-ns-border',
        className
      ].join(' ')}
    />
  );
};

/**
 * Wide image used for provider covers and portfolio tiles. Falls back to a
 * kolam-patterned indigo panel rather than an empty box.
 */
export const CoverImage: React.FC<{
  src?: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
}> = ({ src, alt, className = '', priority = false }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`bg-ns-navy kolam-field ${className}`}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover bg-ns-navy ${className}`}
    />
  );
};
