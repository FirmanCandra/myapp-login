import { useState, useEffect } from 'react';
import {
  HiOutlineX,
  HiOutlineSparkles,
  HiOutlineViewGrid,
  HiOutlineCalculator,
  HiOutlineDocumentSearch,
  HiOutlineChatAlt2,
  HiOutlineBookOpen,
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineLightBulb,
} from 'react-icons/hi';
import confetti from 'canvas-confetti';
import './OnboardingModal.css';

const TUTORIAL_STEPS = [
  {
    id: 'welcome',
    badge: 'Selamat Datang',
    title: 'Selamat Datang di OmniLedger AI! 🚀',
    subtitle: 'Financial Operating System untuk UMKM, Startup, & Freelancer',
    icon: HiOutlineSparkles,
    iconColor: 'purple',
    content: (
      <div className="step-welcome-box">
        <p className="step-intro-text">
          OmniLedger AI dirancang untuk membantumu mengendalikan arus kas (*cashflow*), memprediksi daya tahan bisnis (*runway*), memindai struk otomatis, dan menyimulasikan keputusan bisnis dengan mudah.
        </p>
        <div className="onboarding-feature-pills">
          <div className="feature-pill-item">
            <span className="pill-dot primary" />
            <span><strong>Ringkasan Real-time:</strong> Pantau saldo kas, margin, & skor kesehatan kas</span>
          </div>
          <div className="feature-pill-item">
            <span className="pill-dot emerald" />
            <span><strong>Scan Struk Vision OCR:</strong> Ekstraksi foto struk & invoice tanpa ketik manual</span>
          </div>
          <div className="feature-pill-item">
            <span className="pill-dot purple" />
            <span><strong>Simulator Skenario:</strong> Uji dampak fluktuasi omset & biaya 12 bulan ke depan</span>
          </div>
          <div className="feature-pill-item">
            <span className="pill-dot amber" />
            <span><strong>Konsultan Keuangan AI:</strong> Temuan inefisiensi pengeluaran & rekomendasi hemat</span>
          </div>
        </div>
      </div>
    ),
    tip: '💡 Klik tombol "Lanjut" untuk melihat panduan singkat fitur-fitur utama aplikasi ini.',
  },
  {
    id: 'overview',
    badge: 'Fitur 1 dari 5',
    title: '1. Dashboard Ringkasan & Skor Kesehatan',
    subtitle: 'Pantau metrik finansial terpenting dalam satu pandangan',
    icon: HiOutlineViewGrid,
    iconColor: 'primary',
    content: (
      <div className="step-content-grid">
        <ul className="step-points-list">
          <li>
            <strong>4 Kartu KPI Utama:</strong> Pantau <em>Saldo Kas</em>, <em>Pengeluaran Bulanan</em>, <em>Arus Kas Bersih (Surplus/Defisit)</em>, dan estimasi <em>Runway</em> (berapa bulan kas bertahan).
          </li>
          <li>
            <strong>Skor Kesehatan Kas (0–100):</strong> Indikator cerdas yang mengevaluasi stabilitas kas, margin, dan rasio risiko keuangan secara otomatis.
          </li>
          <li>
            <strong>Grafik Tren Dinamis:</strong> Visualisasi perbandingan pemasukan vs pengeluaran serta saldo kas kumulatif.
          </li>
        </ul>
      </div>
    ),
    actionTab: 'overview',
    actionLabel: 'Lihat Tab Ringkasan',
  },
  {
    id: 'scanner',
    badge: 'Fitur 2 dari 5',
    title: '2. Scan Struk & Invoice Otomatis (Vision OCR)',
    subtitle: 'Catat pengeluaran dari foto tanpa ketik manual satu per satu',
    icon: HiOutlineDocumentSearch,
    iconColor: 'emerald',
    content: (
      <div className="step-content-grid">
        <ul className="step-points-list">
          <li>
            <strong>Upload Foto Struk / PDF:</strong> Cukup foto nota belanja kas kecil atau upload file tagihan vendor.
          </li>
          <li>
            <strong>Ekstraksi Data Instan:</strong> Nama toko/merchant, tanggal, rincian barang, pajak (PPN), dan total harga terurai rapi secara otomatis.
          </li>
          <li>
            <strong>Simpan Sekali Klik:</strong> Verifikasi data dan simpan langsung ke buku kas digital.
          </li>
        </ul>
      </div>
    ),
    actionTab: 'scanner',
    actionLabel: 'Coba Scan Struk',
  },
  {
    id: 'simulator',
    badge: 'Fitur 3 dari 5',
    title: '3. Simulator Skenario "What-If" Runway',
    subtitle: 'Uji dampak keputusan bisnis sebelum dieksekusi',
    icon: HiOutlineCalculator,
    iconColor: 'purple',
    content: (
      <div className="step-content-grid">
        <ul className="step-points-list">
          <li>
            <strong>Slider Interaktif:</strong> Geser slider <em>Fluktuasi Omset (-50% s/d +100%)</em> dan <em>Penyesuaian Biaya (OPEX)</em>.
          </li>
          <li>
            <strong>Rencana Rekrut & Belanja Modal:</strong> Uji apakah aman merekrut tim baru atau beli peralatan/aset besar.
          </li>
          <li>
            <strong>Grafik Kas 12 Bulan (Dual-Curve):</strong> Bandingkan garis kas <em>Baseline</em> vs <em>Skenario Simulasi</em> dan pantau batas kas nol (<em>Cash Cliff</em>).
          </li>
          <li>
            <strong>Preset Skenario:</strong> <em>Mode Bertahan</em>, <em>Ekspansi Agresif</em>, <em>Uji Resesi</em>, & <em>Injeksi Modal</em>.
          </li>
        </ul>
      </div>
    ),
    actionTab: 'simulator',
    actionLabel: 'Buka Simulator Kas',
  },
  {
    id: 'cfo',
    badge: 'Fitur 4 dari 5',
    title: '4. Konsultan Keuangan AI (Virtual CFO)',
    subtitle: 'Temukan pemborosan biaya & tanya strategi keuangan',
    icon: HiOutlineChatAlt2,
    iconColor: 'amber',
    content: (
      <div className="step-content-grid">
        <ul className="step-points-list">
          <li>
            <strong>Temuan Pemborosan Biaya:</strong> Dapatkan rekomendasi konkret penghematan server cloud, optimalisasi iklan, dan buffer keselamatan kas.
          </li>
          <li>
            <strong>Chat Konsultan Terhubung ke Data:</strong> Ajukan pertanyaan seputar keuangan bisnismu langsung ke AI CFO.
          </li>
        </ul>
      </div>
    ),
    actionTab: 'cfo',
    actionLabel: 'Tanya Konsultan AI',
  },
  {
    id: 'ledger',
    badge: 'Fitur 5 dari 5',
    title: '5. Buku Kas Rapi & Ekspor CSV',
    subtitle: 'Semua mutasi tercatat aman, teratur, dan siap dilaporkan',
    icon: HiOutlineBookOpen,
    iconColor: 'primary',
    content: (
      <div className="step-content-grid">
        <ul className="step-points-list">
          <li>
            <strong>Pencatatan Cepat:</strong> Tambah transaksi manual kapan saja melalui tombol <em>+ Transaksi</em>.
          </li>
          <li>
            <strong>Filter & Pencarian:</strong> Cari berdasarkan nama toko, catatan, kategori pos biaya, dan nominal.
          </li>
          <li>
            <strong>Ekspor CSV:</strong> Unduh seluruh data mutasi ke format spreadsheet Excel / Google Sheets dalam satu klik.
          </li>
        </ul>
      </div>
    ),
    actionTab: 'ledger',
    actionLabel: 'Buka Buku Kas',
  },
];

