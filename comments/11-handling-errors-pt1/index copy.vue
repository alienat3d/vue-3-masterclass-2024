<!-- [src\pages\tasks\index.vue] -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { tasksWithProjectsQuery } from '@/utils/supabaseQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'
import type { TasksWithProjects } from '@/types/supabaseTypes'

usePageStore().pageData.title = 'My Tasks'

const tasks = ref<TasksWithProjects | null>(null)

// 4.0 So, let's deal with the errors that occur when we deal with task queries. And first see what’s going on with the console in this case — we’re getting an error object because we’re logging an error we’re getting from Supabase. But instead we want to have an error page displaying whenever we get an error from Supabase and it has the data we’re getting in this object.
// 4.1 Let’s rewrite code a little bit and replace console.log with the method setError of our error store. And we’ll pass the Supabase error to that method to set the state of the error. But so far it won’t work because setError expects some object with only two properties: error & customCode. And now we’re passing an error not as the string but as "PostgrestError". So we need to tweak it in order to pass this "PostgrestError".
// Go to [ src\stores\error.ts ]
// 4.5 We can get also a HTTP-status code by destructing from the object that our tasksWithProjectsQuery returns and pass it to setError’s 'customCode' prop.
// Go to [ src\stores\error.ts ]
const getTasks = async () => {
  const { data, error, status } = await tasksWithProjectsQuery

  // 4.4 And the next Typescript error happens is because 'customCode' prop is missing which should be passed it to this method. Let’s see what we can use for this parameter. In the error object that we get from Supabase we can see 'code' property and it has as a value some code starting with literals 'PGRST100'. Let’s research what it’s all about. First line in Google leads us to the documentation of PostgREST: [ https://docs.postgrest.org/en/v12/references/errors.html ] and there is a list of possible PostgREST errors we can get with the descriptions to them.
  // if (error) console.log(error)
  if (error) useErrorStore().setError({ error, customCode: status })

  tasks.value = data
}

await getTasks()
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
