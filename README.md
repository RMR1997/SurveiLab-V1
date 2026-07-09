# Idea Validation Platform

Platform validasi ide startup modern untuk melakukan concept testing terhadap 5 ide bisnis digital. Dibangun dengan Next.js, TypeScript, Tailwind CSS, dan Prisma.

## Fitur Utama

- **Landing Page Modern** - Tampilan profesional dengan animasi smooth
- **Multi-Step Survey** - Alur survey yang terstruktur dan nyaman
- **Concept Evaluation** - 5 ide startup dengan mockup preview
- **Progress Tracking** - Progress bar dan step indicator
- **Auto-save** - Data tersimpan otomatis ke local storage
- **Dark Mode** - Dukungan tema gelap dan terang
- **Responsive Design** - Optimized untuk desktop, tablet, dan mobile
- **Admin Dashboard** - Analytics dan export data

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Form Handling**: React Hook Form, Zod Validation

## Struktur Proyek

```
idea-validation-platform/
├── prisma/                 # Database schema dan seed
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (survey)/      # Survey routes
│   │   ├── admin/         # Admin panel
│   │   └── api/           # API routes
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── survey/       # Survey-specific components
│   │   └── layout/       # Layout components
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilities
│   ├── types/            # TypeScript types
│   └── data/             # Static data
└── public/               # Static assets
```

## Instalasi

1. **Clone repository**
```bash
git clone <repository-url>
cd idea-validation-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment**
```bash
cp .env.example .env.local
```

Edit `.env.local` dengan konfigurasi database Anda:
```
DATABASE_URL="postgresql://user:password@localhost:5432/idea_validation?schema=public"
```

4. **Setup database**
```bash
npx prisma db push
npx prisma db seed
```

5. **Generate Prisma Client**
```bash
npx prisma generate
```

6. **Run development server**
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Alur Survey

1. **Landing Page** - Pengenalan dan CTA
2. **Intro** - Penjelasan survey
3. **Profile** - Data demografi responden
4. **Concept A-E** - Penilaian 5 ide startup
5. **Final Choice** - Pilih ide terbaik
6. **Feedback** - Saran dan masukan
7. **Thank You** - Halaman penutup

## 5 Ide Startup

1. **Produsen Nusantara** - Platform B2B untuk petani dan UMKM
2. **MahasiswaBantu.id** - Marketplace jasa mahasiswa
3. **PantauKita** - Platform pengawasan infrastruktur
4. **ExportHub Indonesia** - Platform ekspor UMKM
5. **GlobalPath.id** - Platform persiapan kerja/studi luar negeri

## API Endpoints

### Sessions
- `POST /api/sessions` - Create new session
- `GET /api/sessions/:id` - Get session data

### Survey Data
- `POST /api/sessions/:id/profile` - Save profile
- `POST /api/sessions/:id/responses` - Save idea response
- `POST /api/sessions/:id/final-choice` - Save final choice
- `POST /api/sessions/:id/feedback` - Save feedback

### Admin
- `GET /api/admin/analytics` - Get dashboard metrics
- `GET /api/admin/export` - Export data (JSON/CSV)

## Customization

### Menambah Ide Baru
Edit file `src/data/ideas.ts`:
```typescript
{
  id: '6',
  slug: 'nama-ide',
  name: 'Nama Platform',
  tagline: 'Tagline singkat',
  description: 'Deskripsi lengkap...',
  colorPrimary: '#HEXCOLOR',
  sortOrder: 6,
  isActive: true,
}
```

### Mengubah Pertanyaan
Edit file `src/data/questions.ts` untuk modifikasi opsi jawaban.

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t idea-validation .
docker run -p 3000:3000 idea-validation
```

## Lisensi

MIT License
