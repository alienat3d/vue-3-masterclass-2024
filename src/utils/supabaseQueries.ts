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

export const profileQuery = ({ column, value }: { column: string; value: string }) => {
  return supabase.from('profiles').select().eq(column, value).single()
}
