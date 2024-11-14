// [src\types\Error.ts]
// 2.6 In this file we’ll export an interface with the CustomError and it will have the same types definitions as the Error interface. And when we add something in here it will be added to Error existing types.
// 2.7 We create a 'customCode' prop as the optional one and say the type of it is number.

import type { PostgrestError } from '@supabase/supabase-js'

// Go to [ src\stores\error.ts ]
export interface CustomError extends Error {
  customCode?: number
}
// 4.9 We have to extend the PostgrestError as well.
// Go to [ src\stores\error.ts ]
export interface ExtendedPostgrestError extends PostgrestError {
  statusCode?: number
}
