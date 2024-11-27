import type { Projects } from '@/types/supabaseTypes'
import { projectsQuery } from '@/utils/supabaseQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)

  const loadProjects = useMemoize(async (key: string) => await projectsQuery)

  const validateCache = () => {
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
    const { data, error, status } = await loadProjects('projects')

    if (error) useErrorStore().setError({ error, customCode: status })

    projects.value = data

    validateCache()
  }

  return {
    projects,
    getProjects
  }
})
