<!-- [src\pages\register.vue] -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- 3.0 Let’s replicate what we wrote here for registering a new user also for the login page. -->
<!-- Go to [src\pages\login.vue] -->
<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'

const formData = ref({
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// 2.2.0 Finally, I want if user successfully logged in to be redirected back to the homepage. We’ll need the router and it should be outside, so not be wrapped within a function.
const router = useRouter()

// 1.0 So let’s have a look in the documentation on Supabase website (https://supabase.com/docs/reference/javascript/auth-signup) how do we use the collected from the form data for registering user. And here it is, we’ll need to create a new async func signup and use the supabase method auth.signUp.
// 1.1 Then we’ll pass the data from formData into it. ↓
const signup = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password
  })

  if (error) return console.log(error)

  // 2.0 Inside of signup func we make sure that our profile has been created with every user new signup. We’ll write a conditional checking if we have 'data.user' which means the user successfully signed up. We’ll use the Supabase client and query the 'profiles' table and insert an object with the user profile data. And like we’re previously mentioned for the profiles table id needs to be linked with the user id in the users table. So since we have a user and the data we will assign to 'id' key a value 'data.user.id'. Then we’ll need a username which we can get from the formData. And also the full name.
  // 2.1 We also have to destruct the error out of response. And do the extra validation with conditional, if we have any errors put it in console.log() but we’ll add the info, that’s another error here.
  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.value.username,
      // full_name: formData.value.firstName + ' ' + formData.value.lastName
      // ? Actually it can be written another way with the 'concat()'
      full_name: formData.value.firstName.concat(' ', formData.value.lastName)
    })

    if (error) console.log('Profiles err: ', error)
  }

  // 2.2.1 And here we use the router to access it’s the push method. It will perform the manual redirection for the user to go back to the homepage.
  router.push('/')
}
</script>

<template>
  <div
    class="mx-auto w-full flex justify-center items-center p-10 text-center -mt-10 min-h-[90vh] h-full"
  >
    <Card class="max-w-sm w-full mx-auto h-full">
      <CardHeader>
        <CardTitle class="text-2xl"> Register </CardTitle>
        <CardDescription> Create a new account </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button variant="outline" class="w-full"> Register with Google </Button>
          <Separator label="Or" />
        </div>
        <!-- 1.2 Here we have a submit button and once it clicked it will trigger a submit event in the form. We’ll listen to the submit event and trigger the signup func we’ve just created. (Not to forget to add '.prevent' to it to prevent the default behavior of the browser which refreshes the page after the submit event has been triggered.) -->
        <!-- 1.3 So from now if we got to Supabase site and go to [Table Editor -> choose 'auth'] we’ll have the different tables updated after registering a new user. And once the user logs in the unique token will be stored in browser and also in the Supabase server. And we can use this session data at any point to find out if the user currently logged in or not. -->
        <form class="grid gap-4" @submit.prevent="signup">
          <div class="grid gap-2">
            <Label id="username" class="text-left">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="johndoe19"
              required
              v-model="formData.username"
            />
          </div>
          <div class="flex flex-col sm:flex-row justify-between gap-4">
            <div class="grid gap-2">
              <Label id="first_name" class="text-left">First Name</Label>
              <Input
                id="first_name"
                type="text"
                placeholder="John"
                required
                v-model="formData.firstName"
              />
            </div>
            <div class="grid gap-2">
              <Label id="last_name" class="text-left">Last Name</Label>
              <Input
                id="last_name"
                type="text"
                placeholder="Doe"
                required
                v-model="formData.lastName"
              />
            </div>
          </div>
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="johndoe19@example.com"
              required
              v-model="formData.email"
            />
          </div>

          <div class="grid gap-2">
            <Label id="password" class="text-left">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="*****"
              autocomplete
              required
              v-model="formData.password"
            />
          </div>

          <div class="grid gap-2">
            <Label id="confirm_password" class="text-left">Confirm Password</Label>
            <Input
              id="confirm_password"
              type="password"
              placeholder="*****"
              autocomplete
              required
              v-model="formData.confirmPassword"
            />
          </div>
          <Button type="submit" class="w-full"> Register </Button>
          <!-- <Button variant="outline" class="w-full"> Login with Google </Button> -->
        </form>
        <div class="mt-4 text-sm text-center">
          Already have an account?
          <RouterLink to="/login" class="underline"> Login </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
