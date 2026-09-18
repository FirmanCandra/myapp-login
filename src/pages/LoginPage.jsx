import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
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

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Silakan masukkan alamat email kamu.');
      return;
    }
    setNotice(`Email "${email}" dicatat! Untuk login instan & aman, silakan klik tombol Masuk dengan Google di bawah.`);
    setTimeout(() => setNotice(null), 5000);
  };

  return (
    <div className="login-wrapper">
      {/* Mobile Top Navigation */}
      <header className="mobile-header">
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

            {/* Google Login Button - Full Width & Centered */}
            <div className="social-buttons-container">
              <button
                type="button"
                className={`google-full-btn ${isSigningIn ? 'loading' : ''}`}
                onClick={handleGoogleLogin}
                disabled={isSigningIn}
                id="google-login-btn"
                aria-label="Sign in with Google"
              >
                <FcGoogle className="google-icon" />
                <span className="google-label">
                  {isSigningIn ? 'Connecting...' : 'Sign in with Google'}
                </span>
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
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
