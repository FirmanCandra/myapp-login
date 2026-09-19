import { useState, useMemo } from 'react';
import {
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlineDownload,
  HiOutlineTrash,
  HiOutlineCreditCard,
  HiOutlineDocumentSearch,
} from 'react-icons/hi';
import { formatCurrency } from '../services/financeService';
import './Ledger.css';

const LedgerTab = ({ transactions, onDeleteTx, onOpenNewTx, onOpenScanner }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'income' | 'expense'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(transactions.map((t) => t.category));
    return ['all', ...Array.from(set)];
  }, [transactions]);

  // Filter & Sort Logic
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        const matchesSearch =
          tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (tx.merchant && tx.merchant.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (tx.notes && tx.notes.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesType = typeFilter === 'all' || tx.type === typeFilter;
        const matchesCat = categoryFilter === 'all' || tx.category === categoryFilter;

        return matchesSearch && matchesType && matchesCat;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'amount-desc') return Number(b.amount) - Number(a.amount);
        if (sortBy === 'amount-asc') return Number(a.amount) - Number(b.amount);
        return 0;
      });
  }, [transactions, searchTerm, typeFilter, categoryFilter, sortBy]);

  // Aggregates for filtered view
  const { totalIncome, totalExpense } = useMemo(() => {
    let inc = 0;
    let exp = 0;
    filteredTransactions.forEach((t) => {
      const amt = Number(t.amount) || 0;
      if (t.type === 'income') inc += amt;
      else exp += amt;
    });
    return { totalIncome: inc, totalExpense: exp };
  }, [filteredTransactions]);

  const handleExportCSV = () => {
    const headers = ['ID', 'Title', 'Type', 'Category', 'Amount', 'Date', 'Payment Method', 'Merchant', 'Notes'];
    const rows = filteredTransactions.map((t) => [
      t.id,
      `"${t.title}"`,
      t.type,
      `"${t.category}"`,
      t.amount,
      t.date,
      `"${t.payment_method || ''}"`,
      `"${t.merchant || ''}"`,
      `"${t.notes || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `omniledger_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="ledger-tab-content">
      {/* 1. Header & Quick Summary */}
      <div className="ledger-header-card glass-panel">
        <div className="ledger-header-left">
          <h2>Smart Financial Ledger</h2>
          <p>Buku kas digital dengan auto-kategorisasi AI, tagging struk, dan rekonsiliasi realtime</p>
        </div>

        <div className="ledger-header-actions">
          <button className="btn-secondary-glass" onClick={handleExportCSV}>
            <HiOutlineDownload />
            <span>{copiedNotification ? 'CSV Diexport!' : 'Export CSV'}</span>
          </button>
          <button className="btn-secondary-glass" onClick={onOpenScanner}>
            <HiOutlineDocumentSearch />
            <span>Scan Struk</span>
          </button>
          <button className="btn-primary-gradient" onClick={onOpenNewTx}>
            <HiOutlinePlus />
            <span>Catat Transaksi</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Bar */}
      <div className="ledger-filter-bar glass-panel">
        <div className="search-box-wrap">
          <HiOutlineSearch className="search-icon" />
          <input
            type="text"
            placeholder="Cari transaksi, merchant, vendor, catatan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ledger-search-input"
          />
        </div>

        <div className="filter-controls-group">
          {/* Type Filter */}
          <div className="filter-pill-group">
            <button
              className={`filter-pill ${typeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setTypeFilter('all')}
            >
              Semua
            </button>
            <button
              className={`filter-pill income ${typeFilter === 'income' ? 'active' : ''}`}
              onClick={() => setTypeFilter('income')}
            >
              Pemasukan
            </button>
            <button
              className={`filter-pill expense ${typeFilter === 'expense' ? 'active' : ''}`}
              onClick={() => setTypeFilter('expense')}
            >
              Pengeluaran
            </button>
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="ledger-select"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'Semua Kategori' : c}
              </option>
            ))}
          </select>

          {/* Sorting Dropdown */}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="ledger-select">
            <option value="date-desc">Tanggal Terkini</option>
            <option value="date-asc">Tanggal Terlama</option>
            <option value="amount-desc">Nominal Tertinggi</option>
            <option value="amount-asc">Nominal Terendah</option>
          </select>
        </div>
      </div>

      {/* 3. Summary Aggregate Bar */}
      <div className="ledger-summary-strip">
        <div className="strip-item">
          <span className="strip-label">Menampilkan:</span>
          <strong>{filteredTransactions.length} Transaksi</strong>
        </div>
        <div className="strip-item">
          <span className="strip-label">Pemasukan Terfilter:</span>
          <strong style={{ color: '#34d399' }}>+{formatCurrency(totalIncome)}</strong>
        </div>
        <div className="strip-item">
          <span className="strip-label">Pengeluaran Terfilter:</span>
          <strong style={{ color: '#fb7185' }}>-{formatCurrency(totalExpense)}</strong>
        </div>
        <div className="strip-item">
          <span className="strip-label">Net Filtered:</span>
          <strong style={{ color: totalIncome - totalExpense >= 0 ? '#38bdf8' : '#fbbf24' }}>
            {formatCurrency(totalIncome - totalExpense)}
          </strong>
        </div>
      </div>

      {/* 4. Ledger Table */}
      <div className="ledger-table-card glass-panel">
        <div className="table-responsive">
          <table className="omniledger-table full-table">
            <thead>
              <tr>
                <th>Deskripsi & Merchant</th>
                <th>Kategori</th>
                <th>Tanggal</th>
                <th>Metode Bayar</th>
                <th>Catatan</th>
                <th style={{ textAlign: 'right' }}>Nominal</th>
                <th style={{ textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div className="empty-ledger-state">
                      <HiOutlineDocumentSearch style={{ fontSize: '2.5rem', color: '#64748b' }} />
                      <p>Tidak ada transaksi yang cocok dengan filter pencarian.</p>
                      <button className="btn-secondary-glass" onClick={() => { setSearchTerm(''); setTypeFilter('all'); setCategoryFilter('all'); }}>
                        Reset Filter
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const isIncome = tx.type === 'income';
                  return (
                    <tr key={tx.id}>
                      <td>
                        <div className="tx-title-cell">
                          <div className={`tx-type-dot ${isIncome ? 'income' : 'expense'}`} />
                          <div>
                            <div className="tx-main-title">{tx.title}</div>
                            <div className="tx-sub-merchant">{tx.merchant || 'General Vendor'}</div>
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
                      <td>
                        <div className="tx-notes-cell" title={tx.notes || '-'}>
                          {tx.notes || '-'}
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={`tx-amount-value ${isIncome ? 'income' : 'expense'}`}>
                          {isIncome ? '+' : '-'} {formatCurrency(tx.amount)}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className="btn-delete-tx"
                          onClick={() => onDeleteTx(tx.id)}
                          title="Hapus Transaksi"
                        >
                          <HiOutlineTrash />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LedgerTab;
