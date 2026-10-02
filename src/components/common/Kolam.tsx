import React from 'react';

/**
 * The Kolam graphic system.
 *
 * A kolam is drawn as one continuous line looping around a grid of dots. That
 * constraint is the house style: every icon here is a single-weight 1.6px
 * stroke on a 32-unit grid, with one marigold dot marking the "start" of the
 * line. Icons replace the previous pastel-chip-plus-lucide treatment, where
 * thirteen categories each had their own colour.
 */

interface IconProps {
  className?: string;
  /** Stroke colour; defaults to current text colour so it inherits context. */
  tone?: string;
  /** Marigold accent dot. Set false inside already-marigold surfaces. */
  showDot?: boolean;
}

const base = (className?: string) => `shrink-0 ${className ?? 'w-8 h-8'}`;

const svgProps = {
  viewBox: '0 0 32 32',
  fill: 'none',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
  focusable: 'false' as const
};

const Dot: React.FC<{ cx: number; cy: number; show?: boolean }> = ({ cx, cy, show = true }) =>
  show ? <circle cx={cx} cy={cy} r="2.3" fill="#F0A830" stroke="none" /> : null;

export const IconAC: React.FC<IconProps> = ({ className, tone = 'currentColor', showDot }) => (
  <svg {...svgProps} stroke={tone} className={base(className)}>
    <rect x="4" y="6" width="24" height="12" rx="3" />
    <path d="M8 11.5h16M8 14.5h16" />
    <path d="M9 22c0 3 2.6 3.6 4.4 1.8M17 22c0 3.8 3 4.6 5 2.2" />
    <Dot cx={26} cy={24} show={showDot} />
  </svg>
);

export const IconPlumbing: React.FC<IconProps> = ({ className, tone = 'currentColor', showDot }) => (
  <svg {...svgProps} stroke={tone} className={base(className)}>
    <path d="M11 5v8.5a5 5 0 0 0 10 0V5" />
    <path d="M8 5h6M18 5h6" />
    <path d="M16 18.5V24a4 4 0 0 1-8 0" />
    <Dot cx={25} cy={25} show={showDot} />
  </svg>
);

export const IconElectrical: React.FC<IconProps> = ({ className, tone = 'currentColor', showDot }) => (
  <svg {...svgProps} stroke={tone} className={base(className)}>
    <path d="M18 3 9.5 17.5H16L14 29l8.5-14.5H16L18 3Z" />
    <Dot cx={26} cy={7} show={showDot} />
  </svg>
);

export const IconCleaning: React.FC<IconProps> = ({ className, tone = 'currentColor', showDot }) => (
  <svg {...svgProps} stroke={tone} className={base(className)}>
    <path d="M16 4c2.2 5 5.2 7.2 5.2 11.2a5.2 5.2 0 0 1-10.4 0C10.8 11.2 13.8 9 16 4Z" />
    <path d="M7 25.5c6 3 12 3 18 0" />
    <path d="M9.5 29c4.4 1.6 8.6 1.6 13 0" />
    <Dot cx={26} cy={11} show={showDot} />
  </svg>
);

export const IconAppliance: React.FC<IconProps> = ({ className, tone = 'currentColor', showDot }) => (
  <svg {...svgProps} stroke={tone} className={base(className)}>
    <rect x="5" y="4" width="22" height="24" rx="4" />
    <circle cx="16" cy="18" r="6.5" />
    <path d="M10 9h5" />
    <Dot cx={16} cy={18} show={showDot} />
  </svg>
);

export const IconCarpenter: React.FC<IconProps> = ({ className, tone = 'currentColor', showDot }) => (
  <svg {...svgProps} stroke={tone} className={base(className)}>
    <path d="M6 20 17 9l4 4L10 24l-4 1 0-5Z" />
    <path d="M19 7l3-3 6 6-3 3" />
    <Dot cx={8} cy={23} show={showDot} />
  </svg>
);

export const IconPainting: React.FC<IconProps> = ({ className, tone = 'currentColor', showDot }) => (
  <svg {...svgProps} stroke={tone} className={base(className)}>
    <rect x="5" y="4" width="16" height="7" rx="2" />
    <path d="M21 7.5h4.5a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H16" />
    <path d="M16 16v4M13.5 20h5v8h-5z" />
    <Dot cx={26} cy={11.5} show={showDot} />
  </svg>
);

