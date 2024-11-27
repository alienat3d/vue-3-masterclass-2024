<!-- [src\pages\users\[username].vue] -->
<!-- * 1.0 Let’s take a look on creating dynamic user profiles. We want to be able to seed the profiles and dynamically render the data. We’ve created a new page component that will be a page rendering user details. -->
<script setup lang="ts">
import { profileQuery } from '@/utils/supabaseQueries'
import type { Tables } from 'database/types'

// 1.1 It’s easy to get the currently logged in user data, as we can just reach out to profile and get it from auth store.
// const { profile } = storeToRefs(useAuthStore())
// 1.3 But we don’t want just to get the current user. We want this route to work for any username that is passed to URL: website.com/users/%username%. So we need another solution. We need to get the username parameter from the URL and fetch the corresponding user from the DB. And first we get the parameter and destruct "username" out of useRoute. Then access the params property of it. And now we have the username.
// Go to [src\utils\supabaseQueries.ts]
const { username } = useRoute('/users/[username]').params

// 1.8 Let’s create a new variable ref 'profile' with the default value 'null' and then we pass the type Tables with the argument 'profiles' or null.
const profile = ref<Tables<'profiles'> | null>(null)

// 1.9 Then we’ll create the async getTasks func and pass the username inside of it. Not forget about error as we did before.
const getTasks = async () => {
  const { data, error, status } = await profileQuery({
    column: 'username',
    value: username
  })

  if (error) useErrorStore().setError({ error, customCode: status })

  profile.value = data
}

await getTasks()
</script>
<!-- 1.2 So now, when we have all the data let’s render it to HTML. -->
<template>
  <div class="mx-auto mb-10 flex w-full flex-col items-center justify-center py-10 text-center">
    <div class="flex flex-col items-center justify-center pb-4">
      <Avatar size="lg">
        <AvatarImage :src="profile?.avatar_url || ''" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <p class="mt-2 text-gray-500">{{ profile?.username }}</p>
      <h1 class="mt-5 text-4xl font-bold">{{ profile?.full_name }}</h1>
      <p class="mt-2 text-sm">{{ profile?.bio }}</p>
    </div>
    <Button>Edit profile</Button>
  </div>
</template>
