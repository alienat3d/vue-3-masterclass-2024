// [ src\types\supabaseTypes.ts ]
import type { projectQuery, projectsQuery, tasksWithProjectsQuery } from '@/utils/supabaseQueries'
import type { QueryData } from '@supabase/supabase-js'

export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>
export type Projects = QueryData<typeof projectsQuery>

// 1.4 Now let’s do the type for it. If we're writing the type in the same way as we did before will get nothing, as we’re using a function as the type, so we have tell typescript to use as a type whatever it returns, which is our query statement.
// Go to [ src\pages\projects\[slug].vue ]
export type Project = QueryData<ReturnType<typeof projectQuery>>
