import { HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineTrendingUp, HiOutlineExclamationCircle } from 'react-icons/hi';
import './HealthScoreGauge.css';

const HealthScoreGauge = ({ score, metrics }) => {
  const getStatus = (val) => {
    if (val >= 80) return { label: 'PRIMA (EXCELLENT)', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', icon: HiOutlineShieldCheck };
    if (val >= 60) return { label: 'STABIL (HEALTHY)', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)', icon: HiOutlineTrendingUp };
    if (val >= 40) return { label: 'WASPADA (MODERATE)', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', icon: HiOutlineExclamationCircle };
    return { label: 'KRITIS (DANGER)', color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.15)', icon: HiOutlineExclamationCircle };
  };

  const status = getStatus(score);
  const StatusIcon = status.icon;

  // SVG Gauge calculations (circumference for radius 45 is ~282.7, semi-arc ~180deg)
  const radius = 54;
  const circumference = Math.PI * radius; // Half-circle arc
  const progressOffset = circumference - (score / 100) * circumference;

  return (
    <div className="health-gauge-card glass-panel">
      <div className="gauge-header">
        <div className="gauge-title-row">
          <HiOutlineSparkles className="gauge-sparkle-icon" />
          <h3>AI Financial Health Index</h3>
        </div>
        <span className="gauge-live-badge">REAL-TIME</span>
      </div>

      <div className="gauge-body">
        {/* Semi-circular Radial SVG */}
        <div className="gauge-svg-container">
          <svg className="gauge-svg" viewBox="0 0 140 85">
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="35%" stopColor="#f59e0b" />
                <stop offset="70%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Arc */}
            <path
              d="M 16,75 A 54,54 0 0,1 124,75"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="12"
              strokeLinecap="round"
            />

            {/* Value Arc */}
            <path
              d="M 16,75 A 54,54 0 0,1 124,75"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              filter="url(#glowEffect)"
              style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
          </svg>

          <div className="gauge-center-content">
            <div className="gauge-score-number" style={{ color: status.color }}>
              {score}
            </div>
            <div className="gauge-scale">/ 100</div>
          </div>
        </div>

        {/* Status pill & description */}
        <div className="gauge-status-box" style={{ background: status.bg, borderColor: status.color }}>
          <StatusIcon style={{ color: status.color, fontSize: '1.1rem' }} />
          <span style={{ color: status.color, fontWeight: 700 }}>{status.label}</span>
        </div>

        {/* Factor Breakdown */}
        <div className="gauge-factors-grid">
          <div className="factor-item">
            <span className="factor-label">Liquidity Buffer</span>
            <span className="factor-value" style={{ color: metrics.totalBalance > 50000000 ? '#10b981' : '#f59e0b' }}>
              {metrics.totalBalance > 100000000 ? 'Sangat Aman (>100jt)' : metrics.totalBalance > 50000000 ? 'Cukup' : 'Rendah'}
            </span>
          </div>

          <div className="factor-item">
            <span className="factor-label">Burn Efficiency</span>
            <span className="factor-value" style={{ color: metrics.profitMargin >= 0 ? '#10b981' : '#f43f5e' }}>
              {metrics.profitMargin >= 0 ? 'Cashflow Positif' : 'Net Burn Terkendali'}
            </span>
          </div>

          <div className="factor-item">
            <span className="factor-label">Runway Longevity</span>
            <span className="factor-value" style={{ color: metrics.runwayMonths >= 12 ? '#10b981' : '#38bdf8' }}>
              {metrics.runwayMonths > 50 ? 'Profitable / ∞' : `${metrics.runwayMonths.toFixed(1)} Bulan`}
            </span>
          </div>

          <div className="factor-item">
            <span className="factor-label">Profit Margin</span>
            <span className="factor-value" style={{ color: metrics.profitMargin >= 0 ? '#10b981' : '#f43f5e' }}>
              {metrics.profitMargin.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthScoreGauge;
