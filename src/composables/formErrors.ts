import type { LoginForm } from '@/types/AuthForm'
import type { AuthError } from '@supabase/supabase-js'

export const useFormErrors = () => {
  const serverError = ref('')
  // 1.1.0 We’ll also need a new variable ref 'realtimeErrors' and we want this ref to adapt to whatever the func that we’ll call it from. For example if we call it from handLoginForm func it should have an object with the properties 'email' & 'password'. Those are the properties of the login form and if we’ll use it for register form there will be properties for the register form.
  const realtimeErrors = ref()

  const handleServerError = (error: AuthError) => {
    serverError.value =
      error.message === 'Invalid login credentials' ? 'Incorrect email or password' : error.message
  }

  // * 1.0 Let’s handle now the real-time validation as the user is using the input. And for that we’ll create here a new func 'handLoginForm'. It will receive the formData with the type LoginForm.
  const handleLoginForm = async (formData: LoginForm) => {
    // 1.1.1 So we don’t want explicitly set the type here, we want to set it when we use it. So we will user realtimeErrors.value here and set it to this object.
    // 1.2 Actually we don’t need the properties of that object to be string, we want them to be arrays. Because we want to have the ability to display or render diff. errors per input.
    // 1.3 Now we need to create funcs to validate email & password and push the whatever errors comes out of the validation rules that we create to that corresponding array. But we won’t do that here, as it will make our composable so crowded. Let’s create a new file 'formValidations.ts' in the 'utils' directory for that.
    // Go to [src\utils\formValidations.ts]
    realtimeErrors.value = {
      email: [],
      password: []
    }

    // 1.13 Now we’ll import those new validation funcs dynamically inside of this func. Because we might not need them in any other function inside this file. And we’ll destruct "validateEmail", "validatePassword".
    const { validateEmail, validatePassword } = await import('@/utils/formValidations')

    // 1.14 Create a new constant 'emailErrors' and use the imported func and it will accept formData.email.
    const emailErrors = validateEmail(formData.email)

    // 1.15 Then we write a conditional that if the validation func returns any errors we’ll update the state that we have, which is realtimeErrors variable ref. Then we’ll update the property with the errors we got.
    if (emailErrors.length) realtimeErrors.value.email = emailErrors

    // 1.16 And we’ll do the same for the password.
    const passwordErrors = validatePassword(formData.password)
    if (passwordErrors.length) realtimeErrors.value.password = passwordErrors
  }

  // 1.17 Not to forget returning realtimeErrors & handleLoginForm.
  // Go to [src\pages\login.vue]
  return {
    serverError,
    handleServerError,
    realtimeErrors,
    handleLoginForm
  }
}
