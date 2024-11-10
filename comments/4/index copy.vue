<!-- [ src\pages\projects\index.vue ] -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { h, ref } from 'vue'
import type { Tables } from '../../database/types'
import type { ColumnDef } from '@tanstack/vue-table'
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { RouterLink } from 'vue-router'

const projects = ref<Tables<'projects'>[] | null>(null)

;(async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) console.log(error)

  projects.value = data
})()

// 7.0 Let’s make the same way as we did with the tasks to our projects table as well. First we’ll create an array with the columns of the table. And this array should be of type ColumnDef that is coming from tanstack, which we’re importing. And we need to pass it the type of our data, same as ref<> (Tables<'projects'>).
// 7.1 Next we’re going to define our columns in each object in this array, which consist of: accessorKey, header (should be a callback func, that evaluates to 'h-func' and pass 3 arguments to it (tag name, arguments and content)), cell (provides us the object with the properties that we can destruct properties out of it like the "row" in order to use it to define our data for the cell) which return an 'h-func' that will generate a div with value from the data, which we can get with the method 'getValue' from row property of the object.

// 8.0 Now let’s make a functionality, so that a user be able to click on an item name wether it’s a task or a project and then gets navigated to the corresponding page. So in the cell with name we can just replace 'div' with the RouterLink turning it to a link. Then we must add "to" attribute. And since we’re using a custom component and not just a string for a HTML-tag let’s make sure that the last argument in the 'h-func' will be a callback-func that resolves the value of getValue func. Also the path for "to" attribute should be '/projects/id', where 'id' should be dynamic and it will bring up the [id].vue component. And this is how we get an id for each project: row object has property 'original', which gives us an access to data which includes everything we got from DB projects incl. 'slug' which we can use pretty well for that too (even better than id). But we need to rename [id].vue now to [slug].vue as well. Let’s also add some styles to this links to make it more obvious for users that it’s clickable.
// Go to [[slug].vue]
// 8.3 Let’s do the same for the Tasks
// Go to [tasks/index.vue]
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

<!-- 7.2 Now we’re good to add the TableData component. We'll also bind two props to it columns and data. To workaround the error we have to make a check for "projects" if it exist before we render this component. -->
<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
