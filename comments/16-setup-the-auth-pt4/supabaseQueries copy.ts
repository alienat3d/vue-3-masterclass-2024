// [src\utils\supabaseQueries.ts]
import { supabase } from '@/lib/supabaseClient'

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

// 2.2 We’ll export a function that will be fetch the profile according to an user id. To filter the entries by specific column we use "eq" method as we did above at other queries. As first argument we input 'id' column and if it matches 'id' (second argument) then we’ll return a single record via "single" method.
// Go to [src\stores\auth.ts]
export const profileQuery = (id: string) => {
  return supabase.from('profiles').select().eq('id', id).single()
}
