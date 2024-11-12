import { RouterLink } from 'vue-router'
import type { TasksWithProjects } from '@/types/supabaseTypes'
import type { ColumnDef } from '@tanstack/vue-table'

export const columns: ColumnDef<TasksWithProjects[0]>[] = [
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
  {
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-center' }, 'Project'),
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
