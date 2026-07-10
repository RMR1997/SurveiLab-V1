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
