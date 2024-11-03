import { h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
// import ProjectsView from '@/views/ProjectsView.vue'
// 2.0 Dynamic imports are game changer for managing bundle size. They allow us load components only when needed instead of including everything upfront.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/projects',
      name: 'projects',
      // component: ProjectsView
      // 2.1 instead we pass import function
      component: () => import('@/views/ProjectsView.vue')
    },
    {
      // 2.2 to tell router, that this id can be anything we'll need a wildcard and we can do this by adding ":" in front
      path: '/projects/:id',
      name: 'single-project',
      component: () => import('@/views/SingleProjectView.vue')
    },
    {
      // 3.0 Writing a route for undefined url (e.i. 404 page)
      // 3.1 First we write a simple wildcard which means it’s directly nested under the main domain and use regExp to match any unlimited count of any character. So we're telling Vue Router this wildcard can be anything and in any length as well. And not to forget "*" in the end, which means that the route has this pattern repeated unlimited amount of times.
      // 3.2 Instead of creating 404 page component we could use "h" from Vue, which means HyperScript, which means JS that produces HTML and then we write inside of it 'p' as first argument for a type of HTML tag and then it goes second argument for object, where we put the attributes of that HTML-element inside. Then for third argument it goes the text content we want to put inside of this element.
      // ? 3.3 Оf course it’s not a proper way to handle 404 pages. But just as an example. (meaning h())
      // ? 3.4 Also, if we would modify path to '/projects:catchAll(.*)*', for example, then we can provide a custom 404 page for undefined routes nested under projects.
      path: '/:catchAll(.*)*',
      name: 'NotFound',
      component: h(
        'p',
        { style: 'color: salmon;' },
        'Oops! You have just reached the 404 page, which means that the page you were looking for could not be found.'
      )
    }
  ]
})

export default router
