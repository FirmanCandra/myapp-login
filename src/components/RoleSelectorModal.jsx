import { useState } from 'react';
import {
  HiOutlineOfficeBuilding,
  HiOutlineAcademicCap,
  HiOutlineCheckCircle,
  HiOutlineSparkles,
  HiOutlineTrendingUp,
  HiOutlineCalculator,
  HiOutlineDocumentSearch,
  HiOutlineX,
} from 'react-icons/hi';
import confetti from 'canvas-confetti';
import './RoleSelectorModal.css';

const RoleSelectorModal = ({ isOpen, currentRole, onSelectRole, onClose, isClosable = false }) => {
  const [selected, setSelected] = useState(currentRole || 'business');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onSelectRole(selected);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    if (onClose) onClose();
  };

  return (
    <div className="modal-overlay role-modal-overlay">
      <div className="role-modal-container glass-panel">
        {/* Header */}
        <div className="role-modal-header">
          <div className="role-header-text">
            <span className="glass-pill pill-primary">
              <HiOutlineSparkles /> Personalisasi Akun
            </span>
            <h2>Pilih Mode Penggunaan OmniLedger</h2>
            <p>Pilih profil yang paling sesuai dengan kebutuhan finansial kamu saat ini</p>
          </div>
          {isClosable && (
            <button className="modal-close-btn" onClick={onClose} aria-label="Tutup">
              <HiOutlineX />
            </button>
          )}
        </div>

        {/* Option Cards */}
        <div className="role-cards-grid">
          {/* 1. Mode Bisnis / Perusahaan */}
          <div
            className={`role-option-card ${selected === 'business' ? 'active' : ''}`}
            onClick={() => setSelected('business')}
            role="button"
            tabIndex={0}
          >
            <div className="role-card-top">
              <div className="role-card-icon business">
                <HiOutlineOfficeBuilding />
              </div>
              <div className="role-badge-wrapper">
                <span className="role-tag business">Bisnis / SME</span>
                {selected === 'business' && <HiOutlineCheckCircle className="check-selected-icon" />}
              </div>
            </div>

            <div className="role-card-info">
              <h3>Perusahaan & Bisnis</h3>
              <p className="role-card-sub">
                Untuk UMKM, Startup, Agensi, dan Founder yang mengelola arus kas usaha.
              </p>
            </div>

            <ul className="role-features-list">
              <li>
                <HiOutlineTrendingUp />
                <span>Proyeksi Runway 12-Bulan & MRR</span>
              </li>
              <li>
                <HiOutlineCalculator />
                <span>Simulasi Gaji Rekrut Tim & CAPEX</span>
              </li>
              <li>
                <HiOutlineDocumentSearch />
                <span>OCR Struk Invoice AWS, Ads, & Vendor</span>
              </li>
            </ul>

            <div className="role-card-footer">
              <span className="role-select-btn">
                {selected === 'business' ? '✓ Mode Terpilih' : 'Pilih Mode Bisnis'}
              </span>
            </div>
          </div>

          {/* 2. Mode Mahasiswa */}
          <div
            className={`role-option-card ${selected === 'student' ? 'active' : ''}`}
            onClick={() => setSelected('student')}
            role="button"
            tabIndex={0}
          >
            <div className="role-card-top">
              <div className="role-card-icon student">
                <HiOutlineAcademicCap />
              </div>
              <div className="role-badge-wrapper">
                <span className="role-tag student">Mahasiswa</span>
                {selected === 'student' && <HiOutlineCheckCircle className="check-selected-icon" />}
              </div>
            </div>

            <div className="role-card-info">
              <h3>Mahasiswa & Anak Kost</h3>
              <p className="role-card-sub">
                Untuk mahasiswa & pelajar mengelola uang saku, biaya kost, dan tabungan UKT.
              </p>
            </div>

            <ul className="role-features-list">
              <li>
                <HiOutlineTrendingUp />
                <span>Batas Jajan Harian Aman (*Safe Daily*)</span>
              </li>
              <li>
                <HiOutlineCalculator />
                <span>Simulator Survival Tanggal Tua & UKT</span>
              </li>
              <li>
                <HiOutlineDocumentSearch />
                <span>OCR Bon Warteg, Kost, & Indomaret</span>
              </li>
            </ul>

            <div className="role-card-footer">
              <span className="role-select-btn">
                {selected === 'student' ? '✓ Mode Terpilih' : 'Pilih Mode Mahasiswa'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="role-modal-footer">
          <p className="role-footer-hint">
            💡 Kamu dapat berganti mode kapan saja melalui menu di bagian atas navigasi.
          </p>
          <button className="btn-confirm-role" onClick={handleConfirm}>
            <span>Mulai dengan Mode {selected === 'student' ? 'Mahasiswa 🎓' : 'Bisnis 🏢'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectorModal;
