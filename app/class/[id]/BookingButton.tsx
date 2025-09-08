'use client'

export default function BookingButton() {
  return (
    <button
      className="mt-8 w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      onClick={() => alert('予約機能は準備中です')}
    >
      予約する
    </button>
  )
}