export const IconPestControl: React.FC<IconProps> = ({ className, tone = 'currentColor', showDot }) => (
  <svg {...svgProps} stroke={tone} className={base(className)}>
    <path d="M16 4.5 27 8.5v7.8c0 6.2-4.4 10.2-11 11.9-6.6-1.7-11-5.7-11-11.9V8.5L16 4.5Z" />
    <path d="M11.5 16.5 15 20l6-6.5" />
    <Dot cx={16} cy={4.5} show={showDot} />
  </svg>
);

export const IconHomeMaintenance: React.FC<IconProps> = ({ className, tone = 'currentColor', showDot }) => (
  <svg {...svgProps} stroke={tone} className={base(className)}>
    <path d="M4.5 14.5 16 5l11.5 9.5" />
    <path d="M7.5 16.5V27h17V16.5" />
    <path d="M13 27v-6.5h6V27" />
    <Dot cx={16} cy={5} show={showDot} />
  </svg>
);

export const IconWashingMachine: React.FC<IconProps> = ({ className, tone = 'currentColor', showDot }) => (
  <svg {...svgProps} stroke={tone} className={base(className)}>
    <rect x="5" y="4" width="22" height="24" rx="4" />
    <circle cx="16" cy="18.5" r="6" />
    <path d="M10.6 16.6c2.2 2 3.6 2 5.4 0s3.2-2 5.4 0" />
    <Dot cx={22} cy={9} show={showDot} />
  </svg>
);

export const IconRefrigerator: React.FC<IconProps> = ({ className, tone = 'currentColor', showDot }) => (
  <svg {...svgProps} stroke={tone} className={base(className)}>
    <rect x="7" y="3" width="18" height="26" rx="4" />
    <path d="M7 13h18" />
    <path d="M11 7.5v2.5M11 16.5V19" />
    <Dot cx={21} cy={17} show={showDot} />
  </svg>
);

export const IconWaterPurifier: React.FC<IconProps> = ({ className, tone = 'currentColor', showDot }) => (
  <svg {...svgProps} stroke={tone} className={base(className)}>
    <path d="M16 3.5c4.4 5.6 7 9.3 7 12.6a7 7 0 0 1-14 0c0-3.3 2.6-7 7-12.6Z" />
    <path d="M12.5 16.8c0 2.2 1.6 3.8 3.5 3.8" />
    <Dot cx={16} cy={27.5} show={showDot} />
  </svg>
);

export const IconTV: React.FC<IconProps> = ({ className, tone = 'currentColor', showDot }) => (
  <svg {...svgProps} stroke={tone} className={base(className)}>
    <rect x="3.5" y="6.5" width="25" height="16" rx="3" />
    <path d="M11 27h10M16 22.5V27" />
    <Dot cx={24} cy={10.5} show={showDot} />
  </svg>
);

export const IconMore: React.FC<IconProps> = ({ className, tone = 'currentColor', showDot }) => (
  <svg {...svgProps} stroke={tone} className={base(className)}>
    <circle cx="16" cy="16" r="11.5" />
    <path d="M11.5 16h9M16.5 11.5 21 16l-4.5 4.5" />
    <Dot cx={16} cy={4.5} show={showDot} />
  </svg>
);

/** Category id → icon. Falls back to the arrow mark for anything unmapped. */
const ICONS: Record<string, React.FC<IconProps>> = {
  'ac-repair': IconAC,
  'plumbing': IconPlumbing,
  'electrical': IconElectrical,
  'cleaning': IconCleaning,
  'appliance-repair': IconAppliance,
  'carpenter': IconCarpenter,
  'painting': IconPainting,
  'pest-control': IconPestControl,
  'home-maintenance': IconHomeMaintenance,
  'washing-machine': IconWashingMachine,
  'refrigerator': IconRefrigerator,
  'ro-purifier': IconWaterPurifier,
  'tv-repair': IconTV
};

/** Also resolvable by display name, for components that only have the label. */
const ICONS_BY_NAME: Record<string, React.FC<IconProps>> = {
  'AC Repair & Service': IconAC,
  'Plumbing': IconPlumbing,
  'Electrical': IconElectrical,
  'Cleaning': IconCleaning,
  'Appliance Repair': IconAppliance,
  'Carpenter': IconCarpenter,
  'Painting': IconPainting,
  'Pest Control': IconPestControl,
  'Home Maintenance': IconHomeMaintenance,
  'Washing Machine Repair': IconWashingMachine,
  'Refrigerator Repair': IconRefrigerator,
  'RO/Water Purifier': IconWaterPurifier,
  'TV Repair': IconTV
};

