# DevTrack Database Schema

DevTrack uses Supabase PostgreSQL.

## Main Tables

- `users_profile` — stores profile details connected to Supabase Auth users.
- `projects` — stores software project workspaces.
- `tasks` — stores development tasks linked to projects.
- `bugs` — stores bug reports linked to projects.
- `activity_logs` — stores project activity history.

## Security

Row Level Security is enabled for all tables. The MVP policies allow authenticated users to work inside the shared workspace. A future version can add a `project_members` table for stricter project-level permissions.

The full executable SQL is available at:

```text
supabase/schema.sql
```
