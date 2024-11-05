<script setup lang="ts">
// 5.0 Let’s display projects from DB on the page
// 5.1 Similar to inserting data we use method "from" to define which table we want to interact with, but we’ll use "select" method in the end to return the data. And it looks like this returns an object that has two properties "data" & "error".
// 5.2 But first we should import here the supabase client
import { supabase } from '@/lib/supabaseClient'

/* const getProjects = async () => {

} */

// 6.0 The problem we have to solve here is that we trying to trigger that getProjects function inside of "script setup" directly without waiting any other hook. So we don’t use hook onMounted() for example, we don’t want to wait till the component to mount and then trigger this function. But we also can’t just go and add it like that, because await wouldn’t work within current setup.
// await getProjects()

// ? 6.1 To work around this we’ll use self-invoking anonymous function. It’s also being called IIFE (immediately invoked function expression)
;(async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) console.log(error)

  console.log('Projects : ', data)
})()
</script>

<template>
  <div>
    <h1>Projects Page</h1>
    <RouterLink to="/">Go to home</RouterLink>
  </div>
</template>
