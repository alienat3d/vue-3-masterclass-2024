// [src\stores\error.ts]
import type { CustomError, ExtendedPostgrestError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'

// 1.4 We’ll create a store with defineStore(), which key will be 'error-store' and pass it a callback to execute logic. We’ll have an activeError state with the initial value of 'false'. So we start at no errors. And we need a func to mutate a variable ref state with the error we got, let’s name it setError() and it will change the value to true whenever we get an error. And finally we’ll return activeError and setError, so that we can use them in any component.
// Go to [ src\pages\[...catchAll].vue ]
// 2.1 That means that in the error store we need to hold and actual error instance with the error details instead of just a boolean.
// Go to [ src\pages\[...catchAll].vue ]
//  2.3 We’ll need to tweak 'setError' method, so that it accept some object with properties 'error' & 'customCode'. Then tell the typescript of their types. And then instead of assigning boolean to activeError, we’ll assign 'error' we got from 'setError' method. But 'error' is a string and we want it to be an error instance, so we’ll use an error constructor and pass 'error' parameter inside of it. (BTW, it’s same as 'new Error()')
// 2.4 Now we also need to tell the typescript it should accept for activeError 'null' or Error.
// 2.8 And we can update for 'activeError' the 'Error' interface with the new 'CustomError' interface we just created.
// Go to [ src\pages\[...catchAll].vue ]
export const useErrorStore = defineStore('error-store', () => {
  // 4.7 But we also have to add to the types, that it can be the PostgrestError type.
  // const activeError = ref(false)
  // 4.10 And here we should expect a new ExtendedPostgrestError
  // Go to [ src\components\AppError\AppErrorPage.vue ]
  // const activeError = ref<null | CustomError | PostgrestError>(null)
  const activeError = ref<null | CustomError | ExtendedPostgrestError>(null)

  // 4.2 Here we’ll add in types that error can be a string or a PostgrestError.
  const setError = ({
    error,
    customCode
  }: {
    error: string | PostgrestError
    customCode: number
  }) => {
    // 4.3 But now we see an error at Error constructor as it expects a string and it won’t be able to handle a string. So we need to declare that those two lines of code should be execute only when error is a string.
    // Go to [ src\pages\tasks\index.vue ]
    if (typeof error === 'string') {
      // activeError.value = true
      activeError.value = Error(error)
      // 2.5 We want to add customCode prop to the Error instance we have in the state. But now it says "Property 'customCode' does not exist on type 'Error'." To solve this we need to extend an error interface, so let’s create an another types file for this.
      // Go to [ src\types\Error.ts ]
      activeError.value.customCode = customCode

      return
    }

    // 4.6 Now we add logic for the case if we have our type as PostgrestError. And we’ll update the activeError state. ↑
    activeError.value = error
    // 4.8 Next we do the customCode. We’ll create a new property on activeError object that is called 'statusCode' and assign it to 'customCode' parameter.
    // Go to [ src\types\Error.ts ]
    activeError.value.statusCode = customCode
  }

  return {
    activeError,
    setError
  }
})
