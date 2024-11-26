// [src\composables\formErrors.ts]
// * 7.0 Let’s try to extract a stateful code using Composition API. Let’s see how we can extract the logic for auth server errors to a place where we can reuse it with any other form in the App. This is where composables are really helpful. First we’ll create a new directory 'src/composables' and inside of it a new file 'formErrors.ts'.
// 7.1 The composable is like a normal func but we prefix it as a naming convention with 'use'. And whatever goes inside of this composable we can use Composition API, can create nested methods and any else.
// 7.2 When we’re done we can return any data we want to reach out from the outside of the composable.
// Go to [src\pages\login.vue]

import type { AuthError } from '@supabase/supabase-js'

// 7.3 But we’ll rename it to serverError and then create another func handleServerError and it should accept the error from Supabase with the type AuthError and it will have only one task to update serverError variable ref with with the error we got here inside of the composable.
// Go to [src\pages\login.vue]
// 7.5 And then we’ll want to return the serverError variable ref. And by returning reactive state from a composable like this we will be able using this reactive state anywhere we want w.o. loosing its reactivity.
// 7.6 Also we want to return handleServerError method, because that’s what we’re going to use outside of the composable to update the reactive state serverError.
// 7.7 And not to forget to export the composable and then it will be ready to be used.
// Go to [src\pages\login.vue]
export const useFormErrors = () => {
  const serverError = ref('')

  const handleServerError = (error: AuthError) => {
    serverError.value =
      error.message === 'Invalid login credentials' ? 'Incorrect email or password' : error.message
  }

  return {
    serverError,
    handleServerError
  }
}
