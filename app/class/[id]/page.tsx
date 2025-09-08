import { getClass } from '@/lib/api-mock'
import Image from 'next/image'
import Link from 'next/link'
import BookingButton from './BookingButton'

export const dynamic = 'force-dynamic'

export default async function ClassPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const classData = await getClass(id)

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/classes"
        className="inline-block mb-8 text-blue-600 hover:underline"
      >
        ← クラス一覧に戻る
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
              {classData.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{classData.title}</h1>
          <div className="space-y-4 text-gray-600">
            <p>{classData.description}</p>
            <p>
              <strong>日時：</strong>
              {new Date(classData.start_at).toLocaleString('ja-JP')}
              {classData.end_at && ` 〜 ${new Date(classData.end_at).toLocaleTimeString('ja-JP')}`}
            </p>
            <p><strong>場所：</strong>{classData.address}</p>
            <p className="text-xl">
              <strong>料金：</strong>¥{classData.price_jpy.toLocaleString()}
            </p>
          </div>

          <BookingButton />
        </div>

        {classData.instructor && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">インストラクター</h2>
            <div className="flex items-start space-x-4">
              {classData.instructor.photo_url && (
                <Image
                  src={classData.instructor.photo_url}
                  alt={classData.instructor.name}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              )}
              <div>
                <h3 className="text-xl font-semibold">
                  {classData.instructor.name}
                </h3>
                <p className="mt-2 text-gray-600">{classData.instructor.bio}</p>

                {classData.instructor.sns_links?.length > 0 && (
                  <div className="mt-4 flex gap-2">
                    {classData.instructor.sns_links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-white rounded border hover:bg-gray-50 transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
