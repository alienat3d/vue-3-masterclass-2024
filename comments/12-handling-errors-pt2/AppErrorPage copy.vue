<!-- [src\components\AppError\AppErrorPage.vue] -->
<!-- 4.0 We assumed that showing the full error to the user is not the best thing to do. This AppErrorPage comp. shows the full detailed error. And it should be shown only during development but not to the end users. So we need a user-friendly error page version as well.  -->
<script setup lang="ts">
// import AppErrorDevSection from './AppErrorDevSection.vue'
// import AppErrorProdSection from './AppErrorProdSection.vue'

const router = useRouter()

const errorStore = useErrorStore()

const error = ref(errorStore.activeError)

// 4.5 Now the value of this variable ref 'message' will be passed to the child comp. 'AppErrorDevSection' and it will receive it as a prop, which will allow us to use it inside of a template.
// Go to [src\components\AppError\AppErrorDevSection.vue]
const message = ref('')
const customCode = ref(0)
const details = ref('')
const code = ref('')
const hint = ref('')
const statusCode = ref(0)

if (error.value && !('code' in error.value)) {
  message.value = error.value.message
  customCode.value = error.value.customCode ?? 0
}

if (error.value && 'code' in error.value) {
  message.value = error.value.message
  details.value = error.value.details
  hint.value = error.value.hint
  code.value = error.value.code
  statusCode.value = error.value.statusCode ?? 0
}

// 8.0 But how are we going to shuffle between both components for the production and the development version? Well we can write such code inside of the setup for that. And if this statement returns 'true' we want the AppErrorDevSection comp. to display but if it’s 'false' we want the AppErrorProdSection to display. So here is what we’re doing: create a constant errorTemplate. And the value of this variable will be decided by the statement we assigned to it. And if it returns 'true' we’ll use 'defineAsyncComponent'.
// ? 8.1.0 What does this defineAsyncComponent func do? Remember dynamic imports and other performance benefits we gain from it? (Talked about it in the Router chapter.) We can do the same here using this built-in func and it will enable our comp. to be split into different chunks separate chunks that doesn’t have to do with each other. And then we can request any of them only when it’s needed.
// 8.1.1 And here is how we can use it: this func accepts the callback and it will return an import statement, which is the dynamic import which is supported by Vite with the location of the comp. we want to render. In case it’s tru we want to import AppErrorDevSection otherwise AppErrorProdSection.
const ErrorTemplate = import.meta.env.DEV
  ? defineAsyncComponent(() => import('./AppErrorDevSection.vue'))
  : defineAsyncComponent(() => import('./AppErrorProdSection.vue'))

// 8.7 And instead of clearing error like this we’ll use the new created func.
// router.afterEach(() => (errorStore.activeError = null))
router.afterEach(() => errorStore.clearError())
</script>

<!-- 4.1 We already created a template for the error we want to show during development. We can extract this to a separate comp. and create a diff. simplified comp. for production use. Then conditionally render the appropriate comp. depending on which environment we’re running the app. -->
<!-- 4.2 Let’s create here an another comp. 'AppErrorDevSection.vue'. And move the content of this template to that comp.. -->
<!-- Go to [src\components\AppError\AppErrorDevSection.vue] -->
<!-- 4.4 But now it means we have to pass the same 'message' prop to comp. here. And we’ll set it to 'message' variable ref. ↑ -->
<!-- 6.8 This will allow us to pass that extra prop to our AppErrorProdSection and set its value to 'errorStore.isCustomError' -->
<!-- Go to [src\components\AppError\AppErrorProdSection.vue] -->
<!-- ? Actually we could shorten :message="message" to just :message, it will work the same. -->
<template>
  <section class="error">
    <!-- <AppErrorDevSection :message="message" /> -->
    <!-- <AppErrorDevSection :customCode :statusCode :code :message :hint :details /> -->
    <!-- <AppErrorProdSection
      :customCode
      :statusCode
      :code
      :message
      :hint
      :details
      :isCustomError="errorStore.isCustomError"
    /> -->
    <!-- 8.2 And now we can replace both components with the new variable we just created. With that in place the appropriate error comp. will render when needed and all the props will be passed to the rendered comp.. -->
    <!-- 8.3 Oh, and it’s something else we shouldn’t forget about. -->
    <!-- Go to [src\stores\error.ts] -->
    <ErrorTemplate
      :customCode
      :statusCode
      :code
      :message
      :hint
      :details
      :isCustomError="errorStore.isCustomError"
    />
  </section>
</template>

<!-- 5.0 But now our styles are gone and this is because we have this keyword 'scoped' which means none of these styles are leaked to the child comp. and therefor it won’t affect them. One way we could solve this is to copy these styles to the 'AppErrorDevSection' comp.. And also when we created an another comp. for production use we can copy the styles to it. But it’s not really the best solution. We also could remove the 'scope' keyword and it will do. -->
<!-- 5.1 But there is another way to doing that and it’s a more Vue way of doing things. We can inject classes using the ':deep()' pseudo-class. Once we did that Vue will apply these styles to any nested components inside of this parent component. Let’s do the same for the rest of classes we need. -->
<!-- 6.0 Let’s start working on the error page for production and create a new comp. for that 'AppErrorProdSection'. -->
<!-- Go to [src\components\AppError\AppErrorProdSection.vue] -->
<style scoped>
.error {
  @apply mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}

:deep(.error__icon) {
  @apply text-7xl text-destructive;
}

:deep(.error__code) {
  @apply font-extrabold text-7xl text-secondary;
}

:deep(.error__msg) {
  @apply text-3xl font-extrabold text-primary;
}

:deep(.error-footer) {
  @apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

:deep(.error-footer__text) {
  @apply text-lg text-muted-foreground;
}

:deep(p) {
  @apply my-2;
}
</style>
