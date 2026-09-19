import { supabase } from '../lib/supabase';

// ==========================================
// 1. Seed & Default Data for Business & Student
// ==========================================

export const DEFAULT_BUSINESS_STARTING_CASH = 0; // Rp 0 (Mulai dari 0)
export const DEFAULT_STUDENT_STARTING_CASH = 0; // Rp 0 (Mulai dari 0)

export const BUSINESS_CATEGORIES = [
  'Client Revenue',
  'Subscription MRR',
  'Cloud Infrastructure',
  'Payroll',
  'Marketing & Ads',
  'Office & Utilities',
  'Software & Tools',
  'Equipment & Capex',
  'Legal & Accounting',
  'Miscellaneous',
];

export const STUDENT_CATEGORIES = [
  'Uang Saku & Kiriman Ortu',
  'Gaji Part-time & Freelance',
  'Beasiswa & Kampus',
  'Makan & Minum (Warteg/Kantin)',
  'Sewa Kost & Listrik',
  'Kebutuhan Kost & Harian',
  'Nongkrong, Kafe & Lifestyle',
  'Akademik, Buku & Print Tugas',
  'Kuota Internet & Langganan',
  'Transportasi & Bensin',
  'Tabungan UKT / Wishlist',
  'Lain-lain',
];

export const INITIAL_BUSINESS_TRANSACTIONS = [];

export const INITIAL_STUDENT_TRANSACTIONS = [];

