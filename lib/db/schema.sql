-- GenAI Learning Platform Database Schema
-- Run this in your Supabase SQL Editor to set up the database

-- ============================================
-- USER PREFERENCES
-- ============================================
-- Stores user learning level preferences
-- Users are handled by Supabase Auth (auth.users)

CREATE TABLE IF NOT EXISTS user_preferences (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  level TEXT DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Users can only access their own preferences
CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- EXPLORATIONS
-- ============================================
-- Tracks every popup and deep dive viewed by users

CREATE TABLE IF NOT EXISTS explorations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  term_id TEXT NOT NULL,
  term_name TEXT NOT NULL,
  from_lesson_id TEXT,
  from_context TEXT,
  popup_viewed_at TIMESTAMPTZ,
  deep_dive_viewed_at TIMESTAMPTZ,
  mastery_viewed_at TIMESTAMPTZ,
  quiz_score INTEGER CHECK (quiz_score >= 0 AND quiz_score <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure unique exploration per user per term
  UNIQUE(user_id, term_id)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_explorations_user_id ON explorations(user_id);
CREATE INDEX IF NOT EXISTS idx_explorations_term_id ON explorations(term_id);

-- Enable RLS
ALTER TABLE explorations ENABLE ROW LEVEL SECURITY;

-- Users can only access their own explorations
CREATE POLICY "Users can view own explorations"
  ON explorations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own explorations"
  ON explorations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own explorations"
  ON explorations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own explorations"
  ON explorations FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- LESSON PROGRESS
-- ============================================
-- Tracks progress through lessons

CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  lesson_id TEXT NOT NULL,
  percent_complete INTEGER DEFAULT 0 CHECK (percent_complete >= 0 AND percent_complete <= 100),
  sections_completed TEXT[] DEFAULT '{}',
  time_spent_minutes INTEGER DEFAULT 0 CHECK (time_spent_minutes >= 0),
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- One progress record per user per lesson
  UNIQUE(user_id, lesson_id)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson_id ON lesson_progress(lesson_id);

-- Enable RLS
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

-- Users can only access their own progress
CREATE POLICY "Users can view own progress"
  ON lesson_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON lesson_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON lesson_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- CHAT MESSAGES
-- ============================================
-- Stores chat history with the AI assistant

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  session_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  context TEXT, -- What page they were on
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- Enable RLS
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Users can only access their own messages
CREATE POLICY "Users can view own messages"
  ON chat_messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own messages"
  ON chat_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own messages"
  ON chat_messages FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- GENERATED CONTENT CACHE
-- ============================================
-- Caches AI-generated popups and deep dives to reduce API costs

CREATE TABLE IF NOT EXISTS generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term_id TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  content_type TEXT NOT NULL CHECK (content_type IN ('popup', 'deep_dive')),
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- One cached version per term/level/type combination
  UNIQUE(term_id, level, content_type)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_generated_content_lookup
  ON generated_content(term_id, level, content_type);

-- Enable RLS - but allow all authenticated users to read cached content
ALTER TABLE generated_content ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can read cached content (it's shared)
CREATE POLICY "Authenticated users can view cached content"
  ON generated_content FOR SELECT
  TO authenticated
  USING (true);

-- Only service role can insert/update cached content (via API routes)
-- For production, you'd use a service role key in your API routes

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for user_preferences
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VIEWS FOR ANALYTICS (Optional)
-- ============================================

-- User stats view
CREATE OR REPLACE VIEW user_stats AS
SELECT
  user_id,
  COUNT(DISTINCT term_id) as terms_explored,
  COUNT(DISTINCT CASE WHEN deep_dive_viewed_at IS NOT NULL THEN term_id END) as deep_dives_completed,
  COUNT(DISTINCT CASE WHEN quiz_score >= 70 THEN term_id END) as quizzes_passed,
  COALESCE(SUM(lp.time_spent_minutes), 0) as total_time_minutes
FROM explorations e
LEFT JOIN lesson_progress lp ON e.user_id = lp.user_id
GROUP BY e.user_id;

-- ============================================
-- SEED DATA (Optional - for testing)
-- ============================================

-- Uncomment to add test data after creating a test user

-- INSERT INTO user_preferences (user_id, level)
-- VALUES ('your-test-user-uuid', 'beginner');

-- INSERT INTO explorations (user_id, term_id, term_name, from_lesson_id, popup_viewed_at)
-- VALUES
--   ('your-test-user-uuid', 'tokens', 'Tokens', 'lesson-01', NOW()),
--   ('your-test-user-uuid', 'embeddings', 'Embeddings', 'lesson-03', NOW());
