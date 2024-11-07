<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { h, ref } from 'vue'
import type { Tables } from '../../../database/types'
import type { ColumnDef } from '@tanstack/vue-table'
import DataTable from '@/components/ui/data-table/DataTable.vue'

const projects = ref<Tables<'projects'>[] | null>(null)

;(async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) console.log(error)

  projects.value = data
})()

// 7.0 Let’s make the same way as we did with the tasks to our projects table as well. First we’ll create an array with the columns of the table. And this array should be of type ColumnDef that is coming from tanstack, which we’re importing. And we need to pass it the type of our data, same as ref<> (Tables<'projects'>).
// 7.1 Next we’re going to define our columns in each object in this array, which consist of: accessorKey, header (should be a callback func, that evaluates to 'h-func' and pass 3 arguments to it (tag name, arguments and content)), cell (provides us the object with the properties that we can destruct properties out of it like the "row" in order to use it to define our data for the cell) which return an 'h-func' that will generate a div with value from the data, which we can get with the method 'getValue' from row property of the object.
const columns: ColumnDef<Tables<'projects'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('name'))
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

<!-- 7.2 Now we’re good to add the TableData component. We'll also bind two props to it columns and data. To workaround the error we have to make a check for "projects" if it exist before we render this component. -->
<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
