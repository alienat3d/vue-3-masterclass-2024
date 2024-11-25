<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { login } from '@/utils/supabaseAuth'

const formData = ref({
  email: '',
  password: ''
})

// 7.8 As we added composables dir to [vite.config.ts] we don’t have to import it here, but still we need to initialize it in the script setup or inside of setup func. Sometimes we can use them in the life cycle hooks, but for now we will need to initialize it on a top level. And we’ll destruct from useFormErrors the properties we were returning.
const { serverError, handleServerError } = useFormErrors()

// 6.3 Next, we’ll create a local state for an error.
// 7.3 Let’s cut this and past to our composable.
// Go to [src\composables\formErrors.ts]
// const _error = ref('')

const router = useRouter()

// * 6.0 Let’s do the validation checks for the sign-in form. We have already a func for signing in users, but so far it provides no any feedback if the user inserted the wrong data in the fields. What we can do are two options: 1) We wait until that form is submitted and then this func is triggered. And then we can get the error from [src\utils\supabaseAuth.ts] login func and use this error and render it to the user to give him feedback about what went wrong; 2) We can watch what is user currently typing on the field and we show an instant feedback even before the form been submitted. We’ll look at both of them.
// Go to [src\utils\supabaseAuth.ts]
// 6.2 Here we’ll destruct an error and redirect user to the homepage only if there is no any error. ↑
// 7.9 And now we can use it right here if we have an error
const signin = async () => {
  /*   const isLoggedIn = await login(formData.value)

  if (isLoggedIn) router.push('/') */
  const { error } = await login(formData.value)

  if (!error) return router.push('/')

  handleServerError(error)

  // 6.4 So if the check above fails we assign those error variable ref with the error message we got from Supabase. ↓
  // 6.7 We can do even better and change the 'Invalid credentials' error message to a custom one and if we have something different, then just show that message.
  // _error.value = error.message
  // 7.4 Let’s also move this ternary to the composable.
  // Go to [src\composables\formErrors.ts]
  // _error.value =
  //   error.message === 'Invalid login credentials' ? 'Incorrect email or password' : error.message
}
</script>

<template>
  <div class="mx-auto flex w-full justify-center items-center p-10 text-center -mt-20 min-h-[90vh]">
    <Card class="max-w-sm w-full mx-auto">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription> Login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button variant="outline" class="w-full"> Register with Google </Button>
          <Separator label="Or" />
        </div>
        <!-- 6.6 And it would be good to add some classes to the input fields too, so the borders turn red, when we got an error. ↑ -->
        <form class="grid gap-4" @submit.prevent="signin">
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input
              type="email"
              placeholder="johndoe19@example.com"
              required
              v-model="formData.email"
              :class="{ 'border-red-500': serverError }"
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label id="password">Password</Label>
              <a href="#" class="inline-block ml-auto text-xs underline"> Forgot your password? </a>
            </div>
            <Input
              id="password"
              type="password"
              autocomplete
              required
              v-model="formData.password"
              :class="{ 'border-red-500': serverError }"
            />
          </div>
          <!-- 6.5 And let’s create an element, which will show an error. We’ll put the _error variable ref inside of it. And of course we’ll need "v-if" to show it only in case, if we need an error. ↑ -->
          <ul v-if="serverError" class="text-sm text-left text-red-500">
            <li class="list-disc">{{ serverError }}</li>
          </ul>
          <Button type="submit" class="w-full"> Login </Button>
        </form>
        <div class="mt-4 text-sm text-center">
          Don't have an account?
          <RouterLink to="/register" class="underline"> Register </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