// Sample Receipts by Role
export const BUSINESS_SAMPLE_RECEIPTS = [
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

export const STUDENT_SAMPLE_RECEIPTS = [
  {
    id: 'sample-indomaret',
    name: 'Struk Belanja Kebutuhan Kost Indomaret',
    merchant: 'Indomaret Point Kampus',
    category: 'Kebutuhan Kost & Harian',
    total: 124500,
    tax: 12300,
    date: '2026-09-18',
    paymentMethod: 'QRIS BCA',
    confidence: 0.97,
    items: [
      { desc: '5x Indomie Goreng Spesial', amount: 17500 },
      { desc: '1x Sabun Mandi Cair Dettol 450ml', amount: 32000 },
      { desc: '1x Shampoo Pantene Anti Dandruff', amount: 28500 },
      { desc: '1x Air Mineral Aqua Galon Isi Ulang', amount: 22000 },
      { desc: '2x Roti Sobek Coklat Keju', amount: 24500 },
    ],
  },
  {
    id: 'sample-warteg',
    name: 'Nota Makan Siang Warteg Bahari',
    merchant: 'Warteg Bahari Cabang Kampus',
    category: 'Makan & Minum (Warteg/Kantin)',
    total: 26000,
    tax: 0,
    date: '2026-09-17',
    paymentMethod: 'Tunai (Cash)',
    confidence: 0.95,
    items: [
      { desc: 'Nasi Putih Porsi Penuh', amount: 6000 },
      { desc: 'Ayam Goreng Lengkuas', amount: 12000 },
      { desc: 'Sayur Sop & Tempe Orek', amount: 5000 },
      { desc: 'Es Teh Manis Jumbo', amount: 3000 },
    ],
  },
  {
    id: 'sample-kost',
    name: 'Kwitansi Pembayaran Sewa Kost September',
    merchant: 'Wisma Melati Kost Mahasiswa',
    category: 'Sewa Kost & Listrik',
    total: 950000,
    tax: 0,
    date: '2026-09-02',
    paymentMethod: 'Transfer BCA Mobile',
    confidence: 0.98,
    items: [
      { desc: 'Sewa Kamar Kost Tipe Standar (Bulan September)', amount: 850000 },
      { desc: 'Iuran Listrik, Air & WiFi Unlimited', amount: 100000 },
    ],
  },
  {
    id: 'sample-print',
    name: 'Struk Fotokopi & Jilid Skripsi / Makalah',
    merchant: 'Percetakan Digital Berkah Kampus',
    category: 'Akademik, Buku & Print Tugas',
    total: 38000,
    tax: 0,
    date: '2026-09-10',
    paymentMethod: 'QRIS GoPay',
    confidence: 0.96,
    items: [
      { desc: 'Print Dokumen Warna 40 Lembar', amount: 30000 },
      { desc: 'Jilid Mika Spiral Kawat', amount: 8000 },
    ],
  },
  {
    id: 'sample-spotify',
    name: 'Invoice Spotify Premium Student & Kuota',
    merchant: 'Spotify AB & MyTelkomsel',
    category: 'Kuota Internet & Langganan',
    total: 79000,
    tax: 7800,
    date: '2026-09-08',
    paymentMethod: 'DANA / E-Wallet',
    confidence: 0.99,
    items: [
      { desc: 'Spotify Premium Student Plan (1 Bulan)', amount: 27500 },
      { desc: 'Paket Internet Kampus Edu 35GB', amount: 51500 },
    ],
  },
];

// Presets by Role
export const BUSINESS_PRESETS = [
  {
    id: 'survival',
    name: '🛡️ Mode Bertahan',
    desc: 'Pangkas biaya operasional 25%, freeze hiring, amankan kas',
    params: { revenueDeltaPct: -5, opexDeltaPct: -25, newHiresCount: 0, newHiresAvgSalary: 10000000, capexAmount: 0, capexMonth: 1, capitalInjection: 0 },
  },
  {
    id: 'aggressive',
    name: '🚀 Ekspansi Agresif',
    desc: 'Target omset naik 35%, rekrut 2 anggota baru, upgrade server',
    params: { revenueDeltaPct: 35, opexDeltaPct: 10, newHiresCount: 2, newHiresAvgSalary: 12000000, capexAmount: 25000000, capexMonth: 2, capitalInjection: 0 },
  },
  {
    id: 'recession',
    name: '📉 Uji Resesi (-30%)',
    desc: 'Uji ketahanan jika omset anjlok 30% tanpa efisiensi biaya',
    params: { revenueDeltaPct: -30, opexDeltaPct: 0, newHiresCount: 0, newHiresAvgSalary: 10000000, capexAmount: 0, capexMonth: 1, capitalInjection: 0 },
  },
  {
    id: 'fundraise',
    name: '💰 Injeksi Modal Rp 150 Jt',
    desc: 'Suntikan modal investor Rp 150 Jt + ekspansi pemasaran',
    params: { revenueDeltaPct: 20, opexDeltaPct: 15, newHiresCount: 1, newHiresAvgSalary: 10000000, capexAmount: 0, capexMonth: 1, capitalInjection: 150000000 },
  },
];

export const STUDENT_PRESETS = [
  {
    id: 'student-survival',
    name: '🍜 Survival Tanggal Tua',
    desc: 'Pangkas jajan kafe 40%, makan warteg/masak, amankan uang saku',
    params: { revenueDeltaPct: -10, opexDeltaPct: -35, newHiresCount: 0, newHiresAvgSalary: 0, capexAmount: 0, capexMonth: 1, capitalInjection: 0 },
  },
  {
    id: 'student-chill',
    name: '☕ Santai Awal Bulan',
    desc: 'Uang kiriman baru masuk, alokasi nongkrong & beli kebutuhan kost',
    params: { revenueDeltaPct: 15, opexDeltaPct: 20, newHiresCount: 0, newHiresAvgSalary: 0, capexAmount: 150000, capexMonth: 1, capitalInjection: 0 },
  },
  {
    id: 'student-ukt',
    name: '🎓 Target Nabung UKT / Laptop',
    desc: 'Simulasi alokasi tabungan disiplin Rp 500rb/bln untuk bayar semesteran',
    params: { revenueDeltaPct: 25, opexDeltaPct: -20, newHiresCount: 0, newHiresAvgSalary: 0, capexAmount: 2500000, capexMonth: 4, capitalInjection: 500000 },
  },
  {
    id: 'student-freelance',
    name: '💼 Mahasiswa Freelancer',
    desc: 'Omset project freelance desain/coding naik +50% untuk nambah tabungan',
    params: { revenueDeltaPct: 50, opexDeltaPct: 10, newHiresCount: 0, newHiresAvgSalary: 0, capexAmount: 750000, capexMonth: 2, capitalInjection: 300000 },
  },
];

// ==========================================
// 2. Formatters
// ==========================================

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

// ==========================================
// 3. Storage & Data Management (Role Aware)
// ==========================================

const getStorageKey = (role = 'business') => `omniledger_transactions_${role}_v4`;
const getStartingCashKey = (role = 'business') => `omniledger_starting_cash_${role}_v4`;

export const getStoredTransactions = async (userId, role = 'business') => {
  const initialData = role === 'student' ? INITIAL_STUDENT_TRANSACTIONS : INITIAL_BUSINESS_TRANSACTIONS;
  const storageKey = getStorageKey(role);

  // Clean old storage keys with dummy data if they exist
  try {
    ['v1', 'v2', 'v3'].forEach((ver) => {
      localStorage.removeItem(`omniledger_transactions_${role}_${ver}`);
      localStorage.removeItem(`omniledger_starting_cash_${role}_${ver}`);
    });
  } catch (e) {
    // Ignore in non-browser environments
  }

  if (userId) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('notes_role', role)
        .order('date', { ascending: false });

      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetch fallback to local:', e.message);
    }
  }

  const local = localStorage.getItem(storageKey);
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem(storageKey, JSON.stringify(initialData));
  return initialData;
};

