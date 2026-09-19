import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import {
  HiOutlineShieldCheck,
  HiOutlineCalculator,
  HiOutlineDocumentSearch,
  HiOutlineSparkles,
  HiOutlineLockClosed,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
} from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './LoginPage.css';

const LoginPage = () => {
  const { user, loading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState(null);

  if (loading) {
    return <LoadingSpinner message="Menghubungkan ke OmniLedger AI..." />;
  }

  // Redirect to dashboard if logged in
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
      setError(err.message || 'Gagal login dengan Google. Silakan coba lagi atau gunakan Demo Mode.');
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
        {/* Left Side: OmniLedger Showcase & Value Proposition */}
        <section className="login-showcase-panel">
          <div className="showcase-brand-header">
            <div className="showcase-logo-icon">
              <HiOutlineShieldCheck />
            </div>
            <div className="showcase-brand-title">
              OmniLedger <span className="ai-badge">AI</span>
            </div>
          </div>

          <div className="showcase-hero-content">
            <div className="glass-pill pill-purple showcase-pill">
              <HiOutlineSparkles /> Next-Gen Financial Intelligence OS
            </div>
            <h1>
              Kendalikan Arus Kas, Prediksi Runway, & Kelola Keuangan dengan <span className="gradient-text">Autonomous AI</span>
            </h1>
            <p>
              Platform Financial Intelligence cerdas untuk UMKM, founder startup, dan kreator bisnis. Dilengkapi dengan
              simulator skenario <em>What-If</em> interaktif dan pemindai struk otomatis berbasis Vision OCR.
            </p>
          </div>

          {/* Feature Highlight Grid */}
          <div className="showcase-features-list">
            <div className="feature-item">
              <div className="feat-icon-box">
                <HiOutlineCalculator />
              </div>
              <div>
                <strong>Dynamic "What-If" Runway Simulator</strong>
                <span>Simulasikan dampak fluktuasi omset, hiring tim, dan belanja modal secara realtime.</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feat-icon-box">
                <HiOutlineDocumentSearch />
              </div>
              <div>
                <strong>Smart OCR & Vision Receipt Scanner</strong>
                <span>Ekstraksi otomatis struk belanja dan invoice tanpa input manual.</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feat-icon-box">
                <HiOutlineSparkles />
              </div>
              <div>
                <strong>Autonomous AI CFO Advisor</strong>
                <span>Deteksi anomali pos pengeluaran dan rekomendasi pemangkasan biaya taktis.</span>
              </div>
            </div>
          </div>

          <div className="showcase-footer-trust">
            <HiOutlineLockClosed className="trust-icon" />
            <span>Supabase Row-Level Security • 256-bit Encryption • Real-Time Postgres Engine</span>
          </div>
        </section>

        {/* Right Side: Authentication Panel */}
        <section className="login-auth-panel">
          <div className="auth-card-inner">
            <div className="auth-header-text">
              <h2>Masuk ke Workspace</h2>
              <p>Akses command center finansial dan jalankan simulasi kas kamu</p>
            </div>

            {error && (
              <div className="auth-error-banner" role="alert">
                {error}
              </div>
            )}

            {/* Google OAuth Button */}
            <div className="auth-buttons-wrap">
              <button
                className={`btn-oauth-google ${isSigningIn ? 'loading' : ''}`}
                onClick={handleGoogleLogin}
                disabled={isSigningIn}
                id="google-login-btn"
              >
                <FcGoogle className="oauth-icon" />
                <span>{isSigningIn ? 'Menghubungkan Akun...' : 'Lanjutkan dengan Google'}</span>
              </button>

              <div className="auth-divider-line">
                <span>atau eksplorasi langsung</span>
              </div>

              {/* Guest / Reviewer Instant Demo Access */}
              <button
                className="btn-demo-guest"
                onClick={handleGuestDemoLogin}
                id="guest-demo-btn"
              >
                <div className="demo-btn-content">
                  <div className="demo-btn-left">
                    <HiOutlineSparkles className="demo-icon" />
                    <div style={{ textAlign: 'left' }}>
                      <span className="demo-btn-title">Masuk sebagai Demo / Tamu</span>
                      <span className="demo-btn-sub">Eksplorasi instan dengan data simulasi lengkap</span>
                    </div>
                  </div>
                  <HiOutlineArrowRight />
                </div>
              </button>
            </div>

            {/* Key Value Guarantee */}
            <div className="auth-guarantee-box">
              <div className="guarantee-row">
                <HiOutlineCheckCircle className="check-icon" />
                <span>Tanpa perlu kartu kredit</span>
              </div>
              <div className="guarantee-row">
                <HiOutlineCheckCircle className="check-icon" />
                <span>Sinkronisasi database Supabase instan</span>
              </div>
              <div className="guarantee-row">
                <HiOutlineCheckCircle className="check-icon" />
                <span>Kalkulasi runway matematis presisi</span>
              </div>
            </div>

            <p className="auth-footer-terms">
              Dengan masuk, kamu menyetujui Ketentuan Layanan dan Kebijakan Privasi OmniLedger AI.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
