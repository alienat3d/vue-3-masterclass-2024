import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })

// * 1.0 We continue to work on authentication logic and the reason why we add the route guard here is that we want to be on the top of any change that might happen to the session. We want to check the health of the session on each navigation. Maybe there is a logs out for any reason and we want to update the store to remove the user. But we actually can get rid of these constant checks and triggering the getSession() method and all of that. And not only this.
// Go to [src\utils\supabaseAuth.ts]
/* router.beforeEach(async () => {
  const { getSession } = useAuthStore()
  await getSession()
}) */

export default router
