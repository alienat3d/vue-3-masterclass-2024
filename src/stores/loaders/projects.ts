import type { Projects } from '@/types/supabaseTypes'
import { projectsQuery } from '@/utils/supabaseQueries'
import { useMemoize } from '@vueuse/core'
// * 3.0 And there is another way we can stop our App from fetching/making further requests to fetch data after the first time. Like if we already have the data — no need to fetch it again. This other way from VueUse. (https://vueuse.org/core/useMemoize/) It caches the results of functions depending on arguments and keep it reactive. It can also be used for asynchronous functions and will reuse existing promises to avoid fetching the same data at the same time.

// 2.4 This file will be a normal store.
// Go to [src\pages\projects\index.vue]
export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)

  // 3.1 In simple words: we can wrap any promise with the useMemoize composable and it will fetch the data once and then cache the response for future use.
  // 3.4.0 But there is one trick about this one it relies on the arguments that will be passed to the function inside of it, so that it creates a unique key for that cached response. So if we fetch our project by its ID — it will use an id argument as the key that we can reach out the cached response, clear it and do whatever we want later with. We’ll pass key as a string...
  const loadProjects = useMemoize(async (key: string) => await projectsQuery)

  // 5.3 And actually it will be useful to extract those logic to a new func which we call 'validateCache'.
  const validateCache = () => {
    // * 5.0 About the problem when users won’t get any fresh data unless they do hard refresh we can do something similar to a caching technique called 'stale while revalidate'. (https://web.dev/articles/stale-while-revalidate) This technique will serve the cached response to the user while re-running the request in the background to check for any updates. So the user gets an immediate response from the cache and in the background the App is running the request again fetching a data and comparing it to the cache. If there’re any changes it will clear the cache and update it with the new data, so that future requests gets a new data. Let’s use this in our App.
    // 5.1 First we’ll add a conditional to check if the projects has any data then we want to synchronously call the query and get the data out of it. We’ll pass an object and destruct data out of it. Then we’ll compare the new data with the data we already have in cache, which is in the projects state. Let’s create a conditional and since these are an array with objects we’ll use JSON.stringify to convert what we have in store to stringified text. And we’ll check if it exactly matches with data we just got. Then we just say if they matched we just return and if not we’ll use useMemoize and it has method 'delete', which can be attached to whatever inside of useMemoize. And if we’ll pass the key that we agreed it will be the key for the cache data, which is 'projects' in our case — this will delete the cached data.
    if (projects.value?.length) {
      projectsQuery.then(({ data }) => {
        if (JSON.stringify(projects.value) === JSON.stringify(data)) {
          console.log('Cached and fresh data matched!')
        } else {
          console.log('Something has changed!')
          loadProjects.delete('projects')
        }
      })
    }
  }

  const getProjects = async () => {
    // 2.9 And we’ll need this line for that. We’ll make a conditional that if the value of projects has any length/data we don’t want to continue this func, which will fetch the data.
    // ? 2.10 Although it’s great for the UX but surely has downside. User will keep seeing an old version of this page unless they do hard refresh.
    // 3.3 When we use useMemoize instead we no longer need this if conditional.
    // if (projects.value?.length) return

    // 3.2 And then we can use it here instead.
    // 3.4.1 ... and then also pass it here. That way we decided that 'projects' will be a unique key that will be used to store the cache response.
    // const { data, error, status } = await projectsQuery
    // 5.2 So for future calls it will not have any cached data to serve and therefor it will fire a new request and will get a fresh data. So let’s save and see that in action.
    const { data, error, status } = await loadProjects('projects')

    if (error) useErrorStore().setError({ error, customCode: status })

    projects.value = data

    // 5.4 And it actually doesn’t matter if we put it in the beginning or at the end, as it’s always will be triggered after all above, as those has 'await' and this one has 'then'.
    validateCache()
  }

  return {
    projects,
    getProjects
  }
})
