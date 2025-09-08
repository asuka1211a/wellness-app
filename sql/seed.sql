-- instructors
INSERT INTO instructors (id, name, photo_url, bio, sns_links) VALUES
  ('11111111-1111-1111-1111-111111111111', '山田太郎', 'https://randomuser.me/api/portraits/men/1.jpg', 'ヨガ・瞑想インストラクター。10年以上の経験。', '[{"label": "Instagram", "url": "https://instagram.com/yamada"}, {"label": "Twitter", "url": "https://twitter.com/yamada"}]'),
  ('22222222-2222-2222-2222-222222222222', '佐藤花子', 'https://randomuser.me/api/portraits/women/2.jpg', '呼吸法・瞑想の専門家。', '[{"label": "Facebook", "url": "https://facebook.com/sato"}]');

-- classes
INSERT INTO classes (id, title, category, description, start_at, end_at, lat, lng, address, capacity, price_jpy, instructor_id) VALUES
  ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '朝ヨガ', 'yoga', '一日の始まりに最適なヨガクラス', '2025-09-10T07:00:00+09:00', '2025-09-10T08:00:00+09:00', 35.6895, 139.6917, '東京都新宿区', 15, 2000, '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '瞑想セッション', 'meditation', '心を落ち着かせる瞑想体験', '2025-09-12T19:00:00+09:00', '2025-09-12T20:00:00+09:00', 35.6895, 139.7000, '東京都渋谷区', 12, 2500, '22222222-2222-2222-2222-222222222222');
