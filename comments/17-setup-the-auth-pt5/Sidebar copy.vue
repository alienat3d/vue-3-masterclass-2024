<!-- [src\components\Layout\Sidebar.vue] -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// import { logout } from '@/utils/supabaseAuth'

// ? 5.8 And one more thing regards to the Pinia problem that we have: we can use Pinia store in the script setup wherever we want, so inside of the same comp. where we have trouble in, we can write useAuthStore right here and that will work. That’s because we used Pinia on the external file it gets imported on the top level and might be triggered before Pinia is ready. But when we use Pinia directly inside the script setup regardless wether it renders directly in App.vue or Vue Router it will just work.
// ? 5.9 Also if we use Pinia inside of composable and then import the composable here and start using it, it will work as well. Because the composable is where the Vue scope. It will be just as if use the Pinia store like we do now inside of script setup directly.
// useAuthStore()

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
// 1.9 And the cool thing is that if we add any other button, let’s say "Chat", which also shouldn’t be a link, we have problem with that.
// Go to [src\components\Layout\SidebarLinks.vue]
const accountLinks = [
  {
    title: 'Profile',
    to: '/profile',
    icon: 'lucide:user'
  },
  /*   {
    title: 'Chat',
    icon: 'lucide:message-circle'
  }, */
  {
    title: 'Settings',
    to: '/settings',
    icon: 'lucide:settings'
  },
  {
    title: 'Sign Out',
    // 1.1.0 So passing the "to" prop to Sign out doesn’t make any sense. We don’t want to navigate user to the signout route, instead we want to execute some JS code that will trigger Supabase client to logout the user. So let’s take out this property. ↓
    // to: '/signout',
    icon: 'lucide:log-out'
  }
]
// 3.1 But instead we can create a func inside of script setup. It will be accepting the linkTitle as a string and inside of this function we can handle it the was we want. For example we can check if linkTitle is 'Sign Out' and then we do something. ↓
// * 4.0 So here we trigger the func 'executeAction' that receives the 'linkTitle' and makes a check if this title matches 'Sign Out' then we should logout the current user.
// Go to [src\utils\supabaseAuth.ts]
// 4.3 And now we can use the 'logout' func we just created.
// ? 5.0 Although by now everything look in track we actually broke the site. We have an error which says 'Uncaught Error: [🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?'. The problem is with timing. Pinia needs to be initialized before any code that uses it.
// Go to [src\utils\supabaseAuth.ts]
// 5.6 But in the case of Sidebar comp. it goes directly in App.vue and won’t wait till Vue Router, will not wait for Pinia, it’ll just import the file and it immediately trigger the 'const authStore = useAuthStore()' line to use the store. And the the store likely not ready yet. So how to fix this? With dynamic imports.
// const executeAction = async (linkTitle: string) => {
//   if (linkTitle === 'Sign Out') {
//     await logout()
//   }
// }
// 5.7 We’ll destruct the logout out of import then use await import() and define the location of the file we want to import. So now this file won’t be ever loaded or included in the bundle except when the executeAction is triggered. And for sure it will happen only after Pinia store is ready. ↑
const executeAction = async (linkTitle: string) => {
  if (linkTitle === 'Sign Out') {
    const { logout } = await import('@/utils/supabaseAuth')
    await logout()
  }
}
</script>

<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 lg:w-52 w-16 transition-[width]"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <Button variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>

      <Button variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:plus"></iconify-icon>
      </Button>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SidebarLinks :links="links" />
      </div>
      <!-- 1.1.1 But then the comp. will complain right here, as one of the links is missing an important prop. -->
      <!-- Go to [src\components\Layout\SidebarLinks.vue] -->
      <!-- 2.1 However we want the parent component handle actions that come out of the SidebarLinks comp.. This keeps this comp. reusable and free from any App specific logic. But how do we listen to 'click' events on the div comp. from this parent SideBar comp. ? We can’t listen to div inside of child comp. And we need to listen to this event from inside of the comp. itself. -->
      <!-- Go to [src\components\Layout\SidebarLinks.vue] -->
      <!-- 2.3 No we can listen on the 'actionClicked' event on SidebarLinks comp. like so. Whatever we pass here between the quotes will be executed every time the child comp. emits an action linked event. And we can get the payload inline in the template like so, using callback and passing the payload as parameter in it. -->
      <!-- 2.4 But now in the browser we can see a warning, because now Vue confused it doesn’t know if actionClicked on this comp. is event listener or an attribute that should fall on a child comp. or maybe we’re trying to pass a prop. -->
      <!-- Go to [src\components\Layout\SidebarLinks.vue] -->
      <!-- * 3.0 Right here from the parent comp. we’re working with payload inline, we’re getting the payload and then put it in 'console.log()'. ↑ -->
      <!-- 3.2 And then we use this func name instead of those inline code. And we don’t even have to pass the payload Vue will do that for us. -->
      <!-- Go to [src\components\Layout\SidebarLinks.vue] -->
      <div class="border-y text-center bg-background py-3">
        <!-- <SidebarLinks :links="accountLinks" @actionClicked="payload => { console.log(payload) }"/> -->
        <SidebarLinks :links="accountLinks" @actionClicked="executeAction" />
      </div>
    </nav>
  </aside>
</template>
