# Supabase ギャラリー連携セットアップガイド

## 概要
このプロジェクトはSupabaseと連携してギャラリー画像を動的に管理できるようになっています。

## セットアップ手順

### 1. 環境変数の設定

プロジェクトルート（`portfolio`フォルダ内）に `.env.local` ファイルを作成し、以下の内容を記述してください：

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Supabaseプロジェクトの情報取得

1. [Supabaseダッシュボード](https://app.supabase.com)にアクセス
2. 作成した「portfolio」プロジェクトをクリック
3. 左サイドバーの「Settings」→「API」をクリック
4. 以下の情報をコピー：
   - **Project URL**: `NEXT_PUBLIC_SUPABASE_URL`に設定
   - **anon public key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`に設定

### 3. データベーステーブルの作成

Supabaseコンソールの「SQL Editor」で `supabase-migration.sql` ファイルの内容を実行してください。

### 4. 画像データの管理

テーブル作成後、以下の方法で画像データを管理できます：

#### オプション1: SQLで直接データを挿入
```sql
INSERT INTO gallery_images (title, description, image_url, alt_text, display_order) VALUES
('写真タイトル', '説明文', 'https://your-image-url.jpg', 'Alt Text', 1);
```

#### オプション2: Supabase Storageを使用
1. Supabaseダッシュボードで「Storage」をクリック
2. 新しいバケット「gallery」を作成
3. 画像をアップロードして公開URLを取得
4. そのURLをデータベースに保存

## 技術仕様

### データベース構造

```sql
CREATE TABLE gallery_images (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### フォールバック機能

Supabaseへの接続に失敗した場合、自動的にローカル画像（`/images/gallery/`フォルダ内）を表示します。

## 開発時の注意点

1. 環境変数ファイル（`.env.local`）は`.gitignore`に含まれているため、本番環境では別途設定が必要です
2. 画像URLは完全なURL（https://...）で指定してください
3. `display_order`フィールドで画像の表示順序を制御できます

## トラブルシューティング

### 画像が表示されない場合
1. 環境変数が正しく設定されているか確認
2. Supabaseプロジェクトのダッシュボードでテーブルが作成されているか確認
3. 画像URLが正しくアクセス可能か確認
4. ブラウザの開発者ツールでエラーログを確認

### 接続エラーの場合
- 環境変数のURLとAPIキーが正しいか再確認
- Supabaseプロジェクトがアクティブ状態か確認 