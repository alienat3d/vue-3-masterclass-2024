<!-- [src\components\Layout\main\AuthLayout.vue] -->
<script setup lang="ts">
const { pageData } = storeToRefs(usePageStore())
</script>

<template>
  <!-- 5.3 The Sidebar comp. loads directly inside of this layout. And AuthLayout comp. loads directly in [src\App.vue]. So for login & sign up we use them in pages comp. [src\pages\login.vue] & [src\pages\register.vue] and those pages will not render except inside of RouterView [src\App.vue]. As the RouterView comp. responsible for the rendering pages so they only render inside of RouterView. -->
  <!-- Go to [src\main.ts] -->
  <Sidebar />
  <div class="flex flex-col lg:ml-52 ml-16 transition-[margin]">
    <TopNavbar />

    <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
      </div>
      <slot />
    </main>
  </div>
</template>
