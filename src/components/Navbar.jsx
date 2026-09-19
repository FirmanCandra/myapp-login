import { useState } from 'react';
import {
  HiOutlineViewGrid,
  HiOutlineCalculator,
  HiOutlineDocumentSearch,
  HiOutlineSparkles,
  HiOutlineBookOpen,
  HiOutlineLogout,
  HiOutlineShieldCheck,
  HiOutlineDatabase,
  HiOutlinePlus,
} from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { NAV_TABS } from '../constants/tabs';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab, healthScore, onOpenNewTx, onOpenScanner }) => {
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const metadata = user?.user_metadata || {};
  const fullName = metadata.full_name || metadata.name || 'Founder / CFO';
  const email = user?.email || 'admin@omniledger.ai';
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
    <header className="omniledger-navbar">
      <div className="nav-container">
        {/* Brand */}
        <div className="nav-brand-section">
          <div className="brand-logo-container">
            <div className="brand-logo-glow" />
            <div className="brand-logo-icon">
              <HiOutlineShieldCheck />
            </div>
          </div>
          <div className="brand-text">
            <div className="brand-title">
              OmniLedger <span className="ai-badge">AI</span>
            </div>
            <div className="brand-subtitle">Autonomous Financial OS</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-tabs-wrapper">
          <button
            className={`nav-tab-btn ${activeTab === NAV_TABS.OVERVIEW ? 'active' : ''}`}
            onClick={() => setActiveTab(NAV_TABS.OVERVIEW)}
            id="tab-overview"
          >
            <HiOutlineViewGrid className="tab-icon" />
            <span>Overview</span>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === NAV_TABS.SIMULATOR ? 'active' : ''}`}
            onClick={() => setActiveTab(NAV_TABS.SIMULATOR)}
            id="tab-simulator"
          >
            <HiOutlineCalculator className="tab-icon" />
            <span>What-If Simulator</span>
            <span className="tab-hot-badge">PRO</span>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === NAV_TABS.SCANNER ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(NAV_TABS.SCANNER);
              if (onOpenScanner) onOpenScanner();
            }}
            id="tab-scanner"
          >
            <HiOutlineDocumentSearch className="tab-icon" />
            <span>OCR Scanner</span>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === NAV_TABS.CFO ? 'active' : ''}`}
            onClick={() => setActiveTab(NAV_TABS.CFO)}
            id="tab-cfo"
          >
            <HiOutlineSparkles className="tab-icon" />
            <span>AI CFO Advisor</span>
            <span className="tab-pulse-dot" />
          </button>

          <button
            className={`nav-tab-btn ${activeTab === NAV_TABS.LEDGER ? 'active' : ''}`}
            onClick={() => setActiveTab(NAV_TABS.LEDGER)}
            id="tab-ledger"
          >
            <HiOutlineBookOpen className="tab-icon" />
            <span>Smart Ledger</span>
          </button>
        </nav>

        {/* Action & User Bar */}
        <div className="nav-actions-section">
          {/* Health Score Pill */}
          <div className={`glass-pill ${getScoreBadgeClass(healthScore)} score-pill`} title="Financial Health Score">
            <span className="pulse-indicator" />
            <span>Health: {healthScore}/100</span>
          </div>

          {/* Quick Add Button */}
          <button className="btn-quick-add" onClick={onOpenNewTx} title="Tambah Transaksi Baru">
            <HiOutlinePlus />
            <span>Catat Transaksi</span>
          </button>

          {/* User Profile */}
          <div className="user-profile-menu-container">
            <button
              className="user-profile-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="User profile menu"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt={fullName} className="user-avatar-img" referrerPolicy="no-referrer" />
              ) : (
                <div className="user-avatar-placeholder">{initials}</div>
              )}
            </button>

            {showUserMenu && (
              <div className="user-dropdown-glass glass-panel">
                <div className="dropdown-user-header">
                  <div className="dropdown-name">{fullName}</div>
                  <div className="dropdown-email">{email}</div>
                </div>

                <div className="dropdown-divider" />

                <div className="dropdown-info-row">
                  <HiOutlineDatabase className="dropdown-row-icon" />
                  <span>Supabase: Connected</span>
                </div>

                <div className="dropdown-divider" />

                <button
                  className="dropdown-logout-btn"
                  onClick={async () => {
                    setShowUserMenu(false);
                    await signOut();
                  }}
                >
                  <HiOutlineLogout />
                  <span>Sign Out</span>
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
