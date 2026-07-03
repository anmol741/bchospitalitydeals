import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bxgsybgqqyseomtvxyzv.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4Z3N5YmdxcXlzZW9tdHZ4eXp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1MzE5NDQsImV4cCI6MjA5ODEwNzk0NH0.OJvXBiLavv0n5NZU_EFtf2yx8vV7i4rAd_BxoGqLYgw'

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
