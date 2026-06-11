-- ============================================================
-- DevTrack Sample Seed Data
-- Run this after schema.sql if you want demo rows.
-- These rows use null user references so they are safe for quick UI testing.
-- ============================================================

do $$
declare
  p1 uuid := gen_random_uuid();
  p2 uuid := gen_random_uuid();
  p3 uuid := gen_random_uuid();
begin
  insert into projects (id, name, description, status, start_date, end_date)
  values
    (p1, 'DevTrack Platform', 'Developer task and bug tracking workspace for software delivery teams.', 'active', current_date - 14, current_date + 21),
    (p2, 'Clinic Appointment System', 'Appointment booking system for patients, doctors, and administrators.', 'active', current_date - 30, current_date + 45),
    (p3, 'Inventory Management System', 'Internal platform for tracking stock, suppliers, purchase orders, and reports.', 'planning', current_date, current_date + 60);

  insert into tasks (project_id, title, description, priority, status, due_date)
  values
    (p1, 'Build dashboard stat cards', 'Create project, task, bug, and critical issue cards.', 'high', 'done', current_date - 3),
    (p1, 'Implement bug report form', 'Allow users to capture issue details and severity.', 'high', 'testing', current_date + 2),
    (p1, 'Create task board workflow', 'Move tasks across todo, in progress, testing, and done.', 'medium', 'in_progress', current_date + 5),
    (p2, 'Fix login validation bug', 'Validate login form and auth response handling.', 'critical', 'todo', current_date + 1),
    (p3, 'Design supplier module', 'Plan data model for suppliers and purchase orders.', 'medium', 'todo', current_date + 7);

  insert into bugs (project_id, title, description, steps_to_reproduce, expected_result, actual_result, severity, status)
  values
    (p1, 'Dashboard chart count mismatch', 'The dashboard task total does not match the task board count.', 'Open dashboard after creating a new task.', 'Task count should update immediately.', 'Old count remains visible.', 'medium', 'open'),
    (p2, 'Login button does not respond', 'The login form does not redirect after valid credentials.', 'Enter valid credentials and click login.', 'User should be redirected to dashboard.', 'Button stays idle.', 'critical', 'open'),
    (p3, 'Project status filter resets', 'The selected project status filter resets after refresh.', 'Select Active filter and refresh page.', 'Filter should remain selected.', 'Filter returns to All.', 'low', 'testing');
end $$;
