-- ============================================
-- GenAI Learning Platform - Supabase Setup
-- ============================================
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================

-- 1. USER PREFERENCES
CREATE TABLE IF NOT EXISTS user_preferences (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  level TEXT DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. EXPLORATIONS (popup views, deep dives, quiz scores)
CREATE TABLE IF NOT EXISTS explorations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  term_id TEXT NOT NULL,
  term_name TEXT NOT NULL,
  from_lesson_id TEXT,
  from_context TEXT,
  popup_viewed_at TIMESTAMPTZ,
  deep_dive_viewed_at TIMESTAMPTZ,
  mastery_viewed_at TIMESTAMPTZ,
  quiz_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, term_id)
);

-- 3. LESSON PROGRESS
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id TEXT NOT NULL,
  percent_complete INTEGER DEFAULT 0,
  sections_completed TEXT[] DEFAULT '{}',
  time_spent_minutes INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- 4. CHAT MESSAGES
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  context TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. GENERATED CONTENT CACHE (shared across all users)
CREATE TABLE IF NOT EXISTS generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term_id TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  content_type TEXT NOT NULL CHECK (content_type IN ('popup', 'deep_dive')),
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(term_id, level, content_type)
);

-- ============================================
-- INDEXES for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_explorations_user ON explorations(user_id);
CREATE INDEX IF NOT EXISTS idx_explorations_term ON explorations(term_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_session ON chat_messages(user_id, session_id);
CREATE INDEX IF NOT EXISTS idx_generated_content_lookup ON generated_content(term_id, level, content_type);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE explorations ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_content ENABLE ROW LEVEL SECURITY;

-- User preferences: users can only access their own
CREATE POLICY "Users can view own preferences" ON user_preferences
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own preferences" ON user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own preferences" ON user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

-- Explorations: users can only access their own
CREATE POLICY "Users can view own explorations" ON explorations
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own explorations" ON explorations
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own explorations" ON explorations
  FOR UPDATE USING (auth.uid() = user_id);

-- Lesson progress: users can only access their own
CREATE POLICY "Users can view own progress" ON lesson_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON lesson_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON lesson_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Chat messages: users can only access their own
CREATE POLICY "Users can view own messages" ON chat_messages
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own messages" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Generated content: readable by all authenticated users (shared cache)
CREATE POLICY "Authenticated users can view generated content" ON generated_content
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert generated content" ON generated_content
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update generated content" ON generated_content
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ============================================
-- AUTO-CREATE user_preferences on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_preferences (user_id, level)
  VALUES (NEW.id, 'beginner')
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
