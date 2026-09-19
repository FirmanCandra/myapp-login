import { useState, useRef, useEffect } from 'react';
import {
  HiOutlineSparkles,
  HiOutlinePaperAirplane,
  HiOutlineShieldCheck,
  HiOutlineLightBulb,
  HiOutlineTrendingUp,
  HiOutlineCash,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineServer,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import confetti from 'canvas-confetti';
import { askAiCfo, formatCurrency } from '../services/financeService';
import './CfoAdvisor.css';

const QUICK_PROMPTS = [
  'Berapa lama bisnis bertahan kalau omset turun 20%?',
  'Kapan waktu paling aman untuk rekrut 2 developer baru?',
  'Bagaimana strategi memangkas biaya agar runway > 18 bulan?',
  'Analisis efisiensi pengeluaran Cloud AWS & AI Compute',
];

const CfoAdvisorTab = ({ metrics, transactions, onNavigateTab }) => {
  const [messages, setMessages] = useState([
    {
      id: 'msg-init',
      sender: 'cfo',
      text: `Halo! Ini ringkasan kondisi keuangan kamu berdasarkan **${transactions.length} transaksi** yang tercatat.

**Saldo kas:** ${formatCurrency(metrics.totalBalance)}
**Status arus kas:** ${metrics.profitMargin >= 0 ? 'Surplus (+)' : 'Pengeluaran lebih besar (-)'}
**Skor kesehatan:** ${metrics.healthScore}/100
**Potensi penghematan:** ~Rp 6.8 Juta/bulan

Silakan tanyakan apa saja soal keuangan bisnis kamu.`,
      time: 'Baru saja',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [appliedSavings, setAppliedSavings] = useState([]);

  const chatEndRef = useRef(null);
  const msgCounterRef = useRef(10);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSendMessage = async (textToSend) => {
    const q = textToSend || inputQuery;
    if (!q.trim() || isThinking) return;

    msgCounterRef.current += 1;
    const userMsg = {
      id: `msg-${msgCounterRef.current}`,
      sender: 'user',
      text: q,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    try {
      const reply = await askAiCfo(q, metrics, transactions);
      msgCounterRef.current += 1;
      const cfoMsg = {
        id: `msg-${msgCounterRef.current}`,
        sender: 'cfo',
        text: reply.text,
        suggestedAction: reply.suggestedAction,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, cfoMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsThinking(false);
    }
  };

  const handleApplySavingCard = (cardId) => {
    setAppliedSavings((prev) => [...prev, cardId]);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <div className="cfo-tab-content">
      {/* 1. Top Executive Diagnostic Banner */}
      <div className="cfo-banner-card glass-panel">
        <div className="cfo-banner-left">
          <div className="cfo-avatar-pulse">
            <HiOutlineSparkles />
          </div>
          <div>
            <div className="cfo-badge-row">
              <span className="glass-pill pill-purple">Konsultan Keuangan</span>
            </div>
            <h2>Analisis & Rekomendasi Keuangan</h2>
            <p>
              Temuan inefisiensi pengeluaran, prediksi titik kritis kas, dan rekomendasi alokasi modal
              berdasarkan data pembukuan.
            </p>
          </div>
        </div>

        <div className="cfo-banner-stats">
          <div className="stat-pill-box">
            <span className="label">Total Kas</span>
            <span className="val">{formatCurrency(metrics.totalBalance)}</span>
          </div>
          <div className="stat-pill-box">
            <span className="label">Potensi Hemat</span>
            <span className="val" style={{ color: '#34d399' }}>
              +Rp 6.8 Jt / bln
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Two Columns: Strategic Cards & AI Chat Assistant */}
      <div className="cfo-main-grid">
        {/* Left Column: Actionable Anomaly & Optimization Cards */}
        <div className="cfo-cards-column">
          <div className="column-heading">
            <HiOutlineLightBulb className="icon-bulb" />
            <h3>Rekomendasi & Temuan</h3>
          </div>

          {/* Card 1: Cloud Optimization */}
          <div className="strategy-card glass-panel">
            <div className="strategy-top">
              <div className="strat-icon cloud">
                <HiOutlineServer />
              </div>
              <div className="strat-info">
                <span className="strat-tag">Cloud & AI Hosting</span>
                <h4>Optimasi AWS EC2 & GPU Instances</h4>
              </div>
              <span className="savings-pill">+Rp 3.5 Jt/bln</span>
            </div>
            <p className="strat-body">
              Pengeluaran server bulan ini sebesar Rp 14.2 Jt. Beralih ke 1-Year Reserved Instances dan mengaktifkan
              auto-sleep instance non-produksi di malam hari akan memangkas biaya hingga 25%.
            </p>
            <div className="strat-footer">
              <div className="impact-text">
                <HiOutlineTrendingUp /> Menambah runway +0.8 bulan
              </div>
              <button
                className={`btn-apply-strat ${appliedSavings.includes('c1') ? 'applied' : ''}`}
                onClick={() => handleApplySavingCard('c1')}
              >
                {appliedSavings.includes('c1') ? (
                  <>
                    <HiOutlineCheckCircle /> Dioptimasi
                  </>
                ) : (
                  'Terapkan Optimasi'
                )}
              </button>
            </div>
          </div>

          {/* Card 2: Marketing CAC Efficiency */}
          <div className="strategy-card glass-panel">
            <div className="strategy-top">
              <div className="strat-icon marketing">
                <HiOutlineCash />
              </div>
              <div className="strat-info">
                <span className="strat-tag">Customer Acquisition</span>
                <h4>Re-alokasi Budget Ads ke High-ROAS Channel</h4>
              </div>
              <span className="savings-pill">+Rp 2.1 Jt/bln</span>
            </div>
            <p className="strat-body">
              Iklan Google Search memiliki tingkat konversi 2.4x lebih tinggi dibanding Meta Ads untuk segmen B2B. Pindahkan
              40% budget ke Google Search Ads untuk menekan Customer Acquisition Cost (CAC).
            </p>
            <div className="strat-footer">
              <div className="impact-text">
                <HiOutlineTrendingUp /> Efisiensi CAC 32%
              </div>
              <button
                className={`btn-apply-strat ${appliedSavings.includes('c2') ? 'applied' : ''}`}
                onClick={() => handleApplySavingCard('c2')}
              >
                {appliedSavings.includes('c2') ? (
                  <>
                    <HiOutlineCheckCircle /> Dioptimasi
                  </>
                ) : (
                  'Terapkan Optimasi'
                )}
              </button>
            </div>
          </div>

          {/* Card 3: Hiring Runway Safety Check */}
          <div className="strategy-card glass-panel">
            <div className="strategy-top">
              <div className="strat-icon hiring">
                <HiOutlineUserGroup />
              </div>
              <div className="strat-info">
                <span className="strat-tag">Strategic Hiring</span>
                <h4>Uji Kapasitas Gaji Sebelum Rekrut Tim Baru</h4>
              </div>
              <span className="savings-pill neutral">Analisis Risiko</span>
            </div>
            <p className="strat-body">
              Setiap penambahan 1 Mid-level engineer (Rp 10 Jt/bln) membutuhkan jaminan kenaikan omset minimal Rp 15 Jt/bln
              untuk menjaga runway tetap stabil di atas 12 bulan.
            </p>
            <div className="strat-footer">
              <div className="impact-text">
                <HiOutlineShieldCheck /> Safety Buffer Analysis
              </div>
              <button className="btn-apply-strat" onClick={() => onNavigateTab('simulator')}>
                <span>Uji di Simulator</span>
                <HiOutlineArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive AI CFO Chat */}
        <div className="cfo-chat-column glass-panel">
          <div className="chat-header-bar">
            <div className="chat-title-info">
              <div className="cfo-status-dot" />
              <div>
                <h4>Konsultan Keuangan</h4>
                <span>Tersambung ke data pembukuan</span>
              </div>
            </div>
            <span className="glass-pill pill-purple">Aktif</span>
          </div>

          {/* Chat Messages Viewport */}
          <div className="chat-messages-container">
            {messages.map((m) => {
              const isCfo = m.sender === 'cfo';
              return (
                <div key={m.id} className={`chat-message-row ${isCfo ? 'cfo' : 'user'}`}>
                  {isCfo && (
                    <div className="chat-avatar cfo-icon">
                      <HiOutlineSparkles />
                    </div>
                  )}
                  <div className="chat-bubble">
                    <div className="bubble-text" style={{ whiteSpace: 'pre-line' }}>
                      {m.text}
                    </div>

                    {m.suggestedAction && (
                      <div className="bubble-action-row">
                        <button
                          className="btn-bubble-action"
                          onClick={() => {
                            if (m.suggestedAction.includes('Simulator')) onNavigateTab('simulator');
                            else if (m.suggestedAction.includes('Struk') || m.suggestedAction.includes('Scan'))
                              onNavigateTab('scanner');
                          }}
                        >
                          <HiOutlineArrowRight /> {m.suggestedAction}
                        </button>
                      </div>
                    )}

                    <span className="bubble-time">{m.time}</span>
                  </div>
                </div>
              );
            })}

            {isThinking && (
              <div className="chat-message-row cfo">
                <div className="chat-avatar cfo-icon">
                  <HiOutlineSparkles />
                </div>
                <div className="chat-bubble thinking">
                  <div className="thinking-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="thinking-label">AI CFO sedang mengkalkulasi skenario...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="quick-prompts-bar">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button key={idx} className="quick-prompt-chip" onClick={() => handleSendMessage(prompt)}>
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="chat-input-bar">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Tanyakan analisis keuangan, runway, atau strategi efisiensi..."
              className="chat-input"
            />
            <button
              className="btn-send-chat"
              disabled={!inputQuery.trim() || isThinking}
              onClick={() => handleSendMessage()}
            >
              <HiOutlinePaperAirplane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CfoAdvisorTab;
