import { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import { NAV_TABS } from '../constants/tabs';
import OverviewTab from '../components/OverviewTab';
import RunwaySimulatorTab from '../components/RunwaySimulatorTab';
import CfoAdvisorTab from '../components/CfoAdvisorTab';
import LedgerTab from '../components/LedgerTab';
import ReceiptScannerModal from '../components/ReceiptScannerModal';
import TransactionModal from '../components/TransactionModal';
import OnboardingModal from '../components/OnboardingModal';
import RoleSelectorModal from '../components/RoleSelectorModal';
import { useAuth } from '../context/AuthContext';
import {
  getStoredTransactions,
  saveTransaction,
  deleteTransaction,
  getStartingCash,
  calculateFinancialMetrics,
} from '../services/financeService';
import AdBanner from '../components/AdBanner';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(NAV_TABS.OVERVIEW);
  const [activeRole, setActiveRole] = useState(() => localStorage.getItem('omniledger_user_role') || 'business');
  const [transactions, setTransactions] = useState([]);
  const [startingCash, setStartingCashState] = useState(() => getStartingCash(localStorage.getItem('omniledger_user_role') || 'business'));
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Modals
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isNewTxOpen, setIsNewTxOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  // Check if role is unset on first visit
  useEffect(() => {
    const savedRole = localStorage.getItem('omniledger_user_role');
    if (!savedRole) {
      setIsRoleModalOpen(true);
    }
  }, []);

  // Load Transactions when User or Active Role changes
  useEffect(() => {
    const loadData = async () => {
      setIsLoadingData(true);
      try {
        const cash = getStartingCash(activeRole);
        setStartingCashState(cash);
        const data = await getStoredTransactions(user?.id, activeRole);
        setTransactions(data);
      } catch (err) {
        console.error('Failed to load transactions:', err);
      } finally {
        setIsLoadingData(false);
      }
    };
    loadData();
  }, [user, activeRole]);

  // First-Time User Onboarding Popup Trigger (if role is selected)
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('omniledger_onboarding_completed');
    const hasRole = localStorage.getItem('omniledger_user_role');
    if (!hasSeenOnboarding && hasRole) {
      const timer = setTimeout(() => {
        setIsTutorialOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [activeRole]);

  // Reactive Financial Metrics
  const metrics = useMemo(() => {
    return calculateFinancialMetrics(transactions, startingCash, activeRole);
  }, [transactions, startingCash, activeRole]);

  // Handle Role Selection / Switching
  const handleSelectRole = async (newRole) => {
    localStorage.setItem('omniledger_user_role', newRole);
    setActiveRole(newRole);
    setIsRoleModalOpen(false);
    
    // Check if onboarding was never completed, show tutorial for the new role
    const hasSeenOnboarding = localStorage.getItem('omniledger_onboarding_completed');
    if (!hasSeenOnboarding) {
      setTimeout(() => {
        setIsTutorialOpen(true);
      }, 500);
    }
  };

  // Handlers
  const handleSaveTransaction = async (tx) => {
    try {
      const saved = await saveTransaction(tx, user?.id, activeRole);
      setTransactions((prev) => [saved, ...prev]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const remaining = await deleteTransaction(id, user?.id, activeRole);
      setTransactions(remaining);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="dashboard-app-container">
      {/* 1. Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        healthScore={metrics.healthScore}
        onOpenNewTx={() => setIsNewTxOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        role={activeRole}
        onOpenRoleSelector={() => setIsRoleModalOpen(true)}
      />

      {/* Ad Banner — Adsterra 728x90 (below navbar) */}
      <AdBanner spacing="bottom" />

      {/* 2. Main Tab Viewport */}
      <main className="dashboard-main-viewport">
        <div className="main-content-limiter">
          {isLoadingData ? (
            <div className="dashboard-loading-state">
              <div className="spinner-hud" />
              <p>Menyiapkan Financial Engine & Data Kas {activeRole === 'student' ? 'Mahasiswa' : 'Bisnis'}...</p>
            </div>
          ) : (
            <>
              {activeTab === NAV_TABS.OVERVIEW && (
                <OverviewTab
                  metrics={metrics}
                  transactions={transactions}
                  startingCash={startingCash}
                  role={activeRole}
                  onNavigateTab={(tab) => {
                    if (tab === 'scanner') setIsScannerOpen(true);
                    else setActiveTab(tab);
                  }}
                  onOpenScanner={() => setIsScannerOpen(true)}
                  onOpenNewTx={() => setIsNewTxOpen(true)}
                />
              )}

              {activeTab === NAV_TABS.SIMULATOR && (
                <RunwaySimulatorTab metrics={metrics} role={activeRole} />
              )}

              {activeTab === NAV_TABS.SCANNER && (
                <div className="scanner-tab-view">
                  <ReceiptScannerModal
                    isOpen={true}
                    role={activeRole}
                    onClose={() => setActiveTab(NAV_TABS.OVERVIEW)}
                    onSaveReceiptTransaction={handleSaveTransaction}
                  />
                </div>
              )}

              {activeTab === NAV_TABS.CFO && (
                <CfoAdvisorTab
                  metrics={metrics}
                  transactions={transactions}
                  role={activeRole}
                  onNavigateTab={(tab) => {
                    if (tab === 'scanner') setIsScannerOpen(true);
                    else setActiveTab(tab);
                  }}
                />
              )}

              {activeTab === NAV_TABS.LEDGER && (
                <LedgerTab
                  transactions={transactions}
                  role={activeRole}
                  onDeleteTx={handleDeleteTransaction}
                  onOpenNewTx={() => setIsNewTxOpen(true)}
                  onOpenScanner={() => setIsScannerOpen(true)}
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* Ad Banner — Adsterra 728x90 (below content) */}
      <AdBanner compact spacing="top" />

      {/* Standalone Modals */}
      <ReceiptScannerModal
        isOpen={isScannerOpen && activeTab !== NAV_TABS.SCANNER}
        role={activeRole}
        onClose={() => setIsScannerOpen(false)}
        onSaveReceiptTransaction={handleSaveTransaction}
      />

      <TransactionModal
        isOpen={isNewTxOpen}
        role={activeRole}
        onClose={() => setIsNewTxOpen(false)}
        onSave={handleSaveTransaction}
      />

      {/* Interactive First-Time Tutorial Onboarding Modal */}
      <OnboardingModal
        isOpen={isTutorialOpen}
        role={activeRole}
        onClose={() => setIsTutorialOpen(false)}
        onNavigateTab={(tab) => {
          if (tab === 'scanner') setIsScannerOpen(true);
          else setActiveTab(tab);
        }}
      />

      {/* Role Switcher & Selector Modal */}
      <RoleSelectorModal
        isOpen={isRoleModalOpen}
        currentRole={activeRole}
        onSelectRole={handleSelectRole}
        onClose={() => setIsRoleModalOpen(false)}
        isClosable={!!localStorage.getItem('omniledger_user_role')}
      />
    </div>
  );
};

export default DashboardPage;
