import { supabase } from '../lib/supabase';

// Sample Seed Data (Realistic SME / Startup data in IDR)
const DEFAULT_STARTING_CASH = 185000000; // Rp 185 Juta

export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-01',
    title: 'Enterprise Client Retainer Q3',
    type: 'income',
    category: 'Client Revenue',
    amount: 65000000,
    date: '2026-09-02',
    payment_method: 'Bank Transfer (BCA)',
    merchant: 'PT Solusi Digital Nusantara',
    notes: 'Pembayaran termin 1 pengembangan sistem',
  },
  {
    id: 'tx-02',
    title: 'AWS Cloud Hosting & AI GPU Cluster',
    type: 'expense',
    category: 'Cloud Infrastructure',
    amount: 14200000,
    date: '2026-09-04',
    payment_method: 'Corporate Card',
    merchant: 'Amazon Web Services Inc',
    notes: 'Penggunaan EC2, S3 & Bedrock Claude API',
  },
  {
    id: 'tx-03',
    title: 'Gaji Tim Engineering & Design (6 Orang)',
    type: 'expense',
    category: 'Payroll',
    amount: 48000000,
    date: '2026-08-28',
    payment_method: 'Bank Payroll',
    merchant: 'Internal Payroll',
    notes: 'Gaji pokok + tunjangan BPJS & kesehatan',
  },
  {
    id: 'tx-04',
    title: 'SaaS Subscription Revenue (MRR)',
    type: 'income',
    category: 'Subscription MRR',
    amount: 28500000,
    date: '2026-08-25',
    payment_method: 'Midtrans Payment Gateway',
    merchant: 'Online Subscribers',
    notes: 'Total 142 active pro subscribers',
  },
  {
    id: 'tx-05',
    title: 'Meta & Google Ads Campaign Acquisition',
    type: 'expense',
    category: 'Marketing & Ads',
    amount: 8750000,
    date: '2026-08-20',
    payment_method: 'Corporate Card',
    merchant: 'Meta Platforms Ireland',
    notes: 'Campaign promo Q3 B2B lead gen',
  },
  {
    id: 'tx-06',
    title: 'Sewa Co-Working Space & Dedicated Internet',
    type: 'expense',
    category: 'Office & Utilities',
    amount: 12000000,
    date: '2026-08-15',
    payment_method: 'Bank Transfer (Mandiri)',
    merchant: 'WeWork / CoHive Hub',
    notes: 'Biaya sewa ruang private office 6 pax',
  },
  {
    id: 'tx-07',
    title: 'Software Tooling (GitHub, Figma, OpenAI, Linear)',
    type: 'expense',
    category: 'Software & Tools',
    amount: 5400000,
    date: '2026-08-10',
    payment_method: 'Corporate Card',
    merchant: 'Various SaaS',
    notes: 'Biaya lisensi tools bulanan tim',
  },
  {
    id: 'tx-08',
    title: 'Custom Feature Development Fee',
    type: 'income',
    category: 'Client Revenue',
    amount: 32000000,
    date: '2026-08-05',
    payment_method: 'Bank Transfer (BCA)',
    merchant: 'CV Maju Jaya Logistik',
    notes: 'Integrasi API WhatsApp & Payment Gateway',
  },
  {
    id: 'tx-09',
    title: 'Pengadaan Hardware (MacBook M3 & Monitor 4K)',
    type: 'expense',
    category: 'Equipment & Capex',
    amount: 28000000,
    date: '2026-07-22',
    payment_method: 'Bank Transfer (BCA)',
    merchant: 'iBox Official Store',
    notes: 'Laptop lead developer baru',
  },
  {
    id: 'tx-10',
    title: 'Konsultasi Legal & Pajak Semester 1',
    type: 'expense',
    category: 'Legal & Accounting',
    amount: 6500000,
    date: '2026-07-15',
    payment_method: 'Bank Transfer',
    merchant: 'Kantor Konsultan Pajak Mitra',
    notes: 'Review SPT Badan & PPh 21/23',
  },
  {
    id: 'tx-11',
    title: 'Enterprise Client Retainer Q2',
    type: 'income',
    category: 'Client Revenue',
    amount: 55000000,
    date: '2026-07-02',
    payment_method: 'Bank Transfer (BCA)',
    merchant: 'PT Solusi Digital Nusantara',
    notes: 'Retainer maintenance Q2',
  },
  {
    id: 'tx-12',
    title: 'SaaS Subscription Revenue (MRR)',
    type: 'income',
    category: 'Subscription MRR',
    amount: 24000000,
    date: '2026-07-25',
    payment_method: 'Midtrans Payment Gateway',
    merchant: 'Online Subscribers',
    notes: '120 subscribers',
  },
];

