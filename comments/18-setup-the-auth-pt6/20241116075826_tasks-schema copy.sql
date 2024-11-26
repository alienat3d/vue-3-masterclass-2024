-- [supabase\migrations\20241116075826_tasks-schema.sql]
drop table if exists tasks;

-- 5.3 Add 'profile id uuid ...'
-- 5.4 And we also need to rename the tasks schema, so that it has later timestamp time, as the profiles schema, because it decides the order of creating and we need it to after profiles being created.
-- 5.5 And with that in place we do in the console: npm run db:reset which will reset the DB with all of the changes we’ve made and then npm run db:seed which will create the testing user and all of the other stuff.
create table 
  tasks (
    id bigint primary key generated always as identity not null,
    created_at timestamptz default now() not null,
    name text not null,
    status current_status default 'in-progress' not null,
    description text not null,
    due_date date default null,
    profile_id uuid references profiles (id) on delete cascade not null,
    project_id bigint references projects (id) default null,
    collaborators text array default array[]::varchar[] not null
  );