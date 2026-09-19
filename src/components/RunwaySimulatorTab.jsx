import { useState, useMemo } from 'react';
import {
  HiOutlineCalculator,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineUserGroup,
  HiOutlineSparkles,
  HiOutlineRefresh,
  HiOutlineSave,
  HiOutlineCheckCircle,
  HiOutlineLightningBolt,
} from 'react-icons/hi';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import confetti from 'canvas-confetti';
import {
  formatCurrency,
  formatShortCurrency,
  simulateRunwayScenario,
} from '../services/financeService';
import './RunwaySimulator.css';

const PRESETS = [
  {
    id: 'survival',
    name: '🛡️ Survival / Lean Mode',
    desc: 'Pangkas biaya operasional 25%, freeze hiring, amankan kas',
    params: { revenueDeltaPct: -5, opexDeltaPct: -25, newHiresCount: 0, newHiresAvgSalary: 10000000, capexAmount: 0, capexMonth: 1, capitalInjection: 0 },
  },
  {
    id: 'aggressive',
    name: '🚀 Aggressive Expansion',
    desc: 'Target revenue naik 35%, rekrut 2 engineer, upgrade server',
    params: { revenueDeltaPct: 35, opexDeltaPct: 10, newHiresCount: 2, newHiresAvgSalary: 12000000, capexAmount: 25000000, capexMonth: 2, capitalInjection: 0 },
  },
  {
    id: 'recession',
    name: '📉 Recession Shock Test',
    desc: 'Uji ketahanan jika revenue anjlok 30% tanpa efisiensi biaya',
    params: { revenueDeltaPct: -30, opexDeltaPct: 0, newHiresCount: 0, newHiresAvgSalary: 10000000, capexAmount: 0, capexMonth: 1, capitalInjection: 0 },
  },
  {
    id: 'fundraise',
    name: '💰 Capital Injection',
    desc: 'Suntikan modal investor Rp 150 Jt + ekspansi pemasaran',
    params: { revenueDeltaPct: 20, opexDeltaPct: 15, newHiresCount: 1, newHiresAvgSalary: 10000000, capexAmount: 0, capexMonth: 1, capitalInjection: 150000000 },
  },
];

const SimulatorTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const base = payload.find((p) => p.dataKey === 'baselineCash')?.value || 0;
    const sim = payload.find((p) => p.dataKey === 'simulatedCash')?.value || 0;
    const diff = sim - base;
    return (
      <div className="sim-custom-tooltip glass-panel">
        <div className="sim-tooltip-month">{label}</div>
        <div className="sim-tooltip-row baseline">
          <span className="sim-dot" style={{ background: '#64748b' }} />
          <span>Baseline Cash:</span>
          <strong>{formatCurrency(base)}</strong>
        </div>
        <div className="sim-tooltip-row simulated">
          <span className="sim-dot" style={{ background: '#38bdf8' }} />
          <span>Simulated Cash:</span>
          <strong style={{ color: sim >= 0 ? '#38bdf8' : '#fb7185' }}>{formatCurrency(sim)}</strong>
        </div>
        <div className="sim-tooltip-diff">
          <span>Selisih Skenario:</span>
          <strong style={{ color: diff >= 0 ? '#34d399' : '#fb7185' }}>
            {diff >= 0 ? '+' : ''}{formatShortCurrency(diff)}
          </strong>
        </div>
      </div>
    );
  }
  return null;
};

