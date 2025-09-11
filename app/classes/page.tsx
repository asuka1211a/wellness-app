import Link from 'next/link'
import { getClasses } from '@/lib/api'

//export const dynamic = 'force-dynamic'
export const revalidate = 60

export default async function ClassesPage() {
  const classes = await getClasses()

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-white to-blue-50/30">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800 tracking-wide">クラス一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classes.map((cls) => (
          <Link
            key={cls.id}
            href={`/class/${cls.id}`}
            className="group block p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-[1.02]"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{cls.title}</h2>
              <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                {cls.category}
              </span>
            </div>
            <div className="space-y-3 text-gray-600">
              <p className="flex items-center gap-2">
                <span className="text-blue-400">📅</span>
                {new Date(cls.start_at).toLocaleString('ja-JP')}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-blue-400">📍</span>
                {cls.address}
              </p>
              <p className="text-lg font-medium text-gray-800 mt-4">
                ¥{cls.price_jpy.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
