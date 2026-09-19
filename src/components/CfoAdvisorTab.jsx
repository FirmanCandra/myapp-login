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
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineRefresh,
  HiOutlineChatAlt2,
} from 'react-icons/hi';
import confetti from 'canvas-confetti';
import { askAiCfo, formatCurrency } from '../services/financeService';
import './CfoAdvisor.css';

const BUSINESS_QUICK_PROMPTS = [
  'Berapa lama bisnis bertahan kalau omset turun 20%?',
  'Kapan waktu paling aman untuk rekrut 2 developer baru?',
  'Bagaimana strategi memangkas biaya agar runway > 18 bulan?',
  'Analisis efisiensi pengeluaran Cloud AWS & AI Compute',
];

const STUDENT_QUICK_PROMPTS = [
  'Berapa batas jajan harian aman saya saat ini?',
  'Mau beli sepatu 300rb kira-kira aman ga?',
  'Tips bertahan di tanggal tua & makan hemat',
  'Pengeluaran terbesar saya apa?',
  'Bagaimana cara konsisten menabung bayar UKT?',
];

// Helper to format simple markdown (bold, lists, code) inside chat bubbles
const FormattedMessage = ({ text }) => {
  if (!text) return null;

  const lines = text.split('\n');

  return (
    <div className="bubble-formatted-content">
      {lines.map((line, idx) => {
        if (!line.trim()) {
          return <div key={idx} className="msg-empty-spacer" />;
        }

        // Render bullet point line
        const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
        const isNumbered = /^\d+\.\s/.test(line.trim());

        // Parse bold **text**
        const parts = line.split(/(\*\*.*?\*\*)/g);

        const renderedLine = parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={pIdx} className="msg-strong-highlight">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });

        if (isBullet || isNumbered) {
          return (
            <div key={idx} className="msg-list-item">
              <span className="msg-list-bullet">{isNumbered ? line.trim().match(/^\d+\./)[0] : '•'}</span>
              <span className="msg-list-text">
                {isNumbered
                  ? parts.map((part, pIdx) => {
                      const cleanPart = pIdx === 0 ? part.replace(/^\d+\.\s*/, '') : part;
                      if (cleanPart.startsWith('**') && cleanPart.endsWith('**')) {
                        return <strong key={pIdx} className="msg-strong-highlight">{cleanPart.slice(2, -2)}</strong>;
                      }
                      return cleanPart;
                    })
                  : parts.map((part, pIdx) => {
                      const cleanPart = pIdx === 0 ? part.replace(/^[•\-]\s*/, '') : part;
                      if (cleanPart.startsWith('**') && cleanPart.endsWith('**')) {
                        return <strong key={pIdx} className="msg-strong-highlight">{cleanPart.slice(2, -2)}</strong>;
                      }
                      return cleanPart;
                    })}
              </span>
            </div>
          );
        }

        return (
          <p key={idx} className="msg-paragraph">
            {renderedLine}
          </p>
        );
      })}
    </div>
  );
};

