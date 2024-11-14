<!-- [ src\pages\[...catchAll].vue ] -->
<script setup lang="ts">
// 1.3 Here is how we want to handle errors. Instead of adding AppErrorPage component to every page we want to add a func to trigger this error component to load the error page. This also means that every component in the App should know that there is an error. And we do that by defining a global state for the error. Let’s use Pinia and create an extra store for that!
// Go to [ src\stores\error.ts ]
// 1.5 Let’s add our brand new store here and it’s method "setError", which means once any user visit an undefined route this store func will execute and turn the activeError state to true. Which indicates that we have an active error.
// Go to [ src\App.vue ]
// 2.2 Then inside of setError we could trigger an object with property 'error' and set the error we want and also a custom code for the code of the error.
// Go to [ src\stores\error.ts ]
// 2.9 So the error is gone and we safely can use the method this way. When this line is executed the store will be updated and inside of the [ src\components\AppError\AppErrorPage.vue ] we can get the details we want from the Error inside of activeError prop from the store.
// Go to [ src\components\AppError\AppErrorPage.vue ]
useErrorStore().setError({ error: 'Page not found', customCode: 404 })
</script>
<!-- 1.0 Errors, how to present them right? Especially the fatal errors that cause the main content to fail loading. For devs the error messages need to be detailed and showing exactly what went wrong but for end users, they just need to know something is wrong without all tech. jargon or backstage drama. So let’s start creating clear useful error pages for both sides of the equation. -->
<!-- 1.1 The first obvious error that must be presented is 'not found' or '404' pages. Like this one. Is useful for presenting when the user visits an undefined route. -->
<!-- 1.2 Good! But unfortunately it when it comes to defined routes like for example the Tasks page. There is a different issue: we’ve got only 10 tasks in the DB right now with incremental IDs from 1 to 10. So if user visits something like 'our-website.com/tasks/11' the [...catchAll] component won’t kick in, because this route pattern is defined. Instead the single task page component will load trigger the query and Supabase will look for the task in the DB and we’ll get 406 error in the console 'Failed to load resource'. So we’ll need to find another way to show 404 Not found error but without relying on the [...catchAll] component we have here. We’ll create a single error page that displays detailed error for devs and simple & friendly errors for users. Let’s extract this template to a separate component. -->
<template>
  <div></div>
</template>
