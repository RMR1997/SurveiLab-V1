import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard - SurveiLab',
  description: 'Dashboard admin untuk melihat hasil survei',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {children}
    </div>
  )
}