const LOCAL_STORAGE_KEY = 'omniledger_transactions_v1';
const STARTING_CASH_KEY = 'omniledger_starting_cash_v1';

// Formatter Helpers
export const formatCurrency = (val) => {
  if (val === null || val === undefined || isNaN(val)) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(val);
};

export const formatShortCurrency = (val) => {
  if (!val && val !== 0) return '0';
  const abs = Math.abs(val);
  const sign = val < 0 ? '-' : '';
  if (abs >= 1000000000) {
    return `${sign}Rp ${(abs / 1000000000).toFixed(1)} M`;
  }
  if (abs >= 1000000) {
    return `${sign}Rp ${(abs / 1000000).toFixed(1)} Jt`;
  }
  if (abs >= 1000) {
    return `${sign}Rp ${(abs / 1000).toFixed(0)} Rb`;
  }
  return `${sign}Rp ${abs}`;
};

// Data Management Functions (Hybrid: Supabase + LocalStorage Fallback)
export const getStoredTransactions = async (userId) => {
  if (userId) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetch fallback to local:', e.message);
    }
  }

  const local = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_TRANSACTIONS));
  return INITIAL_TRANSACTIONS;
};

export const saveTransaction = async (tx, userId) => {
  const newTx = {
    ...tx,
    id: tx.id || `tx-${Date.now()}`,
    amount: Number(tx.amount) || 0,
    created_at: new Date().toISOString(),
  };

  // 1. Try Supabase
  if (userId) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([{ ...newTx, user_id: userId }])
        .select();
      if (!error && data && data[0]) {
        return data[0];
      }
    } catch (err) {
      console.warn('Supabase insert failed, fallback to local storage:', err.message);
    }
  }

  // 2. Local Fallback
  const current = await getStoredTransactions();
  const updated = [newTx, ...current];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  return newTx;
};