const CfoAdvisorTab = ({ metrics, transactions, role = 'business', onNavigateTab }) => {
  const isStudent = role === 'student';
  const quickPrompts = isStudent ? STUDENT_QUICK_PROMPTS : BUSINESS_QUICK_PROMPTS;

  const [mobileTab, setMobileTab] = useState('chat'); // 'chat' | 'cards'

  const buildInitialGreeting = () => ({
    id: `msg-init-${role}-${transactions.length}`,
    sender: 'cfo',
    text: isStudent
      ? transactions.length === 0
        ? `Halo sobat mahasiswa! 🎓 Buku kas dompetmu saat ini masih bersih (**0 mutasi**, Saldo: **Rp 0**).

💡 **Langkah awal:**
1. Mulai dengan mencatat kiriman uang saku dari orang tua atau hasil freelance (+ Pemasukan).
2. Scan struk/nota warteg atau catat jajan kopi harianmu (- Pengeluaran).
3. Setelah ada mutasi tercatat, aku akan otomatis menghitung **Batas Jajan Harian Aman** & **Skor Ketahanan Dompet** untukmu!

Ada yang mau kamu tanyakan tentang tips hemat anak kost atau cara menabung UKT?`
        : `Halo sobat mahasiswa! 🎓 Ini ringkasan kondisi dompet & uang sakumu berdasarkan **${transactions.length} mutasi** yang tercatat:

**Sisa Uang Saku & Tabungan:** ${formatCurrency(metrics.totalBalance)}
**Batas Jajan Harian Aman:** ${formatCurrency(metrics.safeDailyAllowance)}/hari
**Skor Ketahanan Dompet:** ${metrics.healthScore}/100
**Sisa Waktu Bulan Ini:** ${metrics.daysRemaining} hari lagi

Ada yang mau kamu tanyakan seputar jajan hemat, tips anak kost, atau strategi bayar UKT?`
      : transactions.length === 0
      ? `Halo! Buku kas bisnis kamu saat ini masih kosong (**0 transaksi**, Saldo Kas: **Rp 0**).

📊 **Langkah awal:**
1. Catat modal awal atau pendapatan client pertama (+ Pemasukan).
2. Scan invoice atau struk pengeluaran operasional (- Pengeluaran).
3. Setelah data masuk, aku akan otomatis mendiagnosis **Runway Bisnis**, **Efisiensi OPEX**, dan **Peluang Penghematan Biaya**.

Silakan tanyakan apa saja seputar strategi keuangan atau simulasi skenario bisnismu.`
      : `Halo! Ini ringkasan kondisi keuangan bisnis kamu berdasarkan **${transactions.length} transaksi** yang tercatat:

**Saldo kas:** ${formatCurrency(metrics.totalBalance)}
**Status arus kas:** ${metrics.profitMargin >= 0 ? 'Surplus (+)' : 'Pengeluaran lebih besar (-)'}
**Skor kesehatan:** ${metrics.healthScore}/100
**Potensi penghematan:** ~Rp 6.8 Juta/bulan

Silakan tanyakan apa saja soal keuangan bisnis kamu.`,
    time: 'Baru saja',
  });

  const [messages, setMessages] = useState(() => [buildInitialGreeting()]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [appliedSavings, setAppliedSavings] = useState([]);

  const chatEndRef = useRef(null);
  const msgCounterRef = useRef(10);

  // Re-initialize greeting when role or transactions count changes from 0
  useEffect(() => {
    setMessages([buildInitialGreeting()]);
  }, [role, transactions.length, metrics.totalBalance, metrics.safeDailyAllowance, metrics.healthScore, metrics.daysRemaining, metrics.profitMargin, isStudent]);

  useEffect(() => {
    if (mobileTab === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isThinking, mobileTab]);

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
      const reply = await askAiCfo(q, metrics, transactions, role);
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

  const handleResetChat = () => {
    setMessages([buildInitialGreeting()]);
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
            {isStudent ? <HiOutlineAcademicCap /> : <HiOutlineSparkles />}
          </div>
          <div>
            <div className="cfo-badge-row">
              <span className={`glass-pill ${isStudent ? 'pill-primary' : 'pill-purple'}`}>
                {isStudent ? 'AI Financial Mentor' : 'Konsultan Keuangan'}
              </span>
            </div>
            <h2>{isStudent ? 'Tips & Strategi Dompet Mahasiswa' : 'Analisis & Rekomendasi Keuangan'}</h2>
            <p>
              {isStudent
                ? 'Life hacks survival anak kost, batas jajan harian, dan strategi menabung UKT berdasarkan mutasi pengeluaranmu.'
                : 'Temuan inefisiensi pengeluaran, prediksi titik kritis kas, dan rekomendasi alokasi modal berdasarkan data pembukuan.'}
            </p>
          </div>
        </div>

        <div className="cfo-banner-stats">
          <div className="stat-pill-box">
            <span className="label">{isStudent ? 'Sisa Saldo Dompet' : 'Total Kas'}</span>
            <span className="val">{formatCurrency(metrics.totalBalance)}</span>
          </div>
          <div className="stat-pill-box">
            <span className="label">{isStudent ? 'Batas Jajan / Hari' : 'Potensi Hemat'}</span>
            <span className="val" style={{ color: '#34d399' }}>
              {isStudent ? `${formatCurrency(metrics.safeDailyAllowance)}/hari` : transactions.length > 0 ? '+Rp 6.8 Jt / bln' : 'Rp 0 / bln'}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Segmented Tab Switcher */}
      <div className="cfo-mobile-switcher">
        <button
          className={`cfo-switcher-btn ${mobileTab === 'chat' ? 'active' : ''}`}
          onClick={() => setMobileTab('chat')}
        >
          <HiOutlineChatAlt2 />
          <span>Tanya Mentor AI</span>
          <span className="active-dot-live" />
        </button>
        <button
          className={`cfo-switcher-btn ${mobileTab === 'cards' ? 'active' : ''}`}
          onClick={() => setMobileTab('cards')}
        >
          <HiOutlineLightBulb />
          <span>Rekomendasi & Tips</span>
          <span className="badge-count">3</span>
        </button>
      </div>

      {/* 2. Main Two Columns: Strategic Cards & AI Chat Assistant */}
      <div className={`cfo-main-grid view-${mobileTab}`}>
        {/* Left Column: Actionable Anomaly & Optimization Cards */}
        <div className={`cfo-cards-column ${mobileTab === 'cards' ? 'show-on-mobile' : 'hide-on-mobile'}`}>
          <div className="column-heading">
            <HiOutlineLightBulb className="icon-bulb" />
            <h3>{isStudent ? 'Rekomendasi & Life Hacks' : 'Rekomendasi & Temuan'}</h3>
          </div>

          {isStudent ? (
            <>
              {/* Student Card 1: Warteg & Masak Kost */}
              <div className="strategy-card glass-panel">
                <div className="strategy-top">
                  <div className="strat-icon cloud" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                    <HiOutlineCash />
                  </div>
                  <div className="strat-info">
                    <span className="strat-tag">Makan & Minum</span>
                    <h4>Hack Masak Nasi di Kost & Warteg</h4>
                  </div>
                  <span className="savings-pill">+Rp 450rb/bln</span>
                </div>
                <p className="strat-body">
                  Masak nasi sendiri di rice cooker kamar kost dan beli lauk di warteg dekat kampus bisa memangkas
                  biaya makan harian dari Rp 45.000 menjadi Rp 25.000 per hari (hemat hingga Rp 450rb/bulan!).
                </p>
                <div className="strat-footer">
                  <div className="impact-text">
                    <HiOutlineTrendingUp /> Menambah batas jajan +Rp 15.000/hari
                  </div>
                  <button
                    className={`btn-apply-strat ${appliedSavings.includes('s1') ? 'applied' : ''}`}
                    onClick={() => handleApplySavingCard('s1')}
                  >
                    {appliedSavings.includes('s1') ? (
                      <>
                        <HiOutlineCheckCircle /> Diterapkan
                      </>
                    ) : (
                      'Terapkan Lifehack'
                    )}
                  </button>
                </div>
              </div>

              {/* Student Card 2: Student Discount & Subscriptions */}
              <div className="strategy-card glass-panel">
                <div className="strategy-top">
                  <div className="strat-icon marketing" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                    <HiOutlineBookOpen />
                  </div>
                  <div className="strat-info">
                    <span className="strat-tag">Diskon Mahasiswa</span>
                    <h4>Gunakan Tarif Spotify Student & WiFi Kampus</h4>
                  </div>
                  <span className="savings-pill">+Rp 85rb/bln</span>
                </div>
                <p className="strat-body">
                  Verifikasi email kampus (.ac.id) untuk diskon 50% langganan Spotify Student, Apple Music, dan Notion Pro.
                  Manfaatkan WiFi perpustakaan kampus untuk download materi kuliah besar.
                </p>
                <div className="strat-footer">
                  <div className="impact-text">
                    <HiOutlineTrendingUp /> Efisiensi kuota data 40%
                  </div>
                  <button
                    className={`btn-apply-strat ${appliedSavings.includes('s2') ? 'applied' : ''}`}
                    onClick={() => handleApplySavingCard('s2')}
                  >
                    {appliedSavings.includes('s2') ? (
                      <>
                        <HiOutlineCheckCircle /> Diterapkan
                      </>
                    ) : (
                      'Terapkan Diskon'
                    )}
                  </button>
                </div>
              </div>

              {/* Student Card 3: Target Tabungan UKT */}
              <div className="strategy-card glass-panel">
                <div className="strategy-top">
                  <div className="strat-icon hiring" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}>
                    <HiOutlineAcademicCap />
                  </div>
                  <div className="strat-info">
                    <span className="strat-tag">Target Finansial</span>
                    <h4>Disiplin Nabung UKT Semester Depan</h4>
                  </div>
                  <span className="savings-pill neutral">Target Rp 3-5 Jt</span>
                </div>
                <p className="strat-body">
                  Sisihkan Rp 500rb per bulan dari kiriman ortu & hasil freelance ke rekening terpisah agar tidak terpakai
                  jajan kafe dan siap saat registrasi semester baru dibuka.
                </p>
                <div className="strat-footer">
                  <div className="impact-text">
                    <HiOutlineShieldCheck /> Bebas Cemas Saat Bayar UKT
                  </div>
                  <button className="btn-apply-strat" onClick={() => onNavigateTab('simulator')}>
                    <span>Simulasikan Tabungan</span>
                    <HiOutlineArrowRight />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Business Card 1: Cloud Optimization */}
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

              {/* Business Card 2: Marketing CAC Efficiency */}
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

              {/* Business Card 3: Hiring Runway Safety Check */}
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
            </>
          )}
        </div>

        {/* Right Column: Interactive AI CFO / Mentor Chat */}
        <div className={`cfo-chat-column glass-panel ${mobileTab === 'chat' ? 'show-on-mobile' : 'hide-on-mobile'}`}>
          <div className="chat-header-bar">
            <div className="chat-title-info">
              <div className="cfo-status-dot" />
              <div>
                <h4>{isStudent ? 'AI Financial Mentor' : 'Konsultan Keuangan'}</h4>
                <span>{isStudent ? 'Tersambung ke uang saku & pengeluaranmu' : 'Tersambung ke data pembukuan'}</span>
              </div>
            </div>
            <div className="chat-header-actions">
              <button className="btn-reset-chat" onClick={handleResetChat} title="Mulai Obrolan Baru">
                <HiOutlineRefresh />
                <span>Reset Chat</span>
              </button>
              <span className={`glass-pill ${isStudent ? 'pill-primary' : 'pill-purple'}`}>Online</span>
            </div>
          </div>

          {/* Chat Messages Viewport */}
          <div className="chat-messages-container">
            {messages.map((m) => {
              const isCfo = m.sender === 'cfo';
              return (
                <div key={m.id} className={`chat-message-row ${isCfo ? 'cfo' : 'user'}`}>
                  {isCfo && (
                    <div className="chat-avatar cfo-icon" style={{ background: isStudent ? 'rgba(56, 189, 248, 0.15)' : 'rgba(168, 85, 247, 0.15)', color: isStudent ? 'var(--color-primary)' : 'var(--color-purple)' }}>
                      {isStudent ? <HiOutlineAcademicCap /> : <HiOutlineSparkles />}
                    </div>
                  )}
                  <div className="chat-bubble">
                    <FormattedMessage text={m.text} />

                    {m.suggestedAction && (
                      <div className="bubble-action-row">
                        <button
                          className="btn-bubble-action"
                          onClick={() => {
                            if (m.suggestedAction.includes('Simulator') || m.suggestedAction.includes('Nabung') || m.suggestedAction.includes('Freelance') || m.suggestedAction.includes('Survival') || m.suggestedAction.includes('Hiring')) onNavigateTab('simulator');
                            else if (m.suggestedAction.includes('Struk') || m.suggestedAction.includes('Scan') || m.suggestedAction.includes('Bon'))
                              onNavigateTab('scanner');
                            else if (m.suggestedAction.includes('Catat'))
                              onNavigateTab('ledger');
                            else if (m.suggestedAction.includes('Buku Kas'))
                              onNavigateTab('ledger');
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
                  {isStudent ? <HiOutlineAcademicCap /> : <HiOutlineSparkles />}
                </div>
                <div className="chat-bubble thinking">
                  <div className="thinking-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="thinking-label">
                    {isStudent ? 'AI Mentor sedang menganalisis dompetmu...' : 'AI CFO sedang mengkalkulasi skenario...'}
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="quick-prompts-bar">
            {quickPrompts.map((prompt, idx) => (
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
              placeholder={isStudent ? 'Tanya jajan aman, tips hemat, beli barang...' : 'Tanyakan analisis keuangan, runway, efisiensi...'}
              className="chat-input"
            />
            <button
              className="btn-send-chat"
              disabled={!inputQuery.trim() || isThinking}
              onClick={() => handleSendMessage()}
              aria-label="Kirim pesan"
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
