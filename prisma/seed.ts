import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Seed startup ideas
  const ideas = [
    {
      id: '1',
      slug: 'produsen-nusantara',
      name: 'Produsen Nusantara',
      tagline: 'Hubungkan Petani Langsung dengan Buyer',
      description: 'Platform yang menghubungkan petani, peternak, nelayan, dan UMKM secara langsung dengan restoran, hotel, distributor, industri, maupun buyer sehingga produsen memperoleh harga yang lebih adil dan pembeli mendapatkan pasokan yang lebih efisien.',
      iconUrl: '/icons/produsen.svg',
      mockupUrl: '/images/mockups/produsen-nusantara.jpg',
      colorPrimary: '#10B981',
      sortOrder: 1,
    },
    {
      id: '2',
      slug: 'mahasiswa-bantu',
      name: 'MahasiswaBantu.id',
      tagline: 'Mahasiswa Bantu UMKM Tumbuh',
      description: 'Platform yang mempertemukan mahasiswa dengan UMKM maupun individu yang membutuhkan bantuan pekerjaan ringan seperti packing, admin, desain, dokumentasi, hingga pekerjaan harian dengan sistem yang fleksibel.',
      iconUrl: '/icons/mahasiswa.svg',
      mockupUrl: '/images/mockups/mahasiswa-bantu.jpg',
      colorPrimary: '#8B5CF6',
      sortOrder: 2,
    },
    {
      id: '3',
      slug: 'pantau-kita',
      name: 'PantauKita',
      tagline: 'Awasi Pembangunan Bersama',
      description: 'Platform yang mendokumentasikan kondisi jalan rusak, jembatan, sekolah, dan fasilitas umum lainnya agar masyarakat memiliki arsip digital dan dapat ikut mengawasi pembangunan.',
      iconUrl: '/icons/pantau.svg',
      mockupUrl: '/images/mockups/pantau-kita.jpg',
      colorPrimary: '#F59E0B',
      sortOrder: 3,
    },
    {
      id: '4',
      slug: 'export-hub',
      name: 'ExportHub Indonesia',
      tagline: 'Bawa Produk Indonesia ke Dunia',
      description: 'Platform yang membantu petani, peternak, nelayan, dan UMKM mendapatkan akses ke pasar ekspor melalui pencarian buyer, pendampingan ekspor, dan informasi mengenai standar ekspor.',
      iconUrl: '/icons/export.svg',
      mockupUrl: '/images/mockups/export-hub.jpg',
      colorPrimary: '#3B82F6',
      sortOrder: 4,
    },
    {
      id: '5',
      slug: 'global-path',
      name: 'GlobalPath.id',
      tagline: 'Persiapkan Masa Depan Globalmu',
      description: 'Platform yang membantu masyarakat Indonesia mempersiapkan studi maupun pekerjaan di luar negeri melalui checklist dokumen, panduan, dan informasi yang mudah dipahami.',
      iconUrl: '/icons/global.svg',
      mockupUrl: '/images/mockups/global-path.jpg',
      colorPrimary: '#EC4899',
      sortOrder: 5,
    },
  ]

  for (const idea of ideas) {
    await prisma.startupIdea.upsert({
      where: { slug: idea.slug },
      update: idea,
      create: idea,
    })
  }

  console.log('Seeded', ideas.length, 'startup ideas')
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
