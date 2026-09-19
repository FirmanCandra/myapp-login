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
  HiOutlineAcademicCap,
} from 'react-icons/hi';
import confetti from 'canvas-confetti';
import './OnboardingModal.css';

const BUSINESS_TUTORIAL_STEPS = [
  {
    id: 'welcome',
    badge: 'Selamat Datang',
    title: 'Selamat Datang di FINORA! 🚀',
    subtitle: 'Your Financial Intelligence untuk Bisnis, Startup, & Mahasiswa',
    icon: HiOutlineSparkles,
    iconColor: 'purple',
    content: (
      <div className="step-welcome-box">
        <p className="step-intro-text">
          FINORA dirancang untuk membantumu mengendalikan arus kas (*cashflow*), memprediksi daya tahan bisnis (*runway*), memindai struk otomatis, dan menyimulasikan keputusan finansial dengan mudah.
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

const STUDENT_TUTORIAL_STEPS = [
  {
    id: 'welcome-student',
    badge: 'Mode Mahasiswa',
    title: 'Selamat Datang di FINORA Mahasiswa! 🎓',
    subtitle: 'Student Survival & Financial Intelligence untuk Mengelola Uang Saku, Kost, & UKT',
    icon: HiOutlineAcademicCap,
    iconColor: 'primary',
    content: (
      <div className="step-welcome-box">
        <p className="step-intro-text">
          FINORA Mode Mahasiswa dirancang khusus agar kamu bisa mengontrol uang saku kiriman, jajan warteg, sewa kost, dan target bayar UKT tanpa takut kehabisan uang di tanggal tua!
        </p>
        <div className="onboarding-feature-pills">
          <div className="feature-pill-item">
            <span className="pill-dot primary" />
            <span><strong>Batas Jajan Harian (Safe Daily):</strong> Tahu persis batas aman jajan per hari</span>
          </div>
          <div className="feature-pill-item">
            <span className="pill-dot emerald" />
            <span><strong>Scan Bon & Nota Kost:</strong> Foto bon warteg, Indomaret, & kwitansi sewa kost</span>
          </div>
          <div className="feature-pill-item">
            <span className="pill-dot purple" />
            <span><strong>Simulator Survival Tanggal Tua:</strong> Uji skenario hemat makan & freelance</span>
          </div>
          <div className="feature-pill-item">
            <span className="pill-dot amber" />
            <span><strong>AI Financial Mentor:</strong> Tanya tips hemat anak kost & strategi nabung UKT</span>
          </div>
        </div>
      </div>
    ),
    tip: '💡 Kamu bisa beralih antara Mode Mahasiswa dan Mode Bisnis kapan saja di tombol atas navigasi.',
  },
  {
    id: 'overview-student',
    badge: 'Fitur 1 dari 5',
    title: '1. Sisa Uang Saku & Batas Jajan Harian',
    subtitle: 'Cek kondisi dompet dan batas aman jajan hari ini',
    icon: HiOutlineViewGrid,
    iconColor: 'primary',
    content: (
      <div className="step-content-grid">
        <ul className="step-points-list">
          <li>
            <strong>Batas Jajan Harian Aman (*Safe Daily*):</strong> Otomatis menghitung sisa saldo dibagi sisa hari sampai akhir bulan agar uangmu tidak habis sebelum kiriman baru.
          </li>
          <li>
            <strong>Ketahanan Dompet:</strong> Ketahui berapa hari lagi dompetmu mampu bertahan dengan pola jajan saat ini.
          </li>
          <li>
            <strong>Skor Ketahanan (0–100):</strong> Indikator cerdas kesehatan finansial anak kost.
          </li>
        </ul>
      </div>
    ),
    actionTab: 'overview',
    actionLabel: 'Lihat Tab Uang Saku',
  },
  {
    id: 'scanner-student',
    badge: 'Fitur 2 dari 5',
    title: '2. Scan Bon Warteg, Struk & Kwitansi Kost',
    subtitle: 'Foto struk belanja tanpa repot mencatat manual',
    icon: HiOutlineDocumentSearch,
    iconColor: 'emerald',
    content: (
      <div className="step-content-grid">
        <ul className="step-points-list">
          <li>
            <strong>Foto Bon & Nota:</strong> Foto nota makan warteg, struk belanja Indomaret, fotokopi tugas, atau kwitansi kost.
          </li>
          <li>
            <strong>Ekstraksi Otomatis:</strong> AI membaca total harga, nama warung, dan memasukkannya ke kategori yang sesuai (Makan & Minum, Kost, dll).
          </li>
        </ul>
      </div>
    ),
    actionTab: 'scanner',
    actionLabel: 'Coba Scan Bon',
  },
  {
    id: 'simulator-student',
    badge: 'Fitur 3 dari 5',
    title: '3. Simulator Survival Tanggal Tua & UKT',
    subtitle: 'Uji strategi hemat dan rencana tabungan semesteran',
    icon: HiOutlineCalculator,
    iconColor: 'purple',
    content: (
      <div className="step-content-grid">
        <ul className="step-points-list">
          <li>
            <strong>Preset Khusus Mahasiswa:</strong> <em>Survival Tanggal Tua</em>, <em>Santai Awal Bulan</em>, <em>Target Nabung UKT / Laptop</em>, & <em>Mahasiswa Freelancer</em>.
          </li>
          <li>
            <strong>Simulasi Wishlist & Bantuan:</strong> Uji apakah aman membeli HP baru atau bayar UKT dengan alokasi tabunganmu.
          </li>
        </ul>
      </div>
    ),
    actionTab: 'simulator',
    actionLabel: 'Buka Simulator',
  },
  {
    id: 'cfo-student',
    badge: 'Fitur 4 dari 5',
    title: '4. AI Financial Mentor Mahasiswa',
    subtitle: 'Teman diskusi finansial pintar untuk tips anak kost',
    icon: HiOutlineChatAlt2,
    iconColor: 'amber',
    content: (
      <div className="step-content-grid">
        <ul className="step-points-list">
          <li>
            <strong>Life Hacks Hemat:</strong> Tips masak nasi di kost, diskon Spotify Student, dan maksimalkan WiFi kampus.
          </li>
          <li>
            <strong>Chat AI Mentor:</strong> Tanya rekomendasi menu makan hemat, cara cari project freelance, atau cara nabung UKT.
          </li>
        </ul>
      </div>
    ),
    actionTab: 'cfo',
    actionLabel: 'Tanya Mentor AI',
  },
  {
    id: 'ledger-student',
    badge: 'Fitur 5 dari 5',
    title: '5. Buku Kas & Catatan Uang Saku',
    subtitle: 'Rekap lengkap semua pengeluaran dan kiriman',
    icon: HiOutlineBookOpen,
    iconColor: 'primary',
    content: (
      <div className="step-content-grid">
        <ul className="step-points-list">
          <li>
            <strong>Kategori Mahasiswa Lengkap:</strong> Uang saku, freelance, warteg, sewa kost, kuota, print tugas, hingga tabungan UKT.
          </li>
          <li>
            <strong>Ekspor Data:</strong> Unduh rekap keuangan ke file CSV kapan saja.
          </li>
        </ul>
      </div>
    ),
    actionTab: 'ledger',
    actionLabel: 'Buka Buku Kas',
  },
];

const OnboardingModal = ({ isOpen, role = 'business', onClose, onNavigateTab }) => {
  const isStudent = role === 'student';
  const steps = isStudent ? STUDENT_TUTORIAL_STEPS : BUSINESS_TUTORIAL_STEPS;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0);
    }
  }, [isOpen, role]);

  if (!isOpen) return null;

  const currentStep = steps[currentStepIndex] || steps[0];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
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
            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
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
            {steps.map((_, idx) => (
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