export const deleteTransaction = async (id, userId) => {
  if (userId) {
    try {
      await supabase.from('transactions').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete failed:', e.message);
    }
  }
  const current = await getStoredTransactions();
  const updated = current.filter((t) => t.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const getStartingCash = () => {
  const saved = localStorage.getItem(STARTING_CASH_KEY);
  return saved ? Number(saved) : DEFAULT_STARTING_CASH;
};

export const setStartingCash = (amount) => {
  localStorage.setItem(STARTING_CASH_KEY, String(amount));
};

// Analytics & Math Calculators
export const calculateFinancialMetrics = (transactions, startingCash = DEFAULT_STARTING_CASH) => {
  let totalIncome = 0;
  let totalExpense = 0;

  // Calculate past 30 days & total
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);

  let recentIncome = 0;
  let recentExpense = 0;

  transactions.forEach((tx) => {
    const amt = Number(tx.amount) || 0;
    const txDate = new Date(tx.date);

    if (tx.type === 'income') {
      totalIncome += amt;
      if (txDate >= thirtyDaysAgo) recentIncome += amt;
    } else {
      totalExpense += amt;
      if (txDate >= thirtyDaysAgo) recentExpense += amt;
    }
  });

  const totalBalance = startingCash + totalIncome - totalExpense;
  const avgMonthlyExpense = recentExpense > 0 ? recentExpense : totalExpense / 3 || 60000000;
  const avgMonthlyIncome = recentIncome > 0 ? recentIncome : totalIncome / 3 || 75000000;
  const netBurnRate = avgMonthlyExpense - avgMonthlyIncome;

  let runwayMonths = 999; // Profitable / Infinite
  if (netBurnRate > 0) {
    runwayMonths = Math.max(0, totalBalance / netBurnRate);
  }

  const profitMargin = avgMonthlyIncome > 0 ? ((avgMonthlyIncome - avgMonthlyExpense) / avgMonthlyIncome) * 100 : 0;

  // Financial Health Score algorithm (0 - 100)
  let healthScore = 50;
  if (runwayMonths >= 18 || netBurnRate <= 0) healthScore += 25;
  else if (runwayMonths >= 12) healthScore += 18;
  else if (runwayMonths >= 6) healthScore += 8;
  else healthScore -= 20;

  if (profitMargin > 20) healthScore += 20;
  else if (profitMargin > 0) healthScore += 10;
  else if (profitMargin > -20) healthScore -= 5;
  else healthScore -= 20;

  if (totalBalance > 100000000) healthScore += 10;
  else if (totalBalance < 20000000) healthScore -= 15;

  healthScore = Math.min(100, Math.max(10, Math.round(healthScore)));

  return {
    totalBalance,
    totalIncome,
    totalExpense,
    avgMonthlyIncome,
    avgMonthlyExpense,
    netBurnRate,
    runwayMonths,
    profitMargin,
    healthScore,
  };
};

// Historical Monthly Trend Generator for Charts
export const generateHistoricalTrend = (transactions, startingCash = DEFAULT_STARTING_CASH) => {
  const monthsMap = {};
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  // Initialize last 6 months
  const now = new Date('2026-09-19');
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`;
    monthsMap[key] = { month: key, income: 0, expense: 0, net: 0, balance: 0 };
  }

  // Aggregate
  transactions.forEach((tx) => {
    const d = new Date(tx.date);
    const key = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`;
    if (monthsMap[key]) {
      const amt = Number(tx.amount) || 0;
      if (tx.type === 'income') {
        monthsMap[key].income += amt;
      } else {
        monthsMap[key].expense += amt;
      }
    }
  });

  let runningBalance = startingCash;
  const result = Object.values(monthsMap).map((item) => {
    item.net = item.income - item.expense;
    runningBalance += item.net;
    item.balance = runningBalance;
    return item;
  });

  return result;
};

// Category Breakdown Generator
export const generateCategoryBreakdown = (transactions) => {
  const expenseMap = {};
  let totalExpense = 0;

  transactions.forEach((tx) => {
    if (tx.type === 'expense') {
      const amt = Number(tx.amount) || 0;
      totalExpense += amt;
      expenseMap[tx.category] = (expenseMap[tx.category] || 0) + amt;
    }
  });

  const colors = ['#38bdf8', '#818cf8', '#a855f7', '#f43f5e', '#f59e0b', '#10b981', '#06b6d4', '#64748b'];
  let colorIdx = 0;

  return Object.entries(expenseMap).map(([name, value]) => ({
    name,
    value,
    percentage: totalExpense > 0 ? Math.round((value / totalExpense) * 100) : 0,
    color: colors[colorIdx++ % colors.length],
  })).sort((a, b) => b.value - a.value);
};

