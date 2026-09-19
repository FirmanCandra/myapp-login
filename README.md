# 📊 OmniLedger AI — Autonomous Financial Intelligence & Cashflow Scenario Simulator

> **Financial Operating System (OS)** modern untuk UMKM, Startup, Founder, dan Freelancer dalam mengendalikan arus kas (*cashflow*), memprediksi daya tahan bisnis (*runway*), memindai struk otomatis, dan menyimulasikan keputusan finansial secara *real-time*.

---

## 🌟 Tentang OmniLedger AI

Mengelola keuangan bisnis sering kali menjadi tantangan besar bagi pelaku UMKM dan founder: struk belanja menumpuk, sulit menghitung *burn rate*, tidak tahu berapa bulan bisnis bisa bertahan jika penjualan turun, dan kebingungan menentukan waktu yang aman untuk merekrut tim baru.

**OmniLedger AI** hadir sebagai platform *Financial Intelligence* terintegrasi yang menggabungkan:
1. **Pencatatan Keuangan Digital** yang cepat dan terstruktur.
2. **Pemindai Struk Otomatis (Vision/OCR Scanner)** untuk mengekstrak data belanja tanpa ketik manual.
3. **Simulator Skenario *What-If*** dinamis untuk menguji dampak keputusan bisnis sebelum dieksekusi.
4. **Konsultan Keuangan AI (Virtual CFO)** yang memberikan temuan inefisiensi biaya dan rekomendasi penghematan konkret.
5. **Dukungan Penuh Mode Gelap & Terang** dengan tampilan antarmuka *mobile-friendly* bergaya modern FinTech.

---

## 🚀 Fitur Unggulan

### 1. 📊 Executive Overview & Financial Health Score
- **Metrik Keuangan Kunci:** Memantau saldo kas terkini, rata-rata pengeluaran bulanan, surplus/defisit kas, profit margin, dan estimasi *runway*.
- **Indikator Kesehatan Finansial (Health Score Gauge 0–100):** Algoritma penilaian otomatis berdasarkan *runway buffer*, margin profitabilitas, dan rasio stabilitas kas.
- **Grafik Tren Arus Kas Dinamis:** Visualisasi perbandingan pemasukan vs pengeluaran serta akumulasi saldo kas bulanan menggunakan *Recharts*.
- **Distribusi Kategori Pengeluaran:** *Donut chart* interaktif untuk melacak pos biaya terbesar (Cloud, Payroll, Ads, Operasional).

### 2. 🎛️ Dynamic "What-If" Runway Simulator
- **Simulasi Parameter Interaktif:**
  - *Fluktuasi Pendapatan (Revenue Delta)*: Geser slider dari -50% (krisis) hingga +100% (skala besar).
  - *Penyesuaian Biaya Operasional (OPEX Delta)*: Uji pemangkasan biaya hemat vs ekspansi.
  - *Rencana Rekrut Tim (Hiring Planner)*: Tambah/kurang jumlah karyawan dengan pilihan standar gaji.
  - *Belanja Modal (One-Time CAPEX)*: Uji pembelian mesin, server, renovasi, atau cabang baru pada bulan tertentu.
  - *Injeksi Modal (Capital Injection)*: Simulasi suntikan modal investor atau pinjaman usaha.
- **Grafik Proyeksi Kas 12 Bulan (Dual-Curve):** Menampilkan perbandingan garis kas *Baseline* vs *Skenario Simulasi* dan garis batas kritis kas nol (*Cash Cliff*).
- **Preset Skenario Siap Pakai:** *Mode Bertahan (Survival)*, *Ekspansi Agresif*, *Uji Resesi (-30%)*, dan *Injeksi Modal*.

### 3. 🧾 Smart OCR & Vision Receipt Scanner
- **Ekstraksi Otomatis:** Foto struk belanja atau unggah invoice, sistem otomatis mengenali nama merchant, tanggal, rincian barang/jasa, pajak (PPN/PB1), dan total nominal.
- **Auto-Categorization:** Otomatis memasukkan transaksi ke pos kategori yang sesuai (Cloud Infrastructure, Office & Utilities, Marketing, dll).
- **Pratinjau Struk Termal:** Tampilan struk digital yang rapi dan verifikasi data satu klik ke buku kas.

### 4. 💬 Autonomous AI Financial Advisor (Virtual CFO)
- **Analisis Anomali & Rekomendasi Penghematan:** Mendeteksi pemborosan biaya server/cloud, optimasi budget iklan ROAS tinggi, dan buffer keselamatan rekrutmen.
- **Interactive Financial Chat:** Tanya jawab interaktif seputar strategi keuangan bisnis langsung dengan AI yang terhubung ke data buku kas.
- **Quick-Prompt Suggestions:** Rekomendasi pertanyaan cepat untuk memudahkan eksplorasi data finansial.

### 5. 📖 Buku Kas Digital (Smart Financial Ledger)
- **Manajemen Transaksi Lengkap:** Catat pemasukan dan pengeluaran manual maupun dari pemindaian struk.
- **Filter & Pencarian Instan:** Filter berdasarkan tipe (*Pemasukan / Pengeluaran*), kategori, rentang nominal, dan tanggal.
- **Export Data CSV:** Ekspor seluruh pembukuan ke format CSV dalam satu klik untuk pelaporan pajak atau akuntansi eksternal.