const OnboardingModal = ({ isOpen, onClose, onNavigateTab }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentStep = TUTORIAL_STEPS[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === TUTORIAL_STEPS.length - 1;
  const IconComponent = currentStep.icon;

  const handleNext = () => {
    if (isLastStep) {
      handleFinish();
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    if (dontShowAgain) {
      localStorage.setItem('omniledger_onboarding_completed', 'true');
    }
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    onClose();
  };

  const handleTryFeature = (tab) => {
    if (dontShowAgain) {
      localStorage.setItem('omniledger_onboarding_completed', 'true');
    }
    onClose();
    if (onNavigateTab && tab) {
      onNavigateTab(tab);
    }
  };

  return (
    <div className="modal-overlay onboarding-overlay">
      <div className="onboarding-modal-container glass-panel">
        {/* Progress Top Bar */}
        <div className="onboarding-progress-bar">
          <div
            className="onboarding-progress-fill"
            style={{ width: `${((currentStepIndex + 1) / TUTORIAL_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Modal Header */}
        <div className="onboarding-header">
          <div className="onboarding-header-left">
            <span className={`glass-pill pill-${currentStep.iconColor}`}>
              {currentStep.badge}
            </span>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Tutup panduan">
            <HiOutlineX />
          </button>
        </div>

        {/* Step Body */}
        <div className="onboarding-body">
          <div className="onboarding-step-hero">
            <div className={`onboarding-icon-box ${currentStep.iconColor}`}>
              <IconComponent />
            </div>
            <div className="onboarding-step-title-wrap">
              <h3>{currentStep.title}</h3>
              <p>{currentStep.subtitle}</p>
            </div>
          </div>

          <div className="onboarding-step-content">
            {currentStep.content}
          </div>

          {currentStep.tip && (
            <div className="onboarding-tip-box">
              <HiOutlineLightBulb className="tip-icon" />
              <span>{currentStep.tip}</span>
            </div>
          )}

          {currentStep.actionTab && (
            <div className="onboarding-feature-action-bar">
              <button
                type="button"
                className="btn-try-feature"
                onClick={() => handleTryFeature(currentStep.actionTab)}
              >
                <span>{currentStep.actionLabel}</span>
                <HiOutlineArrowRight />
              </button>
            </div>
          )}
        </div>

        {/* Step Dots & Footer Controls */}
        <div className="onboarding-footer">
          <div className="onboarding-footer-left">
            <label className="checkbox-dont-show">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
              />
              <span>Jangan tampilkan otomatis lagi</span>
            </label>
          </div>

          {/* Dots Indicator */}
          <div className="onboarding-dots-row">
            {TUTORIAL_STEPS.map((_, idx) => (
              <button
                key={idx}
                className={`onboarding-dot ${idx === currentStepIndex ? 'active' : ''}`}
                onClick={() => setCurrentStepIndex(idx)}
                aria-label={`Lompat ke langkah ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="onboarding-nav-btns">
            {!isFirstStep && (
              <button className="btn-onboarding-secondary" onClick={handlePrev}>
                <HiOutlineArrowLeft />
                <span>Sebelumnya</span>
              </button>
            )}

            <button className="btn-onboarding-primary" onClick={handleNext}>
              {isLastStep ? (
                <>
                  <HiOutlineCheckCircle />
                  <span>Mulai Sekarang</span>
                </>
              ) : (
                <>
                  <span>Lanjut</span>
                  <HiOutlineArrowRight />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