// Simulation Engine for "What-If" Runway
export const simulateRunwayScenario = (
  currentMetrics,
  {
    revenueDeltaPct = 0, // e.g. -20% or +30%
    opexDeltaPct = 0, // e.g. -15% or +25%
    newHiresCount = 0,
    newHiresAvgSalary = 10000000,
    capexAmount = 0,
    capexMonth = 2,
    capitalInjection = 0,
    forecastMonths = 12,
  }
) => {
  const baselineMonthlyIncome = currentMetrics.avgMonthlyIncome;
  const baselineMonthlyExpense = currentMetrics.avgMonthlyExpense;
  const initialCash = currentMetrics.totalBalance + capitalInjection;

  const simulatedMonthlyIncome = baselineMonthlyIncome * (1 + revenueDeltaPct / 100);
  const additionalPayroll = newHiresCount * newHiresAvgSalary;
  const simulatedMonthlyExpense = baselineMonthlyExpense * (1 + opexDeltaPct / 100) + additionalPayroll;

  const points = [];
  let currentBaselineCash = currentMetrics.totalBalance;
  let currentSimulatedCash = initialCash;

  let baselineZeroMonth = null;
  let simulatedZeroMonth = null;

  for (let m = 0; m <= forecastMonths; m++) {
    const label = m === 0 ? 'Bulan 0 (Sekarang)' : `Bulan +${m}`;

    if (m > 0) {
      // Baseline
      currentBaselineCash += (baselineMonthlyIncome - baselineMonthlyExpense);
      if (currentBaselineCash <= 0 && baselineZeroMonth === null) {
        baselineZeroMonth = m;
      }

      // Simulated
      let simExpenseThisMonth = simulatedMonthlyExpense;
      if (m === capexMonth) {
        simExpenseThisMonth += capexAmount;
      }

      currentSimulatedCash += (simulatedMonthlyIncome - simExpenseThisMonth);
      if (currentSimulatedCash <= 0 && simulatedZeroMonth === null) {
        simulatedZeroMonth = m;
      }
    }

    points.push({
      monthLabel: label,
      monthIndex: m,
      baselineCash: Math.round(currentBaselineCash),
      simulatedCash: Math.round(currentSimulatedCash),
      isNegative: currentSimulatedCash < 0,
    });
  }

  const baselineRunway = baselineZeroMonth ?? (currentMetrics.netBurnRate <= 0 ? 99 : 24);
  const simulatedRunway = simulatedZeroMonth ?? (simulatedMonthlyExpense <= simulatedMonthlyIncome ? 99 : 24);
  const runwayDelta = simulatedRunway - baselineRunway;

  return {
    forecastPoints: points,
    baselineRunway,
    simulatedRunway,
    runwayDelta,
    simulatedMonthlyIncome,
    simulatedMonthlyExpense,
    simulatedNetBurn: simulatedMonthlyExpense - simulatedMonthlyIncome,
    initialCash,
  };
};

// AI CFO Anomaly Detector & Insights
export const generateCfoInsights = (transactions, metrics) => {
  const insights = [];

  // Anomaly 1: Cloud or SaaS Spike
  const cloudTx = transactions.filter((t) => t.category === 'Cloud Infrastructure');
  const cloudTotal = cloudTx.reduce((acc, t) => acc + Number(t.amount), 0);
  if (cloudTotal > 10000000) {
    insights.push({
      id: 'ins-1',
      severity: 'warning',
      category: 'Cloud Infrastructure',
      title: 'Lonjakan Biaya AI & Cloud Hosting (+28%)',
      description: 'Pengeluaran AWS & GPU cluster bulan ini mencapai Rp 14.2jt. Ada potensi penghematan 25% dengan menerapkan auto-scaling dan Reserved Instances.',
      potentialSavingsMonthly: 3500000,
      runwayExtensionMonths: 0.8,
      actionPrompt: 'Optimasi AWS & GPU Nodes',
    });
  }

  // Anomaly 2: Marketing CAC Efficiency
  const adsTx = transactions.filter((t) => t.category === 'Marketing & Ads');
  const adsTotal = adsTx.reduce((acc, t) => acc + Number(t.amount), 0);
  if (adsTotal > 5000000) {
    insights.push({
      id: 'ins-2',
      severity: 'info',
      category: 'Marketing Efficiency',
      title: 'Analisis CAC: Meta vs Google Ads ROI',
      description: 'Pengeluaran ads Rp 8.75jt menghasilkan 42 trial baru. Disarankan re-alokasi 40% budget ke Google Search Ads yang memiliki rasio konversi 2.4x lebih tinggi.',
      potentialSavingsMonthly: 2100000,
      runwayExtensionMonths: 0.5,
      actionPrompt: 'Re-alokasi Budget Kampanye Ads',
    });
  }

  // Anomaly 3: Runway Health
  if (metrics.runwayMonths < 8 && metrics.runwayMonths > 0) {
    insights.push({
      id: 'ins-3',
      severity: 'danger',
      category: 'Runway Alert',
      title: 'Runway Mendekati Batas Kritis (< 8 Bulan)',
      description: `Runway saat ini diproyeksikan ${metrics.runwayMonths.toFixed(1)} bulan. Segera pertimbangkan pemangkasan OPEX non-esensial atau akselerasi penagihan invoice tertunda.`,
      potentialSavingsMonthly: 8000000,
      runwayExtensionMonths: 2.3,
      actionPrompt: 'Buka Skenario Survival Mode',
    });
  } else {
    insights.push({
      id: 'ins-3',
      severity: 'success',
      category: 'Growth Opportunity',
      title: 'Arus Kas Stabil: Waktu Tepat untuk Ekspansi Bertahap',
      description: 'Stabilitas kas memungkinkan perekrutan 1-2 key hires atau investasi software tooling tanpa mengorbankan buffer keamanan 12 bulan.',
      potentialSavingsMonthly: 0,
      runwayExtensionMonths: 0,
      actionPrompt: 'Simulasikan Perekrutan Tim',
    });
  }

  return insights;
};

