import { useState } from 'react';
import {
  HiOutlineCash,
  HiOutlineFire,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineClock,
  HiOutlineSparkles,
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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-chart-tooltip glass-panel">
        <div className="tooltip-month">{label}</div>
        <div className="tooltip-divider" />
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="tooltip-row" style={{ color: entry.color }}>
            <span className="tooltip-dot" style={{ backgroundColor: entry.color }} />
            <span className="tooltip-label">{entry.name}:</span>
            <span className="tooltip-val">{formatCurrency(entry.value)}</span>
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
}) => {
  const [chartMode, setChartMode] = useState('cashflow'); // 'cashflow' | 'balance'
  const trendData = generateHistoricalTrend(transactions, startingCash);
  const categoryData = generateCategoryBreakdown(transactions);
  const cfoInsights = generateCfoInsights(transactions, metrics);

  const netCashflow = metrics.avgMonthlyIncome - metrics.avgMonthlyExpense;
  const isCashflowPositive = netCashflow >= 0;

  return (
    <div className="overview-tab-content">
      {/* 1. Hero KPI Cards */}
      <section className="kpi-grid">
        {/* Total Cash Balance */}
        <div className="kpi-card glass-panel kpi-balance">
          <div className="kpi-glow-blob" />
          <div className="kpi-top">
            <div className="kpi-icon-wrapper primary-glow">
              <HiOutlineCash />
            </div>
            <span className="glass-pill pill-primary">Kas Riil</span>
          </div>
          <div className="kpi-body">
            <span className="kpi-label">Total Cash in Bank</span>
            <div className="kpi-value">{formatCurrency(metrics.totalBalance)}</div>
            <div className="kpi-meta">
              <span className="meta-text">Modal Awal: {formatShortCurrency(startingCash)}</span>
            </div>
          </div>
        </div>

        {/* Monthly Burn Rate */}
        <div className="kpi-card glass-panel kpi-burn">
          <div className="kpi-top">
            <div className="kpi-icon-wrapper rose-glow">
              <HiOutlineFire />
            </div>
            <span className="glass-pill pill-rose">Monthly OPEX</span>
          </div>
          <div className="kpi-body">
            <span className="kpi-label">Rata-Rata Burn Rate</span>
            <div className="kpi-value">{formatCurrency(metrics.avgMonthlyExpense)}</div>
            <div className="kpi-meta">
              <span className="meta-trend negative">
                <HiOutlineTrendingUp /> Operasional Bulanan
              </span>
            </div>
          </div>
        </div>

        {/* Net Monthly Cashflow */}
        <div className="kpi-card glass-panel kpi-net">
          <div className="kpi-top">
            <div className={`kpi-icon-wrapper ${isCashflowPositive ? 'emerald-glow' : 'amber-glow'}`}>
              {isCashflowPositive ? <HiOutlineTrendingUp /> : <HiOutlineTrendingDown />}
            </div>
            <span className={`glass-pill ${isCashflowPositive ? 'pill-emerald' : 'pill-amber'}`}>
              {isCashflowPositive ? '+ Surplus' : '- Defisit'}
            </span>
          </div>
          <div className="kpi-body">
            <span className="kpi-label">Net Monthly Cashflow</span>
            <div className="kpi-value" style={{ color: isCashflowPositive ? '#10b981' : '#f59e0b' }}>
              {formatCurrency(netCashflow)}
            </div>
            <div className="kpi-meta">
              <span className="meta-text">Margin Laba: {metrics.profitMargin.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Runway Remaining */}
        <div className="kpi-card glass-panel kpi-runway">
          <div className="kpi-top">
            <div className="kpi-icon-wrapper purple-glow">
              <HiOutlineClock />
            </div>
            <span className="glass-pill pill-purple">Runway Lifeline</span>
          </div>
          <div className="kpi-body">
            <span className="kpi-label">Proyeksi Daya Tahan</span>
            <div className="kpi-value">
              {metrics.runwayMonths > 50 ? '∞ Sehat' : `${metrics.runwayMonths.toFixed(1)} Bulan`}
            </div>
            <div className="kpi-meta">
              <button className="kpi-action-link" onClick={() => onNavigateTab('simulator')}>
                Simulasi Skenario <HiOutlineArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Chart & Quick Action Section */}
      <section className="chart-main-grid">
        <div className="main-chart-card glass-panel">
          <div className="chart-header">
            <div className="chart-title-box">
              <h3>Evolusi Arus Kas & Tren Finansial</h3>
              <p>Pelacakan komparasi pendapatan, pengeluaran operasional, dan akumulasi saldo kas</p>
            </div>

            <div className="chart-controls">
              <div className="chart-toggle-group">
                <button
                  className={`toggle-btn ${chartMode === 'cashflow' ? 'active' : ''}`}
                  onClick={() => setChartMode('cashflow')}
                >
                  Income vs Expense
                </button>
                <button
                  className={`toggle-btn ${chartMode === 'balance' ? 'active' : ''}`}
                  onClick={() => setChartMode('balance')}
                >
                  Saldo Kumulatif
                </button>
              </div>
            </div>
          </div>

          <div className="chart-canvas-wrapper" style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              {chartMode === 'cashflow' ? (
                <AreaChart data={trendData} margin={{ top: 15, right: 20, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    tickFormatter={(v) => formatShortCurrency(v)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="income"
                    name="Pemasukan"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#incomeGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expense"
                    name="Pengeluaran"
                    stroke="#f43f5e"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#expenseGrad)"
                  />
                </AreaChart>
              ) : (
                <AreaChart data={trendData} margin={{ top: 15, right: 20, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    tickFormatter={(v) => formatShortCurrency(v)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    name="Saldo Kas"
                    stroke="#38bdf8"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#balanceGrad)"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="chart-footer-legend">
            {chartMode === 'cashflow' ? (
              <>
                <div className="legend-item">
                  <span className="legend-dot income" />
                  <span>Total Pemasukan: {formatShortCurrency(metrics.totalIncome)}</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot expense" />
                  <span>Total Pengeluaran: {formatShortCurrency(metrics.totalExpense)}</span>
                </div>
              </>
            ) : (
              <div className="legend-item">
                <span className="legend-dot balance" />
                <span>Posisi Kas Riil Saat Ini: {formatShortCurrency(metrics.totalBalance)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Automation Hub */}
        <div className="quick-actions-panel glass-panel">
          <div className="panel-title-row">
            <HiOutlineSparkles className="icon-sparkle" />
            <h3>Autonomous Quick Hub</h3>
          </div>
          <p className="panel-sub">Aksi cepat berbasis AI untuk memperbarui pembukuan dan simulasi</p>

          <div className="quick-buttons-list">
            <button className="quick-action-card ocr-card" onClick={onOpenScanner}>
              <div className="action-card-icon">
                <HiOutlineDocumentSearch />
              </div>
              <div className="action-card-text">
                <span className="card-heading">Smart OCR Receipt Scanner</span>
                <span className="card-desc">Scan struk / invoice dan auto-entry</span>
              </div>
              <span className="card-tag">Vision AI</span>
            </button>

            <button className="quick-action-card simulator-card" onClick={() => onNavigateTab('simulator')}>
              <div className="action-card-icon">
                <HiOutlineTrendingDown />
              </div>
              <div className="action-card-text">
                <span className="card-heading">What-If Runway Simulator</span>
                <span className="card-desc">Uji skenario penurunan omset & hiring</span>
              </div>
              <span className="card-tag pro">Interactive</span>
            </button>

            <button className="quick-action-card cfo-card" onClick={() => onNavigateTab('cfo')}>
              <div className="action-card-icon">
                <HiOutlineSparkles />
              </div>
              <div className="action-card-text">
                <span className="card-heading">Konsultasi AI CFO</span>
                <span className="card-desc">Tanya strategi penghematan & alokasi kas</span>
              </div>
              <span className="card-tag">Advisor</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Bottom Grid: Gauge, Category Donut, Anomaly Feed */}
      <section className="tri-grid">
        {/* Health Score Gauge */}
        <HealthScoreGauge score={metrics.healthScore} metrics={metrics} />

        {/* Category Breakdown Donut */}
        <div className="category-donut-card glass-panel">
          <div className="card-top-title">
            <h3>Distribusi Beban Biaya (OPEX)</h3>
            <span className="glass-pill">{categoryData.length} Pos Pengeluaran</span>
          </div>

          <div className="donut-chart-container">
            <div className="donut-canvas" style={{ width: 140, height: 140 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.3)" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="category-list-scroll">
              {categoryData.slice(0, 4).map((cat, idx) => (
                <div key={idx} className="category-row-item">
                  <div className="cat-dot-label">
                    <span className="cat-color-dot" style={{ backgroundColor: cat.color }} />
                    <span className="cat-name">{cat.name}</span>
                  </div>
                  <div className="cat-amount-box">
                    <span className="cat-amt">{formatShortCurrency(cat.value)}</span>
                    <span className="cat-pct">{cat.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI CFO Real-Time Anomaly & Recommendation */}
        <div className="cfo-alerts-card glass-panel">
          <div className="card-top-title">
            <div className="flex-center gap-2">
              <HiOutlineSparkles style={{ color: '#a855f7' }} />
              <h3>AI CFO Anomaly Radar</h3>
            </div>
            <span className="glass-pill pill-purple">Active Insights</span>
          </div>

          <div className="alerts-feed-list">
            {cfoInsights.map((insight) => (
              <div key={insight.id} className={`anomaly-feed-item ${insight.severity}`}>
                <div className="anomaly-header">
                  <span className="anomaly-title">{insight.title}</span>
                  {insight.potentialSavingsMonthly > 0 && (
                    <span className="anomaly-savings-tag">
                      +{formatShortCurrency(insight.potentialSavingsMonthly)}/bln
                    </span>
                  )}
                </div>
                <p className="anomaly-desc">{insight.description}</p>
                <div className="anomaly-footer">
                  <button
                    className="anomaly-action-btn"
                    onClick={() => {
                      if (insight.actionPrompt.includes('Survival') || insight.actionPrompt.includes('Simulasi')) {
                        onNavigateTab('simulator');
                      } else {
                        onNavigateTab('cfo');
                      }
                    }}
                  >
                    <span>{insight.actionPrompt}</span>
                    <HiOutlineArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Recent Transactions Table Preview */}
      <section className="recent-tx-section glass-panel">
        <div className="section-header-flex">
          <div>
            <h3>Transaksi Pembukuan Terakhir</h3>
            <p>Aktivitas pemasukan dan pengeluaran terbaru yang terverifikasi</p>
          </div>
          <div className="flex-center gap-3">
            <button className="btn-secondary-glass" onClick={() => onNavigateTab('ledger')}>
              Lihat Semua Ledger
            </button>
            <button className="btn-primary-gradient" onClick={onOpenNewTx}>
              <HiOutlinePlus /> Catat Transaksi
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="omniledger-table">
            <thead>
              <tr>
                <th>Deskripsi & Merchant</th>
                <th>Kategori</th>
                <th>Tanggal</th>
                <th>Metode Bayar</th>
                <th style={{ textAlign: 'right' }}>Nominal</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map((tx) => {
                const isIncome = tx.type === 'income';
                return (
                  <tr key={tx.id}>
                    <td>
                      <div className="tx-title-cell">
                        <div className={`tx-type-dot ${isIncome ? 'income' : 'expense'}`} />
                        <div>
                          <div className="tx-main-title">{tx.title}</div>
                          <div className="tx-sub-merchant">{tx.merchant || tx.notes || 'General'}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="tx-category-badge">{tx.category}</span>
                    </td>
                    <td className="tx-date-cell">{tx.date}</td>
                    <td>
                      <div className="tx-method-cell">
                        <HiOutlineCreditCard />
                        <span>{tx.payment_method || 'Bank Transfer'}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <span className={`tx-amount-value ${isIncome ? 'income' : 'expense'}`}>
                        {isIncome ? '+' : '-'} {formatCurrency(tx.amount)}
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
