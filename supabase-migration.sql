-- ギャラリー画像テーブルを作成
CREATE TABLE IF NOT EXISTS gallery_images (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- display_orderにインデックスを作成
CREATE INDEX IF NOT EXISTS idx_gallery_images_display_order ON gallery_images(display_order);

-- RLS (Row Level Security) を有効化
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- 匿名ユーザーが読み取り可能なポリシーを作成
CREATE POLICY "Allow anonymous read access" ON gallery_images
FOR SELECT USING (true);

-- updated_atを自動更新するトリガー関数を作成
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_atトリガーを作成
CREATE TRIGGER update_gallery_images_updated_at 
BEFORE UPDATE ON gallery_images 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- サンプルデータの挿入（オプション）
INSERT INTO gallery_images (title, description, image_url, alt_text, display_order) VALUES
('Gallery Photo 1', 'First gallery image', 'https://your-bucket.supabase.co/storage/v1/object/public/gallery/photo-1.jpg', 'Gallery Photo 1', 1),
('Gallery Photo 2', 'Second gallery image', 'https://your-bucket.supabase.co/storage/v1/object/public/gallery/photo-2.jpg', 'Gallery Photo 2', 2),
('Gallery Photo 3', 'Third gallery image', 'https://your-bucket.supabase.co/storage/v1/object/public/gallery/photo-3.jpg', 'Gallery Photo 3', 3),
('Gallery Photo 4', 'Fourth gallery image', 'https://your-bucket.supabase.co/storage/v1/object/public/gallery/photo-4.jpg', 'Gallery Photo 4', 4),
('Gallery Photo 5', 'Fifth gallery image', 'https://your-bucket.supabase.co/storage/v1/object/public/gallery/photo-5.jpg', 'Gallery Photo 5', 5),
('Gallery Photo 6', 'Sixth gallery image', 'https://your-bucket.supabase.co/storage/v1/object/public/gallery/photo-6.jpg', 'Gallery Photo 6', 6),
('Gallery Photo 7', 'Seventh gallery image', 'https://your-bucket.supabase.co/storage/v1/object/public/gallery/photo-7.jpg', 'Gallery Photo 7', 7),
('Gallery Photo 8', 'Eighth gallery image', 'https://your-bucket.supabase.co/storage/v1/object/public/gallery/photo-8.jpg', 'Gallery Photo 8', 8),
('Gallery Photo 9', 'Ninth gallery image', 'https://your-bucket.supabase.co/storage/v1/object/public/gallery/photo-9.jpg', 'Gallery Photo 9', 9); 