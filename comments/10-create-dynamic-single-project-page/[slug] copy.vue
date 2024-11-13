<!-- [ src\pages\projects\[slug].vue ] -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { projectQuery } from '@/utils/supabaseQueries'
import type { Project } from '@/types/supabaseTypes'

// 1.6.1 But to get rid of an error we have to help useRoute and specify which route we’re using it on.
const route = useRoute('/projects/[slug]')

// 1.1 Let’s define a new variable ref to store the project. And it’s initial value will be null.
// 1.7 Another thing to do is that this ref doesn’t know yet what type of an object it should expect. So we’ll input in it two options: Project type or null.
// 2.1.1 This is because we’re defining a variable ref which is by default null.
const project = ref<Project | null>(null)

// 2.0.1 We can usePageStore for this. But because sometimes it possibly can be null, we have to mention that too.
// 2.1.0 But somehow the title doesn’t update.
// 2.1.2 But we’re passing just null here, it knows nothing about the value of the variable project has been changed. It’s always undefined. Even though the 'pageData.title' is reactive and it responds to any changes that happens to it, it doesn’t respond to any changes that happens to its dependencies. So if we change the value of the 'project' many times the 'pageData.title' would never know, because it doesn’t watch for changes.
// usePageStore().pageData.title = `Project: ${project.value?.name || ''}`

// 2.1.3 So we need to create a watcher. We’ll use method 'watch' from Vue and we’ll watch for specific property. For that the first argument needs to be a callback and it should evaluate to whatever we’re trying to watch. And second argument should be for whatever we’re trying react or whatever the action we want to do, when something changes in "name" property. And it will be our line for title. ↓
watch(
  () => project.value?.name,
  () => {
    usePageStore().pageData.title = `Project: ${project.value?.name || ''}`
  }
)

// 1.2 We’ll define also a variable getProjects and it going to be an async func to fetch the data from the DB.
// Go to [ src\utils\supabaseQueries.ts ]
// 1.5 We’re ready to use our fresh created query inside of this func.
// 1.6.0 We’ll get our slug from route.params.
// 2.1.1 Then we’re fetching the data from the DB and updating the variable ref with the data, which we’re getting from the DB.
const getProjects = async () => {
  const { data, error } = await projectQuery(route.params.slug)

  if (error) console.log(error)

  project.value = data
}

await getProjects()

// 2.1.4 However we could just move this line after getting our data and this will work too. But this way the title never be dynamic. So for example if we give to user an option to update the name of the project it won’t be updated in its title.
// usePageStore().pageData.title = `Project: ${project.value?.name || ''}`
</script>

<!-- 1.0 Let’s make an individual project page dynamically display the detailed info about the chosen project. -->
<!-- 2.0.0 So, let’s get to work to make this template dynamic. But first we need to make title dynamic as well. ↑ -->
<!-- 3.0 Here we’re using the basic Table component from "shadcn" and it is displaying data in a horizontal view. So it’s a few rows and every row has header and table data. Now our task is to fill the inner text for those component dynamically. -->
<!-- 3.1 First things first, we need to add to Table component "v-if", to check if the project object with data exist and only in this case render the table. -->
<!-- 3.2.0 Next is the description. Oops, it seems that we forgot to make the description in our DB, let’s fix that quickly. -->
<!-- Go to [ supabase\migrations\20241104192323_projects-schema.sql ] -->
<!-- 3.5 Now we can input project.description on its place to make description being rendered dynamically. Same goes for status. -->
<!-- 3.6 So for "Collaborators" it looks for number to display circles with the avatars of devs who is collaborating in the project, so we use 'project.collaborators' prop instead. And 'n' is replaced by 'collab' which is just a random number to represent user IDs, as we don’t have any real users. -->
<template>
  <Table v-if="project">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> {{ project.name }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>{{ project.description }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell>{{ project.status }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="collab in project.collaborators"
            :key="collab"
          >
            <RouterLink class="w-full h-full flex items-center justify-center" to="">
              <AvatarImage src="" alt="" />
              <AvatarFallback> </AvatarFallback>
            </RouterLink>
          </Avatar>
        </div>
      </TableCell>
    </TableRow>
  </Table>
  <!-- 3.7 Next is the table for tasks that belong for this project. This is a normal table and is not horizontal, so we have first the table columns and the the table rows come after them. And as it’s a new section we have to use "v-if" once more. -->
  <section v-if="project" class="mt-10 flex flex-col md:flex-row gap-5 justify-between grow">
    <div class="flex-1">
      <h2>Tasks</h2>
      <div class="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Status </TableHead>
              <TableHead> Due Date </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <!-- 3.8 Next we’ll use 'project.tasks' prop for number of tasks to be rendered and individual task will be called "task". And for key we’ll use prop 'task.id' -->
            <TableRow v-for="task in project.tasks" :key="task.id">
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> In progress </TableCell>
              <TableCell> 22/08/2024 </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    <!-- 3.9 This one we’re leaving so far as is and get back to it later. -->
    <div class="flex-1">
      <h2>Documents</h2>
      <div class="table-container">
        <p class="text-muted-foreground text-sm font-semibold px-4 py-3">
          This project doesn't have documents yet...
        </p>
        <!-- <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Visibility </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> Private </TableCell>
            </TableRow>
          </TableBody>
        </Table> -->
      </div>
    </div>
  </section>
</template>

<style>
th {
  @apply w-[100px];
}

h2 {
  @apply mb-4 text-lg font-semibold w-fit;
}

.table-container {
  @apply overflow-hidden overflow-y-auto rounded-md bg-slate-900 h-80;
}
</style>
