import { StartupIdea } from '@/types/survey'

export const startupIdeas: StartupIdea[] = [
  {
    id: '1',
    slug: 'produsen-nusantara',
    name: 'Produsen Nusantara',
    tagline: 'Hubungkan Petani Langsung dengan Buyer',
    description: 'Platform yang menghubungkan petani, peternak, nelayan, dan UMKM secara langsung dengan restoran, hotel, distributor, industri, maupun buyer. Dengan menghilangkan perantara yang berlebihan, produsen memperoleh harga yang lebih adil sementara pembeli mendapatkan pasokan yang lebih efisien dan berkualitas.',
    motivation: 'Kami merasa prihatin melihat petani dan UMKM di daerah — mereka sudah bekerja keras menanam dan memproduksi barang, tetapi saat dijual harganya ditekan habis-habisan oleh tengkulak. Sementara pabrik atau restoran di kota membelinya dengan sangat mahal. Kami ingin memotong rantai perantara tersebut agar produsen mendapatkan harga yang adil dan pembeli memperoleh pasokan dengan harga lebih efisien.',
    benefits: 'Petani bisa cuan lebih banyak, industri hemat pengeluaran, dan uang berputar langsung di daerah — tanpa harus ada pihak ketiga yang makan di tengah.',
    challenges: 'Verifikasi fisik di awal cukup berat — kita harus datang langsung ke lokasi produsen buat bikin video verifikasi. Kalau lokasinya jauh di daerah, lumayan makan waktu dan biaya transport.',
    iconUrl: '/icons/produsen.svg',
    mockupUrl: '/images/ProdusenNusantara.JPG',
    colorPrimary: '#10B981',
    sortOrder: 1,
    isActive: true,
    customQuestion: 'Di mana Anda biasanya mencari atau membeli produk segar (sayur, buah, daging) langsung dari produsen pertama?',
    customOptions: [
      'Pasar tradisional lokal',
      'Supplier / Distributor konvensional',
      'Melalui grup WhatsApp / Sosial Media (Facebook, Instagram)',
      'Supermarket besar',
      'Belum menemukan produsen langsung, beli lewat perantara'
    ],
    q1ProblemText: 'Seberapa sering Anda merasa dirugikan oleh harga bahan pangan yang mahal atau kualitas yang kurang segar akibat rantai distribusi yang terlalu panjang?',
    q2ExperienceText: 'Apakah Anda (atau keluarga/teman) pernah kesulitan mendapatkan sayur, buah, atau daging segar langsung dari petani/peternak pertama?',
    q3UsefulnessText: 'Seberapa membantu platform ini jika bisa menjamin Anda mendapatkan produk segar langsung dari petani dengan harga lebih murah?',
    q5UrgencyText: 'Seberapa mendesak kehadiran platform penghubung produsen langsung seperti ini untuk segera diwujudkan di Indonesia?'
  },
  {
    id: '2',
    slug: 'mahasiswa-bantu',
    name: 'MahasiswaBantu.id',
    tagline: 'Mahasiswa Bantu UMKM Tumbuh',
    description: 'Platform yang mempertemukan mahasiswa dengan UMKM maupun individu yang membutuhkan bantuan pekerjaan ringan. Dari packing, admin, desain grafis, dokumentasi, hingga pekerjaan harian dengan sistem yang fleksibel sesuai jadwal kuliah. Dapatkan pengalaman kerja sambil membantu ekonomi lokal.',
    motivation: 'Banyak mahasiswa yang membutuhkan uang saku tambahan untuk biaya hidup atau kuliah, namun jadwal akademik mereka tidak menentu. Di sisi lain, banyak pelaku UMKM lokal membutuhkan bantuan untuk pekerjaan ringan secara fleksibel tetapi tidak memiliki anggaran untuk menyewa tenaga profesional. Kami ingin menciptakan wadah yang adil bagi mahasiswa untuk mendapatkan pengalaman kerja nyata sesuai kapasitas mereka.',
    benefits: 'Mahasiswa dapat kerjaan fleksibel yang aman (wajib verifikasi KTM), dan UMKM dapat bantuan dengan harga terjangkau. Win-win solution yang saling menguntungkan tanpa perlu modal besar di kedua sisi.',
    challenges: 'Di awal susah dapet banyak lowongan biar mahasiswanya mau daftar, dan sebaliknya. Plus harus siap mental kalau ada mahasiswa yang tiba-tiba absen karena ujian dadakan.',
    iconUrl: '/icons/mahasiswa.svg',
    mockupUrl: '/images/MahasiswaBantu.JPG',
    colorPrimary: '#8B5CF6',
    sortOrder: 2,
    isActive: true,
    customQuestion: 'Di mana Anda biasanya mencari atau menawarkan pekerjaan sampingan/harian?',
    customOptions: [
      'Platform freelance (Fiverr, Projects.co.id, Fastwork, dll)',
      'Sosial Media (X/Twitter, Instagram, LinkedIn)',
      'Rekomendasi teman / Grup angkatan kuliah',
      'Mading kampus / Info internal kemahasiswaan',
      'Belum tahu harus mencari di mana'
    ],
    q1ProblemText: 'Menurut Anda, seberapa sulit mahasiswa mencari uang saku tambahan yang aman, atau UMKM mencari bantuan tenaga harian yang murah?',
    q2ExperienceText: 'Apakah Anda (sebagai mahasiswa/pelaku usaha) pernah kesulitan mencari kerja sampingan yang fleksibel atau mencari asisten harian?',
    q3UsefulnessText: 'Seberapa membantu platform ini dalam membuka lapangan kerja harian bagi mahasiswa sekaligus mempermudah UMKM menyelesaikan kerjaan ringannya?',
    q5UrgencyText: 'Seberapa mendesak kebutuhan wadah penyedia kerja harian mahasiswa (seperti MahasiswaBantu.id) untuk diluncurkan secepatnya?'
  },
  {
    id: '3',
    slug: 'pantau-kita',
    name: 'PantauKita',
    tagline: 'Awasi Pembangunan Bersama',
    description: 'Platform yang mendokumentasikan kondisi jalan rusak, jembatan, sekolah, dan fasilitas umum lainnya. Masyarakat dapat melaporkan, memantau, dan mengawasi pembangunan secara transparan. Membangun arsip digital infrastruktur Indonesia untuk generasi mendatang.',
    motivation: 'Kami prihatin melihat infrastruktur publik seperti jalan rusak atau jembatan terbengkalai yang sering kali baru diperbaiki setelah viral di media sosial. Kami ingin menyediakan wadah pengarsipan independen yang rapi untuk mendokumentasikan kondisi tersebut secara transparan agar ada rekam jejak digital yang konkret untuk menagih komitmen pembangunan.',
    benefits: 'Masyarakat dapat transparansi dan kontrol sosial yang nyata. Ada rekam jejak digital yang bisa dijadikan bukti konkret saat menagih janji pembangunan dari pemerintah.',
    challenges: 'Risiko hukum cukup bikin deg-degan. Di Indonesia, kritik terhadap fasilitas umum rawan kena pasal pencemaran nama baik. Kurasi konten dan cara penyampaian bahasa harus super hati-hati.',
    iconUrl: '/icons/pantau.svg',
    mockupUrl: '/images/PantauKita.JPG',
    colorPrimary: '#F59E0B',
    sortOrder: 3,
    isActive: true,
    customQuestion: 'Ke mana Anda biasanya melaporkan keluhan tentang fasilitas umum yang rusak?',
    customOptions: [
      'Melaporkannya langsung ke RT/RW atau Kelurahan',
      'Mengunggahnya ke sosial media (Instagram, Twitter, TikTok)',
      'Aplikasi resmi pemerintah (JAKI, Lapor.go.id, dll)',
      'Hanya mengeluh ke teman/keluarga saja',
      'Biarkannya saja karena bingung harus melapor ke mana'
    ],
    q1ProblemText: 'Seberapa sering Anda merasa terganggu atau bahaya oleh fasilitas umum yang rusak (jalan berlubang, jembatan rusak, lampu jalan mati) di sekitar Anda?',
    q2ExperienceText: 'Apakah Anda atau orang terdekat Anda pernah mengalami kerugian atau kecelakaan akibat kerusakan fasilitas umum di jalan?',
    q3UsefulnessText: 'Seberapa bermanfaat platform ini jika bisa mendokumentasikan jalan/jembatan rusak secara independen agar mendesak pemerintah segera memperbaikinya?',
    q5UrgencyText: 'Seberapa mendesak kehadiran wadah pemantau infrastruktur independen seperti PantauKita bagi kenyamanan masyarakat saat ini?'
  },
  {
    id: '4',
    slug: 'export-hub',
    name: 'ExportHub Indonesia',
    tagline: 'Bawa Produk Indonesia ke Dunia',
    description: 'Platform yang membantu petani, peternak, nelayan, dan UMKM mendapatkan akses ke pasar ekspor. Terhubung dengan eksportir Indonesia maupun buyer internasional, dapatkan pendampingan ekspor lengkap, dan pelajari standar ekspor yang diperlukan. Buka peluang pasar yang lebih luas untuk produk lokal berkualitas.',
    motivation: 'Produk lokal Indonesia memiliki kualitas luar biasa, namun banyak produsen lokal tidak mengetahui cara mengakses pasar global karena informasi ekspor yang rumit dan mahal. Kami ingin membangun jembatan informasi dan menghubungkan mereka dengan jaringan eksportir berpengalaman serta pembeli internasional tanpa biaya konsultasi yang membebani.',
    benefits: 'UMKM dan petani bisa menjangkau pasar yang jauh lebih besar dari sekadar lokal — harga jual ke buyer internasional pun biasanya jauh lebih tinggi. Produk Indonesia bisa go global tanpa harus menunggu ada investor besar yang turun tangan.',
    challenges: 'Standar kualitas dan regulasi ekspor tiap negara berbeda-beda dan bisa berubah sewaktu-waktu. Selain itu, kendala bahasa dan kepercayaan antara UMKM lokal dengan buyer asing jadi tantangan tersendiri yang harus dijembatani dengan baik.',
    iconUrl: '/icons/export.svg',
    mockupUrl: '/images/ExportHub.jpg',
    colorPrimary: '#3B82F6',
    sortOrder: 4,
    isActive: true,
    customQuestion: 'Di mana Anda biasanya mencari informasi/buyer untuk keperluan ekspor produk?',
    customOptions: [
      'Website resmi kementerian/instansi pemerintah (Kemenkop, Kemendag)',
      'Asosiasi ekspor atau komunitas bisnis ekspor',
      'Seminar / Kursus ekspor berbayar',
      'Googling / Mencari mandiri di YouTube',
      'Belum pernah mencari tahu'
    ],
    q1ProblemText: 'Seberapa sulit menurut Anda bagi pelaku UMKM/petani lokal untuk menembus pasar ekspor luar negeri secara mandiri?',
    q2ExperienceText: 'Apakah Anda atau kenalan pebisnis Anda pernah mengalami kebuntuan informasi/jalur saat ingin mencoba mengekspor produk lokal?',
    q3UsefulnessText: 'Seberapa terbantu UMKM jika platform ini bisa memberikan pendampingan standar ekspor dan menghubungkan mereka langsung dengan pembeli asing?',
    q5UrgencyText: 'Seberapa mendesak kebutuhan akan pusat informasi dan pendampingan ekspor terbuka seperti ExportHub untuk mendongkrak produk lokal?'
  },
  {
    id: '5',
    slug: 'global-path',
    name: 'GlobalPath.id',
    tagline: 'Persiapkan Masa Depan Globalmu',
    description: 'Platform yang membantu masyarakat Indonesia mempersiapkan studi maupun pekerjaan di luar negeri. Dapatkan checklist dokumen lengkap, panduan langkah demi langkah, dan informasi terkini yang mudah dipahami. Wujudkan impian karier internasional Anda.',
    motivation: 'Banyak generasi muda Indonesia bermimpi melanjutkan studi atau karier di luar negeri, tetapi kesulitan menyusun dokumen karena informasi yang tersebar tidak terstruktur. Kami ingin menghadirkan asisten otomatis yang membantu mereka menyiapkan kelengkapan dokumen secara mandiri dan terarah.',
    benefits: 'Membantu jutaan anak muda meraih mimpi global secara mandiri — tanpa harus keluar biaya mahal untuk agen konsultan yang sebenarnya bisa digantikan dengan informasi yang tersusun rapi.',
    challenges: 'Syarat visa dan aturan beasiswa sering berubah tiap tahun — harus rutin update datanya biar informasi di website tidak kedaluwarsa.',
    iconUrl: '/icons/global.svg',
    mockupUrl: '/images/GlobalPath.JPG',
    colorPrimary: '#EC4899',
    sortOrder: 5,
    isActive: true,
    customQuestion: 'Di mana Anda biasanya mencari informasi tepercaya tentang beasiswa/kerja ke luar negeri?',
    customOptions: [
      'Agen konsultan pendidikan / kerja luar negeri (berbayar)',
      'Akun edukasi / influencer di sosial media (TikTok, Instagram, YouTube)',
      'Website resmi universitas atau kedutaan besar negara tujuan',
      'Forum / komunitas pemburu beasiswa (Schoters, Kobi, dll)',
      'Googling sendiri secara acak'
    ],
    q1ProblemText: 'Seberapa pusing atau bingung Anda saat harus mencari tahu syarat dokumen, visa, dan langkah mandiri untuk kuliah/kerja ke luar negeri?',
    q2ExperienceText: 'Apakah Anda atau teman terdekat Anda saat ini sedang atau pernah berjuang mempersiapkan syarat dokumen untuk ke luar negeri?',
    q3UsefulnessText: 'Seberapa terbantu Anda jika ada platform yang menyediakan checklist dokumen lengkap dan panduan terstruktur langkah-demi-langkah ke luar negeri?',
    q5UrgencyText: 'Seberapa mendesak kehadiran asisten panduan dokumen mandiri seperti GlobalPath.id bagi generasi muda Indonesia saat ini?'
  },
]


export const getIdeaBySlug = (slug: string): StartupIdea | undefined => {
  return startupIdeas.find((idea) => idea.slug === slug)
}

export const getAllIdeas = (): StartupIdea[] => {
  return startupIdeas.filter((idea) => idea.isActive).sort((a, b) => a.sortOrder - b.sortOrder)
}

export const getIdeaIndex = (slug: string): number => {
  return getAllIdeas().findIndex((idea) => idea.slug === slug)
}
