// [src\utils\supabaseAuth.ts]
// 4.1 So this file will export everything is needed for the authentication.

import { supabase } from '@/lib/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/AuthForm'

// 4.2 We’ll start here with creating the async func for registering a new user which will accepts 'formData'. Then we’ll cut & paste everything from the [src\pages\register.vue].
// 4.3 Next we need to sort out the error with formData type, because typescript doesn’t know what is the type of the data this func is expecting. So let’s create a new type file for that 'AuthForm.ts'.
// Go to [src\types\AuthForm.ts]
// 4.6 Now we can set the types of formData to fresh created RegisterForm interface.
// Go to [src\pages\register.vue]
// 4.8 So here we receive data directly not receiving a ref. So no need to use value here.
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

  // 4.9 The only typescript error here left is with the router, as we don’t have router.useRouter for push method. And we should do that here anyway because the useRouter composable needs to be added directly inside of the script setup and not inside of a function. Let’s remove it and instead return true.
  // Go to [src\pages\register.vue]
  // router.push('/')
  return true
}

// 4.11 Let’s do the same for the login func.
export const login = async (formData: LoginForm) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  })

  if (error) return console.log(error)

  return true
}
