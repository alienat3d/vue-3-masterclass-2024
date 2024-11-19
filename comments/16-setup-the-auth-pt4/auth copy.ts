// [src\stores\auth.ts]
import { supabase } from '@/lib/supabaseClient'
import { profileQuery } from '@/utils/supabaseQueries'
import type { Session, User } from '@supabase/supabase-js'
import type { Tables } from 'database/types'

// 1.0 Now we need a place to store the logged in user data globally. So we can access the logged in user data anywhere in the app. And that’s why we created this new file. We’ll export constant "useAuthStore" and we’ll put a Pinia store in it with defineStore method. The first argument will be a key and the second is a callback with two states inside. One for current logged in user with the initial value of "null" and types of it will be either "null" or "User".
// 1.1 Another state will be for Profile, as we agreed before that every use will have a profile in the Profiles table. As types we also write "null" or "Tables" (the tables helper that we get from Supabase and pass to is as an argument 'profiles' table). So now typescript will know that this 'profile' constant is a variable ref with the value of either null or a profile entry.
export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>()
  const profile = ref<null | Tables<'profiles'>>()

  // * 2.0 Every time we use the setAuth func, we would want also set the profile state to the profile that corresponds with this user. Which means we’ll need another func setProfile. It will be an async func because we’ll fetch the profile from the DB. And before we get to that we’ll need some checks: we want to check if user.value false, because if we don’t have a user there is no reason of checking the profile, so we just update the profile to null.
  // 2.1 Next check is that we want only fetch the DB if the profile doesn’t exist here in the state. So if 'profile' state is empty. Also as another option we check if the profile id doesn’t match the current logged in user id. And we’ll write a query into [src\utils\supabaseQueries.ts].
  // Go to [src\utils\supabaseQueries.ts]
  // 2.3 And we’ll pass that query inside of our conditional check and it accepts the user id. Then according to the data we get we want to update the profile value either it will be a data and if not it will be a null. ↓
  const setProfile = async () => {
    if (!user.value) {
      profile.value = null
      return
    }
    if (!profile.value || profile.value.id !== user.value.id) {
      const { data } = await profileQuery(user.value.id)

      profile.value = data || null
    }
  }

  // 1.3 Now to update the state of both. Or let’s talk specifically about 'user' state, we’ll need to use the data returned from the register method and the login method. Because the register method returns the session with the user data and same goes for the login method. This means that we need to create a func inside of this store that will get this session, extract the user and then update the state with user inside of session. So we’ll use this session to check if the user is logged in and we received a valid session then update the user’s state, but if not then set the user to null.
  // 1.4 Before we get to the logic let's define the type of "userSession" and it will be either null or Session type, that we import from Supabase and set the default value to null.
  // 1.5 And then inside of it we’ll check if the userSession doesn’t exist or has a falsy value then we’ll set the user.value to null and exit the func. But if userSession is valid and truthy then we set the user.value to userSession.user
  // 2.4 So let’s start using "setProfile" func and we want to use it every time we use the "setAuth" func. So it will also set the profile state. Also change setAuth to async func and we need to fix that also for [src\utils\supabaseAuth.ts].
  // Go to [src\utils\supabaseAuth.ts]
  const setAuth = async (userSession: null | Session = null) => {
    if (!userSession) {
      user.value = null
      return
    }

    user.value = userSession.user
    await setProfile()
  }

  // 1.2 And by the end, to be able to access the state from anywhere of the application we need to return both of them.
  // 1.6 And also return the setAuth method from the store.
  // Go to [src\utils\supabaseAuth.ts]
  // ? 2.6 BTW, we’re not returning setProfile here, because we don’t need it outside of this store scope, so we keep it private to this store and is not accessible from outside of the store and used inside of setAuth.
  // Go to [src\stores\page.ts]
  // 5.1 Create a new async func "getSession" here. And we’ll reach out to setAuth directly. And also we return this method.
  // Go to [src\router\index.ts]
  const getSession = async () => {
    const { data } = await supabase.auth.getSession()

    if (data.session?.user) setAuth(data.session)
  }

  return {
    user,
    profile,
    setAuth,
    getSession
  }
})

// 3.1 And we’ll place it here outside of "defineStore" and change to "useAuthStore", so it should make it play nicely with the Hot Module Replacement.
// Go to [src\stores\error.ts]
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
