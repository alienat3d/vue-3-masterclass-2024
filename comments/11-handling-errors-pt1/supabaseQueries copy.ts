// [src\utils\supabaseQueries.ts]
import { supabase } from '@/lib/supabaseClient'

// add "," after ")" inside of select to bring up a query error.
export const tasksWithProjectsQuery = supabase.from('tasks').select(`
  *,
  projects (
    id,
    name,
    slug
  )
`)

export const projectsQuery = supabase.from('projects').select()

export const projectQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `
        *,
        tasks (
          "id",
          "name",
          "status",
          "due_date"
        )
      `
    )
    .eq('slug', slug)
    .single()

export const taskQuery = (id: string) =>
  supabase
    .from('tasks')
    .select(
      `
        *,
        projects (
          "id",
          "name",
          "slug"
        )
      `
    )
    .eq('id', id)
    .single()
