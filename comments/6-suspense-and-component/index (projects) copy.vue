<!-- [ src\pages\projects\index.vue ] -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '../../database/types'
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'

const projects = ref<Tables<'projects'>[] | null>(null)

// 1.0 Currently we were using the self-executing anonymous function to fetch out data from database. And it works great actually but it looks kind of messy and with this approach if we wanted to handle the loading state for this function to render a loading spanner until the function is resolved we would need to do that in each page component.
/* ;(async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) console.log(error)

  projects.value = data
})() */
// 1.1 So it would make more sense to just use a normal function and name it getProjects.
const getProjects = async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) console.log(error)

  projects.value = data
}
// 1.2 And then we trigger that function with await.
await getProjects()
// 1.3 Unfortunately it won’t work. We get an error: "Setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered." That means that our pages component script setup is now returning a promise. It became an async dependency. Which is not what Vue expects to render. Instead it expects a fully resolved component so that it can be immediately rendered.
// Go to [ src\App.vue ]

const columns: ColumnDef<Tables<'projects'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.slug}`,
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
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
