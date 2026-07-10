"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend,
} from 'recharts'
import {
  BarChart3, Users, CheckCircle, Clock, Trophy, ChevronDown, ChevronUp,
  RefreshCw, Star, MessageSquare, Target, Zap, Trash2, AlertTriangle, LogOut
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { getAllIdeas } from '@/data/ideas'

const IDEAS = getAllIdeas()
const COLORS = IDEAS.map(i => i.colorPrimary)

// Label mappings
const AGE_LABELS: Record<string, string> = {
  UNDER_18: '< 18',
  AGE_18_24: '18–24',
  AGE_25_34: '25–34',
  AGE_35_44: '35–44',
  AGE_45_54: '45–54',
  AGE_55_64: '55–64',
  ABOVE_65: '65+',
}
const OCC_LABELS: Record<string, string> = {
  STUDENT: 'Mahasiswa',
  EMPLOYEE_PRIVATE: 'Karyawan Swasta',
  EMPLOYEE_GOVERNMENT: 'PNS',
  ENTREPRENEUR: 'Wirausaha',
  FREELANCER: 'Freelancer',
  UNEMPLOYED: 'Tidak Bekerja',
  RETIRED: 'Pensiunan',
  OTHER: 'Lainnya',
}

export default function AdminDashboard() {
  const router = useRouter()
  const [analytics, setAnalytics] = useState<any>(null)
  const [responses, setResponses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'responden' | 'feedback'>('overview')
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; label: string } | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  useEffect(() => { fetchAll() }, [])

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        router.push('/admin/login')
        router.refresh()
      }
    } catch (e) {
      console.error('Logout error:', e)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    setDeleteError(null)
    try {
      const res = await fetch(`/api/admin/sessions/${deleteTarget.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setResponses(prev => prev.filter(r => r.id !== deleteTarget.id))
        setDeleteTarget(null)
        setExpandedRow(null)
      } else {
        setDeleteError(data.error || 'Gagal menghapus data')
      }
    } catch {
      setDeleteError('Gagal menghapus data. Coba lagi.')
    } finally {
      setDeleting(false)
    }
  }

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [a, r] = await Promise.all([
        fetch('/api/admin/analytics').then(res => res.json()),
        fetch('/api/admin/responses').then(res => res.json()),
      ])
      if (a.success) setAnalytics(a.data)
      if (r.success) setResponses(r.data)
      else setError('Gagal memuat data')
    } catch { setError('Gagal memuat data') }
    finally { setLoading(false) }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground">Memuat data...</p>
      </div>
    </div>
  )

  if (error || !analytics) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-4">{error || 'Gagal memuat data'}</p>
        <Button onClick={fetchAll}>Coba Lagi</Button>
      </div>
    </div>
  )

  // Prepare chart data
  const rankingData = analytics.ideaRankings.map((r: any) => ({
    name: r.ideaName.split(' ')[0],
    fullName: r.ideaName,
    Score: r.compositeScore,
    Severity: r.problemSeverity,
    Usefulness: r.usefulness,
    Urgency: r.urgency,
    NPS: r.nps,
    Votes: r.finalChoiceCount,
  }))

  const pieData = analytics.ideaRankings
    .filter((r: any) => r.finalChoiceCount > 0)
    .map((r: any) => ({ name: r.ideaName, value: r.finalChoiceCount }))

  const ageData = Object.entries(analytics.demographics.byAge || {}).map(([k, v]) => ({
    name: AGE_LABELS[k] || k, value: v as number
  }))

  const occData = Object.entries(analytics.demographics.byOccupation || {}).map(([k, v]) => ({
    name: OCC_LABELS[k] || k, value: v as number
  })).sort((a, b) => b.value - a.value)

  const radarData = analytics.ideaRankings.map((r: any) => ({
    idea: r.ideaName.split(' ')[0],
    'Problem': r.problemSeverity,
    'Usefulness': r.usefulness,
    'Urgency': r.urgency,
    'NPS': r.nps / 2,
  }))

  const completedCount = responses.filter(r => r.isCompleted).length

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">Data hasil survei SurveiLab</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchAll} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Keluar
            </Button>
          </div>
        </div>
        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 flex gap-1 pb-0">
          {(['overview', 'responden', 'feedback'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'overview' ? 'Overview' : tab === 'responden' ? 'Data Responden' : 'Feedback'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* ─── TAB: OVERVIEW ─── */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Sesi', value: analytics.totalResponses, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { label: 'Selesai', value: completedCount, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
                { label: 'Completion Rate', value: `${analytics.completionRate}%`, icon: Target, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                { label: 'Rata-rata Waktu', value: `${analytics.avgCompletionTime.toFixed(1)} mnt`, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
              ].map((m, i) => (
                <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm text-muted-foreground">{m.label}</p>
                        <div className={`p-2 rounded-lg ${m.bg}`}>
                          <m.icon className={`w-4 h-4 ${m.color}`} />
                        </div>
                      </div>
                      <p className="text-3xl font-bold">{m.value}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Ranking + Pie */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Composite Score Bar */}
              <Card className="border-0 shadow-sm lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    Composite Score per Ide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={rankingData} layout="vertical" margin={{ left: 10, right: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 12 }} />
                      <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                      <Tooltip
                        formatter={(val: any) => [val.toFixed(2), 'Score']}
                        labelFormatter={(l) => rankingData.find((d: any) => d.name === l)?.fullName || l}
                      />
                      <Bar dataKey="Score" radius={[0, 6, 6, 0]}>
                        {rankingData.map((_: any, i: number) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Pie: Pilihan Utama */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Star className="w-4 h-4 text-primary" />
                    Pilihan Utama Responden
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {pieData.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-10">Belum ada data</p>
                  ) : (
                    <>
                      <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                          <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={70} label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                            {pieData.map((_: any, i: number) => (
                              <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(v: any) => [v, 'Votes']} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="space-y-2 mt-2">
                        {pieData.map((d: any, i: number) => (
                          <div key={d.name} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                              <span className="truncate max-w-[120px]">{d.name}</span>
                            </div>
                            <span className="font-semibold">{d.value} votes</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Metrics Comparison */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Zap className="w-4 h-4 text-blue-500" />
                  Perbandingan Metrik per Ide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={rankingData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Severity" name="Problem Severity" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Usefulness" name="Usefulness" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Urgency" name="Urgency" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Demographics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Age */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    Distribusi Usia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={ageData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="value" name="Responden" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Occupation */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                    Distribusi Pekerjaan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {occData.map((d, i) => (
                      <div key={d.name} className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground w-28 truncate">{d.name}</span>
                        <div className="flex-1">
                          <Progress value={(d.value / (occData[0]?.value || 1)) * 100} className="h-2" />
                        </div>
                        <span className="text-xs font-semibold w-6 text-right">{d.value}</span>
                      </div>
                    ))}
                    {occData.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">Belum ada data</p>}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Locations */}
            {Object.keys(analytics.demographics.byLocation || {}).length > 0 && (
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">📍 Top Domisili Responden</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(analytics.demographics.byLocation as Record<string, number>)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 20)
                      .map(([loc, count]) => (
                        <span key={loc} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          {loc} <span className="opacity-70">({count})</span>
                        </span>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}

        {/* ─── TAB: DATA RESPONDEN ─── */}
        {activeTab === 'responden' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <p className="text-sm text-muted-foreground">{responses.length} sesi ditemukan • {completedCount} selesai</p>
            {responses.length === 0 ? (
              <Card className="border-0 shadow-sm">
                <CardContent className="py-16 text-center text-muted-foreground">Belum ada data responden.</CardContent>
              </Card>
            ) : responses.map((r, i) => (
              <motion.div key={r.id ?? i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className="border-0 shadow-sm overflow-hidden">
                  {/* Row header */}
                  <div className="flex items-center">
                    <button
                      className="flex-1 text-left"
                      onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                    >
                      <div className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {r.no}
                          </span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-sm">{r.profile?.location || 'Tanpa profil'}</span>
                              {r.profile && (
                                <>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <span className="text-xs text-muted-foreground">{r.profile.ageRange}</span>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <span className="text-xs text-muted-foreground">{r.profile.occupation}</span>
                                </>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.isCompleted ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                {r.isCompleted ? '✓ Selesai' : '⏳ Tidak selesai'}
                              </span>
                              {r.finalChoice && (
                                <span className="text-xs text-muted-foreground">
                                  Pilih: <span className="font-semibold text-foreground">{r.finalChoice.firstChoice}</span>
                                </span>
                              )}
                              <span className="text-xs text-muted-foreground">{r.createdAt}</span>
                            </div>
                          </div>
                        </div>
                        {expandedRow === i ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                      </div>
                    </button>
                    {/* Delete button */}
                    <button
                      id={`delete-session-${r.id}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeleteTarget({ id: r.id, label: r.profile?.location || `Sesi #${r.no}` })
                      }}
                      className="p-4 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex-shrink-0 group"
                      title="Hapus data ini"
                    >
                      <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>

                  {/* Expanded detail */}
                  {expandedRow === i && (
                    <div className="border-t border-border px-4 pb-4 space-y-5 bg-muted/10">
                      {/* Profil */}
                      {r.profile && (
                        <div className="pt-4">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Profil Responden</p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                              { label: 'Usia', value: r.profile.ageRange },
                              { label: 'Pekerjaan', value: r.profile.occupation },
                              { label: 'Domisili', value: r.profile.location },
                              { label: 'Tech Savviness', value: `${r.profile.techSavviness}/5` },
                            ].map(f => (
                              <div key={f.label} className="bg-white dark:bg-slate-800 rounded-xl p-3">
                                <p className="text-xs text-muted-foreground">{f.label}</p>
                                <p className="text-sm font-semibold mt-0.5">{f.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Penilaian per ide */}
                      {r.responses.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Penilaian per Ide</p>
                          <div className="space-y-3">
                            {r.responses.map((resp: any, j: number) => (
                              <div key={j} className="bg-white dark:bg-slate-800 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: resp.ideaColor }} />
                                  <span className="font-semibold text-sm">{resp.ideaName}</span>
                                </div>
                                <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 text-center">
                                  {[
                                    { label: 'Problem', value: `${resp.problemSeverity}/5` },
                                    { label: 'Useful', value: `${resp.usefulness}/5` },
                                    { label: 'Urgency', value: `${resp.urgency}/5` },
                                    { label: 'NPS', value: `${resp.npsScore}/10` },
                                    { label: 'Pengalaman', value: resp.experienceType },
                                    { label: 'Minat Pakai', value: resp.usageIntent },
                                    { label: 'Kejelasan', value: resp.conceptClarity },
                                  ].map(m => (
                                    <div key={m.label} className="bg-muted/50 rounded-lg px-2 py-2">
                                      <p className="text-xs text-muted-foreground leading-tight">{m.label}</p>
                                      <p className="text-xs font-bold mt-1">{m.value}</p>
                                    </div>
                                  ))}
                                </div>
                                {resp.customBehaviorAnswer && (
                                  <div className="mt-3 pt-3 border-t border-border/50 text-xs">
                                    <span className="text-muted-foreground font-medium block mb-1">Jalur / Cara Sourcing Responden:</span>
                                    <span className="font-semibold text-foreground bg-muted/30 px-2 py-1.5 rounded-lg inline-block">{resp.customBehaviorAnswer}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Pilihan akhir */}
                      {r.finalChoice && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Pilihan Akhir</p>
                          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: r.finalChoice.firstChoiceColor }} />
                              <span className="font-semibold text-sm">{r.finalChoice.firstChoice}</span>
                              {r.finalChoice.secondChoice && (
                                <span className="text-xs text-muted-foreground ml-2">Pilihan ke-2: {r.finalChoice.secondChoice}</span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground italic">&ldquo;{r.finalChoice.reason}&rdquo;</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ─── TAB: FEEDBACK ─── */}
        {activeTab === 'feedback' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {responses.filter(r => r.feedback).length === 0 ? (
              <Card className="border-0 shadow-sm">
                <CardContent className="py-16 text-center text-muted-foreground">Belum ada feedback yang masuk.</CardContent>
              </Card>
            ) : responses.filter(r => r.feedback).map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 text-xs font-bold flex items-center justify-center">
                          {r.no}
                        </span>
                        <div>
                          <p className="font-medium text-sm">{r.profile?.location || 'Anonim'}</p>
                          {r.profile && (
                            <p className="text-xs text-muted-foreground">{r.profile.ageRange} • {r.profile.occupation}</p>
                          )}
                        </div>
                      </div>
                      {r.finalChoice && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: r.finalChoice.firstChoiceColor + '20', color: r.finalChoice.firstChoiceColor }}>
                          Pilih {r.finalChoice.firstChoice}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-3">
                        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                          <Star className="w-3 h-3" /> Fitur Terpenting
                        </p>
                        <p className="text-sm text-blue-800 dark:text-blue-200">{r.feedback.mostImportantFeature}</p>
                      </div>
                      <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-3">
                        <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1 flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" /> Kekhawatiran
                        </p>
                        <p className="text-sm text-red-800 dark:text-red-200">{r.feedback.biggestConcern}</p>
                      </div>
                      {r.feedback.otherIdeas && (
                        <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-3">
                          <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1">
                            <Zap className="w-3 h-3" /> Ide Lain
                          </p>
                          <p className="text-sm text-amber-800 dark:text-amber-200">{r.feedback.otherIdeas}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* ─── DELETE CONFIRMATION MODAL ─── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => { if (!deleting) setDeleteTarget(null) }}
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-border"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Hapus Data Responden?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Data <span className="font-semibold text-foreground">{deleteTarget.label}</span> akan dihapus permanen beserta semua jawabannya. Tindakan ini tidak bisa dibatalkan.
                </p>
              </div>
              {deleteError && (
                <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg w-full">
                  {deleteError}
                </p>
              )}
              <div className="flex gap-3 w-full">
                <button
                  id="cancel-delete-btn"
                  onClick={() => { setDeleteTarget(null); setDeleteError(null) }}
                  disabled={deleting}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted/50 transition-colors disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  id="confirm-delete-btn"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Menghapus...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Ya, Hapus
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