export const saveTransaction = async (tx, userId, role = 'business') => {
  const storageKey = getStorageKey(role);
  const newTx = {
    ...tx,
    id: tx.id || `tx-${Date.now()}`,
    amount: Number(tx.amount) || 0,
    created_at: new Date().toISOString(),
  };

  if (userId) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([{ ...newTx, user_id: userId, notes_role: role }])
        .select();
      if (!error && data && data[0]) {
        return data[0];
      }
    } catch (err) {
      console.warn('Supabase insert failed, fallback to local storage:', err.message);
    }
  }

  const current = await getStoredTransactions(userId, role);
  const updated = [newTx, ...current];
  localStorage.setItem(storageKey, JSON.stringify(updated));
  return newTx;
};

export const deleteTransaction = async (id, userId, role = 'business') => {
  const storageKey = getStorageKey(role);
  if (userId) {
    try {
      await supabase.from('transactions').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete failed:', e.message);
    }
  }
  const current = await getStoredTransactions(userId, role);
  const updated = current.filter((t) => t.id !== id);
  localStorage.setItem(storageKey, JSON.stringify(updated));
  return updated;
};

export const getStartingCash = (role = 'business') => {
  const key = getStartingCashKey(role);
  const defaultCash = role === 'student' ? DEFAULT_STUDENT_STARTING_CASH : DEFAULT_BUSINESS_STARTING_CASH;
  const saved = localStorage.getItem(key);
  return saved ? Number(saved) : defaultCash;
};

export const setStartingCash = (amount, role = 'business') => {
  const key = getStartingCashKey(role);
  localStorage.setItem(key, String(amount));
};

// ==========================================
// 4. Analytics & Health Calculation
// ==========================================

