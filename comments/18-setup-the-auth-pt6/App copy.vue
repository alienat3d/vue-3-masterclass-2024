<script setup lang="ts">
const errorStore = useErrorStore()

onErrorCaptured(error => {
  errorStore.setError({ error })
})

// 1.2 Let’s import the supabaseClient here and reach out the auth with it’s method onAuthStateChange. Then inside of its callback we’ll reach out to the auth store. We’ll get the session and pass it to the setAuth. And that’s what we get from onAuthStateChange, as it provides us with the event, which is a string (f.e. 'INITIAL_SESSION') and then we also get the session if it exists.
// 1.3 So what will happen now: when our App will mount our script will start listening to any changes are happening to the session and once any of the events and once any of the events listed above happen, then its callback will be triggered. Don’t forget the async & await words, as we might need to set the profile.
// Go to [src\stores\auth.ts]
// 1.5.0 And if we want to clear this up a little bit we can cut this from here.
// Go to [src\stores\auth.ts]
// 1.6 And now we can initialize the store.
// Go to [src\stores\auth.ts]
onMounted(() => {
  // supabase.auth.onAuthStateChange((event, session) => {
  //   setTimeout(async () => {
  //     await useAuthStore().setAuth(session)
  //   }, 0)
  // })
  useAuthStore().trackAuthChanges()
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
