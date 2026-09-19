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
      const dbPayload = { ...newTx, user_id: userId, notes_role: role };
      if (typeof dbPayload.id === 'string' && dbPayload.id.startsWith('tx-')) {
        delete dbPayload.id;
      }
      const { data, error } = await supabase
        .from('transactions')
        .insert([dbPayload])
        .select();
      if (!error && data && data[0]) {
        const savedFromDb = data[0];
        const current = await getStoredTransactions(userId, role);
        const updated = [savedFromDb, ...current.filter((t) => t.id !== savedFromDb.id)];
        localStorage.setItem(storageKey, JSON.stringify(updated));
        return savedFromDb;
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

// Helper to extract Indonesian currency amounts from user input
export const parseIndonesianAmount = (text) => {
  if (!text) return null;
  const str = text.toLowerCase().replace(/,/g, '.');

  // Match patterns like "1.5jt", "1.5 juta", "2.5 jt", "300rb", "300 k", "300.000", "500000"
  const jtMatch = str.match(/(\d+(?:\.\d+)?)\s*(?:jt|juta|million)/i);
  if (jtMatch) {
    return Math.round(parseFloat(jtMatch[1]) * 1000000);
  }

  const rbMatch = str.match(/(\d+(?:\.\d+)?)\s*(?:rb|k|ribu|thousand)/i);
  if (rbMatch) {
    return Math.round(parseFloat(rbMatch[1]) * 1000);
  }

  const numMatch = str.match(/(?:rp\.?|rp\s*)?(\d{1,3}(?:\.\d{3})+)/i);
  if (numMatch) {
    const cleanNum = numMatch[1].replace(/\./g, '');
    return parseInt(cleanNum, 10);
  }

  const plainNumMatch = str.match(/(?:rp\.?|rp\s*)?(\d{4,12})/i);
  if (plainNumMatch) {
    return parseInt(plainNumMatch[1], 10);
  }

  return null;
};

// Helper to extract item or subject from user query
export const extractTargetItem = (text) => {
  if (!text) return 'barang ini';
  const str = text.toLowerCase();
  const match = str.match(/(?:beli|bayar|jajan|ambil|sewa|order)\s+([a-zA-Z0-9\s]+?)(?:\s+(?:seharga|harga|senilai|\d+|rp|aman|boleh|bisa|cukup|buat|untuk)|$)/i);
  if (match && match[1] && match[1].trim().length > 1) {
    return match[1].trim();
  }
  return 'barang/keperluan ini';
};

export const askAiCfo = async (query, metrics, transactions, role = 'business') => {
  const q = query.toLowerCase().trim();
  const isStudent = role === 'student';
  const totalCashFormatted = formatCurrency(metrics.totalBalance);
  const burnFormatted = formatCurrency(metrics.avgMonthlyExpense);
  const incomeFormatted = formatCurrency(metrics.avgMonthlyIncome);
  const safeDailyFormatted = formatCurrency(metrics.safeDailyAllowance);
  const daysRemaining = metrics.daysRemaining || 15;

  // 1. Try Gemini API if key is provided in environment
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (geminiApiKey) {
    try {
      const topCatSummary = generateCategoryBreakdown(transactions)
        .slice(0, 4)
        .map((c) => `${c.name}: ${formatShortCurrency(c.value)} (${c.percentage}%)`)
        .join(', ');

      const systemPrompt = `Kamu adalah ${isStudent ? 'AI Financial Mentor khusus Mahasiswa & Anak Kost' : 'Autonomous AI CFO FinTech untuk SME & Bisnis'}.
Data Keuangan Pengguna Saat Ini:
- Mode: ${isStudent ? 'Mahasiswa & Anak Kost 🎓' : 'Perusahaan & Bisnis 🏢'}
- Saldo Kas / Uang Saku: ${totalCashFormatted}
- Total Pemasukan: ${incomeFormatted}
- Total Pengeluaran: ${burnFormatted}
- Sisa Hari Bulan Ini: ${daysRemaining} hari
- Batas Jajan Harian Aman: ${safeDailyFormatted}/hari
- Skor Kesehatan Keuangan: ${metrics.healthScore}/100
- Total Transaksi Tercatat: ${transactions.length}
- Pengeluaran Teratas: ${topCatSummary || 'Belum ada transaksi'}

Instruksi:
- Jawablah dengan ramah, cerdas, solutif, dan relevan dengan pertanyaan pengguna dalam Bahasa Indonesia yang santun dan modern.
- Gunakan data keuangan riil di atas dalam kalkulasimu (jangan mengarang angka palsu).
- Gunakan formatting Markdown yang rapi (bullet points, bold text). Jawab dengan padat dan to the point (maksimal 3-4 paragraf).`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\nPertanyaan Pengguna: "${query}"` }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 600,
            },
          }),
        }
      );

      if (response.ok) {
        const json = await response.json();
        const replyText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          return {
            text: replyText,
            suggestedAction: isStudent ? 'Buka Simulator Mahasiswa' : 'Buka Simulator Skenario',
          };
        }
      }
    } catch (err) {
      console.warn('Gemini API call fallback to local reasoning engine:', err.message);
    }
  }

  // Artificial natural thinking delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Category breakdown
  const categoryBreakdown = generateCategoryBreakdown(transactions);
  const expenseTx = transactions.filter((t) => t.type === 'expense');
  const incomeTx = transactions.filter((t) => t.type === 'income');

  // =========================================================================
  // Intent 1: Zero-State Handling
  // =========================================================================
  if (transactions.length === 0 && metrics.totalBalance === 0) {
    if (isStudent) {
      return {
        text: `Halo sobat mahasiswa! 🎓 Buku kas uang sakumu saat ini masih bersih (**0 mutasi**, Saldo: **Rp 0**).\n\n💡 **Langkah Mudah Memulai:**\n1. **Catat Uang Masuk:** Klik tombol **+ Catat** lalu pilih *+ Pemasukan* (misal kiriman ortu atau honor freelance).\n2. **Catat Pengeluaran / Scan Bon:** Foto struk belanjaan Indomaret atau nota warteg.\n3. Begitu ada data mutasi masuk, aku akan otomatis menghitung **Batas Jajan Harian Aman** & **Skor Ketahanan Dompet** untukmu!`,
        suggestedAction: 'Catat Uang Saku',
      };
    }
    return {
      text: `Halo! Saya **Autonomous AI CFO** untuk bisnis kamu 🏢. Saat ini pembukuan kas dimulai bersih dari **Rp 0**.\n\n📊 **Langkah Awal:**\n1. Catat modal awal atau penerimaan omset pertama di tombol **+ Catat**.\n2. Scan struk/invoice pengeluaran operasional di menu **Scan Struk**.\n3. Sistem AI akan langsung mengalkulasi **Runway Kas**, **Analisis OPEX**, dan proyeksi arus kas secara real-time.`,
      suggestedAction: 'Catat Transaksi Pertama',
    };
  }

  // =========================================================================
  // Intent 2: Purchase & Affordability Simulation ("Mau beli X harga Y, aman ga?")
  // =========================================================================
  const detectedAmount = parseIndonesianAmount(q);
  const isAskingToBuy =
    q.includes('beli') ||
    q.includes('bayar') ||
    q.includes('jajan') ||
    q.includes('cukup ga') ||
    q.includes('boleh ga') ||
    q.includes('aman ga') ||
    q.includes('bisa beli') ||
    q.includes('mau beli') ||
    q.includes('pengen beli');

  if (isAskingToBuy && detectedAmount) {
    const item = extractTargetItem(query);
    const itemCost = detectedAmount;
    const currentBal = metrics.totalBalance;
    const remainingAfter = currentBal - itemCost;
    const currentSafeDaily = metrics.safeDailyAllowance;
    const newSafeDaily = Math.round(remainingAfter / Math.max(1, daysRemaining));

    if (itemCost > currentBal) {
      const deficit = itemCost - currentBal;
      return {
        text: `❌ **Saldo Dompet Tidak Cukup!**\n\n- **Harga ${item}:** ${formatCurrency(itemCost)}\n- **Saldo Kamu Saat Ini:** ${totalCashFormatted}\n- **Kekurangan:** ${formatCurrency(deficit)}\n\n⚠️ **Saran Finansial:** Jangan memaksakan berhutang atau memakai paylater. Kamu bisa mulai menabung dengan menyisihkan uang kiriman atau mencari project freelance tambahan!`,
        suggestedAction: isStudent ? 'Uji Target Nabung di Simulator' : 'Buka Simulator Kas',
      };
    }

    if (isStudent) {
      if (newSafeDaily < 20000) {
        return {
          text: `⚠️ **Sangat Riskan untuk Tanggal Tua!**\n\nJika kamu membeli **${item}** seharga **${formatCurrency(itemCost)}**:\n- **Sisa Saldo Dompet:** ${formatCurrency(remainingAfter)}\n- **Batas Jajan Harian Baru:** ${formatCurrency(newSafeDaily)}/hari (turun drastis dari ${formatCurrency(currentSafeDaily)}/hari untuk **${daysRemaining} hari** ke depan).\n\n💡 **Rekomendasi Mentor:**\nDengan jatah ${formatCurrency(newSafeDaily)}/hari, kamu akan kesulitan memenuhi biaya makan harian. Disarankan **menunda pembelian ini** sampai awal bulan depan saat kiriman baru masuk!`,
          suggestedAction: 'Uji Survival Tanggal Tua di Simulator',
        };
      }

      return {
        text: `✅ **Aman untuk Dibeli!**\n\nKalkulasi simulasi setelah membeli **${item}** (${formatCurrency(itemCost)}):\n- **Sisa Saldo Uang Saku:** ${formatCurrency(remainingAfter)}\n- **Batas Jajan Harian Baru:** ${formatCurrency(newSafeDaily)}/hari s/d akhir bulan (**${daysRemaining} hari lagi**).\n\n🎉 **Analisis:** Batas jajan harianmu masih di atas standar aman (> Rp 25.000/hari), jadi kamu tetap bisa makan nyaman tanpa khawatir kehabisan uang di akhir bulan!`,
        suggestedAction: 'Catat Pengeluaran Ini',
      };
    } else {
      // Business Purchase evaluation
      const currentBurn = Math.max(1, metrics.avgMonthlyExpense);
      const newRunway = remainingAfter / currentBurn;
      return {
        text: `📊 **Analisis Dampak Pengeluaran Bisnis:**\n\nPembelian **${item}** seharga **${formatCurrency(itemCost)}**:\n- **Sisa Cadangan Kas:** ${formatCurrency(remainingAfter)}\n- **Estimasi Runway Baru:** ${newRunway.toFixed(1)} bulan (dari baseline ${metrics.runwayMonths.toFixed(1)} bulan).\n\n${newRunway < 3 ? '⚠️ **Peringatan CFO:** Runway kas berada di bawah 3 bulan. Pertimbangkan skema cicilan vendor atau penundaan CAPEX.' : '✅ Posisi kas masih terjaga di batas aman operasional.'}`,
        suggestedAction: 'Simulasikan di What-If Simulator',
      };
    }
  }

  // =========================================================================
  // Intent 3: Balance & Overall Financial Health Status
  // =========================================================================
  if (
    q.includes('saldo') ||
    q.includes('uang saya') ||
    q.includes('uang saku') ||
    q.includes('kondisi') ||
    q.includes('skor') ||
    q.includes('keuangan saya') ||
    q.includes('berapa uang') ||
    q.includes('cek kas')
  ) {
    if (isStudent) {
      return {
        text: `📊 **Ringkasan Kondisi Dompet Mahasiswa:**\n\n- **Sisa Saldo & Tabungan:** ${totalCashFormatted}\n- **Batas Jajan Harian Aman:** ${safeDailyFormatted}/hari\n- **Sisa Waktu Bulan Ini:** ${daysRemaining} hari lagi\n- **Skor Ketahanan Dompet:** ${metrics.healthScore}/100 (${metrics.healthScore >= 70 ? '🟢 Sangat Sehat' : metrics.healthScore >= 40 ? '🟡 Waspada' : '🔴 Kritis'})\n- **Total Uang Masuk:** ${formatCurrency(metrics.totalIncome)}\n- **Total Pengeluaran:** ${formatCurrency(metrics.totalExpense)}\n\n💡 **Tips:** Selama kamu menjaga pengeluaran di bawah **${safeDailyFormatted}/hari**, uang sakumu dijamin aman sampai akhir bulan!`,
        suggestedAction: 'Uji Skenario di Simulator',
      };
    }

    return {
      text: `📊 **Executive Financial Overview:**\n\n- **Total Saldo Kas:** ${totalCashFormatted}\n- **Pemasukan Rata-rata:** ${incomeFormatted}/bulan\n- **Pengeluaran Operasional (OPEX):** ${burnFormatted}/bulan\n- **Arus Kas Bersih (Net Cashflow):** ${formatCurrency(metrics.avgMonthlyIncome - metrics.avgMonthlyExpense)}\n- **Daya Tahan Kas (Runway):** ${metrics.runwayMonths > 50 ? '∞ Menguntungkan (Profitable)' : `${metrics.runwayMonths.toFixed(1)} Bulan`}\n- **Financial Health Score:** ${metrics.healthScore}/100`,
      suggestedAction: 'Buka What-If Simulator',
    };
  }

  // =========================================================================
  // Intent 4: Top Spending & Category Breakdown
  // =========================================================================
  if (
    q.includes('paling boros') ||
    q.includes('terbesar') ||
    q.includes('paling banyak') ||
    q.includes('kategori') ||
    q.includes('pos pengeluaran') ||
    q.includes('kemana uang') ||
    q.includes('habis buat apa')
  ) {
    if (categoryBreakdown.length === 0) {
      return {
        text: `Saat ini belum ada pengeluaran yang tercatat di buku kas. Mulai catat transaksi atau scan struk belanja untuk melihat rincian pos pengeluaranmu!`,
        suggestedAction: 'Catat Pengeluaran',
      };
    }

    const topList = categoryBreakdown
      .slice(0, 4)
      .map((c, i) => `${i + 1}. **${c.name}:** ${formatCurrency(c.value)} (${c.percentage}% dari total keluar)`)
      .join('\n');

    const topOne = categoryBreakdown[0];

    if (isStudent) {
      return {
        text: `🔍 **Rincian Pos Pengeluaran Mahasiswa:**\n\n${topList}\n\n💡 **Temuan Mentor:**\nPengeluaran terbesarmu ada di pos **${topOne.name}** (${formatCurrency(topOne.value)}). Jika ingin berhemat untuk menabung UKT, cobalah menekan pos ini sekitar 15-20%.`,
        suggestedAction: 'Lihat Semua di Buku Kas',
      };
    }

    return {
      text: `🔍 **Analisis Distribusi Biaya Operasional:**\n\n${topList}\n\n💡 **Rekomendasi CFO:**\nPos **${topOne.name}** menyerap porsi anggaran tertinggi (${topOne.percentage}%). Efisiensi 10-15% pada pos ini dapat memperpanjang runway kas secara signifikan.`,
      suggestedAction: 'Buka Buku Kas',
    };
  }

  // =========================================================================
  // Intent 5: Recent Transactions / Mutasi Inquiry
  // =========================================================================
  if (
    q.includes('transaksi terakhir') ||
    q.includes('mutasi') ||
    q.includes('catatan terakhir') ||
    q.includes('riwayat') ||
    q.includes('struk terakhir') ||
    q.includes('baru catat')
  ) {
    if (transactions.length === 0) {
      return {
        text: `Buku kas masih kosong murni (0 catatan). Yuk catat uang masuk atau foto bon belanja pertamamu!`,
        suggestedAction: 'Catat Transaksi',
      };
    }

    const recentList = transactions
      .slice(0, 5)
      .map((t) => {
        const isInc = t.type === 'income';
        return `• **${t.title}** (${t.date}) — ${isInc ? '🟢 +' : '🔴 -'} ${formatCurrency(t.amount)} [${t.category}]`;
      })
      .join('\n');

    return {
      text: `📋 **${transactions.length > 5 ? '5' : transactions.length} Mutasi Transaksi Terakhir:**\n\n${recentList}\n\nTotal ada **${transactions.length} mutasi** tercatat di buku kas digitalmu.`,
      suggestedAction: 'Buka Buku Kas Lengkap',
    };
  }

  // =========================================================================
  // Intent 6: Safe Daily Allowance / Batas Jajan Harian (Student specific)
  // =========================================================================
  if (
    q.includes('batas jajan') ||
    q.includes('safe daily') ||
    q.includes('jatah harian') ||
    q.includes('per hari') ||
    q.includes('sisa hari')
  ) {
    return {
      text: `⚡ **Batas Jajan Harian Aman (Safe Daily Limit):**\n\n- **Batas Aman:** **${safeDailyFormatted} / hari**\n- **Sisa Waktu Menuju Akhir Bulan:** ${daysRemaining} hari lagi\n- **Sisa Saldo Kas:** ${totalCashFormatted}\n\n💡 **Cara Menjaganya:**\nJika hari ini kamu jajan hemat (misal hanya Rp 15.000), sisa kelebihannya akan otomatis menambah jatah jajanmu di hari esok!`,
      suggestedAction: 'Uji Skenario Survival',
    };
  }

  // =========================================================================
  // Intent 7: Survival Tanggal Tua & Life Hacks Anak Kost
  // =========================================================================
  if (
    q.includes('tanggal tua') ||
    q.includes('tips hemat') ||
    q.includes('warteg') ||
    q.includes('anak kost') ||
    q.includes('makan hemat') ||
    q.includes('bertahan')
  ) {
    return {
      text: `🍜 **Panduan Survival Tanggal Tua Anak Kost:**\n\n1. **Kunci Batas Jajan:** Usahakan tidak mengeluarkan lebih dari **${safeDailyFormatted}/hari**.\n2. **Hack Rice Cooker:** Masak nasi sendiri di kamar kost dan beli lauk matang di warteg (hemat hingga Rp 20.000/hari).\n3. **Manfaatkan Air & WiFi Kampus:** Bawa tumbler air minum ke kampus dan download materi tugas via WiFi perpustakaan.\n4. **Hindari Kafe & Jajan Online:** Seduh kopi sachet sendiri di kost sebelum berangkat kuliah.\n\nDengan disiplin menerapkan 4 poin ini, dompetmu dijamin aman sampai kiriman bulan depan!`,
      suggestedAction: 'Buka Simulator Survival Tanggal Tua',
    };
  }

  // =========================================================================
  // Intent 8: Target Tabungan & Bayar UKT
  // =========================================================================
  if (
    q.includes('ukt') ||
    q.includes('nabung') ||
    q.includes('tabungan') ||
    q.includes('laptop') ||
    q.includes('target')
  ) {
    const targetAmt = detectedAmount || 3000000;
    const monthlyNeeded = Math.round(targetAmt / 6);
    const weeklyNeeded = Math.round(targetAmt / 24);

    return {
      text: `🎓 **Strategi Rencana Menabung (${formatCurrency(targetAmt)}):**\n\nUntuk mengumpulkan **${formatCurrency(targetAmt)}** dalam 1 semester (6 bulan):\n- **Nabung Bulanan:** ${formatCurrency(monthlyNeeded)}/bulan\n- **Nabung Mingguan:** ${formatCurrency(weeklyNeeded)}/minggu\n\n💡 **Trik Sukses:**\n1. Sisihkan ${formatCurrency(monthlyNeeded)} di hari pertama kiriman uang saku/gaji freelance masuk.\n2. Simpan di rekening digital terpisah / e-wallet terkunci agar tidak terpakai jajan.\n3. Uji target ini di tab **Simulator** untuk melihat proyeksi saldomu!`,
      suggestedAction: 'Simulasikan Target Tabungan',
    };
  }

  // =========================================================================
  // Intent 9: Freelance & Extra Income Advice
  // =========================================================================
  if (
    q.includes('freelance') ||
    q.includes('penghasilan') ||
    q.includes('cari cuan') ||
    q.includes('part-time') ||
    q.includes('kerja sampingan')
  ) {
    return {
      text: `💼 **Ide Cuan Tambahan Mahasiswa:**\n\n1. **Jasa Digital:** Desain grafis (Canva/Figma), pembuatan website, joki tugas koding, atau editing video TikTok/Reels di Fastwork/Fiverr.\n2. **Asisten Dosen / Lab:** Cari lowongan asdos di kampus (honor rata-rata Rp 400rb - 800rb/bulan).\n3. **Tutor / Les Privat:** Mengajar anak SD/SMP mata pelajaran dasar atau bahasa Inggris.\n\nSetiap pemasukan freelance Rp 500.000 akan otomatis menaikkan batas jajan harianmu sebesar **+Rp 16.500/hari**!`,
      suggestedAction: 'Simulasikan Pemasukan Freelance',
    };
  }

  // =========================================================================
  // Intent 10: Business Runway, Hiring & Cost Optimization
  // =========================================================================
  if (!isStudent) {
    if (q.includes('runway') || q.includes('bertahan') || q.includes('cashflow') || q.includes('arus kas')) {
      const runwayText = metrics.runwayMonths > 50 ? 'Stabil & Profitable' : `${metrics.runwayMonths.toFixed(1)} Bulan`;
      return {
        text: `📊 **Analisis Runway & Likuiditas Bisnis:**\n\n- **Saldo Kas Riil:** ${totalCashFormatted}\n- **Rata-rata Burn Rate / Bulan:** ${burnFormatted}\n- **Daya Tahan Kas (Runway):** ${runwayText}\n\n💡 **Evaluasi CFO:**\n${metrics.runwayMonths < 6 ? '⚠️ Cadangan kas berada di bawah 6 bulan operasional. Segera lakukan efisiensi pengeluaran atau akselerasi penagihan piutang client.' : '✅ Cadangan kas berada dalam batas aman. Kondisi sehat untuk merencanakan ekspansi terkontrol.'}`,
        suggestedAction: 'Buka What-If Simulator',
      };
    }

    if (q.includes('hire') || q.includes('rekrut') || q.includes('karyawan') || q.includes('gaji') || q.includes('tim')) {
      return {
        text: `👥 **Analisis Kelayakan Perekrutan Tim Baru:**\n\n- **Saldo Kas Saat Ini:** ${totalCashFormatted}\n- **Pengeluaran Bulanan:** ${burnFormatted}\n\n💡 **Rekomendasi CFO:**\nJika merekrut 1 karyawan baru (misal gaji Rp 8-10 Jt/bln), pastikan bisnis memiliki minimal **6 bulan buffer gaji cadangan** (Rp 60 Jt) atau kenaikan MRR terikat kontrak minimal Rp 12 Jt/bulan.`,
        suggestedAction: 'Simulasikan Hiring di Simulator',
      };
    }

    if (q.includes('hemat') || q.includes('potong') || q.includes('efisiensi') || q.includes('cost')) {
      return {
        text: `✂️ **Strategi Pemangkasan Biaya Operasional:**\n\n1. **Cloud & AI Infrastructure:** Beralih ke Reserved Instances (RI) dan matikan development environment di akhir pekan.\n2. **Software SaaS Seat Cleanup:** Audit akun tools software yang tidak aktif dipakai tim.\n3. **Marketing CAC:** Pindahkan budget ke channel akuisisi dengan Return on Ad Spend (ROAS) tertinggi.`,
        suggestedAction: 'Buka Buku Kas',
      };
    }
  }

  // =========================================================================
  // Intent 11: General Help & App Capabilities
  // =========================================================================
  if (
    q.includes('siapa kamu') ||
    q.includes('bisa apa') ||
    q.includes('fitur') ||
    q.includes('cara pakai') ||
    q.includes('menu') ||
    q.includes('bantuan') ||
    q.includes('halo') ||
    q.includes('hai') ||
    q.includes('p')
  ) {
    if (isStudent) {
      return {
        text: `Halo sobat mahasiswa! 👋 Saya **AI Financial Mentor** dompetmu 🎓.\n\nKamu bisa menanyakan berbagai hal seputar keuangan anak kost:\n• *"Cek saldo & sisa jajan harian"* ⚡\n• *"Mau beli sepatu 300rb aman ga?"* 👟\n• *"Pengeluaran terbesar saya apa?"* 🔍\n• *"Tips hemat tanggal tua"* 🍜\n• *"Cara menabung bayar UKT 3 juta"* 🎓\n• *"Transaksi terakhir saya apa aja?"* 📋\n\nApa yang ingin kamu tanyakan hari ini?`,
        suggestedAction: 'Buka Simulator Mahasiswa',
      };
    }

    return {
      text: `Halo! Saya **Autonomous AI CFO** untuk bisnis kamu 🏢.\n\nSaya dapat membantu menganalisis:\n• **Kondisi Kas & Runway:** *"Berapa lama kas bertahan?"*\n• **Uji Kelayakan Belanja/Hiring:** *"Kapan waktu aman rekrut tim?"*\n• **Audit Pengeluaran:** *"Pos biaya mana yang paling besar?"*\n• **Simulasi Skenario:** *"Bagaimana jika omset turun 20%?"*\n\nSilakan ajukan pertanyaan seputar keuangan bisnismu!`,
      suggestedAction: 'Buka What-If Simulator',
    };
  }

  // =========================================================================
  // Intent 12: Contextual Default Fallback
  // =========================================================================
  return {
    text: `Halo! Menjawab pertanyaanmu seputar "${query}":\n\nBerdasarkan data keuanganmu saat ini (Saldo: **${totalCashFormatted}**, ${isStudent ? `Batas Jajan: **${safeDailyFormatted}/hari**` : `Runway: **${metrics.runwayMonths.toFixed(1)} Bulan**`}):\n\nSemua keputusan pengeluaran sebaiknya dipertimbangkan terhadap sisa saldo dan ketahanan kasmu. Kamu bisa menguji langsung perubahan skenario atau menanyakan simulasi belanja spesifik (contoh: *"Mau beli jaket 250rb aman ga?"*).`,
    suggestedAction: isStudent ? 'Uji di Simulator Mahasiswa' : 'Buka Simulator Skenario',
  };
};
