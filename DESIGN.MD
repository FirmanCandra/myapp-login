# Desain.md — Redesign Login Page FINORA

# 0. Diagnosis: Kenapa Terasa Monoton

Membandingkan halaman login saat ini dengan brand kit FINORA, ada gap yang jelas:

- **Gradient brand (indigo → cyan) cuma hidup di logo.** Sisa halaman all-white dengan aksen abu-abu — gradient yang jadi identitas visual paling kuat malah tidak dipakai di mana pun selain mark "F".
- **Split panel kiri-kanan tapi dua-duanya putih.** Tidak ada kontras, jadi terasa seperti satu kartu SaaS generik yang dibelah garis vertikal.
- **Badge "SMART • SIMPLE • FUTURE-READY"** pakai all-caps tracked label — ini pola default yang justru bikin desain AI-generated terasa template.
- **"...dengan cerdas dan terukur"** cuma mewarnai sebagian kalimat — trik aksen-satu-frasa yang sama, dipakai di hampir semua landing page generik.
- **Ikon fitur (kotak biru muda datar)** dan **checklist hijau** adalah pola default library UI, bukan sesuatu yang terasa dibuat khusus untuk FINORA.
- Brand kit kamu sebenarnya sudah punya modal kuat yang belum dipakai: lockup **light/dark/monokrom**, dan dua persona (**Bisnis vs Mahasiswa**) yang bisa jadi alat desain, bukan cuma teks pilihan mode.

Prinsip redesign: pakai gradient brand sebagai elemen hero (bukan dekorasi kecil), pakai dualitas light/dark dari brand kit sebagai device split-screen, dan biarkan dua persona (Bisnis/Mahasiswa) mewarnai interaksi, bukan cuma jadi radio button.

---

## 1. Token Warna

| Token | Hex | Fungsi |
|---|---|---|
| `--color-primary` (Indigo) | `#6366F1` | Warna brand utama, CTA, aksen mode **Bisnis** |
| `--color-secondary` (Cyan) | `#06B6D4` | Ujung gradient, aksen mode **Mahasiswa** |
| `--color-ink` (Navy) | `#0F172A` | Panel gelap, teks utama, dasar dark mode |
| `--color-cloud` (Light Gray) | `#E5E7EB` | Latar netral, border, divider tipis |
| `--color-surface` (White) | `#FFFFFF` | Kartu form, latar terang |
| `--color-glow` (Violet Deep) | `#4338CA` | Titik tengah gradient untuk kedalaman (turunan Indigo, dipakai di mesh background) |

Gradient utama: `linear-gradient(135deg, #6366F1 0%, #4338CA 45%, #06B6D4 100%)` — ini gradient yang sama dengan yang ada di logo, dipakai ulang di background, bukan cuma di mark.

---

## 2. Tipografi

Dua keluarga font, peran jelas beda:

- **Display / Headline — Space Grotesk.** Geometris, sedikit teknikal, cocok dengan kesan "Future-Ready" tanpa jatuh ke look generik startup-serif.
- **Body / UI — Plus Jakarta Sans.** Dibuat untuk identitas Jakarta — relevan langsung karena audiens FINORA (UMKM & mahasiswa Indonesia), dan sangat legible untuk angka finansial di dashboard nanti.

| Level | Font | Ukuran / Line-height | Weight |
|---|---|---|---|
| Hero H1 | Space Grotesk | 42px / 1.15 | 600 |
| H2 (section) | Space Grotesk | 24px / 1.25 | 600 |
| Body | Plus Jakarta Sans | 16px / 1.6 | 400 |
| Small / meta | Plus Jakarta Sans | 13px / 1.5 | 500 |

Hindari: all-caps untuk label apa pun (ganti badge "SMART • SIMPLE • FUTURE-READY" jadi sentence case atau tiga ikon kecil tanpa border pill), dan hindari mewarnai cuma sepotong kalimat di headline — kalau mau menonjolkan pesan, pakai posisi/ukuran, bukan warna parsial.

---

## 3. Konsep Layout

Split panel dipertahankan, tapi kontrasnya dibalik: **panel kiri jadi gelap (navy + gradient mesh)**, panel kanan tetap terang untuk form. Ini langsung memakai lockup dark logo yang sudah ada di brand kit, jadi bukan warna baru yang diciptakan asal.

