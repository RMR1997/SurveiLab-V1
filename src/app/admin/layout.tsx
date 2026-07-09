import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Idea Validation Platform',
  description: 'Dashboard admin untuk melihat hasil survey',
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
