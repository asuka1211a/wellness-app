# Wellness App - Next.js + Supabase

ウェルネスクラス予約アプリケーション

## 機能

- `/classes` - クラス一覧ページ（タイトル・カテゴリ・日時・場所・価格を表示）
- `/class/[id]` - クラス詳細ページ（講師情報・SNSリンク・予約ボタンを表示）
- Supabase からのデータ取得

## 技術スタック

- **フレームワーク**: Next.js 15.5.2
- **データベース**: Supabase
- **スタイリング**: Tailwind CSS
- **言語**: TypeScript

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルを作成し、以下の環境変数を設定してください：

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Supabase データベースのセットアップ

`sql/schema.sql` ファイルを使用してデータベーススキーマを作成：

```sql
-- instructors テーブル
CREATE TABLE instructors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  name text NOT NULL,
  photo_url text,
  bio text,
  sns_links jsonb DEFAULT '[]'
);

-- classes テーブル
CREATE TABLE classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text CHECK (category IN ('yoga','meditation','breathwork')) DEFAULT 'yoga',
  description text,
  start_at timestamptz NOT NULL,
  end_at timestamptz,
  lat double precision,
  lng double precision,
  address text,
  capacity int DEFAULT 12,
  price_jpy int DEFAULT 2000,
  instructor_id uuid REFERENCES instructors(id)
);

-- bookings テーブル
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  user_id uuid,
  status text CHECK (status IN ('reserved','canceled','refunded')) DEFAULT 'reserved',
  created_at timestamptz DEFAULT now()
);
```

### 4. サンプルデータの挿入

`sql/seed.sql` ファイルを使用してサンプルデータを挿入：

```sql
-- インストラクターのサンプルデータ
INSERT INTO instructors (id, name, photo_url, bio, sns_links) VALUES
  ('11111111-1111-1111-1111-111111111111', '山田太郎', 'https://randomuser.me/api/portraits/men/1.jpg', 'ヨガ・瞑想インストラクター。10年以上の経験。', '[{"label": "Instagram", "url": "https://instagram.com/yamada"}, {"label": "Twitter", "url": "https://twitter.com/yamada"}]'),
  ('22222222-2222-2222-2222-222222222222', '佐藤花子', 'https://randomuser.me/api/portraits/women/2.jpg', '呼吸法・瞑想の専門家。', '[{"label": "Facebook", "url": "https://facebook.com/sato"}]');

-- クラスのサンプルデータ
INSERT INTO classes (id, title, category, description, start_at, end_at, lat, lng, address, capacity, price_jpy, instructor_id) VALUES
  ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '朝ヨガ', 'yoga', '一日の始まりに最適なヨガクラス', '2025-09-10T07:00:00+09:00', '2025-09-10T08:00:00+09:00', 35.6895, 139.6917, '東京都新宿区', 15, 2000, '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '瞑想セッション', 'meditation', '心を落ち着かせる瞑想体験', '2025-09-12T19:00:00+09:00', '2025-09-12T20:00:00+09:00', 35.6895, 139.7000, '東京都渋谷区', 12, 2500, '22222222-2222-2222-2222-222222222222');
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

アプリケーションは http://localhost:3000 で利用できます。

## ページ構成

### `/classes` - クラス一覧ページ
- 全クラスの一覧を表示
- 各クラスのタイトル、カテゴリ、日時、場所、価格を表示
- クラスをクリックすると詳細ページに遷移

### `/class/[id]` - クラス詳細ページ
- 選択したクラスの詳細情報を表示
- インストラクター情報（写真、名前、経歴）
- SNSリンク（Instagram、Twitter、Facebook等）
- 予約ボタン（現在はアラート表示のみ）

## ファイル構成

```
├── app/
│   ├── classes/
│   │   └── page.tsx          # クラス一覧ページ
│   ├── class/[id]/
│   │   ├── page.tsx          # クラス詳細ページ
│   │   └── BookingButton.tsx # 予約ボタンコンポーネント
│   ├── layout.tsx            # レイアウト
│   └── page.tsx              # ホームページ
├── lib/
│   ├── api.ts                # Supabase API関数
│   ├── api-mock.ts           # モックAPI関数（開発用）
│   └── supabaseClient.ts     # Supabaseクライアント設定
├── sql/
│   ├── schema.sql            # データベーススキーマ
│   └── seed.sql              # サンプルデータ
└── next.config.ts            # Next.js設定
```

## 開発時の注意事項

- 現在はモックデータ（`lib/api-mock.ts`）を使用しています
- 実際のSupabaseに接続する場合は、`app/classes/page.tsx` と `app/class/[id]/page.tsx` で `@/lib/api-mock` を `@/lib/api` に変更してください
- 外部画像を使用する場合は、`next.config.ts` の `images.remotePatterns` に適切なドメインを追加してください

## 今後の拡張予定

- 実際の予約機能の実装
- ユーザー認証機能
- 決済機能の統合
- 管理者画面の追加
- レスポンシブデザインの改善
