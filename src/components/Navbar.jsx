import { useState } from 'react';
import {
  HiOutlineViewGrid,
  HiOutlineCalculator,
  HiOutlineDocumentSearch,
  HiOutlineChatAlt2,
  HiOutlineBookOpen,
  HiOutlineLogout,
  HiOutlinePlus,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineQuestionMarkCircle,
  HiOutlineAcademicCap,
  HiOutlineOfficeBuilding,
  HiOutlineSwitchHorizontal,
} from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { NAV_TABS } from '../constants/tabs';
import FinoraLogo from './FinoraLogo';
import './Navbar.css';

const Navbar = ({
  activeTab,
  setActiveTab,
  healthScore,
  onOpenNewTx,
  onOpenScanner,
  onOpenTutorial,
  role = 'business',
  onOpenRoleSelector,
}) => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const metadata = user?.user_metadata || {};
  const fullName = metadata.full_name || metadata.name || (role === 'student' ? 'Mahasiswa' : 'Founder');
  const email = user?.email || '';
  const avatarUrl = metadata.avatar_url || metadata.picture || null;
  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const getScoreBadgeClass = (score) => {
    if (score >= 80) return 'pill-emerald';
    if (score >= 60) return 'pill-primary';
    if (score >= 40) return 'pill-amber';
    return 'pill-rose';
  };

  const isStudent = role === 'student';

  return (
    <>
      {/* Top Navbar */}
      <header className="app-navbar">
        <div className="nav-container">
          {/* Brand */}
          <div className="nav-brand" onClick={() => setActiveTab(NAV_TABS.OVERVIEW)} style={{ cursor: 'pointer' }}>
            <FinoraLogo
              size="sm"
              showTagline={true}
              customTagline={isStudent ? 'Student Edition 🎓' : 'Your Financial Intelligence'}
            />
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="nav-tabs desktop-only">
            <button
              className={`nav-tab ${activeTab === NAV_TABS.OVERVIEW ? 'active' : ''}`}
              onClick={() => setActiveTab(NAV_TABS.OVERVIEW)}
            >
              <HiOutlineViewGrid />
              <span>{isStudent ? 'Uang Saku' : 'Ringkasan'}</span>
            </button>
            <button
              className={`nav-tab ${activeTab === NAV_TABS.SIMULATOR ? 'active' : ''}`}
              onClick={() => setActiveTab(NAV_TABS.SIMULATOR)}
            >
              <HiOutlineCalculator />
              <span>{isStudent ? 'Survival Simulator' : 'Simulator'}</span>
            </button>
            <button
              className={`nav-tab ${activeTab === NAV_TABS.SCANNER ? 'active' : ''}`}
              onClick={() => { setActiveTab(NAV_TABS.SCANNER); if (onOpenScanner) onOpenScanner(); }}
            >
              <HiOutlineDocumentSearch />
              <span>{isStudent ? 'Scan Bon/Struk' : 'Scan Struk'}</span>
            </button>
            <button
              className={`nav-tab ${activeTab === NAV_TABS.CFO ? 'active' : ''}`}
              onClick={() => setActiveTab(NAV_TABS.CFO)}
            >
              <HiOutlineChatAlt2 />
              <span>{isStudent ? 'Mentor AI' : 'Konsultan'}</span>
            </button>
            <button
              className={`nav-tab ${activeTab === NAV_TABS.LEDGER ? 'active' : ''}`}
              onClick={() => setActiveTab(NAV_TABS.LEDGER)}
            >
              <HiOutlineBookOpen />
              <span>Buku Kas</span>
            </button>
          </nav>

          {/* Actions */}
          <div className="nav-actions">
            {/* Mode Switcher Button */}
            <button
              className={`btn-role-switcher ${isStudent ? 'student' : 'business'}`}
              onClick={onOpenRoleSelector}
              title="Ganti Mode (Bisnis / Mahasiswa)"
            >
              {isStudent ? <HiOutlineAcademicCap /> : <HiOutlineOfficeBuilding />}
              <span className="role-btn-text">{isStudent ? 'Mahasiswa' : 'Bisnis'}</span>
              <HiOutlineSwitchHorizontal className="switch-icon desktop-only" />
            </button>

            <div className={`glass-pill ${getScoreBadgeClass(healthScore)} score-pill desktop-only`} title={`Skor Kesehatan: ${healthScore}/100`}>
              <span className="score-text">Skor: {healthScore}</span>
            </div>

            <button className="btn-add-tx desktop-only" onClick={onOpenNewTx}>
              <HiOutlinePlus />
              <span>{isStudent ? 'Catat' : 'Transaksi'}</span>
            </button>

            {/* Tutorial / Help Button (Desktop only, available in profile dropdown on mobile) */}
            <button
              className="btn-tutorial-toggle desktop-only"
              onClick={onOpenTutorial}
              title="Panduan Penggunaan (Tutorial)"
              aria-label="Buka Panduan Tutorial"
            >
              <HiOutlineQuestionMarkCircle />
            </button>

            <button className="btn-theme-toggle" onClick={toggleTheme} title="Ganti tema (Light / Dark)">
              {theme === 'dark' ? <HiOutlineSun /> : <HiOutlineMoon />}
            </button>

            {/* Profile Avatar & Dropdown */}
            <div className="profile-wrap">
              <button
                className="profile-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
                title="Menu Profil & Logout"
                aria-label="Buka Menu Profil dan Logout"
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt={fullName} className="profile-img" referrerPolicy="no-referrer" />
                ) : (
                  <div className={`profile-placeholder ${isStudent ? 'student' : ''}`}>{initials}</div>
                )}
              </button>

              {showUserMenu && (
                <>
                  <div
                    className="profile-dropdown-backdrop"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="profile-dropdown glass-panel">
                    <div className="dropdown-header">
                      <div className="dropdown-name">{fullName}</div>
                      <div className="dropdown-role-label">
                        Mode Aktif: <strong>{isStudent ? 'Mahasiswa 🎓' : 'Bisnis 🏢'}</strong>
                      </div>
                      {email && <div className="dropdown-email">{email}</div>}
                    </div>
                    <div className="dropdown-divider" />
                    
                    <button
                      className="dropdown-action"
                      onClick={() => {
                        setShowUserMenu(false);
                        if (onOpenRoleSelector) onOpenRoleSelector();
                      }}
                    >
                      <HiOutlineSwitchHorizontal /> <span>Ganti Mode Akun</span>
                    </button>

                    <button
                      className="dropdown-action"
                      onClick={() => {
                        setShowUserMenu(false);
                        if (onOpenTutorial) onOpenTutorial();
                      }}
                    >
                      <HiOutlineQuestionMarkCircle /> <span>Panduan Aplikasi</span>
                    </button>

                    <div className="dropdown-divider" />

                    <button
                      className="dropdown-action logout-btn"
                      onClick={async () => {
                        setShowUserMenu(false);
                        await signOut();
                      }}
                    >
                      <HiOutlineLogout className="logout-icon" />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav mobile-only" aria-label="Navigasi Mobile">
        <button
          className={`mobile-nav-item ${activeTab === NAV_TABS.OVERVIEW ? 'active' : ''}`}
          onClick={() => setActiveTab(NAV_TABS.OVERVIEW)}
        >
          <div className="mobile-nav-icon"><HiOutlineViewGrid /></div>
          <span className="mobile-nav-label">{isStudent ? 'Uang Saku' : 'Ringkasan'}</span>
        </button>

        <button
          className={`mobile-nav-item ${activeTab === NAV_TABS.SIMULATOR ? 'active' : ''}`}
          onClick={() => setActiveTab(NAV_TABS.SIMULATOR)}
        >
          <div className="mobile-nav-icon"><HiOutlineCalculator /></div>
          <span className="mobile-nav-label">Simulator</span>
        </button>

        {/* Center Floating Quick-Add Button */}
        <div className="mobile-center-action-wrap">
          <button
            className={`mobile-fab-btn ${isStudent ? 'student' : ''}`}
            onClick={onOpenNewTx}
            title={isStudent ? 'Catat Pengeluaran / Uang Saku' : 'Catat Transaksi Cepat'}
          >
            <HiOutlinePlus />
          </button>
        </div>

        <button
          className={`mobile-nav-item ${activeTab === NAV_TABS.SCANNER ? 'active' : ''}`}
          onClick={() => { setActiveTab(NAV_TABS.SCANNER); if (onOpenScanner) onOpenScanner(); }}
        >
          <div className="mobile-nav-icon"><HiOutlineDocumentSearch /></div>
          <span className="mobile-nav-label">Scan</span>
        </button>

        <button
          className={`mobile-nav-item ${activeTab === NAV_TABS.LEDGER ? 'active' : ''}`}
          onClick={() => setActiveTab(NAV_TABS.LEDGER)}
        >
          <div className="mobile-nav-icon"><HiOutlineBookOpen /></div>
          <span className="mobile-nav-label">Buku Kas</span>
        </button>

        <button
          className={`mobile-nav-item ${activeTab === NAV_TABS.CFO ? 'active' : ''}`}
          onClick={() => setActiveTab(NAV_TABS.CFO)}
        >
          <div className="mobile-nav-icon"><HiOutlineChatAlt2 /></div>
          <span className="mobile-nav-label">{isStudent ? 'Mentor AI' : 'Konsultan'}</span>
        </button>
      </nav>
    </>
  );
};

export default Navbar;
