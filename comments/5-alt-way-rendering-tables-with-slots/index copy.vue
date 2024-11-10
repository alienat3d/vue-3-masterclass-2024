<!-- [ src\pages\projects\index.vue ] -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { h, ref } from 'vue'
import type { Tables } from '../../database/types'
import type { ColumnDef } from '@tanstack/vue-table'
import DataTable from 'comments/5-alt-way-rendering-tables-with-slots/components/ui/data-table/DataTable.vue'
import { RouterLink } from 'vue-router'

const projects = ref<Tables<'projects'>[] | null>(null)

;(async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) console.log(error)

  projects.value = data
})()
// 1.0 There are multiple ways to accomplish the same thing in Vue JS. For example in last couple of lessons we used the new data component to display the projects and the tasks in the corresponding pages. And we define the table columns using the Vue render function syntax with 'h-func' and this works perfectly fine. But let’s try now another approach to explore another powerful Vue feature called "slots". Actually it’s preferable to follow documentation and that’s why we’ll keep the variant with the h-func in the end, but let’s see how we could define the columns another way with slots.
// Go to [src\components\ui\data-table\DataTable.vue]
// 1.3 Let’s remove all the references for that render functions. The data is still there, but how do we make the name column still clickable?
// Go to [src\components\ui\data-table\DataTable.vue]
const columns: ColumnDef<Tables<'projects'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name')
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status')
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators')
  }
]
</script>

<template>
  <!-- 1.5 So let’s change this component a little bit adding a closing tag and then pass anything inside. It will be injected to DataTable and replace it’s child element "slot". -->
  <!-- Go to [src\components\ui\data-table\DataTable.vue] -->
  <!-- 1.7 And then we can target this slot name from the parent component like this. We create a template tag and tell the template that whatever is nested inside of it should replace that cell slot in the child component. -->
  <!-- Go to [src\components\ui\data-table\DataTable.vue] -->
  <!-- 1.9 And here we can target now #cell-name. -->
  <!-- Go to [src\components\ui\data-table\DataTable.vue] -->
  <!-- 1.11 Now let’s create a RouterLink inside of our template as we intended to. -->
  <!-- 1.12 This RouterLink should hold the value of the cell, which is the name of each project and it should direct the user to the project’s path with the slot... -->
  <!-- Go to [src\components\ui\data-table\DataTable.vue] -->
  <!-- 1.13 We add a value for cell-name and destruct "cell" out of "cell-name". This will allow us to get the cell value inside of the {{  }} with the getValue method. -->
  <!-- 1.14 We also add in "to" prop the path to project. No we only want to reach out our original data for the entire row where the cell exists. -->
  <DataTable v-if="projects" :columns="columns" :data="projects">
    <template #cell-name="{ cell }">
      <!-- <p>Hello!</p> -->
      <RouterLink :to="`/projects/${cell.row.original.slug}`">
        {{ cell.getValue() }}
      </RouterLink>
    </template>
  </DataTable>
  <!-- <DataTable v-if="projects" :columns="columns" :data="projects" /> -->
</template>
