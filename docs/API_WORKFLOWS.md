# DevTrack API Workflows

DevTrack includes Next.js API Route Handlers that act as the application backend layer. The route handlers forward the authenticated user's Bearer token to Supabase, so Row Level Security policies still protect the database.

## API Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/projects` | GET | Fetch all projects |
| `/api/projects` | POST | Create project |
| `/api/projects/[id]` | GET | Fetch one project |
| `/api/projects/[id]` | PATCH | Update project |
| `/api/projects/[id]` | DELETE | Delete project |
| `/api/tasks` | GET | Fetch all tasks |
| `/api/tasks` | POST | Create task |
| `/api/tasks/[id]` | PATCH | Update task status/details |
| `/api/tasks/[id]` | DELETE | Delete task |
| `/api/bugs` | GET | Fetch all bugs |
| `/api/bugs` | POST | Report bug |
| `/api/bugs/[id]` | PATCH | Update bug status/details |
| `/api/bugs/[id]` | DELETE | Delete bug |
| `/api/activity` | GET | Fetch recent activity logs |
| `/api/dashboard/stats` | GET | Fetch dashboard/report counts |

## Frontend API Helper

The frontend uses `lib/api.ts` to call the API routes. It automatically retrieves the Supabase session and attaches the access token as an Authorization header.

## Authentication Workflow

1. User registers with email, password, full name, and role.
2. Supabase Auth creates the account.
3. A matching row is inserted into `users_profile`.
4. The user logs in.
5. API calls include the user's access token.
6. Supabase RLS validates access.
