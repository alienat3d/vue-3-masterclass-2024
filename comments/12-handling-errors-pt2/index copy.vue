<!-- [src\pages\tasks\index.vue] -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { tasksWithProjectsQuery } from '@/utils/supabaseQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'
import type { TasksWithProjects } from '@/types/supabaseTypes'

usePageStore().pageData.title = 'My Tasks'

const tasks = ref<TasksWithProjects | null>(null)

const getTasks = async () => {
  const { data, error, status } = await tasksWithProjectsQuery

  if (error) useErrorStore().setError({ error, customCode: status })

  tasks.value = data
}

await getTasks()

// 1.1 What if we’ll want to make like this and pass to the setError an actual Error constructor, which says something. Well, it will complain, because it’s not expecting an error as instance. It’s expecting a string or PostgrestError. Let’s fix it.
// Go to [src\stores\error.ts]
// useErrorStore().setError({ error: Error('I am an uncaught error') })

// 2.0 So what if we made a JavaScript code mistake like wrote an undefined variable helloWorld. It’s not defined anywhere so it will be a thrown error. And we’re not going anywhere the App is broken and we’re not seeing an error page. So how to handle such type of error to make sure that any uncaught error in our App gets captured and displayed using our AppErrorPage component? The solution is pretty straight-forward.
// Go to [src\App.vue]
// helloWorld
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
