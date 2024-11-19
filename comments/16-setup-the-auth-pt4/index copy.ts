// [src\router\index.ts]
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })

// 5.2 And we’ll use the 'beforeEach' guard and tell the router, that every time the user tries to navigate anywhere we want to use method getSession. That means we need initialize/destruct the getSession out of the Pinia store. And we don’t have a problem using Pinia stores here since navigation happens after Pinia is activated on the App.
// ? 5.3 This will give us the same logic, as we had when we were used getSession inside of [App.vue] inside of life cycle hook "onMounted", except that this time we’re going to check for the session every single time the user navigates anywhere in the App. Don’t need to be worried about performance, as it will not affect the App in anyway. According to the docs: the getSession method is retrieving the session from the browser and it only gets back to the Supabase server if the auth token in the browser has been expired and needs refreshing.
router.beforeEach(async () => {
  const { getSession } = useAuthStore()
  await getSession()
})

export default router
