// app/class/[id]/page.tsx

import { getClassById } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import BookingButton from './BookingButton'

// Next.js 15: params は Promise
type Props = { params: Promise<{ id: string }> }

export const dynamic = 'force-dynamic' // 必要に応じて

export default async function ClassDetailPage({ params }: Props) {
  const { id } = await params;          // ← ここで await する
  const cls = await getClassById(id)

  if (!cls) {
    return <div className="p-6">クラスが見つかりませんでした。</div>
  }

  return (
    <div className="p-6 space-y-6">
      <Link href="/classes" className="underline">← 一覧に戻る</Link>
      <h1 className="text-2xl font-bold">{cls.title}</h1>
      <p className="opacity-80">{cls.category}</p>
      {cls.venue?.name && <p>会場: {cls.venue.name}</p>}
      <p>{cls.description}</p>
      <BookingButton classId={cls.id} priceJpy={cls.price_jpy} />
    </div>
  )
}
