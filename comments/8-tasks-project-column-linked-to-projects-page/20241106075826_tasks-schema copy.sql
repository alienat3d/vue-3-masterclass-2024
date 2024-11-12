-- [ supabase\migrations\20241106075826_tasks-schema.sql ]
drop table if exists tasks;

create table 
  tasks (
    id bigint primary key generated always as identity not null,
    created_at timestamptz default now() not null,
    name text not null,
    status current_status default 'in-progress' not null,
		description text not null,
		due_date date default null,
		-- 1.0.1 When we created a migration file for the tasks we make sure that every task can belong to a project. And these belongs through relationship should allow us to have access to the task’s properties along with the project details.
		-- Go to [ src\pages\tasks\index.vue ]
		project_id bigint references projects (id) default null,
    collaborators text array default array[]::varchar[] not null
  );