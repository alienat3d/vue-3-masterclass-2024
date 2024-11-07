<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import SidebarLinks from './SidebarLinks.vue'

import { Button } from '@/components/ui/button'

// 1.6 Before we start using our SidebarLinks component we’ll need an array of links, that we’ll pass to this new component.
const links = [
  {
    title: 'Dashboard',
    to: '/',
    icon: 'lucide:house'
  },
  {
    title: 'Projects',
    to: '/projects',
    icon: 'lucide:building-2'
  },
  {
    title: 'My Tasks',
    to: '/tasks',
    icon: 'lucide:badge-check'
  }
]
// 1.8 For the second group of the links we’ll create another array
const accountLinks = [
  {
    title: 'Profile',
    to: '/profile',
    icon: 'lucide:user'
  },
  {
    title: 'Settings',
    to: '/settings',
    icon: 'lucide:settings'
  },
  {
    title: 'Sign out',
    to: '/signout',
    icon: 'lucide:log-out'
  }
]
</script>

<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 lg:w-52 w-16 transition-[width]"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <!-- 3.0 Let’s use here the button component we got from Shadcn Vue and not forgetting to import it as well.  -->
      <Button variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>

      <Button variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:plus"></iconify-icon>
      </Button>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <!-- 1.7 Now we can safely replace those first group of the links with the SidebarLinks component. We’ll also need to bind links prop -->
      <div>
        <SidebarLinks :links="links" />
      </div>
      <!-- 1.9 And now we can replace all links with the new component which bind to links array -->
      <div class="border-y text-center bg-background py-3">
        <SidebarLinks :links="accountLinks" />
      </div>
    </nav>
  </aside>
</template>
