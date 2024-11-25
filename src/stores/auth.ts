import { supabase } from '@/lib/supabaseClient'
import { profileQuery } from '@/utils/supabaseQueries'
import type { Session, User } from '@supabase/supabase-js'
import type { Tables } from 'database/types'

// 1.7.1 So let’s create the private state isTrackingAuthChanges with the default value of false.
export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>()
  const profile = ref<null | Tables<'profiles'>>()
  const isTrackingAuthChanges = ref(false)

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

  // 1.4.0 So the setAuth method will check if we have any user session and if didn’t — it will empty out the user and the profile states.
  const setAuth = async (userSession: null | Session = null) => {
    if (!userSession) {
      user.value = null
      profile.value = null
      return
    }

    // 1.4.1 But if it does, it will update the profile and the user states.
    // Go to [src\App.vue]
    user.value = userSession.user
    await setProfile()
  }

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()

    if (data.session?.user) setAuth(data.session)
  }

  // 1.5.1 And inside of auth store create another func 'trackAuthChanges'. So this func will use the supabaseClient. And we can get rid of useAuthstore(), as we can reach out directly to the setAuth method. And not to forget returning that func.
  // Go to [src\App.vue]
  // 1.7.0 To be on a safe side we’ll need to subscribe for listening to those events only once in the application. So we’ll make a check with conditional. So if isTrackingAuthChanges is true, don’t subscribe again. ↑
  const trackAuthChanges = () => {
    if (isTrackingAuthChanges.value) return

    isTrackingAuthChanges.value = true
    supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        await setAuth(session)
      }, 0)
    })
  }

  return {
    user,
    profile,
    setAuth,
    getSession,
    trackAuthChanges
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
