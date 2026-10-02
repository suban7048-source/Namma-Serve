import React from 'react';

interface InitialsAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  rounded?: 'full' | 'xl' | '2xl' | '3xl';
}

/**
 * Fallback monograms stay inside the Kolam range — indigo, teal and a single
 * marigold — instead of the previous eight-hue rainbow, so a wall of fallbacks
 * still reads as one system.
 */
const PALETTE = [
  { bg: 'from-brand-500 to-brand-700', fg: 'text-white' },
  { bg: 'from-[#0F6E66] to-[#0A4F49]', fg: 'text-white' },
  { bg: 'from-brand-600 to-brand-800', fg: 'text-white' },
  { bg: 'from-[#F0A830] to-[#D2882A]', fg: 'text-ns-navy' },
  { bg: 'from-[#2B4088] to-[#141D44]', fg: 'text-white' },
  { bg: 'from-[#17857C] to-[#0F6E66]', fg: 'text-white' },
];

const sizeMap = {
  sm: 'w-10 h-10 text-sm font-black',
  md: 'w-14 h-14 text-base font-black',
  lg: 'w-20 h-20 text-2xl font-black',
  xl: 'w-24 h-24 sm:w-32 sm:h-32 text-3xl font-black',
};

const roundedMap = {
  full: 'rounded-full',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
};

function getColorIndex(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % PALETTE.length;
}

function getInitials(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export const InitialsAvatar: React.FC<InitialsAvatarProps> = ({
  name,
  size = 'md',
  className = '',
  rounded = '2xl',
}) => {
  const colorIdx = getColorIndex(name);
  const { bg, fg } = PALETTE[colorIdx];
  const initials = getInitials(name);

  return (
    <div
      className={[sizeMap[size], roundedMap[rounded], 'bg-gradient-to-br', bg, 'text-white flex items-center justify-center shrink-0 select-none shadow-sm', className].join(' ')}
    >
      {initials}
    </div>
  );
};
