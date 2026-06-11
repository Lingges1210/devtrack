# DevTrack Testing Guide

## Manual Test Cases

### TC01 — User Registration

1. Open `/register`.
2. Enter full name, email, role, and password.
3. Click Create Account.
4. Confirm the user appears in Supabase Auth.
5. Confirm the profile appears in `users_profile`.

Expected result: user account and profile are created successfully.

### TC02 — User Login

1. Open `/login`.
2. Enter registered email and password.
3. Click Sign in.

Expected result: user is redirected to `/dashboard`.

### TC03 — Project Creation

1. Open `/projects`.
2. Create a project.
3. Confirm the project appears in the UI.
4. Confirm the row appears in Supabase `projects` table.

### TC04 — Task Creation

1. Open `/tasks`.
2. Select a project and create a task.
3. Update task status.

Expected result: task appears on the correct Kanban column.

### TC05 — Bug Reporting

1. Open `/bugs`.
2. Select a project and report a bug.
3. Update bug status.

Expected result: bug appears in the bugs table and updates correctly.

## API Testing

Use Postman with Bearer Token authorization. You can get the access token from Supabase Auth session in the browser.
