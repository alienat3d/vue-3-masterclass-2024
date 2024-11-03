<script setup lang="ts">
import { useRoute } from 'vue-router'

// 1.0 Now this variable will contain the dynamical info about the current route, which we can use in h1, for example
const route = useRoute()
</script>

<template>
  <div>
    <!-- 1.1 So as we called in router/index.ts this as "id" we reach out to it as "id" as well. But just in case ID wasn’t provided to be safe, we’ll add an opt. chaining "?", which evaluates inline expression to undefined instead of throwing an error if ID doesn’t exist. -->
    <h1>Project {{ route.params?.id }}</h1>
  </div>
</template>
