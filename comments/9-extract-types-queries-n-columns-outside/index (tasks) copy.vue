<!-- [ src\pages\tasks\index.vue ] -->
<!-- Also check for: [ src\utils ] & [ src\types\supabaseTypes.ts ] -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { tasksWithProjectsQuery } from '@/utils/supabaseQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'
import type { TasksWithProjects } from '@/types/supabaseTypes'

usePageStore().pageData.title = 'My Tasks'

// 1.0 So far, the query to get all the tasks doesn't take up too much space, but it's only a matter of time before things get really messy. We might need to pull in specific properties and relationships like getting a single task could involve tracking down its projects and also its comments, collaborators and other stuff, which will get a lot of space from the script setup. Adding to that we’re defining the columns inside of the script setup too and that takes a lot of space as well. So we need to consider of extracting few things outside of our Vue components. Let’s start with the Supabase queries. I’m think of a single tree-shakable file where I store all the queries together and then I import whatever I want in whatever component that needed. Let’s created a new directory 'utils'. And a new file supabaseQueries.ts inside of it. And we’ll cut the queries and paste it right there.
// const tasksWithProjectsQuery = supabase.from('tasks').select(`
//     *,
//     projects (
//       id,
//       name,
//       slug
//     )
//   `)

// 1.2 We’ll make the same for types.
// Go to [ src\pages\projects\index.vue ]
// type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>

const tasks = ref<TasksWithProjects | null>(null)

// 1.1 Now we’ll import the new file for 'tasksWithProjectsQuery'
const getTasks = async () => {
  const { data, error } = await tasksWithProjectsQuery

  if (error) console.log(error)

  tasks.value = data
}

await getTasks()

// 2.1 Now we’ll cut the entire columns array and paste into a new file [ src\utils\tableColumns\tasksColumns.ts ].
// const columns: ColumnDef<TasksWithProjects[0]>[] = [
//   {
//     accessorKey: 'name',
//     header: () => h('div', { class: 'text-left' }, 'Name'),
//     cell: ({ row }) => {
//       return h(
//         RouterLink,
//         {
//           to: `/tasks/${row.original.id}`,
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
//     accessorKey: 'due_date',
//     header: () => h('div', { class: 'text-center' }, 'Due Date'),
//     cell: ({ row }) => {
//       return h('div', { class: 'text-center font-medium' }, row.getValue('due_date'))
//     }
//   },
//   {
//     accessorKey: 'projects',
//     header: () => h('div', { class: 'text-center' }, 'Project'),
//     cell: ({ row }) => {
//       return row.original.projects
//         ? h(
//             RouterLink,
//             {
//               to: `/projects/${row.original.projects.slug}`,
//               class: 'text-left font-medium block w-full hover:bg-muted'
//             },
//             () => row.original.projects?.name
//           )
//         : null
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
// 2.2 After we imported there what needed to we import columns here. All does work!
// Go to [ src\pages\projects\index.vue ]
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
