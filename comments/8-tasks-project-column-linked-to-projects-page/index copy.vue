<!-- [ src\pages\tasks\index.vue ] -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '../../database/types'
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'
import type { QueryData } from '@supabase/supabase-js'

usePageStore().pageData.title = 'My Tasks'

// 2.2.0 First we create a new constant and assign it to the query statement...
const tasksWithProjectsQuery = supabase.from('tasks').select(`
    *,
    projects (
      id,
      name,
      slug
    )
  `)

// 2.2.2 Next we’ll declare the type, set it to QueryData and pass to it as an argument the type of our query "tasksWithProjectsQuery".
type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>

// 2.1 We have to tell to typescript somehow the type of whatever what "select" query in getTasks() will return. We need to define a type for this so typescript will know about. And let’s get to documentation of the Supabase first to know what they suggest: [ https://supabase.com/docs/reference/javascript/typescript-support#response-types-for-complex-queries ]
// 2.2.3 And now we can use this type here in order to declare the type for whatever the data expecting to return.
// const tasks = ref<Tables<'tasks'>[] | null>(null)
const tasks = ref<TasksWithProjects | null>(null)

// 1.0.0 So far in My Tasks page we have in "Project" column only returning numbers, that’s the project IDs and it’s not what we want to display to our users. We want them to see a link with a project name, so that they can click this link and go to corresponding project’s page.
// Go to [ supabase\migrations\20241106075826_tasks-schema.sql ]
// 1.0.2 So in the payload (data) we should expect to see the project details not just the ID. To achieve this we just put `` in the select and start writing what we need. If we input 'name', we’ll see only the tasks name, if we want to see all again we input '*'. That’s how we can tell the Supabase to get the corresponding project for each task.
// 1.0.3 We’ll write projects ( * ) and it will give us everything for that project, namely all of its properties.
// 1.0.5 But we get actually more info that we need. Let’s explicitly define what we actually need to get.
const getTasks = async () => {
  /*   const { data, error } = await supabase.from('tasks').select(`
    *,
    projects (
      id,
      name,
      slug
    )
  `) */
  // 2.2.1  ...and then trigger the query with await.
  const { data, error } = await tasksWithProjectsQuery
  // 1.0.4 Now we get "projects" property with the project details that is attached to this task. Or better said that this task attached to the project.
  // console.log(data)

  if (error) console.log(error)

  tasks.value = data
}

await getTasks()

// 2.2.4 So we can use the same type here. But we also need to pick just a first one, because this tasks project type is basically an array of objects and the ColumnDef expects a single object that represents a single row.
// const columns: ColumnDef<Tables<'tasks'>>[] = [
const columns: ColumnDef<TasksWithProjects[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/tasks/${row.original.id}`,
          class: 'text-left font-medium block w-full hover:bg-muted'
        },
        () => row.getValue('name')
      )
    }
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-center' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-center font-medium' }, row.getValue('status'))
    }
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-center' }, 'Due Date'),
    cell: ({ row }) => {
      return h('div', { class: 'text-center font-medium' }, row.getValue('due_date'))
    }
  },
  // 1.1 So here we need to make some changes. Instead of 'project_id' we need 'projects', which is a new property that we have. And also replace the return with what we copied from the "name" prop. However need to make some tweaks to that: "to:" should lead to the projects and correct the dynamically generated URL as well, so that it leads to the corresponded project. (We can ignore the typescript error for now.) As for the text value that goes inside of the link we want to get the 'projects' property and then the 'name'. (Also we can ignore this error as well for now.) And there we have it, we have the project name as a link that leads us to a corresponding project page.
  // 2.0 So let’s figure why typescript linter throws out errors over there. It seems that typescript doesn’t not anything about the project property. It only knows a basic task with the project ID, because it’s only what we told to typescript about. ↑
  {
    // accessorKey: 'project_id',
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-center' }, 'Project'),
    // 2.3 To fix this error let’s just use a ternary operator on it.
    cell: ({ row }) => {
      return row.original.projects
        ? h(
            RouterLink,
            {
              to: `/projects/${row.original.projects.slug}`,
              class: 'text-left font-medium block w-full hover:bg-muted'
            },
            () => row.original.projects?.name
          )
        : null
    }
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-center' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-center font-medium' },
        JSON.stringify(row.getValue('collaborators'))
      )
    }
  }
]
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
