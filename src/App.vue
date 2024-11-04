<script setup lang="ts">
// 1.1 We’ll import supabase here to use it
import { supabase } from '@/lib/supabaseClient'

console.log(supabase)
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>
