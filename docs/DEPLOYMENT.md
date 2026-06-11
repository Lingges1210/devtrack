# DevTrack Deployment Guide

## Deploying to Vercel

1. Push the project to GitHub.
2. Open Vercel and import the GitHub repository.
3. Keep the framework preset as `Next.js`.
4. Add the environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

5. Click Deploy.

## Supabase Auth URL Configuration

After Vercel generates your live link, open Supabase:

```text
Authentication → URL Configuration
```

Set the Site URL to your deployed Vercel URL.

Add redirect URLs such as:

```text
https://your-project.vercel.app
https://your-project.vercel.app/login
https://your-project.vercel.app/dashboard
```

## Important

Do not upload `.env.local` to GitHub. Only upload `.env.example`.
