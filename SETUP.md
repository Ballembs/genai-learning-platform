# GenAI Learning Platform — Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your **Project URL** and **API keys**

## 2. Set Environment Variables

Create `.env.local` in the project root:

```env
# Anthropic (Claude API)
ANTHROPIC_API_KEY=sk-ant-...

# Voyage AI (Embeddings for similarity checker)
VOYAGE_API_KEY=pa-...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJ...your-anon-key...
SUPABASE_SECRET_KEY=eyJ...your-service-role-key...
```

### Finding Your Supabase Keys

1. Go to your Supabase project dashboard
2. Navigate to **Settings > API > Project API keys**
3. Copy the keys:
   - **Publishable key** (safe for client-side, was called "anon key")
   - **Secret key** (server-side only, was called "service_role key")

## 3. Create Database Tables

1. Go to Supabase Dashboard → SQL Editor
2. Copy the contents of `supabase/setup.sql`
3. Run it

This creates:
- `user_preferences` — User level settings
- `explorations` — Term popup/deep-dive tracking
- `lesson_progress` — Lesson completion tracking
- `chat_messages` — Chat history
- `generated_content` — Cached AI-generated content

All tables have Row Level Security (RLS) enabled.

## 4. Configure Auth Providers (Optional)

### Email (works by default)
- Supabase enables email auth by default
- Users get a confirmation email on signup

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Set redirect URL: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
4. In Supabase Dashboard → Authentication → Providers → Google
5. Add your Client ID and Client Secret

### GitHub OAuth
1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Set callback URL: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
4. In Supabase Dashboard → Authentication → Providers → GitHub
5. Add your Client ID and Client Secret

## 5. Set Vercel Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`
- `ANTHROPIC_API_KEY`
- `VOYAGE_API_KEY`

## 6. Deploy

```bash
git add .
git commit -m "Add auth and profile persistence"
git push  # Vercel auto-deploys
```

## Guest Mode

The app works perfectly without Supabase configured:
- All progress is stored in localStorage via Zustand
- Users can complete lessons, explore terms, and take quizzes
- When they sign in later, local data is merged to the database

## Troubleshooting

### "Supabase not configured" warning
- Check that all three env vars are set correctly
- Verify the URL includes `https://` prefix

### RLS policy errors
- Ensure you ran the full `setup.sql` script
- Check that policies exist: Supabase Dashboard → Authentication → Policies

### OAuth redirect issues
- Verify callback URL matches exactly (including trailing slashes)
- Check that the provider is enabled in Supabase Dashboard
