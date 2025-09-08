import Link from 'next/link'
import { getClasses } from '@/lib/api-mock'

export const dynamic = 'force-dynamic'

export default async function ClassesPage() {
  const classes = await getClasses()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">クラス一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <Link
            key={cls.id}
            href={`/class/${cls.id}`}
            className="block p-6 rounded-lg border hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{cls.title}</h2>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                {cls.category}
              </span>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>{new Date(cls.start_at).toLocaleString('ja-JP')}</p>
              <p>{cls.address}</p>
              <p className="text-lg font-medium">
                ¥{cls.price_jpy.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
