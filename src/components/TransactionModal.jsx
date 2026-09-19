import { useState, useEffect } from 'react';
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
import { BUSINESS_CATEGORIES, STUDENT_CATEGORIES } from '../services/financeService';
import './ReceiptScanner.css'; // Shared modal CSS

const TransactionModal = ({ isOpen, role = 'business', onClose, onSave }) => {
  const isStudent = role === 'student';
  const categories = isStudent ? STUDENT_CATEGORIES : BUSINESS_CATEGORIES;

  const [title, setTitle] = useState('');
  const [type, setType] = useState('expense'); // 'income' | 'expense'
  const [category, setCategory] = useState(() =>
    isStudent ? 'Makan & Minum (Warteg/Kantin)' : 'Office & Utilities'
  );
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState(() =>
    isStudent ? 'QRIS BCA' : 'Bank Transfer (BCA)'
  );
  const [merchant, setMerchant] = useState('');
  const [notes, setNotes] = useState('');

  // Reset defaults on role switch
  useEffect(() => {
    if (isStudent) {
      setCategory(type === 'income' ? 'Uang Saku & Kiriman Ortu' : 'Makan & Minum (Warteg/Kantin)');
      setPaymentMethod('QRIS BCA');
    } else {
      setCategory(type === 'income' ? 'Client Revenue' : 'Office & Utilities');
      setPaymentMethod('Bank Transfer (BCA)');
    }
  }, [isStudent, type]);

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
              <h3>{isStudent ? 'Catat Uang Saku & Pengeluaran' : 'Catat Transaksi Manual'}</h3>
              <p>
                {isStudent
                  ? 'Catat uang masuk atau jajan harian ke buku kas digital'
                  : 'Tambahkan mutasi pemasukan atau pengeluaran ke buku kas'}
              </p>
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
                  setCategory(isStudent ? 'Makan & Minum (Warteg/Kantin)' : 'Office & Utilities');
                }}
              >
                - Pengeluaran (Keluar)
              </button>
              <button
                type="button"
                className={`filter-pill ${type === 'income' ? 'income active' : ''}`}
                onClick={() => {
                  setType('income');
                  setCategory(isStudent ? 'Uang Saku & Kiriman Ortu' : 'Client Revenue');
                }}
              >
                + Pemasukan (Masuk)
              </button>
            </div>
          </div>

          <div className="form-row">
            <label>{isStudent ? 'Judul / Keperluan' : 'Judul Transaksi'}</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                isStudent
                  ? type === 'income'
                    ? 'Contoh: Kiriman Uang Saku Bulanan dari Ortu'
                    : 'Contoh: Makan Siang Nasi Ayam Warteg'
                  : 'Contoh: Pembayaran Langganan Client Q3'
              }
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
              <label><HiOutlineTag /> Pos Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
              >
                {categories.map((c) => (
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
                {isStudent ? (
                  <>
                    <option value="QRIS BCA">QRIS / E-Wallet (GoPay, OVO, Dana)</option>
                    <option value="Transfer BCA Mobile">Transfer BCA Mobile</option>
                    <option value="Transfer Bank Mandiri">Transfer Livin Mandiri</option>
                    <option value="Transfer Bank BNI">Transfer BNI Mobile</option>
                    <option value="Tunai (Cash)">Tunai / Uang Cash</option>
                  </>
                ) : (
                  <>
                    <option value="Bank Transfer (BCA)">Bank Transfer (BCA)</option>
                    <option value="Bank Transfer (Mandiri)">Bank Transfer (Mandiri)</option>
                    <option value="Corporate Card">Corporate Card</option>
                    <option value="QRIS BCA">QRIS / E-Wallet</option>
                    <option value="Payment Gateway">Payment Gateway</option>
                    <option value="Petty Cash">Kas Kecil (Cash)</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-row">
              <label><HiOutlineOfficeBuilding /> {isStudent ? 'Tempat / Sumber Uang' : 'Vendor / Pihak Kedua'}</label>
              <input
                type="text"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                placeholder={isStudent ? 'Contoh: Warteg Bahari / Orang Tua' : 'Contoh: PT Solusi Nusantara'}
                className="form-input"
              />
            </div>

            <div className="form-row">
              <label><HiOutlineAnnotation /> Catatan Tambahan</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Opsional (misal: patungan sama temen)"
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
