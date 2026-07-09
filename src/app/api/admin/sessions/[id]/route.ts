import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  try {
    // Cascade delete is handled by Prisma schema (onDelete: Cascade)
    await prisma.surveySession.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'Sesi tidak ditemukan' }, { status: 404 })
    }
    console.error('[DELETE /api/admin/sessions/[id]]', error)
    return NextResponse.json({ success: false, error: 'Gagal menghapus data' }, { status: 500 })
  }
}
