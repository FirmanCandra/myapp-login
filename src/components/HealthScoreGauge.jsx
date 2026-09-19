import { HiOutlineTrendingUp, HiOutlineExclamationCircle } from 'react-icons/hi';
import './HealthScoreGauge.css';

const HealthScoreGauge = ({ score, metrics }) => {
  const isZeroState = !metrics || (metrics.totalBalance === 0 && metrics.totalIncome === 0 && metrics.totalExpense === 0);

  const getStatus = (val) => {
    if (isZeroState) return { label: 'Belum Ada Data', color: 'var(--color-text-muted)' };
    if (val >= 80) return { label: 'Prima', color: 'var(--color-emerald)' };
    if (val >= 60) return { label: 'Stabil', color: 'var(--color-primary)' };
    if (val >= 40) return { label: 'Waspada', color: 'var(--color-amber)' };
    return { label: 'Kritis', color: 'var(--color-rose)' };
  };

  const status = getStatus(score);
  const radius = 54;
  const circumference = Math.PI * radius;
  const progressOffset = circumference - (score / 100) * circumference;

  return (
    <div className="gauge-card glass-panel">
      <div className="card-header">
        <h3 className="section-title">Skor Kesehatan Keuangan</h3>
      </div>

      <div className="gauge-body">
        <div className="gauge-svg-wrap">
          <svg className="gauge-svg" viewBox="0 0 140 85">
            <defs>
              <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-rose)" />
                <stop offset="35%" stopColor="var(--color-amber)" />
                <stop offset="70%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-emerald)" />
              </linearGradient>
            </defs>
            <path d="M 16,75 A 54,54 0 0,1 124,75" fill="none" stroke="var(--color-border)" strokeWidth="11" strokeLinecap="round" />
            <path d="M 16,75 A 54,54 0 0,1 124,75" fill="none" stroke="url(#gaugeGrad)" strokeWidth="11" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={progressOffset}
              style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
          </svg>
          <div className="gauge-center">
            <span className="gauge-score" style={{ color: status.color }}>{score}</span>
            <span className="gauge-scale">/ 100</span>
          </div>
        </div>

        <div className="gauge-status" style={{ background: isZeroState ? 'var(--color-surface-hover)' : status.color + '15', borderColor: status.color + '40', color: status.color }}>
          {status.label}
        </div>

        <div className="gauge-factors">
          <div className="factor">
            <span className="f-label">Likuiditas</span>
            <span className="f-value">{isZeroState ? '-' : metrics.totalBalance > 100000000 ? 'Aman' : metrics.totalBalance > 50000000 ? 'Cukup' : 'Rendah'}</span>
          </div>
          <div className="factor">
            <span className="f-label">Arus Kas</span>
            <span className="f-value">{isZeroState ? '-' : metrics.profitMargin >= 0 ? 'Positif' : 'Negatif'}</span>
          </div>
          <div className="factor">
            <span className="f-label">Runway</span>
            <span className="f-value">{isZeroState ? '-' : metrics.runwayMonths > 50 ? 'Tak terbatas' : `${metrics.runwayMonths.toFixed(1)} bln`}</span>
          </div>
          <div className="factor">
            <span className="f-label">Margin</span>
            <span className="f-value">{isZeroState ? '-' : `${metrics.profitMargin.toFixed(1)}%`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthScoreGauge;
