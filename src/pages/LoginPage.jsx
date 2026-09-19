import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import {
  HiOutlineShieldCheck,
  HiOutlineCalculator,
  HiOutlineDocumentSearch,
  HiOutlineChatAlt2,
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
    return <LoadingSpinner message="Memuat OmniLedger..." />;
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
            <div className="showcase-logo-icon">
              <HiOutlineShieldCheck />
            </div>
            <div className="showcase-brand-title">OmniLedger</div>
          </div>

          <div className="showcase-hero-content">
            <div className="glass-pill pill-primary showcase-pill">Financial OS</div>
            <h1>
              Kelola keuangan bisnis dengan lebih <span className="gradient-text">cerdas dan terukur</span>
            </h1>
            <p>
              Dashboard keuangan lengkap untuk UMKM, freelancer, dan startup. Simulasi skenario, scan struk otomatis, dan analisis arus kas — dalam satu platform.
            </p>
          </div>

          <div className="showcase-features-list">
            <div className="feature-item">
              <div className="feat-icon-box">
                <HiOutlineCalculator />
              </div>
              <div>
                <strong>Simulator Skenario</strong>
                <span>Uji dampak perubahan omset, biaya baru, dan keputusan strategis terhadap kesehatan kas.</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feat-icon-box">
                <HiOutlineDocumentSearch />
              </div>
              <div>
                <strong>Pemindai Struk & Invoice</strong>
                <span>Foto struk, data terurai otomatis. Tanpa input manual satu per satu.</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feat-icon-box">
                <HiOutlineChatAlt2 />
              </div>
              <div>
                <strong>Konsultan Keuangan</strong>
                <span>Temuan inefisiensi pengeluaran dan rekomendasi penghematan berdasarkan data nyata.</span>
              </div>
            </div>
          </div>

          <div className="showcase-footer-trust">
            <HiOutlineLockClosed className="trust-icon" />
            <span>Data terenkripsi • Row-Level Security • Supabase</span>
          </div>
        </section>

        {/* Right Side: Auth Form */}
        <section className="login-auth-panel">
          <div className="auth-card-inner">
            {/* Mobile Brand Header */}
            <div className="mobile-brand-banner mobile-only">
              <div className="brand-mark">O</div>
              <div>
                <div className="mobile-brand-title">OmniLedger</div>
                <div className="mobile-brand-sub">Autonomous Financial OS</div>
              </div>
            </div>

            <div className="auth-header-text">
              <h2>Masuk ke Dashboard</h2>
              <p>Akses data keuangan dan simulasi bisnis kamu</p>
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
                      <span className="demo-btn-title">Masuk sebagai Tamu</span>
                      <span className="demo-btn-sub">Coba langsung dengan data contoh</span>
                    </div>
                  </div>
                  <HiOutlineArrowRight />
                </div>
              </button>
            </div>

            <div className="auth-guarantee-box">
              <div className="guarantee-row">
                <HiOutlineCheckCircle className="check-icon" />
                <span>Gratis, tanpa kartu kredit</span>
              </div>
              <div className="guarantee-row">
                <HiOutlineCheckCircle className="check-icon" />
                <span>Database tersinkronisasi otomatis</span>
              </div>
              <div className="guarantee-row">
                <HiOutlineCheckCircle className="check-icon" />
                <span>Kalkulasi keuangan akurat</span>
              </div>
            </div>

            <p className="auth-footer-terms">
              Dengan masuk, kamu menyetujui Ketentuan Layanan dan Kebijakan Privasi OmniLedger.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
