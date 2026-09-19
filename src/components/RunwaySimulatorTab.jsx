import { useState, useMemo } from 'react';
import {
  HiOutlineCalculator,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineUserGroup,
  HiOutlineRefresh,
  HiOutlineSave,
  HiOutlineCheckCircle,
  HiOutlineLightningBolt,
  HiOutlineAcademicCap,
  HiOutlineCash,
  HiOutlineSparkles,
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
  BUSINESS_PRESETS,
  STUDENT_PRESETS,
} from '../services/financeService';
import './RunwaySimulator.css';

const SimulatorTooltip = ({ active, payload, label, isStudent }) => {
  if (active && payload && payload.length) {
    const base = payload.find((p) => p.dataKey === 'baselineCash')?.value || 0;
    const sim = payload.find((p) => p.dataKey === 'simulatedCash')?.value || 0;
    const diff = sim - base;
    return (
      <div className="sim-custom-tooltip glass-panel">
        <div className="sim-tooltip-month">{label}</div>
        <div className="sim-tooltip-row baseline">
          <span className="sim-dot" style={{ background: '#64748b' }} />
          <span>{isStudent ? 'Saldo Baseline:' : 'Baseline Cash:'}</span>
          <strong>{formatCurrency(base)}</strong>
        </div>
        <div className="sim-tooltip-row simulated">
          <span className="sim-dot" style={{ background: '#38bdf8' }} />
          <span>{isStudent ? 'Saldo Skenario:' : 'Simulated Cash:'}</span>
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

const RunwaySimulatorTab = ({ metrics, role = 'business' }) => {
  const isStudent = role === 'student';
  const presets = isStudent ? STUDENT_PRESETS : BUSINESS_PRESETS;

  const [revenueDeltaPct, setRevenueDeltaPct] = useState(0);
  const [opexDeltaPct, setOpexDeltaPct] = useState(0);
  const [newHiresCount, setNewHiresCount] = useState(0);
  const [newHiresAvgSalary, setNewHiresAvgSalary] = useState(isStudent ? 0 : 10000000);
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
    setNewHiresCount(preset.params.newHiresCount || 0);
    setNewHiresAvgSalary(preset.params.newHiresAvgSalary || 0);
    setCapexAmount(preset.params.capexAmount || 0);
    setCapexMonth(preset.params.capexMonth || 2);
    setCapitalInjection(preset.params.capitalInjection || 0);

    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  const resetToBaseline = () => {
    setActivePreset(null);
    setRevenueDeltaPct(0);
    setOpexDeltaPct(0);
    setNewHiresCount(0);
    setNewHiresAvgSalary(isStudent ? 0 : 10000000);
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
          <div className="sim-icon-box" style={{ background: isStudent ? 'rgba(56, 189, 248, 0.15)' : 'rgba(99, 102, 241, 0.15)', color: isStudent ? 'var(--color-primary)' : 'var(--color-purple)' }}>
            {isStudent ? <HiOutlineAcademicCap /> : <HiOutlineCalculator />}
          </div>
          <div>
            <h2>{isStudent ? 'Simulator Survival Tanggal Tua & UKT' : 'Simulator Skenario Keuangan'}</h2>
            <p>
              {isStudent
                ? 'Uji strategi hemat makan warteg, project freelance, dan rencana tabungan bayar UKT semesteran.'
                : 'Uji dampak perubahan omset, biaya operasional, dan keputusan strategis terhadap daya tahan kas.'}
            </p>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="preset-selector-group">
          <span className="preset-label">Pilihan Skenario:</span>
          <div className="preset-buttons-wrap">
            {presets.map((p) => (
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
            <h3>Parameter Simulasi {isStudent ? 'Mahasiswa' : 'Bisnis'}</h3>
          </div>

          <div className="controls-form">
            {/* 1. Revenue Delta Slider */}
            <div className="control-group">
              <div className="control-label-row">
                <span>{isStudent ? 'Kiriman Ortu & Freelance' : 'Fluktuasi Pendapatan (Omset)'}</span>
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
                <span>-50%</span>
                <span className="highlight-val">Est: {formatShortCurrency(simulatedMonthlyIncome)}/bln</span>
                <span>+100%</span>
              </div>
            </div>

            {/* 2. OPEX Delta Slider */}
            <div className="control-group">
              <div className="control-label-row">
                <span>{isStudent ? 'Pengeluaran Makan & Kost' : 'Biaya Operasional (OPEX)'}</span>
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
                <span>-40% (Hemat)</span>
                <span className="highlight-val">Est: {formatShortCurrency(simulatedMonthlyExpense)}/bln</span>
                <span>+60% (Boros)</span>
              </div>
            </div>

            {/* 3. Business Hiring vs Student Freelance / Side Job */}
            {!isStudent ? (
              <div className="control-group hiring-box">
                <div className="control-label-row">
                  <span className="flex-center gap-1">
                    <HiOutlineUserGroup /> Rencana Rekrut Karyawan Baru
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
                    aria-label="Kurangi 1 karyawan"
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
                    aria-label="Tambah 1 karyawan"
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
            ) : null}

            {/* 4. One-Time Capex / Student Wishlist & Target UKT */}
            <div className="control-group">
              <div className="control-label-row">
                <span>{isStudent ? 'Target Belanja / Bayar UKT (One-Time)' : 'Belanja Modal / Asset (One-Time CAPEX)'}</span>
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
                  {isStudent ? (
                    <>
                      <option value={0}>Tidak Ada (Rp 0)</option>
                      <option value={500000}>Servis Motor & Buku (Rp 500rb)</option>
                      <option value={1500000}>Ganti Smartphone (Rp 1.5 Jt)</option>
                      <option value={2500000}>Bayar UKT Semesteran (Rp 2.5 Jt)</option>
                      <option value={6000000}>Beli Laptop Baru (Rp 6 Jt)</option>
                    </>
                  ) : (
                    <>
                      <option value={0}>Tidak Ada (Rp 0)</option>
                      <option value={15000000}>Upgrade Hardware (Rp 15 Jt)</option>
                      <option value={30000000}>Mesin / Server (Rp 30 Jt)</option>
                      <option value={60000000}>Renovasi & Lisensi (Rp 60 Jt)</option>
                      <option value={100000000}>Ekspansi Cabang (Rp 100 Jt)</option>
                    </>
                  )}
                </select>

                {capexAmount > 0 && (
                  <select
                    value={capexMonth}
                    onChange={(e) => setCapexMonth(Number(e.target.value))}
                    className="sim-select capex-month-select"
                  >
                    <option value={1}>di Bulan +1</option>
                    <option value={2}>di Bulan +2</option>
                    <option value={3}>di Bulan +3</option>
                    <option value={4}>di Bulan +4</option>
                    <option value={6}>di Bulan +6</option>
                  </select>
                )}
              </div>
            </div>

            {/* 5. Capital Injection / Student Bonus & Bantuan */}
            <div className="control-group">
              <div className="control-label-row">
                <span>{isStudent ? 'Bantuan Ortu / Bonus Beasiswa' : 'Suntikan Modal / Dana Segar'}</span>
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
                {isStudent ? (
                  <>
                    <option value={0}>Rp 0 (Tabungan Sendiri)</option>
                    <option value={300000}>+ Rp 300rb (Tambahan Kiriman Ortu)</option>
                    <option value={600000}>+ Rp 600rb (Honor Beasiswa / Asdos)</option>
                    <option value={1500000}>+ Rp 1.5 Jt (Hadiah Lomba / Project)</option>
                  </>
                ) : (
                  <>
                    <option value={0}>Rp 0 (Kas Sendiri)</option>
                    <option value={50000000}>+ Rp 50 Juta (Modal Usaha / KUR)</option>
                    <option value={100000000}>+ Rp 100 Juta (Angel Funding)</option>
                    <option value={200000000}>+ Rp 200 Juta (Seed Round)</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Comparison Chart & Metrics */}
        <div className="sim-chart-panel glass-panel">
          {/* Top Outcome Bar */}
          <div className="sim-outcome-grid">
            <div className="outcome-card">
              <span className="outcome-label">{isStudent ? 'Ketahanan Dompet Awal' : 'Baseline Runway'}</span>
              <div className="outcome-val baseline">
                {baselineRunway >= 24 ? '∞ 24+ Bln' : `${baselineRunway.toFixed(1)} Bulan`}
              </div>
              <span className="outcome-sub">{isStudent ? 'Tanpa perubahan gaya hidup' : 'Kondisi riil saat ini'}</span>
            </div>

            <div className="outcome-card highlight">
              <span className="outcome-label">{isStudent ? 'Ketahanan Hasil Simulasi' : 'Simulated Runway'}</span>
              <div
                className="outcome-val simulated"
                style={{ color: isInfiniteRunway ? '#10b981' : simulatedRunway < 2 ? '#f43f5e' : '#38bdf8' }}
              >
                {isInfiniteRunway ? '∞ Aman (>24 Bln)' : `${simulatedRunway.toFixed(1)} Bulan`}
              </div>
              <div className="outcome-delta-tag">
                {runwayDelta === 0 ? (
                  <span>Tidak ada perubahan</span>
                ) : runwayGain ? (
                  <span className="gain">
                    <HiOutlineTrendingUp /> +{runwayDelta.toFixed(1)} Bulan Lebih Lama
                  </span>
                ) : (
                  <span className="loss">
                    <HiOutlineTrendingDown /> {runwayDelta.toFixed(1)} Bulan Lebih Cepat Habis
                  </span>
                )}
              </div>
            </div>

            <div className="outcome-card">
              <span className="outcome-label">{isStudent ? 'Sisa Saldo Bulanan' : 'Simulated Net Arus Kas'}</span>
              <div
                className="outcome-val"
                style={{ color: simulatedNetBurn <= 0 ? '#10b981' : '#f59e0b' }}
              >
                {simulatedNetBurn <= 0
                  ? `+${formatShortCurrency(Math.abs(simulatedNetBurn))}/bln`
                  : `-${formatShortCurrency(simulatedNetBurn)}/bln`}
              </div>
              <span className="outcome-sub">
                {simulatedNetBurn <= 0 ? (isStudent ? 'Surplus Dompet' : 'Surplus Operasional') : (isStudent ? 'Defisit / Nomok' : 'Net Monthly Defisit')}
              </span>
            </div>
          </div>

          {/* Dual-Curve Line Chart */}
          <div className="sim-chart-area">
            <div className="sim-chart-header">
              <h4>{isStudent ? 'Proyeksi Saldo Dompet 12 Bulan' : 'Proyeksi Kas 12 Bulan'}</h4>
              <div className="sim-legend-row">
                <div className="legend-chip baseline">
                  <span className="chip-line baseline" />
                  <span>Baseline</span>
                </div>
                <div className="legend-chip simulated">
                  <span className="chip-line simulated" />
                  <span>Skenario</span>
                </div>
              </div>
            </div>

            <div className="sim-chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastPoints} margin={{ top: 15, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="monthLabel" stroke="var(--color-text-muted)" tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} />
                  <YAxis
                    stroke="var(--color-text-muted)"
                    tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
                    tickFormatter={(v) => formatShortCurrency(v)}
                  />
                  <Tooltip content={<SimulatorTooltip isStudent={isStudent} />} />
                  <ReferenceLine y={0} stroke="#f43f5e" strokeDasharray="4 4" label={{ value: isStudent ? 'Uang Habis (Rp 0)' : 'Kas 0 (Cliff)', fill: '#fb7185', fontSize: 10, position: 'insideBottomRight' }} />
                  <Line
                    type="monotone"
                    dataKey="baselineCash"
                    name="Baseline Cash"
                    stroke="#64748b"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={{ r: 2.5, fill: '#64748b' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="simulatedCash"
                    name="Simulated Cash"
                    stroke="var(--color-primary)"
                    strokeWidth={3}
                    dot={{ r: 3.5, fill: 'var(--color-primary)' }}
                    activeDot={{ r: 6, fill: 'var(--color-primary)', stroke: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Executive Takeaway & Save Action */}
          <div className="sim-footer-takeaway">
            <div className="takeaway-text-box">
              <span className="takeaway-heading">{isStudent ? '💡 Tips Finansial Mahasiswa:' : 'Kesimpulan CFO:'}</span>
              <p>
                {isStudent
                  ? isInfiniteRunway
                    ? 'Hebat! Skenario ini menghasilkan surplus dompet yang konsisten. Kamu bisa mulai menabung untuk bayar UKT atau investasi laptop baru.'
                    : simulatedRunway < 2
                    ? '⚠️ Peringatan: Uang saku terancam menipis sebelum akhir bulan! Coba kurangi nongkrong kafe & utamakan makan warteg / masak sendiri.'
                    : `Saldo uang saku diproyeksikan bertahan selama ${simulatedRunway.toFixed(1)} bulan dengan gaya hidup dan pengeluaran ini.`
                  : isInfiniteRunway
                  ? 'Skenario ini menghasilkan arus kas positif berkelanjutan. Posisi stabil untuk ekspansi.'
                  : simulatedRunway < 6
                  ? 'Peringatan: Skenario ini memproyeksikan kas habis dalam kurang dari 6 bulan. Pertimbangkan efisiensi biaya.'
                  : `Cadangan kas diproyeksikan bertahan selama ${simulatedRunway.toFixed(1)} bulan. Posisi seimbang antara pertumbuhan dan keamanan.`}
              </p>
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