// AI CFO Chat Consultant Engine (Local Contextual AI)
export const askAiCfo = async (query, metrics, transactions) => {
  const q = query.toLowerCase();

  // Simulate AI Thinking Delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const totalCashFormatted = formatCurrency(metrics.totalBalance);
  const burnFormatted = formatCurrency(metrics.avgMonthlyExpense);
  const incomeFormatted = formatCurrency(metrics.avgMonthlyIncome);
  const runwayFormatted = metrics.runwayMonths > 50 ? 'Stabil / Menguntungkan (Profitable)' : `${metrics.runwayMonths.toFixed(1)} bulan`;

  if (q.includes('runway') || q.includes('bertahan') || q.includes('cash')) {
    return {
      text: `Berdasarkan data kas saat ini sebesar **${totalCashFormatted}** dan pengeluaran bulanan rata-rata **${burnFormatted}**, estimasi **Runway bisnis kamu adalah ${runwayFormatted}**.\n\n💡 **Rekomendasi CFO:**\n1. Jika omset turun 20%, runway akan menyusut sekitar 1.8 bulan.\n2. Disarankan menjaga buffer kas minimal 6-12 bulan (${formatCurrency(metrics.avgMonthlyExpense * 6)}).\n3. Gunakan tab **What-If Simulator** untuk menguji skenario penurunan omset secara presisi.`,
      suggestedAction: 'Buka What-If Simulator',
    };
  }

  if (q.includes('hire') || q.includes('rekrut') || q.includes('karyawan') || q.includes('gaji')) {
    return {
      text: `Biaya payroll saat ini menyumbang porsi terbesar pengeluaran (${formatCurrency(48000000)}/bulan).\n\nJika kamu merekrut **2 orang baru** dengan rata-rata gaji Rp 10 Juta/bulan:\n- Pengeluaran bulanan naik menjadi **${formatCurrency(metrics.avgMonthlyExpense + 20000000)}**\n- Runway akan berkurang sekitar **1.4 bulan** jika tidak diiringi kenaikan revenue.\n\n✨ **Saran CFO:** Waktu paling aman merekrut adalah ketika MRR / Retainer baru sudah terikat kontrak minimal 6 bulan ke depan.`,
      suggestedAction: 'Simulasikan Perekrutan Tim',
    };
  }

  if (q.includes('hemat') || q.includes('potong') || q.includes('kurang') || q.includes('cost')) {
    return {
      text: `Dari analisis audit AI terhadap ${transactions.length} transaksi terakhir, berikut 3 pos pengeluaran yang paling mudah dioptimasi:\n\n1. **Cloud & AI Compute:** Rp 14.2 Jt ➔ Potensi hemat **Rp 3.5 Jt/bln** dengan reserved instances.\n2. **Software SaaS Subscriptions:** Rp 5.4 Jt ➔ Potensi hemat **Rp 1.2 Jt/bln** dari seat user yang tidak aktif.\n3. **Marketing Ads:** Rp 8.75 Jt ➔ Efisiensikan kampanye dengan ROAS terendah.\n\nTotal potensi penghematan: **~Rp 6.8 Juta/bulan** (+1.2 bulan runway tambahan).`,
      suggestedAction: 'Terapkan Penghematan',
    };
  }

  if (q.includes('struk') || q.includes('ocr') || q.includes('invoice') || q.includes('scan')) {
    return {
      text: `Fitur **Smart OCR & Vision Receipt Scanner** siap digunakan! Kamu bisa mengambil foto struk atau upload file PDF/gambar invoice. Sistem akan otomatis mengekstrak merchant, pajak, total belanja, dan mengkategorisasikannya langsung ke buku kas tanpa input manual.`,
      suggestedAction: 'Scan Struk Baru',
    };
  }

  // Default smart financial overview response
  return {
    text: `Halo! Saya **Autonomous AI CFO** untuk bisnis kamu. Berikut ringkasan eksekutif kesehatan finansial per hari ini:\n\n- **Total Kas Riil:** ${totalCashFormatted}\n- **Pemasukan Bulanan:** ${incomeFormatted}\n- **Pengeluaran Bulanan:** ${burnFormatted}\n- **Financial Health Score:** ${metrics.healthScore}/100\n- **Status Runway:** ${runwayFormatted}\n\nAda aspek keuangan tertentu yang ingin kita bedah bersama? (misal: simulasi hiring, strategi pemangkasan biaya, atau proyeksi ekspansi)`,
    suggestedAction: 'Jalankan Simulasi Baru',
  };
};

