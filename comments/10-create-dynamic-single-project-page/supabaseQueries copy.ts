// [ src\utils\supabaseQueries.ts ]
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

// 1.3.0 Let’s create the query for individual project. But now we have to define which property we need. Here we need only those tasks, which attached to the current project. And we will specify, what we actually need from "tasks".
// 1.3.1 But to tell to Supabase that we need only the project that corresponds to the page that the use is visiting we need to add another method "eq" (probably stands for "equal"). And we’ll pass to that method as first argument that we want Supabase to get us a data for only the row which has a "slug" value equals whatever we input as the second argument (we’ll get that from URL).
// 1.3.2 And finally we’ll use "single" method which will tell the Supabase that we only want a single record. We don’t want an array of records, we just want an object that represents our project.
// 1.3.3 But we still need to make the second argument for "eq" dynamic. We need to find out how to receive dynamic project slug from the page URL. So "projectQuery" has to receive a parameter for the slug. So whenever we trigger the query we want to pass the slug. And for that we transform this normal query to a func. And it will accept a slug as a string. We’ll pass it to "eq" and we’re done here.
// Go to [ src\types\supabaseTypes.ts ]
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
