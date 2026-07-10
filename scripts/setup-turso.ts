// Script to push schema and seed data directly to Turso via REST API

const TURSO_URL = (process.env.TURSO_DATABASE_URL || '').replace('libsql://', 'https://')
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN!

if (!TURSO_URL || !TURSO_TOKEN) {
  console.error('❌ Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in .env')
  process.exit(1)
}

async function executeSql(statements: string[]): Promise<void> {
  const requests = statements.map(sql => ({
    type: 'execute',
    stmt: { sql },
  }))
  requests.push({ type: 'close' } as any)

  const res = await fetch(`${TURSO_URL}/v2/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TURSO_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ requests }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`HTTP ${res.status}: ${text}`)
  }

  const data = await res.json() as any
  for (const result of data.results || []) {
    if (result.type === 'error') {
      throw new Error(result.error?.message || 'SQL error')
    }
  }
}

const schema = `
CREATE TABLE IF NOT EXISTS "SurveySession" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  "completedAt" DATETIME,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "referrer" TEXT,
  "currentStep" INTEGER NOT NULL DEFAULT 0,
  "isCompleted" BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS "RespondentProfile" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "sessionId" TEXT NOT NULL UNIQUE,
  "ageRange" TEXT NOT NULL,
  "occupation" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "techSavviness" INTEGER NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("sessionId") REFERENCES "SurveySession"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "IdeaResponse" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "sessionId" TEXT NOT NULL,
  "ideaId" TEXT NOT NULL,
  "problemSeverity" INTEGER NOT NULL,
  "usefulness" INTEGER NOT NULL,
  "urgency" INTEGER NOT NULL,
  "experienceType" TEXT NOT NULL,
  "usageIntent" TEXT NOT NULL,
  "npsScore" INTEGER NOT NULL,
  "conceptClarity" TEXT NOT NULL,
  "answeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("sessionId") REFERENCES "SurveySession"("id") ON DELETE CASCADE,
  UNIQUE("sessionId", "ideaId")
);

CREATE TABLE IF NOT EXISTS "FinalChoice" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "sessionId" TEXT NOT NULL UNIQUE,
  "firstChoiceId" TEXT NOT NULL,
  "secondChoiceId" TEXT,
  "reason" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("sessionId") REFERENCES "SurveySession"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Feedback" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "sessionId" TEXT NOT NULL UNIQUE,
  "mostImportantFeature" TEXT NOT NULL,
  "biggestConcern" TEXT NOT NULL,
  "otherIdeas" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("sessionId") REFERENCES "SurveySession"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "StartupIdea" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "slug" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "tagline" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "iconUrl" TEXT,
  "mockupUrl" TEXT,
  "colorPrimary" TEXT NOT NULL DEFAULT '#3B82F6',
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE INDEX IF NOT EXISTS "SurveySession_isCompleted_idx" ON "SurveySession"("isCompleted");
CREATE INDEX IF NOT EXISTS "SurveySession_createdAt_idx" ON "SurveySession"("createdAt");
CREATE INDEX IF NOT EXISTS "IdeaResponse_ideaId_idx" ON "IdeaResponse"("ideaId");
CREATE INDEX IF NOT EXISTS "StartupIdea_isActive_sortOrder_idx" ON "StartupIdea"("isActive", "sortOrder");
`

async function pushSchema() {
  console.log('📦 Pushing schema to Turso...')
  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => s + ';')

  await executeSql(statements)
  console.log('✅ Schema pushed successfully!\n')
}

async function seedIdeas() {
  console.log('🌱 Seeding startup ideas...')

  const now = new Date().toISOString()
  const ideas = [
    {
      id: 'idea-globalpath',
      slug: 'global-path',
      name: 'GlobalPath',
      tagline: 'Navigasi karir global untuk talenta Indonesia',
      description: 'Platform yang membantu profesional Indonesia menemukan peluang kerja internasional dengan panduan visa, persiapan interview, dan komunitas diaspora.',
      colorPrimary: '#3B82F6',
      sortOrder: 1,
    },
    {
      id: 'idea-mahasiswabantu',
      slug: 'mahasiswa-bantu',
      name: 'MahasiswaBantu',
      tagline: 'Marketplace jasa antar mahasiswa',
      description: 'Platform peer-to-peer yang menghubungkan mahasiswa yang butuh bantuan dengan mahasiswa yang punya keahlian — dari les privat hingga jasa desain.',
      colorPrimary: '#10B981',
      sortOrder: 2,
    },
    {
      id: 'idea-pantaukita',
      slug: 'pantau-kita',
      name: 'PantauKita',
      tagline: 'Transparansi proyek infrastruktur daerah',
      description: 'Aplikasi warga untuk memantau, melaporkan, dan mengevaluasi proyek pembangunan daerah secara real-time dengan data terbuka dari pemerintah.',
      colorPrimary: '#F59E0B',
      sortOrder: 3,
    },
    {
      id: 'idea-produsennusantara',
      slug: 'produsen-nusantara',
      name: 'ProdusenNusantara',
      tagline: 'B2B marketplace UMKM ke ritel modern',
      description: 'Platform yang menghubungkan produsen UMKM lokal langsung dengan pembeli ritel, minimarket, dan restoran — tanpa perantara, margin lebih besar.',
      colorPrimary: '#EF4444',
      sortOrder: 4,
    },
    {
      id: 'idea-apotekonline',
      slug: 'apotek-online',
      name: 'ApoTekKita',
      tagline: 'Apotek digital dengan konsultasi apoteker',
      description: 'Platform pembelian obat online dengan fitur konsultasi apoteker berlisensi, pengingat minum obat, dan pengiriman express ke seluruh Indonesia.',
      colorPrimary: '#8B5CF6',
      sortOrder: 5,
    },
  ]

  const insertStatements = ideas.map(idea => `INSERT OR IGNORE INTO "StartupIdea" 
    ("id","slug","name","tagline","description","colorPrimary","sortOrder","isActive","createdAt","updatedAt")
    VALUES ('${idea.id}','${idea.slug}','${idea.name}','${idea.tagline.replace(/'/g,"''")}','${idea.description.replace(/'/g,"''")}','${idea.colorPrimary}',${idea.sortOrder},1,'${now}','${now}');`)

  await executeSql(insertStatements)
  ideas.forEach(i => console.log(`  ✅ ${i.name}`))
  console.log(`✅ Seeded ${ideas.length} startup ideas!\n`)
}

async function main() {
  try {
    await pushSchema()
    await seedIdeas()
    console.log('🎉 Turso database is ready!')
  } catch (err) {
    console.error('❌ Error:', err)
    process.exit(1)
  }
}

main()
