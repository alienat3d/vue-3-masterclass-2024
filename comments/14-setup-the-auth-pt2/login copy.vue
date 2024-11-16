<!-- [src\pages\login.vue] -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- 3.1 Let’s create a variable ref for collecting data, like we did in the register page. -->
<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'

const formData = ref({
  email: '',
  password: ''
})

const router = useRouter()

// 3.3 Also we’ll need an async func 'signin' and we’ll use the here Supabase client again in order to sign the user with the password. And use its 'auth.signInWithPassword' method to sign-in with the password and pass to it an object with the properties of email and password, which we need to sign the use in.
// 3.5 And then we have to redirect the user to the homepage if he successfully logged in.
const signin = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.value.email,
    password: formData.value.password
  })

  if (error) return console.log(error)

  router.push('/')
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
        <!-- 3.2 Then we use v-model to bind the inputs to reactive props. -->
        <!-- 3.4 We’ll hang our new func for signing-in on the 'submit' event for the form. -->
        <form class="grid gap-4" @submit.prevent="signin">
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input
              type="email"
              placeholder="johndoe19@example.com"
              required
              v-model="formData.email"
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
            />
          </div>
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
