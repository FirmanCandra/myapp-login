import { useState } from 'react';
import {
  HiOutlineShieldCheck,
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineBadgeCheck,
  HiOutlineClock,
  HiOutlineFingerPrint,
} from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../context/AuthContext';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
    } catch (err) {
      console.error('Logout error:', err);
      setIsLoggingOut(false);
    }
  };

  // Extract user metadata
  const metadata = user?.user_metadata || {};
  const fullName = metadata.full_name || metadata.name || 'User';
  const email = user?.email || 'Tidak tersedia';
  const avatarUrl = metadata.avatar_url || metadata.picture || null;
  const firstName = fullName.split(' ')[0];
  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const provider = user?.app_metadata?.provider || 'google';
  const emailVerified = user?.email_confirmed_at ? true : false;
  const createdAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '-';
  const lastSignIn = user?.last_sign_in_at
    ? new Date(user.last_sign_in_at).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '-';

  return (
    <div className="dashboard-page">
      {/* Background */}
      <div className="dashboard-bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      {/* Navbar */}
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <div className="nav-logo">
            <HiOutlineShieldCheck />
          </div>
          <span className="nav-title">MyApp</span>
        </div>

        <div className="nav-user">
          <div className="nav-user-info">
            <div className="nav-user-name">{fullName}</div>
            <div className="nav-user-email">{email}</div>
          </div>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={fullName}
              className="nav-avatar"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="nav-avatar-placeholder">{initials}</div>
          )}
          <button
            className="logout-btn"
            onClick={handleLogout}
            disabled={isLoggingOut}
            id="logout-btn"
          >
            <HiOutlineLogout />
            <span>{isLoggingOut ? 'Keluar...' : 'Logout'}</span>
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="dashboard-content">
        {/* Welcome Section */}
        <section className="welcome-section">
          <p className="welcome-greeting">👋 Selamat datang kembali</p>
          <h1 className="welcome-name">{firstName}</h1>
          <p className="welcome-subtitle">
            Berikut adalah ringkasan informasi akun kamu
          </p>
        </section>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card glass-card">
            <div className="stat-icon purple">
              <HiOutlineUser />
            </div>
            <div className="stat-label">Provider</div>
            <div className="stat-value" style={{ textTransform: 'capitalize' }}>
              {provider}
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon green">
              <HiOutlineBadgeCheck />
            </div>
            <div className="stat-label">Status Email</div>
            <div className="stat-value">
              {emailVerified ? (
                <span className="verified-badge">
                  <HiOutlineBadgeCheck /> Terverifikasi
                </span>
              ) : (
                'Belum Verifikasi'
              )}
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon pink">
              <HiOutlineClock />
            </div>
            <div className="stat-label">Login Terakhir</div>
            <div className="stat-value" style={{ fontSize: '1rem' }}>
              {lastSignIn}
            </div>
          </div>
        </div>

        {/* Profile */}
        <section className="profile-section">
          <h2 className="section-title">
            <HiOutlineFingerPrint className="section-title-icon" />
            Detail Profil
          </h2>

          <div className="profile-card glass-card">
            <div className="profile-header">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={fullName}
                  className="profile-avatar"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="profile-avatar-placeholder">{initials}</div>
              )}
              <div>
                <h3 className="profile-name">{fullName}</h3>
                <p className="profile-email">
                  <HiOutlineMail /> {email}
                </p>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-item">
                <div className="detail-label">User ID</div>
                <div className="detail-value">{user?.id?.slice(0, 16)}...</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Provider</div>
                <div className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FcGoogle /> Google OAuth
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">
                  <HiOutlineCalendar style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                  Akun Dibuat
                </div>
                <div className="detail-value">{createdAt}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Email</div>
                <div className="detail-value">{email}</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
