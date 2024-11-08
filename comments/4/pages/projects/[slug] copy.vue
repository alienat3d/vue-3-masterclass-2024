<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div>
    <!-- 8.1 We also have to change here 'id' to 'slug' to make it work proper. -->
    <!-- Go to [ui/data-table/DataTable.vue] -->
    <h1>Project {{ route.params?.slug }}</h1>
  </div>
</template>
