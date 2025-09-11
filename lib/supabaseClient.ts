// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase' // 生成した型を利用

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
