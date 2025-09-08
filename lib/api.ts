import { supabase } from './supabaseClient'

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

export async function getClasses() {
  const { data, error } = await supabase
    .from('classes')
    .select(`
      id,
      title,
      category,
      description,
      start_at,
      end_at,
      address,
      price_jpy
    `)
    .order('start_at')

  if (error) throw error
  return data as Class[]
}

export async function getClass(id: string) {
  const { data, error } = await supabase
    .from('classes')
    .select(`
      id,
      title,
      category,
      description,
      start_at,
      end_at,
      address,
      price_jpy,
      instructors:instructor_id (
        id,
        name,
        photo_url,
        bio,
        sns_links
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return {
    ...data,
    instructor: data.instructors
  } as Class
}
