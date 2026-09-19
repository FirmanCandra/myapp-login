import './FinoraLogo.css';

export const FinoraLogoIcon = ({ size = 36, variant = 'gradient', className = '' }) => {
  const isMono = variant === 'monochrome';
  const isWhite = variant === 'white';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`finora-logo-svg ${className}`}
    >
      <defs>
        {/* Main Brand Gradient (Indigo to Cyan) */}
        <linearGradient id="finoraGradMain" x1="15%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="45%" stopColor="#3B82F6" />
          <stop offset="85%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>

        {/* Top Wing Gradient */}
        <linearGradient id="finoraGradTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="60%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>

        {/* Bottom Spine Flow Gradient */}
        <linearGradient id="finoraGradSpine" x1="20%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>

        {/* Sparkle Star Gradient */}
        <linearGradient id="finoraGradSparkle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>

      {/* 1. Upper Curved Ribbon */}
      <path
        d="M 32 15 C 44 14 65 14 73 22 C 77 26 75 32 68 34 C 58 36 38 36 32 36 C 26 36 24 30 26 23 C 27 18 29 15 32 15 Z"
        fill={isWhite ? '#FFFFFF' : isMono ? '#0F172A' : 'url(#finoraGradTop)'}
      />

      {/* 2. Middle Horizontal Ribbon */}
      <path
        d="M 30 46 C 40 46 56 46 62 51 C 65 54 63 59 57 60 C 48 61 34 61 29 60 C 24 59 24 53 26 49 C 27 47 28 46 30 46 Z"
        fill={isWhite ? '#FFFFFF' : isMono ? '#0F172A' : 'url(#finoraGradMain)'}
      />

      {/* 3. Left Spine & Lower Flowing Tail */}
      <path
        d="M 34 16 C 25 21 19 32 19 46 C 19 59 23 72 29 81 C 33 87 39 90 44 90 C 47 90 49 87 48 83 C 45 74 41 62 38 48 C 36 37 36 24 35 17 C 35 16 34 16 34 16 Z"
        fill={isWhite ? 'rgba(255,255,255,0.85)' : isMono ? '#0F172A' : 'url(#finoraGradSpine)'}
      />

      {/* 4. Top-Right 4-Point Sparkle Star */}
      <path
        d="M 82 6 Q 82 17 71 17 Q 82 17 82 28 Q 82 17 93 17 Q 82 17 82 6 Z"
        fill={isWhite ? '#FFFFFF' : isMono ? '#0F172A' : 'url(#finoraGradSparkle)'}
      />
    </svg>
  );
};

const FinoraLogo = ({
  size = 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant = 'gradient', // 'gradient' | 'white' | 'monochrome'
  showText = true,
  showTagline = false,
  showPillars = false,
  customTagline = '',
  className = '',
  onClick,
}) => {
  const iconSizes = {
    xs: 22,
    sm: 28,
    md: 36,
    lg: 48,
    xl: 68,
  };

  const currentIconSize = iconSizes[size] || 36;

  return (
    <div
      className={`finora-logo-wrap size-${size} variant-${variant} ${className} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
    >
      <div className="finora-icon-container">
        <FinoraLogoIcon size={currentIconSize} variant={variant} />
      </div>

      {showText && (
        <div className="finora-text-group">
          <span className="finora-brand-title">FINORA</span>
          {showTagline && (
            <span className="finora-brand-tagline">
              {customTagline || 'Your Financial Intelligence'}
            </span>
          )}
          {showPillars && (
            <span className="finora-brand-pillars">
              SMART <span>/</span> SIMPLE <span>/</span> FUTURE-READY
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FinoraLogo;
