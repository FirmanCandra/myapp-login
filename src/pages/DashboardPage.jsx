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
import { useAuth } from '../context/AuthContext';
import {
  getStoredTransactions,
  saveTransaction,
  deleteTransaction,
  getStartingCash,
  calculateFinancialMetrics,
} from '../services/financeService';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(NAV_TABS.OVERVIEW);
  const [transactions, setTransactions] = useState([]);
  const [startingCash] = useState(getStartingCash());
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Modals
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isNewTxOpen, setIsNewTxOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  // Load Transactions
  useEffect(() => {
    const loadData = async () => {
      setIsLoadingData(true);
      try {
        const data = await getStoredTransactions(user?.id);
        setTransactions(data);
      } catch (err) {
        console.error('Failed to load transactions:', err);
      } finally {
        setIsLoadingData(false);
      }
    };
    loadData();
  }, [user]);

  // First-Time User Onboarding Popup Trigger
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('omniledger_onboarding_completed');
    if (!hasSeenOnboarding) {
      const timer = setTimeout(() => {
        setIsTutorialOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  // Reactive Financial Metrics
  const metrics = useMemo(() => {
    return calculateFinancialMetrics(transactions, startingCash);
  }, [transactions, startingCash]);

  // Handlers
  const handleSaveTransaction = async (tx) => {
    try {
      const saved = await saveTransaction(tx, user?.id);
      setTransactions((prev) => [saved, ...prev]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const remaining = await deleteTransaction(id, user?.id);
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
      />

      {/* 2. Main Tab Viewport */}
      <main className="dashboard-main-viewport">
        <div className="main-content-limiter">
          {isLoadingData ? (
            <div className="dashboard-loading-state">
              <div className="spinner-hud" />
              <p>Menyiapkan Financial Engine & Data Kas...</p>
            </div>
          ) : (
            <>
              {activeTab === NAV_TABS.OVERVIEW && (
                <OverviewTab
                  metrics={metrics}
                  transactions={transactions}
                  startingCash={startingCash}
                  onNavigateTab={(tab) => {
                    if (tab === 'scanner') setIsScannerOpen(true);
                    else setActiveTab(tab);
                  }}
                  onOpenScanner={() => setIsScannerOpen(true)}
                  onOpenNewTx={() => setIsNewTxOpen(true)}
                />
              )}

              {activeTab === NAV_TABS.SIMULATOR && (
                <RunwaySimulatorTab metrics={metrics} />
              )}

              {activeTab === NAV_TABS.SCANNER && (
                <div className="scanner-tab-view">
                  <ReceiptScannerModal
                    isOpen={true}
                    onClose={() => setActiveTab(NAV_TABS.OVERVIEW)}
                    onSaveReceiptTransaction={handleSaveTransaction}
                  />
                </div>
              )}

              {activeTab === NAV_TABS.CFO && (
                <CfoAdvisorTab
                  metrics={metrics}
                  transactions={transactions}
                  onNavigateTab={(tab) => {
                    if (tab === 'scanner') setIsScannerOpen(true);
                    else setActiveTab(tab);
                  }}
                />
              )}

              {activeTab === NAV_TABS.LEDGER && (
                <LedgerTab
                  transactions={transactions}
                  onDeleteTx={handleDeleteTransaction}
                  onOpenNewTx={() => setIsNewTxOpen(true)}
                  onOpenScanner={() => setIsScannerOpen(true)}
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* Standalone Modals */}
      <ReceiptScannerModal
        isOpen={isScannerOpen && activeTab !== NAV_TABS.SCANNER}
        onClose={() => setIsScannerOpen(false)}
        onSaveReceiptTransaction={handleSaveTransaction}
      />

      <TransactionModal
        isOpen={isNewTxOpen}
        onClose={() => setIsNewTxOpen(false)}
        onSave={handleSaveTransaction}
      />

      {/* Interactive First-Time Tutorial Onboarding Modal */}
      <OnboardingModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        onNavigateTab={(tab) => {
          if (tab === 'scanner') setIsScannerOpen(true);
          else setActiveTab(tab);
        }}
      />
    </div>
  );
};

export default DashboardPage;
