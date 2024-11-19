// [src\utils\supabaseAuth.ts]
import { supabase } from '@/lib/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/AuthForm'
// 1.7 From this file once user logs in or registers we want to update the state and use the set of method we just created in the store. Yes we can use Pinia stores inside of this file, which is not a Vue comp. and not composable, but just a simple typescript file. It will work as long as code inside of this file will be executed only after the Pinia store has been created at [src\main.ts] before we mounted up the app — we’re allowed to use it inside of this file.
// 1.8 Let’s define a new constant authStore and assign useAuthStore to that.
const authStore = useAuthStore()

export const register = async (formData: RegisterForm) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password
  })

  if (error) return console.log(error)

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.username,
      full_name: formData.firstName.concat(' ', formData.lastName)
    })

    if (error) return console.log('Profiles err: ', error)
  }

  // 1.9 Now with the authStore we can right before we exit the func and use it to access the setAuth() method and pass to it the session.
  // 2.5.0 We'll fix it here...
  await authStore.setAuth(data.session)
  return true
}

export const login = async (formData: LoginForm) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  })

  if (error) return console.log(error)

  // 1.10 Let’s do the same here, but we need to destruct data from the response.
  // ? 1.11 And now, when we go to login page and log in as existing user our store should be updated with the current logged in user. We can check that in Vue Dev Tools -> Pinia tab -> Object
  // 2.5.1 ... and here.
  // Go to [src\stores\auth.ts]
  await authStore.setAuth(data.session)
  return true
}
