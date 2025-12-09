-- Cookly Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Recipes Table
CREATE TABLE IF NOT EXISTS recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  ingredients JSONB NOT NULL DEFAULT '[]',
  instructions TEXT[] NOT NULL DEFAULT '{}',
  servings INTEGER NOT NULL DEFAULT 4,
  category TEXT NOT NULL,
  cooking_time INTEGER NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Lihtne', 'Keskmine', 'Keeruline')),
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Policies for recipes
CREATE POLICY "Anyone can view approved recipes"
  ON recipes FOR SELECT
  TO authenticated
  USING (status = 'approved');

CREATE POLICY "Users can view own recipes"
  ON recipes FOR SELECT
  TO authenticated
  USING (auth.uid() = author_id);

CREATE POLICY "Admins can view all recipes"
  ON recipes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );

CREATE POLICY "Authenticated users can insert recipes"
  ON recipes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own pending recipes"
  ON recipes FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id AND status = 'pending');

CREATE POLICY "Admins can update any recipe"
  ON recipes FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_recipes_status ON recipes(status);
CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes(category);
CREATE INDEX IF NOT EXISTS idx_recipes_author ON recipes(author_id);
CREATE INDEX IF NOT EXISTS idx_recipes_created ON recipes(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_recipes_updated_at
  BEFORE UPDATE ON recipes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample admin user (you'll need to create this user in Supabase Auth first)
-- Then run: UPDATE user_profiles SET is_admin = true WHERE id = 'your-user-id';

-- Insert some sample recipes for testing
INSERT INTO recipes (title, description, image_url, ingredients, instructions, servings, category, cooking_time, difficulty, status) VALUES
(
  'Klassikaline Borš',
  'Traditsiooniline Vene peedissupp, mis sobib suurepäraselt külmadel talvepäevadel',
  'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800',
  '[
    {"name": "peediviilud", "amount": 300, "unit": "g"},
    {"name": "kartul", "amount": 400, "unit": "g"},
    {"name": "porgand", "amount": 200, "unit": "g"},
    {"name": "sibul", "amount": 150, "unit": "g"},
    {"name": "kapsa", "amount": 200, "unit": "g"},
    {"name": "tomatipasta", "amount": 2, "unit": "sl"},
    {"name": "hapukoor", "amount": 200, "unit": "ml"}
  ]'::jsonb,
  ARRAY[
    'Keeda liha koos veega ja lisandiga umbes 1,5 tundi',
    'Lisa tükeldatud köögiviljad ja keeda pehmeks',
    'Maitsesta soola ja pipraga',
    'Serveeri hapukoore ja tillukesega'
  ],
  6,
  'Supp',
  120,
  'Keskmine',
  'approved'
),
(
  'Šokolaadikook',
  'Mahlane šokolaadikook, mis sulab suus',
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
  '[
    {"name": "jahu", "amount": 200, "unit": "g"},
    {"name": "suhkur", "amount": 200, "unit": "g"},
    {"name": "kakao", "amount": 50, "unit": "g"},
    {"name": "munad", "amount": 3, "unit": "tk"},
    {"name": "või", "amount": 150, "unit": "g"},
    {"name": "piim", "amount": 100, "unit": "ml"}
  ]'::jsonb,
  ARRAY[
    'Sega kuivained omavahel',
    'Lisa munad ja sulatatud või',
    'Vala vormile ja küpseta 180°C juures 35 minutit',
    'Lase jahtuda ja kaunista'
  ],
  8,
  'Magustoit',
  45,
  'Lihtne',
  'approved'
);
