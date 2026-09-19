import { useState, useRef, useEffect } from 'react';
import {
  HiOutlineDocumentSearch,
  HiOutlineUpload,
  HiOutlineX,
  HiOutlineSparkles,
  HiOutlineCheckCircle,
  HiOutlineCreditCard,
  HiOutlineCalendar,
  HiOutlineOfficeBuilding,
  HiOutlineCash,
  HiOutlineTag,
  HiOutlineAcademicCap,
} from 'react-icons/hi';
import confetti from 'canvas-confetti';
import {
  BUSINESS_SAMPLE_RECEIPTS,
  STUDENT_SAMPLE_RECEIPTS,
  BUSINESS_CATEGORIES,
  STUDENT_CATEGORIES,
  formatCurrency,
  formatShortCurrency,
} from '../services/financeService';
import './ReceiptScanner.css';

const ReceiptScannerModal = ({ isOpen, role = 'business', onClose, onSaveReceiptTransaction }) => {
  const isStudent = role === 'student';
  const sampleReceipts = isStudent ? STUDENT_SAMPLE_RECEIPTS : BUSINESS_SAMPLE_RECEIPTS;
  const categories = isStudent ? STUDENT_CATEGORIES : BUSINESS_CATEGORIES;

  const [scanState, setScanState] = useState('idle'); // 'idle' | 'scanning' | 'verified'
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [progress, setProgress] = useState(0);

  // Form Extracted State
  const [merchant, setMerchant] = useState('');
  const [category, setCategory] = useState(() => (isStudent ? 'Kebutuhan Kost & Harian' : 'Miscellaneous'));
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [date, setDate] = useState('2026-09-18');
  const [paymentMethod, setPaymentMethod] = useState(() => (isStudent ? 'QRIS BCA' : 'Corporate Card'));
  const [confidence, setConfidence] = useState(0.96);
  const [items, setItems] = useState([]);

  const fileInputRef = useRef(null);

  // Reset category on role switch
  useEffect(() => {
    setCategory(isStudent ? 'Kebutuhan Kost & Harian' : 'Miscellaneous');
    setPaymentMethod(isStudent ? 'QRIS BCA' : 'Corporate Card');
  }, [isStudent]);

  if (!isOpen) return null;

  const triggerScanAnimation = (receiptData) => {
    setScanState('scanning');
    setProgress(15);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            // Populate parsed data
            setMerchant(receiptData.merchant);
            setCategory(receiptData.category);
            setTotal(receiptData.total);
            setTax(receiptData.tax || 0);
            setDate(receiptData.date);
            setPaymentMethod(receiptData.paymentMethod || (isStudent ? 'QRIS BCA' : 'Corporate Card'));
            setConfidence(receiptData.confidence || 0.95);
            setItems(receiptData.items || []);
            setScanState('verified');
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset.id);
    triggerScanAnimation(preset);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const mockParsed = {
        merchant: file.name.replace(/\.[^/.]+$/, '').toUpperCase() || (isStudent ? 'WARUNG KOST BERKAH' : 'TOKO MITRA USAHA'),
        category: isStudent ? 'Kebutuhan Kost & Harian' : 'Equipment & Capex',
        total: isStudent ? 45000 : 1250000,
        tax: isStudent ? 0 : 125000,
        date: new Date().toISOString().split('T')[0],
        paymentMethod: isStudent ? 'QRIS BCA' : 'Corporate Card',
        confidence: 0.95,
        items: isStudent
          ? [
              { desc: 'Kebutuhan Harian Kost & Makanan', amount: 45000 },
            ]
          : [
              { desc: 'Pengadaan Perlengkapan Operasional', amount: 1125000 },
              { desc: 'PPN 11%', amount: 125000 },
            ],
      };
      triggerScanAnimation(mockParsed);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveToLedger = () => {
    const tx = {
      title: `${isStudent ? 'Bon/Struk' : 'Struk'}: ${merchant}`,
      type: 'expense',
      category: category,
      amount: Number(total),
      date: date,
      payment_method: paymentMethod,
      merchant: merchant,
      tax: Number(tax),
      notes: `Smart OCR Verified (${(confidence * 100).toFixed(0)}% Keyakinan). ${items.length} rincian item.`,
    };

    onSaveReceiptTransaction(tx);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="receipt-modal-container glass-panel">
        {/* Modal Header */}
        <div className="modal-header-bar">
          <div className="modal-title-row">
            <div className="modal-icon-badge" style={{ background: isStudent ? 'rgba(56, 189, 248, 0.15)' : 'rgba(99, 102, 241, 0.15)', color: isStudent ? 'var(--color-primary)' : 'var(--color-purple)' }}>
              {isStudent ? <HiOutlineAcademicCap /> : <HiOutlineDocumentSearch />}
            </div>
            <div>
              <h3>{isStudent ? 'Pemindai Bon Warteg, Struk & Kwitansi Kost' : 'Pemindai Struk & Invoice'}</h3>
              <p>
                {isStudent
                  ? 'Foto bon makan, struk Indomaret, kwitansi sewa kost, atau print tugas langsung terurai rapi'
                  : 'Ekstraksi otomatis nama merchant, item, pajak, dan nominal dari foto struk atau tagihan'}
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <HiOutlineX />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body-grid">
          {/* Left: Scanner HUD / Upload Area */}
          <div className="scanner-hud-section">
            {scanState === 'idle' && (
              <div className="scanner-dropzone">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*,application/pdf"
                  style={{ display: 'none' }}
                />

                <div className="dropzone-center" onClick={() => fileInputRef.current?.click()}>
                  <div className="dropzone-icon-circle">
                    <HiOutlineUpload />
                  </div>
                  <span className="dropzone-title">Upload Foto Struk / Bon / PDF</span>
                  <span className="dropzone-sub">Klik untuk browse atau seret file foto ke sini</span>
                </div>

                <div className="preset-sample-section">
                  <div className="preset-header-text">
                    <HiOutlineSparkles style={{ color: '#38bdf8' }} />
                    <span>Atau coba contoh {isStudent ? 'bon mahasiswa' : 'struk bisnis'}:</span>
                  </div>

                  <div className="preset-cards-list">
                    {sampleReceipts.map((sample) => (
                      <button
                        key={sample.id}
                        className={`preset-sample-card ${selectedPreset === sample.id ? 'active' : ''}`}
                        onClick={() => handleSelectPreset(sample)}
                      >
                        <div className="preset-sample-info">
                          <span className="preset-sample-name">{sample.name}</span>
                          <span className="preset-sample-merchant">{sample.merchant}</span>
                        </div>
                        <span className="preset-sample-amount">{formatShortCurrency(sample.total)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {scanState === 'scanning' && (
              <div className="scanner-active-viewport">
                <div className="scanner-laser-line" />
                <div className="scanner-hud-corners" />

                <div className="scanning-feedback">
                  <div className="spinner-hud" />
                  <h4>Memindai Dokumen...</h4>
                  <p>Mengekstrak informasi dari {isStudent ? 'bon & nota belanja' : 'struk atau invoice'}</p>
                  <div className="progress-bar-hud">
                    <div className="progress-fill-hud" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="progress-pct-hud">{progress}%</span>
                </div>
              </div>
            )}

            {scanState === 'verified' && (
              <div className="scanner-verified-preview">
                <div className="verified-success-banner">
                  <HiOutlineCheckCircle style={{ color: '#34d399', fontSize: '1.25rem' }} />
                  <div>
                    <strong>Ekstraksi berhasil!</strong>
                    <span>Tingkat keyakinan: {(confidence * 100).toFixed(1)}%</span>
                  </div>
                </div>

                {/* Simulated Receipt Thermal Paper */}
                <div className="receipt-paper-box">
                  <div className="receipt-paper-header">
                    <h4>{merchant}</h4>
                    <span className="receipt-paper-date">{date}</span>
                  </div>

                  <div className="receipt-paper-items">
                    {items.map((item, idx) => (
                      <div key={idx} className="receipt-item-line">
                        <span className="item-name">{item.desc}</span>
                        <span className="item-amt">{formatShortCurrency(item.amount)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="receipt-paper-footer">
                    {tax > 0 && (
                      <div className="receipt-sub-row">
                        <span>Pajak (PPN/PB1):</span>
                        <span>{formatShortCurrency(tax)}</span>
                      </div>
                    )}
                    <div className="receipt-total-row">
                      <span>TOTAL:</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                <button
                  className="btn-rescan-receipt"
                  onClick={() => {
                    setScanState('idle');
                    setSelectedPreset(null);
                  }}
                >
                  Scan Dokumen Lain
                </button>
              </div>
            )}
          </div>

          {/* Right: Verification & Edit Form */}
          <div className="scanner-form-section">
            <div className="form-section-header">
              <h4>Verifikasi Data Ekstraksi</h4>
              <span className="glass-pill pill-primary">Auto-Categorized</span>
            </div>

            <div className="verification-form">
              <div className="form-row">
                <label>
                  <HiOutlineOfficeBuilding /> {isStudent ? 'Nama Toko / Warung / Merchant' : 'Nama Merchant / Vendor'}
                </label>
                <input
                  type="text"
                  value={merchant}
                  onChange={(e) => setMerchant(e.target.value)}
                  placeholder={isStudent ? 'Contoh: Warteg Bahari / Indomaret' : 'Contoh: Amazon Web Services'}
                  disabled={scanState !== 'verified'}
                  className="form-input"
                />
              </div>

              <div className="form-grid-2">
                <div className="form-row">
                  <label>
                    <HiOutlineTag /> Pos Kategori
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={scanState !== 'verified'}
                    className="form-input"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <label>
                    <HiOutlineCalendar /> Tanggal Transaksi
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    disabled={scanState !== 'verified'}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-row">
                  <label>
                    <HiOutlineCash /> Total Nominal (Rp)
                  </label>
                  <input
                    type="number"
                    value={total}
                    onChange={(e) => setTotal(Number(e.target.value))}
                    disabled={scanState !== 'verified'}
                    className="form-input highlight"
                  />
                </div>

                <div className="form-row">
                  <label>Pajak / VAT</label>
                  <input
                    type="number"
                    value={tax}
                    onChange={(e) => setTax(Number(e.target.value))}
                    disabled={scanState !== 'verified'}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <label>
                  <HiOutlineCreditCard /> Metode Pembayaran
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled={scanState !== 'verified'}
                  className="form-input"
                >
                  {isStudent ? (
                    <>
                      <option value="QRIS BCA">QRIS / E-Wallet (GoPay, OVO, Dana)</option>
                      <option value="Transfer Bank BCA">Transfer Bank (BCA Mobile)</option>
                      <option value="Transfer Bank Mandiri">Transfer Bank (Livin Mandiri)</option>
                      <option value="Tunai (Cash)">Tunai (Uang Cash)</option>
                    </>
                  ) : (
                    <>
                      <option value="Corporate Card">Corporate Credit Card</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="QRIS BCA">QRIS / E-Wallet</option>
                      <option value="Petty Cash">Kas Kecil (Cash)</option>
                    </>
                  )}
                </select>
              </div>

              <div className="form-actions-bottom">
                <button className="btn-cancel" onClick={onClose}>
                  Batal
                </button>
                <button
                  className="btn-submit-ledger"
                  disabled={scanState !== 'verified'}
                  onClick={handleSaveToLedger}
                >
                  <HiOutlineSparkles />
                  <span>Simpan ke Buku Kas</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptScannerModal;
