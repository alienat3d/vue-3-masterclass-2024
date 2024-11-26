import type { LoginForm, RegisterForm } from '@/types/AuthForm'
import type { AuthError } from '@supabase/supabase-js'

// 3.2 Maybe the first thing what can come to mind is to create a new interface and set the properties like so. And then just use this type to pass it to the 'realtimeErrors' ref. But it isn’t really a good solution if we using it with the register form next, not just the login form. We gonna create another type for this exact same property that we already defined in [src\types\AuthForm.ts] for register form too. And this is not really productive.
/* interface LoginFormValidation {
  email: []
  password: []
  } */
// 3.3 So in the world of Javascript if we want to change the values for the properties inside an object we would look over the object, then pick every key and then give the value of that key and set the new value. That’s exactly what we’re going to do, but with Typescript. In Typescript we use maps. Here how to use them.
// 3.4 We’ll define a new type called FormErrors and that will be an object. The properties and the values of this object are going to be dynamic. We’ll type the Property variable inside "[]" and then we’re going to look/map over the keys of the LoginForm for example. And to get a key of a type we use 'keyof' keyword and then we define a type 'LoginForm'. Now in every iteration we have the key of the whatever the type we pass over there (in our case it’s the LoginForm). To define the define the type for that key on every iteration we write ":" and then define the type after that. And we can actually get the exact same value as well, as the 'Property' is the variable that holding the key, so we can use it here. Now we have the same type of an object.
// 3.7 However we still explicitly setting it to the LoginForm, what if we need it to be dynamic? What if we need to pass an argument to FormErrors with the type we want to map over and assign the values arrays of strings to? Easy we can use generic for FormErrors and set another variable called "T" or "Type" and then replace "LoginForm" with "Type". So that will be a type that this type will receive.
type FormErrors<Type> = {
  // [Property in keyof LoginForm]: LoginForm[Property]
  // 3.5 But in our case we don’t need a string we need an array of strings.
  // [Property in keyof LoginForm]: string[]
  // ? Sometimes devs shorten "Type" to "T" and "Property" to "K" (Key)
  [Property in keyof Type]: string[]
}

export const useFormErrors = () => {
  const serverError = ref('')
  // 1.1.0 We’ll also need a new variable ref 'realtimeErrors' and we want this ref to adapt to whatever the func that we’ll call it from. For example if we call it from handLoginForm func it should have an object with the properties 'email' & 'password'. Those are the properties of the login form and if we’ll use it for register form there will be properties for the register form.
  // 3.1 If we look at our realtimeErrors variable ref is initialized as an empty ref, which by default gives it 'any' type.
  // 3.6 So we can use it over here, so that Typescript will know about the type of this ref. We successfully cloned a LoginForm, mapped over its keys and changed the values to arrays of strings. ↑
  // 3.8 So this FormErrors type expect a type it can map over. So we pass the LoginForm to it. And if we’re using an another thing that might be of a potential value then we can use it right here. Let’s add RegisterForm type as well. But for now we need only the LoginForm
  // const realtimeErrors = ref<FormErrors<LoginForm | RegisterForm>>()
  const realtimeErrors = ref<FormErrors<LoginForm>>()

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