// Preset Sample Receipts for One-Click Scanner Demo
export const SAMPLE_RECEIPTS = [
  {
    id: 'sample-aws',
    name: 'Invoice AWS Cloud & AI Hosting',
    merchant: 'Amazon Web Services, Inc.',
    category: 'Cloud Infrastructure',
    total: 14250000,
    tax: 1567500,
    date: '2026-09-18',
    paymentMethod: 'Corporate Credit Card',
    confidence: 0.98,
    items: [
      { desc: 'Amazon EC2 compute instances (c6g.2xlarge)', amount: 6200000 },
      { desc: 'AWS Bedrock Claude 3.5 Sonnet API usage', amount: 5450000 },
      { desc: 'Amazon S3 Standard Storage & Data Transfer', amount: 1032500 },
      { desc: 'PPN (VAT 11%)', amount: 1567500 },
    ],
  },
  {
    id: 'sample-coffe',
    name: 'Struk Kopi Kenangan & Snack Meeting',
    merchant: 'Kopi Kenangan - Mall Gandaria City',
    category: 'Office & Utilities',
    total: 385000,
    tax: 38500,
    date: '2026-09-16',
    paymentMethod: 'QRIS BCA',
    confidence: 0.96,
    items: [
      { desc: '4x Kopi Kenangan Mantan Large', amount: 120000 },
      { desc: '2x Roti Coklat Klasik', amount: 48000 },
      { desc: '3x Matcha Latte Oat Milk', amount: 135000 },
      { desc: 'PB1 Pajak Resto 10%', amount: 38500 },
      { desc: 'Service Charge', amount: 43500 },
    ],
  },
  {
    id: 'sample-meta',
    name: 'Invoice Meta Advertising Lead Gen',
    merchant: 'Meta Platforms Ireland Ltd',
    category: 'Marketing & Ads',
    total: 7500000,
    tax: 825000,
    date: '2026-09-14',
    paymentMethod: 'Corporate Card',
    confidence: 0.99,
    items: [
      { desc: 'Instagram & Facebook Ads - Target B2B SME', amount: 6675000 },
      { desc: 'PPN 11%', amount: 825000 },
    ],
  },
  {
    id: 'sample-raw-material',
    name: 'Struk Toko Bahan Baku & Perlengkapan',
    merchant: 'UD Sumber Makmur Sentosa',
    category: 'Equipment & Capex',
    total: 4850000,
    tax: 0,
    date: '2026-09-10',
    paymentMethod: 'Transfer Bank Mandiri',
    confidence: 0.94,
    items: [
      { desc: 'Bahan Baku Kemasan Box Premium (500 pcs)', amount: 2750000 },
      { desc: 'Kabel Lan Cat6 & Switch Hub 16 Port', amount: 1600000 },
      { desc: 'Perlengkapan Packaging & Lakban Fragile', amount: 500000 },
    ],
  },
];
