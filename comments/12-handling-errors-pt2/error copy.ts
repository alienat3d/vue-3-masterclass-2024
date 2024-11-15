// [src\stores\error.ts]
import type { CustomError, ExtendedPostgrestError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | ExtendedPostgrestError>(null)

  // 6.5 So let’s modify our store and add a new state 'isCustomError' and set it’s value to 'false' by default.
  // 8.4 Right now we introduced something else — another state which is called isCustomError. We have to clear this when we clear the activeError on navigation. ↓
  const isCustomError = ref(false)

  // 1.0 So now our 'setError' func can handle the custom errors. We can pass error as a string and construct the error and set the custom code for it. Or we can receive as 'PostgrestError' and display the content of the error. But how about native JS errors?
  // Go to [src\pages\tasks\index.vue]
  // 1.3 Add for error expectation that it can receive an actual Error for the error prop.
  // 1.4.0 But now there is a typescript error, because before adding a type "Error" we had only two possibilities either a string or PostgrestError, but now we also have Error, but we can fix it by modifying our if-conditional adding 'error instanceof Error'.
  const setError = ({
    error,
    customCode
  }: {
    error: string | PostgrestError | Error
    // 1.5.0 We also can make the customCode optional.
    customCode?: number
  }) => {
    // 6.6 Then in a 'setError' method we’ll create a new if-statement. If error is a string then change isCustomError’s value to true.
    if (typeof error === 'string') isCustomError.value = true

    if (typeof error === 'string' || error instanceof Error) {
      // 1.4.1 And of course if it came as an Error we don’t have to construct a new Error. We’ll check if it’s a string we’ll set the activeError value to a newly constructed Error with the message of the string that we received otherwise just pass the Error instance.
      activeError.value = typeof error === 'string' ? Error(error) : error
      // 1.5.1 And then we can pass the customCode as a string or as JS error instance is 500.
      activeError.value.customCode = customCode || 500

      return
    }

    activeError.value = error
    // 1.5.2 Let’s do the same for the statusCode property for PostgrestErrors, if no customCode provided then 500.
    activeError.value.statusCode = customCode || 500
  }

  // 8.5 So let’s create a new func clearError. And we want it do couple of things: we want to set the activeError to null and set the isCustomError to false.
  const clearError = () => {
    activeError.value = null
    isCustomError.value = false
  }

  // 6.7 And of course we return this new state here too.
  // Go to [src\components\AppError\AppErrorPage.vue]
  // 8.6 And we’ll return that func also here.
  // Go to [src\components\AppError\AppErrorPage.vue]
  return {
    activeError,
    isCustomError,
    setError,
    clearError
  }
})
