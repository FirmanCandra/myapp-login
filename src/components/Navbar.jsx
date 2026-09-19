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
} from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { NAV_TABS } from '../constants/tabs';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab, healthScore, onOpenNewTx, onOpenScanner }) => {
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

        {/* Tabs */}
        <nav className="nav-tabs">
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
          <div className={`glass-pill ${getScoreBadgeClass(healthScore)} score-pill`}>
            Skor: {healthScore}
          </div>

          <button className="btn-add-tx" onClick={onOpenNewTx}>
            <HiOutlinePlus />
            <span>Transaksi</span>
          </button>

          <button className="btn-theme-toggle" onClick={toggleTheme} title="Ganti tema">
            {theme === 'dark' ? <HiOutlineSun /> : <HiOutlineMoon />}
          </button>

          {/* Profile */}
          <div className="profile-wrap">
            <button className="profile-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
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
                <button className="dropdown-action logout" onClick={async () => { setShowUserMenu(false); await signOut(); }}>
                  <HiOutlineLogout /> Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
