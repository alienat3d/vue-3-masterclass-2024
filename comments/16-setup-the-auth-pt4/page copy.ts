// [src\stores\page.ts]
export const usePageStore = defineStore('page-store', () => {
  const pageData = ref({
    title: ''
  })

  return {
    pageData
  }
})
// 3.0 What else we can make to this profile store is that we make sure it will work well with the Hot Module Replacement. So we’ll copy this chunk of code to [src\stores\auth.ts]
// Go to [src\stores\auth.ts]
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}
