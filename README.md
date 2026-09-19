# 📊 OmniLedger AI — Dual-Mode Financial Operating System (Bisnis & Mahasiswa)

> **Autonomous Financial Intelligence & Cashflow Scenario Simulator** modern dengan dukungan **Mode Perusahaan & Bisnis** (SME / Startup Financial OS) dan **Mode Mahasiswa & Anak Kost** (Student Survival & Budgeting OS). Dilengkapi kalkulator *Safe Daily Allowance*, simulasi daya tahan kas (*runway* / survival), pemindai struk/bon *Vision OCR*, dan konsultan AI cerdas.

---

## 🌟 Tentang OmniLedger AI

Baik perusahaan rintisan maupun mahasiswa yang merantau sama-sama menghadapi masalah pengelolaan uang: pencatatan struk yang tercecer, kebingungan memproyeksikan sisa uang, serta ketidaktahuan batas pengeluaran yang aman.

**OmniLedger AI** hadir dengan sistem **Dual-Mode Personalisasi** yang dapat dipilih setelah login:

1. 🏢 **Mode Perusahaan & Bisnis (Enterprise / SME OS):**
   - Mengelola arus kas operasional (*cashflow*), *monthly burn rate*, *runway 12-bulan*, dan *profit margin*.
   - Simulasi rekrutmen karyawan, belanja modal (*CAPEX*), dan injeksi dana investor.
   - Vision OCR untuk tagihan server AWS, iklan Google/Meta, dan vendor.
   - Autonomous AI CFO Advisor untuk efisiensi biaya usaha.

2. 🎓 **Mode Mahasiswa & Anak Kost (Student Survival OS):**
   - Menghitung **Batas Jajan Harian Aman (*Safe Daily Limit*)** agar uang saku kiriman tidak habis sebelum akhir bulan.
   - **Simulator Survival Tanggal Tua:** Uji dampak hemat makan warteg, masak nasi di kost, dan project freelance.
   - **Target Tabungan UKT / Wishlist Laptop:** Alokasi tabungan disiplin untuk registrasi semesteran.
   - Vision OCR untuk nota warteg, struk Indomaret, kwitansi sewa kost, dan fotokopi tugas.
   - AI Financial Mentor mahasiswa untuk life hacks hemat dan cuan sampingan.

---

## 🚀 Fitur Unggulan

### 1. 👥 Personalisasi Akun & Role Switcher
- **Popup Pemilihan Mode:** Setelah login, pengguna memilih mode profil yang paling relevan (*Perusahaan* atau *Mahasiswa*).
- **Role Switcher Seamless:** Beralih mode kapan saja secara instan melalui navigasi atas tanpa kehilangan data.
- **Isolasi Data Aman:** Data buku kas bisnis dan uang saku mahasiswa disimpan secara terpisah dan mandiri.

### 2. 📊 Dashboard Ringkasan & Skor Kesehatan
- **Mode Bisnis:** Memantau saldo kas kasir, pengeluaran bulanan, *Net Burn Rate*, margin profit, dan skor kesehatan kas (0–100).
- **Mode Mahasiswa:** Menampilkan **Sisa Uang Saku & Tabungan**, **Total Pengeluaran Bulan Ini**, **Batas Jajan Harian Aman (*Safe Daily*)**, dan **Ketahanan Dompet** (sisa hari bertahan).
- **Grafik Tren Arus Kas Dinamis:** Visualisasi perbandingan pemasukan vs pengeluaran serta saldo kas berjalan (*Recharts*).

### 3. 🎛️ Simulator Skenario "What-If" Runway & Survival
- **Parameter Interaktif:**
  - *Mode Bisnis:* Fluktuasi omset (-50% s/d +100%), efisiensi OPEX, rekrutmen tim, CAPEX cabang, dan modal investor.
  - *Mode Mahasiswa:* Kiriman ortu & freelance, biaya makan kost, target bayar UKT / laptop baru, dan bantuan beasiswa.
- **Grafik Proyeksi Kas 12 Bulan (Dual-Curve):** Menampilkan perbandingan garis kas *Baseline* vs *Skenario* serta garis peringatan kas kritis.
- **Preset Skenario Siap Pakai:**
  - Bisnis: *Mode Bertahan*, *Ekspansi Agresif*, *Uji Resesi (-30%)*, *Injeksi Modal*.
  - Mahasiswa: *Survival Tanggal Tua*, *Santai Awal Bulan*, *Target Nabung UKT*, *Mahasiswa Freelancer*.

### 4. 🧾 Smart OCR & Vision Receipt Scanner
- **Ekstraksi Otomatis:** Foto nota/bon belanja atau upload PDF, AI otomatis membaca nama toko/merchant, tanggal, rincian barang, pajak, dan total harga.
- **Dukungan Struk Bisnis & Bon Mahasiswa:** Dari invoice AWS dan meeting kafe, hingga nota makan warteg, struk Indomaret, kwitansi sewa kost, dan print makalah.
- **Pratinjau Struk Termal & Auto-Categorization:** Verifikasi data satu klik langsung masuk ke buku kas.

### 5. 💬 Autonomous AI Advisor (Virtual CFO & Student Mentor)
- **Mode Bisnis (Virtual CFO):** Analisis anomali biaya cloud, efisiensi CAC iklan, dan safety buffer rekrutmen tim.
- **Mode Mahasiswa (Financial Mentor):** Tips jajan hemat, trik masak nasi di kost, diskon Spotify Student/kuota, dan strategi bayar UKT tepat waktu.
- **Interactive Chat Assistant:** Tanya jawab keuangan secara cerdas terhubung langsung ke data mutasi kas.

### 6. 📖 Buku Kas Digital (Smart Financial Ledger)
- **Manajemen Transaksi:** Catat mutasi manual dan hasil scan struk dengan kategori lengkap bisnis maupun mahasiswa.
- **Pencarian & Filter Cepat:** Filter pemasukan, pengeluaran, kategori, dan nominal.
- **Export Data CSV:** Unduh laporan keuangan format spreadsheet dalam satu klik.

### 7. 🌗 Dual Theme & 📱 Mobile-First Experience
- **Dark Mode & Light Mode:** Tampilan modern glassmorphism dengan kontras tinggi.
- **Mobile Bottom Navigation:** Navigasi cepat satu jempol dengan floating action button (+) untuk mencatat mutasi secara instan.

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
