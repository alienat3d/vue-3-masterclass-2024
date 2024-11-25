import { supabase } from '@/lib/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/AuthForm'

// 1.1 And also get rid of all the calls to the store setAuth() method. And with all of that deleted we can still be on the top of any changes. And here is how (https://supabase.com/docs/reference/javascript/auth-onauthstatechange). Supabase has a beautiful way for us to listen to auth events. And it’s really simple to use, we reach out the auth with 'onAuthStateChange' method and it provides us a callback and whatever that goes inside that callback will be triggered every single time any of the supported events happens [initial session, signing in, signed out, password recovery, token refreshed, user updated].
// Go to [src\App.vue]
// const authStore = useAuthStore()

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

  // await authStore.setAuth(data.session)
  return true
}

export const login = async (formData: LoginForm) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  })

  if (error) return console.log(error)

  // await authStore.setAuth(data.session)
  return true
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) return console.log(error)

  // await authStore.setAuth()
  return true
}
