-- [supabase\migrations\20241115204257_profiles-schema.sql]
-- 0.0 To create this file we use command 'npm run db:migrate:new profiles-schema'
-- 0.1 dropping everything in profiles when this file runs
drop table if exists profiles;
-- 0.2 clearing everything in the auth.users table
TRUNCATE auth.users cascade;

-- 0.3 create a profiles table
create table 
  profiles (
		-- 0.4 every id in the profiles table references a user inside of the auth.users table, 'on delete cascade' means that if the user has been removed from the DB then remove the profile of him as well
    id uuid references auth.users on delete cascade not null,
    created_at timestamptz default now() not null,
		-- 0.5 we also define each user should have a username, full name, bio
    username text unique not null,
    full_name text not null,
    bio text default null,
		-- 0.6 and we set by default a dark mode
    mode text default 'dark' not null,
		-- 0.7 and URL to the user avatar/profile pic
    avatar_url text default null,
    
    primary key (id)
  );

-- 0.8 Also we need to reset the DB with 'npm run db:reset'
-- 0.9 And generate new types according to the profiles table types with 'npm run supabase:types'
-- Go to [src/pages/register.vue]