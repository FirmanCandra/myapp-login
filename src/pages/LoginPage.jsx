import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './LoginPage.css';

const LoginPage = () => {
  const { user, loading, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  if (loading) {
    return <LoadingSpinner message="Memuat..." />;
  }

  // Redirect to dashboard if logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleGoogleLogin = async () => {
    try {
      setIsSigningIn(true);
      setError(null);
      setNotice(null);
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || 'Gagal login dengan Google. Silakan coba lagi.');
      setIsSigningIn(false);
    }
  };

  const handleFacebookClick = () => {
    setNotice('Login dengan Facebook akan segera hadir. Silakan gunakan Google.');
    setTimeout(() => setNotice(null), 4000);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Silakan masukkan alamat email kamu.');
      return;
    }
    // Instant helpful hint to use Google OAuth button
    setNotice(`Email "${email}" dicatat! Untuk login instan & aman, silakan klik tombol Google di bawah.`);
    setTimeout(() => setNotice(null), 5000);
  };

  return (
    <div className="login-wrapper">
      {/* Mobile Top Navigation */}
      <header className="mobile-header">
        <div className="brand-badge">
          <svg
            className="brand-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="6 2 18 2 18 6 6 6" />
            <polygon points="6 18 18 18 18 22 6 22" />
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
          <div className="brand-text">
            <span className="brand-title">Ibrahim</span>
            <span className="brand-sub">MEMON</span>
          </div>
        </div>
        <div className="mobile-header-link">
          HAVE AN ACCOUNT? <span className="highlight-text">SIGN IN</span>
        </div>
      </header>

      {/* Main Split Container */}
      <div className="login-container">
        {/* Left Side: Space Illustration & Hero */}
        <section className="space-hero-panel">
          <div className="space-img-container">
            <img
              src="/space-bg.jpg"
              alt="Space Adventure"
              className="space-bg-image"
            />
            <div className="space-overlay-gradient"></div>
          </div>

          {/* Desktop Brand Header */}
          <div className="desktop-brand-header">
            <div className="brand-badge">
              <svg
                className="brand-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="6 2 18 2 18 6 6 6" />
                <polygon points="6 18 18 18 18 22 6 22" />
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
              <div className="brand-text">
                <span className="brand-title">Ibrahim</span>
                <span className="brand-sub">MEMON</span>
              </div>
            </div>
          </div>

          {/* Hero Typography Overlay */}
          <div className="hero-content">
            <h2 className="hero-title-top">SIGN IN TO YOUR</h2>
            <h1 className="hero-title-adventure">ADVENTURE!</h1>
          </div>
        </section>

        {/* Right Side: Auth Form */}
        <section className="auth-form-panel">
          <div className="form-card">
            <h1 className="auth-title">SIGN IN</h1>
            <p className="auth-subtitle">Sign in with email address</p>

            {/* Error Message */}
            {error && (
              <div className="feedback-message error-msg" role="alert">
                {error}
              </div>
            )}

            {/* Notification / Toast */}
            {notice && (
              <div className="feedback-message notice-msg">
                {notice}
              </div>
            )}

            {/* Email Form */}
            <form onSubmit={handleEmailSubmit} className="email-form">
              <div className="input-group">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Yourname@gmail.com"
                  className="auth-input"
                  aria-label="Email Address"
                />
              </div>

              <button type="submit" className="primary-action-btn">
                <span>Sign up</span>
              </button>
            </form>

            {/* Divider */}
            <div className="auth-divider">
              <span className="divider-line"></span>
              <span className="divider-text">Or continue with</span>
              <span className="divider-line"></span>
            </div>

            {/* Social Logins */}
            <div className="social-buttons-row">
              <button
                type="button"
                className={`social-btn google-social-btn ${isSigningIn ? 'loading' : ''}`}
                onClick={handleGoogleLogin}
                disabled={isSigningIn}
                id="google-login-btn"
                aria-label="Sign in with Google"
              >
                <FcGoogle className="social-icon" />
                <span className="social-label">
                  {isSigningIn ? 'Connecting...' : 'Google'}
                </span>
              </button>

              <button
                type="button"
                className="social-btn facebook-social-btn"
                onClick={handleFacebookClick}
                aria-label="Sign in with Facebook"
              >
                <FaFacebook className="social-icon fb-icon" />
                <span className="social-label">Facebook</span>
              </button>
            </div>

            {/* Terms Footer */}
            <p className="terms-text">
              By registering you with our{' '}
              <a href="#terms" className="terms-link">
                Terms and Conditions
              </a>
            </p>
          </div>

          {/* Mobile bottom copyright */}
          <footer className="auth-bottom-copyright">
            COPYRIGHT BY IBRAHIM MEMON
          </footer>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