const RunwaySimulatorTab = ({ metrics }) => {
  const [revenueDeltaPct, setRevenueDeltaPct] = useState(0);
  const [opexDeltaPct, setOpexDeltaPct] = useState(0);
  const [newHiresCount, setNewHiresCount] = useState(0);
  const [newHiresAvgSalary, setNewHiresAvgSalary] = useState(10000000);
  const [capexAmount, setCapexAmount] = useState(0);
  const [capexMonth, setCapexMonth] = useState(2);
  const [capitalInjection, setCapitalInjection] = useState(0);
  const [activePreset, setActivePreset] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // Compute Simulation
  const simulationResult = useMemo(() => {
    return simulateRunwayScenario(metrics, {
      revenueDeltaPct,
      opexDeltaPct,
      newHiresCount,
      newHiresAvgSalary,
      capexAmount,
      capexMonth,
      capitalInjection,
      forecastMonths: 12,
    });
  }, [
    metrics,
    revenueDeltaPct,
    opexDeltaPct,
    newHiresCount,
    newHiresAvgSalary,
    capexAmount,
    capexMonth,
    capitalInjection,
  ]);

  const applyPreset = (preset) => {
    setActivePreset(preset.id);
    setRevenueDeltaPct(preset.params.revenueDeltaPct);
    setOpexDeltaPct(preset.params.opexDeltaPct);
    setNewHiresCount(preset.params.newHiresCount);
    setNewHiresAvgSalary(preset.params.newHiresAvgSalary);
    setCapexAmount(preset.params.capexAmount);
    setCapexMonth(preset.params.capexMonth);
    setCapitalInjection(preset.params.capitalInjection);

    if (preset.id === 'survival' || preset.id === 'fundraise') {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  const resetToBaseline = () => {
    setActivePreset(null);
    setRevenueDeltaPct(0);
    setOpexDeltaPct(0);
    setNewHiresCount(0);
    setNewHiresAvgSalary(10000000);
    setCapexAmount(0);
    setCapexMonth(2);
    setCapitalInjection(0);
  };

  const handleSaveScenario = () => {
    setIsSaved(true);
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.5 } });
    setTimeout(() => setIsSaved(false), 3000);
  };

  const {
    forecastPoints,
    baselineRunway,
    simulatedRunway,
    runwayDelta,
    simulatedMonthlyIncome,
    simulatedMonthlyExpense,
    simulatedNetBurn,
  } = simulationResult;

  const runwayGain = runwayDelta > 0;
  const isInfiniteRunway = simulatedRunway >= 24;

  return (
    <div className="simulator-tab-content">
      {/* 1. Header Banner & Presets */}
      <div className="sim-header-card glass-panel">
        <div className="sim-title-row">
          <div className="sim-icon-box">
            <HiOutlineCalculator />
          </div>
          <div>
            <h2>Interactive "What-If" Runway Simulator</h2>
            <p>
              Uji ketahanan finansial, proyeksi cash cliff, dan keputusan strategis (hiring, belanja modal, fluktuasi
              omset) secara real-time.
            </p>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="preset-selector-group">
          <span className="preset-label">Preset Cepat:</span>
          <div className="preset-buttons-wrap">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                className={`preset-chip-btn ${activePreset === p.id ? 'active' : ''}`}
                onClick={() => applyPreset(p)}
                title={p.desc}
              >
                {p.name}
              </button>
            ))}
            <button className="preset-chip-btn reset" onClick={resetToBaseline}>
              <HiOutlineRefresh /> Reset Baseline
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Simulation Workspace (Controls + Dual-Curve Chart) */}
      <div className="sim-main-grid">
        {/* Left Column: Interactive Sliders & Inputs */}
        <div className="sim-controls-panel glass-panel">
          <div className="panel-subheading">
            <HiOutlineLightningBolt className="icon-bolt" />
            <h3>Parameter Simulasi</h3>
          </div>

          <div className="controls-form">
            {/* 1. Revenue Delta Slider */}
            <div className="control-group">
              <div className="control-label-row">
                <span>Fluktuasi Pendapatan (Revenue)</span>
                <span className={`slider-badge ${revenueDeltaPct >= 0 ? 'positive' : 'negative'}`}>
                  {revenueDeltaPct >= 0 ? `+${revenueDeltaPct}%` : `${revenueDeltaPct}%`}
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="100"
                step="5"
                value={revenueDeltaPct}
                onChange={(e) => {
                  setActivePreset(null);
                  setRevenueDeltaPct(Number(e.target.value));
                }}
                className="sim-range-slider"
              />
              <div className="slider-sub-info">
                <span>-50% (Krisis)</span>
                <span className="highlight-val">Est: {formatShortCurrency(simulatedMonthlyIncome)}/bln</span>
                <span>+100% (Scale)</span>
              </div>
            </div>

            {/* 2. OPEX Delta Slider */}
            <div className="control-group">
              <div className="control-label-row">
                <span>Penyesuaian Biaya Operasional (OPEX)</span>
                <span className={`slider-badge ${opexDeltaPct <= 0 ? 'positive' : 'negative'}`}>
                  {opexDeltaPct >= 0 ? `+${opexDeltaPct}%` : `${opexDeltaPct}%`}
                </span>
              </div>
              <input
                type="range"
                min="-40"
                max="60"
                step="5"
                value={opexDeltaPct}
                onChange={(e) => {
                  setActivePreset(null);
                  setOpexDeltaPct(Number(e.target.value));
                }}
                className="sim-range-slider"
              />
              <div className="slider-sub-info">
                <span>-40% (Lean)</span>
                <span className="highlight-val">Est: {formatShortCurrency(simulatedMonthlyExpense)}/bln</span>
                <span>+60% (Exp)</span>
              </div>
            </div>

            {/* 3. Team Hiring Plan */}
            <div className="control-group hiring-box">
              <div className="control-label-row">
                <span className="flex-center gap-1">
                  <HiOutlineUserGroup /> Rencana Rekrut Tim Baru
                </span>
                <span className="slider-badge neutral">{newHiresCount} Orang</span>
              </div>
              <div className="stepper-row">
                <button
                  className="stepper-btn"
                  onClick={() => {
                    setActivePreset(null);
                    setNewHiresCount(Math.max(0, newHiresCount - 1));
                  }}
                  disabled={newHiresCount === 0}
                >
                  -
                </button>
                <span className="stepper-val">{newHiresCount} Anggota</span>
                <button
                  className="stepper-btn"
                  onClick={() => {
                    setActivePreset(null);
                    setNewHiresCount(newHiresCount + 1);
                  }}
                >
                  +
                </button>
              </div>

              {newHiresCount > 0 && (
                <div className="hire-salary-field">
                  <span className="sub-label">Rata-rata Gaji / Orang:</span>
                  <select
                    value={newHiresAvgSalary}
                    onChange={(e) => setNewHiresAvgSalary(Number(e.target.value))}
                    className="sim-select"
                  >
                    <option value={7000000}>Rp 7 Jt/bln (Junior)</option>
                    <option value={10000000}>Rp 10 Jt/bln (Mid-Level)</option>
                    <option value={15000000}>Rp 15 Jt/bln (Senior / Lead)</option>
                    <option value={20000000}>Rp 20 Jt/bln (Head / Specialist)</option>
                  </select>
                  <div className="hiring-impact-tag">
                    Beban Tambahan: +{formatShortCurrency(newHiresCount * newHiresAvgSalary)}/bln
                  </div>
                </div>
              )}
            </div>

            {/* 4. One-Time Capex Purchase */}
            <div className="control-group">
              <div className="control-label-row">
                <span>Belanja Modal / Asset (One-Time CAPEX)</span>
                <span className="slider-badge neutral">{formatShortCurrency(capexAmount)}</span>
              </div>
              <div className="capex-inputs-row">
                <select
                  value={capexAmount}
                  onChange={(e) => {
                    setActivePreset(null);
                    setCapexAmount(Number(e.target.value));
                  }}
                  className="sim-select flex-1"
                >
                  <option value={0}>Tidak Ada (Rp 0)</option>
                  <option value={15000000}>Upgrade Hardware (Rp 15 Jt)</option>
                  <option value={30000000}>Mesin / Server Cluster (Rp 30 Jt)</option>
                  <option value={60000000}>Renovasi & Lisensi Besar (Rp 60 Jt)</option>
                  <option value={100000000}>Ekspansi Cabang (Rp 100 Jt)</option>
                </select>

                {capexAmount > 0 && (
                  <select
                    value={capexMonth}
                    onChange={(e) => setCapexMonth(Number(e.target.value))}
                    className="sim-select"
                    style={{ width: '130px' }}
                  >
                    <option value={1}>di Bulan +1</option>
                    <option value={2}>di Bulan +2</option>
                    <option value={3}>di Bulan +3</option>
                    <option value={6}>di Bulan +6</option>
                  </select>
                )}
              </div>
            </div>

            {/* 5. Capital Injection */}
            <div className="control-group">
              <div className="control-label-row">
                <span>Suntikan Dana / Pinjaman (Injeksi Kas)</span>
                <span className="slider-badge positive">{formatShortCurrency(capitalInjection)}</span>
              </div>
              <select
                value={capitalInjection}
                onChange={(e) => {
                  setActivePreset(null);
                  setCapitalInjection(Number(e.target.value));
                }}
                className="sim-select"
              >
                <option value={0}>Rp 0 (Kas Sendiri)</option>
                <option value={50000000}>+ Rp 50 Juta (Modal Usaha / KUR)</option>
                <option value={100000000}>+ Rp 100 Juta (Angel Funding)</option>
                <option value={200000000}>+ Rp 200 Juta (Seed Round)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Comparison Chart & Metrics */}
        <div className="sim-chart-panel glass-panel">
          {/* Top Outcome Bar */}
          <div className="sim-outcome-grid">
            <div className="outcome-card">
              <span className="outcome-label">Baseline Runway</span>
              <div className="outcome-val baseline">
                {baselineRunway >= 24 ? '∞ 24+ Bln' : `${baselineRunway.toFixed(1)} Bulan`}
              </div>
              <span className="outcome-sub">Skenario saat ini</span>
            </div>

            <div className="outcome-card highlight">
              <span className="outcome-label">Simulated Runway</span>
              <div
                className="outcome-val simulated"
                style={{ color: isInfiniteRunway ? '#10b981' : simulatedRunway < 6 ? '#f43f5e' : '#38bdf8' }}
              >
                {isInfiniteRunway ? '∞ Aman (>24 Bln)' : `${simulatedRunway.toFixed(1)} Bulan`}
              </div>
              <div className="outcome-delta-tag">
                {runwayDelta === 0 ? (
                  <span>Tidak ada perubahan</span>
                ) : runwayGain ? (
                  <span className="gain">
                    <HiOutlineTrendingUp /> +{runwayDelta.toFixed(1)} Bulan Lifeline
                  </span>
                ) : (
                  <span className="loss">
                    <HiOutlineTrendingDown /> {runwayDelta.toFixed(1)} Bulan Lebih Cepat Habis
                  </span>
                )}
              </div>
            </div>

            <div className="outcome-card">
              <span className="outcome-label">Simulated Net Cashflow</span>
              <div
                className="outcome-val"
                style={{ color: simulatedNetBurn <= 0 ? '#10b981' : '#f59e0b', fontSize: '1.25rem' }}
              >
                {simulatedNetBurn <= 0
                  ? `+${formatShortCurrency(Math.abs(simulatedNetBurn))}/bln`
                  : `-${formatShortCurrency(simulatedNetBurn)}/bln`}
              </div>
              <span className="outcome-sub">
                {simulatedNetBurn <= 0 ? 'Surplus / Menguntungkan' : 'Net Monthly Burn'}
              </span>
            </div>
          </div>

          {/* Dual-Curve Line Chart */}
          <div className="sim-chart-area">
            <div className="sim-chart-header">
              <h4>Proyeksi Kas 12 Bulan ke Depan</h4>
              <div className="sim-legend-row">
                <div className="legend-chip baseline">
                  <span className="chip-line baseline" />
                  <span>Baseline</span>
                </div>
                <div className="legend-chip simulated">
                  <span className="chip-line simulated" />
                  <span>Skenario Simulasi</span>
                </div>
              </div>
            </div>

            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastPoints} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                  <XAxis dataKey="monthLabel" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    tickFormatter={(v) => formatShortCurrency(v)}
                  />
                  <Tooltip content={<SimulatorTooltip />} />
                  <ReferenceLine y={0} stroke="#f43f5e" strokeDasharray="4 4" label={{ value: 'Cash 0 (Cliff)', fill: '#fb7185', fontSize: 11, position: 'insideBottomRight' }} />
                  <Line
                    type="monotone"
                    dataKey="baselineCash"
                    name="Baseline Cash"
                    stroke="#64748b"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={{ r: 3, fill: '#64748b' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="simulatedCash"
                    name="Simulated Cash"
                    stroke="#38bdf8"
                    strokeWidth={3.5}
                    dot={{ r: 4, fill: '#38bdf8' }}
                    activeDot={{ r: 7, fill: '#38bdf8', stroke: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Executive Takeaway & Save Action */}
          <div className="sim-footer-takeaway">
            <div className="takeaway-text-box">
              <HiOutlineSparkles className="takeaway-icon" />
              <div>
                <span className="takeaway-heading">AI CFO Verdict:</span>
                <p>
                  {isInfiniteRunway
                    ? 'Skenario ini menghasilkan arus kas positif yang berkelanjutan. Bisnis memiliki stabilitas tinggi untuk ekspansi.'
                    : simulatedRunway < 6
                    ? '⚠️ AWAS: Skenario ini memicu kehabisan kas dalam waktu kurang dari 6 bulan. Disarankan memperkecil ekspansi atau mencari pendanaan tambahan.'
                    : `Skenario ini memproyeksikan cadangan kas bertahan selama ${simulatedRunway.toFixed(1)} bulan. Strategi yang cukup seimbang antara pertumbuhan dan keamanan.`}
                </p>
              </div>
            </div>

            <button className={`btn-save-scenario ${isSaved ? 'saved' : ''}`} onClick={handleSaveScenario}>
              {isSaved ? (
                <>
                  <HiOutlineCheckCircle /> Skenario Tersimpan!
                </>
              ) : (
                <>
                  <HiOutlineSave /> Simpan Skenario
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunwaySimulatorTab;
