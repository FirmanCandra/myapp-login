import { useEffect, useRef } from 'react';
import './AdBanner.css';

/**
 * AdBanner — Adsterra Banner Ad Component for FINORA
 *
 * Menampilkan Adsterra Banner 728x90 (iframe format).
 * Popunder & Social Bar sudah dipasang global di index.html.
 */

const AdBanner = ({ compact = false, className = '', spacing = 'both' }) => {
  const adContainerRef = useRef(null);
  const scriptInjected = useRef(false);

  useEffect(() => {
    if (!adContainerRef.current || scriptInjected.current) return;
    scriptInjected.current = true;

    try {
      // 1. Inject atOptions config
      const configScript = document.createElement('script');
      configScript.type = 'text/javascript';
      configScript.textContent = `
        atOptions = {
          'key' : '29aa8df72cd2f6d7228a54a0974e80da',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      adContainerRef.current.appendChild(configScript);

      // 2. Inject invoke script
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = 'https://www.highrevenueformat.com/29aa8df72cd2f6d7228a54a0974e80da/invoke.js';
      invokeScript.async = true;
      adContainerRef.current.appendChild(invokeScript);
    } catch (err) {
      console.error('[AdBanner] Failed to load Adsterra banner:', err);
    }
  }, []);

  // Build spacing classes
  const spacingClasses = [
    spacing === 'top' || spacing === 'both' ? 'ad-spacing-top' : '',
    spacing === 'bottom' || spacing === 'both' ? 'ad-spacing-bottom' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`ad-banner-wrapper ${spacingClasses} ${className}`}>
      <div className={`ad-banner-container ${compact ? 'ad-compact' : ''}`}>
        <span className="ad-banner-label">Ads</span>
        <div className="ad-banner-content" ref={adContainerRef} />
      </div>
    </div>
  );
};

export default AdBanner;
