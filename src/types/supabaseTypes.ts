import type {
  projectQuery,
  projectsQuery,
  taskQuery,
  tasksWithProjectsQuery
} from '@/utils/supabaseQueries'
import type { QueryData } from '@supabase/supabase-js'

export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>
export type Projects = QueryData<typeof projectsQuery>

export type Project = QueryData<ReturnType<typeof projectQuery>>
export type Task = QueryData<ReturnType<typeof taskQuery>>
