<!-- [ src\pages\projects\index.vue ] -->
<!-- Also check for: [ src\utils ] & [ src\types\supabaseTypes.ts ] -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { projectsQuery } from '@/utils/supabaseQueries'
import { columns } from '@/utils/tableColumns/projectsColumns'
import type { Projects } from '@/types/supabaseTypes'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects | null>(null)

// 1.3 We’ll do the same with the projects, as we just did with the tasks.
// 2.0 Alright, time to make some cleaning about columns as they’re taking really a lot of space in our code here. We’ll create a new directory "tableColumns" and a new file "tasksColumns.ts" in it.
// Go to [ src\pages\tasks\index.vue ]
const getProjects = async () => {
  const { data, error } = await projectsQuery

  if (error) console.log(error)

  projects.value = data
}
await getProjects()

// 2.3 Let’s do the same here as we did with tasks.
// const columns: ColumnDef<Projects[0]>[] = [
//   {
//     accessorKey: 'name',
//     header: () => h('div', { class: 'text-left' }, 'Name'),
//     cell: ({ row }) => {
//       return h(
//         RouterLink,
//         {
//           to: `/projects/${row.original.slug}`,
//           class: 'text-left font-medium block w-full hover:bg-muted'
//         },
//         () => row.getValue('name')
//       )
//     }
//   },
//   {
//     accessorKey: 'status',
//     header: () => h('div', { class: 'text-center' }, 'Status'),
//     cell: ({ row }) => {
//       return h('div', { class: 'text-center font-medium' }, row.getValue('status'))
//     }
//   },
//   {
//     accessorKey: 'collaborators',
//     header: () => h('div', { class: 'text-center' }, 'Collaborators'),
//     cell: ({ row }) => {
//       return h(
//         'div',
//         { class: 'text-center font-medium' },
//         JSON.stringify(row.getValue('collaborators'))
//       )
//     }
//   }
// ]
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
