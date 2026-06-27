import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Post = {
  id: string
  title: string
  slug: string
  category: string
  featured_image: string | null
  excerpt: string | null
  content: string | null
  author: string | null
  published_at: string | null
  status: string
  created_at?: string
}
