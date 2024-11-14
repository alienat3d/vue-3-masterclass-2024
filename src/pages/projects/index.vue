<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { projectsQuery } from '@/utils/supabaseQueries'
import { columns } from '@/utils/tableColumns/projectsColumns'
import type { Projects } from '@/types/supabaseTypes'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects | null>(null)

const getProjects = async () => {
  const { data, error, status } = await projectsQuery

  if (error) useErrorStore().setError({ error, customCode: status })

  projects.value = data
}
await getProjects()
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