export const calculateFinancialMetrics = (
  transactions,
  startingCash = DEFAULT_BUSINESS_STARTING_CASH,
  role = 'business'
) => {
  let totalIncome = 0;
  let totalExpense = 0;

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

  // Real calculations without fake fallback numbers
  const avgMonthlyExpense = recentExpense > 0 ? recentExpense : totalExpense > 0 ? totalExpense / 3 : 0;
  const avgMonthlyIncome = recentIncome > 0 ? recentIncome : totalIncome > 0 ? totalIncome / 3 : 0;
  const netBurnRate = avgMonthlyExpense - avgMonthlyIncome;

  let runwayMonths = 0;
  if (totalBalance > 0 && netBurnRate > 0) {
    runwayMonths = Math.max(0, totalBalance / netBurnRate);
  } else if (totalBalance > 0 && netBurnRate <= 0) {
    runwayMonths = 999;
  }

  const profitMargin = avgMonthlyIncome > 0 ? ((avgMonthlyIncome - avgMonthlyExpense) / avgMonthlyIncome) * 100 : 0;

  // Days remaining in month for student daily allowance
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const currentDay = now.getDate();
  const daysRemaining = Math.max(1, daysInMonth - currentDay);
  const safeDailyAllowance = totalBalance > 0 ? Math.max(0, Math.round(totalBalance / daysRemaining)) : 0;

  // Health score calculation
  let healthScore = 0;

  if (transactions.length > 0 || totalBalance > 0) {
    healthScore = 50;
    if (role === 'student') {
      if (safeDailyAllowance >= 50000) healthScore += 25;
      else if (safeDailyAllowance >= 30000) healthScore += 15;
      else if (safeDailyAllowance >= 15000) healthScore += 5;
      else healthScore -= 25;

      if (totalBalance >= 1500000) healthScore += 15;
      else if (totalBalance < 300000) healthScore -= 20;

      if (profitMargin >= 0) healthScore += 10;
      else healthScore -= 10;
    } else {
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
    }
    healthScore = Math.min(100, Math.max(10, Math.round(healthScore)));
  }

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
    safeDailyAllowance,
    daysRemaining,
  };
};

