export type Instructor = {
  id: string
  name: string
  photo_url: string
  bio: string
  sns_links: Array<{ label: string; url: string }>
}

export type Class = {
  id: string
  title: string
  category: 'yoga' | 'meditation' | 'breathwork'
  description: string
  start_at: string
  end_at: string
  address: string
  price_jpy: number
  instructor?: Instructor
}

// Mock data for demonstration
const mockInstructors: Instructor[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: '山田太郎',
    photo_url: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'ヨガ・瞑想インストラクター。10年以上の経験。',
    sns_links: [
      { label: 'Instagram', url: 'https://instagram.com/yamada' },
      { label: 'Twitter', url: 'https://twitter.com/yamada' }
    ]
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: '佐藤花子',
    photo_url: 'https://randomuser.me/api/portraits/women/2.jpg',
    bio: '呼吸法・瞑想の専門家。',
    sns_links: [
      { label: 'Facebook', url: 'https://facebook.com/sato' }
    ]
  }
]

const mockClasses: Class[] = [
  {
    id: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
    title: '朝ヨガ',
    category: 'yoga',
    description: '一日の始まりに最適なヨガクラス。心身をリフレッシュして、エネルギーに満ちた一日をスタートしましょう。',
    start_at: '2025-09-10T07:00:00+09:00',
    end_at: '2025-09-10T08:00:00+09:00',
    address: '東京都新宿区',
    price_jpy: 2000,
    instructor: mockInstructors[0]
  },
  {
    id: 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2',
    title: '瞑想セッション',
    category: 'meditation',
    description: '心を落ち着かせる瞑想体験。日々のストレスから解放され、内なる平和を見つけましょう。',
    start_at: '2025-09-12T19:00:00+09:00',
    end_at: '2025-09-12T20:00:00+09:00',
    address: '東京都渋谷区',
    price_jpy: 2500,
    instructor: mockInstructors[1]
  },
  {
    id: 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3',
    title: '呼吸法ワークショップ',
    category: 'breathwork',
    description: '正しい呼吸法を学び、心身の健康を向上させるワークショップです。',
    start_at: '2025-09-15T14:00:00+09:00',
    end_at: '2025-09-15T16:00:00+09:00',
    address: '東京都品川区',
    price_jpy: 3000,
    instructor: mockInstructors[0]
  }
]

export async function getClasses(): Promise<Class[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return mockClasses
}

export async function getClass(id: string): Promise<Class> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  const classData = mockClasses.find(cls => cls.id === id)
  if (!classData) {
    throw new Error('Class not found')
  }
  return classData
}
