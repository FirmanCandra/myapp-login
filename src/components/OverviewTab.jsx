import { useState } from 'react';
import {
  HiOutlineCash,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineClock,
  HiOutlineArrowRight,
  HiOutlineDocumentSearch,
  HiOutlinePlus,
  HiOutlineCreditCard,
  HiOutlineLightningBolt,
  HiOutlineCalendar,
} from 'react-icons/hi';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import HealthScoreGauge from './HealthScoreGauge';
import {
  formatCurrency,
  formatShortCurrency,
  generateHistoricalTrend,
  generateCategoryBreakdown,
  generateCfoInsights,
} from '../services/financeService';
import './OverviewTab.css';

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip glass-panel">
        <div className="tooltip-label">{label}</div>
        {payload.map((entry, i) => (
          <div key={i} className="tooltip-row" style={{ color: entry.color }}>
            <span className="tooltip-dot" style={{ background: entry.color }} />
            <span>{entry.name}:</span>
            <strong>{formatCurrency(entry.value)}</strong>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const OverviewTab = ({
  metrics,
  transactions,
  startingCash,
  onNavigateTab,
  onOpenScanner,
  onOpenNewTx,
  role = 'business',
}) => {
  const [chartView, setChartView] = useState('cashflow');
  const trendData = generateHistoricalTrend(transactions, startingCash);
  const categoryData = generateCategoryBreakdown(transactions);
  const insights = generateCfoInsights(transactions, metrics, role);

  const netCashflow = metrics.avgMonthlyIncome - metrics.avgMonthlyExpense;
  const isStudent = role === 'student';

  return (
    <div className="overview-content">
      {/* KPI Cards */}
      <section className="kpi-row">
        {/* KPI 1: Total Cash / Sisa Uang Saku */}
        <div className="kpi-card glass-panel">
          <div className="kpi-header">
            <div className="kpi-icon primary"><HiOutlineCash /></div>
            <span className="glass-pill pill-primary">{isStudent ? 'Uang Saku' : 'Kas'}</span>
          </div>
          <span className="kpi-label">{isStudent ? 'Sisa Saldo & Tabungan' : 'Saldo Kas'}</span>
          <span className="kpi-value">{formatCurrency(metrics.totalBalance)}</span>
          <span className="kpi-sub">Modal: {formatShortCurrency(startingCash)}</span>
        </div>

        {/* KPI 2: Expense */}
        <div className="kpi-card glass-panel">
          <div className="kpi-header">
            <div className="kpi-icon rose"><HiOutlineTrendingDown /></div>
            <span className="glass-pill pill-rose">{isStudent ? 'Pengeluaran' : 'Pengeluaran'}</span>
          </div>
          <span className="kpi-label">{isStudent ? 'Total Keluar / Bulan' : 'Rata-rata Keluar / Bulan'}</span>
          <span className="kpi-value">{formatCurrency(metrics.avgMonthlyExpense)}</span>
          <span className="kpi-sub">{isStudent ? 'Biaya makan, kost & jajan' : 'Operasional bulanan'}</span>
        </div>

        {/* KPI 3: Net Cashflow or Safe Daily Limit */}
        <div className="kpi-card glass-panel">
          <div className="kpi-header">
            <div className={`kpi-icon ${isStudent ? 'emerald' : netCashflow >= 0 ? 'emerald' : 'amber'}`}>
              {isStudent ? <HiOutlineLightningBolt /> : netCashflow >= 0 ? <HiOutlineTrendingUp /> : <HiOutlineTrendingDown />}
            </div>
            <span className={`glass-pill ${isStudent ? 'pill-emerald' : netCashflow >= 0 ? 'pill-emerald' : 'pill-amber'}`}>
              {isStudent ? 'Safe Daily' : netCashflow >= 0 ? 'Surplus' : 'Defisit'}
            </span>
          </div>
          <span className="kpi-label">{isStudent ? 'Batas Jajan Harian Aman' : 'Arus Kas Bersih / Bulan'}</span>
          <span className="kpi-value" style={{ color: isStudent ? 'var(--color-emerald)' : netCashflow >= 0 ? 'var(--color-emerald)' : 'var(--color-amber)' }}>
            {isStudent ? formatCurrency(metrics.safeDailyAllowance) : formatCurrency(netCashflow)}
          </span>
          <span className="kpi-sub">
            {isStudent
              ? `Batas aman s/d ${metrics.daysRemaining} hari ke depan`
              : `Margin: ${metrics.profitMargin.toFixed(1)}%`}
          </span>
        </div>

        {/* KPI 4: Survival / Runway */}
        <div className="kpi-card glass-panel">
          <div className="kpi-header">
            <div className="kpi-icon purple">
              {isStudent ? <HiOutlineCalendar /> : <HiOutlineClock />}
            </div>
            <span className="glass-pill pill-purple">{isStudent ? 'Survival' : 'Runway'}</span>
          </div>
          <span className="kpi-label">{isStudent ? 'Ketahanan Dompet' : 'Daya Tahan Kas'}</span>
          <span className="kpi-value">
            {isStudent
              ? metrics.safeDailyAllowance >= 30000 ? '✅ Aman' : '⚠️ Kritis'
              : metrics.runwayMonths > 50 ? '∞ Sehat' : `${metrics.runwayMonths.toFixed(1)} Bulan`}
          </span>
          <button className="kpi-link" onClick={() => onNavigateTab('simulator')}>
            {isStudent ? 'Uji Survival Kost' : 'Buka Simulator'} <HiOutlineArrowRight />
          </button>
        </div>
      </section>

      {/* Chart + Quick Actions */}
      <section className="chart-section">
        <div className="chart-card glass-panel">
          <div className="chart-top">
            <div>
              <h3 className="section-title">{isStudent ? 'Arus Uang Saku Bulanan' : 'Tren Arus Kas'}</h3>
              <p className="section-sub">
                {isStudent
                  ? 'Perbandingan uang kiriman/freelance vs jajan harian'
                  : 'Perbandingan pemasukan dan pengeluaran per bulan'}
              </p>
            </div>
            <div className="chart-toggles">
              <button
                className={`toggle-btn ${chartView === 'cashflow' ? 'active' : ''}`}
                onClick={() => setChartView('cashflow')}
              >
                {isStudent ? 'Masuk vs Keluar' : 'Pemasukan vs Keluar'}
              </button>
              <button
                className={`toggle-btn ${chartView === 'balance' ? 'active' : ''}`}
                onClick={() => setChartView('balance')}
              >
                {isStudent ? 'Saldo Dompet' : 'Saldo Kas'}
              </button>
            </div>
          </div>

          <div className="overview-chart-container">
            <ResponsiveContainer width="100%" height="100%">
              {chartView === 'cashflow' ? (
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-emerald)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-emerald)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-rose)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-rose)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--color-text-muted)" tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} />
                  <YAxis stroke="var(--color-text-muted)" tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} tickFormatter={formatShortCurrency} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="income" name={isStudent ? 'Uang Masuk' : 'Pemasukan'} stroke="var(--color-emerald)" strokeWidth={2} fill="url(#gIncome)" />
                  <Area type="monotone" dataKey="expense" name={isStudent ? 'Pengeluaran' : 'Pengeluaran'} stroke="var(--color-rose)" strokeWidth={2} fill="url(#gExpense)" />
                </AreaChart>
              ) : (
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--color-text-muted)" tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} />
                  <YAxis stroke="var(--color-text-muted)" tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} tickFormatter={formatShortCurrency} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="balance" name="Saldo Kas" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#gBalance)" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="chart-legend">
            {chartView === 'cashflow' ? (
              <>
                <span className="legend"><span className="dot emerald" /> Masuk: {formatShortCurrency(metrics.totalIncome)}</span>
                <span className="legend"><span className="dot rose" /> Keluar: {formatShortCurrency(metrics.totalExpense)}</span>
              </>
            ) : (
              <span className="legend"><span className="dot primary" /> Saldo saat ini: {formatShortCurrency(metrics.totalBalance)}</span>
            )}
          </div>
        </div>

        {/* Shortcuts */}
        <div className="shortcuts-panel glass-panel">
          <h3 className="section-title">Aksi Cepat</h3>
          <p className="section-sub">
            {isStudent ? 'Kelola jajan & rencanakan target uang saku' : 'Perbarui pembukuan dan uji skenario keuangan'}
          </p>

          <div className="shortcut-list">
            <button className="shortcut-card" onClick={onOpenScanner}>
              <div className="sc-icon scan"><HiOutlineDocumentSearch /></div>
              <div className="sc-text">
                <strong>{isStudent ? 'Scan Bon Warteg / Struk' : 'Scan Struk / Invoice'}</strong>
                <span>{isStudent ? 'Foto struk belanjaan & nota kost' : 'Ekstrak data dari foto struk'}</span>
              </div>
            </button>
            <button className="shortcut-card" onClick={() => onNavigateTab('simulator')}>
              <div className="sc-icon sim"><HiOutlineTrendingDown /></div>
              <div className="sc-text">
                <strong>{isStudent ? 'Simulator Survival Tanggal Tua' : 'Simulator Skenario'}</strong>
                <span>{isStudent ? 'Uji target nabung UKT & jajan hemat' : 'Uji dampak perubahan omset & biaya'}</span>
              </div>
            </button>
            <button className="shortcut-card" onClick={() => onNavigateTab('cfo')}>
              <div className="sc-icon cfo"><HiOutlineCash /></div>
              <div className="sc-text">
                <strong>{isStudent ? 'Tanya Mentor Finansial' : 'Konsultasi Keuangan'}</strong>
                <span>{isStudent ? 'Life hacks hemat uang saku anak kost' : 'Tanya strategi efisiensi kas'}</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Bottom: Gauge + Category + Alerts */}
      <section className="bottom-grid">
        <HealthScoreGauge score={metrics.healthScore} metrics={metrics} />

        <div className="category-card glass-panel">
          <div className="card-header">
            <h3 className="section-title">{isStudent ? 'Pos Pengeluaran Mahasiswa' : 'Distribusi Pengeluaran'}</h3>
            <span className="glass-pill">{categoryData.length} Pos</span>
          </div>
          {categoryData.length === 0 ? (
            <div className="category-empty-state">
              <HiOutlineDocumentSearch style={{ fontSize: '1.75rem', color: 'var(--color-text-muted)', opacity: 0.6 }} />
              <p>Belum ada pengeluaran tercatat</p>
              <button className="btn-secondary-xs" onClick={onOpenNewTx}>
                + Catat Pengeluaran
              </button>
            </div>
          ) : (
            <div className="category-body">
              <div className="category-pie-container">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} innerRadius={36} outerRadius={54} paddingAngle={3} dataKey="value">
                      {categoryData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} stroke="var(--color-bg)" strokeWidth={2} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="cat-list">
                {categoryData.slice(0, 4).map((cat, i) => (
                  <div key={i} className="cat-row">
                    <div className="cat-label">
                      <span className="cat-dot" style={{ background: cat.color }} />
                      <span className="cat-name">{cat.name}</span>
                    </div>
                    <div className="cat-val">
                      <span>{formatShortCurrency(cat.value)}</span>
                      <span className="cat-pct">{cat.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="alerts-card glass-panel">
          <div className="card-header">
            <h3 className="section-title">{isStudent ? 'Saran & Peringatan Dompet' : 'Temuan & Saran'}</h3>
          </div>
          <div className="alerts-list">
            {insights.map((ins) => (
              <div key={ins.id} className={`alert-item ${ins.severity}`}>
                <div className="alert-top">
                  <span className="alert-title">{ins.title}</span>
                  {ins.potentialSavingsMonthly > 0 && (
                    <span className="savings-tag">+{formatShortCurrency(ins.potentialSavingsMonthly)}/bln</span>
                  )}
                </div>
                <p className="alert-desc">{ins.description}</p>
                <button
                  className="alert-action"
                  onClick={() => {
                    if (ins.actionPrompt.includes('Survival') || ins.actionPrompt.includes('Simulasi')) onNavigateTab('simulator');
                    else if (ins.actionPrompt.includes('Catat')) onOpenNewTx();
                    else onNavigateTab('cfo');
                  }}
                >
                  {ins.actionPrompt} <HiOutlineArrowRight />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="recent-section glass-panel">
        <div className="recent-header">
          <div>
            <h3 className="section-title">{isStudent ? 'Mutasi Uang Saku Terakhir' : 'Transaksi Terakhir'}</h3>
            <p className="section-sub">{isStudent ? 'Catatan jajan, kiriman, & pengeluaran kost' : 'Aktivitas pemasukan dan pengeluaran terbaru'}</p>
          </div>
          <div className="recent-actions">
            <button className="btn-secondary" onClick={() => onNavigateTab('ledger')}>Semua Catatan</button>
            <button className="btn-primary" onClick={onOpenNewTx}><HiOutlinePlus /> {isStudent ? 'Catat Jajan' : 'Catat'}</button>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="recent-empty-state">
            <HiOutlineDocumentSearch style={{ fontSize: '2.5rem', color: 'var(--color-text-muted)', opacity: 0.6 }} />
            <h4>{isStudent ? 'Belum Ada Mutasi Uang Saku' : 'Buku Kas Masih Kosong'}</h4>
            <p>
              {isStudent
                ? 'Mulai dengan mencatat kiriman uang saku dari ortu atau foto nota makan warteg / struk Indomaret.'
                : 'Mulai dengan mencatat transaksi modal / omset pertama atau gunakan pemindai struk untuk membaca invoice.'}
            </p>
            <div className="recent-empty-btns">
              <button className="btn-primary" onClick={onOpenNewTx}>
                <HiOutlinePlus /> {isStudent ? 'Catat Uang Saku / Jajan' : 'Catat Transaksi Pertama'}
              </button>
              <button className="btn-secondary" onClick={onOpenScanner}>
                <HiOutlineDocumentSearch /> {isStudent ? 'Scan Bon Warteg / Struk' : 'Scan Struk / Invoice'}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="table-wrap recent-table-desktop">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Deskripsi</th>
                    <th>Kategori</th>
                    <th>Tanggal</th>
                    <th>Pembayaran</th>
                    <th style={{ textAlign: 'right' }}>Nominal</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 5).map((tx) => {
                    const inc = tx.type === 'income';
                    return (
                      <tr key={tx.id}>
                        <td>
                          <div className="tx-desc">
                            <span className={`tx-dot ${inc ? 'emerald' : 'rose'}`} />
                            <div>
                              <div className="tx-title">{tx.title}</div>
                              <div className="tx-merchant">{tx.merchant || tx.notes || '-'}</div>
                            </div>
                          </div>
                        </td>
                        <td><span className="tx-cat">{tx.category}</span></td>
                        <td className="tx-date">{tx.date}</td>
                        <td><span className="tx-method"><HiOutlineCreditCard /> {tx.payment_method || 'Transfer'}</span></td>
                        <td style={{ textAlign: 'right' }}>
                          <span className={`tx-amount ${inc ? 'income' : 'expense'}`}>
                            {inc ? '+' : '-'} {formatCurrency(tx.amount)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="recent-cards-mobile">
              {transactions.slice(0, 5).map((tx) => {
                const inc = tx.type === 'income';
                return (
                  <div key={tx.id} className="mobile-tx-card">
                    <div className="mobile-tx-left">
                      <div className={`tx-dot ${inc ? 'emerald' : 'rose'}`} />
                      <div className="mobile-tx-info">
                        <div className="mobile-tx-title">{tx.title}</div>
                        <div className="mobile-tx-sub">
                          <span className="tx-cat">{tx.category}</span>
                          <span className="mobile-tx-date">{tx.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mobile-tx-right">
                      <span className={`tx-amount ${inc ? 'income' : 'expense'}`}>
                        {inc ? '+' : '-'} {formatCurrency(tx.amount)}
                      </span>
                      <span className="mobile-tx-method">{tx.payment_method || 'Transfer'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default OverviewTab;
