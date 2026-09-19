import { useState } from 'react';
import {
  HiOutlineX,
  HiOutlinePlusCircle,
  HiOutlineTag,
  HiOutlineCalendar,
  HiOutlineCash,
  HiOutlineCreditCard,
  HiOutlineOfficeBuilding,
  HiOutlineAnnotation,
} from 'react-icons/hi';
import confetti from 'canvas-confetti';
import './ReceiptScanner.css'; // Shared modal CSS

const CATEGORIES = [
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

const TransactionModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('expense'); // 'income' | 'expense'
  const [category, setCategory] = useState('Office & Utilities');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [merchant, setMerchant] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    onSave({
      title,
      type,
      category,
      amount: Number(amount),
      date,
      payment_method: paymentMethod,
      merchant: merchant || title,
      notes,
    });

    confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="receipt-modal-container glass-panel modal-narrow">
        <div className="modal-header-bar">
          <div className="modal-title-row">
            <div
              className="modal-icon-badge"
              style={{
                background: type === 'income' ? 'var(--color-emerald-soft)' : 'var(--color-rose-soft)',
                color: type === 'income' ? 'var(--color-emerald)' : 'var(--color-rose)',
              }}
            >
              <HiOutlinePlusCircle />
            </div>
            <div>
              <h3>Catat Transaksi Manual</h3>
              <p>Tambahkan mutasi pemasukan atau pengeluaran ke buku kas</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Tutup modal">
            <HiOutlineX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form-content">
          {/* Type Switcher */}
          <div className="form-row">
            <div className="filter-pill-group full-width-pill">
              <button
                type="button"
                className={`filter-pill ${type === 'expense' ? 'expense active' : ''}`}
                onClick={() => {
                  setType('expense');
                  setCategory('Office & Utilities');
                }}
              >
                - Pengeluaran (Expense)
              </button>
              <button
                type="button"
                className={`filter-pill ${type === 'income' ? 'income active' : ''}`}
                onClick={() => {
                  setType('income');
                  setCategory('Client Revenue');
                }}
              >
                + Pemasukan (Income)
              </button>
            </div>
          </div>

          <div className="form-row">
            <label>Judul Transaksi</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Pembayaran Langganan Client Q3"
              className="form-input"
            />
          </div>

          <div className="form-grid-2">
            <div className="form-row">
              <label><HiOutlineCash /> Nominal (Rp)</label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="form-input highlight"
              />
            </div>

            <div className="form-row">
              <label><HiOutlineTag /> Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-row">
              <label><HiOutlineCalendar /> Tanggal</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-row">
              <label><HiOutlineCreditCard /> Metode Pembayaran</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-input"
              >
                <option value="Bank Transfer (BCA)">Bank Transfer (BCA)</option>
                <option value="Bank Transfer (Mandiri)">Bank Transfer (Mandiri)</option>
                <option value="Corporate Card">Corporate Card</option>
                <option value="QRIS BCA">QRIS / E-Wallet</option>
                <option value="Payment Gateway">Payment Gateway</option>
                <option value="Petty Cash">Kas Kecil (Cash)</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-row">
              <label><HiOutlineOfficeBuilding /> Vendor / Pihak Kedua</label>
              <input
                type="text"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                placeholder="Contoh: PT Solusi Nusantara"
                className="form-input"
              />
            </div>

            <div className="form-row">
              <label><HiOutlineAnnotation /> Catatan Tambahan</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Opsional"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-actions-bottom">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn-submit-ledger">
              Simpan Transaksi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
