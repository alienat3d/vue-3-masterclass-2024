// [ src\stores\page.ts ]
// import { acceptHMRUpdate, defineStore } from 'pinia'

// 1.2 So this store should export a constant with the store instance. And we’ll set it’s value to the store instance and to create this instance we use defineStore func. And it’s shall be imported from Pinia.
// 1.3 This function accepts as the first argument a key for the store and it should be unique for the stores. It can be any string. The second argument is a callback and it will return our global states.
// 1.4 Then we create a variable pageData and set it with the value ref and an object inside with the property title. And also we need to return this variable.
export const usePageStore = defineStore('page-store', () => {
  const pageData = ref({
    title: ''
  })

  return {
    // [ all of the things here will be available to be accessed from all over the project ]
    pageData
  }
})

// 1.5.0 That’s it, we just created a store. But there is one more thing that we can do to improve our store for the development server. If we check out the Pinia documentation there is a "Hot Module Replacement". We could setup the Pinia to play nicely with Hot Module Replacement feature in Vite. So whenever we make any changes to our app without doing a hard refresh the changes will immediately reflect in the browser and Pinia store will be updated.
// 1.6 So we just copy here what needs for this from documentation (as first argument we pass our usePageStor func). And now the store is complete and optimized for the dev server.
// Go to [ src\components\Layout\main\AuthLayout.vue ]
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}
