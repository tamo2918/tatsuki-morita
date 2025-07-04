import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// ギャラリー画像の型定義
export interface GalleryImage {
  id: number
  title: string
  description?: string
  image_url: string
  alt_text: string
  created_at: string
  display_order: number
}

// ギャラリー画像を取得する関数
export async function getGalleryImages(): Promise<GalleryImage[]> {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching gallery images:', error)
    return []
  }

  return data || []
}

// 新しいギャラリー画像を追加する関数
export async function addGalleryImage(image: Omit<GalleryImage, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('gallery_images')
    .insert([image])
    .select()

  if (error) {
    console.error('Error adding gallery image:', error)
    return null
  }

  return data?.[0] || null
} 