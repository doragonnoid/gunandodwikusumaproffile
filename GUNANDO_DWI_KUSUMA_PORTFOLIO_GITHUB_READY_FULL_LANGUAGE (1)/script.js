(() => {
  'use strict';

  const body = document.body;
  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const LANGUAGE_KEY = 'gdk-language';
  let fallbackLanguage = 'id';
  const getSavedLanguage = () => {
    try { return localStorage.getItem(LANGUAGE_KEY) || fallbackLanguage; }
    catch { return fallbackLanguage; }
  };
  const saveLanguage = lang => {
    fallbackLanguage = lang;
    try { localStorage.setItem(LANGUAGE_KEY, lang); }
    catch { /* Local file previews can restrict storage; the page still toggles. */ }
  };
  const translationEntries = [
    ['Skip to main content', 'Lewati ke konten utama'],
    ['contact', 'kontak'],
    ['menu', 'menu'],
    ['close', 'tutup'],
    ['Home', 'Beranda'],
    ['Biography', 'Biografi'],
    ['Experiences', 'Pengalaman'],
    ['Projects', 'Proyek'],
    ['E-Certificates', 'E-Sertifikat'],
    ['Connect', 'Kontak'],
    ['Contact', 'Kontak'],
    ['Available for collaboration', 'Tersedia untuk kolaborasi'],
    ['available for collaboration · Jakarta, Indonesia', 'tersedia untuk kolaborasi · Jakarta, Indonesia'],
    ['Digital creator · developer', 'Kreator digital · developer'],
    ['Navigate portfolio', 'Navigasi portofolio'],
    ['A personal digital space where technology, character, and creative storytelling meet.', 'Ruang digital personal tempat teknologi, karakter, dan storytelling kreatif bertemu.'],
    ['Clear interfaces, interactive systems, and creative digital experiments.', 'Antarmuka yang jelas, sistem interaktif, dan eksperimen digital kreatif.'],
    ['A curated archive of certificates, participation records, and contribution proof.', 'Arsip rapi berisi sertifikat, catatan partisipasi, dan bukti kontribusi.'],
    ['A relaxing Roblox world shaped by exploration, vehicles, creatures, and playful systems.', 'Dunia Roblox santai yang dibentuk oleh eksplorasi, kendaraan, makhluk, dan sistem permainan.'],
    ['A structured reflection companion combining guided prompts, AI assistance, progress tracking, privacy, and inclusive interaction.', 'Pendamping refleksi terstruktur yang menggabungkan panduan, bantuan AI, pelacakan progres, privasi, dan interaksi inklusif.'],
    ['A compact 3D animation study focused on rig control, posing, timing, and a readable character gesture.', 'Studi animasi 3D ringkas yang berfokus pada kontrol rig, pose, timing, dan gestur karakter yang terbaca.'],
    ['A VR and IoT prototype that connects virtual interaction with real-world actuators and sensor feedback.', 'Prototipe VR dan IoT yang menghubungkan interaksi virtual dengan aktuator nyata dan umpan balik sensor.'],
    ['Informatics / IT Student · Web Developer · Digital Creator', 'Mahasiswa Informatika / IT · Web Developer · Kreator Digital'],
    ['View Projects', 'Lihat Proyek'],
    ['Contact Me', 'Hubungi Saya'],
    ['Download CV', 'Unduh CV'],
    ['ROLE', 'PERAN'],
    ['WEB DEVELOPER', 'WEB DEVELOPER'],
    ['FOCUS', 'FOKUS'],
    ['FIELD', 'BIDANG'],
    ['STATUS', 'STATUS'],
    ['OPEN TO PROJECTS', 'TERBUKA UNTUK PROYEK'],
    ['optional ambient audio', 'audio ambient opsional'],
    ['interactive visual object', 'objek visual interaktif'],
    ['start reading', 'mulai membaca'],
    ['PROFILE', 'PROFIL'],
    ['SKILLS', 'KEAHLIAN'],
    ['JOURNEY', 'PERJALANAN'],
    ['SECTION', 'BAGIAN'],
    ['A concise profile: education, role, creative identity, and the kind of digital work Gunando builds.', 'Profil ringkas: pendidikan, peran, identitas kreatif, dan jenis karya digital yang Gunando bangun.'],
    ['The person behind the work.', 'Sosok di balik karya.'],
    ['Gunando Dwi Kusuma is an Informatics / IT student, web developer, gamer, and independent digital creator. Doragonnoid is the online nickname used to connect technology, character, and storytelling.', 'Gunando Dwi Kusuma adalah mahasiswa Informatika / IT, web developer, gamer, dan kreator digital independen. Doragonnoid adalah nama online yang digunakan untuk menghubungkan teknologi, karakter, dan storytelling.'],
    ['The portfolio focuses on practical digital making: responsive websites, Roblox game environments, Android app concepts, Blender animation studies, and VR-IoT prototypes.', 'Portofolio ini berfokus pada karya digital praktis: website responsif, lingkungan game Roblox, konsep aplikasi Android, studi animasi Blender, dan prototipe VR-IoT.'],
    ['Primary field', 'Bidang utama'],
    ['Creative identity', 'Identitas kreatif'],
    ['Location', 'Lokasi'],
    ['Current status', 'Status saat ini'],
    ['Building & exploring', 'Membangun & mengeksplorasi'],
    ['open complete biography', 'buka biografi lengkap'],
    ['Curiosity becomes working projects.', 'Rasa ingin tahu menjadi proyek nyata.'],
    ['Gunando learns by building: interfaces, game spaces, 3D visuals, and connected prototypes that can be explained clearly.', 'Gunando belajar dengan membangun: antarmuka, ruang game, visual 3D, dan prototipe terhubung yang dapat dijelaskan dengan jelas.'],
    ['Clear profile. Visible work.', 'Profil jelas. Karya terlihat.'],
    ['Started from games and digital curiosity.', 'Berawal dari game dan rasa ingin tahu digital.'],
    ['Identity becomes an interface.', 'Identitas menjadi sebuah antarmuka.'],
    ['Projects become evidence.', 'Proyek menjadi bukti.'],
    ['Skills are grouped by output, with tools and project evidence shown directly instead of vague claims.', 'Keahlian dikelompokkan berdasarkan output, dengan alat dan bukti proyek yang ditampilkan langsung, bukan klaim umum.'],
    ['One profile.', 'Satu profil.'],
    ['Multiple outputs.', 'Banyak output.'],
    ['Web Development', 'Pengembangan Web'],
    ['Game & VR Systems', 'Sistem Game & VR'],
    ['IoT Integration', 'Integrasi IoT'],
    ['3D & Content', '3D & Konten'],
    ['view technical skills ↗', 'lihat keahlian teknis ↗'],
    ['explore game projects ↗', 'jelajahi proyek game ↗'],
    ['open VR–IoT case ↗', 'buka studi VR–IoT ↗'],
    ['view animation project ↗', 'lihat proyek animasi ↗'],
    ['Selected work', 'Karya pilihan'],
    ['Selected work with concrete evidence.', 'Karya pilihan dengan bukti konkret.'],
    ['inspect project', 'lihat proyek'],
    ['open complete project archive', 'buka arsip proyek lengkap'],
    ['Build clearly.', 'Bangun dengan jelas.'],
    ['Present professionally.', 'Tampilkan secara profesional.'],
    ['contact now', 'kontak sekarang'],
    ['stay curious.', 'tetap penasaran.'],
    ['Built as a professional portfolio for projects, collaboration, and creative technology work.', 'Dibangun sebagai portofolio profesional untuk proyek, kolaborasi, dan karya teknologi kreatif.'],
    ['A practical profile shaped by web development, interactive projects, game worlds, and creative technology.', 'Profil praktis yang dibentuk oleh pengembangan web, proyek interaktif, dunia game, dan teknologi kreatif.'],
    ['Informatics / IT student, web developer, gamer, and digital creator.', 'Mahasiswa Informatika / IT, web developer, gamer, dan kreator digital.'],
    ['personal profile', 'profil personal'],
    ['formal profile', 'profil formal'],
    ['Professional first.', 'Profesional lebih dulu.'],
    ['Creative always.', 'Tetap kreatif.'],
    ['The portfolio balances a formal real-world profile with a creative online identity.', 'Portofolio ini menyeimbangkan profil formal dunia nyata dengan identitas online kreatif.'],
    ['journey', 'perjalanan'],
    ['A timeline of growth.', 'Linimasa perkembangan.'],
    ['Born in Jakarta', 'Lahir di Jakarta'],
    ['Doragonnoid begins', 'Doragonnoid dimulai'],
    ['Virtual character development', 'Pengembangan karakter virtual'],
    ['Technology meets content', 'Teknologi bertemu konten'],
    ['the virtual persona', 'persona virtual'],
    ['Doragonnoid as a supporting creative identity.', 'Doragonnoid sebagai identitas kreatif pendukung.'],
    ['character archive', 'arsip karakter'],
    ['Main Character Model', 'Model Karakter Utama'],
    ['Alternative Expression', 'Ekspresi Alternatif'],
    ['continue exploring', 'lanjut eksplorasi'],
    ['See how the identity becomes an experience.', 'Lihat bagaimana identitas menjadi sebuah pengalaman.'],
    ['view', 'lihat'],
    ['work', 'karya'],
    ['projects · capabilities · experiments', 'proyek · kemampuan · eksperimen'],
    ["A focused overview of Gunando's projects, tools, and creative technology practice.", 'Ringkasan fokus tentang proyek, tools, dan praktik teknologi kreatif Gunando.'],
    ['creative direction', 'arah kreatif'],
    ['Practical work with clear presentation.', 'Karya praktis dengan presentasi yang jelas.'],
    ['featured experiences', 'pengalaman unggulan'],
    ['Six practical focus areas.', 'Enam area fokus praktis.'],
    ['Drag, scroll, or use the arrows to explore.', 'Geser, scroll, atau gunakan panah untuk menjelajah.'],
    ['Virtual Identity', 'Identitas Virtual'],
    ['Personal Branding', 'Personal Branding'],
    ['Interactive Web', 'Web Interaktif'],
    ['Content & Community', 'Konten & Komunitas'],
    ['3D Character Animation', 'Animasi Karakter 3D'],
    ['VR & IoT Integration', 'Integrasi VR & IoT'],
    ['featured game project', 'proyek game unggulan'],
    ['featured animation project', 'proyek animasi unggulan'],
    ['featured vr & iot project', 'proyek VR & IoT unggulan'],
    ['skills & tools', 'keahlian & tools'],
    ['A foundation built for growth.', 'Fondasi yang dibangun untuk berkembang.'],
    ['Front-end Development', 'Pengembangan Front-end'],
    ['Responsive Interface', 'Antarmuka Responsif'],
    ['Motion & Interaction', 'Gerak & Interaksi'],
    ['Creative Content', 'Konten Kreatif'],
    ['Your browser does not support video.', 'Browser Anda tidak mendukung video.'],
    ['media archive', 'arsip media'],
    ['included website features', 'fitur website yang disertakan'],
    ['Built to be usable and maintainable.', 'Dibangun agar mudah digunakan dan dirawat.'],
    ['Navigation', 'Navigasi'],
    ['Media handling', 'Pengelolaan media'],
    ['Motion control', 'Kontrol gerak'],
    ['Project browsing', 'Penjelajahan proyek'],
    ['Contact flow', 'Alur kontak'],
    ['Responsive layout', 'Layout responsif'],
    ['next step', 'langkah berikutnya'],
    ['Have a project in mind?', 'Punya ide proyek?'],
    ['start a', 'mulai'],
    ['project', 'proyek'],
    ['contact · collaboration', 'kontak · kolaborasi'],
    ['Reach Gunando for website work, interactive prototypes, game or VR experiments, content, and creative technology collaboration.', 'Hubungi Gunando untuk pekerjaan website, prototipe interaktif, eksperimen game atau VR, konten, dan kolaborasi teknologi kreatif.'],
    ['online presence', 'kehadiran online'],
    ['Find Gunando and Doragonnoid online.', 'Temukan Gunando dan Doragonnoid secara online.'],
    ['video & gaming', 'video & game'],
    ['visit ↗', 'kunjungi ↗'],
    ['visual updates', 'update visual'],
    ['short-form content', 'konten pendek'],
    ['professional profile', 'profil profesional'],
    ['social updates', 'update sosial'],
    ['community', 'komunitas'],
    ['join ↗', 'gabung ↗'],
    ['creator support', 'dukungan kreator'],
    ['support ↗', 'dukung ↗'],
    ['collaboration', 'kolaborasi'],
    ['Good projects begin with a clear conversation.', 'Proyek yang baik dimulai dari percakapan yang jelas.'],
    ['before sending a brief', 'sebelum mengirim brief'],
    ['Include the essentials.', 'Sertakan hal-hal penting.'],
    ['Objective', 'Tujuan'],
    ['Audience', 'Audiens'],
    ['Scope', 'Cakupan'],
    ['Timeline', 'Timeline'],
    ['ready when you are', 'siap kapan pun kamu siap'],
    ['Let’s make the next idea real.', 'Mari wujudkan ide berikutnya.'],
    ['send', 'kirim'],
    ['message', 'pesan'],
    ['Achievement Archive · E-Certificates', 'Arsip Prestasi · E-Sertifikat'],
    ['A clean archive of participation, appreciation, recognition, and organization certificates collected across university events and creative technology activities.', 'Arsip rapi berisi sertifikat partisipasi, apresiasi, penghargaan, dan organisasi dari kegiatan kampus serta aktivitas teknologi kreatif.'],
    ['certificate collection', 'koleksi sertifikat'],
    ['Proof of participation and contribution.', 'Bukti partisipasi dan kontribusi.'],
    ['Each certificate is presented as a clear visual record. Open any item to inspect the full-size image.', 'Setiap sertifikat ditampilkan sebagai catatan visual yang jelas. Buka item apa pun untuk melihat gambar ukuran penuh.'],
    ['Total certificates', 'Total sertifikat'],
    ['Activity period', 'Periode kegiatan'],
    ['Campus ecosystem', 'Ekosistem kampus'],
    ['Member of Guard, President University Vocal Victory.', 'Anggota Guard, President University Vocal Victory.'],
    ['Guard contribution in Computer Science gathering activity.', 'Kontribusi sebagai Guard dalam kegiatan Computer Science.'],
    ['Participant of campus seminar in collaboration with President Development Center and President University Executive Education.', 'Peserta seminar kampus hasil kolaborasi President Development Center dan President University Executive Education.'],
    ['Completed NEXCO PUNICO event as member of Event Organizer.', 'Menyelesaikan kegiatan NEXCO PUNICO sebagai anggota Event Organizer.'],
    ['Participation in Event Hello World by President University Developer Club.', 'Partisipasi dalam Event Hello World oleh President University Developer Club.'],
    ['Participant in Bilateral Relations Between Indonesia and Ukraine.', 'Peserta kegiatan Bilateral Relations Between Indonesia and Ukraine.'],
    ['Public Relation Internal division member in PURD Goes to School activity.', 'Anggota divisi Public Relation Internal dalam kegiatan PURD Goes to School.'],
    ['proof archive.', 'arsip bukti.'],
    ['Roblox Game', 'Game Roblox'],
    ['Android Application', 'Aplikasi Android'],
    ['3D Animation', 'Animasi 3D'],
    ['VR & IoT Experience', 'Pengalaman VR & IoT'],
    ['Role:', 'Peran:'],
    ['Tools:', 'Tools:'],
    ['Focus:', 'Fokus:'],
    ['Process:', 'Proses:'],
    ['System:', 'Sistem:'],
    ['Built as a professional project archive.', 'Dibangun sebagai arsip proyek profesional.'],
    ['project overview', 'ringkasan proyek'],
    ['main features', 'fitur utama'],
    ['development gallery', 'galeri pengembangan'],
    ['project status', 'status proyek'],
    ['project collaboration', 'kolaborasi proyek'],
    ['application collaboration', 'kolaborasi aplikasi'],
    ['3d creative collaboration', 'kolaborasi kreatif 3D'],
    ['xr and iot collaboration', 'kolaborasi XR dan IoT'],
    ['Interested in this game project?', 'Tertarik dengan proyek game ini?'],
    ['Interested in this application project?', 'Tertarik dengan proyek aplikasi ini?'],
    ['Interested in a 3D animation project?', 'Tertarik dengan proyek animasi 3D?'],
    ['Interested in an immersive connected system?', 'Tertarik dengan sistem imersif yang terhubung?'],
    ['conversation', 'percakapan'],
    ['Message Sent — Gunando Dwi Kusuma', 'Pesan Terkirim — Gunando Dwi Kusuma'],
    ['message confirmation', 'konfirmasi pesan'],
    ['message delivered', 'pesan terkirim'],
    ['Thank', 'Terima'],
    ['you.', 'kasih.'],
    ['back to', 'kembali ke'],
    ['home', 'beranda'],
    ['Thank you for reaching out.', 'Terima kasih sudah menghubungi.'],
    ['Name', 'Nama'],
    ['Email', 'Email'],
    ['Subject', 'Subjek'],
    ['Message', 'Pesan'],
    ['Website, collaboration, or content', 'Website, kolaborasi, atau konten'],
    ['The message will be sent directly to gunandodwik@gmail.com.', 'Pesan akan dikirim langsung ke gunandodwik@gmail.com.'],
    ['send message', 'kirim pesan']
  ];
  translationEntries.push(
    ['Gunando Dwi Kusuma — Interactive Digital Portfolio', 'Gunando Dwi Kusuma — Portofolio Digital Interaktif'],
    ['Biography — Gunando Dwi Kusuma', 'Biografi — Gunando Dwi Kusuma'],
    ['Experiences — Gunando Dwi Kusuma', 'Pengalaman — Gunando Dwi Kusuma'],
    ['Projects — Gunando Dwi Kusuma', 'Proyek — Gunando Dwi Kusuma'],
    ['E-Certificates — Gunando Dwi Kusuma', 'E-Sertifikat — Gunando Dwi Kusuma'],
    ['Connect — Gunando Dwi Kusuma', 'Kontak — Gunando Dwi Kusuma'],
    ['Relaxplace Doragonnoid — Detail Project', 'Relaxplace Doragonnoid — Detail Proyek'],
    ['Reflection — Detail Project', 'Reflection — Detail Proyek'],
    ['Simple Animation Blender — Detail Project', 'Simple Animation Blender — Detail Proyek'],
    ['Backroom End — Detail Project', 'Backroom End — Detail Proyek'],
    ['CV — Gunando Dwi Kusuma', 'CV — Gunando Dwi Kusuma'],
    ['Gunando Dwi Kusuma home', 'Beranda Gunando Dwi Kusuma'],
    ['Main menu', 'Menu utama'],
    ['Previous image', 'Gambar sebelumnya'],
    ['Next image', 'Gambar berikutnya'],
    ['projects', 'proyek'],
    ['home', 'beranda'],
    ['connect', 'kontak'],
    ['me', 'saya'],
    ['Now', 'Sekarang'],
    ['NOW', 'SEKARANG'],
    ['Origin', 'Asal'],
    ['Identity', 'Identitas'],
    ['Trajectory', 'Perjalanan'],
    ['Capabilities', 'Kapabilitas'],
    ['Profile', 'Profil'],
    ['Portfolio', 'Portofolio'],
    ['PORTFOLIO', 'PORTOFOLIO'],
    ['GDK / PORTFOLIO', 'GDK / PORTOFOLIO'],
    ['GDK PORTFOLIO', 'PORTOFOLIO GDK'],
    ['Portfolio 000', 'Portofolio 000'],
    ['STATUS / AVAILABLE', 'STATUS / TERSEDIA'],
    ['CONTACT RECORD', 'CATATAN KONTAK'],
    ['PORTFOLIO PROFILE', 'PROFIL PORTOFOLIO'],
    ['PROFILE SUMMARY', 'RINGKASAN PROFIL'],
    ['FEATURED PROJECTS', 'PROYEK UNGGULAN'],
    ['featured projects', 'proyek unggulan'],
    ['working philosophy', 'filosofi kerja'],
    ['READY TO TALK?', 'SIAP BERDISKUSI?'],
    ['PORTFOLIO READY', 'PORTOFOLIO SIAP'],
    ['PERSONAL PORTFOLIO', 'PORTOFOLIO PERSONAL'],
    ['WEB · GAME · VR · IOT · 3D', 'WEB · GAME · VR · IOT · 3D'],
    ['PROJECTS / CONTACT / CV', 'PROYEK / KONTAK / CV'],
    ['CODE / GAME / IOT', 'KODE / GAME / IOT'],
    ['INFORMATICS / IT', 'INFORMATIKA / IT'],
    ['SECTION 01', 'BAGIAN 01'],
    ['SECTION 02', 'BAGIAN 02'],
    ['SECTION 03', 'BAGIAN 03'],
    ['SECTION 04', 'BAGIAN 04'],
    ['SECTION 05', 'BAGIAN 05'],
    ['SECTION 06', 'BAGIAN 06'],
    ['origin / real-world profile', 'asal / profil dunia nyata'],
    ['learning path / practice', 'jalur belajar / praktik'],
    ['creative disciplines', 'disiplin kreatif'],
    ['curiosity mode', 'mode rasa ingin tahu'],
    ['Online alias: Doragonnoid', 'Alias online: Doragonnoid'],
    ['Based in Jakarta, focused on web interfaces, interactive systems, creative content, and technology projects with clear user flows.', 'Berbasis di Jakarta, berfokus pada antarmuka web, sistem interaktif, konten kreatif, dan proyek teknologi dengan alur pengguna yang jelas.'],
    ['Informatics / IT student, web developer, and digital creator building interfaces, game worlds, VR systems, IoT prototypes, and 3D content.', 'Mahasiswa Informatika / IT, web developer, dan kreator digital yang membangun antarmuka, dunia game, sistem VR, prototipe IoT, dan konten 3D.'],
    ['A cleaner timeline of how the portfolio moved from gaming identity into web, game, VR, IoT, and 3D work.', 'Linimasa yang lebih rapi tentang bagaimana portofolio berkembang dari identitas gaming ke karya web, game, VR, IoT, dan 3D.'],
    ['The portfolio combines HTML/CSS/JavaScript interfaces, Roblox game design, Android app concepts, Blender animation, Unity XR, and IoT components.', 'Portofolio ini menggabungkan antarmuka HTML/CSS/JavaScript, desain game Roblox, konsep aplikasi Android, animasi Blender, Unity XR, dan komponen IoT.'],
    ['Four projects with clearer role, tools, features, and result summaries.', 'Empat proyek dengan ringkasan peran, tools, fitur, dan hasil yang lebih jelas.'],
    ['with concrete evidence.', 'dengan bukti konkret.'],
    ['A stable identity for recruiters, collaborators, and viewers: Gunando first, Doragonnoid as the online creative persona.', 'Identitas yang stabil untuk rekruter, kolaborator, dan pengunjung: Gunando sebagai identitas utama, Doragonnoid sebagai persona kreatif online.'],
    ['"Good digital work should be clear enough to use, strong enough to remember, and honest about the process behind it."', '"Karya digital yang baik harus cukup jelas untuk digunakan, cukup kuat untuk diingat, dan jujur terhadap proses di baliknya."'],
    ['The goal is to combine usable interfaces, technical curiosity, and a memorable visual identity without losing clarity.', 'Tujuannya adalah menggabungkan antarmuka yang mudah digunakan, rasa ingin tahu teknis, dan identitas visual yang mudah diingat tanpa kehilangan kejelasan.'],
    ['I am open to website projects, interactive prototypes, game and VR experiments, digital content, and collaborations that connect technology with creative storytelling.', 'Saya terbuka untuk proyek website, prototipe interaktif, eksperimen game dan VR, konten digital, serta kolaborasi yang menghubungkan teknologi dengan storytelling kreatif.'],
    ['Send a clear project brief.', 'Kirim brief proyek yang jelas.'],
    ['Informatics / IT becomes the base coordinate: logic, process, data, and how people actually use digital products.', 'Informatika / IT menjadi koordinat dasar: logika, proses, data, dan bagaimana orang benar-benar menggunakan produk digital.'],
    ['Online character, content, and visual language turn technical work into something easier to remember.', 'Karakter online, konten, dan bahasa visual membuat karya teknis menjadi lebih mudah diingat.'],
    ['Web, Roblox, Blender, VR, and IoT projects show the same habit: make, test, refine, and tell the story clearly.', 'Proyek web, Roblox, Blender, VR, dan IoT menunjukkan kebiasaan yang sama: membuat, menguji, menyempurnakan, dan menceritakan prosesnya dengan jelas.'],
    ['HTML, CSS, JavaScript, responsive layout, semantic structure, interaction polish, and clear navigation for portfolio and landing-page style websites.', 'HTML, CSS, JavaScript, layout responsif, struktur semantik, penyempurnaan interaksi, dan navigasi jelas untuk website portofolio serta landing page.'],
    ['Interface · Front-end · Interaction', 'Antarmuka · Front-end · Interaksi'],
    ['Roblox · Unity · XR', 'Roblox · Unity · XR'],
    ['Sensor · Controller · Real-time data', 'Sensor · Controller · Data real-time'],
    ['Blender · Video · Virtual identity', 'Blender · Video · Identitas virtual'],
    ['open-world relaxation, vehicles, creature collection, inventory, selling, and simple economy loop.', 'relaksasi open-world, kendaraan, koleksi makhluk, inventory, penjualan, dan loop ekonomi sederhana.'],
    ['game creator.', 'pembuat game.'],
    ['app concept and UI designer.', 'perancang konsep aplikasi dan UI.'],
    ['animator and editor.', 'animator dan editor.'],
    ['prototype builder.', 'pembangun prototipe.'],
    ['accessible self-reflection flow with guided forms, AI support, progress, privacy, and inclusive settings.', 'alur refleksi diri yang aksesibel dengan formulir terpandu, dukungan AI, progres, privasi, dan pengaturan inklusif.'],
    ['armature setup, Pose Mode, keyframes, timing, camera composition, and rendered presentation.', 'pengaturan armature, Pose Mode, keyframe, timing, komposisi kamera, dan presentasi render.'],
    ['VR interactions connected with LED, buzzer, servo, and DHT11 sensor data.', 'interaksi VR yang terhubung dengan LED, buzzer, servo, dan data sensor DHT11.'],
    ['Role:', 'Peran:'],
    ['Tools:', 'Tools:'],
    ['Features:', 'Fitur:'],
    ['Focus:', 'Fokus:'],
    ['Process:', 'Proses:'],
    ['System:', 'Sistem:'],
    ['FROM: STUDENT', 'DARI: MAHASISWA'],
    ['FROM: DORAGONNOID', 'DARI: DORAGONNOID'],
    ['FROM: BUILDER', 'DARI: BUILDER'],
    ['FROM: GUNANDO DWI KUSUMA', 'DARI: GUNANDO DWI KUSUMA'],
    ['TO: COLLABORATOR / RECRUITER', 'UNTUK: KOLABORATOR / REKRUTER'],
    ['From:', 'Dari:'],
    ['To:', 'Untuk:'],
    ['Subject:', 'Subjek:'],
    ['Student', 'Mahasiswa'],
    ['Developer', 'Developer'],
    ['Gamer', 'Gamer'],
    ['Creator', 'Kreator'],
    ['Explorer', 'Eksplorer'],
    ['Interface', 'Antarmuka'],
    ['Game', 'Game'],
    ['Device', 'Perangkat'],
    ['Model', 'Model'],
    ['A practical learner with a clear technical direction.', 'Pembelajar praktis dengan arah teknis yang jelas.'],
    ['Gunando Dwi Kusuma is an Informatics / IT student focused on web interfaces, interactive projects, game environments, VR, IoT, and 3D content.', 'Gunando Dwi Kusuma adalah mahasiswa Informatika / IT yang berfokus pada antarmuka web, proyek interaktif, lingkungan game, VR, IoT, dan konten 3D.'],
    ['Doragonnoid is his online creative identity for gaming and virtual-character content. In this portfolio, the persona supports the professional profile instead of replacing it.', 'Doragonnoid adalah identitas kreatif online untuk konten gaming dan karakter virtual. Dalam portofolio ini, persona tersebut mendukung profil profesional, bukan menggantikannya.'],
    ['That balance makes room for academic work, professional collaboration, game content, digital storytelling, and experimental interface design.', 'Keseimbangan itu memberi ruang untuk karya akademik, kolaborasi profesional, konten game, storytelling digital, dan desain antarmuka eksperimental.'],
    ['Indonesia · 2026', 'Indonesia · 2026'],
    ['Gunando Dwi Kusuma was born on 24 January 2005 and grew up with an early interest in games and digital entertainment.', 'Gunando Dwi Kusuma lahir pada 24 Januari 2005 dan tumbuh dengan ketertarikan awal pada game dan hiburan digital.'],
    ['The online identity was introduced as a gaming-focused channel, combining the ideas of a dragon and an android.', 'Identitas online ini diperkenalkan sebagai kanal yang berfokus pada game, menggabungkan gagasan naga dan android.'],
    ['The online persona became more defined through character models, visual direction, and content planning.', 'Persona online ini menjadi lebih jelas melalui model karakter, arah visual, dan perencanaan konten.'],
    ['While studying Informatics / IT at President University, Gunando is expanding the portfolio toward web development and technical creativity.', 'Sambil menempuh studi Informatika / IT di President University, Gunando mengembangkan portofolio ke arah pengembangan web dan kreativitas teknis.'],
    ['The character adds recognizability for gaming and content, while the main professional identity remains Gunando Dwi Kusuma.', 'Karakter ini menambah daya kenal untuk game dan konten, sementara identitas profesional utama tetap Gunando Dwi Kusuma.'],
    ['A dark fantasy-inspired model with red accents and expressive styling for gaming and streaming content.', 'Model bernuansa dark fantasy dengan aksen merah dan gaya ekspresif untuk konten game dan streaming.'],
    ['An additional presentation that broadens the visual vocabulary of the Doragonnoid identity.', 'Presentasi tambahan yang memperluas bahasa visual identitas Doragonnoid.'],
    ['Discover the projects, capabilities, and interactive elements that shape this portfolio.', 'Jelajahi proyek, kemampuan, dan elemen interaktif yang membentuk portofolio ini.'],
    ['Professional networking, gaming content, visual updates, and community interaction live on different platforms, but all connect back to one portfolio.', 'Networking profesional, konten game, update visual, dan interaksi komunitas hadir di berbagai platform, tetapi semuanya terhubung kembali ke satu portofolio.'],
    ['Share the objective, audience, required output, timeline, and references. A structured brief makes creative work faster and more accurate.', 'Bagikan tujuan, audiens, output yang dibutuhkan, timeline, dan referensi. Brief yang terstruktur membuat pekerjaan kreatif lebih cepat dan akurat.'],
    ['Explain what the website, content, or collaboration should achieve.', 'Jelaskan apa yang harus dicapai oleh website, konten, atau kolaborasi.'],
    ['Describe who will use or view the final result.', 'Jelaskan siapa yang akan menggunakan atau melihat hasil akhirnya.'],
    ['List the pages, features, media, and deliverables that are required.', 'Daftar halaman, fitur, media, dan deliverable yang dibutuhkan.'],
    ['State the target date and any important review milestones.', 'Tuliskan tanggal target dan tahapan review penting.'],
    ['The Connect page is available from every page through the fixed header and call-to-action buttons.', 'Halaman Kontak tersedia dari setiap halaman melalui header tetap dan tombol ajakan.'],
    ['online presence', 'kehadiran online'],
    ['video & gaming', 'video & game'],
    ['visual updates', 'update visual'],
    ['short-form content', 'konten pendek'],
    ['professional profile', 'profil profesional'],
    ['social updates', 'update sosial'],
    ['creator support', 'dukungan kreator'],
    ['before sending a brief', 'sebelum mengirim brief'],
    ['ready when you are', 'siap kapan pun kamu siap'],
    ['Objective', 'Tujuan'],
    ['Audience', 'Audiens'],
    ['Scope', 'Cakupan'],
    ['Timeline', 'Timeline'],
    ['The objective is to build interfaces and prototypes that are usable, explainable, and visually memorable without hiding the core information.', 'Tujuannya adalah membangun antarmuka dan prototipe yang mudah digunakan, mudah dijelaskan, dan berkesan secara visual tanpa menyembunyikan informasi utama.'],
    ['Online identity and character visuals used to support gaming and content work.', 'Identitas online dan visual karakter yang digunakan untuk mendukung karya game dan konten.'],
    ['A professional presentation that connects the person, academic path, and creative ambitions.', 'Presentasi profesional yang menghubungkan sosok, jalur akademik, dan ambisi kreatif.'],
    ['Responsive layout, animation, sliders, overlays, modal forms, video, audio controls, and scroll-based interactions.', 'Layout responsif, animasi, slider, overlay, form modal, video, kontrol audio, dan interaksi berbasis scroll.'],
    ['Gaming, short-form content, streaming identity, and social channels that keep the audience connected.', 'Game, konten pendek, identitas streaming, dan kanal sosial yang menjaga audiens tetap terhubung.'],
    ['Pose-to-pose motion using an armature, bone controls, timeline keyframes, camera framing, and viewport playback in Blender.', 'Gerak pose-to-pose menggunakan armature, kontrol tulang, keyframe timeline, framing kamera, dan playback viewport di Blender.'],
    ['Unity XR locomotion, animated hand controllers, physics interaction, actuator control, and sensor feedback inside one connected prototype.', 'Locomotion Unity XR, controller tangan animasi, interaksi fisika, kontrol aktuator, dan umpan balik sensor dalam satu prototipe terhubung.'],
    ['Dunia Roblox untuk bersantai, menjelajah, mengendarai mobil, menangkap hewan, dan menikmati aktivitas sederhana dalam satu pengalaman.', 'Dunia Roblox untuk bersantai, menjelajah, mengendarai mobil, menangkap hewan, dan menikmati aktivitas sederhana dalam satu pengalaman.'],
    ['A Roblox world for relaxing, exploring, driving cars, catching creatures, and enjoying simple activities in one experience.', 'Dunia Roblox untuk bersantai, menjelajah, mengendarai mobil, menangkap hewan, dan menikmati aktivitas sederhana dalam satu pengalaman.'],
    ['Open the project page to see the main features, gameplay loop, and development gallery from Roblox Studio.', 'Buka halaman proyek untuk melihat fitur utama, alur permainan, serta galeri pengembangan dari Roblox Studio.'],
    ['Open the project page to see the character motion process, pose setup, and animation preview video.', 'Buka halaman proyek untuk melihat proses gerakan karakter, pengaturan pose, serta video preview animasinya.'],
    ['Open the project page to see the VR-IoT communication flow, controller setup, interaction features, and development gallery.', 'Buka halaman proyek untuk melihat alur komunikasi VR-IoT, pengaturan controller, fitur interaksi, dan galeri pengembangannya.'],
    ['see full project', 'lihat proyek lengkap'],
    ['skills & tools', 'keahlian & tools'],
    ['Motion & Interaction', 'Gerak & Interaksi'],
    ['gaming · video · virtual identity', 'gaming · video · identitas virtual'],
    ['Informatics / IT', 'Informatika / IT'],
    ['analysis · logic · prototyping', 'analisis · logika · prototyping'],
    ['The original video remains part of the story.', 'Video asli tetap menjadi bagian dari cerita.'],
    ['Instead of removing the existing media, the redesign reframes it inside a more intentional editorial system, preserving the creator’s original material while improving presentation.', 'Alih-alih menghapus media yang ada, redesign menempatkannya dalam sistem editorial yang lebih terarah, menjaga materi asli kreator sambil meningkatkan presentasi.'],
    ['Clear menu, active controls, keyboard escape support, and consistent page links.', 'Menu jelas, kontrol aktif, dukungan tombol Escape, dan tautan halaman yang konsisten.'],
    ['Compressed media, optional audio, responsive images, and project galleries.', 'Media terkompresi, audio opsional, gambar responsif, dan galeri proyek.'],
    ['Reduced visual clutter, smoother reveal effects, scroll progress, and readable header.', 'Tampilan lebih bersih, efek reveal lebih halus, progres scroll, dan header yang mudah dibaca.'],
    ['Mouse drag, touch scrolling, snap positioning, and previous/next controls.', 'Drag mouse, scroll sentuh, posisi snap, dan kontrol sebelumnya/berikutnya.'],
    ['Modal form, validation, status message, and direct FormSubmit email routing.', 'Form modal, validasi, pesan status, dan pengiriman email langsung melalui FormSubmit.'],
    ['Layouts adapt from large screens to practical one-column mobile views.', 'Layout menyesuaikan dari layar besar ke tampilan mobile satu kolom yang praktis.'],
    ['Open the Connect page or use one of the available social channels.', 'Buka halaman Kontak atau gunakan salah satu kanal sosial yang tersedia.'],
    ['Roblox Game', 'Game Roblox'],
    ['Android Application', 'Aplikasi Android'],
    ['VR & IoT Experience', 'Pengalaman VR & IoT'],
    ['selected projects · role · tools · results', 'proyek pilihan · peran · tools · hasil'],
    ['game creator ·', 'pembuat game ·'],
    ['app concept and UI designer ·', 'perancang konsep aplikasi dan UI ·'],
    ['animator and editor ·', 'animator dan editor ·'],
    ['prototype builder ·', 'pembangun prototipe ·'],
    ['open world, vehicles, creature collection, inventory, selling, and simple economy loop.', 'open world, kendaraan, koleksi makhluk, inventory, penjualan, dan loop ekonomi sederhana.'],
    ['guided reflection, AI support, accessibility settings, progress, and privacy-first journaling.', 'refleksi terpandu, dukungan AI, pengaturan aksesibilitas, progres, dan jurnal yang mengutamakan privasi.'],
    ['armature, Pose Mode, keyframes, timing, camera, and rendered presentation.', 'armature, Pose Mode, keyframe, timing, kamera, dan presentasi render.'],
    ['VR input connected to LED, buzzer, servo, and DHT11 sensor data.', 'input VR terhubung dengan LED, buzzer, servo, dan data sensor DHT11.'],
    ['A virtual world for relaxing, exploring, collecting creatures, and enjoying multiple activities in one Roblox experience.', 'Sebuah dunia virtual untuk bersantai, menjelajah, mengoleksi hewan, dan menikmati berbagai aktivitas dalam satu pengalaman Roblox.'],
    ['A calm, spacious play space full of activities.', 'Tempat bermain yang santai, luas, dan penuh aktivitas.'],
    ['Relaxplace Doragonnoid is a game project developed with Roblox Studio using a calm open-world exploration concept.', 'Relaxplace Doragonnoid adalah proyek game yang dikembangkan menggunakan Roblox Studio dengan konsep ruang santai dan eksplorasi dunia terbuka.'],
    ['Players can visit areas such as the city, mountains, forest, and oriental-style buildings. Each area is designed as a place to drive, find creatures, manage collections, and play simple activities.', 'Pemain dapat mengunjungi beragam area seperti kota, kawasan pegunungan, hutan, dan bangunan bergaya oriental. Setiap area dirancang sebagai tempat untuk berkendara, mencari hewan, mengelola koleksi, serta memainkan aktivitas sederhana.'],
    ['Main features inside the game.', 'Fitur utama di dalam game.'],
    ['The game system is designed so players have clear activities while still enjoying the world at a relaxed pace.', 'Sistem permainan dibuat agar pemain mempunyai kegiatan yang jelas, tetapi tetap dapat menikmati dunia game dengan ritme yang santai.'],
    ['Buying and Driving Cars', 'Membeli dan Mengendarai Mobil'],
    ['Catching and Summoning Creatures', 'Menangkap dan Memanggil Hewan'],
    ['Selling Captured Creatures', 'Menjual Hewan Tangkapan'],
    ['Simple Mini-games', 'Permainan Sederhana'],
    ['Players can buy available vehicles, choose their own car, and drive it to explore different areas in Relaxplace Doragonnoid.', 'Pemain dapat membeli kendaraan yang tersedia, memilih mobil miliknya, lalu mengendarainya untuk menjelajahi berbagai area di dalam dunia Relaxplace Doragonnoid.'],
    ['Players can search for and catch creatures. Captured creatures are stored and can be summoned again to accompany the player.', 'Pemain dapat mencari serta menangkap hewan. Hewan yang telah diperoleh masuk ke dalam penyimpanan dan dapat dipanggil kembali untuk menemani pemain.'],
    ['Captured creatures can be sold. This system gives players an exploration goal and a way to earn coins in the game.', 'Hewan yang berhasil ditangkap dapat dijual. Sistem ini memberi pemain tujuan eksplorasi sekaligus cara untuk memperoleh coin di dalam game.'],
    ['Besides exploring and collecting creatures, players can enjoy mini-games and simple activities as additional entertainment in the game world.', 'Selain menjelajah dan mengoleksi hewan, pemain dapat menikmati mini-game serta aktivitas sederhana sebagai hiburan tambahan di dalam dunia game.'],
    ['One world, multiple ways to play.', 'Satu dunia, beberapa cara bermain.'],
    ['Choose a vehicle, explore the area, catch creatures, summon the collection, sell captures, collect coins, then continue the journey or play mini-games.', 'Pilih kendaraan, jelajahi area, tangkap hewan, panggil koleksi, jual hasil tangkapan, kumpulkan coin, lalu lanjutkan perjalanan atau bermain mini-game.'],
    ['Buy car', 'Beli mobil'],
    ['Explore world', 'Jelajahi dunia'],
    ['Catch creatures', 'Tangkap hewan'],
    ['Summon or sell', 'Panggil atau jual'],
    ['Earn coins', 'Dapatkan coin'],
    ['Seeing the world of Relaxplace Doragonnoid.', 'Melihat dunia Relaxplace Doragonnoid.'],
    ['The gallery shows the environment, vehicle area, storage interface, and several systems being developed in Roblox Studio.', 'Galeri berikut menampilkan lingkungan, area kendaraan, antarmuka penyimpanan, serta beberapa sistem yang sedang dikembangkan di Roblox Studio.'],
    ['Swipe the gallery or use the arrow buttons.', 'Geser galeri atau gunakan tombol panah.'],
    ['Main area with oriental architecture, open plaza, and exploration points.', 'Area utama dengan arsitektur oriental, plaza terbuka, dan titik eksplorasi.'],
    ['Natural environment with a lake, grass, and paths players can explore.', 'Lingkungan alam dengan danau, rumput, dan jalur yang dapat dijelajahi pemain.'],
    ['Mountain views expand the atmosphere and scale of the game world.', 'Pemandangan pegunungan untuk memperluas atmosfer dan skala dunia game.'],
    ['Travel routes that connect areas and support exploration using vehicles.', 'Jalur perjalanan yang menghubungkan area dan mendukung eksplorasi menggunakan kendaraan.'],
    ['City area with roads, houses, buildings, and space for driving.', 'Kawasan kota dengan jalan raya, rumah, bangunan, dan ruang untuk berkendara.'],
    ['A place where players view, buy, and choose the vehicle they will use.', 'Tempat pemain melihat, membeli, dan memilih kendaraan yang akan digunakan.'],
    ['Game-world interaction that brings together vehicle systems and collectible creatures.', 'Interaksi dunia game yang mempertemukan sistem kendaraan dan makhluk koleksi.'],
    ['Storage interface for managing captured creatures, items, and supplies.', 'Antarmuka penyimpanan untuk mengelola hewan tangkapan, item, dan perbekalan.'],
    ['Developed as a game experiment space.', 'Dikembangkan sebagai ruang eksperimen game.'],
    ['Open-world relaxation game', 'Game relaksasi open-world'],
    ['Vehicle · Creature · Trading · Mini-game', 'Kendaraan · Makhluk · Perdagangan · Mini-game'],
    ['Contact Gunando Dwi Kusuma to discuss game development, creative collaboration, websites, or other digital projects.', 'Hubungi Gunando Dwi Kusuma untuk berdiskusi tentang pengembangan game, kolaborasi kreatif, website, atau proyek digital lainnya.'],
    ['A personal reflection app that helps users record experiences, understand emotions, evaluate actions, and monitor self-development in a structured way.', 'Aplikasi refleksi personal yang membantu pengguna mencatat pengalaman, memahami emosi, mengevaluasi tindakan, dan memantau perkembangan diri secara terstruktur.'],
    ['A digital space for understanding experiences and deciding the next step.', 'Ruang digital untuk memahami pengalaman dan menentukan langkah berikutnya.'],
    ['Reflection is an Android app project designed as a reflection companion for personal, academic, and professional contexts.', 'Reflection adalah proyek aplikasi Android yang dirancang sebagai pendamping refleksi untuk konteks personal, akademik, maupun profesional.'],
    ['Users can choose a reflection theme, record situations and emotions, answer evaluative questions, get AI Guide assistance, and view competency development. Privacy settings, reminders, accessibility, and user support are placed as important parts of the app experience.', 'Pengguna dapat memilih tema refleksi, mencatat situasi dan emosi, menjawab pertanyaan evaluatif, memperoleh bantuan AI Guide, serta melihat perkembangan kompetensi. Pengaturan privasi, pengingat, aksesibilitas, dan dukungan pengguna ditempatkan sebagai bagian penting dari pengalaman aplikasi.'],
    ['Main features inside the app.', 'Fitur utama di dalam aplikasi.'],
    ['Each module helps users move from raw experience toward understanding, learning, and follow-up plans.', 'Setiap modul membantu pengguna bergerak dari pengalaman mentah menuju pemahaman, pembelajaran, dan rencana tindak lanjut.'],
    ['Guided Reflection', 'Refleksi Terpandu'],
    ['Voice and Audio Input', 'Input Suara dan Audio'],
    ['Reflection Themes', 'Tema Refleksi'],
    ['Competency Progress', 'Progres Kompetensi'],
    ['Reminders and Autosave', 'Pengingat dan Autosave'],
    ['Privacy and Account', 'Privasi dan Akun'],
    ['Complete Accessibility', 'Aksesibilitas Lengkap'],
    ['The question flow helps users write event context, recognize emotions, evaluate what went well or poorly, and formulate learning.', 'Alur pertanyaan membantu pengguna menuliskan konteks kejadian, mengenali emosi, mengevaluasi hal yang berjalan baik atau kurang baik, dan merumuskan pembelajaran.'],
    ['The conversation assistant provides opening questions, help understanding feelings, learning from situations, and communication suggestions that can be adjusted to the user context.', 'Asisten percakapan menyediakan pertanyaan awal, bantuan memahami perasaan, pembelajaran dari situasi, serta saran komunikasi yang dapat disesuaikan dengan konteks pengguna.'],
    ['Users can use the microphone to fill reflections, listen to text, copy responses, or share results when they need an alternative interaction method.', 'Pengguna dapat menggunakan mikrofon untuk mengisi refleksi, mendengarkan teks, menyalin respons, atau membagikan hasil ketika membutuhkan cara interaksi alternatif.'],
    ['Reflection can start from daily experiences, emotional moments, lessons from mistakes, or teamwork and communication situations.', 'Refleksi dapat dimulai dari pengalaman harian, momen emosional, pembelajaran dari kesalahan, maupun situasi kerja tim dan komunikasi.'],
    ['The dashboard shows reflection count, cycle completion, level, and progress in areas such as problem solving, communication, professionalism, empathy, and humanism.', 'Dashboard menampilkan jumlah refleksi, penyelesaian siklus, level, serta perkembangan area seperti pemecahan masalah, komunikasi, profesionalisme, empati, dan humanisme.'],
    ['Users can set reflection reminders, sound notifications, vibration, pop-ups, longer interaction time, and autosave so the process can continue.', 'Pengguna dapat mengatur pengingat refleksi, notifikasi suara, getaran, pop-up, waktu interaksi yang lebih panjang, serta penyimpanan otomatis agar proses dapat dilanjutkan.'],
    ['The profile section provides identity, cloud account, privacy and security settings, AI history deletion, password reset, and optional research data contribution choices.', 'Bagian profil menyediakan identitas, akun cloud, pengaturan privasi dan keamanan, penghapusan riwayat AI, reset kata sandi, serta pilihan kontribusi data penelitian yang bersifat opsional.'],
    ['Text size and weight, high contrast, color-vision modes, TalkBack, page reading, voice speed, large touch targets, keyboard focus, and reduce motion settings are available.', 'Tersedia pengaturan ukuran dan ketebalan teks, kontras tinggi, mode penglihatan warna, TalkBack, pembacaan halaman, kecepatan suara, target sentuh besar, fokus keyboard, dan reduce motion.'],
    ['From experience toward learning.', 'Dari pengalaman menuju pembelajaran.'],
    ['Choose a topic, explain context, identify emotions, answer evaluation questions, use AI Guide when needed, then save results and monitor progress.', 'Pilih topik, jelaskan konteks, identifikasi emosi, jawab pertanyaan evaluasi, gunakan AI Guide bila diperlukan, lalu simpan hasil dan pantau perkembangan.'],
    ['Choose theme', 'Pilih tema'],
    ['Record experience', 'Catat pengalaman'],
    ['Evaluate actions', 'Evaluasi tindakan'],
    ['Get guidance', 'Dapatkan panduan'],
    ['Save progress', 'Simpan progres'],
    ['Application gallery', 'Galeri aplikasi'],
    ['The gallery shows the dashboard, profile, AI Guide, reflection form, privacy settings, and accessibility features developed in Android Studio.', 'Galeri menampilkan dashboard, profil, AI Guide, formulir refleksi, pengaturan privasi, dan rangkaian fitur aksesibilitas yang dikembangkan di Android Studio.'],
    ['Summary of reminders, reflection themes, level, reflection count, and user competency development.', 'Ringkasan pengingat, tema refleksi, level, jumlah refleksi, dan perkembangan kompetensi pengguna.'],
    ['Identity, security, privacy, AI history deletion, password reset, and account settings.', 'Identitas, keamanan, privasi, penghapusan riwayat AI, reset kata sandi, dan pengaturan akun.'],
    ['Opening questions, emotion guidance, situational learning, and communication suggestions.', 'Pertanyaan awal, panduan emosi, pembelajaran situasional, dan saran komunikasi.'],
    ['Evaluation form with guidance, templates, voice transcript, local processing status, and next steps.', 'Formulir evaluasi dengan panduan, template, transkrip suara, status pemrosesan lokal, dan langkah lanjutan.'],
    ['Dark mode, language, accessibility, counseling service, guide, and account controls.', 'Pilihan mode gelap, bahasa, aksesibilitas, layanan konseling, panduan, dan kontrol akun.'],
    ['Standard, Protanopia, Deuteranopia, Tritanopia, and Monochrome options for different visual needs.', 'Pilihan Standard, Protanopia, Deuteranopia, Tritanopia, dan Monochrome untuk kebutuhan visual berbeda.'],
    ['TalkBack support, title and page reading, voice speed and volume, text-to-speech, and voice commands.', 'Dukungan TalkBack, pembacaan judul dan halaman, kecepatan serta volume suara, text-to-speech, dan perintah suara.'],
    ['Reduce motion, larger touch targets, keyboard focus, additional interaction time, autosave, and simple language.', 'Reduce motion, target sentuh lebih besar, fokus keyboard, tambahan waktu interaksi, autosave, dan bahasa sederhana.'],
    ['Developed as an inclusive, privacy-oriented reflection app.', 'Dikembangkan sebagai aplikasi refleksi yang inklusif dan berorientasi privasi.'],
    ['Reflection & self-development application', 'Aplikasi refleksi & pengembangan diri'],
    ['Contact Gunando Dwi Kusuma to discuss self-development apps, Android interfaces, accessibility features, AI-assisted flows, or other digital products.', 'Hubungi Gunando Dwi Kusuma untuk berdiskusi tentang aplikasi pengembangan diri, antarmuka Android, fitur aksesibilitas, alur berbantuan AI, atau produk digital lainnya.'],
    ['A Unity-based VR prototype that connects movement, object interaction, and virtual controllers with an IoT system to control actuators and display sensor data.', 'Prototipe VR berbasis Unity yang menghubungkan pergerakan, interaksi objek, dan controller virtual dengan sistem IoT untuk mengendalikan aktuator serta menampilkan data sensor.'],
    ['Connecting virtual spaces with real devices.', 'Menghubungkan ruang virtual dengan perangkat nyata.'],
    ['Backroom End is an experimental Virtual Reality and Internet of Things project built in Unity using an XR system.', 'Backroom End adalah proyek eksperimental Virtual Reality dan Internet of Things yang dibangun di Unity menggunakan sistem XR.'],
    ['Players explore a futuristic laboratory environment through teleportation and snap turn, use left and right hand assets, and interact with physics objects such as a basketball. The VR system is also designed to send commands to IoT devices to turn on an LED, buzzer, or servo. In return, temperature data from the DHT11 sensor is received and displayed on a monitor inside the virtual room.', 'Pemain menjelajahi lingkungan laboratorium futuristik melalui teleportation dan snap turn, menggunakan aset tangan kiri dan kanan, serta berinteraksi dengan objek fisika seperti bola basket. Sistem VR juga dirancang untuk mengirim perintah ke perangkat IoT agar dapat menyalakan LED, buzzer, atau servo. Sebaliknya, data suhu dari sensor DHT11 diterima dan ditampilkan kembali pada monitor di dalam ruang virtual.'],
    ['VR features', 'fitur VR'],
    ['Movement and interaction designed for an XR experience.', 'Pergerakan dan interaksi yang dirancang untuk pengalaman XR.'],
    ['VR features focus on comfortable locomotion, hand representation, physics interaction, and two-way communication with an IoT system.', 'Fitur VR berfokus pada locomotion yang nyaman, representasi tangan, interaksi fisika, dan komunikasi dua arah dengan sistem IoT.'],
    ['Players can rotate view direction by set angles through the controller, making VR navigation faster and reducing physical rotation needs.', 'Pemain dapat memutar arah pandang dalam sudut tertentu melalui controller, sehingga navigasi VR terasa cepat dan mengurangi kebutuhan rotasi fisik.'],
    ['The teleportation system allows players to move to valid points in the play area without continuously walking in the real room.', 'Sistem teleportation memungkinkan pemain berpindah ke titik yang valid pada area permainan tanpa harus berjalan terus-menerus di ruang nyata.'],
    ['Left & Right Hand Assets', 'Aset Tangan Kiri & Kanan'],
    ['Left and right hand assets represent the user controllers in the virtual world and become the basis for selecting and holding objects.', 'Aset tangan kiri dan kanan merepresentasikan controller pengguna di dunia virtual dan menjadi dasar untuk memilih serta memegang objek.'],
    ['Hand Model Animation', 'Animasi Model Tangan'],
    ['The hand model responds to trigger, grip, and thumbstick input so controller motion looks more alive and communicative.', 'Model tangan merespons input trigger, grip, dan thumbstick sehingga gerakan controller terlihat lebih hidup dan komunikatif.'],
    ['Grab & Throw', 'Ambil & Lempar'],
    ['Objects with collider, rigidbody, and XR Grab Interactable can be picked up, moved, then thrown using VR hand movement.', 'Objek yang memiliki collider, rigidbody, dan XR Grab Interactable dapat diambil, dipindahkan, lalu dilempar menggunakan gerakan tangan VR.'],
    ['The system connects VR with IoT devices to send commands, receive responses, and display device status on a virtual monitor.', 'Sistem menghubungkan VR dengan perangkat IoT untuk mengirim perintah, menerima respons, dan menampilkan status perangkat pada monitor virtual.'],
    ['IoT features', 'fitur IoT'],
    ['Virtual commands create actions on physical devices.', 'Perintah virtual menghasilkan aksi pada perangkat fisik.'],
    ['Three actuators can be controlled from VR, while one sensor sends data back to be visualized in the application.', 'Tiga aktuator dapat dikendalikan dari VR, sementara satu sensor mengirimkan data kembali untuk divisualisasikan di dalam aplikasi.'],
    ['LED Control', 'Kontrol LED'],
    ['A button in the virtual room sends data to the IoT device to turn an LED on or off as a visual indicator.', 'Tombol di ruang virtual mengirim data ke perangkat IoT untuk menyalakan atau mematikan LED sebagai indikator visual.'],
    ['Buzzer Control', 'Kontrol Buzzer'],
    ['A command from VR can activate the buzzer to create an audio response on the IoT device.', 'Perintah dari VR dapat mengaktifkan buzzer untuk menghasilkan respons suara pada perangkat IoT.'],
    ['Servo Control', 'Kontrol Servo'],
    ['Data sent from VR is used to change servo position or angle according to the selected user action.', 'Data yang dikirim dari VR digunakan untuk mengubah posisi atau sudut servo sesuai aksi yang dipilih pengguna.'],
    ['DHT11 Sensor Display', 'Tampilan Sensor DHT11'],
    ['Temperature data from the DHT11 sensor is sent by the IoT system and displayed on a panel or virtual monitor so it can be read directly from VR.', 'Data suhu dari sensor DHT11 dikirim oleh sistem IoT dan ditampilkan pada panel atau monitor virtual agar dapat dibaca langsung dari VR.'],
    ['Two-way communication from VR to IoT and back again.', 'Komunikasi dua arah dari VR ke IoT dan kembali lagi.'],
    ['Controller input is processed by Unity, sent as a message to an IoT device, runs actuators, then sensor data is sent back to be displayed in the virtual world.', 'Input controller diproses Unity, dikirim sebagai pesan ke perangkat IoT, menjalankan aktuator, kemudian data sensor dikirim kembali untuk ditampilkan di dunia virtual.'],
    ['Scene, controller, interaction, and virtual devices.', 'Scene, controller, interaksi, dan perangkat virtual.'],
    ['The gallery shows the VR room, IoT button configuration, grabbable basketball object, and XR controller setup.', 'Galeri menampilkan ruang VR, konfigurasi tombol IoT, objek bola basket yang dapat dipegang, serta pengaturan controller XR.'],
    ['The sci-fi environment is the main room for testing locomotion, object interaction, controllers, and virtual-device integration.', 'Lingkungan sci-fi menjadi ruang utama untuk menguji locomotion, interaksi objek, controller, serta integrasi perangkat virtual.'],
    ['The virtual button uses XR Simple Interactable and a custom script to send commands to an LED, buzzer, or servo.', 'Tombol virtual menggunakan XR Simple Interactable dan script khusus untuk mengirim perintah ke LED, buzzer, atau servo.'],
    ['The basketball has a collider, rigidbody, and XR Grab Interactable so it can be picked up and thrown naturally.', 'Bola basket dilengkapi collider, rigidbody, dan XR Grab Interactable sehingga dapat diambil dan dilempar secara natural.'],
    ['Thumbstick, trigger, and grip input are connected to controller animation and right-hand interaction in the VR experience.', 'Input thumbstick, trigger, dan grip dihubungkan ke animasi controller serta interaksi tangan kanan dalam pengalaman VR.'],
    ['XR and IoT integration prototype for cross-world interaction.', 'Prototipe integrasi XR dan IoT untuk interaksi lintas dunia.'],
    ['Contact Gunando Dwi Kusuma to discuss VR prototypes, IoT integration, Unity apps, XR interaction, or digital experiments that connect virtual spaces with real devices.', 'Hubungi Gunando Dwi Kusuma untuk berdiskusi mengenai prototipe VR, integrasi IoT, aplikasi Unity, interaksi XR, atau eksperimen digital yang menghubungkan ruang virtual dengan perangkat nyata.'],
    ['A simple 3D character animation project that explores poses, hand movement, armature control, keyframes, and timing through Blender.', 'Proyek animasi karakter 3D sederhana yang mengeksplorasi pose, gerakan tangan, kontrol armature, keyframe, dan timing melalui Blender.'],
    ['Turning a static character into expressive movement.', 'Mengubah karakter statis menjadi gerakan yang ekspresif.'],
    ['Simple Animation Blender is a 3D character animation exercise with a short pose and hand-waving gesture.', 'Simple Animation Blender adalah latihan animasi karakter 3D dengan gerakan singkat berupa pose dan gestur melambaikan tangan.'],
    ['The project uses a chibi-style character model that already has an armature. Movement is shaped through Pose Mode by adjusting character bones, saving changes into keyframes, and reviewing the result through the timeline and viewport playback. The main focus is understanding pose-to-pose basics, gesture readability, and animation timing.', 'Proyek memanfaatkan model karakter bergaya chibi yang telah memiliki armature. Gerakan dibentuk melalui Pose Mode dengan mengatur tulang karakter, menyimpan perubahan pada keyframe, dan meninjau hasilnya melalui timeline serta playback viewport. Fokus utamanya adalah memahami dasar pose-to-pose, keterbacaan gestur, dan pengaturan waktu animasi.'],
    ['Main elements in the animation process.', 'Elemen utama dalam proses animasi.'],
    ['Each stage focuses on character control and arranging short motion that reads clearly when played.', 'Setiap tahap difokuskan pada kontrol karakter dan penyusunan gerak singkat yang jelas ketika diputar.'],
    ['Rigged Character', 'Karakter dengan Rig'],
    ['The animation uses a chibi-style 3D character equipped with an armature so body parts can be controlled through bones.', 'Animasi menggunakan karakter 3D bergaya chibi yang dilengkapi armature sehingga bagian tubuh dapat dikontrol melalui tulang.'],
    ['Pose Mode is used to adjust character pose by changing limb position and rotation without changing the base model shape.', 'Pose karakter diatur melalui Pose Mode untuk mengubah posisi dan rotasi anggota tubuh tanpa mengubah bentuk dasar model.'],
    ['Bone Control', 'Kontrol Tulang'],
    ['Bones in the armature are selected and adjusted to gradually shape hand gestures, body position, and character attitude.', 'Tulang pada armature dipilih dan disesuaikan untuk membentuk gestur tangan, posisi badan, dan sikap karakter secara bertahap.'],
    ['Keyframe Animation', 'Animasi Keyframe'],
    ['Important poses are saved as keyframes on several frames so Blender can create motion transitions between them.', 'Pose penting disimpan sebagai keyframe pada beberapa frame sehingga Blender dapat membentuk transisi gerakan di antaranya.'],
    ['Timeline & Timing', 'Timeline & Timing'],
    ['The timeline is used to determine pose order, keyframe spacing, motion duration, and animation rhythm so it does not feel too fast or too slow.', 'Timeline digunakan untuk menentukan urutan pose, jarak antarkeyframe, durasi gerakan, serta ritme animasi agar tidak terasa terlalu cepat atau lambat.'],
    ['Viewport Preview', 'Preview Viewport'],
    ['The animation result is reviewed directly through viewport playback to check motion smoothness and fix unclear poses.', 'Hasil animasi ditinjau langsung melalui playback viewport untuk mengecek kelancaran gerak dan memperbaiki pose yang belum terbaca.'],
    ['Camera Framing', 'Framing Kamera'],
    ['The camera and viewport composition help ensure the character remains the center of attention when the animation is presented.', 'Kamera dan komposisi viewport membantu memastikan karakter tetap menjadi pusat perhatian saat animasi dipresentasikan.'],
    ['Video Preview', 'Preview Video'],
    ['The final movement is recorded in a short video format so the process and animation result can be shown as part of the portfolio.', 'Gerakan akhir direkam dalam format video singkat sehingga proses dan hasil animasi dapat ditampilkan sebagai bagian dari portofolio.'],
    ['From the first pose to complete motion.', 'Dari pose awal menuju gerakan utuh.'],
    ['The process starts by choosing the model and armature, creating main poses, adding keyframes, adjusting timing, then replaying the animation for evaluation.', 'Proses dimulai dengan memilih model dan armature, membuat pose utama, menambahkan keyframe, menyesuaikan timing, lalu memutar ulang animasi untuk evaluasi.'],
    ['Choose character', 'Pilih karakter'],
    ['Activate armature', 'Aktifkan armature'],
    ['Create pose', 'Buat pose'],
    ['Add keyframe', 'Tambahkan keyframe'],
    ['Adjust timing', 'Atur timing'],
    ['Preview motion', 'Preview gerakan'],
    ['Simple movement, structured process.', 'Gerakan sederhana, proses yang terstruktur.'],
    ['The following video shows a short character playback after poses and keyframes are arranged on the Blender timeline.', 'Video berikut memperlihatkan playback singkat karakter setelah pose dan keyframe disusun pada timeline Blender.'],
    ['Your browser does not support video.', 'Browser Anda tidak mendukung video.'],
    ['Seeing the model and pose setup.', 'Melihat pengaturan model dan pose.'],
    ['The gallery shows the character in Object Mode and Pose Mode, including armature, bone transform, timeline, and animation keyframes.', 'Galeri menampilkan kondisi karakter di Object Mode dan Pose Mode, termasuk armature, transform tulang, timeline, serta keyframe animasi.'],
    ['Character, armature, camera, and timeline are visible in one workspace to review the whole animation scene.', 'Karakter, armature, kamera, dan timeline terlihat dalam satu workspace untuk meninjau keseluruhan scene animasi.'],
    ['Pose Mode & Keyframe', 'Pose Mode & Keyframe'],
    ['Pose Mode is used to adjust character bones, while keyframes on the timeline save movement changes.', 'Pose Mode digunakan untuk mengatur tulang karakter, sementara keyframe pada timeline menyimpan perubahan gerakan.'],
    ['A basic character animation study that can be developed further.', 'Studi dasar animasi karakter yang dapat dikembangkan lebih lanjut.'],
    ['Simple 3D character animation', 'Animasi karakter 3D sederhana'],
    ['Pose to pose · keyframes · armature', 'Pose to pose · keyframe · armature'],
    ['Character gesture and hand wave', 'Gestur karakter dan lambaian tangan'],
    ['Viewport preview · MP4 video', 'Preview viewport · video MP4'],
    ['Contact Gunando Dwi Kusuma to discuss simple character animation, 3D presentation, game development, websites, or other digital experiments.', 'Hubungi Gunando Dwi Kusuma untuk berdiskusi tentang animasi karakter sederhana, presentasi 3D, pengembangan game, website, atau eksperimen digital lainnya.'],
    ['Personal portfolio of Gunando Dwi Kusuma, known online as Doragonnoid, combining web development, virtual worlds, video games, and digital experiments.', 'Portfolio personal Gunando Dwi Kusuma—dikenal secara online sebagai Doragonnoid—yang menggabungkan pengembangan web, dunia virtual, video game, dan eksperimen digital.'],
    ['Personal portfolio of Gunando Dwi Kusuma, known online as Doragonnoid, combining web development, virtual worlds, video games, VR, IoT, and digital experiments.', 'Portfolio personal Gunando Dwi Kusuma—dikenal secara online sebagai Doragonnoid—yang menggabungkan pengembangan web, dunia virtual, video game, VR, IoT, dan eksperimen digital.'],
    ['Personal portfolio of Gunando Dwi Kusuma, known online as Doragonnoid, combining web development, virtual worlds, video games, 3D animation, and digital experiments.', 'Portfolio personal Gunando Dwi Kusuma—dikenal secara online sebagai Doragonnoid—yang menggabungkan pengembangan web, dunia virtual, video game, animasi 3D, dan eksperimen digital.'],
    ['Personal portfolio of Gunando Dwi Kusuma, known online as Doragonnoid, combining web development, virtual worlds, video games, 3D animation, VR, IoT, and digital experiments.', 'Portfolio personal Gunando Dwi Kusuma—dikenal secara online sebagai Doragonnoid—yang menggabungkan pengembangan web, dunia virtual, video game, animasi 3D, VR, IoT, dan eksperimen digital.'],
    ['Personal portfolio of Gunando Dwi Kusuma, known online as Doragonnoid, combining web development, games, VR, IoT, animation, and digital experiments.', 'Portfolio personal Gunando Dwi Kusuma—dikenal secara online sebagai Doragonnoid—yang menggabungkan pengembangan web, game, VR, IoT, animasi, dan eksperimen digital.']
  );
  translationEntries.push(
    ['Gunando Dwi Kusuma', 'Gunando Dwi Kusuma'],
    ['Gunando Dwi Kusuma · digital creator', 'Gunando Dwi Kusuma · kreator digital'],
    ['Gunando Dwi Kusuma · e-certificates', 'Gunando Dwi Kusuma · e-sertifikat'],
    ['Gunando Dwi Kusuma · Informatics / IT', 'Gunando Dwi Kusuma · Informatika / IT'],
    ['Jakarta · Indonesia', 'Jakarta · Indonesia'],
    ['Jakarta, Indonesia', 'Jakarta, Indonesia'],
    ['YouTube ↗', 'YouTube ↗'],
    ['Instagram ↗', 'Instagram ↗'],
    ['TikTok ↗', 'TikTok ↗'],
    ['LinkedIn ↗', 'LinkedIn ↗'],
    ['Facebook ↗', 'Facebook ↗'],
    ['YouTube', 'YouTube'],
    ['Instagram', 'Instagram'],
    ['TikTok', 'TikTok'],
    ['LinkedIn', 'LinkedIn'],
    ['Facebook', 'Facebook'],
    ['Discord', 'Discord'],
    ['Trakteer', 'Trakteer'],
    ['C', 'K'],
    ['onnect', 'ontak'],
    ['E', 'P'],
    ['xperiences', 'engalaman'],
    ['EST. 2021', 'EST. 2021'],
    ['GDK', 'GDK'],
    ['gunando', 'gunando'],
    ['Gunando', 'Gunando'],
    ['Dwi Kusuma', 'Dwi Kusuma'],
    ['Doragonnoid', 'Doragonnoid'],
    ['Relaxplace', 'Relaxplace'],
    ['Reflection', 'Reflection'],
    ['Backroom', 'Backroom'],
    ['End', 'End'],
    ['Blender Study', 'Studi Blender'],
    ['Character Animation', 'Animasi Karakter'],
    ['OBJECT / 01', 'OBJEK / 01'],
    ['OBJECT / 02', 'OBJEK / 02'],
    ['OBJECT / 03', 'OBJEK / 03'],
    ['OBJECT / 04', 'OBJEK / 04'],
    ['ROBLOX GAME', 'GAME ROBLOX'],
    ['ANDROID APPLICATION', 'APLIKASI ANDROID'],
    ['VR & IoT SYSTEM', 'SISTEM VR & IoT'],
    ['Professional focus', 'Fokus profesional'],
    ['Project collaboration / portfolio review', 'Kolaborasi proyek / ulasan portofolio'],
    ['Verified: Informatics / IT student, web developer, gamer, and digital creator with projects across web, Roblox, Android concepts, Blender, VR, and IoT.', 'Terverifikasi: mahasiswa Informatika / IT, web developer, gamer, dan kreator digital dengan proyek di bidang web, Roblox, konsep Android, Blender, VR, dan IoT.'],
    ['journey initiated', 'perjalanan dimulai'],
    ['A practical contact section for web projects, interactive prototypes, digital content, and collaboration briefs.', 'Bagian kontak praktis untuk proyek web, prototipe interaktif, konten digital, dan brief kolaborasi.'],
    ['“Good digital work should be clear enough to use, strong enough to remember, and honest about the process behind it.”', '“Karya digital yang baik harus cukup jelas untuk digunakan, cukup kuat untuk diingat, dan jujur terhadap proses di baliknya.”'],
    ['GUNANDO DWI KUSUMA', 'GUNANDO DWI KUSUMA'],
    ['Gunando Dwi Kusuma / Doragonnoid', 'Gunando Dwi Kusuma / Doragonnoid'],
    ['Roblox Studio.', 'Roblox Studio.'],
    ['Blender.', 'Blender.'],
    ['Unity XR and IoT components.', 'Komponen Unity XR dan IoT.'],
    ['Roblox Studio game environments, inventory, movement, vehicles, economy loops, object interaction, and Unity XR experiments.', 'Lingkungan game Roblox Studio, inventory, movement, kendaraan, loop ekonomi, interaksi objek, dan eksperimen Unity XR.'],
    ['Prototype connection between virtual interaction and physical components including LED, buzzer, servo, and DHT11 sensor data.', 'Koneksi prototipe antara interaksi virtual dan komponen fisik termasuk LED, buzzer, servo, dan data sensor DHT11.'],
    ['Blender character animation with armature setup, Pose Mode keyframes, timing, camera framing, and digital persona visuals.', 'Animasi karakter Blender dengan pengaturan armature, keyframe Pose Mode, timing, framing kamera, dan visual persona digital.'],
    ['Portfolio proof · achievement archive', 'Bukti portofolio · arsip prestasi'],
    ['PU / PUDC', 'PU / PUDC'],
    ['Vocal Victory 2025', 'Vocal Victory 2025'],
    ['CSGO 2026', 'CSGO 2026'],
    ['Decode Your Brain Seminar', 'Seminar Decode Your Brain'],
    ['NEXCO PUNICO', 'NEXCO PUNICO'],
    ['Hello World', 'Hello World'],
    ['Bilateral Relations', 'Bilateral Relations'],
    ['Goes to School', 'Goes to School'],
    ['Personal portfolio of Gunando Dwi Kusuma with a dedicated e-certificate archive for participation, appreciation, recognition, and organizational contribution.', 'Portfolio personal Gunando Dwi Kusuma dengan arsip e-sertifikat khusus untuk partisipasi, apresiasi, penghargaan, dan kontribusi organisasi.'],
    ['virtual reality · internet of things · unity xr', 'virtual reality · internet of things · unity xr'],
    ['android application · guided reflection · ai assistance', 'aplikasi Android · refleksi terpandu · bantuan AI'],
    ['vr features', 'fitur VR'],
    ['iot features', 'fitur IoT'],
    ['system workflow', 'alur sistem'],
    ['application gallery', 'galeri aplikasi'],
    ['reflection flow', 'alur refleksi'],
    ['Backroom End.', 'Backroom End.'],
    ['Relaxplace Doragonnoid.', 'Relaxplace Doragonnoid.'],
    ['Character Animation Blender Study.', 'Studi Animasi Karakter Blender.'],
    ['Studi animasi karakter 3D dengan armature, Pose Mode, keyframe, timing, kamera, dan preview render di Blender.', 'Studi animasi karakter 3D dengan armature, Pose Mode, keyframe, timing, kamera, dan preview render di Blender.'],
    ['3D character animation study with armature, Pose Mode, keyframes, timing, camera, and render preview in Blender.', 'Studi animasi karakter 3D dengan armature, Pose Mode, keyframe, timing, kamera, dan preview render di Blender.'],
    ['Prototipe Unity XR yang menggabungkan snap turn, teleportation, hand controller, grab-and-throw, kontrol aktuator, dan data sensor IoT.', 'Prototipe Unity XR yang menggabungkan snap turn, teleportation, hand controller, grab-and-throw, kontrol aktuator, dan data sensor IoT.'],
    ['Unity XR prototype combining snap turn, teleportation, hand controller, grab-and-throw, actuator control, and IoT sensor data.', 'Prototipe Unity XR yang menggabungkan snap turn, teleportation, hand controller, grab-and-throw, kontrol aktuator, dan data sensor IoT.'],
    ['Buka halaman proyek untuk melihat alur komunikasi VR–IoT, pengaturan controller, fitur interaksi, dan galeri pengembangannya.', 'Buka halaman proyek untuk melihat alur komunikasi VR–IoT, pengaturan controller, fitur interaksi, dan galeri pengembangannya.'],
    ['Skill utama ditampilkan langsung melalui project: HTML, CSS, JavaScript, Roblox Studio, Blender, Unity XR, dan IoT prototype.', 'Skill utama ditampilkan langsung melalui project: HTML, CSS, JavaScript, Roblox Studio, Blender, Unity XR, dan IoT prototype.'],
    ['Core skills are shown directly through projects: HTML, CSS, JavaScript, Roblox Studio, Blender, Unity XR, and IoT prototype.', 'Skill utama ditampilkan langsung melalui project: HTML, CSS, JavaScript, Roblox Studio, Blender, Unity XR, dan IoT prototype.'],
    ['HTML · CSS · JavaScript', 'HTML · CSS · JavaScript'],
    ['desktop · tablet · mobile', 'desktop · tablet · mobile'],
    ['accordion · slider · modal · scroll UI', 'accordion · slider · modal · scroll UI'],
    ['Unity', 'Unity'],
    ['Virtual Reality', 'Virtual Reality'],
    ['XR Interaction Toolkit', 'XR Interaction Toolkit'],
    ['IoT', 'IoT'],
    ['Sensor Data', 'Data Sensor'],
    ['Android XR', 'Android XR'],
    ['Snap Turn', 'Snap Turn'],
    ['Teleportation', 'Teleportation'],
    ['VR–IoT Messaging', 'Pesan VR–IoT'],
    ['Controller input', 'Input controller'],
    ['Unity XR interaction', 'Interaksi Unity XR'],
    ['Send IoT message', 'Kirim pesan IoT'],
    ['LED · buzzer · servo', 'LED · buzzer · servo'],
    ['DHT11 sensor', 'Sensor DHT11'],
    ['Display in VR', 'Tampilkan di VR'],
    ['VR Laboratory Scene', 'Scene Laboratorium VR'],
    ['IoT Control Button', 'Tombol Kontrol IoT'],
    ['Grab & Throw Object', 'Objek Ambil & Lempar'],
    ['Controller & Hand Input', 'Input Controller & Tangan'],
    ['Engine', 'Engine'],
    ['Unity 6.3 LTS', 'Unity 6.3 LTS'],
    ['Platform', 'Platform'],
    ['Android XR · Virtual Reality', 'Android XR · Virtual Reality'],
    ['XR System', 'Sistem XR'],
    ['Locomotion', 'Locomotion'],
    ['Snap turn · teleportation', 'Snap turn · teleportation'],
    ['Interaction', 'Interaksi'],
    ['Hand input · grab · throw', 'Input tangan · ambil · lempar'],
    ['IoT Output', 'Output IoT'],
    ['IoT Input', 'Input IoT'],
    ['DHT11 temperature data', 'Data suhu DHT11'],
    ['Project Type', 'Tipe Proyek'],
    ['VR–IoT integration prototype', 'Prototipe integrasi VR–IoT'],
    ['Kenali emosi', 'Kenali emosi'],
    ['Recognize emotions', 'Kenali emosi'],
    ['Melihat sistem Reflection.', 'Melihat sistem Reflection.'],
    ['Viewing the Reflection system.', 'Melihat sistem Reflection.'],
    ['Personal Dashboard', 'Dashboard Personal'],
    ['Profile & Privacy', 'Profil & Privasi'],
    ['Identitas pengguna, statistik, akun cloud, keamanan, model refleksi, dan pengingat dalam satu halaman.', 'Identitas pengguna, statistik, akun cloud, keamanan, model refleksi, dan pengingat dalam satu halaman.'],
    ['User identity, statistics, cloud account, security, reflection model, and reminders in one page.', 'Identitas pengguna, statistik, akun cloud, keamanan, model refleksi, dan pengingat dalam satu halaman.'],
    ['Settings & Support', 'Pengaturan & Dukungan'],
    ['Accessible Display', 'Tampilan Aksesibel'],
    ['Pengaturan ukuran teks, tampilan, kontras tinggi, bold text, serta indikator yang tidak bergantung pada warna.', 'Pengaturan ukuran teks, tampilan, kontras tinggi, bold text, serta indikator yang tidak bergantung pada warna.'],
    ['Text size, display, high contrast, bold text, and indicators that do not depend on color.', 'Pengaturan ukuran teks, tampilan, kontras tinggi, bold text, serta indikator yang tidak bergantung pada warna.'],
    ['Color-vision Modes', 'Mode Penglihatan Warna'],
    ['Screen Reader & Voice', 'Screen Reader & Suara'],
    ['Inclusive Interaction', 'Interaksi Inklusif'],
    ['Notification & Support', 'Notifikasi & Dukungan'],
    ['Kontrol suara, getaran, pop-up, panduan pengguna, kontak dukungan, laporan aksesibilitas, dan reset pengaturan.', 'Kontrol suara, getaran, pop-up, panduan pengguna, kontak dukungan, laporan aksesibilitas, dan reset pengaturan.'],
    ['Voice controls, vibration, pop-ups, user guide, support contact, accessibility report, and reset settings.', 'Kontrol suara, getaran, pop-up, panduan pengguna, kontak dukungan, laporan aksesibilitas, dan reset pengaturan.'],
    ['AI Reflection Guide', 'Panduan Refleksi AI'],
    ['Pendamping percakapan dengan prompt awal, input suara, tombol salin, bagikan, dengarkan, dan akses dukungan.', 'Pendamping percakapan dengan prompt awal, input suara, tombol salin, bagikan, dengarkan, dan akses dukungan.'],
    ['Conversation companion with opening prompts, voice input, copy, share, listen buttons, and support access.', 'Pendamping percakapan dengan prompt awal, input suara, tombol salin, bagikan, dengarkan, dan akses dukungan.'],
    ['Guided Evaluation', 'Evaluasi Terpandu'],
    ['Development Tool', 'Tools Pengembangan'],
    ['Android Studio', 'Android Studio'],
    ['Core Modules', 'Modul Utama'],
    ['Home · Reflection · AI Guide · Progress · Profile', 'Beranda · Reflection · AI Guide · Progres · Profil'],
    ['Inclusive Features', 'Fitur Inklusif'],
    ['Visual · Voice · Navigation · Notifications', 'Visual · Suara · Navigasi · Notifikasi'],
    ['Hubungi Gunando Dwi Kusuma untuk berdiskusi tentang pengembangan aplikasi Android, pengalaman pengguna, fitur AI, aksesibilitas, website, atau proyek digital lainnya.', 'Hubungi Gunando Dwi Kusuma untuk berdiskusi tentang pengembangan aplikasi Android, pengalaman pengguna, fitur AI, aksesibilitas, website, atau proyek digital lainnya.'],
    ['Contact Gunando Dwi Kusuma to discuss Android app development, user experience, AI features, accessibility, websites, or other digital projects.', 'Hubungi Gunando Dwi Kusuma untuk berdiskusi tentang pengembangan aplikasi Android, pengalaman pengguna, fitur AI, aksesibilitas, website, atau proyek digital lainnya.']
  );
  translationEntries.push(
    ['↗', '↗'],
    ['gunandodwik@gmail.com', 'gunandodwik@gmail.com'],
    ['gunandodwii@gmail.com', 'gunandodwii@gmail.com'],
    ['CONTACT', 'KONTAK'],
    ['XR', 'XR'],
    ['Portfolio personal Gunando Dwi Kusuma with a dedicated e-certificate archive for participation, appreciation, recognition, and organizational contribution.', 'Portfolio personal Gunando Dwi Kusuma dengan arsip e-sertifikat khusus untuk partisipasi, apresiasi, penghargaan, dan kontribusi organisasi.'],
    ['· backroom end', '· backroom end'],
    ['· reflection', '· reflection'],
    ['· relaxplace doragonnoid', '· relaxplace doragonnoid'],
    ['· simple animation blender', '· simple animation blender'],
    ['Roblox Studio ·', 'Roblox Studio ·'],
    ['Blender ·', 'Blender ·'],
    ['Unity XR and IoT components ·', 'Komponen Unity XR dan IoT ·'],
    ['Android', 'Android'],
    ['AI Guide', 'AI Guide'],
    ['Accessibility', 'Aksesibilitas'],
    ['Privacy', 'Privasi'],
    ['roblox game · open world · interactive systems', 'game roblox · open world · sistem interaktif'],
    ['Roblox Studio', 'Roblox Studio'],
    ['Game Systems', 'Sistem Game'],
    ['Open World', 'Open World'],
    ['Vehicle Gameplay', 'Gameplay Kendaraan'],
    ['gameplay loop', 'loop gameplay'],
    ['Oriental Plaza', 'Plaza Oriental'],
    ['Lake Area', 'Area Danau'],
    ['Mountain Range', 'Pegunungan'],
    ['Forest Route', 'Rute Hutan'],
    ['City District', 'Area Kota'],
    ['Vehicle Showroom', 'Showroom Kendaraan'],
    ['Vehicle & Creature', 'Kendaraan & Makhluk'],
    ['Inventory System', 'Sistem Inventory'],
    ['Roblox', 'Roblox'],
    ['Core Systems', 'Sistem Utama'],
    ['Simple Animation', 'Animasi Sederhana'],
    ['Blender', 'Blender'],
    ['Armature', 'Armature'],
    ['Keyframe', 'Keyframe'],
    ['Character Pose', 'Pose Karakter'],
    ['Pose Mode', 'Pose Mode'],
    ['animation workflow', 'alur animasi'],
    ['animation preview', 'preview animasi'],
    ['Scene Overview', 'Ringkasan Scene'],
    ['Pose & Keyframe', 'Pose & Keyframe'],
    ['Software', 'Software'],
    ['Blender 4.3.2', 'Blender 4.3.2'],
    ['Animation Method', 'Metode Animasi'],
    ['Main Motion', 'Gerakan Utama'],
    ['Output', 'Output'],
    ['Your message was successfully sent to', 'Pesan Anda berhasil dikirim ke'],
    ['. Gunando will reply through the email address you provided.', '. Gunando akan membalas melalui alamat email yang Anda cantumkan.'],
    ['Open the project page to see the VR-IoT communication flow, controller setup, interaction features, and development gallery.', 'Buka halaman proyek untuk melihat alur komunikasi VR–IoT, pengaturan controller, fitur interaksi, dan galeri pengembangannya.']
  );
  translationEntries.push(
    ['Toggle English language', 'Ubah bahasa Inggris'],
    ['Send a project message.', 'Kirim pesan proyek.'],
    ['Use this form to send collaboration, web project, content, or creative opportunity messages directly to Gunando email.', 'Gunakan formulir ini untuk mengirim pesan kolaborasi, proyek web, konten, atau peluang kreatif langsung ke email Gunando.'],
    ['Complete name, valid email, and message.', 'Lengkapi nama, email yang valid, dan pesan.'],
    ['Sending message...', 'Mengirim pesan...'],
    ['sending...', 'mengirim...'],
    ['Turn audio off', 'Matikan audio'],
    ['Turn audio on', 'Nyalakan audio'],
    ['Click again to activate audio', 'Klik lagi untuk mengaktifkan audio'],
    ['mute ambient audio', 'matikan audio ambient'],
    ['GDK ARCHIVE', 'ARSIP GDK']
  );
  const translationMap = new Map();
  translationEntries.forEach(([en, id]) => {
    translationMap.set(en, { en, id });
    translationMap.set(id, { en, id });
  });
  const currentLanguage = () => getSavedLanguage() === 'en' ? 'en' : 'id';
  const textFor = value => translationMap.get(value)?.[currentLanguage()] || value;
  window.gdkText = textFor;
  const shouldSkipTranslate = node => {
    const parent = node.parentElement;
    return !parent || parent.closest('script,style,noscript,[data-no-translate],.lang-toggle');
  };
  const replaceTextPreserveSpace = (value, next) => {
    const leading = value.match(/^\s*/)?.[0] || '';
    const trailing = value.match(/\s*$/)?.[0] || '';
    return `${leading}${next}${trailing}`;
  };
  const translatePage = lang => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'id';
    body.classList.toggle('lang-en', lang === 'en');
    qsa('.lang-toggle').forEach(btn => {
      btn.classList.toggle('is-active', lang === 'en');
      btn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
    });
    const titleEntry = translationMap.get(document.title.trim());
    if (titleEntry) document.title = titleEntry[lang];
    const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (shouldSkipTranslate(node)) return;
      const raw = node.nodeValue;
      const key = raw.replace(/\s+/g, ' ').trim();
      if (!key) return;
      const entry = translationMap.get(key);
      if (entry) node.nodeValue = replaceTextPreserveSpace(raw, entry[lang]);
    });
    ['placeholder', 'aria-label', 'alt', 'title'].forEach(attr => {
      qsa(`[${attr}]`).forEach(el => {
        const key = el.getAttribute(attr)?.replace(/\s+/g, ' ').trim();
        const entry = key ? translationMap.get(key) : null;
        if (entry) el.setAttribute(attr, entry[lang]);
      });
    });
    qsa('meta[name="description"]').forEach(el => {
      const key = el.getAttribute('content')?.replace(/\s+/g, ' ').trim();
      const entry = key ? translationMap.get(key) : null;
      if (entry) el.setAttribute('content', entry[lang]);
    });
  };
  const ensureLanguageToggle = () => {
    qsa('.header-actions').forEach(actions => {
      if (qs('.lang-toggle', actions)) return;
      const btn = document.createElement('button');
      btn.className = 'lang-toggle';
      btn.type = 'button';
      btn.textContent = 'EN';
      btn.dataset.noTranslate = 'true';
      btn.setAttribute('aria-label', 'Toggle English language');
      btn.setAttribute('aria-pressed', 'false');
      const menuButton = qs('[data-menu-open]', actions);
      actions.insertBefore(btn, menuButton || null);
      btn.addEventListener('click', () => {
        const next = getSavedLanguage() === 'en' ? 'id' : 'en';
        saveLanguage(next);
        translatePage(next);
      });
    });
  };
  const ensureContactModal = () => {
    const existing = qs('#contactModal');
    if (existing) return existing;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'contactModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'contactTitle');
    modal.innerHTML = `
      <div class="modal-panel">
        <button class="modal-close" data-modal-close type="button">close</button>
        <div class="eyebrow">contact</div>
        <h2 id="contactTitle">Send a project message.</h2>
        <p>Gunakan formulir ini untuk mengirim pesan kolaborasi, proyek web, konten, atau peluang kreatif langsung ke email Gunando.</p>
        <form action="https://formsubmit.co/gunandodwik@gmail.com" class="contact-form" method="POST">
          <input name="_subject" type="hidden" value="Pesan baru dari website portfolio Gunando Dwi Kusuma">
          <input name="_template" type="hidden" value="table">
          <input name="_autoresponse" type="hidden" value="Terima kasih. Pesan Anda telah diterima melalui website portfolio Gunando Dwi Kusuma dan akan dibalas sesegera mungkin.">
          <input aria-hidden="true" autocomplete="off" class="form-honeypot" name="_honey" tabindex="-1" type="text">
          <div class="field"><label for="modalName">Nama</label><input autocomplete="name" id="modalName" name="name" required></div>
          <div class="field"><label for="modalEmail">Email</label><input autocomplete="email" id="modalEmail" name="email" required type="email"></div>
          <div class="field field--full"><label for="modalSubject">Subjek</label><input id="modalSubject" name="subject" placeholder="Website, kolaborasi, atau konten"></div>
          <div class="field field--full"><label for="modalMessage">Pesan</label><textarea id="modalMessage" name="message" required></textarea></div>
          <div class="form-actions"><span aria-live="polite" class="form-status">Pesan akan dikirim langsung ke gunandodwik@gmail.com.</span><button class="submit-button" type="submit">send<br>message</button></div>
        </form>
      </div>`;
    body.appendChild(modal);
    return modal;
  };

  // Preloader
  const preloader = qs('.preloader');
  const countEl = qs('.preloader__count');
  const barEl = qs('.preloader__bar span');
  let count = 0;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tick = () => {
    count = Math.min(100, count + Math.ceil(Math.random() * 12));
    if (countEl) countEl.textContent = `${String(count).padStart(3, '0')}%`;
    if (barEl) barEl.style.width = `${count}%`;
    if (count < 100) setTimeout(tick, reducedMotion ? 10 : 65);
  };
  tick();
  window.addEventListener('load', () => {
    setTimeout(() => preloader?.classList.add('is-hidden'), reducedMotion ? 0 : 350);
  });
  setTimeout(() => preloader?.classList.add('is-hidden'), 2400);

  // Custom cursor
  const cursor = qs('.cursor');
  const dot = qs('.cursor-dot');
  if (cursor && dot && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    window.addEventListener('pointermove', e => {
      cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`;
      dot.style.left = `${e.clientX}px`; dot.style.top = `${e.clientY}px`;
    });
    qsa('a, button, input, textarea, .slide-card').forEach(el => {
      el.addEventListener('pointerenter', () => cursor.classList.add('is-active'));
      el.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
    });
  }

  // Menu overlay
  const menu = qs('#menuOverlay');
  const openMenuButtons = qsa('[data-menu-open]');
  const closeMenuButtons = qsa('[data-menu-close]');
  const openMenu = () => {
    menu?.classList.add('is-open'); body.classList.add('menu-open');
    openMenuButtons.forEach(btn => btn.setAttribute('aria-expanded', 'true'));
  };
  const closeMenu = () => {
    menu?.classList.remove('is-open'); body.classList.remove('menu-open');
    openMenuButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
  };
  openMenuButtons.forEach(btn => btn.addEventListener('click', openMenu));
  closeMenuButtons.forEach(btn => btn.addEventListener('click', closeMenu));
  qsa('.menu-list a').forEach(link => link.addEventListener('click', closeMenu));

  // Contact modal
  const modal = ensureContactModal();
  ensureLanguageToggle();
  translatePage(getSavedLanguage() === 'en' ? 'en' : 'id');
  const openModalButtons = qsa('[data-modal-open]');
  const closeModalButtons = qsa('[data-modal-close]');
  const openModal = () => {
    modal?.classList.add('is-open'); body.classList.add('modal-open');
    setTimeout(() => qs('input', modal)?.focus(), 150);
  };
  const closeModal = () => { modal?.classList.remove('is-open'); body.classList.remove('modal-open'); };
  openModalButtons.forEach(btn => btn.addEventListener('click', openModal));
  closeModalButtons.forEach(btn => btn.addEventListener('click', closeModal));
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeMenu(); closeModal(); }
  });

  // Header behavior and scroll progress
  const header = qs('.site-header');
  const progress = qs('.scroll-progress');
  const outreachTimeline = qs('[data-outreach-timeline] span');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-solid', y > 60);
    header?.classList.toggle('is-hidden', y > lastY && y > 500 && !body.classList.contains('menu-open'));
    lastY = y;
    if (progress) {
      const max = document.documentElement.scrollHeight - innerHeight;
      const amount = max > 0 ? (y / max) * 100 : 0;
      progress.style.width = `${amount}%`;
      if (outreachTimeline) outreachTimeline.style.width = `${amount}%`;
    }
    qsa('[data-parallax]').forEach(el => {
      const speed = Number(el.dataset.parallax || 0.08);
      const rect = el.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) el.style.transform = `translate3d(0, ${rect.top * speed}px, 0)`;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const reveals = qsa('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: .14, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // Counters
  qsa('[data-counter]').forEach(el => {
    const target = Number(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    let started = false;
    const run = () => {
      if (started) return; started = true;
      const start = performance.now();
      const duration = 1100;
      const step = now => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = `${Math.floor(target * eased)}${suffix}`;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { run(); io.disconnect(); }
      }), { threshold: .6 });
      io.observe(el);
    } else run();
  });

  // Horizontal slider
  qsa('[data-slider]').forEach(slider => {
    const id = slider.id;
    qsa(`[data-slider-prev="${id}"]`).forEach(btn => btn.addEventListener('click', () => slider.scrollBy({ left: -slider.clientWidth * .78, behavior: 'smooth' })));
    qsa(`[data-slider-next="${id}"]`).forEach(btn => btn.addEventListener('click', () => slider.scrollBy({ left: slider.clientWidth * .78, behavior: 'smooth' })));
    let down = false, startX = 0, scrollLeft = 0;
    slider.addEventListener('pointerdown', e => { down = true; startX = e.clientX; scrollLeft = slider.scrollLeft; slider.setPointerCapture?.(e.pointerId); });
    slider.addEventListener('pointermove', e => { if (down) slider.scrollLeft = scrollLeft - (e.clientX - startX); });
    ['pointerup','pointercancel','pointerleave'].forEach(event => slider.addEventListener(event, () => down = false));
  });

  // Hero audio. Browsers require user interaction before playback.
  const soundButton = qs('[data-sound-toggle]');
  const audio = qs('#ambientAudio');
  soundButton?.addEventListener('click', async () => {
    if (!audio) return;
    try {
        if (audio.paused) { await audio.play(); soundButton.setAttribute('aria-label', textFor('Turn audio off')); soundButton.classList.add('is-playing'); }
        else { audio.pause(); soundButton.setAttribute('aria-label', textFor('Turn audio on')); soundButton.classList.remove('is-playing'); }
      } catch { soundButton.title = textFor('Click again to activate audio'); }
  });

  // Contact form delivery through FormSubmit.
  qsa('.contact-form').forEach(form => {
    // Use a branded thank-you page when the website is served over HTTP/HTTPS.
    if (/^https?:$/.test(window.location.protocol)) {
      const next = document.createElement('input');
      next.type = 'hidden';
      next.name = '_next';
      next.value = new URL('thanks.html', window.location.href).href;
      form.appendChild(next);
    }

    form.addEventListener('submit', e => {
      const status = qs('.form-status', form);
      const submitButton = qs('.submit-button', form);

      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        if (status) status.textContent = textFor('Complete name, valid email, and message.');
        return;
      }

      if (status) status.textContent = textFor('Sending message...');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = textFor('sending...');
      }
    });
  });

  // Set current year
  qsa('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();

// GDK Professional Portfolio interactions
(() => {
  'use strict';

  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSignalHome = document.body.classList.contains('outreach-home');
  if (!isSignalHome) return;

  // Lightweight animated starfield; uses no external library and pauses in hidden tabs.
  const canvas = qs('#signalStars');
  if (canvas) {
    const ctx = canvas.getContext('2d', { alpha: true });
    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars = [];
    let animationId = 0;

    const buildStars = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(55, Math.min(150, Math.floor((width * height) / 11000)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.15 + .15,
        speed: Math.random() * .07 + .018,
        alpha: Math.random() * .55 + .15,
        phase: Math.random() * Math.PI * 2
      }));
    };

    const draw = (time = 0) => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        star.y += star.speed;
        if (star.y > height + 3) { star.y = -3; star.x = Math.random() * width; }
        const flicker = reducedMotion ? star.alpha : star.alpha * (.72 + Math.sin(time * .001 + star.phase) * .28);
        ctx.beginPath();
        ctx.fillStyle = `rgba(231,227,216,${Math.max(.05, flicker)})`;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reducedMotion && !document.hidden) animationId = requestAnimationFrame(draw);
    };

    const restart = () => {
      cancelAnimationFrame(animationId);
      buildStars();
      draw();
    };
    restart();
    window.addEventListener('resize', restart, { passive: true });
    document.addEventListener('visibilitychange', () => {
      cancelAnimationFrame(animationId);
      if (!document.hidden) draw();
    });
  }

  // Active chapter rail and HUD counter.
  const chapters = qsa('.signal-chapter');
  const chapterLinks = qsa('[data-chapter-link]');
  const chapterCounter = qs('[data-chapter-counter]');
  const frameObject = qs('[data-frame-object]');
  const frameTitle = qs('[data-frame-title]');
  const frameThumbs = qsa('.outreach-thumbs span');
  const chapterMax = chapters.reduce((max, section) => {
    const value = Number(section.dataset.chapter || 0);
    return Number.isFinite(value) ? Math.max(max, value) : max;
  }, 0);
  const formatChapter = value => String(value).padStart(2, '0');
  const setActiveChapter = section => {
    const id = section.id;
    const value = Number(section.dataset.chapter || 0);
    chapterLinks.forEach(link => link.classList.toggle('is-active', link.dataset.chapterLink === id));
    if (chapterCounter) chapterCounter.textContent = `${formatChapter(value)} / ${formatChapter(chapterMax)}`;
    if (frameObject) frameObject.textContent = section.dataset.frameObject || `Object ${formatChapter(value)}`;
    if (frameTitle) frameTitle.textContent = section.dataset.frameTitle || id;
    frameThumbs.forEach((thumb, index) => thumb.classList.toggle('is-active', index === Math.min(frameThumbs.length - 1, value)));
  };
  if ('IntersectionObserver' in window && chapters.length) {
    const chapterObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveChapter(visible.target);
    }, { threshold: [.2, .45, .68], rootMargin: '-18% 0px -38% 0px' });
    chapters.forEach(section => chapterObserver.observe(section));
  } else if (chapters[0]) setActiveChapter(chapters[0]);

  // Draggable dual-face identity object.
  const stage = qs('[data-object-stage]');
  const object = qs('[data-signal-object]');
  if (stage && object && !reducedMotion) {
    let rotationX = -5;
    let rotationY = -14;
    let velocity = .08;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastMove = performance.now();

    const renderObject = () => {
      if (!dragging) {
        rotationY += velocity;
        velocity *= .995;
        if (Math.abs(velocity) < .025) velocity = .025;
      }
      object.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
      requestAnimationFrame(renderObject);
    };
    renderObject();

    stage.addEventListener('pointerdown', event => {
      if (!event.target.closest('[data-signal-object]')) return;
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      lastMove = performance.now();
      velocity = 0;
      object.setPointerCapture?.(event.pointerId);
    });
    stage.addEventListener('pointermove', event => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      const elapsed = Math.max(8, performance.now() - lastMove);
      rotationY += dx * .38;
      rotationX = Math.max(-28, Math.min(28, rotationX - dy * .18));
      velocity = (dx / elapsed) * 1.8;
      lastX = event.clientX;
      lastY = event.clientY;
      lastMove = performance.now();
    });
    const release = () => { dragging = false; };
    stage.addEventListener('pointerup', release);
    stage.addEventListener('pointercancel', release);
  }

  // Hero fragments respond subtly to pointer movement, echoing the reference site's observatory feel.
  const hero = qs('.signal-hero');
  const fragments = qsa('.signal-fragment');
  const objectCode = qs('.outreach-object-code');
  if (hero && !reducedMotion && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    hero.addEventListener('pointermove', event => {
      const x = event.clientX / window.innerWidth - .5;
      const y = event.clientY / window.innerHeight - .5;
      fragments.forEach((fragment, index) => {
        const depth = index === 0 ? 22 : -18;
        fragment.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0) rotate(${x * 8}deg)`;
      });
      if (objectCode) {
        objectCode.style.transform = `translate(-50%,-50%) translate3d(${x * -18}px, ${y * -10}px, 0)`;
      }
    });
    hero.addEventListener('pointerleave', () => {
      fragments.forEach(fragment => { fragment.style.transform = ''; });
      if (objectCode) objectCode.style.transform = 'translate(-50%,-50%)';
    });
  }

  // Capability accordion.
  qsa('.capability-row').forEach(row => {
    const button = qs('button', row);
    button?.addEventListener('click', () => {
      const accordion = row.closest('[data-accordion]');
      qsa('.capability-row', accordion).forEach(item => {
        const shouldOpen = item === row ? !item.classList.contains('is-open') : false;
        item.classList.toggle('is-open', shouldOpen);
        qs('button', item)?.setAttribute('aria-expanded', String(shouldOpen));
      });
    });
  });

  // Subtle depth response on project observations.
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reducedMotion) {
    qsa('[data-tilt-card]').forEach(card => {
      const media = qs('.observation-card__media img', card);
      const content = qs('.observation-card__content', card);
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        if (media) media.style.transform = `scale(1.07) translate3d(${x * -10}px,${y * -8}px,0)`;
        if (content) content.style.transform = `translate3d(${x * 8}px,${y * 6}px,0)`;
      });
      card.addEventListener('pointerleave', () => {
        if (media) media.style.transform = '';
        if (content) content.style.transform = '';
      });
    });
  }

  // Keep audio copy in sync with the existing audio controller.
  const audio = qs('#ambientAudio');
  const soundButton = qs('[data-sound-toggle]');
  const soundLabel = qs('[data-sound-label]');
  const updateSoundLabel = () => {
    if (!soundLabel || !audio || !soundButton) return;
    const active = !audio.paused;
    const translate = window.gdkText || (value => value);
    soundLabel.textContent = translate(active ? 'mute ambient audio' : 'optional ambient audio');
    soundButton.classList.toggle('is-playing', active);
  };
  audio?.addEventListener('play', updateSoundLabel);
  audio?.addEventListener('pause', updateSoundLabel);
  soundButton?.addEventListener('click', () => setTimeout(updateSoundLabel, 30));

  // Keyboard chapter navigation for desktop presentation mode.
  document.addEventListener('keydown', event => {
    const tag = document.activeElement?.tagName;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || document.body.classList.contains('modal-open') || document.body.classList.contains('menu-open')) return;
    if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(event.key)) return;
    const center = window.scrollY + window.innerHeight * .42;
    let currentIndex = chapters.findIndex(section => center >= section.offsetTop && center < section.offsetTop + section.offsetHeight);
    if (currentIndex < 0) currentIndex = 0;
    const direction = ['ArrowDown', 'PageDown'].includes(event.key) ? 1 : -1;
    const target = chapters[Math.max(0, Math.min(chapters.length - 1, currentIndex + direction))];
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  });
})();

// Shared transitions and page telemetry across the portfolio.
(() => {
  'use strict';
  const body = document.body;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const transition = document.createElement('div');
  transition.className = 'page-transition';
  transition.setAttribute('aria-hidden', 'true');
  body.appendChild(transition);

  const pageName = document.title.split('—')[0].trim() || 'Portfolio';
  const telemetry = document.createElement('div');
  telemetry.className = 'global-signal-tag';
  telemetry.setAttribute('aria-hidden', 'true');
  const telemetryLabel = window.gdkText ? window.gdkText('GDK ARCHIVE') : 'GDK ARCHIVE';
  telemetry.textContent = `${telemetryLabel} / ${pageName.toUpperCase()}`;
  body.appendChild(telemetry);

  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank' || link.hasAttribute('download')) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin && window.location.protocol !== 'file:') return;
      if (url.pathname === window.location.pathname && url.hash) return;
      event.preventDefault();
      body.classList.add('is-leaving');
      window.setTimeout(() => { window.location.href = url.href; }, reducedMotion ? 0 : 560);
    });
  });
})();
