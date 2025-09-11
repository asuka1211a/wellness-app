// lib/api.ts
import { supabase } from '@/lib/supabaseClient'

export type Instructor = {
  id: string
  name: string
  bio: string | null
  photo_url: string | null
  sns_links: { label: string; url: string }[] | null
}

export type Venue = {
  id: string
  name: string | null
  address: string | null
  lat: number | null
  lng: number | null
}

export type Class = {
  id: string
  title: string
  category: string
  description: string | null
  start_at: string
  end_at: string | null
  capacity: number | null
  price_jpy: number
  visibility: boolean
  instructor: Instructor | null
  venue: Venue | null
}

export async function getClasses(): Promise<Class[]> {
  const { data, error } = await supabase
    .from('classes')
    .select(`
      id, title, category, description, start_at, end_at, capacity, price_jpy, visibility,
      instructor:instructors ( id, name, bio, photo_url, sns_links ),
      venue:venues ( id, name, address, lat, lng )
    `)
    .eq('visibility', true)
    .order('start_at', { ascending: true })

  if (error) throw error
  return (data ?? []) as unknown as Class[]
}

export async function getClassById(id: string): Promise<Class> {
  const { data, error } = await supabase
    .from('classes')
    .select(`
      id, title, category, description, start_at, end_at, capacity, price_jpy, visibility,
      instructor:instructors ( id, name, bio, photo_url, sns_links ),
      venue:venues ( id, name, address, lat, lng )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data as unknown as Class
}
