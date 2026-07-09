import { StartupIdea } from '@/types/survey'

export const startupIdeas: StartupIdea[] = [
  {
    id: '1',
    slug: 'produsen-nusantara',
    name: 'Produsen Nusantara',
    tagline: 'Hubungkan Petani Langsung dengan Buyer',
    description: 'Platform yang menghubungkan petani, peternak, nelayan, dan UMKM secara langsung dengan restoran, hotel, distributor, industri, maupun buyer. Dengan menghilangkan perantara yang berlebihan, produsen memperoleh harga yang lebih adil sementara pembeli mendapatkan pasokan yang lebih efisien dan berkualitas.',
    motivation: 'Kasihan banget liat petani sama UMKM di daerah — mereka udah kerja keras nanem dan bikin barang, tapi pas dijual malah diteken habis-habisan harganya sama tengkulak. Sementara pabrik atau restoran di kota belinya mahal banget. Gue pengen potong jalur itu biar petani dapet harga adil dan industri dapet barang lebih murah.',
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
    motivation: 'Banyak banget mahasiswa yang megap-megap nyari uang saku tambahan buat bayar kosan atau makan, tapi jadwal kuliah mereka ga menentu. Di sisi lain, banyak olshop dan UMKM lokal butuh bantuan kerja ringan tapi ga punya modal buat sewa agensi mahal. Gue juga pengen mahasiswa punya ruang bermain yang setara — bukan bersaing langsung sama profesional berpengalaman, tapi dapet pengalaman kerja nyata sesuai kapasitas mereka.',
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
    motivation: 'Capek liat jalan rusak, jembatan bolong, atau fasilitas publik yang terbengkalai tapi baru dibetulin kalau udah viral di sosmed. Gue pengen bikin wadah pengarsipan independen yang rapi — biar ada rekam jejak digital, biar masyarakat punya bukti kalau mau nagih janji pemerintah.',
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
    motivation: 'Produk lokal Indonesia itu kualitasnya luar biasa — kopi, rempah, kerajinan tangan, sampai makanan olahan. Tapi banyak petani dan UMKM yang bahkan ga tau kalau produk mereka sebenarnya bisa masuk pasar yang lebih besar. Informasi ekspor itu rumit dan mahal aksesnya. Gue pengen bikin jembatan biar mereka bisa terhubung dulu ke eksportir Indonesia yang udah punya jaringan, atau kalau udah siap bisa langsung ketemu buyer internasional — tanpa harus bayar konsultan ekspor yang harganya selangit.',
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
    motivation: 'Banyak banget anak muda yang mimpi kuliah atau kerja di luar negeri, tapi bingung harus mulai dari mana. Informasi syarat dokumen di internet berantakan banget. Gue pengen bikin alat bantu otomatis yang bikinin checklist dokumen gratis sesuai negara tujuan — biar mereka ga perlu bayar agen konsultan yang mahal.',
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
