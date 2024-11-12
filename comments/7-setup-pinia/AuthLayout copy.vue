<!-- [ src\components\Layout\main\AuthLayout.vue ] -->
<script setup lang="ts">
// 1.7.0 Now we import here the store we just created
// import { usePageStore } from '@/stores/page'
// import { storeToRefs } from 'pinia'
// 1.7.1 And then we destruct the data that we need from the store. But to make sure that the data is returned reactive from the store and didn’t lose it’s reactivity we need to wrap usePageStore() in another helper func storeToRefs().
const { pageData } = storeToRefs(usePageStore())
</script>

<template>
  <Sidebar />
  <div class="flex flex-col lg:ml-52 ml-16 transition-[margin]">
    <TopNavbar />

    <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <!-- 1.0 So far no matter what page we’re at the title remain the same. Let’s change this and make it also changing dynamically. Which means we need to be able to change it from the page’s component. To be able to do this we need to make this a global state that we can change from anywhere. We’ll use Pinia for that. Pinia is the official state management solution for Vue 3. We don’t need to install it, as we’re already have it from creating new project with Vite. -->
        <!-- 1.1 To create a Pinia stor we’ll create in src directory a stores directory and inside of it the first store "page.ts". -->
        <!-- Go to [stores/page.ts] -->
        <!-- 1.8 And now we can use pageData like so: -->
        <!-- Go to [ src\pages\index.vue ] -->
        <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
      </div>
      <slot />
    </main>
  </div>
</template>
<!-- 1.10 The concept is quite simple: the pageData prop with the title is the global state defined in the Pinia store, so it’s available for the entire project. We’ll put the data to the Layout component, so that we have centralized place to store the title for the page, which means if we change the value from any component it will change in layout component as well. -->
