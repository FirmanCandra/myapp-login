import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import {
  HiOutlineCalculator,
  HiOutlineDocumentSearch,
  HiOutlineChatAlt2,
  HiOutlineLockClosed,
  HiOutlineArrowRight,
  HiOutlinePlay,
  HiOutlineBriefcase,
  HiOutlineAcademicCap,
} from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import FinoraLogo from '../components/FinoraLogo';
import IntroVideoSplash from '../components/IntroVideoSplash';
import './LoginPage.css';

const LoginPage = () => {
  const { user, loading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedRole, setSelectedRole] = useState(
    () => localStorage.getItem('omniledger_user_role') || 'business'
  );

  if (loading) {
    return <LoadingSpinner message="Memuat FINORA..." />;
  }

  if (user) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    localStorage.setItem('omniledger_user_role', role);
  };

  const handleGoogleLogin = async () => {
    try {
      setIsSigningIn(true);
      setError(null);
      localStorage.setItem('omniledger_user_role', selectedRole);
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || 'Gagal login. Silakan coba lagi atau masuk sebagai tamu.');
      setIsSigningIn(false);
    }
  };

  const handleGuestDemoLogin = () => {
    localStorage.setItem('omniledger_user_role', selectedRole);
    navigate('/dashboard');
  };

  return (
    <div className={`login-page-wrapper mode-${selectedRole}`}>
      {showIntro && (
        <IntroVideoSplash onFinish={() => setShowIntro(false)} />
      )}

      <div className="login-split-card login-fade-in">
        {/* Mobile Mascot Hero Stage (Image Reference Style) */}
        <section className="mobile-mascot-hero-stage mobile-only">
          <div className="mascot-bg-mesh" />
          <div className="mascot-sparkle s1">✦</div>
          <div className="mascot-sparkle s2">✦</div>
          <div className="mascot-sparkle s3">★</div>
          <div className="mascot-sparkle s4">✦</div>

          <div className="mascot-top-header">
            <FinoraLogo
              size="sm"
              variant="white"
              showTagline={true}
              customTagline="Your Financial Intelligence"
            />
          </div>

          <div className="mascot-visual-container">
            <img
              src="/MASKOT-FINORA.png"
              alt="FINORA Mascot Robot"
              className="mascot-character-img"
            />
          </div>
        </section>

        {/* Left Side: Desktop Hero Panel (Navy + Gradient Mesh + Features) */}
        <section className="login-hero-panel desktop-only">
          <div className="hero-mesh-bg" />

          <div className="hero-brand-header">
            <FinoraLogo
              size="md"
              variant="white"
              showTagline={true}
              customTagline="Your Financial Intelligence"
            />
          </div>

          <div className="hero-desktop-showcase">
            <div className="hero-content">
              <h1 className="hero-headline">
                Kelola keuangan bisnis & kuliah dengan terukur
              </h1>
              <p className="hero-description">
                Autonomous Financial Intelligence untuk UMKM, Startup, dan Mahasiswa. Simulasi skenario runway, pemindai bon cerdas, dan AI Financial Advisor.
              </p>
            </div>

            <div className="hero-mascot-desktop-badge">
              <img
                src="/MASKOT-FINORA.png"
                alt="FINORA AI Assistant"
                className="hero-mascot-desktop-img"
              />
            </div>
          </div>

          {/* Three Feature Highlights with circular subtle gradient badge */}
          <div className="hero-features-list">
            <div className="hero-feature-item">
              <div className="feature-circle-badge">
                <HiOutlineCalculator />
              </div>
              <div className="feature-text">
                <span className="feature-title">Simulator Skenario</span>
                <span className="feature-desc">Uji ketahanan runway & rencana tabungan dengan kalkulasi presisi.</span>
              </div>
            </div>

            <div className="hero-feature-item">
              <div className="feature-circle-badge">
                <HiOutlineDocumentSearch />
              </div>
              <div className="feature-text">
                <span className="feature-title">Smart OCR Scanner</span>
                <span className="feature-desc">Ekstraksi otomatis foto bon belanja & nota kas masuk ke pembukuan.</span>
              </div>
            </div>

            <div className="hero-feature-item">
              <div className="feature-circle-badge">
                <HiOutlineChatAlt2 />
              </div>
              <div className="feature-text">
                <span className="feature-title">AI Financial Advisor</span>
                <span className="feature-desc">Konsultasi cerdas, audit inefisiensi pengeluaran, & tips terukur 24/7.</span>
              </div>
            </div>
          </div>

          {/* Security Strip at bottom of navy panel */}
          <div className="hero-security-strip">
            <HiOutlineLockClosed className="security-icon" />
            <span>Data terenkripsi · Row-Level Security · Supabase Cloud</span>
          </div>
        </section>

        {/* Right Side: Auth Form Panel */}
        <section className="login-form-panel">
          <div className="form-card-inner">
            <div className="form-title-group">
              <h2 className="form-title">Masuk ke Dashboard</h2>
              <p className="form-subtitle">
                {selectedRole === 'business'
                  ? 'Mode Bisnis & UMKM (Runway & Cashflow OS)'
                  : 'Mode Mahasiswa & Anak Kost (Uang Saku & UKT)'}
              </p>
            </div>

            {/* Segmented Persona Toggle */}
            <div className="persona-toggle-wrapper">
              <div className="persona-toggle-track">
                <div
                  className={`persona-toggle-indicator ${selectedRole}`}
                />
                <button
                  type="button"
                  className={`persona-toggle-btn ${selectedRole === 'business' ? 'active' : ''}`}
                  onClick={() => handleRoleChange('business')}
                  id="persona-btn-business"
                >
                  <HiOutlineBriefcase className="persona-btn-icon" />
                  <span>Bisnis</span>
                </button>
                <button
                  type="button"
                  className={`persona-toggle-btn ${selectedRole === 'student' ? 'active' : ''}`}
                  onClick={() => handleRoleChange('student')}
                  id="persona-btn-student"
                >
                  <HiOutlineAcademicCap className="persona-btn-icon" />
                  <span>Mahasiswa</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="form-error-banner" role="alert">
                {error}
              </div>
            )}

            {/* Auth Action Buttons */}
            <div className="form-actions-wrap">
              <button
                className={`btn-google-auth ${isSigningIn ? 'loading' : ''}`}
                onClick={handleGoogleLogin}
                disabled={isSigningIn}
                id="google-login-btn"
              >
                <FcGoogle className="google-icon" />
                <span>{isSigningIn ? 'Menghubungkan...' : 'Lanjutkan dengan Google'}</span>
              </button>

              <div className="form-divider">
                <span>atau</span>
              </div>

              <button
                className="btn-guest-ghost"
                onClick={handleGuestDemoLogin}
                id="guest-demo-btn"
              >
                <div className="guest-btn-content">
                  <span className="guest-btn-title">Masuk Langsung (Tamu)</span>
                  <span className="guest-btn-desc">Mulai eksplorasi tanpa login</span>
                </div>
                <HiOutlineArrowRight className="guest-arrow" />
              </button>
            </div>

            {/* Footer Replay & Links */}
            <div className="form-footer">
              <button
                type="button"
                className="btn-replay-video"
                onClick={() => setShowIntro(true)}
                id="replay-intro-btn"
              >
                <HiOutlinePlay className="replay-icon" />
                <span>Tonton ulang video intro</span>
              </button>

              <p className="form-terms-text">
                Dengan masuk, kamu menyetujui Ketentuan Layanan dan Kebijakan Privasi FINORA.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;

