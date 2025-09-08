-- instructors
CREATE TABLE instructors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  name text NOT NULL,
  photo_url text,
  bio text,
  sns_links jsonb DEFAULT '[]'
);

-- classes
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

-- bookings
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  user_id uuid,
  status text CHECK (status IN ('reserved','canceled','refunded')) DEFAULT 'reserved',
  created_at timestamptz DEFAULT now()
);
