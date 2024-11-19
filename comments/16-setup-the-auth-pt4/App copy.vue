<!-- [src\App.vue] -->
<!-- * 4.0 As user log in and once this happens the Supabase will store in Local storage in his browser an authentication token and it has the info about current session. It includes the unique access token for the specific user, it also has expires_in with the value of 3600, which means in 3600 seconds this user will be logged out automatically if the refresh_token won’t be refreshed. But if user will refresh our App doesn’t have a clue that we have an active current user — the auth store doesn’t even exist. This is because we’re using this store only in the login and register pages. So Vue haven’t added it yet to our App. So even thought there is an info about active session in the Local store already our App doesn’t know about. And that’s what we’re work on now. We need to retrieve the user session. We want that our App be able to detect the active session in Local store and retrieve the user from it. Let’s have a look in documentation: [https://supabase.com/docs/reference/javascript/auth-getsession]. Here is a special "getSession" method of auth property for this. -->
<!-- 4.1 We also need a place where it always be triggered no matter which page the user on. We need to be able always to check if the current user is logged in. And there is no better place than App.vue! As it renders any single time we visit any page. -->
<script setup lang="ts">
// import { supabase } from './lib/supabaseClient'

const errorStore = useErrorStore()
// 4.3 And we’ll need to add the authStore here of course too.
// const authStore = useAuthStore()

onErrorCaptured(error => {
  errorStore.setError({ error })
})

// 4.2 And we’ll use the "onMounted" life cycle hook, to make sure that the App is fully mounted in the browser.
// 4.4 And then we’ll check if the session data has the user then we’ll use the setAuth func and it accepts a session from the data. We also need to add await also here, as the setAuth method will fire a query to the DB if the profile isn’t set it will fetch the profile and update the profile.
// 4.5 Now regardless which page user is visiting the App will always check if this is a logged in user and update the store accordingly.
// * 5.0 But we can do even better than this. We can do that check from outside of App.vue comp. and do that every time the user tries to navigate to anywhere in App. We’ll move this code inside a new func in the [src\stores\auth.ts]
// Go to [src\stores\auth.ts]
onMounted(async () => {
  // const { data } = await supabase.auth.getSession()
  // if (data.session?.user) authStore.setAuth(data.session)
})
</script>
<template>
  <AuthLayout>
    <AppErrorPage v-if="errorStore.activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name"></Component>
        <template #fallback>
          <span>Loading...</span>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
