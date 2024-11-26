<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { login } from '@/utils/supabaseAuth'
// 2.1 For our needs let’s import 'watchDebounced' (also as alias we can use 'debouncedWatch').
import { watchDebounced } from '@vueuse/core'

const formData = ref({ email: '', password: '' })

// 1.18 We’ll need to destruct those new variable ref & func here
const { serverError, handleServerError, realtimeErrors, handleLoginForm } = useFormErrors()

const router = useRouter()

// 2.2 It will work as the normal watch and accepts for first argument whatever we want to watch and let’s pass the formData to it. The second one will be a callback which will trigger anything we write inside whenever any changes happen to formData. And then it also has third special argument "debounce option", which allow us to control how long we’re going to wait for the callback logic is triggered. There is also 'deep' option, which also available in normal watch in Vue JS, if set to true we make sure that we’re tracking all the changes that will happen nested in the formData object.
// 2.3 And in the callback we want to trigger handleLoginForm func. ↓
// 2.5 And here is what will happen here: watchDebounced starting watching for formData and when the user makes any changes watchDebounced will wait for 1 sec and if the user didn’t interact in 1 sec it will trigger the callback.
// Go to [src\utils\formValidations.ts]
watchDebounced(
  formData,
  () => {
    handleLoginForm(formData.value)
  },
  {
    debounce: 1000,
    deep: true
  }
)

const signin = async () => {
  const { error } = await login(formData.value)

  if (!error) return router.push('/')

  handleServerError(error)
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
        <form class="grid gap-4" @submit.prevent="signin">
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <!-- 1.22 As for handleLoginForm we can listen to the user as he start of using input. So we need 'input' event listener and pass to it this func with the 'formData'. -->
            <!-- * 2.0 For better UX we want that handleLoginForm func triggering only after the user stops typing in, so that our script won’t attack him with the errors as he just starts of typing. That’s the perfect spot for Debouncing. It’s a technique to control how often a func runs in a response to user interaction. And instead of handling this manually and implementing this all over again using JS, we can get a help from external package. Let’s install first the package using following command: 'npm i @vueuse/core'. This package includes a lot of composable we can use and save a lot of time like with Debounce now. ↑ -->
            <!-- 2.4 Now we can remove it from the template as we don’t need it anymore* -->
            <Input
              type="email"
              placeholder="johndoe19@example.com"
              required
              v-model="formData.email"
              :class="{ 'border-red-500': serverError }"
            />
            <!-- *[2.4] @input="handleLoginForm(formData)" ↑ -->
            <!-- 1.21 And let’s past the same HTML block for the email as we did for password already. -->
            <!-- ? 2.8 We could also extract this errors HTML block to reusable component and make errors look more fancy. -->
            <!-- * 3.0 While we were busy working on validation we lost the type support for the realtimeErrors variable ref along the way. Typescript doesn’t know any of what type realtimeErrors has. If we hover over it, it says that it’s a ref with type of any and it makes sense according to our implementation. -->
            <!-- Go to [src\composables\formErrors.ts] -->
            <ul v-if="realtimeErrors?.email.length" class="text-sm text-left text-red-500">
              <li v-for="error in realtimeErrors.email" :key="error" class="list-disc">
                {{ error }}
              </li>
            </ul>
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
            <!-- 1.19 So let’s sort out the HTML and add some elements, where our errors will be rendered. We’ll use the same ul>li, as we did before and place it right after the input. And they should be displayed only if 'realtimeErrors' has something. And we’ll use the "?" as it can be undefined (before user started to type anything to it, as we didn’t assigned any default value to that variable ref). And we also add '.length' to make sure that there is something in the array. -->
            <ul v-if="realtimeErrors?.password.length" class="text-sm text-left text-red-500">
              <!-- 1.20 And here instead of just rendering an error we can use the "v-for" and look over every error inside of the 'realtimeErrors.password' array. And set :key to an actual error, since it’s just a string. And lastly render error inside of each item. -->
              <li v-for="error in realtimeErrors.password" :key="error" class="list-disc">
                {{ error }}
              </li>
            </ul>
          </div>
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