```
Desktop (≥1024px)
┌──────────────────────────────┬───────────────────────────┐
│ [navy + gradient mesh]       │ [surface putih]            │
│                               │                             │
│  F  FINORA                   │  Masuk ke Dashboard         │
│     Your Financial           │  ┌──────────┬──────────┐    │
│     Intelligence             │  │ Bisnis   │ Mahasiswa│    │
│                               │  └──────────┴──────────┘    │
│  Kelola keuangan bisnis &    │  (underline gradient geser   │
│  kuliah dengan terukur       │   sesuai mode aktif)         │
│                               │                             │
│  ◆ Simulator Skenario        │  [ G  Lanjutkan dengan       │
│  ◆ Smart OCR Scanner         │       Google ]               │
│  ◆ AI Financial Advisor      │  ── atau ──                  │
│                               │  [ Masuk Langsung (Tamu) → ]│
│                               │                             │
│  ▁ terenkripsi · RLS ·       │  Tonton ulang video intro    │
│    Supabase Cloud ▁▁▁▁▁▁▁▁▁▁ │  Syarat & Kebijakan Privasi  │
└──────────────────────────────┴───────────────────────────┘

Mobile (<768px) — ditumpuk vertikal
┌───────────────────────────┐
│ [navy hero, tinggi ~40%]  │
│  F FINORA + tagline        │
│  3 fitur jadi ikon inline  │
├───────────────────────────┤
│ [surface putih]            │
│  toggle Bisnis/Mahasiswa   │
│  tombol Google, tombol tamu│
│  ribbon keamanan di bawah  │
└───────────────────────────┘
```

Alignment: kiri (left-aligned) untuk semua teks — konsisten dengan gaya form/dashboard finansial, bukan center-aligned yang kesannya lebih ke landing page marketing.

---

## 4. Detail Komponen

**Panel hero (kiri / atas):**
- Background navy `#0F172A` dengan mesh gradient indigo→cyan di sudut, opacity rendah (~25%), blur besar — bukan gradient solid penuh supaya teks tetap kontras tinggi.
- Logo pakai versi **light lockup** (F putih/gradient di atas navy), sesuai varian brand kit.
- Tiga fitur (Simulator, OCR, AI Advisor) pakai badge ikon bulat dengan gradient tipis (indigo→cyan) sebagai fill, bukan kotak biru muda flat.

**Toggle mode (Bisnis / Mahasiswa):**
- Segmented control dua opsi dengan indikator garis bawah yang bergeser (slide) saat berpindah mode.
- Saat "Bisnis" aktif → aksen indigo. Saat "Mahasiswa" aktif → aksen cyan. Ini bikin dua persona benar-benar terasa berbeda, bukan cuma label teks.

**Kartu form (kanan / bawah):**
- Surface putih dengan radius asimetris (misalnya besar di sudut kiri-atas & kanan-bawah saja) — echo bentuk mengalir dari huruf F di logo, sekaligus jadi pembeda dari kartu rounded-semua-sudut yang generik.
- Tombol Google: outline tipis `--color-cloud`, tanpa shadow berat.
- Tombol "Masuk Langsung (Tamu)": ghost/outline, bukan solid — biar hierarki jelas: Google = aksi utama, tamu = sekunder.

**Ribbon keamanan (bawah panel gelap):**
- "Data terenkripsi · Row-Level Security · Supabase Cloud" dipindah jadi strip tipis di dasar panel navy dengan ikon kecil monokrom, bukan teks abu-abu polos menggantung di bawah kartu putih.

---

## 5. Motion — Satu Momen Saja

Sesuai prinsip "jangan taburkan animasi di semua elemen":

- **Satu animasi saat halaman dimuat:** gradient mesh di panel hero melakukan satu kali sapuan halus (2–3 detik), lalu diam. Tidak ada fade-in bertahap per elemen.
- **Toggle mode:** transisi slide pada underline + transisi warna aksen (~200ms), ini animasi yang merespons aksi user, jadi boleh dan memang membantu.
- Hormati `prefers-reduced-motion`: matikan sapuan gradient, sisakan transisi toggle yang instan.

---

## 6. Dark Mode

Karena brand kit sudah punya lockup dark & monokrom, dark mode bukan tambahan — dasarnya sudah ada:

- Background utama → `--color-ink` (`#0F172A`)
- Kartu form → navy sedikit lebih terang (`#161F35`-an) dengan border tipis `--color-cloud` opacity rendah
- Teks body → `--color-cloud`, heading → putih
- Gradient tetap sama, cuma opacity mesh dinaikkan sedikit karena kontras dasar sudah gelap

---

## 7. Aksesibilitas & Quality Floor

- Kontras teks-di-atas-navy minimal rasio 4.5:1 (putih di atas `#0F172A` = aman).
- Focus state keyboard: outline 2px `--color-secondary` (cyan) di semua elemen interaktif — juga jadi ciri khas brand, bukan default browser abu-abu.
- Responsive turun sampai 320px lebar; panel hero mobile jangan lebih dari 40% tinggi viewport supaya form tetap terlihat tanpa scroll.

---

## 8. Ringkasan Prinsip

1. Gradient indigo→cyan jadi elemen hero di background, bukan dekorasi kecil di logo saja.
2. Dualitas light/dark dari brand kit dipakai sebagai device split-screen — bukan dua panel putih.
3. Dua persona (Bisnis/Mahasiswa) mewarnai aksen interaktif, bukan cuma teks pilihan.
4. Hapus pola generik: all-caps badge, aksen-satu-frasa di headline, kotak ikon flat, radius seragam di semua sudut.
5. Satu momen animasi saat load, sisanya animasi yang merespons aksi user saja.