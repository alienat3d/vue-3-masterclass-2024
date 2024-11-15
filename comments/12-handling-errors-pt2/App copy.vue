<!-- [src\App.vue] -->
<script setup lang="ts">
// 2.3.0 We can create a variable for the store.
const errorStore = useErrorStore()
// 2.3.1 Then we remove this.
// const { activeError } = storeToRefs(useErrorStore())
// 2.1 We can use something called 'onErrorCaptured'. It’s a Vue life cycle hook and VueJS errors propagate in a similar way that events do in the DOM. So they bubble up from the component that caused an error to it’s parent and further up to root component, which is in our case 'App.vue'. And with the Vue life cycle hook 'onErrorCaptured' we can capture those errors in any component. Let’s check the documentation about: [https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured]
// 2.2 As the first argument for the hook we can get an actual 'error'.
// 2.4 And we can use that variable for the store that we just created to set the error for the error we get from this hook. Now it will show as an error page the actual error which bubbled up to root component and been captured by the hook. Of course there is a room for improvement like rendering the error stack to find out where the error coming from.
// Go to [src\main.ts]
onErrorCaptured(error => {
  errorStore.setError({ error })
})
</script>
<template>
  <AuthLayout>
    <!-- 2.3.2 And then use the new variable to get the activeError here. -->
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
