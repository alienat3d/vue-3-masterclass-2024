<!-- [src\pages\projects\index.vue] -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- * 2.0 Let’s dive in the CRUD operations and we’ll ensure that we handle them as efficient as possible. CRUD stands for "Create, Read, Update and Delete". We’ve done already some creating and reading, eg: fetching, end displaying data as reading and adding new users as creating.  -->
<script setup lang="ts">
// import { projectsQuery } from '@/utils/supabaseQueries'
import { columns } from '@/utils/tableColumns/projectsColumns'
// import type { Projects } from '@/types/supabaseTypes'

usePageStore().pageData.title = 'Projects'

// 2.1.1 We have the local state to store the projects.
// 2.5 Let’s cut & copy over the projects state along with the func to that new store we just created.
// const projects = ref<Projects | null>(null)

// 2.1.0 But there are still other stuff to learn about CRUD operations. But first let’s improve our data fetching logic. Here is how we fetch all projects.
// 2.1.2 And we have a function that we trigger and it fetches the data from the DB. In the browser it works pretty fine. But when we try switching between the projects and the tasks pages it keeps loading each time, because it has to go back to DB and fetch it again and again. But what if we want that user don’t have to wait again when he’s navigating back to the previous page and allow him to see the data immediately, as it’s already loaded before.
// 2.2 So we need to cache the first response that user gets, when he visits the page for the first time, store it in the App and once he visits the same page again he don’t have to wait and get the instant view of the page content. We can easily make it happen with Pinia.
// 2.3 We’ll do a simple implementation here that will catch the response and avoid triggering the fetch request again and just render the response that user previously had.
// Let’s create in 'stores' directory a new directory 'loaders' and the reason why we separate this from another, those loaders have one task which is fetching data. They don't just store things they also fetch things and that’s what they’ll be responsible for.
// Go to [src\stores\loaders\projects.ts]
/* const getProjects = async () => {
  const { data, error, status } = await projectsQuery

  if (error) useErrorStore().setError({ error, customCode: status })

  projects.value = data
} */
// 2.6 Then we’ll create a new const projectsLoader and assign to it our new store.
const projectsLoader = useProjectsStore()

// 2.7 So we need two things from that store (which we destruct from store) the projects state and the getProjects func (destruct from projectsLoader).
// 2.8 If we’re heading to the browser so far everything looks like it was before, because we’re doing the same thing, but we wanted to stop fetching the page each time user switching pages. Let’s do this.
// Go to [src\stores\loaders\projects.ts]
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

await getProjects()
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
