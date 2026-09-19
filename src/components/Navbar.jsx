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
} from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { NAV_TABS } from '../constants/tabs';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab, healthScore, onOpenNewTx, onOpenScanner, onOpenTutorial }) => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const metadata = user?.user_metadata || {};
  const fullName = metadata.full_name || metadata.name || 'User';
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

  return (
    <>
      {/* Top Navbar */}
      <header className="app-navbar">
        <div className="nav-container">
          {/* Brand */}
          <div className="nav-brand">
            <div className="brand-mark">O</div>
            <div className="brand-text">
              <span className="brand-name">OmniLedger</span>
              <span className="brand-sub">Financial OS</span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="nav-tabs desktop-only">
            <button
              className={`nav-tab ${activeTab === NAV_TABS.OVERVIEW ? 'active' : ''}`}
              onClick={() => setActiveTab(NAV_TABS.OVERVIEW)}
            >
              <HiOutlineViewGrid />
              <span>Ringkasan</span>
            </button>
            <button
              className={`nav-tab ${activeTab === NAV_TABS.SIMULATOR ? 'active' : ''}`}
              onClick={() => setActiveTab(NAV_TABS.SIMULATOR)}
            >
              <HiOutlineCalculator />
              <span>Simulator</span>
            </button>
            <button
              className={`nav-tab ${activeTab === NAV_TABS.SCANNER ? 'active' : ''}`}
              onClick={() => { setActiveTab(NAV_TABS.SCANNER); if (onOpenScanner) onOpenScanner(); }}
            >
              <HiOutlineDocumentSearch />
              <span>Scan Struk</span>
            </button>
            <button
              className={`nav-tab ${activeTab === NAV_TABS.CFO ? 'active' : ''}`}
              onClick={() => setActiveTab(NAV_TABS.CFO)}
            >
              <HiOutlineChatAlt2 />
              <span>Konsultan</span>
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
            <div className={`glass-pill ${getScoreBadgeClass(healthScore)} score-pill`} title={`Skor Kesehatan Finansial: ${healthScore}`}>
              <span className="score-text">Skor: {healthScore}</span>
            </div>

            <button className="btn-add-tx desktop-only" onClick={onOpenNewTx}>
              <HiOutlinePlus />
              <span>Transaksi</span>
            </button>

            {/* Tutorial / Help Button */}
            <button
              className="btn-tutorial-toggle"
              onClick={onOpenTutorial}
              title="Panduan Penggunaan (Tutorial)"
              aria-label="Buka Panduan Tutorial"
            >
              <HiOutlineQuestionMarkCircle />
            </button>

            <button className="btn-theme-toggle" onClick={toggleTheme} title="Ganti tema (Light / Dark)">
              {theme === 'dark' ? <HiOutlineSun /> : <HiOutlineMoon />}
            </button>

            {/* Profile */}
            <div className="profile-wrap">
              <button className="profile-btn" onClick={() => setShowUserMenu(!showUserMenu)} title="Menu Profil">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={fullName} className="profile-img" referrerPolicy="no-referrer" />
                ) : (
                  <div className="profile-placeholder">{initials}</div>
                )}
              </button>

              {showUserMenu && (
                <div className="profile-dropdown glass-panel">
                  <div className="dropdown-header">
                    <div className="dropdown-name">{fullName}</div>
                    {email && <div className="dropdown-email">{email}</div>}
                  </div>
                  <div className="dropdown-divider" />
                  
                  <button
                    className="dropdown-action"
                    onClick={() => {
                      setShowUserMenu(false);
                      if (onOpenTutorial) onOpenTutorial();
                    }}
                  >
                    <HiOutlineAcademicCap /> Panduan Aplikasi
                  </button>

                  <div className="dropdown-divider" />

                  <button
                    className="dropdown-action logout"
                    onClick={async () => {
                      setShowUserMenu(false);
                      await signOut();
                    }}
                  >
                    <HiOutlineLogout /> Keluar
                  </button>
                </div>
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
          <span className="mobile-nav-label">Ringkasan</span>
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
            className="mobile-fab-btn"
            onClick={onOpenNewTx}
            title="Catat Transaksi Cepat"
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
          <span className="mobile-nav-label">Konsultan</span>
        </button>
      </nav>
    </>
  );
};

export default Navbar;
