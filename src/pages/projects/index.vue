<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'

// 1.0 Now we need to store the data somewhere to be able to reference it inside the template and display it in the browser.
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
