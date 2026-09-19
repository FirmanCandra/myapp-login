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

const OverviewTab = ({ metrics, transactions, startingCash, onNavigateTab, onOpenScanner, onOpenNewTx }) => {
  const [chartView, setChartView] = useState('cashflow');
  const trendData = generateHistoricalTrend(transactions, startingCash);
  const categoryData = generateCategoryBreakdown(transactions);
  const insights = generateCfoInsights(transactions, metrics);

  const netCashflow = metrics.avgMonthlyIncome - metrics.avgMonthlyExpense;

  return (
    <div className="overview-content">
      {/* KPI Cards */}
      <section className="kpi-row">
        <div className="kpi-card glass-panel">
          <div className="kpi-header">
            <div className="kpi-icon primary"><HiOutlineCash /></div>
            <span className="glass-pill pill-primary">Kas</span>
          </div>
          <span className="kpi-label">Saldo Kas</span>
          <span className="kpi-value">{formatCurrency(metrics.totalBalance)}</span>
          <span className="kpi-sub">Modal awal: {formatShortCurrency(startingCash)}</span>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-header">
            <div className="kpi-icon rose"><HiOutlineTrendingDown /></div>
            <span className="glass-pill pill-rose">Pengeluaran</span>
          </div>
          <span className="kpi-label">Rata-rata Pengeluaran / Bulan</span>
          <span className="kpi-value">{formatCurrency(metrics.avgMonthlyExpense)}</span>
          <span className="kpi-sub">Biaya operasional bulanan</span>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-header">
            <div className={`kpi-icon ${netCashflow >= 0 ? 'emerald' : 'amber'}`}>
              {netCashflow >= 0 ? <HiOutlineTrendingUp /> : <HiOutlineTrendingDown />}
            </div>
            <span className={`glass-pill ${netCashflow >= 0 ? 'pill-emerald' : 'pill-amber'}`}>
              {netCashflow >= 0 ? 'Surplus' : 'Defisit'}
            </span>
          </div>
          <span className="kpi-label">Arus Kas Bersih / Bulan</span>
          <span className="kpi-value" style={{ color: netCashflow >= 0 ? 'var(--color-emerald)' : 'var(--color-amber)' }}>
            {formatCurrency(netCashflow)}
          </span>
          <span className="kpi-sub">Margin: {metrics.profitMargin.toFixed(1)}%</span>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-header">
            <div className="kpi-icon purple"><HiOutlineClock /></div>
            <span className="glass-pill pill-purple">Runway</span>
          </div>
          <span className="kpi-label">Proyeksi Daya Tahan</span>
          <span className="kpi-value">
            {metrics.runwayMonths > 50 ? '∞ Sehat' : `${metrics.runwayMonths.toFixed(1)} Bulan`}
          </span>
          <button className="kpi-link" onClick={() => onNavigateTab('simulator')}>
            Buka Simulator <HiOutlineArrowRight />
          </button>
        </div>
      </section>

      {/* Chart + Quick Actions */}
      <section className="chart-section">
        <div className="chart-card glass-panel">
          <div className="chart-top">
            <div>
              <h3 className="section-title">Tren Arus Kas</h3>
              <p className="section-sub">Perbandingan pemasukan dan pengeluaran per bulan</p>
            </div>
            <div className="chart-toggles">
              <button className={`toggle-btn ${chartView === 'cashflow' ? 'active' : ''}`} onClick={() => setChartView('cashflow')}>
                Pemasukan vs Pengeluaran
              </button>
              <button className={`toggle-btn ${chartView === 'balance' ? 'active' : ''}`} onClick={() => setChartView('balance')}>
                Saldo Kumulatif
              </button>
            </div>
          </div>

          <div style={{ width: '100%', height: 310 }}>
            <ResponsiveContainer width="100%" height="100%">
              {chartView === 'cashflow' ? (
                <AreaChart data={trendData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
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
                  <XAxis dataKey="month" stroke="var(--color-text-muted)" tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} />
                  <YAxis stroke="var(--color-text-muted)" tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} tickFormatter={formatShortCurrency} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="income" name="Pemasukan" stroke="var(--color-emerald)" strokeWidth={2} fill="url(#gIncome)" />
                  <Area type="monotone" dataKey="expense" name="Pengeluaran" stroke="var(--color-rose)" strokeWidth={2} fill="url(#gExpense)" />
                </AreaChart>
              ) : (
                <AreaChart data={trendData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--color-text-muted)" tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} />
                  <YAxis stroke="var(--color-text-muted)" tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} tickFormatter={formatShortCurrency} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="balance" name="Saldo Kas" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#gBalance)" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="chart-legend">
            {chartView === 'cashflow' ? (
              <>
                <span className="legend"><span className="dot emerald" /> Pemasukan: {formatShortCurrency(metrics.totalIncome)}</span>
                <span className="legend"><span className="dot rose" /> Pengeluaran: {formatShortCurrency(metrics.totalExpense)}</span>
              </>
            ) : (
              <span className="legend"><span className="dot primary" /> Saldo saat ini: {formatShortCurrency(metrics.totalBalance)}</span>
            )}
          </div>
        </div>

        {/* Shortcuts */}
        <div className="shortcuts-panel glass-panel">
          <h3 className="section-title">Aksi Cepat</h3>
          <p className="section-sub">Perbarui pembukuan dan uji skenario keuangan</p>

          <div className="shortcut-list">
            <button className="shortcut-card" onClick={onOpenScanner}>
              <div className="sc-icon scan"><HiOutlineDocumentSearch /></div>
              <div className="sc-text">
                <strong>Scan Struk / Invoice</strong>
                <span>Ekstrak data dari foto struk</span>
              </div>
            </button>
            <button className="shortcut-card" onClick={() => onNavigateTab('simulator')}>
              <div className="sc-icon sim"><HiOutlineTrendingDown /></div>
              <div className="sc-text">
                <strong>Simulator What-If</strong>
                <span>Uji dampak perubahan omset & biaya</span>
              </div>
            </button>
            <button className="shortcut-card" onClick={() => onNavigateTab('cfo')}>
              <div className="sc-icon cfo"><HiOutlineCash /></div>
              <div className="sc-text">
                <strong>Konsultasi Keuangan</strong>
                <span>Tanya strategi efisiensi kas</span>
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
            <h3 className="section-title">Distribusi Pengeluaran</h3>
            <span className="glass-pill">{categoryData.length} Kategori</span>
          </div>
          <div className="category-body">
            <div style={{ width: 130, height: 130 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} innerRadius={42} outerRadius={60} paddingAngle={3} dataKey="value">
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
                    <span>{cat.name}</span>
                  </div>
                  <div className="cat-val">
                    <span>{formatShortCurrency(cat.value)}</span>
                    <span className="cat-pct">{cat.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="alerts-card glass-panel">
          <div className="card-header">
            <h3 className="section-title">Temuan & Saran</h3>
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
                <button className="alert-action" onClick={() => {
                  if (ins.actionPrompt.includes('Survival') || ins.actionPrompt.includes('Simulasi')) onNavigateTab('simulator');
                  else onNavigateTab('cfo');
                }}>
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
            <h3 className="section-title">Transaksi Terakhir</h3>
            <p className="section-sub">Aktivitas pemasukan dan pengeluaran terbaru</p>
          </div>
          <div className="recent-actions">
            <button className="btn-secondary" onClick={() => onNavigateTab('ledger')}>Semua Transaksi</button>
            <button className="btn-primary" onClick={onOpenNewTx}><HiOutlinePlus /> Catat</button>
          </div>
        </div>

        <div className="table-wrap">
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
      </section>
    </div>
  );
};

export default OverviewTab;
