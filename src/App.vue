<script setup lang="ts">
import AuthLayout from '@/components/Layout/main/AuthLayout.vue'
</script>
<!-- 4.0 Using layout allows us to have multiple layouts and switch between them dynamically. So when we have an auth system and then we have the users who are logged in and some others are just guests we can display different layout according to their auth status. -->
<template>
  <!-- 4.1 Whatever goes between the tags will replace <slot /> inside of the Component. -->
  <AuthLayout>
    <RouterView />
  </AuthLayout>
</template>