export const CategoryIcon: React.FC<IconProps & { categoryId?: string; categoryName?: string }> = ({
  categoryId, categoryName, ...rest
}) => {
  const Icon =
    (categoryId && ICONS[categoryId]) ||
    (categoryName && ICONS_BY_NAME[categoryName]) ||
    IconMore;
  return <Icon {...rest} />;
};

/* ------------------------------------------------------------------ */

/**
 * The kolam mark: three nested loops around a centre dot, drawn in one line.
 * On load the stroke draws itself, which is how a kolam is actually made —
 * the animation is the subject, not decoration. Honours reduced-motion via
 * the rule in index.css.
 */
export const KolamMark: React.FC<{ className?: string; animate?: boolean; tone?: string }> = ({
  className = 'w-full h-auto',
  animate = true,
  tone = '#F0A830'
}) => (
  <svg
    viewBox="0 0 240 240"
    className={`${className} ${animate ? 'kolam-draw' : ''}`}
    style={{ ['--kolam-len' as any]: 900 }}
    aria-hidden="true"
    focusable="false"
  >
    {/* The pulli — the grid of dots the line is drawn around. Laid first,
        because that is the order it happens on a doorstep. */}
    <g fill={tone} opacity="0.5">
      {[60, 120, 180].map(y =>
        [60, 120, 180].map(x => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" />)
      )}
      <circle cx="120" cy="22" r="2" />
      <circle cx="120" cy="218" r="2" />
      <circle cx="22" cy="120" r="2" />
      <circle cx="218" cy="120" r="2" />
    </g>

    <g fill="none" stroke={tone} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Four petals looping around the centre dot — the poo kolam, the
          form most people draw. Each is one stroke out and back. */}
      {[0, 90, 180, 270].map(angle => (
        <path
          key={angle}
          d="M120 120 C 86 94, 84 52, 120 26 C 156 52, 154 94, 120 120 Z"
          transform={`rotate(${angle} 120 120)`}
        />
      ))}

      {/* Four more petals on the diagonals, shorter — the second pass. */}
      {[45, 135, 225, 315].map(angle => (
        <path
          key={angle}
          d="M120 120 C 100 104, 99 76, 120 60 C 141 76, 140 104, 120 120 Z"
          transform={`rotate(${angle} 120 120)`}
          opacity="0.55"
        />
      ))}

      {/* The closing loop that ties the whole figure together. */}
      <path d="M120 14 C 178 14, 226 62, 226 120 C 226 178, 178 226, 120 226 C 62 226, 14 178, 14 120 C 14 62, 62 14, 120 14 Z"
            opacity="0.45" strokeDasharray="1 9" />
    </g>

    <circle cx="120" cy="120" r="5.5" fill={tone} />
  </svg>
);

/** A dotted marigold rule that closes a section. */
export const KolamDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`kolam-rule w-full opacity-60 ${className}`} aria-hidden="true" />
);

/**
 * Empty / zero-result state. The app previously rendered bare text when a
 * filter matched nothing, which reads as a broken page rather than an answer.
 */
export const KolamEmptyState: React.FC<{
  title: string;
  description?: string;
  action?: React.ReactNode;
}> = ({ title, description, action }) => (
  <div className="flex flex-col items-center text-center py-16 px-6">
    <svg viewBox="0 0 120 120" className="w-28 h-28 mb-6" aria-hidden="true" focusable="false">
      <g fill="none" stroke="#C3C9E0" strokeWidth="1.6" strokeLinecap="round">
        <path d="M60 16 C92 30 106 44 110 60 C106 76 92 90 60 104 C28 90 14 76 10 60 C14 44 28 30 60 16 Z"
              strokeDasharray="5 7" />
        <path d="M60 40 C76 48 84 54 87 60 C84 66 76 72 60 80 C44 72 36 66 33 60 C36 54 44 48 60 40 Z" />
      </g>
      <circle cx="60" cy="60" r="4" fill="#F0A830" />
    </svg>
    <h3 className="font-display text-xl font-semibold text-ns-navy">{title}</h3>
    {description && (
      <p className="mt-2 text-sm text-ns-text-secondary max-w-sm leading-relaxed">{description}</p>
    )}
    {action && <div className="mt-6">{action}</div>}
  </div>
);
