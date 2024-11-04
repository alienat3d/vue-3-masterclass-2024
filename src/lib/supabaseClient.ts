import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
// 1.0 We'll get from https://supabase.com/dashboard/project/... a Project URL & an API key
// [-> App.vue]
// 2.1 Let’s do this with the URL & API-key
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
)

// 2.0 With Vite we can reach out the environment variables and reference them following this syntax. This will hold all of the variables, when application runs, we pass to the app and we can access them with the dot notation.
// console.log(import.meta.env.SUPER_SECRET_KEY) // this one for the env. variables on the server side
// console.log(import.meta.env.VITE_SUPER_SECRET_KEY) // for the env. variables on the client side

// ? 2.2 Sometimes you might see file .env.example and this file generally needs to provide the team with visibility on which variables that needed for this app to run. It act as a template showing the necessary variables without exposing sensitive data.
