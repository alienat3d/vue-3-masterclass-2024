import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })

// * 1.0 We continue to work on authentication logic and the reason why we add the route guard here is that we want to be on the top of any change that might happen to the session. We want to check the health of the session on each navigation. Maybe there is a logs out for any reason and we want to update the store to remove the user. But we actually can get rid of these constant checks and triggering the getSession() method and all of that. And not only this.
// Go to [src\utils\supabaseAuth.ts]
/* router.beforeEach(async () => {
  const { getSession } = useAuthStore()
  await getSession()
}) */

// * 2.0 While user are able to create tasks assign them to each other, comment and more, but guests shouldn’t be able to do any of these actions until they sign up or log in. And that’s what we’re going to work on now. We’ll set the navigation guard in order to protect all the routes in our App. Essentially it will check for each incoming request to see if the user requesting page is authenticated then it will be able to access it and if not they’ll be redirected to the login or the register page.
// 2.1 The first thing we need is the auth store because it has the user state and we will be able to know if there is a current logged in user or not. So we will destruct the user and check if we don’t have the user we will redirect the user to the login/register page. And to do that we’ll return an object and give to the property 'name' a value with a route we want redirect the user to.
// 2.2 But so far we have an issue with the forever redirection to the login page and to prevent this we’ll need to modify the if condition at the navigation guard to prevent infinite redirection. So we must check if the user tries to get to the login page we don’t have to redirect him to the login page. Same goes for the register. Both of those pages should be available all the time.
// 2.3 But how to figure out which page the user trying to navigate to? Therefor 'beforeEach' nac guard has the 'to' & 'from' objects. Let’s use them to find out where the user tries to navigate to and where they’re navigating from.
// 4.1 But the problem is that the 'beforeEach' guard is too fast and triggers before it even happens and likely the store might not be updated yet. So we have to be sure that the store updates before we start verifying wether we have a logged in user or not inside the route guard. This is common practice in any web app — we always need to verify if this user is authenticated before they visit the page. And here we’ll need the 'getSession' method from [src\stores\auth.ts].
router.beforeEach(async (to, from) => {
  // 4.2 We can’t destruct the 'getSession' method from here as we user 'storeToRefs', so we’ll get rid of that and just assign store to a constant. And we’ll also need to fix our checks then. And also we’ll add async to the guard and call getSession via await. And now before it makes any checks the nav guard will trigger getSession method and make sure we’ll get the session from the browser first and only then set the store.
  // const { user } = storeToRefs(useAuthStore())
  const authStore = useAuthStore()
  await authStore.getSession()

  // 2.4 And we actually can write it another way:
  const isAuthPage = ['/login', '/register'].includes(to.path)

  // if (!user.value && to.path !== '/login' && to.path !== '/register') {
  if (!authStore.user && !isAuthPage) {
    return {
      name: '/login'
    }
  }

  // * 3.0 We also need to prevent logged in users to accessing the login/register pages.
  if (authStore.user && isAuthPage) {
    return {
      name: '/'
    }
  }
})

export default router
// 2.5 Let’s check the other possibility when user logged in and clicks the log out button — nothing changes. Because the navigation guard will not not be triggered as that action is not navigating somewhere in this case. We’ll need to do on our own.
// Go to [src\utils\supabaseAuth.ts]
