// [src\stores\auth.ts]
import { supabase } from '@/lib/supabaseClient'
import { profileQuery } from '@/utils/supabaseQueries'
import type { Session, User } from '@supabase/supabase-js'
import type { Tables } from 'database/types'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>()
  const profile = ref<null | Tables<'profiles'>>()

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

  // 4.2 setAuth should empty the user and also the profile states, so let’s add profile here as well. So when we call the setAuth method and don’t pass a userSession it will empty user & profile states.
  // Go to [src\components\Layout\Sidebar.vue]
  const setAuth = async (userSession: null | Session = null) => {
    if (!userSession) {
      user.value = null
      profile.value = null
      return
    }

    user.value = userSession.user
    await setProfile()
  }

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

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
