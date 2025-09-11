// app/class/[id]/BookingButton.tsx
'use client';

import React from 'react';

type Props = {
  classId: string;
  priceJpy: number;
};

export default function BookingButton({ classId, priceJpy }: Props) {
  // ここは後で Stripe Checkout に差し替える。今はビルドを通す最小実装。
  const onClick = () => {
    console.log('book class:', { classId, priceJpy });
    alert('仮の予約ボタンです（後でStripeに置き換え）');
  };

  return (
    <button
      onClick={onClick}
      className="rounded-lg px-4 py-2 border"
      aria-label={`Book class ${classId} (${priceJpy} JPY)`}
    >
      予約する（{priceJpy.toLocaleString()}円）
    </button>
  );
}
