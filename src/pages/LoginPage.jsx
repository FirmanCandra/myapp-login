import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import {
  HiOutlineCalculator,
  HiOutlineDocumentSearch,
  HiOutlineChatAlt2,
  HiOutlineLockClosed,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
} from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import FinoraLogo from '../components/FinoraLogo';
import './LoginPage.css';

const LoginPage = () => {
  const { user, loading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState(null);

  if (loading) {
    return <LoadingSpinner message="Memuat FINORA..." />;
  }

  if (user) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const handleGoogleLogin = async () => {
    try {
      setIsSigningIn(true);
      setError(null);
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || 'Gagal login. Silakan coba lagi atau masuk sebagai tamu.');
      setIsSigningIn(false);
    }
  };

  const handleGuestDemoLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-bg-glow blob-1" />
      <div className="login-bg-glow blob-2" />

      <div className="login-split-card glass-panel">
        {/* Left Side: Desktop Showcase */}
        <section className="login-showcase-panel desktop-only">
          <div className="showcase-brand-header">
            <FinoraLogo size="lg" showTagline={true} customTagline="Your Financial Intelligence" />
          </div>

          <div className="showcase-hero-content">
            <div className="glass-pill pill-primary showcase-pill">
              SMART • SIMPLE • FUTURE-READY
            </div>
            <h1>
              Kelola keuangan bisnis & kuliah dengan <span className="gradient-text">cerdas dan terukur</span>
            </h1>
            <p>
              Autonomous Financial Intelligence untuk UMKM, Startup, dan Mahasiswa. Simulasi skenario runway, pemindai bon otomatis, dan AI Financial Mentor.
            </p>
          </div>

          <div className="showcase-features-list">
            <div className="feature-item">
              <div className="feat-icon-box">
                <HiOutlineCalculator />
              </div>
              <div>
                <strong>Simulator Skenario & Survival</strong>
                <span>Uji dampak perubahan omset, target nabung UKT, dan keputusan strategis keuangan.</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feat-icon-box">
                <HiOutlineDocumentSearch />
              </div>
              <div>
                <strong>Smart OCR Receipt Scanner</strong>
                <span>Foto struk belanja atau bon warteg, data otomatis terurai masuk ke buku kas.</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feat-icon-box">
                <HiOutlineChatAlt2 />
              </div>
              <div>
                <strong>AI Financial Advisor & Mentor</strong>
                <span>Rekomendasi penghematan, batas jajan harian aman, dan konsultasi finansial 24/7.</span>
              </div>
            </div>
          </div>

          <div className="showcase-footer-trust">
            <HiOutlineLockClosed className="trust-icon" />
            <span>Data terenkripsi • Row-Level Security • Supabase Cloud</span>
          </div>
        </section>

        {/* Right Side: Auth Form */}
        <section className="login-auth-panel">
          <div className="auth-card-inner">
            {/* Mobile Brand Header */}
            <div className="mobile-brand-banner mobile-only">
              <FinoraLogo size="md" showTagline={true} customTagline="Your Financial Intelligence" />
            </div>

            <div className="auth-header-text">
              <h2>Masuk ke Dashboard</h2>
              <p>Pilih mode Perusahaan (SME) atau Mahasiswa (Anak Kost)</p>
            </div>

            {error && (
              <div className="auth-error-banner" role="alert">
                {error}
              </div>
            )}

            <div className="auth-buttons-wrap">
              <button
                className={`btn-oauth-google ${isSigningIn ? 'loading' : ''}`}
                onClick={handleGoogleLogin}
                disabled={isSigningIn}
                id="google-login-btn"
              >
                <FcGoogle className="oauth-icon" />
                <span>{isSigningIn ? 'Menghubungkan...' : 'Lanjutkan dengan Google'}</span>
              </button>

              <div className="auth-divider-line">
                <span>atau</span>
              </div>

              <button
                className="btn-demo-guest"
                onClick={handleGuestDemoLogin}
                id="guest-demo-btn"
              >
                <div className="demo-btn-content">
                  <div className="demo-btn-left">
                    <div style={{ textAlign: 'left' }}>
                      <span className="demo-btn-title">Masuk Langsung (Tamu)</span>
                      <span className="demo-btn-sub">Mulai eksplorasi tanpa login</span>
                    </div>
                  </div>
                  <HiOutlineArrowRight />
                </div>
              </button>
            </div>

            <div className="auth-guarantee-box">
              <div className="guarantee-row">
                <HiOutlineCheckCircle className="check-icon" />
                <span>Gratis & Siap Pakai</span>
              </div>
              <div className="guarantee-row">
                <HiOutlineCheckCircle className="check-icon" />
                <span>Dual-Mode: Bisnis 🏢 & Mahasiswa 🎓</span>
              </div>
              <div className="guarantee-row">
                <HiOutlineCheckCircle className="check-icon" />
                <span>Kalkulasi finansial presisi</span>
              </div>
            </div>

            <p className="auth-footer-terms">
              Dengan masuk, kamu menyetujui Ketentuan Layanan dan Kebijakan Privasi FINORA.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
