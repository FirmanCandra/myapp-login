import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineShieldCheck } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './LoginPage.css';

const LoginPage = () => {
  const { user, loading, signInWithGoogle } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState(null);

  if (loading) {
    return <LoadingSpinner message="Memuat..." />;
  }

  // Redirect ke dashboard jika sudah login
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleGoogleLogin = async () => {
    try {
      setIsSigningIn(true);
      setError(null);
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || 'Gagal login dengan Google. Silakan coba lagi.');
      setIsSigningIn(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background Orbs */}
      <div className="login-bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Login Card */}
      <div className="login-card glass-card">
        {/* Logo */}
        <div className="login-logo">
          <HiOutlineShieldCheck />
        </div>

        <h1 className="login-title">Selamat Datang</h1>
        <p className="login-subtitle">
          Masuk ke akun kamu dengan Google untuk melanjutkan
        </p>

        {/* Google Login Button */}
        <button
          className={`google-btn ${isSigningIn ? 'btn-loading' : ''}`}
          onClick={handleGoogleLogin}
          disabled={isSigningIn}
          id="google-login-btn"
        >
          <span className="btn-content">
            <FcGoogle className="google-icon" />
            {isSigningIn ? 'Menghubungkan...' : 'Masuk dengan Google'}
          </span>
        </button>

        {/* Error Message */}
        {error && (
          <div className="login-error" role="alert">
            {error}
          </div>
        )}

        {/* Divider */}
        <div className="login-divider">
          <span>aman & terenkripsi</span>
        </div>

        {/* Footer */}
        <p className="login-footer">
          Dengan masuk, kamu menyetujui{' '}
          <a href="#terms">Ketentuan Layanan</a> dan{' '}
          <a href="#privacy">Kebijakan Privasi</a> kami.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
