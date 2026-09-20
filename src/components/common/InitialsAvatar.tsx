import React from 'react';

interface InitialsAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  rounded?: 'full' | '2xl' | '3xl';
}

const PALETTE = [
  { bg: 'from-blue-500 to-blue-700' },
  { bg: 'from-emerald-500 to-emerald-700' },
  { bg: 'from-violet-500 to-violet-700' },
  { bg: 'from-amber-500 to-orange-600' },
  { bg: 'from-rose-500 to-rose-700' },
  { bg: 'from-sky-500 to-sky-700' },
  { bg: 'from-teal-500 to-teal-700' },
  { bg: 'from-indigo-500 to-indigo-700' },
];

const sizeMap = {
  sm: 'w-10 h-10 text-sm font-black',
  md: 'w-14 h-14 text-base font-black',
  lg: 'w-20 h-20 text-2xl font-black',
  xl: 'w-24 h-24 sm:w-32 sm:h-32 text-3xl font-black',
};

const roundedMap = {
  full: 'rounded-full',
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
  const { bg } = PALETTE[colorIdx];
  const initials = getInitials(name);

  return (
    <div
      className={[sizeMap[size], roundedMap[rounded], 'bg-gradient-to-br', bg, 'text-white flex items-center justify-center shrink-0 select-none shadow-sm', className].join(' ')}
    >
      {initials}
    </div>
  );
};
