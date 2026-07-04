# Gunando Dwi Kusuma — GDK Professional Portfolio

Website portofolio interaktif Gunando Dwi Kusuma dengan identitas online **Doragonnoid**. Redesign menggunakan pola sinematik dan scrollytelling yang terinspirasi oleh pengalaman web editorial imersif, tetapi seluruh struktur, kode, narasi, aset, dan identitas visual dibuat khusus untuk portofolio Gunando.

## Cara menjalankan

Ekstrak folder, lalu jalankan server lokal agar video, audio, formulir, dan perpindahan halaman bekerja konsisten.

```bash
python -m http.server 8000
```

Buka `http://localhost:8000` pada browser. `index.html` juga dapat dibuka langsung, tetapi beberapa browser membatasi media pada protokol `file://`.

## Halaman utama

- `index.html` — landing page interaktif berbasis chapter
- `about.html` — biography dan identitas Doragonnoid
- `experiences.html` — pengalaman, kompetensi, dan teknologi
- `projects.html` — indeks proyek
- `relaxplace-doragonnoid.html` — proyek Roblox
- `reflection.html` — aplikasi Android Reflection
- `simple-animation-blender.html` — proyek animasi Blender
- `backroom-end.html` — proyek VR dan IoT
- `contact.html` — kontak dan media sosial

Nama file lama tetap dipertahankan sebagai salinan kompatibilitas.

## Sistem UI/UX baru

- Landing page full-screen dengan alur **Origin → Identity → Capabilities → Projects → Transmission**
- Objek identitas dua sisi yang dapat diputar dengan drag
- Starfield canvas dan tekstur noise atmosferik
- HUD objek, nomor chapter, dan navigasi chapter aktif
- Video hero, audio ambient manual, dan instruksi interaksi
- Capability accordion
- Proyek full-screen bertumpuk dengan efek kedalaman pointer
- Active scroll tracking dan keyboard chapter navigation
- Full-screen menu dan contact modal
- Page transition di seluruh halaman
- Preloader, custom cursor, parallax, reveal, counter, dan scroll progress
- Responsive desktop, tablet, serta mobile
- Dukungan `prefers-reduced-motion` dan fallback tanpa JavaScript

## Formulir kontak

Formulir menggunakan FormSubmit dan diarahkan ke `gunandodwik@gmail.com`. Pada pengiriman pertama, lakukan aktivasi melalui email yang dikirim oleh FormSubmit. Formulir harus diuji dari website yang dijalankan melalui HTTP/HTTPS.

## Aset utama

- `assets/profile.jpg` — foto portrait
- `assets/profile-wide.jpg` — foto landscape
- `assets/model-01.png` dan `assets/model-02.png` — model virtual
- `assets/hero-video.mp4` — video hero
- `assets/ambient.mp3` — audio ambient

## Catatan desain

Website ini tidak menyalin aset, teks, maupun kode dari website referensi. Yang diadaptasi adalah prinsip interaksinya: presentasi berbasis chapter, atmosfer sinematik, tipografi editorial, data telemetry, objek interaktif, dan pengalaman scroll yang terarah.
