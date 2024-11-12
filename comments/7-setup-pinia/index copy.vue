<!-- [ src\pages\index.vue ] -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// 1.9.0 Let’s import the store here...
// import { usePageStore } from '@/stores/page'

// 1.9.1 ...and then update the value of it to "Homepage". If familiar with the stores concept, you might think that maybe you need something like a setter, but this is not the case with Pinia stores & Composition API stores. We can directly access the data, change it and it will change everywhere.
// Go to [src\pages\projects\index.vue]
usePageStore().pageData.title = 'Homepage'
</script>

<template>
  <div>
    <h1>Home Page</h1>
  </div>
</template>
