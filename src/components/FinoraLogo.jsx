import './FinoraLogo.css';

export const FinoraLogoIcon = ({ size = 36, variant = 'gradient', className = '' }) => {
  return (
    <div
      className={`finora-icon-container variant-${variant} ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <img
        src="/LOGO-FINORA.png"
        alt="FINORA Logo"
        className="finora-logo-img"
        style={{ width: `${size}px`, height: `${size}px` }}
        loading="eager"
      />
    </div>
  );
};

export const FinoraWordmark = ({ height = 24, variant = 'gradient', className = '' }) => {
  return (
    <img
      src="/TEKS-FINORA.png"
      alt="FINORA"
      className={`finora-wordmark-img variant-${variant} ${className}`}
      style={{ height: `${height}px` }}
      loading="eager"
    />
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
    xs: 24,
    sm: 32,
    md: 40,
    lg: 52,
    xl: 72,
  };

  const wordmarkHeights = {
    xs: 15,
    sm: 20,
    md: 26,
    lg: 34,
    xl: 46,
  };

  const currentIconSize = iconSizes[size] || 40;
  const currentWordmarkHeight = wordmarkHeights[size] || 26;

  return (
    <div
      className={`finora-logo-wrap size-${size} variant-${variant} ${className} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
    >
      <FinoraLogoIcon size={currentIconSize} variant={variant} />

      {showText && (
        <div className="finora-text-group">
          <FinoraWordmark height={currentWordmarkHeight} variant={variant} />
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