export const generateHistoricalTrend = (transactions, startingCash = DEFAULT_BUSINESS_STARTING_CASH) => {
  const monthsMap = {};
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  const now = new Date('2026-09-19');
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`;
    monthsMap[key] = { month: key, income: 0, expense: 0, net: 0, balance: 0 };
  }

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

// ==========================================
// 5. Simulator Engine
// ==========================================

export const simulateRunwayScenario = (
  currentMetrics,
  {
    revenueDeltaPct = 0,
    opexDeltaPct = 0,
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
      currentBaselineCash += (baselineMonthlyIncome - baselineMonthlyExpense);
      if (currentBaselineCash <= 0 && baselineZeroMonth === null) {
        baselineZeroMonth = m;
      }

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

// ==========================================
// 6. Insights & AI Advisor
// ==========================================

export const generateCfoInsights = (transactions, metrics, role = 'business') => {
  const insights = [];

  if (transactions.length === 0) {
    if (role === 'student') {
      return [
        {
          id: 'ins-empty-stu',
          severity: 'info',
          category: 'Mulai Menabung',
          title: 'Dompet Masih Kosong (Rp 0)',
          description: 'Catat kiriman uang saku atau gaji freelance pertamamu untuk mulai menghitung batas jajan harian aman!',
          potentialSavingsMonthly: 0,
          runwayExtensionMonths: 0,
          actionPrompt: 'Catat Uang Saku',
        },
      ];
    } else {
      return [
        {
          id: 'ins-empty-biz',
          severity: 'info',
          category: 'Pembukuan Baru',
          title: 'Buku Kas Masih Kosong (Rp 0)',
          description: 'Mulai dengan mencatat modal awal, pembayaran invoice klien, atau scan struk operasional pertamamu.',
          potentialSavingsMonthly: 0,
          runwayExtensionMonths: 0,
          actionPrompt: 'Catat Transaksi Pertama',
        },
      ];
    }
  }

  if (role === 'student') {
    // 1. Nongkrong & Kopi Check
    const cafeTx = transactions.filter((t) => t.category === 'Nongkrong, Kafe & Lifestyle');
    const cafeTotal = cafeTx.reduce((acc, t) => acc + Number(t.amount), 0);
    if (cafeTotal > 150000) {
      insights.push({
        id: 'ins-stu-1',
        severity: 'warning',
        category: 'Lifestyle & Kafe',
        title: 'Pengeluaran Kopi & Nongkrong Cukup Tinggi',
        description: `Bulan ini kamu menghabiskan ${formatCurrency(cafeTotal)} untuk kafe/nongkrong. Kurangi 2x nongkrong per minggu untuk menghemat hingga Rp 350rb/bln.`,
        potentialSavingsMonthly: 350000,
        runwayExtensionMonths: 1.2,
        actionPrompt: 'Uji Mode Survival Tanggal Tua',
      });
    }

    // 2. Safe Daily Allowance
    if (metrics.safeDailyAllowance < 30000) {
      insights.push({
        id: 'ins-stu-2',
        severity: 'danger',
        category: 'Tanggal Tua Alert',
        title: 'Batas Jajan Harian Kritis (< Rp 30.000/hari)',
        description: `Sisa saldo kas ${formatCurrency(metrics.totalBalance)} untuk ${metrics.daysRemaining} hari ke depan. Disarankan masak nasi sendiri dan prioritaskan warteg hemat.`,
        potentialSavingsMonthly: 250000,
        runwayExtensionMonths: 1.5,
        actionPrompt: 'Buka Simulator Survival',
      });
    } else {
      insights.push({
        id: 'ins-stu-2',
        severity: 'success',
        category: 'Uang Saku Sehat',
        title: 'Batas Jajan Harian Aman: Rp ' + metrics.safeDailyAllowance.toLocaleString('id-ID') + '/hari',
        description: 'Pola pengeluaranmu terjaga dengan baik. Kamu memiliki ruang untuk menabung target UKT semester depan.',
        potentialSavingsMonthly: 200000,
        runwayExtensionMonths: 0,
        actionPrompt: 'Simulasikan Tabungan UKT',
      });
    }

    // 3. Langganan Digital
    const subTx = transactions.filter((t) => t.category === 'Kuota Internet & Langganan');
    const subTotal = subTx.reduce((acc, t) => acc + Number(t.amount), 0);
    if (subTotal > 100000) {
      insights.push({
        id: 'ins-stu-3',
        severity: 'info',
        category: 'Langganan Digital',
        title: 'Gunakan Paket Edukasi & Diskon Mahasiswa',
        description: 'Manfaatkan Spotify Student Discount atau WiFi kampus saat download file besar untuk memangkas biaya kuota.',
        potentialSavingsMonthly: 65000,
        runwayExtensionMonths: 0.3,
        actionPrompt: 'Tanya Tips Hemat Mahasiswa',
      });
    }

    return insights;
  }

  // Business Insights
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

export const askAiCfo = async (query, metrics, transactions, role = 'business') => {
  const q = query.toLowerCase();
  await new Promise((resolve) => setTimeout(resolve, 750));

  const totalCashFormatted = formatCurrency(metrics.totalBalance);
  const burnFormatted = formatCurrency(metrics.avgMonthlyExpense);
  const incomeFormatted = formatCurrency(metrics.avgMonthlyIncome);

  if (transactions.length === 0 && metrics.totalBalance === 0) {
    if (role === 'student') {
      return {
        text: `Halo sobat mahasiswa! 🎓 Buku kas uang sakumu saat ini masih kosong (**Rp 0**).\n\n💡 **Langkah Awal:**\n1. Klik tombol **+ Catat** untuk memasukkan uang saku dari orang tua atau gaji freelance.\n2. Atau foto struk/bon belanjaanmu menggunakan fitur **Scan Bon/Struk**.\n\nSetelah ada catatan mutasi, saya akan otomatis menghitung **Batas Jajan Harian Aman (Safe Daily Limit)** dan memberikan tips hemat untukmu!`,
        suggestedAction: 'Catat Uang Saku',
      };
    }
    return {
      text: `Halo! Saya **Autonomous AI CFO** untuk bisnis kamu. Saat ini pembukuan kas dimulai bersih dari **Rp 0**.\n\nSilakan catat mutasi modal awal/transaksi pertamamu atau gunakan fitur **Scan Struk** untuk membaca invoice tagihan. Setelah data masuk, sistem AI akan langsung memproyeksikan arus kas dan menganalisis kesehatan finansial bisnismu!`,
      suggestedAction: 'Catat Transaksi Pertama',
    };
  }

  if (role === 'student') {
    const dailySafeFormatted = formatCurrency(metrics.safeDailyAllowance);

    if (q.includes('tanggal tua') || q.includes('hemat') || q.includes('makan') || q.includes('warteg') || q.includes('bertahan')) {
      return {
        text: `Halo sobat mahasiswa! Berikut **Life Hacks Survival Tanggal Tua** dari data uangmu:\n\n1. **Batas Jajan Harian:** Usahakan maksimal **${dailySafeFormatted}/hari** agar cukup sampai akhir bulan.\n2. **Makan Hemat & Bergizi:** Belanja telur, tahu, tempe di warung terdekat dan masak nasi di rice cooker kost (hemat ~Rp 18.000/hari).\n3. **Kopi & Nongkrong:** Beralih seduh kopi sendiri di kost sebelum berangkat kuliah.\n4. **Manfaatkan Fasilitas Kampus:** Gunakan dispenser air minum dan WiFi perpustakaan kampus.`,
        suggestedAction: 'Buka Simulator Survival Tanggal Tua',
      };
    }

    if (q.includes('ukt') || q.includes('nabung') || q.includes('laptop') || q.includes('target')) {
      return {
        text: `Rencana yang keren! Menabung saat kuliah butuh strategi alokasi yang konsisten:\n\n- **Target Nabung UKT / Laptop:** Sisihkan minimal **20% dari setiap kiriman/gaji freelance** langsung di awal bulan ke rekening tabungan terpisah.\n- Jika uang saku Rp 2.5 Jt + freelance Rp 1 Jt, kamu bisa menyisihkan **Rp 700.000/bulan** (terkumpul Rp 4.2 Jt dalam 6 bulan untuk bayar UKT!).\n\n💡 Kamu bisa simulasikan target tabungan ini di tab **Simulator**!`,
        suggestedAction: 'Simulasikan Target Nabung',
      };
    }

    if (q.includes('freelance') || q.includes('penghasilan') || q.includes('kerja') || q.includes('part-time')) {
      return {
        text: `Menambah pemasukan sampingan adalah cara tercepat meningkatkan saldo mahasiswa:\n\n- **Jasa Desain / UI/UX / Joki Koding:** Pasang portofolio di LinkedIn/Fastwork.\n- **Asisten Dosen / Lab:** Cari info lowongan asdos di fakultas (honor ~Rp 500rb - 800rb/bulan).\n- **Jualan Snack / Merchandise Kampus:** Potensi tambahan uang jajan mingguan.\n\nSetiap tambahan Rp 500rb/bulan akan meningkatkan batas jajan harianmu sebesar +Rp 16.500/hari!`,
        suggestedAction: 'Uji Skenario Freelancer',
      };
    }

    return {
      text: `Halo! Saya **AI Financial Mentor** mahasiswa kamu 🎓.\n\nBerikut ringkasan kondisi dompetmu saat ini:\n- **Sisa Uang Saku & Saldo:** ${totalCashFormatted}\n- **Batas Jajan Aman Hari Ini:** ${dailySafeFormatted}/hari\n- **Skor Ketahanan Dompet:** ${metrics.healthScore}/100\n- **Sisa Waktu Menuju Akhir Bulan:** ${metrics.daysRemaining} hari lagi\n\nAda yang mau kamu tanyakan seputar jajan hemat, nabung UKT, atau tips anak kost?`,
      suggestedAction: 'Buka Simulator Mahasiswa',
    };
  }

  // Business CFO Responses
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

  return {
    text: `Halo! Saya **Autonomous AI CFO** untuk bisnis kamu. Berikut ringkasan eksekutif kesehatan finansial per hari ini:\n\n- **Total Kas Riil:** ${totalCashFormatted}\n- **Pemasukan Bulanan:** ${incomeFormatted}\n- **Pengeluaran Bulanan:** ${burnFormatted}\n- **Financial Health Score:** ${metrics.healthScore}/100\n- **Status Runway:** ${runwayFormatted}\n\nAda aspek keuangan tertentu yang ingin kita bedah bersama? (misal: simulasi hiring, strategi pemangkasan biaya, atau proyeksi ekspansi)`,
    suggestedAction: 'Jalankan Simulasi Baru',
  };
};
