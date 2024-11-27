import type { Projects } from '@/types/supabaseTypes'
import { projectsQuery } from '@/utils/supabaseQueries'

// 2.4 This file will be a normal store.
// Go to [src\pages\projects\index.vue]
export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)

  const getProjects = async () => {
    // 2.9 And we’ll need this line for that. We’ll make a conditional that if the value of projects has any length/data we don’t want to continue this func, which will fetch the data.
    // ? 2.10 Although it’s great for the UX but surely has downside. User will keep seeing an old version of this page unless they do hard refresh.
    if (projects.value?.length) return

    const { data, error, status } = await projectsQuery

    if (error) useErrorStore().setError({ error, customCode: status })

    projects.value = data
  }

  return {
    projects,
    getProjects
  }
})
