import { supabase } from '@/lib/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/AuthForm'

// 5.1 Here we import and initialize the store straight away outside of any function’s code. Which means as soon as this file imported and used it will use Pinia.
// 5.5 So if we import the supabaseAuth file and use it directly it will work just fine because the authStore will be initialized after Pinia has been created and initialized.
// Go to [src\components\Layout\Sidebar.vue]
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

  await authStore.setAuth(data.session)
  return true
}

export const login = async (formData: LoginForm) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  })

  if (error) return console.log(error)

  await authStore.setAuth(data.session)
  return true
}

// 4.1 And now we need to add here another func for logging users out. We’ll destruct an error out of request and trigger the supabaseClient and use the signOut method of it. Then we’ll do what we did above with the login func (where we either put the error to console or update the store if succeeded) and copy it. But we don’t need a session, so let’s keep setAuth empty.
// Go to [src\stores\auth.ts]
// 5.2 And we’re using this file in the logout func so we’re reaching out the supabaseAuth file to get the logout func inside of [src\components\Layout\Sidebar.vue].
// Go to [src\components\Layout\main\AuthLayout.vue]
export const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) return console.log(error)

  await authStore.setAuth()
  return true
}