### 6. 🌗 Dual Theme & 📱 Mobile-First Design
- **Dark Mode & Light Mode:** Pilihan tema gelap yang elegan atau tema terang yang bersih dan profesional.
- **Navigasi Bawah Mobile (Docked Tab Bar):** Kemudahan navigasi satu jempol di smartphone dengan tombol cepat tambah transaksi (+).
- **Mobile Transaction Cards:** Tampilan kartu transaksi yang dioptimalkan khusus layar sentuh.

---

## 🛠️ Tech Stack & Arsitektur

| Komponen | Teknologi | Deskripsi |
|---|---|---|
| **Framework** | [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) | Arsitektur SPA cepat dengan Fast Refresh |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) | Client-side routing dengan protected routes |
| **Visualisasi Data** | [Recharts v3](https://recharts.org/) | Grafik Area Arus Kas, Garis Simulasi, & Donut Chart |
| **Icons & Micro-Interactions** | [React Icons](https://react-icons.github.io/react-icons/) & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | Ikon konsisten & efek animasi interaktif |
| **Styling** | Modern Vanilla CSS (CSS Variables) | Sistem desain adaptif (Dark/Light mode, Glassmorphism) tanpa framework CSS berat |
| **Database & Auth** | [Supabase](https://supabase.com/) (PostgreSQL + RLS) | Database realtime, Row-Level Security, Google OAuth & Demo Guest Login |

---

## 📂 Struktur Proyek

```plaintext
project/
├── index.html                 # Entry point HTML & Google Fonts
├── package.json               # Konfigurasi dependensi & npm scripts
├── vite.config.js             # Konfigurasi Vite bundler
├── src/
│   ├── main.jsx               # React DOM root render & ThemeProvider wrapper
│   ├── App.jsx                # Routing (Login & Protected Dashboard)
│   ├── index.css              # Global tokens, theme variables, & reset styles
│   ├── components/            # Komponen UI modular
│   │   ├── Navbar.jsx / .css          # Top bar & Mobile bottom navigation
│   │   ├── OverviewTab.jsx / .css     # Tab ringkasan metrik, grafik, & KPI
│   │   ├── RunwaySimulatorTab.jsx     # Tab simulator skenario keuangan
│   │   ├── RunwaySimulator.css        # Styling slider, stepper, & chart
│   │   ├── CfoAdvisorTab.jsx / .css   # Tab konsultan & chat AI CFO
│   │   ├── LedgerTab.jsx / .css       # Tab buku kas & kartu transaksi mobile
│   │   ├── ReceiptScannerModal.jsx    # Modal pemindai struk & verifikasi
│   │   ├── ReceiptScanner.css         # Styling modal & thermal receipt preview
│   │   ├── TransactionModal.jsx       # Modal pencatatan transaksi manual
│   │   ├── HealthScoreGauge.jsx/.css  # Komponen visual skor kesehatan kas
│   │   ├── LoadingSpinner.jsx/.css    # Komponen loading state
│   │   └── ProtectedRoute.jsx         # Guard autentikasi
│   ├── context/
│   │   ├── AuthContext.jsx            # Autentikasi Supabase & session state
│   │   └── ThemeContext.jsx           # State dark/light mode & localStorage
│   ├── services/
│   │   └── financeService.js          # Engine kalkulasi runway, metrik, & simulasi
│   ├── constants/
│   │   └── tabs.js                    # Enum navigasi tab
│   ├── lib/
│   │   ├── supabase.js                # Supabase client initializer
│   │   └── supabase_schema.sql        # Skrip migrasi tabel & RLS database
│   └── pages/
│       ├── LoginPage.jsx / .css       # Halaman login & guest demo entry
│       └── DashboardPage.jsx / .css   # Halaman utama aplikasi
```

---

## ⚡ Panduan Instalasi & Menjalankan Lokal

### 1. Prasyarat
- Pastikan telah terinstal [Node.js](https://nodejs.org/) (versi 18 ke atas) dan `npm` atau `pnpm`.

### 2. Clone Repository
```bash
git clone https://github.com/FirmanCandra/myapp-login.git
cd myapp-login
```

### 3. Install Dependensi
```bash
npm install
```

### 4. Konfigurasi Environment Variable (`.env`)
Buat file `.env` di direktori *root* proyek dan masukkan kredensial Supabase Anda:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```
> *Catatan:* Jika kredensial Supabase belum diisi, aplikasi tetap dapat dijalankan menggunakan **Mode Tamu (Guest Demo)** dengan simulasi data lokal.

### 5. Setup Database Supabase (Opsional jika menggunakan database sendiri)
Jalankan skrip SQL yang ada pada file `src/lib/supabase_schema.sql` di **SQL Editor** pada dashboard Supabase Anda untuk membuat tabel `profiles`, `transactions`, `scenarios`, serta kebijakan *Row-Level Security (RLS)*.

### 6. Jalankan Server Pengembangan (Dev Server)
```bash
npm run dev
```
Buka browser di **http://localhost:5173** untuk mulai menggunakan OmniLedger AI.

### 7. Build untuk Produksi
```bash
npm run build
```
File *bundle* produksi yang teroptimasi akan dihasilkan di folder `dist/`.

---

## 🔒 Keamanan & Privasi Data

- **Row-Level Security (RLS):** Setiap pengguna hanya memiliki akses baca/tulis terhadap data transaksi dan profil miliknya sendiri.
- **Client Data Isolation:** Mode Guest Demo tidak membocorkan data antar-sesi.
- **OAuth 2.0:** Menggunakan autentikasi standar industri dari Google OAuth via Supabase Auth.

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan pengembangan platform keuangan cerdas UMKM. Dilisensikan di bawah lisensi [MIT](LICENSE).
