<!-- [src\App.vue] -->
<script setup lang="ts">
// import AppErrorPage from './components/AppError/AppErrorPage.vue'

// 1.6 Cool, but we still need to make the AppErrorPage render whenever this happens. So inside of the [ src\App.vue ] we can use the error store.
// 1.9 We can also destruct 'activeError' tho. But as we destruct anything from the store and want to maintain it’s reactivity we must wrap the store into storeToRefs.
// Go to [ src\components\AppError\AppErrorPage.vue ]
const { activeError } = storeToRefs(useErrorStore())
</script>
<template>
  <AuthLayout>
    <!-- 1.7 And inside of the template make a reference for AppErrorPage component. But conditionally render it if have an active error. -->
    <AppErrorPage v-if="activeError" />
    <!-- 1.8 And if the activeError = false, we’ll render our RouterView. -->
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
