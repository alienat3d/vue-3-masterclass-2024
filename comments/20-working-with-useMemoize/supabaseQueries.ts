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

/* export const profileQuery = (id: string) => {
    return supabase.from('profiles').select().eq('id', id).single()
  } */
// 1.4 Let’s tweak this query to get the ID according to a dynamic thing, not just the ID or something else, something generic. Could be ID, could be the username, could be the full name or whatever. So instead of receiving ID as a parameter we can receive the object with two options: a column and a value that we want to search with. So if we pass the column as the ID, then we pass to value the ID we want to match and if we pass the column as the username, then we pass the username value that we want to match it with this column. And then we define the type of this object that we’re receiving and say it will be object of a column which should be a string and value which should be a string.
// 1.5 And inside of query we’ll make the column to be dynamic according to a parameter we’re receiving and also the value.
// 1.6 But we also need to update any references of this query, let’s global search it and go to [src\stores\auth.ts] to tweak it in there as well.
export const profileQuery = ({ column, value }: { column: string; value: string }) => {
  return supabase.from('profiles').select().eq(column, value).single()
}
