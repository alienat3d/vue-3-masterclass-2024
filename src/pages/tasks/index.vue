<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { h, ref } from 'vue'
import DataTable from '@/components/ui/data-table/DataTable.vue'
import type { Tables } from '../../../database/types'
import type { ColumnDef } from '@tanstack/vue-table'

const tasks = ref<Tables<'tasks'>[] | null>(null)

;(async () => {
  const { data, error } = await supabase.from('tasks').select()

  if (error) console.log(error)

  tasks.value = data
})()

// 5.0 We get this from Shadcn Vue for Table component
// 6.0 Alright, now after we get the basics let’s get to make this work for our own data. First things first we don’t need this Payment interface.
/* interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
} */
// 6.1 Also we don’t need this payments array, as our data will come from Supabase DB "tasks".
/* const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com'
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com'
  }
] */

// 5.1 We won’t create an extra file, as it docs says and just copy it here:
// 5.4 As for the columns, we need to define them according to a specific syntax for tanstack. It should be an array of objects, where each object represents a column. For each column we need to provide an accessorKey property. This property will hold the accessorKey or the key that tanstack will use to access the value of this column in every single row. So for example this "amount" column tanstack will loop over an array payments objects and for each one it will access the "amount" property to provide the value for column. And also while defining column we can provide the header property and it accepts the callback which evaluate to an "h-function", which is a special Vue JS function which returns HTML-elements. It accepts 3 arguments: 1) a string to represent a tag name (or it can be a component instance); 2) an object that has properties for attributes; 3) whatever we put here will be placed inside of the element. (In this example it will be <div class="text-right">Amount</div>) As for the cell value it’s our way to define the cell value or define the element that will be placed inside the table data. And also provides us an object that we can destruct properties out of it and use it for building our cell. (For example here we’re formatting the values, using the row, that we’re getting from the cell to get value of 'Amount' property and then we’re formatting it and placing it with "h-function" inside of the div that will be rendered in the cell.)

/* const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  }
] */

// 6.2 As for the columns we’ll change the type from Payment to the type or our tasks, so we’ll take the type from ref and replace put it for ColumnDef.
// 6.3 Let’s see what’s the first column we want to display, it’s a column with the name of the task. And for the accessorKey we’ll write 'name', same as the header should display 'Name'. We won’t need that logic from example above, we just need to return the value from 'name' property with row.getValue() func. We also change styles a little bit, so that the text pushed to the left.
// 6.5 And let’s do the same for each property/column of our data.
// 6.6 Looks good except for 'collaborators' column, which need some fix with JSON.stringify() method.
const columns: ColumnDef<Tables<'tasks'>>[] = [
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
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-center' }, 'Due Date'),
    cell: ({ row }) => {
      return h('div', { class: 'text-center font-medium' }, row.getValue('due_date'))
    }
  },
  {
    accessorKey: 'project_id',
    header: () => h('div', { class: 'text-center' }, 'Project'),
    cell: ({ row }) => {
      return h('div', { class: 'text-center font-medium' }, row.getValue('project_id'))
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
  <!-- 5.2 Next, we'll create a <DataTable /> component to render our table. -->
  <!-- 5.3 And we’ll be referring an array with data payments in this Component. -->
  <!-- <DataTable :columns="columns" :data="payments" /> -->

  <!-- 6.4 Here also we’ll replace 'payments' for 'tasks', but will have to make a check with "v-if" that "tasks" exists, otherwise we’ll get an error. -->
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
